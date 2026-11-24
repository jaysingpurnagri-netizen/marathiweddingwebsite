const fs = require('fs');
const path = require('path');

const targetDir = 'C:/Users/Aspire 3/.gemini/antigravity/scratch/marathi-wedding-website';

// Read existing admin.html to preserve styling and non-broken parts
const existingHtml = fs.readFileSync(path.join(targetDir, 'admin.html'), 'utf8');

// Insert the missing tab-opening-styles markup
const openingStylesHtml = `
        <!-- TAB: 6 INVITATION OPENING STYLES -->
        <section class="tab-panel" id="tab-opening-styles">
            <div class="pane-header">
                <div>
                    <h2><i class="fa-solid fa-wand-magic-sparkles"></i> ६ विलोभनीय पत्रिका उघडण्याच्या शैली (6 Interactive Opening Styles)</h2>
                    <p>पाहुण्यांनी संकेतस्थळ उघडल्यावर त्यांच्यासमोर निमंत्रण पत्रिका कशी सादर व्हावी हे येथून निवडा. प्रत्येक शैलीत अस्सल पारंपरिक ध्वनी व ३D ॲनिमेशन समाविष्ट आहे.</p>
                </div>
            </div>

            <!-- Active Opening Style Banner -->
            <div class="active-template-banner" id="activeOpeningStyleBanner" style="margin-bottom:24px;">
                <div class="banner-left">
                    <span class="banner-lbl">सध्या निवडलेली ओपनिंग स्टाईल:</span>
                    <h3 class="banner-title" id="activeStyleTitle">१. मेणाची राजमुद्रा पाकीट (Royal Shahi Wax Seal Envelope)</h3>
                </div>
                <div class="banner-right">
                    <a href="index.html" target="_blank" class="btn btn-preview">
                        <i class="fa-solid fa-play"></i> थेट वेबसाईटवर अनुभव पहा
                    </a>
                </div>
            </div>

            <div class="opening-styles-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">
                <!-- Style 1: Wax Seal Envelope -->
                <div class="opening-style-card active" data-style-card="envelope-wax" style="background:#FFFDF9; border:2px solid #D4AF37; border-radius:14px; padding:20px; cursor:pointer; position:relative; box-shadow:0 6px 18px rgba(0,0,0,0.06);">
                    <div style="font-size:2.4rem; text-align:center; margin-bottom:10px;">💌</div>
                    <h3 style="color:#800020; font-size:1.15rem; margin-bottom:6px; text-align:center;">१. शाही मेणाची मुद्रा (Wax Seal)</h3>
                    <p style="font-size:0.85rem; color:#666; text-align:center; min-height:48px;">
                        पारंपरिक राजेशाही पाकीट व लाल मेणाची मुद्रा. पाहुण्यांनी स्पर्श करताच मुद्रा फुटते व सुवर्ण पत्रिका वर येते.
                    </p>
                    <div style="background:rgba(212,175,55,0.15); padding:6px 12px; border-radius:8px; font-size:0.8rem; color:#8C6D1F; font-weight:700; margin:12px 0; text-align:center;">
                        🔊 ध्वनी: अस्सल मेण तडकण्याचा आवाज (Wax Crack)
                    </div>
                    <button type="button" class="btn btn-select-style" data-style="envelope-wax" style="width:100%; background:linear-gradient(135deg, #8B0000, #B22222); color:#FFD700; border:none; padding:10px; border-radius:20px; font-weight:700; cursor:pointer;">
                        ही स्टाईल निवडा ✓
                    </button>
                </div>

                <!-- Style 2: Temple Doors -->
                <div class="opening-style-card" data-style-card="temple-doors" style="background:#FFFDF9; border:2px solid #E0D4C5; border-radius:14px; padding:20px; cursor:pointer; position:relative; box-shadow:0 6px 18px rgba(0,0,0,0.06);">
                    <div style="font-size:2.4rem; text-align:center; margin-bottom:10px;">🚪</div>
                    <h3 style="color:#800020; font-size:1.15rem; margin-bottom:6px; text-align:center;">२. पवित्र मंदिर महाद्वार (Temple Doors)</h3>
                    <p style="font-size:0.85rem; color:#666; text-align:center; min-height:48px;">
                        प्राचीन मंदिराचे पितळी तोरण व भव्य लाकडी दरवाजे. स्पर्श करताच मंदिर घंटा वाजते व कवाडे ३D मध्ये उघडतात.
                    </p>
                    <div style="background:rgba(212,175,55,0.15); padding:6px 12px; border-radius:8px; font-size:0.8rem; color:#8C6D1F; font-weight:700; margin:12px 0; text-align:center;">
                        🔊 ध्वनी: पवित्र मंदिर महाद्वार घंटा (Temple Chime)
                    </div>
                    <button type="button" class="btn btn-select-style" data-style="temple-doors" style="width:100%; background:#F5E8C7; color:#333; border:none; padding:10px; border-radius:20px; font-weight:700; cursor:pointer;">
                        ही स्टाईल निवडा
                    </button>
                </div>

                <!-- Style 3: Royal Scroll -->
                <div class="opening-style-card" data-style-card="royal-scroll" style="background:#FFFDF9; border:2px solid #E0D4C5; border-radius:14px; padding:20px; cursor:pointer; position:relative; box-shadow:0 6px 18px rgba(0,0,0,0.06);">
                    <div style="font-size:2.4rem; text-align:center; margin-bottom:10px;">📜</div>
                    <h3 style="color:#800020; font-size:1.15rem; margin-bottom:6px; text-align:center;">३. शाही फर्मान (Royal Farman Scroll)</h3>
                    <p style="font-size:0.85rem; color:#666; text-align:center; min-height:48px;">
                        गुंडाळलेले शाही फर्मान व सोन्याचे दांडे. रेशमी गाठ सोडताच सुवर्ण कर्णा वाजतो व फर्मान उलगडत जाते.
                    </p>
                    <div style="background:rgba(212,175,55,0.15); padding:6px 12px; border-radius:8px; font-size:0.8rem; color:#8C6D1F; font-weight:700; margin:12px 0; text-align:center;">
                        🔊 ध्वनी: राजेशाही स्वागत तुतारी / बिगुल (Royal Fanfare)
                    </div>
                    <button type="button" class="btn btn-select-style" data-style="royal-scroll" style="width:100%; background:#F5E8C7; color:#333; border:none; padding:10px; border-radius:20px; font-weight:700; cursor:pointer;">
                        ही स्टाईल निवडा
                    </button>
                </div>

                <!-- Style 4: Silk Curtains -->
                <div class="opening-style-card" data-style-card="silk-curtains" style="background:#FFFDF9; border:2px solid #E0D4C5; border-radius:14px; padding:20px; cursor:pointer; position:relative; box-shadow:0 6px 18px rgba(0,0,0,0.06);">
                    <div style="font-size:2.4rem; text-align:center; margin-bottom:10px;">🎭</div>
                    <h3 style="color:#800020; font-size:1.15rem; margin-bottom:6px; text-align:center;">४. रेशमी मखमली पडदा (Silk Curtains)</h3>
                    <p style="font-size:0.85rem; color:#666; text-align:center; min-height:48px;">
                        जरीकाठी रेशमी पडदा व सुवर्ण पदक. स्पर्श करताच रेशमी सळसळ ध्वनीसह पडदा दोन्ही बाजूंना सरकतो व पुष्पवृष्टी होते.
                    </p>
                    <div style="background:rgba(212,175,55,0.15); padding:6px 12px; border-radius:8px; font-size:0.8rem; color:#8C6D1F; font-weight:700; margin:12px 0; text-align:center;">
                        🔊 ध्वनी: मखमली रेशमी सळसळ (Silk Swoosh)
                    </div>
                    <button type="button" class="btn btn-select-style" data-style="silk-curtains" style="width:100%; background:#F5E8C7; color:#333; border:none; padding:10px; border-radius:20px; font-weight:700; cursor:pointer;">
                        ही स्टाईल निवडा
                    </button>
                </div>

                <!-- Style 5: 3D Hardbound Book -->
                <div class="opening-style-card" data-style-card="book-flip" style="background:#FFFDF9; border:2px solid #E0D4C5; border-radius:14px; padding:20px; cursor:pointer; position:relative; box-shadow:0 6px 18px rgba(0,0,0,0.06);">
                    <div style="font-size:2.4rem; text-align:center; margin-bottom:10px;">📖</div>
                    <h3 style="color:#800020; font-size:1.15rem; margin-bottom:6px; text-align:center;">५. ३D लग्नपत्रिका बुक (Hardbound Book)</h3>
                    <p style="font-size:0.85rem; color:#666; text-align:center; min-height:48px;">
                        सोनेरी अक्षरांनी मढवलेली ३D लग्नपत्रिका. स्पर्श करताच पुस्तकाचे पान १८० अंशात उलटून पावन आमंत्रण समोर येते.
                    </p>
                    <div style="background:rgba(212,175,55,0.15); padding:6px 12px; border-radius:8px; font-size:0.8rem; color:#8C6D1F; font-weight:700; margin:12px 0; text-align:center;">
                        🔊 ध्वनी: पत्रिका पान उलटा आवाज (Page Flip)
                    </div>
                    <button type="button" class="btn btn-select-style" data-style="book-flip" style="width:100%; background:#F5E8C7; color:#333; border:none; padding:10px; border-radius:20px; font-weight:700; cursor:pointer;">
                        ही स्टाईल निवडा
                    </button>
                </div>

                <!-- Style 6: Shagun Jewel Box -->
                <div class="opening-style-card" data-style-card="shagun-box" style="background:#FFFDF9; border:2px solid #E0D4C5; border-radius:14px; padding:20px; cursor:pointer; position:relative; box-shadow:0 6px 18px rgba(0,0,0,0.06);">
                    <div style="font-size:2.4rem; text-align:center; margin-bottom:10px;">🎁</div>
                    <h3 style="color:#800020; font-size:1.15rem; margin-bottom:6px; text-align:center;">६. शाही शगुन पेटी (Shagun Jewel Box)</h3>
                    <p style="font-size:0.85rem; color:#666; text-align:center; min-height:48px;">
                        पितळी कुलूप असलेली शाही लाल शगुन पेटी. स्पर्श करताच कुलूप उघडते, पेटीचे झाकण वर उचलले जाते व निमंत्रण वर येते.
                    </p>
                    <div style="background:rgba(212,175,55,0.15); padding:6px 12px; border-radius:8px; font-size:0.8rem; color:#8C6D1F; font-weight:700; margin:12px 0; text-align:center;">
                        🔊 ध्वनी: पेटी कुलूप उघडण्याचा आवाज (Latch Snap)
                    </div>
                    <button type="button" class="btn btn-select-style" data-style="shagun-box" style="width:100%; background:#F5E8C7; color:#333; border:none; padding:10px; border-radius:20px; font-weight:700; cursor:pointer;">
                        ही स्टाईल निवडा
                    </button>
                </div>
            </div>
        </section>
`;

let updatedHtml = existingHtml;

// Replace the empty opening styles comment
if (updatedHtml.includes('<!-- TAB: 6 INVITATION OPENING STYLES -->')) {
    const pos = updatedHtml.indexOf('<!-- TAB: 6 INVITATION OPENING STYLES -->');
    const nextTabPos = updatedHtml.indexOf('<!-- TAB: DIGITAL SHAGUN SETTINGS -->');
    if (nextTabPos > pos) {
        updatedHtml = updatedHtml.substring(0, pos) + openingStylesHtml + '\n' + updatedHtml.substring(nextTabPos);
    }
}

// Update the 25 templates heading to 20 Indian Cultural Themes
updatedHtml = updatedHtml.replace(
    '२५ विलोभनीय विवाह डिझाईन टेम्पलेट्स (25 Wedding Website Templates)',
    '॥ २० भारतीय संस्कृती विवाह डिझाईन थीम्स (20 Indian Cultural Themes) ॥'
);
updatedHtml = updatedHtml.replace(
    'सर्व २५ टेम्पलेट्स',
    'सर्व २० थीम्स'
);

fs.writeFileSync(path.join(targetDir, 'admin.html'), updatedHtml, 'utf8');
console.log('Successfully updated admin.html with full Opening Styles markup and 20 Cultural Themes header!');
