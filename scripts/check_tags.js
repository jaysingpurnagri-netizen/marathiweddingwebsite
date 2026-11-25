const fs = require('fs');
const h = fs.readFileSync('index.html', 'utf8');

const css = ['style.css', 'themes_indian.css', 'invitation_open_styles.css', 'indian_culture_features.css'];
css.forEach(f => {
    const tag = `<link rel="stylesheet" href="${f}">`;
    console.log(f, ':', h.includes(tag) ? 'MATCH' : 'NO MATCH');
});

const js = ['script.js', 'i18n_translations.js', 'language_engine.js', 'indian_culture_engine.js'];
js.forEach(f => {
    const tag = `<script src="${f}"></script>`;
    console.log(f, ':', h.includes(tag) ? 'MATCH' : 'NO MATCH');
});

// Also check admin_cultural_extensions.js reference
console.log('admin_cultural_extensions.js ref:', h.includes('admin_cultural_extensions') ? 'YES' : 'NO');
