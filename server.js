// server.js - Multi-Client (Multi-Tenant) Indian Wedding Platform & Publishing Engine
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const crypto = require('crypto');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const PUBLIC_DIR = __dirname;
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');
const SETTINGS_FILE = path.join(PUBLIC_DIR, 'settings.json');
const TEMPLATES_FILE = path.join(PUBLIC_DIR, 'templates.json');
const RSVPS_FILE = path.join(PUBLIC_DIR, 'rsvps.json');
const WISHES_FILE = path.join(PUBLIC_DIR, 'wishes.json');
const WEBSITES_DIR = path.join(PUBLIC_DIR, 'websites');
const WEBSITES_INDEX = path.join(WEBSITES_DIR, 'index.json');

// Admin Authentication Configuration
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'vivah2026';
const activeAdminTokens = new Map(); // token -> { createdAt, expiresAt }

// Ensure primary directories exist
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(WEBSITES_DIR)) fs.mkdirSync(WEBSITES_DIR, { recursive: true });

// Ensure websites/index.json exists and is populated
if (!fs.existsSync(WEBSITES_INDEX)) {
  const initialIndex = {
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
        opening: 'envelope-wax',
        status: 'published',
        isDefault: true,
        updatedAt: new Date().toISOString()
      }
    ],
    sites: []
  };
  initialIndex.sites = initialIndex.clients;
  fs.writeFileSync(WEBSITES_INDEX, JSON.stringify(initialIndex, null, 2), 'utf-8');
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon',
  '.zip': 'application/zip',
  '.csv': 'text/csv; charset=utf-8'
};

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Filename, Authorization, X-Admin-Token'
  });
  res.end(JSON.stringify(data));
}

function deepMerge(target, source) {
  if (!source || typeof source !== 'object') return target;
  if (!target || typeof target !== 'object') target = {};
  const output = Object.assign({}, target);
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      output[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
}

// ==========================================
// MULTI-TENANT STORAGE HELPERS
// ==========================================

function getClientIndex() {
  try {
    if (fs.existsSync(WEBSITES_INDEX)) {
      const data = JSON.parse(fs.readFileSync(WEBSITES_INDEX, 'utf8'));
      data.clients = data.clients || data.sites || [];
      data.sites = data.clients;
      data.activeId = data.activeId || data.activeWebsiteId || 'aaditi-rohan';
      data.defaultClientId = data.defaultClientId || 'aaditi-rohan';
      return data;
    }
  } catch (e) {
    console.error('Error reading client index:', e);
  }
  return { version: '2.0', activeId: 'aaditi-rohan', defaultClientId: 'aaditi-rohan', clients: [], sites: [] };
}

function saveClientIndex(data) {
  data.sites = data.clients || [];
  data.activeWebsiteId = data.activeId;
  fs.writeFileSync(WEBSITES_INDEX, JSON.stringify(data, null, 2), 'utf8');
}

function getClientSettings(slug) {
  const safeSlug = (slug || 'aaditi-rohan').toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  const clientFile = path.join(WEBSITES_DIR, `${safeSlug}.json`);
  if (fs.existsSync(clientFile)) {
    try {
      return JSON.parse(fs.readFileSync(clientFile, 'utf8'));
    } catch(e) {}
  }
  if (fs.existsSync(SETTINGS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
    } catch(e) {}
  }
  return {};
}

function saveClientSettings(slug, settings) {
  const safeSlug = (slug || 'aaditi-rohan').toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  const clientFile = path.join(WEBSITES_DIR, `${safeSlug}.json`);
  fs.writeFileSync(clientFile, JSON.stringify(settings, null, 2), 'utf8');

  // ONLY mirror to global settings.json if editing C1 (default client)
  const index = getClientIndex();
  if (safeSlug === (index.defaultClientId || 'aaditi-rohan')) {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf8');
  }

  // Update index metadata
  const clientEntry = index.clients.find(c => c.slug === safeSlug || c.id === safeSlug);
  if (clientEntry) {
    const g = settings.general || {};
    clientEntry.bride = g.brideName || clientEntry.bride;
    clientEntry.groom = g.groomName || clientEntry.groom;
    clientEntry.title = g.weddingTitle || clientEntry.title;
    clientEntry.dateText = g.weddingDateText || clientEntry.dateText;
    clientEntry.venue = g.venueName || clientEntry.venue;
    clientEntry.theme = settings.templateId || clientEntry.theme;
    clientEntry.openingStyle = settings.openingStyle || clientEntry.openingStyle;
    clientEntry.opening = settings.openingStyle || clientEntry.opening;
    clientEntry.updatedAt = new Date().toISOString();
    saveClientIndex(index);
  }
}

function getClientRsvps(slug) {
  const safeSlug = (slug || 'aaditi-rohan').toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  const rsvpFile = path.join(WEBSITES_DIR, `rsvps_${safeSlug}.json`);
  if (fs.existsSync(rsvpFile)) {
    try {
      return JSON.parse(fs.readFileSync(rsvpFile, 'utf8'));
    } catch(e) {}
  }
  // Fallback to legacy rsvps.json if aaditi-rohan
  if (safeSlug === 'aaditi-rohan' && fs.existsSync(RSVPS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(RSVPS_FILE, 'utf8'));
    } catch(e) {}
  }
  return [];
}

function saveClientRsvps(slug, rsvps) {
  const safeSlug = (slug || 'aaditi-rohan').toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  const rsvpFile = path.join(WEBSITES_DIR, `rsvps_${safeSlug}.json`);
  fs.writeFileSync(rsvpFile, JSON.stringify(rsvps, null, 2), 'utf8');
  if (safeSlug === 'aaditi-rohan') {
    fs.writeFileSync(RSVPS_FILE, JSON.stringify(rsvps, null, 2), 'utf8');
  }
}

function getClientWishes(slug) {
  const safeSlug = (slug || 'aaditi-rohan').toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  const wishFile = path.join(WEBSITES_DIR, `wishes_${safeSlug}.json`);
  if (fs.existsSync(wishFile)) {
    try {
      return JSON.parse(fs.readFileSync(wishFile, 'utf8'));
    } catch(e) {}
  }
  if (safeSlug === 'aaditi-rohan' && fs.existsSync(WISHES_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(WISHES_FILE, 'utf8'));
    } catch(e) {}
  }
  return [];
}

function saveClientWishes(slug, wishes) {
  const safeSlug = (slug || 'aaditi-rohan').toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  const wishFile = path.join(WEBSITES_DIR, `wishes_${safeSlug}.json`);
  fs.writeFileSync(wishFile, JSON.stringify(wishes, null, 2), 'utf8');
  if (safeSlug === 'aaditi-rohan') {
    fs.writeFileSync(WISHES_FILE, JSON.stringify(wishes, null, 2), 'utf8');
  }
}

// ==========================================
// ADMIN AUTHENTICATION HELPERS
// ==========================================

function isAdminAuthenticated(req) {
  const authHeader = req.headers['authorization'] || '';
  const customHeader = req.headers['x-admin-token'] || '';
  let token = customHeader;
  if (!token && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  }
  if (!token) {
    const parsed = new URL(req.url, 'http://localhost');
    token = parsed.searchParams.get('admin_token');
  }

  if (!token) return false;

  const session = activeAdminTokens.get(token);
  if (!session) return false;
  if (Date.now() > session.expiresAt) {
    activeAdminTokens.delete(token);
    return false;
  }
  return true;
}

function requireAdmin(req, res) {
  if (isAdminAuthenticated(req)) return true;
  sendJSON(res, 401, { error: 'Admin sign-in required' });
  return false;
}

function createAdminSession() {
  const token = 'adm_' + crypto.randomBytes(24).toString('hex');
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  activeAdminTokens.set(token, { createdAt: Date.now(), expiresAt });
  return { token, expiresAt };
}

// ==========================================
// ZIP & STANDALONE GENERATORS
// ==========================================

function buildNativeZip(files) {
  const localHeaders = [];
  const centralHeaders = [];
  let offset = 0;

  for (const file of files) {
    const cleanPath = file.name.replace(/\\/g, '/').replace(/^\/+/, '');
    const filenameBuf = Buffer.from(cleanPath, 'utf8');
    const dataBuf = Buffer.isBuffer(file.data) ? file.data : Buffer.from(file.data, 'utf8');
    const uncompressedSize = dataBuf.length;
    const crc = zlib.crc32(dataBuf);
    const compressedData = zlib.deflateRawSync(dataBuf);
    const compressedSize = compressedData.length;

    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0);
    lh.writeUInt16LE(20, 4);
    lh.writeUInt16LE(0, 6);
    lh.writeUInt16LE(8, 8);
    lh.writeUInt16LE(0, 10);
    lh.writeUInt16LE(0, 12);
    lh.writeUInt32LE(crc, 14);
    lh.writeUInt32LE(compressedSize, 18);
    lh.writeUInt32LE(uncompressedSize, 22);
    lh.writeUInt16LE(filenameBuf.length, 26);
    lh.writeUInt16LE(0, 28);

    localHeaders.push(lh, filenameBuf, compressedData);

    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0);
    ch.writeUInt16LE(20, 4);
    ch.writeUInt16LE(20, 6);
    ch.writeUInt16LE(0, 8);
    ch.writeUInt16LE(8, 10);
    ch.writeUInt16LE(0, 12);
    ch.writeUInt16LE(0, 14);
    ch.writeUInt32LE(crc, 16);
    ch.writeUInt32LE(compressedSize, 20);
    ch.writeUInt32LE(uncompressedSize, 24);
    ch.writeUInt16LE(filenameBuf.length, 28);
    ch.writeUInt16LE(0, 30);
    ch.writeUInt16LE(0, 32);
    ch.writeUInt16LE(0, 34);
    ch.writeUInt16LE(0, 36);
    ch.writeUInt32LE(0, 38);
    ch.writeUInt32LE(offset, 42);

    centralHeaders.push(ch, filenameBuf);
    offset += lh.length + filenameBuf.length + compressedData.length;
  }

  const centralDirOffset = offset;
  const centralDirSize = centralHeaders.reduce((sum, b) => sum + b.length, 0);

  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(files.length, 8);
  eocd.writeUInt16LE(files.length, 10);
  eocd.writeUInt32LE(centralDirSize, 12);
  eocd.writeUInt32LE(centralDirOffset, 16);
  eocd.writeUInt16LE(0, 20);

  return Buffer.concat([...localHeaders, ...centralHeaders, eocd]);
}

function bundleClientNetlifyZip(slug) {
  const safeSlug = (slug || 'aaditi-rohan').toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  const clientSettings = getClientSettings(safeSlug);
  const clientRsvps = getClientRsvps(safeSlug);
  const clientWishes = getClientWishes(safeSlug);

  const filesToZip = [];
  const addFile = (relPath, zipName) => {
    const fullP = path.join(PUBLIC_DIR, relPath);
    if (fs.existsSync(fullP) && fs.statSync(fullP).isFile()) {
      filesToZip.push({ name: zipName || relPath, data: fs.readFileSync(fullP) });
    }
  };
  const addFolder = (dirRel) => {
    const fullDir = path.join(PUBLIC_DIR, dirRel);
    if (!fs.existsSync(fullDir)) return;
    const items = fs.readdirSync(fullDir);
    for (const item of items) {
      const itemRel = path.join(dirRel, item);
      const fullItem = path.join(PUBLIC_DIR, itemRel);
      const stat = fs.statSync(fullItem);
      if (stat.isFile()) {
        filesToZip.push({ name: itemRel.replace(/\\/g, '/'), data: fs.readFileSync(fullItem) });
      } else if (stat.isDirectory()) {
        addFolder(itemRel);
      }
    }
  };

  // Compile index.html with injected client settings
  let indexHtml = fs.readFileSync(path.join(PUBLIC_DIR, 'index.html'), 'utf8');
  const injectScript = `\n    <!-- Pre-compiled Wedding Configurations for Client: ${safeSlug} -->\n    <script>\n        window.ACTIVE_CLIENT_SLUG = "${safeSlug}";\n        window.PRELOADED_WEDDING_SETTINGS = ${JSON.stringify(clientSettings, null, 2)};\n    <\/script>\n</head>`;
  indexHtml = indexHtml.replace('</head>', injectScript);
  filesToZip.push({ name: 'index.html', data: Buffer.from(indexHtml, 'utf8') });

  // Add settings and data scoped to this client
  filesToZip.push({ name: 'settings.json', data: Buffer.from(JSON.stringify(clientSettings, null, 2), 'utf8') });
  filesToZip.push({ name: 'rsvps.json', data: Buffer.from(JSON.stringify(clientRsvps, null, 2), 'utf8') });
  filesToZip.push({ name: 'wishes.json', data: Buffer.from(JSON.stringify(clientWishes, null, 2), 'utf8') });

  // Add supporting client assets & scripts
  addFile('admin.html');
  addFile('templates.json');
  addFile('style.css');
  addFile('themes_indian.css');
  addFile('invitation_open_styles.css');
  addFile('indian_culture_features.css');
  addFile('admin.css');
  addFile('script.js');
  addFile('admin.js');
  addFile('language_engine.js');
  addFile('i18n_translations.js');
  addFile('indian_culture_engine.js');
  addFile('_redirects');
  addFile('netlify.toml');

  // Media
  addFolder('assets');
  if (fs.existsSync(path.join(UPLOADS_DIR, safeSlug))) {
    addFolder(`uploads/${safeSlug}`);
  }

  const readme = `========================================================
ROYAL INDIAN WEDDING INVITATION WEBSITE PACKAGE
Client: ${safeSlug}
Deployable to Netlify Drop in 10 seconds!
========================================================
1. Open https://app.netlify.com/drop
2. Drag and drop this extracted ZIP folder onto the dropzone.
3. Your wedding website is LIVE instantly with free HTTPS!
========================================================`;
  filesToZip.push({ name: 'README.txt', data: Buffer.from(readme, 'utf8') });

  return buildNativeZip(filesToZip);
}

function compileClientStandaloneHtml(slug) {
  const safeSlug = (slug || 'aaditi-rohan').toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  const settings = getClientSettings(safeSlug);
  let html = fs.readFileSync(path.join(PUBLIC_DIR, 'index.html'), 'utf8');

  const preloadedTag = `
    <!-- Pre-compiled Wedding Configurations & Live Data for ${safeSlug} -->
    <script>
        window.ACTIVE_CLIENT_SLUG = "${safeSlug}";
        window.PRELOADED_WEDDING_SETTINGS = ${JSON.stringify(settings, null, 2)};
    </script>
</head>`;
  html = html.replace('</head>', preloadedTag);

  // Inline CSS
  const cssFiles = ['style.css', 'themes_indian.css', 'invitation_open_styles.css', 'indian_culture_features.css'];
  cssFiles.forEach(file => {
    const filePath = path.join(PUBLIC_DIR, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      html = html.replace(`<link rel="stylesheet" href="/${file}">`, `<style>\n/* --- ${file} --- */\n${content}\n</style>`);
      html = html.replace(`<link rel="stylesheet" href="${file}">`, `<style>\n/* --- ${file} --- */\n${content}\n</style>`);
    }
  });

  // Inline JS
  const jsFiles = ['script.js', 'i18n_translations.js', 'language_engine.js', 'indian_culture_engine.js'];
  jsFiles.forEach(file => {
    const filePath = path.join(PUBLIC_DIR, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      html = html.replace(`<script src="/${file}"></script>`, `<script>\n// --- ${file} ---\n${content}\n</script>`);
      html = html.replace(`<script src="${file}"></script>`, `<script>\n// --- ${file} ---\n${content}\n</script>`);
    }
  });

  return html;
}

// ==========================================
// HTTP SERVER & DISPATCHER
// ==========================================

const server = http.createServer((req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Filename, Authorization, X-Admin-Token'
    });
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
  const pathname = decodeURI(parsedUrl.pathname);
  const query = parsedUrl.searchParams;

  const readJSON = (cb) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const parsed = body ? JSON.parse(body) : {};
        cb(null, parsed);
      } catch (e) {
        cb(e);
      }
    });
  };

  // -----------------------------------------------------------
  // AUTHENTICATION ROUTES
  // -----------------------------------------------------------
  if (pathname === '/api/auth/login' && req.method === 'POST') {
    readJSON((err, payload) => {
      if (err) return sendJSON(res, 400, { error: 'Invalid JSON payload' });
      const pass = payload.password || payload.pin || '';
      if (pass === ADMIN_PASSWORD) {
        const session = createAdminSession();
        sendJSON(res, 200, {
          success: true,
          message: 'Admin authentication successful',
          token: session.token,
          expiresAt: session.expiresAt
        });
      } else {
        sendJSON(res, 401, { success: false, error: 'अवैध पासवर्ड (Invalid Admin Password)' });
      }
    });
    return;
  }

  if (pathname === '/api/auth/verify' && req.method === 'GET') {
    const isAuth = isAdminAuthenticated(req);
    sendJSON(res, 200, { authenticated: isAuth });
    return;
  }

  if (pathname === '/api/auth/logout' && req.method === 'POST') {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : (req.headers['x-admin-token'] || '');
    if (token) activeAdminTokens.delete(token);
    sendJSON(res, 200, { success: true, message: 'Logged out successfully' });
    return;
  }

  // -----------------------------------------------------------
  // 1. MULTI-CLIENT (TENANT) MANAGEMENT APIS
  // -----------------------------------------------------------

  // 1.1 GET /api/clients or GET /api/websites - List all clients
  if ((pathname === '/api/clients' || pathname === '/api/websites') && req.method === 'GET') {
    const index = getClientIndex();
    sendJSON(res, 200, {
      activeId: index.activeId,
      activeWebsiteId: index.activeId,
      defaultClientId: index.defaultClientId,
      clients: index.clients,
      websites: index.clients,
      sites: index.clients
    });
    return;
  }

  // 1.2 POST /api/clients/create or POST /api/websites/create - Create new client
  if ((pathname === '/api/clients/create' || pathname === '/api/websites/create') && req.method === 'POST') {
    if (!requireAdmin(req, res)) return;
    readJSON((err, payload) => {
      if (err) return sendJSON(res, 400, { error: 'Invalid JSON payload' });
      try {
        const bride = (payload.bride || payload.brideName || '').trim();
        const groom = (payload.groom || payload.groomName || '').trim();
        let slug = (payload.slug || payload.id || '').toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        if (!slug) {
          slug = `wedding-${Date.now().toString(36)}`;
        }

        const clientId = payload.clientId || `client_${slug.replace(/-/g, '_')}`;
        const title = payload.title || (bride && groom ? `चि. सौ. कां. ${bride} आणि चि. ${groom} विवाह सोहळा` : 'शुभ विवाह आमंत्रण');
        const dateText = payload.dateText || payload.date || 'रविवार, १७ डिसेंबर २०२६';
        const venue = payload.venue || payload.venueName || 'माउली गार्डन, बाणेर रोड, पुणे';
        const theme = payload.theme || payload.templateId || 'royal-paithani';
        const opening = payload.openingStyle || payload.opening || 'envelope-wax';
        const lang = payload.language || payload.activeLanguage || 'mr';

        // Load base template from C1 or default
        const baseSettings = getClientSettings('aaditi-rohan');
        let newClientSettings = deepMerge(baseSettings, payload.initialSettings || {});
        newClientSettings.id = slug;
        newClientSettings.clientId = clientId;
        newClientSettings.slug = slug;
        newClientSettings.templateId = theme;
        newClientSettings.openingStyle = opening;
        newClientSettings.activeLanguage = lang;
        newClientSettings.general = newClientSettings.general || {};
        if (bride) newClientSettings.general.brideName = bride;
        if (groom) newClientSettings.general.groomName = groom;
        newClientSettings.general.weddingTitle = title;
        newClientSettings.general.weddingDateText = dateText;
        newClientSettings.general.venueName = venue;
        newClientSettings.general.venueAddress = payload.venueAddress || venue;

        // Save isolated client settings file
        fs.writeFileSync(path.join(WEBSITES_DIR, `${slug}.json`), JSON.stringify(newClientSettings, null, 2), 'utf8');

        // Initialize isolated RSVP & Wishes files
        fs.writeFileSync(path.join(WEBSITES_DIR, `rsvps_${slug}.json`), '[]', 'utf8');
        fs.writeFileSync(path.join(WEBSITES_DIR, `wishes_${slug}.json`), '[]', 'utf8');

        // Update Client Index
        const index = getClientIndex();
        const newClientEntry = {
          id: clientId,
          clientId: clientId,
          slug: slug,
          name: title,
          bride: bride || 'वधू',
          groom: groom || 'वर',
          title: title,
          date: dateText,
          dateText: dateText,
          venue: venue,
          theme: theme,
          openingStyle: opening,
          opening: opening,
          language: lang,
          status: payload.status || 'published',
          isDefault: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        const existIdx = index.clients.findIndex(c => c.slug === slug || c.id === clientId);
        if (existIdx >= 0) index.clients[existIdx] = newClientEntry;
        else index.clients.push(newClientEntry);

        index.activeId = slug;
        saveClientIndex(index);

        sendJSON(res, 201, {
          success: true,
          message: `'${title}' हा नवीन क्लायंट यशस्वीरीत्या तयार झाला!`,
          client: newClientEntry,
          site: newClientEntry
        });
      } catch (e) {
        sendJSON(res, 500, { error: e.message });
      }
    });
    return;
  }

  // 1.3 POST /api/clients/switch or POST /api/websites/switch - Switch active client in admin
  if ((pathname === '/api/clients/switch' || pathname === '/api/websites/switch') && req.method === 'POST') {
    if (!requireAdmin(req, res)) return;
    readJSON((err, payload) => {
      const targetSlug = (payload.slug || payload.id || '').toLowerCase().replace(/[^a-z0-9_-]/g, '-');
      if (!targetSlug) return sendJSON(res, 400, { error: 'Missing client slug' });

      const index = getClientIndex();
      const targetClient = index.clients.find(c => c.slug === targetSlug || c.id === targetSlug);
      if (!targetClient) {
        return sendJSON(res, 404, { error: `Client '${targetSlug}' not found` });
      }

      index.activeId = targetSlug;
      saveClientIndex(index);

      const clientSettings = getClientSettings(targetSlug);
      sendJSON(res, 200, {
        success: true,
        activeWebsiteId: targetSlug,
        activeId: targetSlug,
        message: `सक्रिय क्लायंट बदलला: ${targetSlug}`,
        client: targetClient,
        settings: clientSettings
      });
    });
    return;
  }

  // 1.4 POST /api/clients/status - Update publishing status (published / draft / archived)
  if (pathname === '/api/clients/status' && req.method === 'POST') {
    if (!requireAdmin(req, res)) return;
    readJSON((err, payload) => {
      const slug = (payload.slug || payload.id || '').toLowerCase().replace(/[^a-z0-9_-]/g, '-');
      const newStatus = payload.status; // 'published' | 'draft' | 'archived'
      if (!slug || !newStatus) return sendJSON(res, 400, { error: 'Missing slug or status' });

      const index = getClientIndex();
      const client = index.clients.find(c => c.slug === slug || c.id === slug);
      if (!client) return sendJSON(res, 404, { error: 'Client not found' });

      client.status = newStatus;
      client.updatedAt = new Date().toISOString();
      saveClientIndex(index);

      sendJSON(res, 200, {
        success: true,
        message: `क्लायंट '${slug}' चे स्टेटस '${newStatus}' वर अद्ययावत केले.`,
        client
      });
    });
    return;
  }

  // 1.5 DELETE /api/clients/:slug or DELETE /api/websites/:slug - Delete client with safeguards
  const deleteClientMatch = pathname.match(/^\/api\/(clients|websites)\/([^/]+)$/);
  if (deleteClientMatch && req.method === 'DELETE') {
    if (!requireAdmin(req, res)) return;
    const targetSlug = decodeURIComponent(deleteClientMatch[2]);
    const index = getClientIndex();

    // Safeguard: Do not allow deletion of C1 (default live client)
    if (targetSlug === 'aaditi-rohan' || targetSlug === index.defaultClientId) {
      return sendJSON(res, 403, {
        error: 'मूळ अधिकृत क्लायंट (aaditi-rohan) ही मुख्य सिस्टीम असल्याने ती कायमस्वरूपी ठेवली जाते.'
      });
    }

    try {
      // Remove isolated files
      const clientFile = path.join(WEBSITES_DIR, `${targetSlug}.json`);
      const rsvpFile = path.join(WEBSITES_DIR, `rsvps_${targetSlug}.json`);
      const wishFile = path.join(WEBSITES_DIR, `wishes_${targetSlug}.json`);
      if (fs.existsSync(clientFile)) fs.unlinkSync(clientFile);
      if (fs.existsSync(rsvpFile)) fs.unlinkSync(rsvpFile);
      if (fs.existsSync(wishFile)) fs.unlinkSync(wishFile);

      // Remove from index
      index.clients = index.clients.filter(c => c.slug !== targetSlug && c.id !== targetSlug);
      if (index.activeId === targetSlug) {
        index.activeId = index.defaultClientId || 'aaditi-rohan';
      }
      saveClientIndex(index);

      sendJSON(res, 200, {
        success: true,
        message: `क्लायंट '${targetSlug}' व त्याचा सर्व डेटा सुरक्षितपणे हटवला गेला.`,
        deleted: targetSlug,
        activeId: index.activeId
      });
    } catch(e) {
      sendJSON(res, 500, { error: e.message });
    }
    return;
  }

  // -----------------------------------------------------------
  // 2. ISOLATED SETTINGS APIS
  // -----------------------------------------------------------

  // 2.1 GET /api/settings - Fetch settings (client-aware via ?client= or activeId)
  if (pathname === '/api/settings' && req.method === 'GET') {
    const clientParam = query.get('client') || query.get('site') || query.get('id');
    const index = getClientIndex();
    const effectiveSlug = clientParam || index.activeId || 'aaditi-rohan';
    const settings = getClientSettings(effectiveSlug);
    sendJSON(res, 200, settings);
    return;
  }

  // 2.2 POST /api/settings - Save settings isolated to target client
  if (pathname === '/api/settings' && req.method === 'POST') {
    if (!requireAdmin(req, res)) return;
    readJSON((err, updatedSettings) => {
      if (err) return sendJSON(res, 400, { error: 'Invalid JSON body' });
      try {
        const clientParam = query.get('client') || query.get('site') || updatedSettings.slug || updatedSettings.id;
        const index = getClientIndex();
        const targetSlug = clientParam || index.activeId || 'aaditi-rohan';

        saveClientSettings(targetSlug, updatedSettings);

        sendJSON(res, 200, {
          success: true,
          message: `क्लायंट '${targetSlug}' चे बदल यशस्वीरीत्या सेव्ह झाले!`,
          targetSlug
        });
      } catch (e) {
        sendJSON(res, 500, { error: e.message });
      }
    });
    return;
  }

  // 2.3 GET /api/templates
  if (pathname === '/api/templates' && req.method === 'GET') {
    if (fs.existsSync(TEMPLATES_FILE)) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      fs.createReadStream(TEMPLATES_FILE).pipe(res);
    } else {
      sendJSON(res, 200, { templates: [] });
    }
    return;
  }

  // -----------------------------------------------------------
  // 3. ISOLATED RSVPS & GUEST LIST APIS
  // -----------------------------------------------------------

  if (pathname === '/api/rsvp') {
    const clientSlug = query.get('client') || query.get('site') || getClientIndex().activeId || 'aaditi-rohan';

    // GET /api/rsvp?client=<slug>
    if (req.method === 'GET') {
      if (!requireAdmin(req, res)) return;
      const rsvps = getClientRsvps(clientSlug);
      sendJSON(res, 200, rsvps);
      return;
    }

    // POST /api/rsvp - Submit RSVP isolated to client
    if (req.method === 'POST') {
      readJSON((err, payload) => {
        if (err) return sendJSON(res, 400, { error: 'Invalid JSON body' });
        const targetClient = payload.client || payload.site || clientSlug;
        const list = getClientRsvps(targetClient);
        const newRsvp = {
          id: payload.id || 'rsvp_' + Date.now(),
          name: payload.name || 'अतिथी',
          phone: payload.phone || '',
          guests: payload.guests || '1',
          attending: payload.attending || 'होय, नक्की येणार',
          events: payload.events || ['विवाह सोहळा'],
          wishes: payload.wishes || '',
          timestamp: payload.timestamp || new Date().toISOString()
        };
        list.unshift(newRsvp);
        saveClientRsvps(targetClient, list);

        // Also if wishes included, save to client's wishes
        if (payload.wishes) {
          const wishList = getClientWishes(targetClient);
          wishList.unshift({
            id: 'wish_' + Date.now(),
            name: newRsvp.name,
            message: String(payload.wishes).slice(0, 600),
            city: 'पुणे',
            timestamp: 'आत्ताच'
          });
          saveClientWishes(targetClient, wishList);
        }

        sendJSON(res, 201, { success: true, rsvp: newRsvp, client: targetClient });
      });
      return;
    }
  }

  // DELETE /api/rsvp/:id?client=<slug>
  if (pathname.startsWith('/api/rsvp/') && req.method === 'DELETE' && !pathname.endsWith('/clear-all')) {
    if (!requireAdmin(req, res)) return;
    const idToDelete = pathname.replace('/api/rsvp/', '');
    const clientSlug = query.get('client') || query.get('site') || getClientIndex().activeId || 'aaditi-rohan';
    let list = getClientRsvps(clientSlug);
    list = list.filter(r => r.id !== idToDelete);
    saveClientRsvps(clientSlug, list);
    sendJSON(res, 200, { success: true, deleted: idToDelete, count: list.length });
    return;
  }

  // POST /api/rsvp/clear-all?client=<slug>
  if (pathname === '/api/rsvp/clear-all' && req.method === 'POST') {
    if (!requireAdmin(req, res)) return;
    const clientSlug = query.get('client') || query.get('site') || getClientIndex().activeId || 'aaditi-rohan';
    saveClientRsvps(clientSlug, []);
    sendJSON(res, 200, { success: true, message: `All RSVPs cleared for ${clientSlug}`, count: 0 });
    return;
  }

  // GET /api/rsvp/export-csv?client=<slug>
  if (pathname === '/api/rsvp/export-csv' && req.method === 'GET') {
    if (!requireAdmin(req, res)) return;
    const clientSlug = query.get('client') || query.get('site') || getClientIndex().activeId || 'aaditi-rohan';
    const rsvps = getClientRsvps(clientSlug);
    let csv = '\uFEFF';
    csv += 'ID,Name,Phone,Guests,Attending,Events,Wishes,Timestamp\n';
    rsvps.forEach(r => {
      const escape = (str) => '"' + String(str || '').replace(/"/g, '""') + '"';
      csv += [
        escape(r.id),
        escape(r.name),
        escape(r.phone),
        escape(r.guests),
        escape(r.attending),
        escape(Array.isArray(r.events) ? r.events.join('; ') : r.events),
        escape(r.wishes),
        escape(r.timestamp)
      ].join(',') + '\n';
    });

    res.writeHead(200, {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="rsvps_${clientSlug}_${Date.now()}.csv"`
    });
    res.end(csv);
    return;
  }

  // -----------------------------------------------------------
  // 4. ISOLATED WISHES WALL APIS
  // -----------------------------------------------------------

  // Public invitation view exposes only guest message text, never RSVP details.
  if (pathname === '/api/wishes/public' && req.method === 'GET') {
    const clientSlug = query.get('client') || query.get('site') || getClientIndex().activeId || 'aaditi-rohan';
    const seenMessages = new Set();
    const publicMessages = getClientWishes(clientSlug)
      .filter(wish => typeof wish.message === 'string' && wish.message.trim())
      .filter(wish => {
        const key = `${wish.message.trim()}|${wish.timestamp || ''}`;
        if (seenMessages.has(key)) return false;
        seenMessages.add(key);
        return true;
      })
      .slice(0, 30)
      .map(wish => ({ message: wish.message.slice(0, 600), timestamp: wish.timestamp || '' }));
    sendJSON(res, 200, publicMessages);
    return;
  }

  if (pathname === '/api/wishes') {
    const clientSlug = query.get('client') || query.get('site') || getClientIndex().activeId || 'aaditi-rohan';

    // GET /api/wishes?client=<slug>
    if (req.method === 'GET') {
      if (!requireAdmin(req, res)) return;
      const wishes = getClientWishes(clientSlug);
      sendJSON(res, 200, wishes);
      return;
    }

    // POST /api/wishes
    if (req.method === 'POST') {
      readJSON((err, payload) => {
        if (err) return sendJSON(res, 400, { error: 'Invalid JSON body' });
        const targetClient = payload.client || payload.site || clientSlug;
        const list = getClientWishes(targetClient);
        const newWish = {
          id: payload.id || 'wish_' + Date.now(),
          name: payload.name || 'स्नेही पाहुणे',
          message: payload.message || 'हार्दिक शुभेच्छा!',
          city: payload.city || 'पुणे',
          timestamp: payload.timestamp || 'आत्ताच'
        };
        list.unshift(newWish);
        saveClientWishes(targetClient, list);
        sendJSON(res, 201, { success: true, wish: newWish, client: targetClient });
      });
      return;
    }
  }

  // DELETE /api/wishes/:id?client=<slug>
  if (pathname.startsWith('/api/wishes/') && req.method === 'DELETE' && !pathname.endsWith('/clear-all')) {
    if (!requireAdmin(req, res)) return;
    const idToDelete = pathname.replace('/api/wishes/', '');
    const clientSlug = query.get('client') || query.get('site') || getClientIndex().activeId || 'aaditi-rohan';
    let list = getClientWishes(clientSlug);
    list = list.filter(w => w.id !== idToDelete);
    saveClientWishes(clientSlug, list);
    sendJSON(res, 200, { success: true, deleted: idToDelete, count: list.length });
    return;
  }

  // POST /api/wishes/clear-all?client=<slug>
  if (pathname === '/api/wishes/clear-all' && req.method === 'POST') {
    if (!requireAdmin(req, res)) return;
    const clientSlug = query.get('client') || query.get('site') || getClientIndex().activeId || 'aaditi-rohan';
    saveClientWishes(clientSlug, []);
    sendJSON(res, 200, { success: true, message: `All wishes cleared for ${clientSlug}`, count: 0 });
    return;
  }

  // -----------------------------------------------------------
  // 5. ISOLATED MEDIA UPLOADS
  // -----------------------------------------------------------
  if (pathname === '/api/upload' && req.method === 'POST') {
    if (!requireAdmin(req, res)) return;
    const clientSlug = query.get('client') || query.get('site') || getClientIndex().activeId || 'aaditi-rohan';
    const targetDir = path.join(UPLOADS_DIR, clientSlug);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    let rawFilename = req.headers['x-filename'] || `photo_${Date.now()}.jpg`;
    rawFilename = decodeURIComponent(rawFilename).replace(/[^a-zA-Z0-9._-]/g, '_');
    const destFile = path.join(targetDir, rawFilename);

    const writeStream = fs.createWriteStream(destFile);
    req.pipe(writeStream);

    writeStream.on('finish', () => {
      const publicUrl = `/uploads/${clientSlug}/${rawFilename}`;
      sendJSON(res, 200, {
        success: true,
        message: 'File uploaded successfully',
        url: publicUrl,
        filename: rawFilename,
        client: clientSlug
      });
    });

    writeStream.on('error', (err) => {
      sendJSON(res, 500, { error: err.message });
    });
    return;
  }

  // -----------------------------------------------------------
  // 6. ISOLATED STANDALONE DOWNLOADS
  // -----------------------------------------------------------

  // GET /api/download-zip?client=<slug>
  if (pathname === '/api/download-zip' && req.method === 'GET') {
    const clientSlug = query.get('client') || query.get('site') || getClientIndex().activeId || 'aaditi-rohan';
    try {
      const zipBuffer = bundleClientNetlifyZip(clientSlug);
      res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="wedding_invitation_${clientSlug}_netlify.zip"`,
        'Content-Length': zipBuffer.length
      });
      res.end(zipBuffer);
    } catch(e) {
      sendJSON(res, 500, { error: e.message });
    }
    return;
  }

  // GET /api/download-html?client=<slug>
  if (pathname === '/api/download-html' && req.method === 'GET') {
    const clientSlug = query.get('client') || query.get('site') || getClientIndex().activeId || 'aaditi-rohan';
    try {
      const html = compileClientStandaloneHtml(clientSlug);
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="wedding_invitation_${clientSlug}.html"`
      });
      res.end(html);
    } catch(e) {
      sendJSON(res, 500, { error: e.message });
    }
    return;
  }

  // -----------------------------------------------------------
  // 7. PUBLIC MULTI-TENANT WEBSITE ROUTING & STATIC ASSETS
  // -----------------------------------------------------------

  // Direct clean URL support: /c/:slug or /sites/:slug
  const clientPathMatch = pathname.match(/^\/(c|sites)\/([^/]+)\/?$/);
  if (clientPathMatch && req.method === 'GET') {
    const requestedSlug = decodeURIComponent(clientPathMatch[2]).toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    const clientSettings = getClientSettings(requestedSlug);
    let indexHtml = fs.readFileSync(path.join(PUBLIC_DIR, 'index.html'), 'utf8');

    // Injected client data
    const injectHead = `
    <!-- Multi-Tenant Injected Client: ${requestedSlug} -->
    <script>
        window.ACTIVE_CLIENT_SLUG = "${requestedSlug}";
        window.PRELOADED_WEDDING_SETTINGS = ${JSON.stringify(clientSettings, null, 2)};
    </script>
</head>`;
    indexHtml = indexHtml.replace('</head>', injectHead);

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(indexHtml);
    return;
  }

  // Root routing
  let reqPath = pathname;
  if (reqPath === '/' || reqPath === '') {
    const clientParam = query.get('client') || query.get('site') || query.get('id');

    // If no client specified, redirect to admin panel
    if (!clientParam) {
      res.writeHead(302, { 'Location': '/admin' });
      res.end();
      return;
    }

    const index = getClientIndex();
    const targetSlug = clientParam;
    const clientSettings = getClientSettings(targetSlug);

    let indexHtml = fs.readFileSync(path.join(PUBLIC_DIR, 'index.html'), 'utf8');
    const injectHead = `
    <!-- Injected Client: ${targetSlug} -->
    <script>
        window.ACTIVE_CLIENT_SLUG = "${targetSlug}";
        window.PRELOADED_WEDDING_SETTINGS = ${JSON.stringify(clientSettings, null, 2)};
    </script>
</head>`;
    indexHtml = indexHtml.replace('</head>', injectHead);

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(indexHtml);
    return;
  }

  if (reqPath === '/admin') reqPath = '/admin.html';

  const filePath = path.join(PUBLIC_DIR, reqPath);
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Access Denied');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Range requests for video/audio streaming
    const range = req.headers.range;
    if (range && (ext === '.mp4' || ext === '.webm' || ext === '.mp3')) {
      const total = stats.size;
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : total - 1;
      const chunkSize = (end - start) + 1;

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType
      });
      fs.createReadStream(filePath, { start, end }).pipe(res);
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': ext === '.json' || ext === '.html' ? 'no-cache, no-store, must-revalidate' : 'public, max-age=3600'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`========================================================`);
    console.log(`🌸 MULTI-TENANT ROYAL INDIAN WEDDING PLATFORM ENGINE 🌸`);
    console.log(`========================================================`);
    console.log(`✓ Public Default (C1):    http://localhost:${PORT}/`);
    console.log(`✓ Client URL Example:     http://localhost:${PORT}/c/priya-rohit`);
    console.log(`✓ Admin Control Panel:    http://localhost:${PORT}/admin`);
    console.log(`========================================================`);
  });
}

module.exports = server;
