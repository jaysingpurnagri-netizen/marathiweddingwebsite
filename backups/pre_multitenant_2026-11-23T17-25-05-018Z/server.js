// server.js - Full-featured Indian Wedding Platform & Multi-Website Launch Engine
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const PUBLIC_DIR = __dirname;
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');
const SETTINGS_FILE = path.join(PUBLIC_DIR, 'settings.json');
const TEMPLATES_FILE = path.join(PUBLIC_DIR, 'templates.json');
const RSVPS_FILE = path.join(PUBLIC_DIR, 'rsvps.json');
const WISHES_FILE = path.join(PUBLIC_DIR, 'wishes.json');
const WEBSITES_DIR = path.join(PUBLIC_DIR, 'websites');
const WEBSITES_INDEX = path.join(WEBSITES_DIR, 'index.json');

// Ensure directories exist
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(WEBSITES_DIR)) fs.mkdirSync(WEBSITES_DIR, { recursive: true });

// Ensure websites index exists
if (!fs.existsSync(WEBSITES_INDEX)) {
  const initialIndex = {
    activeId: 'aaditi-rohan',
    sites: [
      {
        id: 'aaditi-rohan',
        slug: 'aaditi-rohan',
        name: 'चि. सौ. कां. आदिती आणि चि. रोहन',
        title: 'शुभ विवाह सस्नेह आमंत्रण पत्र (Netlify Live App)',
        dateText: 'रविवार, १७ डिसेंबर २०२६',
        theme: 'royal-paithani',
        opening: 'royal-scroll',
        updatedAt: new Date().toISOString()
      }
    ]
  };
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
    'Access-Control-Allow-Headers': 'Content-Type, X-Filename, Authorization'
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

// Native Zero-Dependency ZIP generator
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

    // Local Header
    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0); // signature
    lh.writeUInt16LE(20, 4);         // version needed
    lh.writeUInt16LE(0, 6);          // flags
    lh.writeUInt16LE(8, 8);          // compression method: deflate
    lh.writeUInt16LE(0, 10);         // time
    lh.writeUInt16LE(0, 12);         // date
    lh.writeUInt32LE(crc, 14);       // crc32
    lh.writeUInt32LE(compressedSize, 18);
    lh.writeUInt32LE(uncompressedSize, 22);
    lh.writeUInt16LE(filenameBuf.length, 26);
    lh.writeUInt16LE(0, 28);         // extra field len

    localHeaders.push(lh, filenameBuf, compressedData);

    // Central Directory Header
    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0); // signature
    ch.writeUInt16LE(20, 4);         // version made by
    ch.writeUInt16LE(20, 6);         // version needed
    ch.writeUInt16LE(0, 8);          // flags
    ch.writeUInt16LE(8, 10);         // method: deflate
    ch.writeUInt16LE(0, 12);         // time
    ch.writeUInt16LE(0, 14);         // date
    ch.writeUInt32LE(crc, 16);       // crc32
    ch.writeUInt32LE(compressedSize, 20);
    ch.writeUInt32LE(uncompressedSize, 24);
    ch.writeUInt16LE(filenameBuf.length, 28);
    ch.writeUInt16LE(0, 30);         // extra len
    ch.writeUInt16LE(0, 32);         // comment len
    ch.writeUInt16LE(0, 34);         // disk number start
    ch.writeUInt16LE(0, 36);         // internal attrs
    ch.writeUInt32LE(0, 38);         // external attrs
    ch.writeUInt32LE(offset, 42);    // relative offset of local header

    centralHeaders.push(ch, filenameBuf);
    offset += lh.length + filenameBuf.length + compressedData.length;
  }

  const centralDirOffset = offset;
  const centralDirSize = centralHeaders.reduce((sum, b) => sum + b.length, 0);

  // End of Central Directory
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0); // signature
  eocd.writeUInt16LE(0, 4);          // disk number
  eocd.writeUInt16LE(0, 6);          // disk with central dir
  eocd.writeUInt16LE(files.length, 8); // total entries this disk
  eocd.writeUInt16LE(files.length, 10); // total entries
  eocd.writeUInt32LE(centralDirSize, 12);
  eocd.writeUInt32LE(centralDirOffset, 16);
  eocd.writeUInt16LE(0, 20);         // comment length

  return Buffer.concat([...localHeaders, ...centralHeaders, eocd]);
}

// Generate Netlify-ready package ZIP in-memory
function bundleNetlifyZip() {
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

  // Add primary files
  addFile('index.html');
  addFile('admin.html');
  addFile('wedding_invitation.html');
  addFile('settings.json');
  addFile('templates.json');
  addFile('rsvps.json');
  addFile('wishes.json');
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

  // Add media folders
  addFolder('assets');
  addFolder('uploads');

  const readme = `========================================================
ROYAL INDIAN WEDDING INVITATION WEBSITE PACKAGE
Deployable to Netlify Drop in 10 seconds!
========================================================

How to launch live on Netlify (Free):
1. Visit https://app.netlify.com/drop in your web browser.
2. Drag and drop this extracted folder onto the dropzone.
3. Your wedding website is instantly LIVE with an official link! (e.g. yourname.netlify.app)
4. Share the link with friends and family via WhatsApp or SMS!
========================================================`;
  filesToZip.push({ name: 'README.txt', data: Buffer.from(readme, 'utf8') });

  return buildNativeZip(filesToZip);
}

// Compile standalone single-file HTML
function compileStandaloneHtml() {
  const { generateStandaloneHtml } = require('./build_standalone_invitation.js');
  return generateStandaloneHtml();
}

const server = http.createServer((req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Filename, Authorization'
    });
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
  const pathname = decodeURI(parsedUrl.pathname);

  // Helper to read JSON request body
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

  // ==========================================
  // 1. MULTI-WEBSITE PROJECT COMMANDS
  // ==========================================

  // 1.1 GET /api/websites - List all wedding website projects
  if (pathname === '/api/websites' && req.method === 'GET') {
    try {
      const indexData = fs.existsSync(WEBSITES_INDEX) ? JSON.parse(fs.readFileSync(WEBSITES_INDEX, 'utf8')) : { activeId: 'aaditi-rohan', sites: [] };
      sendJSON(res, 200, {
        activeWebsiteId: indexData.activeId,
        activeId: indexData.activeId,
        websites: indexData.sites || [],
        sites: indexData.sites || []
      });
    } catch (e) {
      sendJSON(res, 500, { error: e.message });
    }
    return;
  }

  // 1.2 POST /api/websites/create - Create a brand new wedding website project
  if (pathname === '/api/websites/create' && req.method === 'POST') {
    readJSON((err, payload) => {
      if (err) return sendJSON(res, 400, { error: 'Invalid JSON payload' });
      try {
        const slug = (payload.slug || payload.id || `wedding-${Date.now()}`).toLowerCase().replace(/[^a-z0-9_-]/g, '-');
        const projectFile = path.join(WEBSITES_DIR, `${slug}.json`);

        // Base template from current settings or payload
        let baseSettings = fs.existsSync(SETTINGS_FILE) ? JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8')) : {};
        if (payload.initialSettings) {
          baseSettings = deepMerge(baseSettings, payload.initialSettings);
        }
        
        // Apply user-defined values
        baseSettings.general = baseSettings.general || {};
        if (payload.brideName || payload.bride) baseSettings.general.brideName = payload.brideName || payload.bride;
        if (payload.groomName || payload.groom) baseSettings.general.groomName = payload.groomName || payload.groom;
        if (payload.weddingTitle || payload.title) baseSettings.general.weddingTitle = payload.weddingTitle || payload.title;
        if (payload.weddingDateText || payload.date) baseSettings.general.weddingDateText = payload.weddingDateText || payload.date;
        if (payload.venueName || payload.venue) baseSettings.general.venueName = payload.venueName || payload.venue;
        if (payload.venueAddress) baseSettings.general.venueAddress = payload.venueAddress;
        if (payload.templateId || payload.theme) baseSettings.templateId = payload.templateId || payload.theme;
        if (payload.openingStyle || payload.opening) baseSettings.openingStyle = payload.openingStyle || payload.opening;
        if (payload.language) baseSettings.activeLanguage = payload.language;

        fs.writeFileSync(projectFile, JSON.stringify(baseSettings, null, 2), 'utf8');

        // Update index
        const indexData = fs.existsSync(WEBSITES_INDEX) ? JSON.parse(fs.readFileSync(WEBSITES_INDEX, 'utf8')) : { activeId: slug, sites: [] };
        const newSiteEntry = {
          id: slug,
          slug: slug,
          name: payload.name || `चि. सौ. कां. ${baseSettings.general.brideName || 'वधू'} आणि चि. ${baseSettings.general.groomName || 'वर'}`,
          bride: baseSettings.general.brideName,
          groom: baseSettings.general.groomName,
          title: payload.title || baseSettings.general.weddingTitle || 'शुभ विवाह आमंत्रण',
          date: baseSettings.general.weddingDateText,
          dateText: baseSettings.general.weddingDateText || 'लग्न सोहळा',
          venue: baseSettings.general.venueName,
          theme: baseSettings.templateId || 'royal-paithani',
          openingStyle: baseSettings.openingStyle || 'envelope-wax',
          opening: baseSettings.openingStyle || 'envelope-wax',
          updatedAt: new Date().toISOString()
        };

        // If duplicate slug exists, replace it, else push
        const existingIdx = indexData.sites.findIndex(s => s.id === slug);
        if (existingIdx >= 0) {
          indexData.sites[existingIdx] = newSiteEntry;
        } else {
          indexData.sites.push(newSiteEntry);
        }

        // Switch to this new website immediately
        indexData.activeId = slug;
        fs.writeFileSync(WEBSITES_INDEX, JSON.stringify(indexData, null, 2), 'utf8');
        fs.writeFileSync(SETTINGS_FILE, JSON.stringify(baseSettings, null, 2), 'utf8');

        // Compile standalone
        try { compileStandaloneHtml(); } catch (e) {}

        sendJSON(res, 201, {
          success: true,
          message: 'नवीन लग्नपत्रिका प्रकल्प यशस्वीरीत्या तयार झाला!',
          site: newSiteEntry
        });
      } catch (e) {
        sendJSON(res, 500, { error: e.message });
      }
    });
    return;
  }

  // 1.3 POST /api/websites/switch - Switch active wedding website project
  if (pathname === '/api/websites/switch' && req.method === 'POST') {
    readJSON((err, payload) => {
      if (err || !payload.id) return sendJSON(res, 400, { error: 'Missing site ID' });
      try {
        const targetFile = path.join(WEBSITES_DIR, `${payload.id}.json`);
        if (!fs.existsSync(targetFile)) {
          return sendJSON(res, 404, { error: 'Website project file not found' });
        }

        const projectSettings = fs.readFileSync(targetFile, 'utf8');
        fs.writeFileSync(SETTINGS_FILE, projectSettings, 'utf8');

        // Update index
        const indexData = fs.existsSync(WEBSITES_INDEX) ? JSON.parse(fs.readFileSync(WEBSITES_INDEX, 'utf8')) : { activeId: payload.id, sites: [] };
        indexData.activeId = payload.id;
        fs.writeFileSync(WEBSITES_INDEX, JSON.stringify(indexData, null, 2), 'utf8');

        // Recompile standalone
        try { compileStandaloneHtml(); } catch (e) {}

        sendJSON(res, 200, {
          success: true,
          activeWebsiteId: payload.id,
          activeId: payload.id,
          message: `सक्रिय वेबसाईट यशस्वीरीत्या बदलली: ${payload.id}`,
          settings: JSON.parse(projectSettings)
        });
      } catch (e) {
        sendJSON(res, 500, { error: e.message });
      }
    });
    return;
  }

  // 1.4 DELETE /api/websites - Delete a website project
  if (pathname.startsWith('/api/websites/') && req.method === 'DELETE') {
    const siteId = pathname.replace('/api/websites/', '');
    try {
      const targetFile = path.join(WEBSITES_DIR, `${siteId}.json`);
      if (fs.existsSync(targetFile)) fs.unlinkSync(targetFile);

      const indexData = fs.existsSync(WEBSITES_INDEX) ? JSON.parse(fs.readFileSync(WEBSITES_INDEX, 'utf8')) : { activeId: '', sites: [] };
      indexData.sites = indexData.sites.filter(s => s.id !== siteId);
      if (indexData.activeId === siteId && indexData.sites.length > 0) {
        indexData.activeId = indexData.sites[0].id;
        const fallbackSettings = fs.readFileSync(path.join(WEBSITES_DIR, `${indexData.activeId}.json`), 'utf8');
        fs.writeFileSync(SETTINGS_FILE, fallbackSettings, 'utf8');
      }
      fs.writeFileSync(WEBSITES_INDEX, JSON.stringify(indexData, null, 2), 'utf8');

      sendJSON(res, 200, { success: true, message: 'Website project deleted successfully' });
    } catch (e) {
      sendJSON(res, 500, { error: e.message });
    }
    return;
  }

  // ==========================================
  // 2. LAUNCH & EXPORT COMMANDS
  // ==========================================

  // 2.1 POST /api/launch - Complete Website Launch Command
  if (pathname === '/api/launch' && req.method === 'POST') {
    try {
      // 1. Recompile standalone HTML
      compileStandaloneHtml();

      // 2. Generate Netlify-ready ZIP
      const zipBuffer = bundleNetlifyZip();
      const zipPath = path.join(PUBLIC_DIR, 'marathi-wedding-website.zip');
      fs.writeFileSync(zipPath, zipBuffer);

      // 3. Prepare share links & WhatsApp invite
      const settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
      const bride = (settings.general && settings.general.brideName) || 'वधू';
      const groom = (settings.general && settings.general.groomName) || 'वर';
      const dateText = (settings.general && settings.general.weddingDateText) || '';
      const venue = (settings.general && settings.general.venueName) || '';

      const netlifyLiveUrl = 'https://weddinginvitation1010.netlify.app/';
      const waMsg = `🌸 *शुभ विवाह निमंत्रण पत्रिका* 🌸\n\n` +
        `॥ श्री गणेशाय नमः ॥\n` +
        `चि. सौ. कां. ${bride} ❤️ चि. ${groom}\n` +
        `• दिनांक: ${dateText}\n` +
        `• स्थळ: ${venue}\n\n` +
        `आमचे सस्नेह निमंत्रण स्वीकारून नवदाम्पत्यास शुभाशीर्वाद देण्यासाठी खालील लिंकवर डिजिटल लग्नपत्रिका पहा व मंगल संगीत ऐका:\n` +
        `${netlifyLiveUrl}\n\n` +
        `सस्नेह जय महाराष्ट्र! 💐`;

      sendJSON(res, 200, {
        success: true,
        message: 'वेबसाईट यशस्वीरीत्या लाँच व संकलित झाली!',
        standalonePath: 'wedding_invitation.html',
        zipDownloadUrl: '/api/download-zip',
        htmlDownloadUrl: '/api/download-html',
        liveUrl: netlifyLiveUrl,
        netlifyDropUrl: 'https://app.netlify.com/drop',
        whatsappShareText: waMsg
      });
    } catch (e) {
      sendJSON(res, 500, { error: 'Launch failed: ' + e.message });
    }
    return;
  }

  // 2.2 GET /api/download-zip - Download Complete Project ZIP
  if (pathname === '/api/download-zip' && req.method === 'GET') {
    try {
      const zipBuffer = bundleNetlifyZip();
      res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="wedding_website_package.zip"',
        'Content-Length': zipBuffer.length,
        'Access-Control-Allow-Origin': '*'
      });
      res.end(zipBuffer);
    } catch (e) {
      sendJSON(res, 500, { error: 'Failed to generate zip: ' + e.message });
    }
    return;
  }

  // 2.3 GET /api/download-html - Download Standalone Compiled Single-File HTML
  if (pathname === '/api/download-html' && req.method === 'GET') {
    try {
      const htmlPath = compileStandaloneHtml();
      const content = fs.readFileSync(htmlPath);
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': 'attachment; filename="wedding_invitation.html"',
        'Content-Length': content.length,
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content);
    } catch (e) {
      sendJSON(res, 500, { error: 'Failed to generate html: ' + e.message });
    }
    return;
  }

  // 2.4 GET /api/rsvp/export-csv - Stream RSVPs as CSV
  if (pathname === '/api/rsvp/export-csv' && req.method === 'GET') {
    try {
      const rsvps = fs.existsSync(RSVPS_FILE) ? JSON.parse(fs.readFileSync(RSVPS_FILE, 'utf8')) : [];
      const headers = ['ID', 'Guest Name', 'Phone', 'Attendance Status', 'Guest Count', 'Dietary Preference', 'Message / Blessing', 'Created At'];
      
      const escapeCsv = (str) => `"${String(str || '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`;
      let csv = '\uFEFF' + headers.map(escapeCsv).join(',') + '\r\n';

      rsvps.forEach(r => {
        csv += [
          r.id || '',
          r.name || r.guestName || '',
          r.phone || '',
          r.status || r.attendance || 'attending',
          r.count || r.guestsCount || 1,
          r.diet || r.dietary || 'Vegetarian',
          r.message || '',
          r.createdAt || ''
        ].map(escapeCsv).join(',') + '\r\n';
      });

      res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="wedding_rsvps.csv"',
        'Content-Length': Buffer.byteLength(csv, 'utf8'),
        'Access-Control-Allow-Origin': '*'
      });
      res.end(csv);
    } catch (e) {
      sendJSON(res, 500, { error: e.message });
    }
    return;
  }

  // ==========================================
  // 3. SETTINGS & TEMPLATES APIS
  // ==========================================

  // 3.1 GET /api/settings
  if (pathname === '/api/settings' && req.method === 'GET') {
    try {
      if (fs.existsSync(SETTINGS_FILE)) {
        const settingsData = fs.readFileSync(SETTINGS_FILE, 'utf-8');
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(settingsData);
      } else {
        sendJSON(res, 404, { error: 'Settings file not found' });
      }
    } catch (e) {
      sendJSON(res, 500, { error: e.message });
    }
    return;
  }

  // 3.2 POST /api/settings - Save settings and sync with active website project
  if (pathname === '/api/settings' && req.method === 'POST') {
    readJSON((err, updatedSettings) => {
      if (err) return sendJSON(res, 400, { error: 'Invalid JSON body' });
      try {
        fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updatedSettings, null, 2), 'utf-8');

        // Also sync to active website project in websites/
        if (fs.existsSync(WEBSITES_INDEX)) {
          const indexData = JSON.parse(fs.readFileSync(WEBSITES_INDEX, 'utf8'));
          if (indexData.activeId) {
            const projectFile = path.join(WEBSITES_DIR, `${indexData.activeId}.json`);
            fs.writeFileSync(projectFile, JSON.stringify(updatedSettings, null, 2), 'utf8');

            // Update title/date in index
            const siteEntry = indexData.sites.find(s => s.id === indexData.activeId);
            if (siteEntry) {
              const b = (updatedSettings.general && updatedSettings.general.brideName) || '';
              const g = (updatedSettings.general && updatedSettings.general.groomName) || '';
              siteEntry.name = `चि. ${g} संग चि. सौ. कां. ${b}`;
              siteEntry.dateText = (updatedSettings.general && updatedSettings.general.weddingDateText) || siteEntry.dateText;
              siteEntry.theme = updatedSettings.templateId || siteEntry.theme;
              siteEntry.opening = updatedSettings.openingStyle || siteEntry.opening;
              siteEntry.updatedAt = new Date().toISOString();
              fs.writeFileSync(WEBSITES_INDEX, JSON.stringify(indexData, null, 2), 'utf8');
            }
          }
        }

        // Recompile standalone HTML
        try { compileStandaloneHtml(); } catch (e) {}

        sendJSON(res, 200, { success: true, message: 'Settings saved and synchronized successfully' });
      } catch (e) {
        sendJSON(res, 500, { error: e.message });
      }
    });
    return;
  }

  // 3.3 GET /api/templates
  if (pathname === '/api/templates' && req.method === 'GET') {
    try {
      if (fs.existsSync(TEMPLATES_FILE)) {
        const templatesData = fs.readFileSync(TEMPLATES_FILE, 'utf-8');
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(templatesData);
      } else {
        sendJSON(res, 404, { error: 'Templates file not found' });
      }
    } catch (e) {
      sendJSON(res, 500, { error: e.message });
    }
    return;
  }

  // ==========================================
  // 4. RSVPS & WISHES APIS
  // ==========================================
  if (pathname === '/api/rsvp') {
    if (req.method === 'GET') {
      try {
        const data = fs.existsSync(RSVPS_FILE) ? JSON.parse(fs.readFileSync(RSVPS_FILE, 'utf8')) : [];
        sendJSON(res, 200, data);
      } catch (e) {
        sendJSON(res, 500, { error: e.message });
      }
      return;
    }
    if (req.method === 'POST') {
      readJSON((err, newRsvp) => {
        if (err) return sendJSON(res, 400, { error: 'Invalid JSON' });
        try {
          newRsvp.id = 'rsvp_' + Date.now();
          newRsvp.createdAt = new Date().toISOString();
          const list = fs.existsSync(RSVPS_FILE) ? JSON.parse(fs.readFileSync(RSVPS_FILE, 'utf8')) : [];
          list.unshift(newRsvp);
          fs.writeFileSync(RSVPS_FILE, JSON.stringify(list, null, 2), 'utf8');
          sendJSON(res, 200, { success: true, rsvp: newRsvp });
        } catch (e) {
          sendJSON(res, 500, { error: e.message });
        }
      });
      return;
    }
  }

  // Delete RSVP
  if (pathname.startsWith('/api/rsvp/') && req.method === 'DELETE') {
    const idToDelete = pathname.replace('/api/rsvp/', '');
    try {
      const list = fs.existsSync(RSVPS_FILE) ? JSON.parse(fs.readFileSync(RSVPS_FILE, 'utf8')) : [];
      const updated = list.filter(r => r.id !== idToDelete);
      fs.writeFileSync(RSVPS_FILE, JSON.stringify(updated, null, 2), 'utf8');
      sendJSON(res, 200, { success: true, message: 'RSVP removed' });
    } catch (e) {
      sendJSON(res, 500, { error: e.message });
    }
    return;
  }

  // Clear All RSVPs
  if (pathname === '/api/rsvp/clear-all' && req.method === 'POST') {
    try {
      fs.writeFileSync(RSVPS_FILE, JSON.stringify([], null, 2), 'utf8');
      sendJSON(res, 200, { success: true, message: 'All RSVPs cleared successfully' });
    } catch (e) {
      sendJSON(res, 500, { error: e.message });
    }
    return;
  }

  if (pathname === '/api/wishes') {
    if (req.method === 'GET') {
      try {
        const data = fs.existsSync(WISHES_FILE) ? JSON.parse(fs.readFileSync(WISHES_FILE, 'utf8')) : [];
        sendJSON(res, 200, data);
      } catch (e) {
        sendJSON(res, 500, { error: e.message });
      }
      return;
    }
    if (req.method === 'POST') {
      readJSON((err, newWish) => {
        if (err) return sendJSON(res, 400, { error: 'Invalid JSON' });
        try {
          newWish.id = 'wish_' + Date.now();
          newWish.likes = 1;
          newWish.createdAt = new Date().toISOString();
          const list = fs.existsSync(WISHES_FILE) ? JSON.parse(fs.readFileSync(WISHES_FILE, 'utf8')) : [];
          list.unshift(newWish);
          fs.writeFileSync(WISHES_FILE, JSON.stringify(list, null, 2), 'utf8');
          sendJSON(res, 200, { success: true, wish: newWish });
        } catch (e) {
          sendJSON(res, 500, { error: e.message });
        }
      });
      return;
    }
  }

  // Delete Wish
  if (pathname.startsWith('/api/wishes/') && req.method === 'DELETE') {
    const idToDelete = pathname.replace('/api/wishes/', '');
    try {
      const list = fs.existsSync(WISHES_FILE) ? JSON.parse(fs.readFileSync(WISHES_FILE, 'utf8')) : [];
      const updated = list.filter(w => w.id !== idToDelete);
      fs.writeFileSync(WISHES_FILE, JSON.stringify(updated, null, 2), 'utf8');
      sendJSON(res, 200, { success: true, message: 'Wish removed' });
    } catch (e) {
      sendJSON(res, 500, { error: e.message });
    }
    return;
  }

  // Clear All Wishes
  if (pathname === '/api/wishes/clear-all' && req.method === 'POST') {
    try {
      fs.writeFileSync(WISHES_FILE, JSON.stringify([], null, 2), 'utf8');
      sendJSON(res, 200, { success: true, message: 'All wishes cleared successfully' });
    } catch (e) {
      sendJSON(res, 500, { error: e.message });
    }
    return;
  }

  // ==========================================
  // 5. MEDIA UPLOAD API
  // ==========================================
  if (pathname === '/api/upload' && req.method === 'POST') {
    let filename = req.headers['x-filename'] || parsedUrl.searchParams.get('filename') || `upload_${Date.now()}`;
    const safeExt = path.extname(filename) || '.bin';
    const baseName = path.basename(filename, safeExt).replace(/[^a-zA-Z0-9_-]/g, '_');
    const finalName = `${Date.now()}_${baseName}${safeExt}`;
    const targetPath = path.join(UPLOADS_DIR, finalName);

    const writeStream = fs.createWriteStream(targetPath);
    req.pipe(writeStream);

    writeStream.on('finish', () => {
      const relativeUrl = `uploads/${finalName}`;
      sendJSON(res, 200, {
        success: true,
        filename: finalName,
        url: relativeUrl
      });
    });

    writeStream.on('error', (err) => {
      sendJSON(res, 500, { error: 'Failed to write file: ' + err.message });
    });
    return;
  }

  // ==========================================
  // 6. STATIC FILE SERVING
  // ==========================================
  let reqPath = pathname;
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
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
    console.log(`🌸 ROYAL INDIAN WEDDING PLATFORM & MULTI-SITE LAUNCH ENGINE 🌸`);
    console.log(`========================================================`);
    console.log(`✓ Public Invitation URL:  http://localhost:${PORT}/`);
    console.log(`✓ Admin Dashboard URL:    http://localhost:${PORT}/admin`);
    console.log(`========================================================`);
  });
}

module.exports = server;
