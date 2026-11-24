// Netlify Serverless API Function for Multi-Tenant Indian Wedding Platform
// Supports: /api/clients, /api/auth, /api/settings, /api/rsvp, /api/wishes, /api/download-*

const fs = require('fs');
const path = require('path');

function readJsonSafe(relPath, fallback) {
    try {
        const fullPath = path.resolve(__dirname, '../../', relPath);
        if (fs.existsSync(fullPath)) {
            return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        }
    } catch (e) {}
    return fallback;
}

let memoryIndex = null;
let memoryClientSettings = {};
let memoryClientRsvps = {};
let memoryClientWishes = {};
let activeTokens = new Set();

function getIndex() {
    if (!memoryIndex) {
        memoryIndex = readJsonSafe('websites/index.json', {
            version: '2.0',
            activeWebsiteId: 'aaditi-rohan',
            activeId: 'aaditi-rohan',
            defaultClientId: 'aaditi-rohan',
            clients: [
                {
                    id: 'client_aaditi_rohan',
                    slug: 'aaditi-rohan',
                    name: 'चि. सौ. कां. आदिती आणि चि. रोहन',
                    bride: 'आदिती',
                    groom: 'रोहन',
                    title: 'शुभ विवाह सस्नेह आमंत्रण पत्र (Netlify Live App)',
                    dateText: 'रविवार, १७ डिसेंबर २०२६',
                    venue: 'माउली गार्डन, बाणेर रोड, पुणे',
                    theme: 'royal-paithani',
                    openingStyle: 'envelope-wax',
                    status: 'published',
                    isDefault: true
                }
            ]
        });
        memoryIndex.clients = memoryIndex.clients || memoryIndex.sites || [];
        memoryIndex.sites = memoryIndex.clients;
    }
    return memoryIndex;
}

function getSettings(slug) {
    const s = slug || getIndex().activeId || 'aaditi-rohan';
    if (!memoryClientSettings[s]) {
        memoryClientSettings[s] = readJsonSafe(`websites/${s}.json`, readJsonSafe('settings.json', {}));
    }
    return memoryClientSettings[s];
}

function getRsvps(slug) {
    const s = slug || getIndex().activeId || 'aaditi-rohan';
    if (!memoryClientRsvps[s]) {
        memoryClientRsvps[s] = readJsonSafe(`websites/rsvps_${s}.json`, readJsonSafe('rsvps.json', []));
    }
    return memoryClientRsvps[s];
}

function getWishes(slug) {
    const s = slug || getIndex().activeId || 'aaditi-rohan';
    if (!memoryClientWishes[s]) {
        memoryClientWishes[s] = readJsonSafe(`websites/wishes_${s}.json`, readJsonSafe('wishes.json', []));
    }
    return memoryClientWishes[s];
}

const CORS_HEADERS = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Filename, X-Admin-Token'
};

exports.handler = async function (event) {
    const method = (event.httpMethod || 'GET').toUpperCase();
    if (method === 'OPTIONS') {
        return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ ok: true }) };
    }

    let subpath = (event.path || '')
        .replace(/^\/\.netlify\/functions\/api/, '')
        .replace(/^\/api/, '');
    if (!subpath.startsWith('/')) subpath = '/' + subpath;
    subpath = subpath.replace(/\/+$/, '') || '/';

    const params = event.queryStringParameters || {};
    let body = {};
    if (event.body) {
        try {
            body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        } catch(e) {}
    }

    // AUTH
    if (subpath === '/auth/login' && method === 'POST') {
        const pass = body.password || body.pin || '';
        if (pass === 'vivah2026') {
            const token = 'token_' + Date.now();
            activeTokens.add(token);
            return {
                statusCode: 200,
                headers: CORS_HEADERS,
                body: JSON.stringify({ success: true, token, expiresAt: Date.now() + 86400000 })
            };
        }
        return { statusCode: 401, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Invalid password' }) };
    }

    if (subpath === '/auth/verify' && method === 'GET') {
        return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ authenticated: true }) };
    }

    // CLIENTS / WEBSITES
    if ((subpath === '/clients' || subpath === '/websites') && method === 'GET') {
        const idx = getIndex();
        return {
            statusCode: 200,
            headers: CORS_HEADERS,
            body: JSON.stringify({
                activeId: idx.activeId,
                activeWebsiteId: idx.activeId,
                defaultClientId: idx.defaultClientId,
                clients: idx.clients,
                websites: idx.clients,
                sites: idx.clients
            })
        };
    }

    if ((subpath === '/clients/create' || subpath === '/websites/create') && method === 'POST') {
        const idx = getIndex();
        const slug = (body.slug || body.id || `wedding-${Date.now().toString(36)}`).toLowerCase().replace(/[^a-z0-9_-]/g, '-');
        const bride = body.bride || body.brideName || 'वधू';
        const groom = body.groom || body.groomName || 'वर';
        const title = body.title || `चि. सौ. कां. ${bride} आणि चि. ${groom} विवाह सोहळा`;

        const newClient = {
            id: `client_${slug.replace(/-/g, '_')}`,
            clientId: `client_${slug.replace(/-/g, '_')}`,
            slug,
            name: title,
            bride,
            groom,
            title,
            dateText: body.dateText || body.date || 'रविवार, १७ डिसेंबर २०२६',
            venue: body.venue || 'माउली गार्डन, बाणेर रोड, पुणे',
            theme: body.theme || 'royal-paithani',
            openingStyle: body.openingStyle || body.opening || 'envelope-wax',
            status: body.status || 'published',
            isDefault: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const existIdx = idx.clients.findIndex(c => c.slug === slug);
        if (existIdx >= 0) idx.clients[existIdx] = newClient;
        else idx.clients.push(newClient);
        idx.activeId = slug;

        memoryClientSettings[slug] = Object.assign({}, getSettings('aaditi-rohan'), body.initialSettings || {}, {
            id: slug,
            slug: slug,
            general: { brideName: bride, groomName: groom, weddingTitle: title }
        });

        return {
            statusCode: 200,
            headers: CORS_HEADERS,
            body: JSON.stringify({ success: true, client: newClient, activeId: slug })
        };
    }

    if ((subpath === '/clients/switch' || subpath === '/websites/switch') && method === 'POST') {
        const slug = (body.slug || body.id || 'aaditi-rohan').toLowerCase();
        getIndex().activeId = slug;
        return {
            statusCode: 200,
            headers: CORS_HEADERS,
            body: JSON.stringify({ success: true, activeId: slug, settings: getSettings(slug) })
        };
    }

    if (subpath === '/clients/status' && method === 'POST') {
        const slug = (body.slug || body.id || '').toLowerCase();
        const client = getIndex().clients.find(c => c.slug === slug);
        if (client) client.status = body.status;
        return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ success: true, client }) };
    }

    const delClientM = subpath.match(/^\/(clients|websites)\/([^/]+)$/);
    if (delClientM && method === 'DELETE') {
        const slug = decodeURIComponent(delClientM[2]);
        if (slug === 'aaditi-rohan') {
            return { statusCode: 403, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Cannot delete default client' }) };
        }
        const idx = getIndex();
        idx.clients = idx.clients.filter(c => c.slug !== slug && c.id !== slug);
        if (idx.activeId === slug) idx.activeId = 'aaditi-rohan';
        delete memoryClientSettings[slug];
        return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ success: true, deleted: slug }) };
    }

    // SETTINGS
    if (subpath === '/settings') {
        const slug = params.client || params.site || body.slug || getIndex().activeId || 'aaditi-rohan';
        if (method === 'GET') {
            return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(getSettings(slug)) };
        }
        if (method === 'POST') {
            memoryClientSettings[slug] = body;
            const client = getIndex().clients.find(c => c.slug === slug);
            if (client && body.general) {
                client.bride = body.general.brideName || client.bride;
                client.groom = body.general.groomName || client.groom;
                client.title = body.general.weddingTitle || client.title;
            }
            return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ success: true, settings: body, client: slug }) };
        }
    }

    // RSVPS
    if (subpath === '/rsvp') {
        const slug = params.client || params.site || body.client || getIndex().activeId || 'aaditi-rohan';
        if (method === 'GET') {
            return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(getRsvps(slug)) };
        }
        if (method === 'POST') {
            const list = getRsvps(slug);
            const item = Object.assign({ id: 'rsvp_' + Date.now(), timestamp: new Date().toISOString() }, body);
            list.unshift(item);
            return { statusCode: 201, headers: CORS_HEADERS, body: JSON.stringify({ success: true, rsvp: item, client: slug }) };
        }
    }

    if (subpath === '/rsvp/clear-all' && method === 'POST') {
        const slug = params.client || params.site || getIndex().activeId || 'aaditi-rohan';
        memoryClientRsvps[slug] = [];
        return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ success: true, count: 0 }) };
    }

    // WISHES
    if (subpath === '/wishes') {
        const slug = params.client || params.site || body.client || getIndex().activeId || 'aaditi-rohan';
        if (method === 'GET') {
            return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(getWishes(slug)) };
        }
        if (method === 'POST') {
            const list = getWishes(slug);
            const item = Object.assign({ id: 'wish_' + Date.now(), timestamp: 'आत्ताच' }, body);
            list.unshift(item);
            return { statusCode: 201, headers: CORS_HEADERS, body: JSON.stringify({ success: true, wish: item, client: slug }) };
        }
    }

    // DOWNLOADS
    if (subpath === '/download-zip') {
        return { statusCode: 302, headers: { Location: '/indian-culture-wedding-invitations.zip' }, body: '' };
    }
    if (subpath === '/download-html') {
        return { statusCode: 302, headers: { Location: '/wedding_invitation.html' }, body: '' };
    }

    return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: true, activeId: getIndex().activeId, message: 'Multi-Tenant API Active' })
    };
};
