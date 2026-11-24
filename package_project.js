const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { generateStandaloneHtml } = require('./build_standalone_invitation');

const publicDir = 'C:/Users/Aspire 3/.gemini/antigravity/scratch/marathi-wedding-website';

function packageProject() {
    // 1. Ensure standalone HTML is updated
    generateStandaloneHtml();

    // 2. Output ZIP path
    const zipPath = path.join(publicDir, 'indian-culture-wedding-invitations.zip');
    
    // 3. Files to bundle
    const files = [
        'index.html',
        'admin.html',
        'wedding_invitation.html',
        'style.css',
        'admin.css',
        'themes_indian.css',
        'invitation_open_styles.css',
        'indian_culture_features.css',
        'script.js',
        'admin.js',
        'i18n_translations.js',
        'language_engine.js',
        'indian_culture_engine.js',
        'server.js',
        'start_website.bat',
        'settings.json',
        'templates.json',
        'rsvps.json',
        'wishes.json',
        '_redirects',
        'netlify.toml',
        'netlify',
        'websites',
        'assets'
    ];

    try {
        if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
        const cmd = `tar -a -c -f "${zipPath}" ${files.join(' ')}`;
        execSync(cmd, { cwd: publicDir, stdio: 'inherit' });
        const sizeMb = (fs.statSync(zipPath).size / 1024 / 1024).toFixed(1);
        console.log(`Successfully generated ZIP package: ${zipPath} (Size: ${sizeMb} MB)`);
    } catch (err) {
        console.error('Error generating ZIP:', err);
    }
}

if (require.main === module) {
    packageProject();
}

module.exports = { packageProject };
