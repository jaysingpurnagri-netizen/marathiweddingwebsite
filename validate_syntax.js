const { execSync } = require('child_process');
const path = require('path');

const targetDir = 'C:/Users/Aspire 3/.gemini/antigravity/scratch/marathi-wedding-website';
const files = [
    'script.js',
    'admin.js',
    'i18n_translations.js',
    'language_engine.js',
    'indian_culture_engine.js',
    'server.js'
];

let allOk = true;
files.forEach(f => {
    const full = path.join(targetDir, f);
    try {
        execSync(`node -c "${full}"`);
        console.log(`✓ Syntax OK: ${f}`);
    } catch(err) {
        console.error(`✗ Syntax ERROR in: ${f}`);
        console.error(err.message);
        allOk = false;
    }
});

if (allOk) {
    console.log('\nALL 6 JAVASCRIPT FILES PASSED SYNTAX CHECK!');
}
