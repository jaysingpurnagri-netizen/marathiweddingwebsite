const fs = require('fs');
const html = fs.readFileSync('C:/Users/Aspire 3/.gemini/antigravity/scratch/marathi-wedding-website/admin.html', 'utf8');
const lines = html.split('\n');

console.log('--- Lines 1200-1300 of admin.html ---');
console.log(lines.slice(1205, 1260).join('\n'));
