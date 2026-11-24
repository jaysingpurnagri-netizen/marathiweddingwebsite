const fs = require('fs');
const path = require('path');

const targetDir = 'C:/Users/Aspire 3/.gemini/antigravity/scratch/marathi-wedding-website';

const adminJsContent = `
function deepMerge(target, source) {
    if (!source || typeof source !== 'object') return target;
    const output = Object.assign({}, target);
    for (const key of Object.keys(source)) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) &&
            key in target && typeof target[key] === 'object' && !Array.isArray(target[key])) {
            output[key] = deepMerge(target[key], source[key]);
        } else {
            output[key] = source[key];
        }
    }
    return output;
}

/**
 * विवाह सोहळा ॲडमिन कंट्रोल पॅनेल (Admin Management Dashboard)
 * 20 Indian Cultural Themes, 6 Opening Styles, Tri-Lingual Engine, RSVPs, Media & Shagun
 */

// 20 Embedded Authentic Indian Cultural Templates
const INDIAN_CULTURAL_TEMPLATES = [
  {
    "id": "royal-rajputana",
    "name": "राजपुताना रॉयल (Rajputana Royal Crimson & Gold)",
    "culture": "Rajput / Rajasthani",
    "region": "Rajasthan",
    "primaryColor": "#8B0000",
    "accentColor": "#D4AF37",
    "cardBg": "#FFF9F0",
    "symbol": "👑",
    "badge": "Rajasthan Royal Fort",
    "category": "royal",
    "description": "Inspired by the royal palaces of Udaipur and Jaipur with royal crimson velvet, kundan gold accents, and heritage jharokha borders."
  },
  {
    "id": "south-kalyanam",
    "name": "दक्षिण भारतीय कल्याणम् (South Kalyanam Emerald & Temple Gold)",
    "culture": "South Indian / Vedic",
    "region": "Tamil Nadu & Andhra",
    "primaryColor": "#1B4D3E",
    "accentColor": "#C5A059",
    "cardBg": "#FFFDF6",
    "symbol": "🛕",
    "badge": "Temple Gopuram & Kasavu",
    "category": "divine",
    "description": "Sacred Carnatic temple wedding with emerald green silk, rich gopuram brass bells, and authentic Kanchipuram zari weave."
  },
  {
    "id": "punjabi-anand-karaj",
    "name": "आनंद कारज (Punjabi Anand Karaj Saffron & Rose)",
    "culture": "Punjabi / Sikh",
    "region": "Punjab",
    "primaryColor": "#D81B60",
    "accentColor": "#FFA000",
    "cardBg": "#FFFBF5",
    "symbol": "🌸",
    "badge": "Phulkari & Saffron",
    "category": "festive",
    "description": "Joyous celebration featuring vibrant gulabi rose, celebratory saffron, Phulkari embroidery motifs, and spirited dhol energy."
  },
  {
    "id": "bengali-biye",
    "name": "बंगाली बिये (Bengali Biye Alta Red & Ivory)",
    "culture": "Bengali",
    "region": "West Bengal",
    "primaryColor": "#A0001E",
    "accentColor": "#FFD700",
    "cardBg": "#FAF7F2",
    "symbol": "🥻",
    "badge": "Topor & Shankha Pola",
    "category": "royal",
    "description": "Traditional Kolkata cultural aesthetic with Alta red borders, sacred ivory conch shells (Shankha), Topor, and red-white garad patterns."
  },
  {
    "id": "gujarati-lagna",
    "name": "गुजराती लग्न (Gujarati Lagna Kanku & Kesari)",
    "culture": "Gujarati",
    "region": "Gujarat",
    "primaryColor": "#C62828",
    "accentColor": "#FF8F00",
    "cardBg": "#FFFDF7",
    "symbol": "🌾",
    "badge": "Bandhani & Kanku",
    "category": "festive",
    "description": "Vibrant festive Gujarati style with sacred vermilion kanku, kesari saffron, Bandhani tie-dye geometric motifs, and Garba rhythm."
  },
  {
    "id": "kerala-kasavu",
    "name": "केरळ कासावु (Kerala Kasavu Cream & Temple Gold)",
    "culture": "Malayali / Kerala",
    "region": "Kerala",
    "primaryColor": "#8C6D1F",
    "accentColor": "#D4AF37",
    "cardBg": "#FCFBF7",
    "symbol": "🌿",
    "badge": "Kasavu Zari & Brass Diya",
    "category": "minimal",
    "description": "Pristine Kerala aesthetic of handwoven cream Kasavu Mundu with glittering temple gold borders, bronze Nilavilakku, and fresh jasmine."
  },
  {
    "id": "royal-paithani",
    "name": "पेशवाई पैठणी (Marathi Peshwai Paithani Gold & Ruby)",
    "culture": "Marathi / Peshwai",
    "region": "Maharashtra",
    "primaryColor": "#800020",
    "accentColor": "#D4AF37",
    "cardBg": "#FFFDF9",
    "symbol": "🚩",
    "badge": "Paithani Peacock Mor",
    "category": "royal",
    "description": "Shahi Maharashtrian wedding legacy with pure silk Paithani weave, Mor-Bangadi peacock borders, royal ruby, and Sanai-Choughada fanfare."
  },
  {
    "id": "kashmiri-chinar",
    "name": "काश्मिरी चिनार (Kashmiri Chinar Saffron & Walnut)",
    "culture": "Kashmiri",
    "region": "Kashmir",
    "primaryColor": "#C04000",
    "accentColor": "#DAA520",
    "cardBg": "#FDFBF7",
    "symbol": "🍁",
    "badge": "Chinar Leaf & Walnut Wood",
    "category": "nature",
    "description": "Autumn in the valley of Kashmir with royal burnt saffron, copper paisley, Chinar leaf filigree, and warm walnut woodwork textures."
  },
  {
    "id": "awadhi-nawabi",
    "name": "अवधी नवाबी (Awadhi Nawabi Violet & Pearl)",
    "culture": "Awadhi / Uttar Pradesh",
    "region": "Lucknow / UP",
    "primaryColor": "#4A148C",
    "accentColor": "#E0A96D",
    "cardBg": "#FAF7FC",
    "symbol": "🪷",
    "badge": "Chikankari & Jali Lattice",
    "category": "royal",
    "description": "Aristocratic Awadhi courtly elegance with deep imperial violet, mother-of-pearl ivory, and fine Chikankari geometric jaali tracery."
  },
  {
    "id": "marwari-bandhej",
    "name": "मारवाडी बंधेज (Marwari Bandhej Royal Orange & Sandal)",
    "culture": "Marwari",
    "region": "Rajasthan",
    "primaryColor": "#E65100",
    "accentColor": "#FFB300",
    "cardBg": "#FFFBF5",
    "symbol": "🟠",
    "badge": "Bandhej Leheriya & Gold",
    "category": "festive",
    "description": "Celebratory Marwari tradition with festive kesariya orange, Leheriya diagonal waves, sandalwood yellow, and grand royal Shahi hospitality."
  },
  {
    "id": "telugu-pelli",
    "name": "तेलुगु पेळ्ळि (Telugu Pelli Sandalwood & Haldi)",
    "culture": "Telugu",
    "region": "Andhra & Telangana",
    "primaryColor": "#C67100",
    "accentColor": "#FFD54F",
    "cardBg": "#FFFDF5",
    "symbol": "🟡",
    "badge": "Jeelakarra Bellam & Haldi",
    "category": "divine",
    "description": "Auspicious Telugu Vedic marriage with fragrant sandalwood paste, golden turmeric yellow, temple bells, and Jeelakarra-Bellam blessings."
  },
  {
    "id": "odia-jagannath",
    "name": "ओडिया जगन्नाथ (Odia Jagannath Ochre & Crimson)",
    "culture": "Odia",
    "region": "Odisha",
    "primaryColor": "#990000",
    "accentColor": "#E5A93C",
    "cardBg": "#FFFDF7",
    "symbol": "🛕",
    "badge": "Sambalpuri Ikat & Ochre",
    "category": "divine",
    "description": "Sacred Puri Dham heritage with earthy terracotta ochre, auspicious vermilion, Sambalpuri Ikat handloom borders, and divine blessings."
  },
  {
    "id": "goan-coastal",
    "name": "गोवा कोस्टल (Goan Coastal Sapphire & Coral)",
    "culture": "Goan / Konkani",
    "region": "Goa & Konkan",
    "primaryColor": "#0D47A1",
    "accentColor": "#FF7043",
    "cardBg": "#F7FAFD",
    "symbol": "🌊",
    "badge": "Sea Breeze & Pearl Shell",
    "category": "nature",
    "description": "Sunlit coastal tropical celebration with deep Arabian Sea sapphire blue, warm coral blossom, mother-of-pearl shimmer, and gentle waves."
  },
  {
    "id": "peacock-regal",
    "name": "मयूर रीगल (Peacock Regal Teal & Royal Indigo)",
    "culture": "Pan-Indian Royal",
    "region": "Pan-India",
    "primaryColor": "#004D40",
    "accentColor": "#00ACC1",
    "cardBg": "#F4FBF9",
    "symbol": "🦚",
    "badge": "Mayura Plume & Gold Zari",
    "category": "royal",
    "description": "India's national bird majesty featuring iridescent peacock teal, deep indigo feathers, and brilliant Kundan gold filigree arabesques."
  },
  {
    "id": "vintage-farman",
    "name": "शाही फर्मान (Vintage Farman Antique Parchment)",
    "culture": "Heritage Royal Durbar",
    "region": "Historical India",
    "primaryColor": "#4A3525",
    "accentColor": "#C59B27",
    "cardBg": "#FBF5E6",
    "symbol": "📜",
    "badge": "Royal Wax Crest & Scroll",
    "category": "royal",
    "description": "Antique parchment texture with aged gold foil leafing, hand-drawn royal court seal, vintage calligraphy borders, and royal durbar majesty."
  },
  {
    "id": "sacred-havan",
    "name": "पवित्र हवन (Sacred Havan Agni Flame & Sandal)",
    "culture": "Vedic Ritual",
    "region": "Vedic Pan-India",
    "primaryColor": "#BF360C",
    "accentColor": "#FF8F00",
    "cardBg": "#FFFBF5",
    "symbol": "🔥",
    "badge": "Agni Kund & Sandalwood",
    "category": "divine",
    "description": "Sacred Vedic marriage around the holy Agni with warm flame amber, sacred ghee yellow, pure sandalwood paste, and Sanskrit mantras."
  },
  {
    "id": "bollywood-glam",
    "name": "बॉलीवूड ग्लॅम (Bollywood Glamour Champagne & Gold)",
    "culture": "Contemporary Celebrity",
    "region": "Mumbai / Metro",
    "primaryColor": "#1A1A2E",
    "accentColor": "#E2B714",
    "cardBg": "#FCFAF5",
    "symbol": "🥂",
    "badge": "Champagne Sparkle & Black Tie",
    "category": "minimal",
    "description": "High-fashion celebrity Indian red carpet wedding with starry midnight navy, sparkling champagne glitter, and polished gold modern luxury."
  },
  {
    "id": "haldi-sunshine",
    "name": "हळदी सनशाईन (Haldi Sunshine Vibrant Yellow & Marigold)",
    "culture": "Festive Pre-Wedding",
    "region": "Pan-India",
    "primaryColor": "#F57F17",
    "accentColor": "#FDD835",
    "cardBg": "#FFFEF7",
    "symbol": "🌻",
    "badge": "Genda Phool & Turmeric",
    "category": "festive",
    "description": "Dazzling yellow celebratory theme filled with fresh yellow and orange marigold flower garlands, joyous dholak beats, and golden sunshine."
  },
  {
    "id": "modern-minimal",
    "name": "मॉडर्न मिनिमल (Modern Minimal Ivory & Rose Gold)",
    "culture": "Modern Fusion",
    "region": "Urban Global Indian",
    "primaryColor": "#3E2723",
    "accentColor": "#B76E79",
    "cardBg": "#FAF7F5",
    "symbol": "💎",
    "badge": "Rose Gold & Warm Cream",
    "category": "minimal",
    "description": "Sophisticated understated contemporary design with soft rose gold wireframe geometric borders, warm ivory cards, and clean typography."
  },
  {
    "id": "ashtavinayak-divine",
    "name": "अष्टविनायक कृपा (Ashtavinayak Divine Saffron & Yellow)",
    "culture": "Devotional / Ganpati Bappa",
    "region": "Maharashtra",
    "primaryColor": "#E65100",
    "accentColor": "#FFD600",
    "cardBg": "#FFFDF7",
    "symbol": "🕉️",
    "badge": "Modak & Durva Prasanna",
    "category": "divine",
    "description": "Deeply spiritual divine blessing theme with sacred saffron Shendur, bright Modak yellow, Durva grass green accents, and Lord Ganesha's grace."
  }
];

let allTemplates = [...INDIAN_CULTURAL_TEMPLATES];
let weddingSettings = {};
let currentCategoryFilter = 'all';

function showToast(message) {
    let toast = document.getElementById('adminToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'adminToast';
        toast.style.cssText = \`
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #8B0000, #4A040F);
            color: #FFD700;
            border: 2px solid #FFD700;
            padding: 14px 28px;
            border-radius: 30px;
            font-size: 1rem;
            font-weight: 700;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            z-index: 100050;
            transition: all 0.35s ease;
        \`;
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
    }, 4000);
}

function markDirty() {
    const saveBtn = document.getElementById('saveAllBtn');
    if (saveBtn) {
        saveBtn.classList.add('pulse-save');
    }
}

/* ========================================================
   1. TAB SWITCHING
   ======================================================== */
function initTabs() {
    const tabBtns = document.querySelectorAll('.nav-tab');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetPanel = document.getElementById(tabId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

/* ========================================================
   2. 20 CULTURAL THEMES GRID
   ======================================================== */
async function loadTemplates() {
    try {
        const res = await fetch('templates.json');
        if (res.ok) {
            const fetched = await res.json();
            if (Array.isArray(fetched) && fetched.length > 0) {
                allTemplates = fetched;
            }
        }
    } catch(e) {}
    renderTemplatesGrid();
}

function renderTemplatesGrid() {
    const container = document.getElementById('templatesGrid');
    if (!container) return;
    container.innerHTML = '';

    const currentTplId = weddingSettings.templateId || 'royal-rajputana';
    const activeTemplate = allTemplates.find(t => t.id === currentTplId) || allTemplates[0];

    // Update active banner
    if (activeTemplate) {
        const bannerTitle = document.getElementById('activeTemplateTitle');
        if (bannerTitle) {
            bannerTitle.textContent = \`\${activeTemplate.symbol || '🎨'} \${activeTemplate.name} • \${activeTemplate.region || ''}\`;
        }
        const bannerPreviewBtn = document.querySelector('#activeTemplateBanner .btn-preview');
        if (bannerPreviewBtn) {
            bannerPreviewBtn.href = \`index.html?theme=\${encodeURIComponent(currentTplId)}\`;
        }
    }

    const filtered = currentCategoryFilter === 'all'
        ? allTemplates
        : allTemplates.filter(t => t.category === currentCategoryFilter);

    filtered.forEach(tpl => {
        const isActive = tpl.id === currentTplId;
        const card = document.createElement('div');
        card.className = \`template-card \${isActive ? 'active-theme' : ''}\`;
        card.setAttribute('data-id', tpl.id);

        card.innerHTML = \`
            \${isActive ? '<div class="active-ribbon" style="position:absolute; top:10px; right:10px; background:#D4AF37; color:#1a0808; font-weight:700; padding:4px 12px; border-radius:12px; font-size:0.75rem;">सक्रिय ✓</div>' : ''}
            <div style="background:linear-gradient(135deg, \${tpl.primaryColor || '#8B0000'}, \${tpl.accentColor || '#D4AF37'}); height:80px; border-radius:10px 10px 0 0; display:flex; align-items:center; justify-content:center; font-size:2rem; color:#FFF;">
                \${tpl.symbol || '🚩'}
            </div>
            <div class="template-card-body" style="padding:15px; background:\${tpl.cardBg || '#FFF'};">
                <span style="display:inline-block; font-size:0.75rem; font-weight:700; color:\${tpl.primaryColor || '#8B0000'}; background:rgba(212,175,55,0.15); padding:2px 8px; border-radius:10px; margin-bottom:6px;">
                    \${tpl.badge || tpl.region || 'भारतीय संस्कृती'}
                </span>
                <h4 style="font-size:1rem; margin-bottom:4px; color:#222;">\${tpl.name}</h4>
                <p style="font-size:0.8rem; color:#666; margin-bottom:10px; min-height:36px;">\${tpl.description || ''}</p>
                <div style="display:flex; gap:6px; margin-bottom:12px;">
                    <span style="width:18px; height:18px; border-radius:50%; background:\${tpl.primaryColor}; border:1px solid #CCC;" title="Primary"></span>
                    <span style="width:18px; height:18px; border-radius:50%; background:\${tpl.accentColor}; border:1px solid #CCC;" title="Accent"></span>
                    <span style="width:18px; height:18px; border-radius:50%; background:\${tpl.cardBg || '#FFF'}; border:1px solid #CCC;" title="Card BG"></span>
                </div>
                <button type="button" class="btn btn-select-template" style="width:100%; padding:8px; border-radius:20px; font-weight:700; cursor:pointer; background:\${isActive ? '#D4AF37' : '#F0E6D2'}; color:\${isActive ? '#1a0808' : '#333'}; border:none;">
                    \${isActive ? 'सध्या निवडलेली थीम ✓' : 'ही थीम निवडा (Activate)'}
                </button>
            </div>
        \`;

        card.addEventListener('click', () => {
            selectTemplate(tpl.id);
        });

        container.appendChild(card);
    });
}

function selectTemplate(tplId) {
    weddingSettings.templateId = tplId;
    renderTemplatesGrid();
    markDirty();
    const tpl = allTemplates.find(t => t.id === tplId);
    showToast(\`✓ '\${tpl ? tpl.name : tplId}' थीम सक्रिय केली!\`);
}

function initTemplateFilterButtons() {
    const btns = document.querySelectorAll('.tpl-filter-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategoryFilter = btn.getAttribute('data-cat') || 'all';
            renderTemplatesGrid();
        });
    });
}

/* ========================================================
   3. 6 OPENING STYLES SELECTOR
   ======================================================== */
function initOpeningStyles() {
    const cards = document.querySelectorAll('.opening-style-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const style = card.getAttribute('data-style-card');
            selectOpeningStyle(style);
        });
        const btn = card.querySelector('.btn-select-style');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const style = btn.getAttribute('data-style');
                selectOpeningStyle(style);
            });
        }
    });
    updateOpeningStylesUI(weddingSettings.openingStyle || 'envelope-wax');
}

function selectOpeningStyle(styleId) {
    weddingSettings.openingStyle = styleId;
    updateOpeningStylesUI(styleId);
    markDirty();
    const names = {
        'envelope-wax': '१. मेणाची राजमुद्रा पाकीट (Wax Seal Envelope)',
        'temple-doors': '२. पवित्र मंदिर महाद्वार (Temple Doors)',
        'royal-scroll': '३. शाही फर्मान (Royal Farman Scroll)',
        'silk-curtains': '४. रेशमी मखमली पडदा (Silk Curtains)',
        'book-flip': '५. ३D लग्नपत्रिका बुक (Hardbound Book)',
        'shagun-box': '६. शाही शगुन पेटी (Shagun Jewel Box)'
    };
    showToast(\`✓ '\${names[styleId] || styleId}' मुख्य ओपनिंग स्टाईल म्हणून निवडली!\`);
}

function updateOpeningStylesUI(activeStyle) {
    const cards = document.querySelectorAll('.opening-style-card');
    cards.forEach(card => {
        const style = card.getAttribute('data-style-card');
        const isActive = style === activeStyle;
        card.classList.toggle('active', isActive);
        card.style.borderColor = isActive ? '#D4AF37' : '#E0D4C5';
        const btn = card.querySelector('.btn-select-style');
        if (btn) {
            btn.style.background = isActive ? 'linear-gradient(135deg, #8B0000, #B22222)' : '#F5E8C7';
            btn.style.color = isActive ? '#FFD700' : '#333';
            btn.textContent = isActive ? 'ही स्टाईल निवडली आहे ✓' : 'ही स्टाईल निवडा';
        }
    });
    const titleEl = document.getElementById('activeStyleTitle');
    if (titleEl) {
        const names = {
            'envelope-wax': '१. मेणाची राजमुद्रा पाकीट (Royal Shahi Wax Seal Envelope)',
            'temple-doors': '२. पवित्र मंदिर महाद्वार (Sacred Temple Doors)',
            'royal-scroll': '३. शाही फर्मान (Royal Farman Scroll)',
            'silk-curtains': '४. रेशमी मखमली पडदा (Silk Curtains)',
            'book-flip': '५. ३D लग्नपत्रिका बुक (3D Hardbound Book)',
            'shagun-box': '६. शाही शगुन पेटी (Imperial Shagun Jewel Box)'
        };
        titleEl.textContent = names[activeStyle] || activeStyle;
    }
}

/* ========================================================
   4. LANGUAGE SELECTION (मराठी, हिंदी, English)
   ======================================================== */
function initLanguageTab() {
    const langBtns = document.querySelectorAll('.lang-choice-card, .btn-lang-choice');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang) {
                selectLanguage(lang);
            }
        });
    });

    const switchToggle = document.getElementById('cfgAllowGuestLangSwitch');
    if (switchToggle) {
        switchToggle.addEventListener('change', () => {
            weddingSettings.allowGuestLanguageSwitch = switchToggle.checked;
            markDirty();
        });
    }
    updateLanguageUI(weddingSettings.activeLanguage || 'mr');
}

function selectLanguage(langCode) {
    weddingSettings.activeLanguage = langCode;
    updateLanguageUI(langCode);
    markDirty();
    const names = { mr: 'मराठी (Marathi)', hi: 'हिंदी (Hindi)', en: 'English' };
    showToast(\`🌐 अधिकृत भाषा म्हणून '\${names[langCode] || langCode}' निवडली!\`);
}

function updateLanguageUI(activeLang) {
    document.querySelectorAll('.lang-choice-card').forEach(card => {
        const lang = card.getAttribute('data-lang');
        const isActive = lang === activeLang;
        card.classList.toggle('active', isActive);
        card.style.borderColor = isActive ? '#D4AF37' : '#CCC';
    });
}

/* ========================================================
   5. DIGITAL SHAGUN & UPI QR
   ======================================================== */
function initShagunTab() {
    const upiInput = document.getElementById('cfgUpiId');
    const nameInput = document.getElementById('cfgPayeeName');
    const qrImg = document.getElementById('adminQrPreview');

    function updateQr() {
        const id = upiInput ? upiInput.value.trim() : 'aditya.sadhana@okaxis';
        const name = nameInput ? nameInput.value.trim() : 'Aditya & Sadhana';
        const uri = \`upi://pay?pa=\${encodeURIComponent(id)}&pn=\${encodeURIComponent(name)}&am=1101&cu=INR&tn=\${encodeURIComponent('Wedding Shagun')}\`;
        if (qrImg) {
            qrImg.src = \`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=\${encodeURIComponent(uri)}\`;
        }
    }

    if (upiInput) upiInput.addEventListener('input', updateQr);
    if (nameInput) nameInput.addEventListener('input', updateQr);
}

/* ========================================================
   6. RSVP & GUEST LIST DASHBOARD
   ======================================================== */
function initRsvpManager() {
    let rsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');

    function renderTable() {
        const tbody = document.getElementById('rsvpTableBody');
        if (!tbody) return;
        tbody.innerHTML = '';

        let totalHeadcount = 0;
        let attendingCount = 0;
        let decliningCount = 0;

        rsvps.forEach(r => {
            const guestsNum = parseInt(r.guests, 10) || 1;
            totalHeadcount += guestsNum;
            if (r.attending === 'yes') attendingCount++;
            else if (r.attending === 'no') decliningCount++;

            const tr = document.createElement('tr');
            tr.innerHTML = \`
                <td><strong>\${escapeHTML(r.name || 'अनामिक')}</strong></td>
                <td>\${escapeHTML(r.phone || '-')}</td>
                <td><span class="badge" style="background:#E0F2FE; color:#0369A1; padding:2px 8px; border-radius:10px;">\${guestsNum} व्यक्ती</span></td>
                <td><span class="badge" style="background:\${r.attending === 'yes' ? '#DCFCE7' : '#FEE2E2'}; color:\${r.attending === 'yes' ? '#15803D' : '#B91C1C'}; padding:2px 8px; border-radius:10px;">\${r.attending === 'yes' ? 'उपस्थित' : 'अनुपस्थित'}</span></td>
                <td style="font-size:0.85rem; max-width:200px;">"\${escapeHTML(r.wishes || '-')}"</td>
            \`;
            tbody.appendChild(tr);
        });

        const totalEl = document.getElementById('totalRsvpCount');
        if (totalEl) totalEl.textContent = rsvps.length;
        const attEl = document.getElementById('attendingCount');
        if (attEl) attEl.textContent = attendingCount;
        const decEl = document.getElementById('decliningCount');
        if (decEl) decEl.textContent = decliningCount;
        const headEl = document.getElementById('totalGuestsHeadcount');
        if (headEl) headEl.textContent = totalHeadcount;
    }

    renderTable();

    const dlBtn = document.getElementById('btnDownloadRsvpCsv');
    if (dlBtn) {
        dlBtn.addEventListener('click', () => {
            if (!rsvps.length) {
                alert('सध्या कोणतीही आर.एस.व्ही.पी नोंदणी उपलब्ध नाही.');
                return;
            }
            let csv = 'नाव,फोन नंबर,एकूण व्यक्ती,उपस्थिती,शुभेच्छा संदेश,दिनांक\\n';
            rsvps.forEach(r => {
                csv += \`"\${(r.name||'').replace(/"/g, '""')}","\${r.phone||''}","\${r.guests||1}","\${r.attending||''}","\${(r.wishes||'').replace(/"/g, '""')}","\${r.timestamp||''}"\\n\`;
            });
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = \`wedding_rsvps_\${Date.now()}.csv\`;
            a.click();
        });
    }
}

/* ========================================================
   7. FORM POPULATION & DATA COLLECTION
   ======================================================== */
function setVal(id, val) {
    const el = document.getElementById(id);
    if (el && val !== undefined && val !== null) el.value = val;
}

function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
}

function setCheck(id, val) {
    const el = document.getElementById(id);
    if (el) el.checked = Boolean(val);
}

function getCheck(id) {
    const el = document.getElementById(id);
    return el ? el.checked : false;
}

function populateForm(s) {
    const g = s.general || {};
    const m = s.media || {};
    const st = s.story || {};
    const sh = s.shagun || {};

    // General & Couple
    setVal('kuldaivat', g.kuldaivat);
    setVal('weddingTitle', g.weddingTitle);
    setVal('weddingShloka', g.weddingShloka);
    setVal('brideSalutation', g.brideSalutation);
    setVal('brideName', g.brideName);
    setVal('brideParents', g.brideParents);
    setVal('brideGrandparents', g.brideGrandparents);
    setVal('brideNativePlace', g.brideNativePlace);
    setVal('groomSalutation', g.groomSalutation);
    setVal('groomName', g.groomName);
    setVal('groomParents', g.groomParents);
    setVal('groomGrandparents', g.groomGrandparents);
    setVal('groomNativePlace', g.groomNativePlace);
    setVal('weddingDateText', g.weddingDateText);
    setVal('weddingMuhurtText', g.weddingMuhurtText);
    setVal('weddingDateTimeInput', g.weddingDateTimeISO);
    setVal('swagotsukInput', g.swagotsuk);
    setVal('vinitaInput', g.vinita);
    setVal('aherNoteInput', g.aherNote);

    // Venue
    setVal('venueNameInput', g.venueName);
    setVal('venueAddressInput', g.venueAddress);
    setVal('venuePhoneInput', g.venuePhone);
    setVal('venueBhojanTime', g.bhojanTime);
    setVal('venueBhojanNote', g.bhojanNote);
    setVal('googleMapsUrlInput', g.googleMapsUrl);
    setVal('googleMapsEmbedInput', g.googleMapsEmbed);

    // Shagun
    setVal('cfgUpiId', sh.upiId);
    setVal('cfgPayeeName', sh.payeeName);
    setVal('cfgShagunNote', sh.note);
    if (sh.amounts) {
        setVal('cfgAmt1', sh.amounts[0]);
        setVal('cfgAmt2', sh.amounts[1]);
        setVal('cfgAmt3', sh.amounts[2]);
        setVal('cfgAmt4', sh.amounts[3]);
    }

    // Story
    setVal('storyQuoteInput', st.quote);

    // Language
    setCheck('cfgAllowGuestLangSwitch', s.allowGuestLanguageSwitch !== false);

    // Section Visibility
    const sec = s.sections || {};
    setCheck('secShowStory', sec.showStory !== false);
    setCheck('secShowCeremonies', sec.showCeremonies !== false);
    setCheck('secShowVideo', sec.showVideo !== false);
    setCheck('secShowPhotos', sec.showPhotos !== false);
    setCheck('secShowSaptapadi', sec.showSaptapadi !== false);
    setCheck('secShowDresscode', sec.showDresscode !== false);
    setCheck('secShowShagun', sec.showShagun !== false);
    setCheck('secShowAarti', sec.showAarti !== false);
    setCheck('secShowRsvp', sec.showRsvp !== false);
    setCheck('secShowVenue', sec.showVenue !== false);
    setCheck('secShowCountdown', sec.showCountdown !== false);
    setCheck('secShowPetals', sec.showPetals !== false);

    updateOpeningStylesUI(s.openingStyle || 'envelope-wax');
    updateLanguageUI(s.activeLanguage || 'mr');
}

function collectFormData() {
    weddingSettings.general = weddingSettings.general || {};
    const g = weddingSettings.general;

    g.kuldaivat = getVal('kuldaivat');
    g.weddingTitle = getVal('weddingTitle');
    g.weddingShloka = getVal('weddingShloka');
    g.brideSalutation = getVal('brideSalutation');
    g.brideName = getVal('brideName');
    g.brideParents = getVal('brideParents');
    g.brideGrandparents = getVal('brideGrandparents');
    g.brideNativePlace = getVal('brideNativePlace');
    g.groomSalutation = getVal('groomSalutation');
    g.groomName = getVal('groomName');
    g.groomParents = getVal('groomParents');
    g.groomGrandparents = getVal('groomGrandparents');
    g.groomNativePlace = getVal('groomNativePlace');
    g.weddingDateText = getVal('weddingDateText');
    g.weddingMuhurtText = getVal('weddingMuhurtText');
    g.weddingDateTimeISO = getVal('weddingDateTimeInput') || '2026-05-05T12:35:00+05:30';
    g.swagotsuk = getVal('swagotsukInput');
    g.vinita = getVal('vinitaInput');
    g.aherNote = getVal('aherNoteInput');

    g.venueName = getVal('venueNameInput');
    g.venueAddress = getVal('venueAddressInput');
    g.venuePhone = getVal('venuePhoneInput');
    g.bhojanTime = getVal('venueBhojanTime');
    g.bhojanNote = getVal('venueBhojanNote');
    g.googleMapsUrl = getVal('googleMapsUrlInput');
    g.googleMapsEmbed = getVal('googleMapsEmbedInput');

    weddingSettings.shagun = {
        upiId: getVal('cfgUpiId') || 'aditya.sadhana@okaxis',
        payeeName: getVal('cfgPayeeName') || 'Aditya & Sadhana Vivah',
        note: getVal('cfgShagunNote') || 'सस्नेह शुभाशीर्वाद व डिजिटल आहेर',
        amounts: [
            parseInt(getVal('cfgAmt1'), 10) || 501,
            parseInt(getVal('cfgAmt2'), 10) || 1101,
            parseInt(getVal('cfgAmt3'), 10) || 2101,
            parseInt(getVal('cfgAmt4'), 10) || 5101
        ]
    };

    weddingSettings.story = weddingSettings.story || {};
    weddingSettings.story.quote = getVal('storyQuoteInput') || weddingSettings.story.quote;

    weddingSettings.allowGuestLanguageSwitch = getCheck('cfgAllowGuestLangSwitch');

    weddingSettings.sections = {
        showStory: getCheck('secShowStory'),
        showCeremonies: getCheck('secShowCeremonies'),
        showVideo: getCheck('secShowVideo'),
        showPhotos: getCheck('secShowPhotos'),
        showSaptapadi: getCheck('secShowSaptapadi'),
        showDresscode: getCheck('secShowDresscode'),
        showShagun: getCheck('secShowShagun'),
        showAarti: getCheck('secShowAarti'),
        showRsvp: getCheck('secShowRsvp'),
        showVenue: getCheck('secShowVenue'),
        showCountdown: getCheck('secShowCountdown'),
        showPetals: getCheck('secShowPetals')
    };
}

async function saveSettings() {
    collectFormData();

    // 1. Save to LocalStorage
    localStorage.setItem('wedding_settings', JSON.stringify(weddingSettings));

    // 2. Post to Server /api/settings
    try {
        await fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(weddingSettings)
        });
    } catch(e) {}

    showToast('✓ सर्व बदल यशस्वीरीत्या सेव्ह झाले आहेत! (Saved Successfully)');
    const saveBtn = document.getElementById('saveAllBtn');
    if (saveBtn) saveBtn.classList.remove('pulse-save');
}

/* ========================================================
   8. INITIALIZATION
   ======================================================== */
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Load initial settings
    try {
        const local = localStorage.getItem('wedding_settings');
        if (local) {
            weddingSettings = JSON.parse(local);
        }
    } catch(e) {}

    if (!weddingSettings || !weddingSettings.templateId) {
        try {
            const res = await fetch('settings.json');
            if (res.ok) weddingSettings = await res.json();
        } catch(e) {}
    }

    if (!weddingSettings || !weddingSettings.templateId) {
        weddingSettings = {
            templateId: 'royal-rajputana',
            activeLanguage: 'mr',
            openingStyle: 'envelope-wax'
        };
    }

    initTabs();
    initTemplateFilterButtons();
    await loadTemplates();
    initOpeningStyles();
    initLanguageTab();
    initShagunTab();
    initRsvpManager();
    populateForm(weddingSettings);

    const saveBtn = document.getElementById('saveAllBtn');
    if (saveBtn) saveBtn.addEventListener('click', saveSettings);

    // Track input changes
    document.querySelectorAll('input, select, textarea').forEach(inp => {
        inp.addEventListener('change', markDirty);
    });
});
`;

fs.writeFileSync(path.join(targetDir, 'admin.js'), adminJsContent, 'utf8');
console.log('Successfully generated clean, unified admin.js!');
