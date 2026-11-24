// migrate_to_multitenant.js - Database & Client Migration Script
const fs = require('fs');
const path = require('path');

const WEBSITES_DIR = path.join(__dirname, 'websites');
const WEBSITES_INDEX = path.join(WEBSITES_DIR, 'index.json');
const SETTINGS_FILE = path.join(__dirname, 'settings.json');
const RSVPS_FILE = path.join(__dirname, 'rsvps.json');
const WISHES_FILE = path.join(__dirname, 'wishes.json');

function migrate() {
    console.log('--- Starting Multi-Tenant Migration ---');

    if (!fs.existsSync(WEBSITES_DIR)) {
        fs.mkdirSync(WEBSITES_DIR, { recursive: true });
    }

    // 1. Read existing index
    let indexData = { activeId: 'aaditi-rohan', sites: [] };
    if (fs.existsSync(WEBSITES_INDEX)) {
        try {
            indexData = JSON.parse(fs.readFileSync(WEBSITES_INDEX, 'utf8'));
        } catch (e) {
            console.warn('Failed parsing existing index.json, creating fresh:', e);
        }
    }

    // 2. Ensure C1 (aaditi-rohan) file exists and has full settings
    const c1File = path.join(WEBSITES_DIR, 'aaditi-rohan.json');
    let c1Settings = {};
    if (fs.existsSync(SETTINGS_FILE)) {
        c1Settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
    }
    c1Settings.id = 'aaditi-rohan';
    c1Settings.clientId = 'client_aaditi_rohan';
    c1Settings.slug = 'aaditi-rohan';
    c1Settings.status = 'published';
    fs.writeFileSync(c1File, JSON.stringify(c1Settings, null, 2), 'utf8');
    console.log('✓ C1 configuration saved to websites/aaditi-rohan.json');

    // 3. Migrate RSVPs for C1
    const c1RsvpsFile = path.join(WEBSITES_DIR, 'rsvps_aaditi-rohan.json');
    if (!fs.existsSync(c1RsvpsFile) && fs.existsSync(RSVPS_FILE)) {
        fs.copyFileSync(RSVPS_FILE, c1RsvpsFile);
        console.log('✓ Migrated existing RSVPs to websites/rsvps_aaditi-rohan.json');
    } else if (!fs.existsSync(c1RsvpsFile)) {
        fs.writeFileSync(c1RsvpsFile, '[]', 'utf8');
    }

    // 4. Migrate Wishes for C1
    const c1WishesFile = path.join(WEBSITES_DIR, 'wishes_aaditi-rohan.json');
    if (!fs.existsSync(c1WishesFile) && fs.existsSync(WISHES_FILE)) {
        fs.copyFileSync(WISHES_FILE, c1WishesFile);
        console.log('✓ Migrated existing Wishes to websites/wishes_aaditi-rohan.json');
    } else if (!fs.existsSync(c1WishesFile)) {
        fs.writeFileSync(c1WishesFile, '[]', 'utf8');
    }

    // 5. Structure Clients List
    const existingSites = indexData.sites || [];
    const clientMap = new Map();

    // Ensure C1 is present first
    clientMap.set('aaditi-rohan', {
        id: 'client_aaditi_rohan',
        slug: 'aaditi-rohan',
        name: 'चि. सौ. कां. आदिती आणि चि. रोहन',
        bride: c1Settings?.general?.brideName || 'आदिती',
        groom: c1Settings?.general?.groomName || 'रोहन',
        title: c1Settings?.general?.weddingTitle || 'शुभ विवाह सस्नेह आमंत्रण पत्र (Netlify Live App)',
        dateText: c1Settings?.general?.weddingDateText || 'रविवार, १७ डिसेंबर २०२६',
        venue: c1Settings?.general?.venueName || 'माउली गार्डन, बाणेर रोड, पुणे',
        theme: c1Settings?.templateId || 'royal-paithani',
        openingStyle: c1Settings?.openingStyle || 'envelope-wax',
        opening: c1Settings?.openingStyle || 'envelope-wax',
        status: 'published',
        isDefault: true,
        createdAt: '2026-11-23T06:46:47.980Z',
        updatedAt: new Date().toISOString()
    });

    existingSites.forEach(s => {
        const slug = s.slug || s.id;
        if (!slug) return;
        const existing = clientMap.get(slug) || {};
        clientMap.set(slug, {
            id: s.clientId || `client_${slug.replace(/-/g, '_')}`,
            slug: slug,
            name: s.name || `विवाह सोहळा (${slug})`,
            bride: s.bride || existing.bride || '',
            groom: s.groom || existing.groom || '',
            title: s.title || existing.title || `शुभ विवाह आमंत्रण`,
            date: s.date || s.dateText || existing.date || 'रविवार, १७ डिसेंबर २०२६',
            dateText: s.dateText || s.date || existing.dateText || 'रविवार, १७ डिसेंबर २०२६',
            venue: s.venue || existing.venue || 'पुणे',
            theme: s.theme || existing.theme || 'royal-paithani',
            openingStyle: s.openingStyle || s.opening || existing.openingStyle || 'envelope-wax',
            opening: s.opening || s.openingStyle || existing.opening || 'envelope-wax',
            status: s.status || (slug === 'aaditi-rohan' ? 'published' : 'published'),
            isDefault: slug === 'aaditi-rohan',
            createdAt: s.createdAt || new Date().toISOString(),
            updatedAt: s.updatedAt || new Date().toISOString()
        });

        // Ensure each client has their own RSVP and wishes file
        const clientRsvp = path.join(WEBSITES_DIR, `rsvps_${slug}.json`);
        if (!fs.existsSync(clientRsvp)) fs.writeFileSync(clientRsvp, '[]', 'utf8');

        const clientWish = path.join(WEBSITES_DIR, `wishes_${slug}.json`);
        if (!fs.existsSync(clientWish)) fs.writeFileSync(clientWish, '[]', 'utf8');
    });

    const clientsList = Array.from(clientMap.values());
    const upgradedIndex = {
        version: '2.0',
        activeWebsiteId: indexData.activeId || 'aaditi-rohan',
        activeId: indexData.activeId || 'aaditi-rohan',
        defaultClientId: 'aaditi-rohan',
        clients: clientsList,
        sites: clientsList // dual-compatibility for legacy frontend readers
    };

    fs.writeFileSync(WEBSITES_INDEX, JSON.stringify(upgradedIndex, null, 2), 'utf8');
    console.log(`✓ Migration complete! Total managed clients: ${clientsList.length}`);
    clientsList.forEach((c, i) => {
        console.log(`   [${i + 1}] ID: ${c.id} | Slug: ${c.slug} | Status: ${c.status} | Title: ${c.name}`);
    });
}

if (require.main === module) {
    migrate();
}

module.exports = { migrate };
