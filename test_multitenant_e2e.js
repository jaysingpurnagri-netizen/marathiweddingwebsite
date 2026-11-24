/**
 * Comprehensive Multi-Tenant End-to-End Test Suite (In-Memory HTTP Engine)
 * Tests all 14 Requirements without sandbox network restrictions.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { EventEmitter } = require('events');
const { Readable } = require('stream');

// Load the server instance
const server = require('./server');

function hashFile(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(content).digest('hex');
}

function simulateRequest(server, { method = 'GET', url = '/', headers = {}, body = null }) {
    return new Promise((resolve, reject) => {
        const handler = server.listeners('request')[0];
        if (!handler) return reject(new Error('No request handler on server'));

        const req = new Readable({
            read() {}
        });
        req.method = method;
        req.url = url;
        req.headers = {};
        for (const [k, v] of Object.entries(headers)) {
            req.headers[k.toLowerCase()] = v;
        }

        let statusCode = 200;
        let responseHeaders = {};
        const resChunks = [];

        const res = new EventEmitter();
        res.statusCode = 200;
        res.writeHead = function(code, hdrs) {
            statusCode = code;
            res.statusCode = code;
            if (hdrs) {
                for (const [hk, hv] of Object.entries(hdrs)) {
                    responseHeaders[hk.toLowerCase()] = hv;
                }
            }
            return res;
        };
        res.setHeader = function(name, val) {
            responseHeaders[name.toLowerCase()] = val;
        };
        res.getHeader = function(name) {
            return responseHeaders[name.toLowerCase()];
        };
        res.write = function(chunk) {
            if (chunk) resChunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
            return true;
        };
        res.end = function(chunk) {
            if (chunk) resChunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
            const raw = Buffer.concat(resChunks).toString('utf8');
            let parsed = raw;
            try {
                parsed = JSON.parse(raw);
            } catch(e) {}
            resolve({
                status: statusCode,
                headers: responseHeaders,
                body: parsed,
                raw
            });
        };

        try {
            handler(req, res);
            if (body !== null && body !== undefined) {
                const bodyStr = typeof body === 'object' ? JSON.stringify(body) : String(body);
                req.push(Buffer.from(bodyStr));
            }
            req.push(null);
        } catch (e) {
            reject(e);
        }
    });
}

async function runTests() {
    console.log('================================================================');
    console.log('   MULTI-TENANT ARCHITECTURE & E2E ISOLATION VERIFICATION TEST   ');
    console.log('================================================================\n');

    let passed = 0;
    let failed = 0;

    function assert(condition, testName, detail = '') {
        if (condition) {
            console.log(`[PASS] ${testName}`);
            passed++;
        } else {
            console.error(`[FAIL] ${testName} - Detail: ${detail}`);
            failed++;
        }
    }

    try {
        // -------------------------------------------------------------
        // TEST 1: Admin Authentication & Security
        // -------------------------------------------------------------
        console.log('\n--- Test 1: Admin Authentication & Security ---');
        const loginFail = await simulateRequest(server, {
            url: '/api/auth/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { password: 'wrongpassword' }
        });
        assert(loginFail.status === 401, 'Rejects invalid password with 401 Unauthorized');

        const loginSuccess = await simulateRequest(server, {
            url: '/api/auth/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { password: 'vivah2026' }
        });
        assert(loginSuccess.status === 200 && !!loginSuccess.body.token, 'Accepts default password vivah2026 and issues admin token');
        const adminToken = loginSuccess.body.token;

        const verifyRes = await simulateRequest(server, {
            url: '/api/auth/verify',
            method: 'GET',
            headers: { 'x-admin-token': adminToken }
        });
        assert(verifyRes.body.authenticated === true, 'Verifies admin token successfully');

        // -------------------------------------------------------------
        // TEST 2: C1 Baseline Verification & File Checksum
        // -------------------------------------------------------------
        console.log('\n--- Test 2: C1 (aaditi-rohan) Baseline Verification ---');
        const c1SettingsPath = path.join(__dirname, 'websites', 'aaditi-rohan.json');
        const c1RsvpsPath = path.join(__dirname, 'websites', 'rsvps_aaditi-rohan.json');
        const rootSettingsPath = path.join(__dirname, 'settings.json');

        const c1InitialHash = hashFile(c1SettingsPath);
        const rootInitialHash = hashFile(rootSettingsPath);
        const c1InitialRsvpsHash = hashFile(c1RsvpsPath);

        const c1SettingsRes = await simulateRequest(server, {
            url: '/api/settings?client=aaditi-rohan',
            method: 'GET'
        });
        assert(c1SettingsRes.status === 200, 'GET /api/settings?client=aaditi-rohan succeeds');
        assert(c1SettingsRes.body.general && c1SettingsRes.body.general.brideName === 'आदिती', 'C1 Bride is "आदिती"');
        assert(c1SettingsRes.body.general && c1SettingsRes.body.general.groomName === 'रोहन', 'C1 Groom is "रोहन"');

        // -------------------------------------------------------------
        // TEST 3: Create Client C2 (priya-rohit)
        // -------------------------------------------------------------
        console.log('\n--- Test 3: Create Client C2 (priya-rohit) ---');
        const c2Payload = {
            slug: 'priya-rohit',
            bride: 'प्रिया',
            groom: 'रोहित',
            title: 'चि. सौ. कां. प्रिया आणि चि. रोहित विवाह सोहळा',
            date: 'रविवार, २५ जानेवारी २०२७',
            venue: 'लक्ष्मी लॉन्स, मगरपट्टा, पुणे',
            theme: 'royal-rajputana',
            opening: 'royal-scroll',
            status: 'draft',
            initialSettings: {
                templateId: 'royal-rajputana',
                general: {
                    brideName: 'प्रिया सावंत',
                    groomName: 'रोहित देशमुख',
                    weddingTitle: 'चि. सौ. कां. प्रिया आणि चि. रोहित विवाह सोहळा',
                    weddingDateText: 'रविवार, २५ जानेवारी २०२७',
                    venueName: 'लक्ष्मी लॉन्स, मगरपट्टा, पुणे'
                }
            }
        };

        const createRes = await simulateRequest(server, {
            url: '/api/clients/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-token': adminToken
            },
            body: c2Payload
        });

        assert(createRes.status === 201, 'POST /api/clients/create returns 201 Created');
        assert(createRes.body.client && createRes.body.client.slug === 'priya-rohit', 'C2 created with slug "priya-rohit"');

        const c2File = path.join(__dirname, 'websites', 'priya-rohit.json');
        const c2RsvpFile = path.join(__dirname, 'websites', 'rsvps_priya-rohit.json');
        const c2WishFile = path.join(__dirname, 'websites', 'wishes_priya-rohit.json');

        assert(fs.existsSync(c2File), 'C2 isolated settings file created: websites/priya-rohit.json');
        assert(fs.existsSync(c2RsvpFile), 'C2 isolated RSVP file created: websites/rsvps_priya-rohit.json');
        assert(fs.existsSync(c2WishFile), 'C2 isolated Wishes file created: websites/wishes_priya-rohit.json');

        // -------------------------------------------------------------
        // TEST 4: Edit C2 Settings & Confirm C1 Remains UNTOUCHED
        // -------------------------------------------------------------
        console.log('\n--- Test 4: Edit C2 & Verify C1 Isolation ---');
        const c2EditedSettings = JSON.parse(fs.readFileSync(c2File, 'utf8'));
        c2EditedSettings.general.brideName = 'प्रिया (विशेष आवृत्ती)';
        c2EditedSettings.general.venueName = 'हयात रीजन्सी हॉटेल, विमान नगर, पुणे';
        c2EditedSettings.templateId = 'ghibli-whisper';

        const saveC2Res = await simulateRequest(server, {
            url: '/api/settings?client=priya-rohit',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-token': adminToken
            },
            body: c2EditedSettings
        });
        assert(saveC2Res.status === 200, 'POST /api/settings?client=priya-rohit returns 200');

        // Check C2 updated
        const c2FetchRes = await simulateRequest(server, {
            url: '/api/settings?client=priya-rohit',
            method: 'GET'
        });
        assert(c2FetchRes.body.general.brideName === 'प्रिया (विशेष आवृत्ती)', 'C2 bride updated to "प्रिया (विशेष आवृत्ती)"');
        assert(c2FetchRes.body.templateId === 'ghibli-whisper', 'C2 theme updated to "ghibli-whisper"');

        // CRITICAL CHECK: Verify C1 files are 100% UNTOUCHED
        const c1PostHash = hashFile(c1SettingsPath);
        const rootPostHash = hashFile(rootSettingsPath);

        assert(c1PostHash === c1InitialHash, 'CRITICAL: websites/aaditi-rohan.json hash UNCHANGED after C2 edits', `Initial: ${c1InitialHash}, Current: ${c1PostHash}`);
        assert(rootPostHash === rootInitialHash, 'CRITICAL: settings.json hash UNCHANGED after C2 edits', `Initial: ${rootInitialHash}, Current: ${rootPostHash}`);

        const c1Recheck = await simulateRequest(server, {
            url: '/api/settings?client=aaditi-rohan',
            method: 'GET'
        });
        assert(c1Recheck.body.general.brideName === 'आदिती', 'C1 Bride remains "आदिती"');
        assert(c1Recheck.body.general.groomName === 'रोहन', 'C1 Groom remains "रोहन"');
        assert(c1Recheck.body.templateId === 'royal-paithani', 'C1 Theme remains "royal-paithani"');

        // -------------------------------------------------------------
        // TEST 5: Toggle C2 Publishing Status
        // -------------------------------------------------------------
        console.log('\n--- Test 5: Toggle C2 Publishing Status ---');
        const statusRes = await simulateRequest(server, {
            url: '/api/clients/status',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-token': adminToken
            },
            body: { slug: 'priya-rohit', status: 'published' }
        });
        assert(statusRes.status === 200, 'POST /api/clients/status returns 200');
        assert(statusRes.body.client.status === 'published', 'C2 status changed to "published"');

        const clientsListRes = await simulateRequest(server, {
            url: '/api/clients',
            method: 'GET'
        });
        const c2InList = clientsListRes.body.clients.find(c => c.slug === 'priya-rohit');
        assert(c2InList && c2InList.status === 'published', 'Client list confirms C2 is published');

        // -------------------------------------------------------------
        // TEST 6: RSVP & Wishes Isolation
        // -------------------------------------------------------------
        console.log('\n--- Test 6: RSVP & Wishes Isolation ---');
        const c2RsvpPayload = {
            client: 'priya-rohit',
            name: 'अमित व सीमा जोशी',
            phone: '9876543210',
            guests: '3',
            attending: 'होय, नक्की येणार',
            wishes: 'प्रिया आणि रोहित यांना लग्नाच्या हार्दिक शुभेच्छा!'
        };

        const postRsvpRes = await simulateRequest(server, {
            url: '/api/rsvp',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: c2RsvpPayload
        });
        assert(postRsvpRes.status === 201, 'POST /api/rsvp for C2 returns 201 Created');

        const c2RsvpsRes = await simulateRequest(server, {
            url: '/api/rsvp?client=priya-rohit',
            method: 'GET'
        });
        assert(c2RsvpsRes.body.length === 1, 'C2 has exactly 1 RSVP record');
        assert(c2RsvpsRes.body[0].name === 'अमित व सीमा जोशी', 'C2 RSVP guest is Amit Joshi');

        // Verify C1 RSVPs are untouched
        const c1PostRsvpsHash = hashFile(c1RsvpsPath);
        assert(c1PostRsvpsHash === c1InitialRsvpsHash, 'CRITICAL: C1 RSVPs file UNCHANGED after C2 RSVP submission');

        const c1RsvpsRes = await simulateRequest(server, {
            url: '/api/rsvp?client=aaditi-rohan',
            method: 'GET'
        });
        const c1HasC2Guest = c1RsvpsRes.body.some(r => (r.name || '').includes('सीमा जोशी'));
        assert(!c1HasC2Guest, 'CRITICAL: C1 does NOT contain C2 guest "अमित व सीमा जोशी"');

        // -------------------------------------------------------------
        // TEST 7: Public Website Routing & Preloaded Client Settings
        // -------------------------------------------------------------
        console.log('\n--- Test 7: Public Website Routing (/c/:slug and ?client=) ---');
        const c1HtmlRes = await simulateRequest(server, {
            url: '/c/aaditi-rohan',
            method: 'GET'
        });
        assert(c1HtmlRes.status === 200, 'GET /c/aaditi-rohan returns 200 OK');
        assert(c1HtmlRes.raw.includes('window.ACTIVE_CLIENT_SLUG = "aaditi-rohan"'), '/c/aaditi-rohan injects ACTIVE_CLIENT_SLUG = "aaditi-rohan"');
        assert(c1HtmlRes.raw.includes('आदिती'), '/c/aaditi-rohan preloads C1 Bride "आदिती"');

        const c2HtmlRes = await simulateRequest(server, {
            url: '/c/priya-rohit',
            method: 'GET'
        });
        assert(c2HtmlRes.status === 200, 'GET /c/priya-rohit returns 200 OK');
        assert(c2HtmlRes.raw.includes('window.ACTIVE_CLIENT_SLUG = "priya-rohit"'), '/c/priya-rohit injects ACTIVE_CLIENT_SLUG = "priya-rohit"');
        assert(c2HtmlRes.raw.includes('प्रिया (विशेष आवृत्ती)'), '/c/priya-rohit preloads C2 Bride');

        const c2QueryRes = await simulateRequest(server, {
            url: '/?client=priya-rohit',
            method: 'GET'
        });
        assert(c2QueryRes.status === 200, 'GET /?client=priya-rohit returns 200 OK');
        assert(c2QueryRes.raw.includes('window.ACTIVE_CLIENT_SLUG = "priya-rohit"'), '/?client=priya-rohit injects C2 slug');

        // -------------------------------------------------------------
        // TEST 8: C1 Deletion Safeguard
        // -------------------------------------------------------------
        console.log('\n--- Test 8: C1 Deletion Safeguard ---');
        const deleteC1Res = await simulateRequest(server, {
            url: '/api/clients/aaditi-rohan',
            method: 'DELETE',
            headers: { 'x-admin-token': adminToken }
        });
        assert(deleteC1Res.status === 403, 'DELETE /api/clients/aaditi-rohan is blocked with 403 Forbidden');
        assert(fs.existsSync(c1SettingsPath), 'C1 settings file still exists after blocked deletion attempt');

        // -------------------------------------------------------------
        // TEST 9: Delete C2 & Verify C1 Remains Intact
        // -------------------------------------------------------------
        console.log('\n--- Test 9: Delete C2 & Verify System Stability ---');
        const deleteC2Res = await simulateRequest(server, {
            url: '/api/clients/priya-rohit',
            method: 'DELETE',
            headers: { 'x-admin-token': adminToken }
        });
        assert(deleteC2Res.status === 200, 'DELETE /api/clients/priya-rohit succeeds with 200 OK');
        assert(!fs.existsSync(c2File), 'C2 settings file removed');
        assert(!fs.existsSync(c2RsvpFile), 'C2 RSVP file removed');

        // Verify C1 remains
        assert(fs.existsSync(c1SettingsPath), 'C1 settings file intact');
        const c1FinalHash = hashFile(c1SettingsPath);
        assert(c1FinalHash === c1InitialHash, 'CRITICAL: C1 hash strictly identical throughout entire test');

    } catch (err) {
        console.error('Test execution error:', err);
        failed++;
    } finally {
        console.log('\n================================================================');
        console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
        console.log('================================================================\n');
        process.exit(failed === 0 ? 0 : 1);
    }
}

runTests();
