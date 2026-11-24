const fs = require('fs');
const html = fs.readFileSync('C:/Users/Aspire 3/.gemini/antigravity/scratch/marathi-wedding-website/admin.html', 'utf8');
const lines = html.split('\n');

console.log('--- tab-templates in admin.html ---');
console.log(lines.slice(140, 200).join('\n'));
