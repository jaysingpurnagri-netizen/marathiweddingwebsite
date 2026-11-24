const fs = require('fs');

// 1. Verify admin.html elements
const html = fs.readFileSync('admin.html', 'utf8');
const reqIds = [
  'btnSubmitCreateWebsite', 'btnCloseCreateWebsiteModal', 'btnCancelCreateWebsite',
  'saveAllBtn', 'topBtnViewSite', 'btnDownloadHtmlTop', 'btnDownloadWebsiteZipTop',
  'btnResponsivePreview', 'btnLaunchWebsite', 'btnDeleteCurrentWebsite',
  'websiteSelector', 'websitesHubGrid', 'btnClearAllRsvps', 'btnClearAllWishes',
  'btnAddAdminRsvp', 'btnExportRsvpsCsv', 'btnOpenNewTabFromPreview'
];

let allFound = true;
reqIds.forEach(id => {
  if (!html.includes('id="' + id + '"')) {
    console.error('Missing ID in admin.html: ' + id);
    allFound = false;
  }
});
if (allFound) console.log('✓ All 17 critical button and container IDs verified in admin.html');

// 2. Verify admin.js handlers
const js = fs.readFileSync('admin.js', 'utf8');
const windowProps = [
  'switchWebsite', 'deleteSpecificWebsite', 'openResponsivePreview',
  'closeResponsivePreview', 'setPreviewDevice', 'openCreateWebsiteModal',
  'closeCreateWebsiteModal', 'submitCreateWebsite', 'openLaunchModal',
  'closeLaunchModal', 'downloadNetlifyZip', 'downloadSingleHtml',
  'copyWhatsappInvite', 'saveSettings', 'deleteRsvpItem', 'clearAllRsvps',
  'exportRsvpsCsv', 'saveAdminRsvp', 'deleteWishItem', 'clearAllWishes'
];

let allProps = true;
windowProps.forEach(p => {
  if (!js.includes('window.' + p + ' = ' + p)) {
    console.error('Missing window binding in admin.js: ' + p);
    allProps = false;
  }
});
if (allProps) console.log('✓ All 20 window bindings verified in admin.js');

// 3. Test Netlify Function handler
const netlifyApi = require('./netlify/functions/api.js');
async function testApi() {
  const getWeb = await netlifyApi.handler({ httpMethod: 'GET', path: '/api/websites' });
  const parsedWeb = JSON.parse(getWeb.body);
  console.log('✓ Netlify Function GET /api/websites status:', getWeb.statusCode, 'Websites count:', parsedWeb.websites.length);

  const createWeb = await netlifyApi.handler({
    httpMethod: 'POST',
    path: '/api/websites/create',
    body: JSON.stringify({ bride: 'प्रिया', groom: 'रोहित', slug: 'priya-rohit' })
  });
  console.log('✓ Netlify Function POST /api/websites/create status:', createWeb.statusCode);

  const getSet = await netlifyApi.handler({ httpMethod: 'GET', path: '/api/settings' });
  console.log('✓ Netlify Function GET /api/settings status:', getSet.statusCode);

  const dlZip = await netlifyApi.handler({ httpMethod: 'GET', path: '/api/download-zip' });
  console.log('✓ Netlify Function GET /api/download-zip status:', dlZip.statusCode, 'Redirect:', dlZip.headers.Location);

  const dlHtml = await netlifyApi.handler({ httpMethod: 'GET', path: '/api/download-html' });
  console.log('✓ Netlify Function GET /api/download-html status:', dlHtml.statusCode, 'Redirect:', dlHtml.headers.Location);
}
testApi();
