const fs = require('fs');
const path = require('path');

const publicDir = 'C:/Users/Aspire 3/.gemini/antigravity/scratch/marathi-wedding-website';

function generateStandaloneHtml() {
    let html = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8');
    const settings = JSON.parse(fs.readFileSync(path.join(publicDir, 'settings.json'), 'utf8'));

    // 1. Preload settings in head
    const preloadedTag = `
    <!-- Pre-compiled Wedding Configurations & Live Data (No server needed!) -->
    <script>
        window.PRELOADED_WEDDING_SETTINGS = ${JSON.stringify(settings, null, 2)};
    </script>
`;
    html = html.replace('</head>', preloadedTag + '</head>');

    // 2. Inline ALL CSS
    const cssFiles = ['style.css', 'themes_indian.css', 'invitation_open_styles.css', 'indian_culture_features.css'];
    cssFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            html = html.replace(`<link rel="stylesheet" href="${file}">`, `<style>\n/* --- ${file} --- */\n${content}\n</style>`);
        }
    });

    // 3. Inline ALL JS
    const jsFiles = ['script.js', 'i18n_translations.js', 'language_engine.js', 'indian_culture_engine.js'];
    jsFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            html = html.replace(`<script src="${file}"></script>`, `<script>\n// --- ${file} ---\n${content}\n</script>`);
        }
    });

    // Write to local project
    const outputPath = path.join(publicDir, 'wedding_invitation.html');
    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`Successfully generated standalone ${outputPath} (Size: ${Math.round(html.length / 1024)} KB)`);

    return outputPath;
}

if (require.main === module) {
    generateStandaloneHtml();
}

module.exports = { generateStandaloneHtml };
