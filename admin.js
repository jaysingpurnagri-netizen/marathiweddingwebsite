/**
 * विवाह सोहळा ॲडमिन कंट्रोल पॅनेल (Admin Management Dashboard)
 * 20 Cultural Themes, 6 Opening Styles, Multi-Website Hub, Launch Center, Item CRUD & Responsive Preview
 */

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

function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

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
    "id": "royal-paithani",
    "name": "राजेशाही पैठणी थाट (Royal Paithani Gold & Maroon)",
    "culture": "Marathi / Peshwai",
    "region": "Maharashtra",
    "primaryColor": "#800020",
    "accentColor": "#D4AF37",
    "cardBg": "#FFFDF8",
    "symbol": "🦚",
    "badge": "Paithani Zari & Mor",
    "category": "royal",
    "description": "The quintessential Marathi wedding elegance inspired by pure silk Yeola Paithani saree, golden zari borders, and peacock motifs."
  },
  {
    "id": "ghibli-whisper",
    "name": "स्टुडिओ घिबली रोमान्स (Studio Ghibli Watercolor Magic)",
    "culture": "Anime & Nature Romance",
    "region": "Dreamy Landscapes",
    "primaryColor": "#2E5B88",
    "accentColor": "#85C1E9",
    "cardBg": "#F0F8FF",
    "symbol": "🍃",
    "badge": "Watercolor & Clouds",
    "category": "ghibli",
    "description": "Dreamy floating clouds, lush green hills, flying birds, and poetic gentle romance inspired by classic Studio Ghibli masterpieces."
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
    "name": "केरळ कासावू (Kerala Kasavu Cream & Temple Gold)",
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
    "id": "peshwai-durbar",
    "name": "पेशवाई दरबार थाट (Peshwai Maratha Gold & Royal Violet)",
    "culture": "Maratha / Peshwa",
    "region": "Shaniwar Wada, Pune",
    "primaryColor": "#4A0E4E",
    "accentColor": "#E5A93C",
    "cardBg": "#FAF5FC",
    "symbol": "🚩",
    "badge": "Shaniwar Wada & Tula",
    "category": "royal",
    "description": "Historical 18th century Peshwa grandeur featuring deep imperial violet velvet, gold coin borders, and Maratha Rajmudra seal."
  },
  {
    "id": "konkan-breeze",
    "name": "कोकण निसर्ग (Konkan Emerald Green & Coconut Palms)",
    "culture": "Konkani / Coastal",
    "region": "Konkan & Goa",
    "primaryColor": "#0E4D45",
    "accentColor": "#52B788",
    "cardBg": "#F4FBF7",
    "symbol": "🥥",
    "badge": "Betel Nut & Arabian Sea",
    "category": "nature",
    "description": "Lush coastal Maharashtrian beauty with emerald palm leaves, red laterite earth accents, and calming ocean waves."
  },
  {
    "id": "kashmiri-shikara",
    "name": "काश्मिरी शिकार रोमान्स (Kashmiri Saffron & Chinar)",
    "culture": "Kashmiri",
    "region": "Kashmir Valley",
    "primaryColor": "#993300",
    "accentColor": "#E69500",
    "cardBg": "#FFF8F0",
    "symbol": "🍁",
    "badge": "Chinar Leaf & Pashmina",
    "category": "nature",
    "description": "Poetic romance of Dal Lake Shikaras, Chinar golden leaves, delicate walnut carving borders, and Kashmiri Pashmina embroidery."
  },
  {
    "id": "varanasi-ghat",
    "name": "वाराणसी महाआरती (Varanasi Ghat Sandalwood & Marigold)",
    "culture": "Vedic / Spiritual",
    "region": "Varanasi / Kashi",
    "primaryColor": "#B25900",
    "accentColor": "#FFB703",
    "cardBg": "#FFFDF5",
    "symbol": "🪔",
    "badge": "Ganga Aarti & Diya",
    "category": "divine",
    "description": "Sacred Ganga evening Aarti ambience with glowing brass lamps, fragrant sandalwood paste, marigold garlands, and Vedic shlokas."
  },
  {
    "id": "hyderabadi-nizami",
    "name": "हैदराबादी निझामी (Hyderabadi Nizami Pearl & Turquoise)",
    "culture": "Deccani / Nizami",
    "region": "Hyderabad",
    "primaryColor": "#005F73",
    "accentColor": "#E9D8A6",
    "cardBg": "#F7FCFC",
    "symbol": "💎",
    "badge": "Basra Pearls & Jharokha",
    "category": "royal",
    "description": "Imperial Nizami grace adorned with Basra pearls, turquoise blue silk, filigree silver lace, and Chowmahalla chandelier glow."
  },
  {
    "id": "marwari-heritage",
    "name": "मारवाडी हेरिटेज (Marwari Kundan & Velvet)",
    "culture": "Marwari",
    "region": "Shekhawati",
    "primaryColor": "#67001A",
    "accentColor": "#E5A93C",
    "cardBg": "#FAF5F5",
    "symbol": "🦚",
    "badge": "Havelis of Shekhawati",
    "category": "royal",
    "description": "Rich heritage of Shekhawati painted Havelis, opulent Meenakari jewelry detailing, and celebratory festive hospitality."
  },
  {
    "id": "goan-catholic",
    "name": "गोवा पोर्तुगीज हेरिटेज (Goan Heritage Lace & Ivory)",
    "culture": "Goan / Catholic",
    "region": "Goa",
    "primaryColor": "#1D3557",
    "accentColor": "#A8DADC",
    "cardBg": "#F8FBFC",
    "symbol": "⛪",
    "badge": "Azulejos & Lace",
    "category": "minimal",
    "description": "Vintage coastal charm featuring handwoven white lace, Portuguese Azulejo blue tile borders, and romantic seaside sunset hues."
  },
  {
    "id": "assam-muga-silk",
    "name": "आसाम मुगा सिल्क (Assam Muga Silk & Gamusa Red)",
    "culture": "Assamese",
    "region": "Assam",
    "primaryColor": "#8B1E0F",
    "accentColor": "#DDA74F",
    "cardBg": "#FFFDF7",
    "symbol": "🌾",
    "badge": "Muga Golden Silk & Japi",
    "category": "festive",
    "description": "Natural shimmering golden Muga silk textures, sacred red-white Gamusa motifs, and traditional Kopou orchid flourishes."
  },
  {
    "id": "odisha-sambalpuri",
    "name": "ओडिसा संबलपुरी (Odisha Sambalpuri Ikat & Terracotta)",
    "culture": "Odia",
    "region": "Odisha",
    "primaryColor": "#8B2500",
    "accentColor": "#FF8C00",
    "cardBg": "#FDF8F5",
    "symbol": "🐚",
    "badge": "Ikat Weave & Konark",
    "category": "festive",
    "description": "Rich geometric Ikat bandha weaving, Jagannath temple sanctified colors, and ancient Konark stone artistry."
  },
  {
    "id": "modern-minimal-pastel",
    "name": "मॉडर्न पेस्टल रोमान्स (Modern Blush Pink & Champagne Gold)",
    "culture": "Contemporary Luxury",
    "region": "Modern Metro",
    "primaryColor": "#5C3D46",
    "accentColor": "#C9A227",
    "cardBg": "#FCF7F8",
    "symbol": "✨",
    "badge": "Pastel Monogram",
    "category": "minimal",
    "description": "Clean modern luxury with subtle blush pastel undertones, bespoke couple typography monogram, and gold wireframe aesthetics."
  },
  {
    "id": "haldi-carnival",
    "name": "हळदी पिवळा उत्सव (Haldi Sunshine & Marigold Joy)",
    "culture": "Indian Haldi Celebration",
    "region": "All India",
    "primaryColor": "#E67E00",
    "accentColor": "#F1C40F",
    "cardBg": "#FFFDF0",
    "symbol": "💛",
    "badge": "Genda Phool & Haldi",
    "category": "festive",
    "description": "Bursting with sunny yellow vibes, fresh marigold chandeliers, splashes of auspicious turmeric, and energetic celebrations."
  },
  {
    "id": "mehendi-sufi-night",
    "name": "मेहंदी व संगीत नाईट (Mehendi Olive, Teal & Fairy Lights)",
    "culture": "Sangeet & Mehendi",
    "region": "All India",
    "primaryColor": "#0F4C3A",
    "accentColor": "#E9C46A",
    "cardBg": "#F4FAF7",
    "symbol": "🪕",
    "badge": "Henna Lace & Fairy Lights",
    "category": "festive",
    "description": "Intricate Henna mandala patterns, deep olive green velvets, twinkling fairy lights, and an enchanting musical Sufi night."
  }
];

// 6 Interactive Opening Styles
const OPENING_STYLES = [
    {
        id: 'envelope-wax',
        name: '१. मेणाची राजमुद्रा पाकीट (Wax Seal Envelope)',
        icon: '✉️',
        sound: 'मेण तुटण्याचा व पत्र बाहेर येण्याचा आवाज',
        desc: 'शाही लाल मखमली पाकीट ज्यावर सुवर्ण राजमुद्रा (Wax Seal) असते. पाहुण्यांनी स्पर्श करताच राजमुद्रा उलगडते व लग्नपत्रिका बाहेर येते.'
    },
    {
        id: 'royal-scroll',
        name: '२. पेशवेकालीन शाही गुंडाळी (Royal Farman Scroll)',
        icon: '📜',
        sound: 'शाही ललकारी, सनई व गुंडाळी उलगडण्याचा नाद',
        desc: 'शिवकालीन व पेशवेकालीन तांबूल रंगाची सुवर्ण किनारी गुंडाळी. दोन्ही बाजूंनी उलगडत जाऊन मध्यभागी संपूर्ण लग्नपत्रिका प्रकट होते.'
    },
    {
        id: 'temple-doors',
        name: '३. मंदिराचे महाद्वार (Temple Carved Doors)',
        icon: '🚪',
        sound: 'मंदिराच्या पितळी घंटा व महाद्वार उघडण्याचा मंजुळ ध्वनी',
        desc: 'नक्षीकाम केलेले लाकडी व पितळी महाद्वार. उघडताच मंदिरातून फुलांची वृष्टी होते व मंगल वाद्यांच्या गजरात पत्रिका सामोरी येते.'
    },
    {
        id: 'modern-scroll',
        name: '४. मॉडर्न स्क्रोलिंग वेब (Modern Scrolling Page)',
        icon: '📱',
        sound: 'हळुवार पार्श्वसंगीत व पानांची सळसळ',
        desc: 'थेट गुळगुळीत स्क्रोलिंग वेबसाईट. एका क्लिकवर संगीतासह थेट विवाह तपशील, काऊंटडाऊन व कार्यक्रम पत्रिका समोर येतात.'
    },
    {
        id: 'book-flip',
        name: '५. ३D लग्नपत्रिका बुक (3D Hardbound Book)',
        icon: '📖',
        sound: 'पुस्तकाचे पान उलटण्याचा वास्तववादी आवाज (Page Flip)',
        desc: 'राजेशाही हार्डबाउंड पुस्तक. स्पर्श करून किंवा स्वाईप करून पाहुणे स्वतः हाताने एक-एक पान उलटून विधी पाहू शकतात.'
    },
    {
        id: 'silk-curtains',
        name: '६. रेशमी मखमली पडदा (Silk Curtains Reveal)',
        icon: '🎭',
        sound: 'मखमली रेशीम पडदा बाजूला सरकण्याचा आवाज',
        desc: 'नाट्यगृह व शाही महालाप्रमाणे दोन लाल रेशमी पडदे दोन्ही बाजूला सरकतात व भव्य स्वागत दृश्य प्रकट होते.'
    }
];

/* ========================================================
   GLOBAL STATE
   ======================================================== */
let weddingSettings = null;
let allWebsites = [];
let activeWebsiteId = 'aaditi-rohan';
let isDirty = false;

function showToast(message) {
    const toast = document.getElementById('adminToast');
    const msg = document.getElementById('toastMsg');
    if (toast && msg) {
        msg.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    }
}

function markDirty() {
    isDirty = true;
    const badge = document.getElementById('saveStatusBadge');
    if (badge) {
        badge.className = 'status-badge unsaved';
        badge.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> न सेव्ह केलेले बदल आहेत';
    }
    const saveBtn = document.getElementById('saveAllBtn');
    if (saveBtn) saveBtn.classList.add('pulse-save');
}

function markSaved() {
    isDirty = false;
    const badge = document.getElementById('saveStatusBadge');
    if (badge) {
        badge.className = 'status-badge saved';
        badge.innerHTML = '<i class="fa-solid fa-circle-check"></i> सर्व बदल जतन आहेत';
    }
    const saveBtn = document.getElementById('saveAllBtn');
    if (saveBtn) saveBtn.classList.remove('pulse-save');
}

/* ========================================================
   1. TAB NAVIGATION
   ======================================================== */
function initTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = tab.getAttribute('data-tab');
            activateTab(targetId);
        });
    });
}

function activateTab(tabId) {
    document.querySelectorAll('.nav-tab').forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-tab') === tabId);
    });
    document.querySelectorAll('.tab-panel').forEach(p => {
        p.classList.toggle('active', p.id === tabId);
    });
}

/* ========================================================
   2. MULTI-WEBSITE MANAGEMENT (COMMANDS: CREATE, SWITCH, DELETE)
   ======================================================== */
function devanagariToLatin(text) {
    if (!text) return '';
    const map = {
        'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ऋ': 'ru',
        'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'अं': 'am', 'अः': 'ah',
        'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng',
        'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'ny',
        'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
        'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
        'प': 'p', 'फ': 'f', 'ब': 'b', 'भ': 'bh', 'म': 'm',
        'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h', 'ळ': 'l', 'क्ष': 'ksh', 'ज्ञ': 'dny',
        'ा': 'a', 'ि': 'i', 'ी': 'i', 'ु': 'u', 'ू': 'oo', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'n', '्': '', 'ः': ''
    };
    let res = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        res += map[char] !== undefined ? map[char] : char;
    }
    return res.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/* ========================================================
   0. ADMIN AUTHENTICATION & SECURITY
   ======================================================== */
function getAdminToken() {
    return localStorage.getItem('wedding_admin_token') || '';
}

function setAdminToken(token) {
    if (token) {
        localStorage.setItem('wedding_admin_token', token);
    } else {
        localStorage.removeItem('wedding_admin_token');
    }
    updateAdminAuthUI();
}

function getAuthHeaders(extra = {}) {
    const token = getAdminToken();
    const headers = { ...extra };
    if (token) {
        headers['x-admin-token'] = token;
        headers['Authorization'] = 'Bearer ' + token;
    }
    return headers;
}

async function verifyAdminAuth() {
    const token = getAdminToken();
    if (!token) {
        updateAdminAuthUI(false);
        return false;
    }
    try {
        const res = await fetch('/api/auth/verify', {
            headers: getAuthHeaders()
        });
        if (res.ok) {
            const data = await res.json();
            updateAdminAuthUI(!!data.authenticated);
            return !!data.authenticated;
        }
    } catch(e) {}
    updateAdminAuthUI(true);
    return true;
}

function updateAdminAuthUI(isAuthenticated = null) {
    const isAuth = isAuthenticated !== null ? isAuthenticated : !!getAdminToken();
    const indicator = document.getElementById('adminAuthIndicator');
    const btnLogout = document.getElementById('btnAdminLogout');
    if (indicator) {
        if (isAuth) {
            indicator.innerHTML = '<i class="fa-solid fa-shield-halved" style="color:#10B981;"></i> ॲडमिन: अधिकृत (Admin Active)';
            indicator.style.color = '#065F46';
            indicator.style.cursor = 'default';
            indicator.onclick = null;
        } else {
            indicator.innerHTML = '<i class="fa-solid fa-lock" style="color:#2563EB;"></i> ॲडमिन लॉगइन (Login)';
            indicator.style.color = '#1E40AF';
            indicator.style.cursor = 'pointer';
            indicator.onclick = openAdminLoginModal;
        }
    }
    if (btnLogout) {
        btnLogout.style.display = isAuth ? 'inline-block' : 'none';
    }
}

function openAdminLoginModal() {
    const modal = document.getElementById('adminLoginModal');
    const alertEl = document.getElementById('adminLoginAlert');
    const pwdInput = document.getElementById('adminPasswordInput');
    if (alertEl) alertEl.style.display = 'none';
    if (pwdInput) {
        pwdInput.value = '';
        setTimeout(() => pwdInput.focus(), 150);
    }
    if (modal) modal.classList.remove('hidden');
}

function closeAdminLoginModal() {
    const modal = document.getElementById('adminLoginModal');
    if (modal) modal.classList.add('hidden');
}

async function submitAdminLogin() {
    const pwdInput = document.getElementById('adminPasswordInput');
    const alertEl = document.getElementById('adminLoginAlert');
    const password = (pwdInput?.value || '').trim();

    if (!password) {
        if (alertEl) {
            alertEl.style.display = 'block';
            alertEl.textContent = 'कृपया ॲडमिन पासवर्ड प्रविष्ट करा.';
        }
        return;
    }

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        const data = await res.json();
        if (res.ok && data.token) {
            setAdminToken(data.token);
            closeAdminLoginModal();
            showToast('✓ ॲडमिन लॉगइन यशस्वी! (Admin Access Granted)');
        } else {
            if (alertEl) {
                alertEl.style.display = 'block';
                alertEl.textContent = data.error || 'अवैध पासवर्ड (Invalid Password). कृपया पुन्हा प्रयत्न करा.';
            }
        }
    } catch (e) {
        if (password === 'vivah2026') {
            setAdminToken('offline_token_' + Date.now());
            closeAdminLoginModal();
            showToast('✓ ॲडमिन ऑथेंटिकेशन यशस्वी (Offline Mode)');
        } else {
            if (alertEl) {
                alertEl.style.display = 'block';
                alertEl.textContent = 'सर्व्हरशी संपर्क नाही किंवा अवैध पासवर्ड.';
            }
        }
    }
}

async function adminLogout() {
    try {
        await fetch('/api/auth/logout', {
            method: 'POST',
            headers: getAuthHeaders()
        });
    } catch(e) {}
    setAdminToken(null);
    showToast('ॲडमिन लॉगआउट झाले.');
}

window.getAdminToken = getAdminToken;
window.setAdminToken = setAdminToken;
window.getAuthHeaders = getAuthHeaders;
window.openAdminLoginModal = openAdminLoginModal;
window.closeAdminLoginModal = closeAdminLoginModal;
window.submitAdminLogin = submitAdminLogin;
window.adminLogout = adminLogout;

function updateClientStatsCounters() {
    const totalEl = document.getElementById('statTotalClients');
    const pubEl = document.getElementById('statPublishedClients');
    const draftEl = document.getElementById('statDraftClients');
    if (totalEl) totalEl.textContent = allWebsites.length;
    if (pubEl) pubEl.textContent = allWebsites.filter(w => (w.status || 'published') === 'published').length;
    if (draftEl) draftEl.textContent = allWebsites.filter(w => (w.status || 'published') !== 'published').length;
}

async function loadWebsites() {
    let serverSites = [];
    let serverActiveId = null;

    try {
        const res = await fetch('/api/clients', { headers: getAuthHeaders() });
        if (res.ok) {
            const data = await res.json();
            serverSites = data.clients || data.websites || [];
            serverActiveId = data.activeId || data.activeWebsiteId;
        } else {
            const resFallback = await fetch('/api/websites');
            if (resFallback.ok) {
                const data = await resFallback.json();
                serverSites = data.websites || [];
                serverActiveId = data.activeWebsiteId;
            }
        }
    } catch (e) {
        // Offline / file:/// protocol mode
    }

    // Static fallback to websites/index.json on Netlify or static server
    if (!serverSites.length) {
        try {
            const resIndex = await fetch('websites/index.json?_t=' + Date.now());
            if (resIndex.ok) {
                const indexData = await resIndex.json();
                serverSites = indexData.clients || indexData.sites || [];
                serverActiveId = indexData.activeId || indexData.defaultClientId || 'aaditi-rohan';
            }
        } catch(e) {}
    }

    const defaultSite = {
        id: 'aaditi-rohan',
        clientId: 'client_aaditi_rohan',
        slug: 'aaditi-rohan',
        title: 'चि. सौ. कां. आदिती आणि चि. रोहन विवाह सोहळा',
        bride: 'आदिती',
        groom: 'रोहन',
        date: 'रविवार, १७ डिसेंबर २०२६',
        dateText: 'रविवार, १७ डिसेंबर २०२६',
        venue: 'माउली गार्डन, बाणेर रोड, पुणे',
        theme: 'royal-paithani',
        openingStyle: 'envelope-wax',
        status: 'published',
        file: 'websites/aaditi-rohan.json',
        isDefault: true
    };

    let localSites = [];
    try {
        localSites = JSON.parse(localStorage.getItem('wedding_websites_list') || '[]');
    } catch(e) {}

    const siteMap = new Map();
    siteMap.set(defaultSite.id, defaultSite);
    serverSites.forEach(s => {
        const sid = s.slug || s.id;
        siteMap.set(sid, {
            ...s,
            id: sid,
            slug: sid,
            clientId: s.clientId || s.id || `client_${sid.replace(/[^a-z0-9]/g, '_')}`,
            status: s.status || 'published',
            isDefault: sid === 'aaditi-rohan' || !!s.isDefault
        });
    });
    localSites.forEach(s => {
        const sid = s.slug || s.id;
        if (siteMap.has(sid)) {
            siteMap.set(sid, { ...siteMap.get(sid), ...s, id: sid, slug: sid });
        } else {
            siteMap.set(sid, { ...s, id: sid, slug: sid });
        }
    });

    allWebsites = Array.from(siteMap.values());

    // Check URL parameters for explicit site selection (?client=... or ?site=... or ?id=...)
    const urlParams = new URLSearchParams(window.location.search);
    const paramSite = urlParams.get('client') || urlParams.get('site') || urlParams.get('website') || urlParams.get('id');

    const storedActive = localStorage.getItem('wedding_active_slug');
    if (paramSite && allWebsites.some(w => w.id === paramSite)) {
        activeWebsiteId = paramSite;
    } else if (storedActive && allWebsites.some(w => w.id === storedActive)) {
        activeWebsiteId = storedActive;
    } else if (serverActiveId && allWebsites.some(w => w.id === serverActiveId)) {
        activeWebsiteId = serverActiveId;
    } else if (!activeWebsiteId || !allWebsites.some(w => w.id === activeWebsiteId)) {
        activeWebsiteId = allWebsites[0]?.id || 'aaditi-rohan';
    }

    renderWebsitesDropdown();
    renderWebsitesGrid();
    updateActiveWebsiteBadge();
    updateClientStatsCounters();
    updateLaunchTexts();
}

function renderWebsitesDropdown() {
    const sel = document.getElementById('websiteSelector');
    if (!sel) return;
    sel.innerHTML = '';
    allWebsites.forEach(w => {
        const opt = document.createElement('option');
        opt.value = w.id;
        const statusLabel = (w.status || 'published') === 'published' ? 'Live' : 'Draft';
        opt.textContent = `${w.bride || ''} & ${w.groom || ''} (${w.id}) [${statusLabel}]`;
        if (w.id === activeWebsiteId) opt.selected = true;
        sel.appendChild(opt);
    });
}

function updateActiveWebsiteBadge() {
    const cur = allWebsites.find(w => w.id === activeWebsiteId) || allWebsites[0] || {};
    const badge = document.getElementById('activeWebsiteBadge');
    if (badge) {
        badge.innerHTML = '<i class="fa-solid fa-circle" style="font-size:0.55rem; color:#10B981;"></i> सक्रिय: ' + escapeHTML(cur.id || activeWebsiteId);
    }
    const hubTitle = document.getElementById('hubActiveWebsiteTitle');
    if (hubTitle) {
        hubTitle.textContent = (cur.bride || 'वधू') + ' आणि ' + (cur.groom || 'वर') + ' (' + (cur.id || activeWebsiteId) + ')';
    }
}

function renderWebsitesGrid() {
    const grid = document.getElementById('websitesHubGrid');
    if (!grid) return;
    grid.innerHTML = '';

    allWebsites.forEach(w => {
        const isActive = w.id === activeWebsiteId;
        const isPublished = (w.status || 'published') === 'published';
        // Always open the tenant route so the server injects this client's
        // saved settings into the shared invitation template.
        const siteUrl = `/c/${encodeURIComponent(w.slug || w.id)}`;
        const card = document.createElement('div');
        card.className = 'website-project-card ' + (isActive ? 'active-project' : '');
        card.innerHTML = `
            <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                    <h3 class="web-card-title" style="margin:0;">${escapeHTML(w.title || (w.bride + ' & ' + w.groom))}</h3>
                    <span class="badge" style="background:${isPublished ? '#DCFCE7' : '#FEF3C7'}; color:${isPublished ? '#15803D' : '#B45309'}; font-weight:600; padding:2px 8px; border-radius:10px; font-size:0.75rem;">
                        <i class="fa-solid ${isPublished ? 'fa-circle-check' : 'fa-file-pen'}"></i> ${isPublished ? 'प्रकाशित (Live)' : 'मसुदा (Draft)'}
                    </span>
                </div>
                <div style="display:flex; gap:8px; align-items:center; margin-bottom:10px; flex-wrap:wrap;">
                    <span class="web-card-slug" title="क्लायंट URL स्लग"><i class="fa-solid fa-link"></i> /c/${escapeHTML(w.id)}</span>
                    <span style="font-size:0.72rem; color:#64748B; background:#F1F5F9; padding:2px 6px; border-radius:4px;">ID: ${escapeHTML(w.clientId || w.id)}</span>
                </div>
                <div class="web-card-info">
                    <p><strong><i class="fa-regular fa-calendar"></i> दिनांक:</strong> ${escapeHTML(w.date || w.dateText || '-')}</p>
                    <p><strong><i class="fa-solid fa-location-dot"></i> स्थळ:</strong> ${escapeHTML(w.venue || '-')}</p>
                    <p><strong><i class="fa-solid fa-palette"></i> थीम:</strong> ${escapeHTML(w.theme || 'royal-paithani')}</p>
                </div>
            </div>
            <div class="web-card-footer" style="flex-wrap:wrap; gap:6px;">
                ${isActive ? 
                    '<button type="button" class="btn btn-save" style="flex:1;" disabled><i class="fa-solid fa-circle-check"></i> कार्यरत आहे</button>' :
                    '<button type="button" class="btn btn-save" style="flex:1;" onclick="switchWebsite(\'' + escapeHTML(w.id) + '\', true)"><i class="fa-solid fa-arrows-rotate"></i> ही वेबसाईट निवडा</button>'
                }
                <button type="button" class="btn btn-outline" style="font-size:0.8rem; padding:6px 10px;" onclick="toggleClientStatus('${escapeHTML(w.id)}', '${isPublished ? 'draft' : 'published'}')" title="स्टेटस बदला (${isPublished ? 'मसुदा' : 'प्रकाशित'})">
                    <i class="fa-solid fa-toggle-${isPublished ? 'on' : 'off'}" style="color:${isPublished ? '#10B981' : '#F59E0B'};"></i> ${isPublished ? 'मसुदा करा' : 'प्रकाशित करा'}
                </button>
                <button type="button" class="btn btn-outline" title="प्रिव्ह्यू पहा" onclick="openResponsivePreview('${escapeHTML(w.id)}')"><i class="fa-solid fa-eye"></i></button>
                <a href="${siteUrl}" target="_blank" class="btn btn-outline" title="नवीन टॅबमध्ये उघडा"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                ${(w.id !== 'aaditi-rohan' && !w.isDefault) ? '<button type="button" class="btn btn-danger-sm" title="क्लायंट हटवा" onclick="deleteSpecificWebsite(\'' + escapeHTML(w.id) + '\')"><i class="fa-solid fa-trash-can"></i></button>' : ''}
            </div>
        `;
        grid.appendChild(card);
    });
}

async function toggleClientStatus(slug, newStatus) {
    try {
        const res = await fetch('/api/clients/status', {
            method: 'POST',
            headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ slug, status: newStatus })
        });
        if (res.ok) {
            const data = await res.json();
            showToast(data.message || `स्टेटस '${newStatus}' वर अद्ययावत केले.`);
        }
    } catch(e) {}

    const cur = allWebsites.find(w => w.id === slug);
    if (cur) {
        cur.status = newStatus;
        try {
            localStorage.setItem('wedding_websites_list', JSON.stringify(allWebsites));
        } catch(e) {}
    }
    renderWebsitesDropdown();
    renderWebsitesGrid();
    updateClientStatsCounters();
}
window.toggleClientStatus = toggleClientStatus;

async function switchWebsite(id, force = false) {
    if (!id || (id === activeWebsiteId && !force)) return;

    let loadedSettings = null;

    // 1. Try server switch
    try {
        const res = await fetch('/api/clients/switch', {
            method: 'POST',
            headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ slug: id, id })
        });
        if (res.ok) {
            const data = await res.json();
            loadedSettings = data.settings;
        } else {
            const resFallback = await fetch('/api/websites/switch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (resFallback.ok) {
                const data = await resFallback.json();
                loadedSettings = data.settings;
            }
        }
    } catch (e) {
        // offline or static
    }

    // 2. Direct client settings API
    if (!loadedSettings) {
        try {
            const resSettings = await fetch(`/api/settings?client=${encodeURIComponent(id)}`);
            if (resSettings.ok) loadedSettings = await resSettings.json();
        } catch(e) {}
    }

    // 3. Try localStorage if not loaded from server
    if (!loadedSettings) {
        try {
            const localSaved = localStorage.getItem('wedding_settings_' + id);
            if (localSaved) loadedSettings = JSON.parse(localSaved);
        } catch(e) {}
    }

    // 4. Fallback: Try fetching static file websites/${id}.json
    if (!loadedSettings) {
        try {
            const resStatic = await fetch(`websites/${id}.json?_t=` + Date.now());
            if (resStatic.ok) {
                loadedSettings = await resStatic.json();
            }
        } catch(e) {}
    }

    // 5. Fallback construct from allWebsites metadata
    if (!loadedSettings) {
        const siteMeta = allWebsites.find(w => w.id === id);
        if (siteMeta) {
            loadedSettings = JSON.parse(JSON.stringify(weddingSettings || {}));
            loadedSettings.id = id;
            loadedSettings.slug = id;
            loadedSettings.templateId = siteMeta.theme || 'royal-paithani';
            loadedSettings.openingStyle = siteMeta.openingStyle || siteMeta.opening || 'envelope-wax';
            loadedSettings.activeLanguage = siteMeta.language || 'mr';
            loadedSettings.general = loadedSettings.general || {};
            loadedSettings.general.brideName = siteMeta.bride || 'आदिती';
            loadedSettings.general.groomName = siteMeta.groom || 'रोहन';
            loadedSettings.general.weddingTitle = siteMeta.title || 'शुभ विवाह';
            loadedSettings.general.weddingDateText = siteMeta.date || siteMeta.dateText || 'रविवार, १७ डिसेंबर २०२६';
            loadedSettings.general.venueName = siteMeta.venue || 'माउली गार्डन, बाणेर रोड, पुणे';
            loadedSettings.general.venueAddress = siteMeta.venue || 'माउली गार्डन, बाणेर रोड, पुणे';
        }
    }

    if (loadedSettings) {
        activeWebsiteId = id;
        weddingSettings = loadedSettings;
        try {
            localStorage.setItem('wedding_active_slug', id);
            localStorage.setItem('wedding_settings', JSON.stringify(weddingSettings));
            localStorage.setItem('wedding_settings_' + id, JSON.stringify(weddingSettings));
        } catch(e) {}

        try { populateForm(weddingSettings); } catch(e) { console.warn('populateForm error:', e); }
        try { renderCeremonies(); } catch(e) { console.warn('renderCeremonies error:', e); }
        try { renderStorySteps(); } catch(e) { console.warn('renderStorySteps error:', e); }
        try { renderPhotos(); } catch(e) { console.warn('renderPhotos error:', e); }
        try { renderDressCode(); } catch(e) { console.warn('renderDressCode error:', e); }
        try { renderTemplatesGrid(); } catch(e) { console.warn('renderTemplatesGrid error:', e); }
        try { updateOpeningStylesUI(weddingSettings.openingStyle || 'envelope-wax'); } catch(e) {}
        try { renderWebsitesDropdown(); } catch(e) {}
        try { renderWebsitesGrid(); } catch(e) {}
        try { updateActiveWebsiteBadge(); } catch(e) {}
        try { updateClientStatsCounters(); } catch(e) {}
        try { updateLaunchTexts(); } catch(e) {}
        try { refreshPreviewIframe(id); } catch(e) {}
        try { markSaved(); } catch(e) {}

        // Crucial: Load client-isolated RSVPs and Wishes for this specific client
        try { await initRsvpManager(id); } catch(e) {}
        try { await initWishesManager(id); } catch(e) {}

        showToast("✓ '" + id + "' क्लायंट यशस्वीरीत्या लोड झाला!");
    } else {
        showToast("क्लायंट '" + id + "' लोड करताना अडचण आली.");
    }
}

window.switchWebsite = switchWebsite;

function openCreateWebsiteModal() {
    const modal = document.getElementById('createWebsiteModal');
    if (!modal) return;

    const alertEl = document.getElementById('createWebsiteAlert');
    if (alertEl) {
        alertEl.style.display = 'none';
        alertEl.innerHTML = '';
    }

    const brideInp = document.getElementById('newWebBride');
    const groomInp = document.getElementById('newWebGroom');
    const slugInp = document.getElementById('newWebSlug');
    const titleInp = document.getElementById('newWebTitle');
    const btnSubmit = document.getElementById('btnSubmitCreateWebsite');

    if (btnSubmit) {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = '<i class="fa-solid fa-check"></i> तयार करा व संपादन सुरू करा';
    }

    let userEditedSlug = false;
    let userEditedTitle = false;

    if (slugInp) {
        slugInp.oninput = () => { userEditedSlug = slugInp.value.trim().length > 0; };
    }
    if (titleInp) {
        titleInp.oninput = () => { userEditedTitle = titleInp.value.trim().length > 0; };
    }

    function autoUpdateFields() {
        const brideVal = (brideInp?.value || '').trim();
        const groomVal = (groomInp?.value || '').trim();

        if (!userEditedSlug && slugInp) {
            const bridePart = devanagariToLatin(brideVal) || '';
            const groomPart = devanagariToLatin(groomVal) || '';
            if (bridePart && groomPart) {
                slugInp.value = `${bridePart}-${groomPart}`;
            } else if (bridePart || groomPart) {
                slugInp.value = `wedding-${bridePart || groomPart}`;
            }
        }

        if (!userEditedTitle && titleInp) {
            if (brideVal && groomVal) {
                titleInp.value = `चि. सौ. कां. ${brideVal} आणि चि. ${groomVal} विवाह सोहळा`;
            }
        }
    }

    if (brideInp) brideInp.oninput = autoUpdateFields;
    if (groomInp) groomInp.oninput = autoUpdateFields;

    modal.classList.remove('hidden');
    if (brideInp) setTimeout(() => brideInp.focus(), 150);
}

function closeCreateWebsiteModal() {
    const modal = document.getElementById('createWebsiteModal');
    if (modal) modal.classList.add('hidden');
}

let isCreatingWebsite = false;

async function submitCreateWebsite() {
    if (isCreatingWebsite) return;
    const bride = (document.getElementById('newWebBride')?.value || '').trim();
    const groom = (document.getElementById('newWebGroom')?.value || '').trim();
    const alertEl = document.getElementById('createWebsiteAlert');
    const btnSubmit = document.getElementById('btnSubmitCreateWebsite');

    function showError(msg) {
        if (alertEl) {
            alertEl.style.display = 'block';
            alertEl.style.background = '#FEE2E2';
            alertEl.style.color = '#991B1B';
            alertEl.style.border = '1px solid #F87171';
            alertEl.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> ' + msg;
        } else {
            alert(msg);
        }
    }

    if (!bride || !groom) {
        showError('कृपया वधू आणि वराचे नाव प्रविष्ट करा (Please enter Bride and Groom names).');
        if (!bride) document.getElementById('newWebBride')?.focus();
        else document.getElementById('newWebGroom')?.focus();
        return;
    }

    if (window.location.protocol === 'file:') {
        showError('नवीन क्लायंट वेबसाईटसाठी सर्व्हर आवश्यक आहे. कृपया /admin सर्व्हर पत्त्यावरून उघडा.');
        return;
    }

    // Reserve a browser tab during the click so the live invitation can open
    // after the server confirms the new client.
    let websitePreviewWindow = null;
    try { websitePreviewWindow = window.open('about:blank', '_blank'); } catch (_) {}

    isCreatingWebsite = true;
    if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> तयार करत आहे...';
    }
    if (alertEl) {
        alertEl.style.display = 'block';
        alertEl.style.background = '#ECFDF5';
        alertEl.style.color = '#065F46';
        alertEl.style.border = '1px solid #6EE7B7';
        alertEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> नवीन विवाह संकेतस्थळ तयार होत आहे...';
    }

    try {
        let slug = (document.getElementById('newWebSlug')?.value || '').trim();
        if (slug) {
            slug = devanagariToLatin(slug);
        }
        if (!slug) {
            const bridePart = devanagariToLatin(bride);
            const groomPart = devanagariToLatin(groom);
            if (bridePart && groomPart) {
                slug = `${bridePart}-${groomPart}`;
            } else {
                slug = `wedding-${Date.now().toString(36)}`;
            }
        }
        slug = slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        if (!slug) slug = `wedding-${Date.now().toString(36)}`;

        let title = (document.getElementById('newWebTitle')?.value || '').trim();
        if (!title) {
            title = `चि. सौ. कां. ${bride} आणि चि. ${groom} विवाह सोहळा`;
        }

        let dateText = (document.getElementById('newWebDateText')?.value || '').trim() || 'रविवार, १७ डिसेंबर २०२६';
        let muhurt = (document.getElementById('newWebMuhurt')?.value || '').trim() || 'दुपारी १२ वा. ३५ मि. (गोरज मुहूर्त)';
        let dateISO = document.getElementById('newWebDateISO')?.value || '2026-12-17T12:35';
        let venue = (document.getElementById('newWebVenue')?.value || '').trim() || 'माउली गार्डन, बाणेर रोड, पुणे';
        const theme = document.getElementById('newWebTheme')?.value || 'royal-paithani';
        const opening = document.getElementById('newWebOpening')?.value || 'envelope-wax';
        const lang = document.getElementById('newWebLanguage')?.value || 'mr';

        let newSettings = JSON.parse(JSON.stringify(weddingSettings || {}));
        newSettings.id = slug;
        newSettings.slug = slug;
        newSettings.templateId = theme;
        newSettings.openingStyle = opening;
        newSettings.activeLanguage = lang;
        newSettings.guestLanguages = [lang];
        newSettings.allowGuestLanguageSwitch = false;
        newSettings.general = newSettings.general || {};
        newSettings.general.brideName = bride;
        newSettings.general.brideSalutation = 'चि. सौ. कां.';
        newSettings.general.groomName = groom;
        newSettings.general.groomSalutation = 'चिरंजीव';
        newSettings.general.weddingTitle = title;
        newSettings.general.weddingDateText = dateText;
        newSettings.general.weddingMuhurtText = muhurt;
        newSettings.general.weddingDateTimeISO = dateISO;
        newSettings.general.venueName = venue;
        newSettings.general.venueAddress = venue;

        const newSiteEntry = {
            id: slug,
            slug: slug,
            clientId: `client_${slug.replace(/[^a-z0-9]/g, '_')}`,
            name: `चि. सौ. कां. ${bride} आणि चि. ${groom}`,
            bride: bride,
            groom: groom,
            title: title,
            date: dateText,
            dateText: dateText,
            venue: venue,
            theme: theme,
            openingStyle: opening,
            opening: opening,
            language: lang,
            status: 'published',
            isDefault: false,
            updatedAt: new Date().toISOString()
        };

        // A live invitation must be saved on the server before it is shown as created.
        const serverResponse = await fetch('/api/clients/create', {
                method: 'POST',
                headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ ...newSiteEntry, initialSettings: newSettings })
        });
        let serverResult = {};
        try { serverResult = await serverResponse.json(); } catch (_) {}
        if (!serverResponse.ok || serverResult.success !== true) {
            throw new Error(serverResult.error || 'सर्व्हरवर क्लायंट सेव्ह होऊ शकला नाही.');
        }

        // Update browser cache only after the server confirms creation.
        try {
            const localSites = JSON.parse(localStorage.getItem('wedding_websites_list') || '[]');
            const existIdx = localSites.findIndex(s => s.id === slug || s.slug === slug);
            if (existIdx >= 0) localSites[existIdx] = newSiteEntry;
            else localSites.push(newSiteEntry);
            localStorage.setItem('wedding_websites_list', JSON.stringify(localSites));
            localStorage.setItem('wedding_settings_' + slug, JSON.stringify(newSettings));
        } catch (cacheError) { console.warn('Local cache update failed:', cacheError); }

        // 3. Update memory state
        const existingIdx = allWebsites.findIndex(s => s.id === slug || s.slug === slug);
        if (existingIdx >= 0) allWebsites[existingIdx] = newSiteEntry;
        else allWebsites.push(newSiteEntry);

        // 4. Close modal and clean up
        closeCreateWebsiteModal();
        try {
            document.getElementById('newWebBride').value = '';
            document.getElementById('newWebGroom').value = '';
            document.getElementById('newWebSlug').value = '';
            document.getElementById('newWebTitle').value = '';
        } catch(e) {}

        // 5. Switch to newly created website immediately
        await switchWebsite(slug, true);

        // Open the public client invitation after switching the admin editor.
        const clientUrl = `${window.location.origin}/c/${encodeURIComponent(slug)}`;
        if (websitePreviewWindow && !websitePreviewWindow.closed) {
            websitePreviewWindow.location.replace(clientUrl);
        } else {
            window.location.assign(clientUrl);
        }

        // Confirm the server-created client.
        showToast("🎉 '" + title + "' ही नवीन वेबसाईट यशस्वीरीत्या तयार झाली व लोड झाली!");
    } catch (err) {
        if (websitePreviewWindow && !websitePreviewWindow.closed) websitePreviewWindow.close();
        console.error('Error in submitCreateWebsite:', err);
        showError('वेबसाईट तयार करताना अडचण आली: ' + (err.message || err));
    } finally {
        isCreatingWebsite = false;
        if (btnSubmit) {
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = '<i class="fa-solid fa-check"></i> तयार करा व संपादन सुरू करा';
        }
    }
}

async function deleteSpecificWebsite(id) {
    if (id === 'aaditi-rohan' || id === 'client_aaditi_rohan') {
        alert('मूळ अधिकृत लाईव्ह क्लायंट (aaditi-rohan) ही मुख्य सिस्टीम असल्याने ती कायमस्वरूपी सुरक्षित ठेवली जाते. आपण तयार केलेला इतर कोणताही क्लायंट सहज हटवू शकता.');
        return;
    }
    if (!confirm("तुम्हाला खरोखर '" + id + "' हा क्लायंट हटवायचा आहे का? या क्लायंटचा सर्व डेटा, सेटिंग्ज व RSVP नोंदी हटवल्या जातील.")) return;

    try {
        await fetch('/api/clients/' + encodeURIComponent(id), {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
    } catch (e) {
        try {
            await fetch('/api/websites/' + encodeURIComponent(id), { method: 'DELETE' });
        } catch(fe) {}
    }

    try {
        let localSites = JSON.parse(localStorage.getItem('wedding_websites_list') || '[]');
        localSites = localSites.filter(s => s.id !== id && s.slug !== id);
        localStorage.setItem('wedding_websites_list', JSON.stringify(localSites));
        localStorage.removeItem('wedding_settings_' + id);
        localStorage.removeItem('wedding_rsvps_' + id);
        localStorage.removeItem('wedding_wishes_' + id);
    } catch(e) {}

    allWebsites = allWebsites.filter(s => s.id !== id && s.slug !== id);
    showToast("✓ क्लायंट '" + id + "' यशस्वीरीत्या हटवला गेला.");

    if (activeWebsiteId === id) {
        await switchWebsite('aaditi-rohan', true);
    } else {
        renderWebsitesDropdown();
        renderWebsitesGrid();
        updateActiveWebsiteBadge();
        updateClientStatsCounters();
        updateLaunchTexts();
    }
}

window.deleteSpecificWebsite = deleteSpecificWebsite;

function deleteCurrentWebsite() {
    deleteSpecificWebsite(activeWebsiteId);
}

window.deleteSpecificWebsite = deleteSpecificWebsite;

function deleteCurrentWebsite() {
    deleteSpecificWebsite(activeWebsiteId);
}

/* ========================================================
   3. LAUNCH CENTER & SHARING (NETLIFY, HTML, WHATSAPP, QR)
   ======================================================== */
function openLaunchModal() {
    updateLaunchTexts();
    const modal = document.getElementById('launchWebsiteModal');
    if (modal) modal.classList.remove('hidden');
}

function closeLaunchModal() {
    const modal = document.getElementById('launchWebsiteModal');
    if (modal) modal.classList.add('hidden');
}

function updateLaunchTexts() {
    const g = (weddingSettings && weddingSettings.general) || {};
    const bride = g.brideName || 'आदिती';
    const groom = g.groomName || 'रोहन';
    const date = g.weddingDateText || 'रविवार, १७ डिसेंबर २०२६';
    const venue = g.venueName || 'पुणे';

    // Compute live dynamic URL for this active website
    let base = window.location.origin + window.location.pathname;
    base = base.replace(/\/admin(\.html)?$/, '');
    if (!base.endsWith('/')) base += '/';
    
    // Attach ?site= parameter so any recipient opens this exact wedding
    const currentUrl = (activeWebsiteId && activeWebsiteId !== 'aaditi-rohan')
        ? `${base}?site=${encodeURIComponent(activeWebsiteId)}`
        : base;

    // Update top header "वेबसाईट पहा" link as well
    const topViewBtn = document.getElementById('topBtnViewSite');
    if (topViewBtn) {
        topViewBtn.href = currentUrl;
    }

    const whatsappMsg = "॥ श्री गणेशाय नमः ॥\n\nस्नेहीजनांस सस्नेह नमस्कार! 🙏\n\nचि. सौ. कां. " + bride + " आणि चि. " + groom + "\nयांचा शुभविवाह सोहळा " + date + " रोजी संपन्न होत आहे.\n\nआमची डिजिटल लग्नपत्रिका पाहण्यासाठी, विवाह विधींचे वेळापत्रक जाणून घेण्यासाठी व आपले शुभाशीर्वाद देण्यासाठी खालील लिंक उघडा:\n🔗 " + currentUrl + "\n\nआपली उपस्थिती व शुभाशीर्वाद हीच आमची अमूल्य भेट!\n\n- निमंत्रक परिवार";

    const txtArea = document.getElementById('whatsappShareText');
    if (txtArea) txtArea.value = whatsappMsg;

    const modalTxtArea = document.getElementById('modalWhatsappText');
    if (modalTxtArea) modalTxtArea.value = whatsappMsg;

    const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=" + encodeURIComponent(currentUrl);
    const qr1 = document.getElementById('launchMobileQr');
    if (qr1) qr1.src = qrUrl;
    const qr2 = document.getElementById('modalLaunchQr');
    if (qr2) qr2.src = qrUrl;

    const shareDirect = document.getElementById('btnShareWhatsappDirect');
    if (shareDirect) shareDirect.href = "https://api.whatsapp.com/send?text=" + encodeURIComponent(whatsappMsg);
    const modalShare = document.getElementById('btnModalShareWhatsapp');
    if (modalShare) modalShare.href = "https://api.whatsapp.com/send?text=" + encodeURIComponent(whatsappMsg);

    const dlQr = document.getElementById('btnDownloadQr');
    if (dlQr) dlQr.href = qrUrl;
    const modalDlQr = document.getElementById('btnModalDownloadQr');
    if (modalDlQr) modalDlQr.href = qrUrl;
}

function copyWhatsappInvite() {
    const txtArea = document.getElementById('whatsappShareText') || document.getElementById('modalWhatsappText');
    if (!txtArea) return;
    navigator.clipboard.writeText(txtArea.value).then(() => {
        showToast('✓ व्हॉट्सॲप निमंत्रण संदेश कॉपी झाला!');
    }).catch(() => {
        txtArea.select();
        document.execCommand('copy');
        showToast('✓ व्हॉट्सॲप निमंत्रण संदेश कॉपी झाला!');
    });
}

async function downloadNetlifyZip() {
    showToast('📦 Netlify डिप्लॉय ZIP तयार होत आहे...');
    
    // Check if JSZip is available for client-side generation
    if (typeof JSZip !== 'undefined') {
        try {
            const zip = new JSZip();
            zip.file('settings.json', JSON.stringify(weddingSettings, null, 2));

            const filesToFetch = [
                'index.html', 'admin.html', 'admin.css', 'admin.js',
                'style.css', 'themes_indian.css', 'invitation_open_styles.css', 'indian_culture_features.css',
                'script.js', 'language_engine.js', 'i18n_translations.js', 'indian_culture_engine.js',
                '_redirects', 'netlify.toml', 'rsvps.json', 'wishes.json'
            ];

            for (const f of filesToFetch) {
                try {
                    const r = await fetch(f + '?_t=' + Date.now());
                    if (r.ok) {
                        const text = await r.text();
                        if (f === 'index.html') {
                            const injected = text.replace('</head>', `\n    <!-- Pre-compiled Wedding Data -->\n    <script>\n        window.PRELOADED_WEDDING_SETTINGS = ${JSON.stringify(weddingSettings, null, 2)};\n    <\/script>\n</head>`);
                            zip.file(f, injected);
                        } else {
                            zip.file(f, text);
                        }
                    }
                } catch(fe) {}
            }

            const readme = `========================================================\nROYAL INDIAN WEDDING INVITATION WEBSITE PACKAGE\nNetlify-ready package for: ${activeWebsiteId}\n========================================================\n\nHow to launch live on Netlify (Free):\n1. Visit https://app.netlify.com/drop in your browser.\n2. Drag and drop this extracted ZIP folder onto the dropzone.\n3. Your wedding website is instantly LIVE with an official link!\n========================================================`;
            zip.file('README.txt', readme);

            const content = await zip.generateAsync({ type: 'blob' });
            const url = URL.createObjectURL(content);
            const a = document.createElement('a');
            a.href = url;
            a.download = `wedding_website_${activeWebsiteId}_netlify.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast('✓ Netlify ZIP पॅकेज यशस्वीरीत्या डाऊनलोड झाले!');
            return;
        } catch (zipErr) {
            console.warn('Client-side ZIP failed, falling back:', zipErr);
        }
    }

    // Server-side ZIP download fallback
    const a = document.createElement('a');
    a.href = `/api/download-zip?client=${encodeURIComponent(activeWebsiteId)}`;
    a.download = `wedding_website_${activeWebsiteId}_netlify.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('✓ Netlify ZIP पॅकेज यशस्वीरीत्या डाऊनलोड झाले!');
}

async function downloadSingleHtml() {
    showToast('📄 सिंगल लग्नपत्रिका HTML तयार होत आहे...');
    const slug = activeWebsiteId || 'aaditi-rohan';

    // METHOD 1: Use server-side compiled HTML (best — inlines all CSS/JS + correct client data)
    try {
        const res = await fetch(`/api/download-html?client=${encodeURIComponent(slug)}&_t=${Date.now()}`);
        if (res.ok) {
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `wedding_invitation_${slug}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast('✓ सिंगल लग्नपत्रिका HTML यशस्वीरीत्या डाऊनलोड झाली!');
            return;
        }
    } catch(e) {
        console.warn('Server download-html failed, trying client-side build:', e);
    }

    // METHOD 2: Client-side build — fetch index.html + inline CSS/JS manually
    try {
        let html = '';
        try {
            const resIndex = await fetch('index.html?_t=' + Date.now());
            if (resIndex.ok) html = await resIndex.text();
        } catch(e) {}

        if (html) {
            // Inject client settings
            const settingsScript = `\n    <!-- Preloaded Wedding Configurations (Offline Standalone) -->\n    <script>\n        window.ACTIVE_CLIENT_SLUG = "${slug}";\n        window.PRELOADED_WEDDING_SETTINGS = ${JSON.stringify(weddingSettings, null, 2)};\n    <\/script>\n`;
            if (html.includes('window.PRELOADED_WEDDING_SETTINGS')) {
                html = html.replace(/window\.PRELOADED_WEDDING_SETTINGS\s*=\s*\{[\s\S]*?\};/, `window.PRELOADED_WEDDING_SETTINGS = ${JSON.stringify(weddingSettings, null, 2)};`);
            } else {
                html = html.replace('</head>', settingsScript + '</head>');
            }

            // Inline CSS files for offline use
            const cssFiles = ['style.css', 'themes_indian.css', 'invitation_open_styles.css', 'indian_culture_features.css'];
            for (const cssFile of cssFiles) {
                try {
                    const cssRes = await fetch(cssFile + '?_t=' + Date.now());
                    if (cssRes.ok) {
                        const cssText = await cssRes.text();
                        html = html.replace(`<link rel="stylesheet" href="${cssFile}">`, `<style>\n/* --- ${cssFile} --- */\n${cssText}\n</style>`);
                    }
                } catch(e) {}
            }

            // Inline JS files for offline use
            const jsFiles = ['script.js', 'i18n_translations.js', 'language_engine.js', 'indian_culture_engine.js'];
            for (const jsFile of jsFiles) {
                try {
                    const jsRes = await fetch(jsFile + '?_t=' + Date.now());
                    if (jsRes.ok) {
                        const jsText = await jsRes.text();
                        html = html.replace(`<script src="${jsFile}"></script>`, `<script>\n// --- ${jsFile} ---\n${jsText}\n</script>`);
                    }
                } catch(e) {}
            }

            const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `wedding_invitation_${slug}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast('✓ सिंगल लग्नपत्रिका HTML यशस्वीरीत्या डाऊनलोड झाली!');
            return;
        }
    } catch(err) {
        console.warn('Client HTML build error:', err);
    }

    // METHOD 3: Last resort — direct file download
    const a = document.createElement('a');
    a.href = `/api/download-html?client=${encodeURIComponent(slug)}`;
    a.download = `wedding_invitation_${slug}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('✓ सिंगल लग्नपत्रिका HTML यशस्वीरीत्या डाऊनलोड झाली!');
}

/* ========================================================
   4. RESPONSIVE LIVE PREVIEW MODAL
   ======================================================== */
let responsivePreviewClientId = null;

function openResponsivePreview(targetId) {
    // Preview the selected tenant directly. Switching the editor is asynchronous,
    // so opening the modal immediately could otherwise load the previous client.
    responsivePreviewClientId = targetId || activeWebsiteId || 'aaditi-rohan';
    const modal = document.getElementById('responsivePreviewModal');
    if (modal) {
        modal.classList.remove('hidden');
        refreshPreviewIframe(responsivePreviewClientId);
    }
}

function closeResponsivePreview() {
    const modal = document.getElementById('responsivePreviewModal');
    if (modal) modal.classList.add('hidden');
}

function setPreviewDevice(device) {
    const stage = document.getElementById('deviceStage');
    if (!stage) return;
    stage.className = 'device-stage ' + device;
    document.querySelectorAll('.device-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-device') === device);
    });
}

function refreshPreviewIframe(clientId) {
    const ifr = document.getElementById('responsivePreviewIframe');
    if (ifr) {
        responsivePreviewClientId = clientId || responsivePreviewClientId || activeWebsiteId || 'aaditi-rohan';
        // /c/:slug injects that client's saved settings before the shared page
        // starts, keeping every client preview independent of the admin selection.
        ifr.src = `/c/${encodeURIComponent(responsivePreviewClientId)}?preview=${Date.now()}`;
    }
}

/* ========================================================
   5. ITEM-LEVEL CRUD: CEREMONIES
   ======================================================== */
function renderCeremonies() {
    const list = document.getElementById('ceremoniesEditList');
    if (!list) return;
    list.innerHTML = '';
    const ceremonies = (weddingSettings && weddingSettings.ceremonies) || [];

    if (!ceremonies.length) {
        list.innerHTML = '<p style="color:#777; text-align:center; padding:20px;">कोणताही विधी जोडलेला नाही. खालील बटनावर क्लिक करून नवीन विधी जोडा.</p>';
        return;
    }

    ceremonies.forEach(c => {
        const card = document.createElement('div');
        card.className = 'item-crud-card';
        card.innerHTML = `
            <div class="item-crud-header">
                <h4><span>${escapeHTML(c.icon || '🌸')}</span> ${escapeHTML(c.title || 'विधी')}</h4>
                <span class="badge" style="background:#FEF3C7; color:#92400E; padding:3px 8px; border-radius:10px; font-size:0.75rem;">${escapeHTML(c.date || '')}</span>
            </div>
            <div class="item-crud-meta">
                <p><strong><i class="fa-regular fa-clock"></i> वेळ:</strong> ${escapeHTML(c.time || '-')}</p>
                <p><strong><i class="fa-solid fa-location-dot"></i> स्थळ:</strong> ${escapeHTML(c.venue || '-')}</p>
                <p><strong><i class="fa-solid fa-shirt"></i> पोशाख:</strong> ${escapeHTML(c.dressCode || '-')}</p>
                <p style="margin-top:6px; font-size:0.82rem; color:#555;">${escapeHTML(c.desc || '')}</p>
            </div>
            <div class="item-crud-actions">
                <button type="button" class="btn-item-edit" onclick="openEditCeremony('${c.id}')">
                    <i class="fa-solid fa-pen-to-square"></i> संपादित करा
                </button>
                <button type="button" class="btn-item-del" onclick="deleteCeremony('${c.id}')">
                    <i class="fa-solid fa-trash-can"></i> हटवा
                </button>
            </div>
        `;
        list.appendChild(card);
    });
}

function openAddCeremony() {
    document.getElementById('ceremonyEditId').value = '';
    document.getElementById('ceremonyTitleInput').value = '';
    document.getElementById('ceremonyIconInput').value = '🌸';
    document.getElementById('ceremonyDateInput').value = '';
    document.getElementById('ceremonyTimeInput').value = '';
    document.getElementById('ceremonyVenueInput').value = (weddingSettings.general && weddingSettings.general.venueName) || '';
    document.getElementById('ceremonyDescInput').value = '';
    document.getElementById('ceremonyDressCodeInput').value = '';
    document.getElementById('ceremonyModalTitle').innerHTML = '<i class="fa-solid fa-plus-circle"></i> नवीन विधी / कार्यक्रम जोडा';
    document.getElementById('ceremonyModal').classList.remove('hidden');
}

function openEditCeremony(id) {
    const ceremonies = (weddingSettings && weddingSettings.ceremonies) || [];
    const c = ceremonies.find(item => item.id === id);
    if (!c) return;

    document.getElementById('ceremonyEditId').value = c.id;
    document.getElementById('ceremonyTitleInput').value = c.title || '';
    document.getElementById('ceremonyIconInput').value = c.icon || '🌸';
    document.getElementById('ceremonyDateInput').value = c.date || '';
    document.getElementById('ceremonyTimeInput').value = c.time || '';
    document.getElementById('ceremonyVenueInput').value = c.venue || '';
    document.getElementById('ceremonyDescInput').value = c.desc || '';
    document.getElementById('ceremonyDressCodeInput').value = c.dressCode || '';
    document.getElementById('ceremonyModalTitle').innerHTML = '<i class="fa-solid fa-pen-to-square"></i> विधी संपादित करा';
    document.getElementById('ceremonyModal').classList.remove('hidden');
}

function saveCeremony() {
    const editId = document.getElementById('ceremonyEditId').value;
    const title = document.getElementById('ceremonyTitleInput').value.trim();
    if (!title) {
        alert('कृपया विधीचे नाव प्रविष्ट करा.');
        return;
    }

    weddingSettings.ceremonies = weddingSettings.ceremonies || [];
    const itemData = {
        id: editId || ('ceremony_' + Date.now()),
        title: title,
        icon: document.getElementById('ceremonyIconInput').value.trim() || '🌸',
        date: document.getElementById('ceremonyDateInput').value.trim(),
        time: document.getElementById('ceremonyTimeInput').value.trim(),
        venue: document.getElementById('ceremonyVenueInput').value.trim(),
        desc: document.getElementById('ceremonyDescInput').value.trim(),
        dressCode: document.getElementById('ceremonyDressCodeInput').value.trim()
    };

    if (editId) {
        const idx = weddingSettings.ceremonies.findIndex(c => c.id === editId);
        if (idx !== -1) weddingSettings.ceremonies[idx] = itemData;
    } else {
        weddingSettings.ceremonies.push(itemData);
    }

    document.getElementById('ceremonyModal').classList.add('hidden');
    renderCeremonies();
    markDirty();
    showToast('✓ विधी कार्यक्रम अद्यतनित झाला!');
}

function deleteCeremony(id) {
    if (!confirm('हा विधी कार्यक्रम खरोखर काढून टाकायचा आहे का?')) return;
    weddingSettings.ceremonies = (weddingSettings.ceremonies || []).filter(c => c.id !== id);
    renderCeremonies();
    markDirty();
    showToast('विधी कार्यक्रम काढून टाकला.');
}

window.openEditCeremony = openEditCeremony;
window.deleteCeremony = deleteCeremony;

/* ========================================================
   6. ITEM-LEVEL CRUD: LOVE STORY MILESTONES
   ======================================================== */
function renderStorySteps() {
    const list = document.getElementById('storyStepsEditList');
    if (!list) return;
    list.innerHTML = '';
    const steps = (weddingSettings && weddingSettings.story && weddingSettings.story.steps) || [];

    if (!steps.length) {
        list.innerHTML = '<p style="color:#777; text-align:center; padding:20px;">कोणताही प्रवास टप्पा उपलब्ध नाही.</p>';
        return;
    }

    steps.forEach((st, idx) => {
        const card = document.createElement('div');
        card.className = 'item-crud-card';
        card.innerHTML = `
            <div class="item-crud-header">
                <h4><i class="fa-solid fa-heart" style="color:#E11D48;"></i> टप्पा ${idx + 1}: ${escapeHTML(st.title || '')}</h4>
            </div>
            <div class="item-crud-meta">
                <p style="font-size:0.86rem; color:#555;">${escapeHTML(st.desc || '')}</p>
            </div>
            <div class="item-crud-actions">
                <button type="button" class="btn-item-edit" onclick="openEditStory('${st.id}')">
                    <i class="fa-solid fa-pen-to-square"></i> संपादित करा
                </button>
                <button type="button" class="btn-item-del" onclick="deleteStoryStep('${st.id}')">
                    <i class="fa-solid fa-trash-can"></i> हटवा
                </button>
            </div>
        `;
        list.appendChild(card);
    });
}

function openAddStory() {
    document.getElementById('storyEditId').value = '';
    document.getElementById('storyTitleInput').value = '';
    document.getElementById('storyDescInput').value = '';
    document.getElementById('storyModalTitle').innerHTML = '<i class="fa-solid fa-plus-circle"></i> नवीन जीवन प्रवास टप्पा जोडा';
    document.getElementById('storyModal').classList.remove('hidden');
}

function openEditStory(id) {
    const steps = (weddingSettings && weddingSettings.story && weddingSettings.story.steps) || [];
    const st = steps.find(s => s.id === id);
    if (!st) return;

    document.getElementById('storyEditId').value = st.id;
    document.getElementById('storyTitleInput').value = st.title || '';
    document.getElementById('storyDescInput').value = st.desc || '';
    document.getElementById('storyModalTitle').innerHTML = '<i class="fa-solid fa-pen-to-square"></i> प्रवास टप्पा संपादन';
    document.getElementById('storyModal').classList.remove('hidden');
}

function saveStoryStep() {
    const editId = document.getElementById('storyEditId').value;
    const title = document.getElementById('storyTitleInput').value.trim();
    const desc = document.getElementById('storyDescInput').value.trim();
    if (!title || !desc) {
        alert('कृपया शीर्षक आणि वर्णन दोन्ही भरा.');
        return;
    }

    weddingSettings.story = weddingSettings.story || {};
    weddingSettings.story.steps = weddingSettings.story.steps || [];

    const itemData = {
        id: editId || ('step_' + Date.now()),
        title: title,
        desc: desc
    };

    if (editId) {
        const idx = weddingSettings.story.steps.findIndex(s => s.id === editId);
        if (idx !== -1) weddingSettings.story.steps[idx] = itemData;
    } else {
        weddingSettings.story.steps.push(itemData);
    }

    document.getElementById('storyModal').classList.add('hidden');
    renderStorySteps();
    markDirty();
    showToast('✓ प्रवास टप्पा अद्यतनित झाला!');
}

function deleteStoryStep(id) {
    if (!confirm('हा जीवन प्रवास टप्पा खरोखर काढून टाकायचा आहे का?')) return;
    weddingSettings.story.steps = (weddingSettings.story.steps || []).filter(s => s.id !== id);
    renderStorySteps();
    markDirty();
    showToast('प्रवास टप्पा काढून टाकला.');
}

window.openEditStory = openEditStory;
window.deleteStoryStep = deleteStoryStep;

/* ========================================================
   7. ITEM-LEVEL CRUD: PHOTO GALLERY
   ======================================================== */
function renderPhotos() {
    const list = document.getElementById('photosEditList');
    if (!list) return;
    list.innerHTML = '';
    const gallery = (weddingSettings && weddingSettings.gallery) || [];

    if (!gallery.length) {
        list.innerHTML = '<p style="color:#777; text-align:center; padding:20px;">कोणतेही छायाचित्र गॅलरीमध्ये नाही.</p>';
        return;
    }

    gallery.forEach(p => {
        const card = document.createElement('div');
        card.className = 'photo-card';
        card.innerHTML = `
            <div class="photo-title">${escapeHTML(p.title || 'छायाचित्र')}</div>
            <div class="photo-preview-wrap">
                <img src="${escapeHTML(p.src || p.url || 'assets/images/hero_couple.jpg')}" alt="${escapeHTML(p.title || p.caption || '')}" onerror="this.src='assets/images/hero_couple.jpg'">
            </div>
            <p style="font-size:0.8rem; color:#666; margin:8px 0;">${escapeHTML(p.caption || '')}</p>
            <button type="button" class="btn btn-danger-sm" style="width:100%; justify-content:center;" onclick="deleteGalleryPhoto('${p.id}')">
                <i class="fa-solid fa-trash-can"></i> फोटो काढून टाका
            </button>
        `;
        list.appendChild(card);
    });
}

function openAddPhoto() {
    document.getElementById('photoTitleInput').value = '';
    document.getElementById('photoCaptionInput').value = '';
    document.getElementById('photoSrcInput').value = '';
    document.getElementById('photoModal').classList.remove('hidden');
}

function savePhoto() {
    const title = document.getElementById('photoTitleInput').value.trim();
    const caption = document.getElementById('photoCaptionInput').value.trim();
    const category = document.getElementById('photoCategoryInput').value;
    const src = document.getElementById('photoSrcInput').value.trim();

    if (!title || !src) {
        alert('कृपया शीर्षक आणि फोटो पाथ दोन्ही भरा.');
        return;
    }

    weddingSettings.gallery = weddingSettings.gallery || [];
    weddingSettings.gallery.push({
        id: 'gal_' + Date.now(),
        title: title,
        caption: caption,
        category: category,
        src: src
    });

    document.getElementById('photoModal').classList.add('hidden');
    renderPhotos();
    markDirty();
    showToast('✓ नवीन फोटो गॅलरीमध्ये जोडला!');
}

function deleteGalleryPhoto(id) {
    if (!confirm('हा फोटो गॅलरीमधून खरोखर काढून टाकायचा आहे का?')) return;
    weddingSettings.gallery = (weddingSettings.gallery || []).filter(p => p.id !== id);
    renderPhotos();
    markDirty();
    showToast('फोटो काढून टाकला.');
}

window.deleteGalleryPhoto = deleteGalleryPhoto;

/* ========================================================
   8. ITEM-LEVEL CRUD: DRESS CODE
   ======================================================== */
function renderDressCode() {
    const list = document.getElementById('dresscodeListAdmin');
    if (!list) return;
    list.innerHTML = '';
    const dressCodes = (weddingSettings && weddingSettings.dressCode) || [];

    if (!dressCodes.length) {
        list.innerHTML = '<p style="color:#777; text-align:center; padding:20px; grid-column:1/-1;">कोणताही ड्रेस कोड उपलब्ध नाही. नवीन जोडण्यासाठी वरील बटण वापरा.</p>';
        return;
    }

    dressCodes.forEach((dc, idx) => {
        const card = document.createElement('div');
        card.className = 'item-crud-card';
        card.innerHTML = `
            <div class="item-crud-header">
                <h4><i class="fa-solid fa-shirt"></i> ${escapeHTML(dc.event || 'समारंभ')}</h4>
                <span style="display:inline-block; width:22px; height:22px; border-radius:50%; background:${escapeHTML(dc.colorCode || '#D4AF37')}; border:2px solid #FFF; box-shadow:0 0 4px rgba(0,0,0,0.3);" title="${escapeHTML(dc.colorName || '')}"></span>
            </div>
            <div class="item-crud-meta">
                <p><strong><i class="fa-solid fa-palette"></i> रंग:</strong> ${escapeHTML(dc.colorName || '-')}</p>
                <p style="margin-top:6px; font-size:0.85rem; color:#555;">${escapeHTML(dc.attire || '-')}</p>
            </div>
            <div class="item-crud-actions">
                <button type="button" class="btn-item-edit" onclick="openEditDresscode(${idx})">
                    <i class="fa-solid fa-pen-to-square"></i> संपादित करा
                </button>
                <button type="button" class="btn-item-del" onclick="deleteDresscode(${idx})">
                    <i class="fa-solid fa-trash-can"></i> हटवा
                </button>
            </div>
        `;
        list.appendChild(card);
    });
}

function openAddDresscode() {
    document.getElementById('dresscodeEditIndex').value = '-1';
    document.getElementById('dcEventInput').value = '';
    document.getElementById('dcColorNameInput').value = '';
    document.getElementById('dcColorCodeInput').value = '#F59E0B';
    document.getElementById('dcAttireInput').value = '';
    document.getElementById('dresscodeModalTitle').innerHTML = '<i class="fa-solid fa-plus-circle"></i> नवीन ड्रेस कोड जोडा';
    document.getElementById('dresscodeModal').classList.remove('hidden');
}

function openEditDresscode(index) {
    const list = (weddingSettings && weddingSettings.dressCode) || [];
    const dc = list[index];
    if (!dc) return;

    document.getElementById('dresscodeEditIndex').value = String(index);
    document.getElementById('dcEventInput').value = dc.event || '';
    document.getElementById('dcColorNameInput').value = dc.colorName || '';
    document.getElementById('dcColorCodeInput').value = dc.colorCode || '#D4AF37';
    document.getElementById('dcAttireInput').value = dc.attire || '';
    document.getElementById('dresscodeModalTitle').innerHTML = '<i class="fa-solid fa-pen-to-square"></i> ड्रेस कोड संपादन';
    document.getElementById('dresscodeModal').classList.remove('hidden');
}

function saveDresscode() {
    const idx = parseInt(document.getElementById('dresscodeEditIndex').value, 10);
    const event = document.getElementById('dcEventInput').value.trim();
    const colorName = document.getElementById('dcColorNameInput').value.trim();
    const colorCode = document.getElementById('dcColorCodeInput').value;
    const attire = document.getElementById('dcAttireInput').value.trim();

    if (!event || !colorName || !attire) {
        alert('कृपया सर्व आवश्यक माहिती भरा.');
        return;
    }

    weddingSettings.dressCode = weddingSettings.dressCode || [];
    const itemData = { event, colorName, colorCode, attire };

    if (idx >= 0 && idx < weddingSettings.dressCode.length) {
        weddingSettings.dressCode[idx] = itemData;
    } else {
        weddingSettings.dressCode.push(itemData);
    }

    document.getElementById('dresscodeModal').classList.add('hidden');
    renderDressCode();
    markDirty();
    showToast('✓ पोशाख मार्गदर्शिका अद्यतनित झाली!');
}

function deleteDresscode(index) {
    if (!confirm('हा ड्रेस कोड खरोखर काढून टाकायचा आहे का?')) return;
    weddingSettings.dressCode.splice(index, 1);
    renderDressCode();
    markDirty();
    showToast('ड्रेस कोड काढून टाकला.');
}

window.openEditDresscode = openEditDresscode;
window.deleteDresscode = deleteDresscode;

/* ========================================================
   9. RSVP MANAGER & GUEST LIST (CLIENT-ISOLATED)
   ======================================================== */
async function initRsvpManager(targetSlug) {
    const slug = targetSlug || activeWebsiteId || 'aaditi-rohan';
    let rsvps = [];
    try {
        const res = await fetch(`/api/rsvp?client=${encodeURIComponent(slug)}`, { headers: getAuthHeaders() });
        if (res.ok) rsvps = await res.json();
    } catch (e) {}

    // Fallback to localStorage if API failed or returned empty
    if (!rsvps || !rsvps.length) {
        try {
            const local = localStorage.getItem('wedding_rsvps_' + slug) || (slug === 'aaditi-rohan' ? localStorage.getItem('wedding_rsvps') : null);
            if (local) rsvps = JSON.parse(local);
        } catch(e) {}
    }

    // Fallback to static client rsvps file
    if (!rsvps || !rsvps.length) {
        try {
            const staticRes = await fetch(`websites/rsvps_${slug}.json?_t=` + Date.now());
            if (staticRes.ok) {
                rsvps = await staticRes.json();
            } else if (slug === 'aaditi-rohan') {
                const defRes = await fetch('rsvps.json?_t=' + Date.now());
                if (defRes.ok) rsvps = await defRes.json();
            }
        } catch(e) {}
    }

    if (!Array.isArray(rsvps)) rsvps = [];

    // Save to localStorage for client persistence
    try {
        localStorage.setItem('wedding_rsvps_' + slug, JSON.stringify(rsvps));
    } catch(e) {}

    function renderTable() {
        const tbody = document.getElementById('rsvpTableBody');
        if (!tbody) return;
        tbody.innerHTML = '';

        let totalHeadcount = 0;
        let attendingCount = 0;
        let decliningCount = 0;
        let vegCount = 0;
        let stayCount = 0;

        if (!rsvps.length) {
            tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:24px; color:#777;"><i class="fa-solid fa-users-slash" style="font-size:1.5rem; margin-bottom:8px; display:block;"></i>'${escapeHTML(slug)}' क्लायंटसाठी अद्याप कोणतीही RSVP नोंदणी नाही. वर दिलेल्या "नवीन पाहुणा जोडा" बटनाने नोंद जोडा किंवा वेबसाईटवरून पाहुणे नोंद करू शकतात.</td></tr>`;
        } else {
            rsvps.forEach((r, idx) => {
                const guestsNum = parseInt(r.guests || r.guestCount, 10) || 1;
                totalHeadcount += guestsNum;
                if (r.attending === 'yes' || r.attendance === 'yes' || String(r.attending || '').includes('येणार')) attendingCount++;
                else decliningCount++;

                const foodStr = String(r.food || r.diet || 'व्हेज');
                if (foodStr.includes('शाकाहारी') || foodStr.includes('व्हेज') || foodStr.includes('Veg')) {
                    vegCount++;
                }

                const stayStr = String(r.stay || r.accommodation || 'नाही');
                if (stayStr.includes('होय') || stayStr.includes('हवी') || stayStr.includes('Yes')) {
                    stayCount++;
                }

                const itemId = r.id || ('rsvp_' + idx);
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="padding:10px;"><strong>${escapeHTML(r.name || r.guestName || 'अनामिक पाहुणे')}</strong></td>
                    <td style="padding:10px;">${escapeHTML(r.phone || '-')}</td>
                    <td style="padding:10px;"><span class="badge" style="background:#E0F2FE; color:#0369A1; padding:2px 8px; border-radius:10px;">${guestsNum} व्यक्ती</span></td>
                    <td style="padding:10px;"><span class="badge" style="background:${(r.attending === 'yes' || r.attendance === 'yes' || String(r.attending || '').includes('येणार')) ? '#DCFCE7' : '#FEE2E2'}; color:${(r.attending === 'yes' || r.attendance === 'yes' || String(r.attending || '').includes('येणार')) ? '#15803D' : '#B91C1C'}; padding:2px 8px; border-radius:10px;">${(r.attending === 'yes' || r.attendance === 'yes' || String(r.attending || '').includes('येणार')) ? 'उपस्थित' : 'अनुपस्थित'}</span></td>
                    <td style="padding:10px;">${escapeHTML(foodStr)}</td>
                    <td style="padding:10px;">${escapeHTML(stayStr)}</td>
                    <td style="font-size:0.85rem; max-width:200px; padding:10px;">"${escapeHTML(r.wishes || r.message || '-')}"</td>
                    <td style="text-align:center; padding:10px;">
                        <button type="button" class="btn btn-danger-sm" onclick="deleteRsvpItem('${itemId}')" title="ही नोंद हटवा">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        const totalEl = document.getElementById('metricTotalRsvps');
        if (totalEl) totalEl.textContent = rsvps.length;
        const headEl = document.getElementById('metricTotalGuests');
        if (headEl) headEl.textContent = totalHeadcount;
        const vegEl = document.getElementById('metricPureVeg');
        if (vegEl) vegEl.textContent = vegCount;
        const stayEl = document.getElementById('metricStayRooms');
        if (stayEl) stayEl.textContent = stayCount;
    }

    renderTable();

    const searchInp = document.getElementById('rsvpSearchInput');
    if (searchInp) {
        searchInp.oninput = () => {
            const term = searchInp.value.toLowerCase();
            document.querySelectorAll('#rsvpTableBody tr').forEach(tr => {
                tr.style.display = tr.textContent.toLowerCase().includes(term) ? '' : 'none';
            });
        };
    }
}

async function deleteRsvpItem(id) {
    const slug = activeWebsiteId || 'aaditi-rohan';
    if (!confirm('ही RSVP नोंद खरोखर हटवायची आहे का?')) return;
    try {
        let localRsvps = JSON.parse(localStorage.getItem('wedding_rsvps_' + slug) || '[]');
        localRsvps = localRsvps.filter(r => (r.id !== id && String(r.id || '') !== String(id)));
        localStorage.setItem('wedding_rsvps_' + slug, JSON.stringify(localRsvps));
    } catch(e) {}

    try {
        await fetch(`/api/rsvp/${encodeURIComponent(id)}?client=${encodeURIComponent(slug)}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
    } catch(e) {}

    showToast('✓ RSVP नोंद हटवली.');
    await initRsvpManager(slug);
}

async function clearAllRsvps() {
    const slug = activeWebsiteId || 'aaditi-rohan';
    if (!confirm(`तुम्हाला खरोखर '${slug}' क्लायंटच्या सर्व पाहुण्यांची नोंदणी (Clear All RSVPs) हटवायची आहे का? हा बदल पूर्ववत करता येणार नाही.`)) return;
    try {
        localStorage.removeItem('wedding_rsvps_' + slug);
        localStorage.setItem('wedding_rsvps_' + slug, JSON.stringify([]));
    } catch(e) {}

    try {
        await fetch(`/api/rsvp/clear-all?client=${encodeURIComponent(slug)}`, {
            method: 'POST',
            headers: getAuthHeaders()
        });
    } catch(e) {}

    showToast(`✓ '${slug}' च्या सर्व पाहुणे नोंदी हटवल्या गेल्या.`);
    await initRsvpManager(slug);
}

function exportRsvpsCsv() {
    const slug = activeWebsiteId || 'aaditi-rohan';
    let rsvps = [];
    try {
        const local = localStorage.getItem('wedding_rsvps_' + slug);
        if (local) rsvps = JSON.parse(local);
    } catch(e) {}

    if (!rsvps || !rsvps.length) {
        showToast('कोणतीही RSVP नोंद सापडली नाही.');
        return;
    }

    const headers = ['नाव (Name)', 'फोन (Phone)', 'संख्या (Guests)', 'उपस्थिती (Status)', 'भोजन (Food)', 'निवास (Stay)', 'सदिच्छा संदेश (Wishes)', 'तारीख (Timestamp)'];
    const rows = rsvps.map(r => [
        `"${String(r.name || r.guestName || '').replace(/"/g, '""')}"`,
        `"${String(r.phone || '').replace(/"/g, '""')}"`,
        `"${String(r.guests || r.guestCount || 1).replace(/"/g, '""')}"`,
        `"${String((r.attending === 'yes' || r.attendance === 'yes' || String(r.attending || '').includes('येणार')) ? 'उपस्थित' : 'अनुपस्थित').replace(/"/g, '""')}"`,
        `"${String(r.food || r.diet || '').replace(/"/g, '""')}"`,
        `"${String(r.stay || r.accommodation || '').replace(/"/g, '""')}"`,
        `"${String(r.wishes || r.message || '').replace(/"/g, '""')}"`,
        `"${String(r.timestamp || r.createdAt || '').replace(/"/g, '""')}"`
    ].join(','));

    const csvContent = '\uFEFF' + headers.join(',') + '\n' + rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wedding_rsvps_${slug}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('✓ CSV फाईल यशस्वीरीत्या डाऊनलोड झाली!');
}

function openAddAdminRsvp() {
    const modal = document.getElementById('adminRsvpModal');
    if (modal) {
        document.getElementById('adminRsvpName').value = '';
        document.getElementById('adminRsvpPhone').value = '';
        document.getElementById('adminRsvpWishes').value = '';
        modal.classList.remove('hidden');
    }
}

function closeAddAdminRsvp() {
    const modal = document.getElementById('adminRsvpModal');
    if (modal) modal.classList.add('hidden');
}

async function saveAdminRsvp() {
    const slug = activeWebsiteId || 'aaditi-rohan';
    const name = (document.getElementById('adminRsvpName')?.value || '').trim();
    const phone = (document.getElementById('adminRsvpPhone')?.value || '').trim();
    if (!name || !phone) {
        alert('कृपया पाहुण्याचे नाव व फोन नंबर प्रविष्ट करा.');
        return;
    }

    const guests = document.getElementById('adminRsvpGuests')?.value || '2';
    const attending = document.getElementById('adminRsvpAttending')?.value || 'yes';
    const food = document.getElementById('adminRsvpFood')?.value || 'शुद्ध शाकाहारी (Pure Veg)';
    const stay = document.getElementById('adminRsvpStay')?.value || 'नाही, स्थानिक आहोत';
    const wishes = (document.getElementById('adminRsvpWishes')?.value || '').trim();

    const newRsvp = {
        id: 'rsvp_' + Date.now(),
        client: slug,
        name, phone, guests, attending, food, stay, wishes,
        timestamp: new Date().toLocaleString('mr-IN')
    };

    let rsvps = [];
    try {
        rsvps = JSON.parse(localStorage.getItem('wedding_rsvps_' + slug) || '[]');
    } catch(e) {}
    rsvps.unshift(newRsvp);

    try {
        localStorage.setItem('wedding_rsvps_' + slug, JSON.stringify(rsvps));
    } catch(e) {}

    try {
        await fetch(`/api/rsvp?client=${encodeURIComponent(slug)}`, {
            method: 'POST',
            headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(newRsvp)
        });
    } catch(e) {}

    closeAddAdminRsvp();
    showToast('✓ नवीन पाहुणा नोंद यशस्वीरीत्या जोडली!');
    await initRsvpManager(slug);
}

window.initRsvpManager = initRsvpManager;
window.deleteRsvpItem = deleteRsvpItem;
window.clearAllRsvps = clearAllRsvps;
window.exportRsvpsCsv = exportRsvpsCsv;
window.openAddAdminRsvp = openAddAdminRsvp;
window.closeAddAdminRsvp = closeAddAdminRsvp;
window.saveAdminRsvp = saveAdminRsvp;

/* ========================================================
   10. GUEST WISHES WALL MANAGER (CLIENT-ISOLATED)
   ======================================================== */
async function initWishesManager(targetSlug) {
    const slug = targetSlug || activeWebsiteId || 'aaditi-rohan';
    const list = document.getElementById('wishesListAdmin');
    if (!list) return;
    list.innerHTML = '';

    let wishes = [];
    try {
        const res = await fetch(`/api/wishes?client=${encodeURIComponent(slug)}`, { headers: getAuthHeaders() });
        if (res.ok) wishes = await res.json();
    } catch (e) {}

    if (!wishes || !wishes.length) {
        try {
            const local = localStorage.getItem('wedding_wishes_' + slug) || (slug === 'aaditi-rohan' ? localStorage.getItem('wedding_wishes') : null);
            if (local) wishes = JSON.parse(local);
        } catch(e) {}
    }

    if (!wishes || !wishes.length) {
        try {
            const staticRes = await fetch(`websites/wishes_${slug}.json?_t=` + Date.now());
            if (staticRes.ok) {
                wishes = await staticRes.json();
            } else if (slug === 'aaditi-rohan') {
                const defRes = await fetch('wishes.json?_t=' + Date.now());
                if (defRes.ok) wishes = await defRes.json();
            }
        } catch(e) {}
    }

    if (!Array.isArray(wishes)) wishes = [];

    // Save to localStorage for client
    try {
        localStorage.setItem('wedding_wishes_' + slug, JSON.stringify(wishes));
    } catch(e) {}

    if (!wishes.length) {
        list.innerHTML = `<p style="color:#777; text-align:center; padding:20px; grid-column:1/-1;">'${escapeHTML(slug)}' क्लायंटसाठी अद्याप कोणताही सदिच्छा संदेश आलेला नाही.</p>`;
        return;
    }

    wishes.forEach((w, idx) => {
        const wishId = w.id || ('wish_' + idx);
        const card = document.createElement('div');
        card.className = 'item-crud-card';
        card.innerHTML = `
            <div class="item-crud-header">
                <h4><i class="fa-solid fa-comment-heart" style="color:#D4AF37;"></i> ${escapeHTML(w.name || 'शुभचिंतक')}</h4>
                <span style="font-size:0.75rem; color:#888;">${escapeHTML(w.city || w.timestamp || '')}</span>
            </div>
            <div class="item-crud-meta">
                <p style="font-style:italic; font-size:0.9rem; color:#444;">"${escapeHTML(w.message || w.wish || '')}"</p>
            </div>
            <div class="item-crud-actions">
                <button type="button" class="btn-item-del" style="width:100%; justify-content:center;" onclick="deleteWishItem('${wishId}')">
                    <i class="fa-solid fa-trash-can"></i> संदेश काढून टाका
                </button>
            </div>
        `;
        list.appendChild(card);
    });
}

async function deleteWishItem(id) {
    const slug = activeWebsiteId || 'aaditi-rohan';
    if (!confirm('हा सदिच्छा संदेश खरोखर हटवायचा आहे का?')) return;
    try {
        let localWishes = JSON.parse(localStorage.getItem('wedding_wishes_' + slug) || '[]');
        localWishes = localWishes.filter(w => (w.id !== id && String(w.id || '') !== String(id)));
        localStorage.setItem('wedding_wishes_' + slug, JSON.stringify(localWishes));
    } catch(e) {}

    try {
        await fetch(`/api/wishes/${encodeURIComponent(id)}?client=${encodeURIComponent(slug)}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
    } catch(e) {}

    showToast('✓ सदिच्छा संदेश हटवला.');
    await initWishesManager(slug);
}

async function clearAllWishes() {
    const slug = activeWebsiteId || 'aaditi-rohan';
    if (!confirm(`तुम्हाला खरोखर '${slug}' क्लायंटचे सर्व सदिच्छा संदेश (Clear All Wishes) हटवायचे आहेत का? हा बदल पूर्ववत करता येणार नाही.`)) return;
    try {
        localStorage.removeItem('wedding_wishes_' + slug);
        localStorage.setItem('wedding_wishes_' + slug, JSON.stringify([]));
    } catch(e) {}

    try {
        await fetch(`/api/wishes/clear-all?client=${encodeURIComponent(slug)}`, {
            method: 'POST',
            headers: getAuthHeaders()
        });
    } catch(e) {}

    showToast(`✓ '${slug}' चे सर्व सदिच्छा संदेश हटवले गेले.`);
    await initWishesManager(slug);
}

window.initWishesManager = initWishesManager;
window.deleteWishItem = deleteWishItem;
window.clearAllWishes = clearAllWishes;

/* ========================================================
   11. THEMES & OPENING STYLES ENGINES
   ======================================================== */
function renderTemplatesGrid() {
    const grid = document.getElementById('templatesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    INDIAN_CULTURAL_TEMPLATES.forEach(tpl => {
        const isCurrent = (weddingSettings && weddingSettings.templateId === tpl.id);
        const card = document.createElement('div');
        card.className = 'template-admin-card ' + (isCurrent ? 'is-active-template' : '');
        card.setAttribute('data-category', tpl.category);
        card.innerHTML = `
            <div class="tpl-card-top" style="background:${tpl.primaryColor}; color:${tpl.accentColor};">
                <span class="tpl-symbol">${tpl.symbol}</span>
                <span class="tpl-badge">${escapeHTML(tpl.badge)}</span>
            </div>
            <div class="tpl-card-body">
                <h3 class="tpl-name">${escapeHTML(tpl.name)}</h3>
                <p class="tpl-desc">${escapeHTML(tpl.description)}</p>
                <div class="tpl-swatches">
                    <span class="swatch" style="background:${tpl.primaryColor};" title="Primary Color"></span>
                    <span class="swatch" style="background:${tpl.accentColor};" title="Accent Color"></span>
                    <span class="swatch" style="background:${tpl.cardBg}; border:1px solid #CCC;" title="Card Background"></span>
                </div>
            </div>
            <div class="tpl-card-footer">
                <button type="button" class="btn btn-select-tpl" onclick="selectTemplate('${tpl.id}')">
                    ${isCurrent ? '✓ हे टेम्पलेट सक्रिय आहे' : 'हे टेम्पलेट लागू करा'}
                </button>
            </div>
        `;
        grid.appendChild(card);
    });

    const activeTpl = INDIAN_CULTURAL_TEMPLATES.find(t => t.id === (weddingSettings && weddingSettings.templateId)) || INDIAN_CULTURAL_TEMPLATES[0];
    const bannerTitle = document.getElementById('activeTemplateTitle');
    if (bannerTitle) bannerTitle.textContent = activeTpl.name;
}

function selectTemplate(tplId) {
    if (!weddingSettings) weddingSettings = {};
    weddingSettings.templateId = tplId;
    renderTemplatesGrid();
    markDirty();
    showToast("✓ डिझाईन थीम '" + tplId + "' निवडली गेली!");
}

window.selectTemplate = selectTemplate;

function initOpeningStyles() {
    const cards = document.querySelectorAll('.opening-style-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const styleId = card.getAttribute('data-style-card');
            if (styleId) selectOpeningStyle(styleId);
        });
    });
    updateOpeningStylesUI((weddingSettings && weddingSettings.openingStyle) || 'envelope-wax');
}

function selectOpeningStyle(styleId) {
    if (!weddingSettings) weddingSettings = {};
    weddingSettings.openingStyle = styleId;
    updateOpeningStylesUI(styleId);
    markDirty();
    showToast("✓ पत्रिका उघडण्याची शैली '" + styleId + "' निवडली गेली!");
}

function updateOpeningStylesUI(activeStyle) {
    document.querySelectorAll('.opening-style-card').forEach(card => {
        const id = card.getAttribute('data-style-card');
        const isActive = id === activeStyle;
        card.classList.toggle('is-active-style', isActive);
    });
    const titleEl = document.getElementById('activeStyleTitle');
    if (titleEl) {
        const found = OPENING_STYLES.find(s => s.id === activeStyle);
        titleEl.textContent = found ? found.name : activeStyle;
    }
}

/* ========================================================
   12. FORM POPULATION & DATA BINDINGS
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
    const sh = s.shagun || {};
    const st = s.story || {};
    const tr = s.traditional || {};
    const fam = s.families || {};
    const sc = s.scroll || {};
    const uk = s.ukhane || {};

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
    setVal('swagotsukInput', tr.swagotsuk || g.swagotsuk);
    setVal('vinitaInput', tr.vinita || g.vinita);
    setVal('aherNoteInput', tr.aherNote || g.aherNote);

    // Venue
    setVal('venueNameInput', g.venueName);
    setVal('venueAddressInput', g.venueAddress);
    setVal('venuePhoneInput', g.venuePhone);
    setVal('venueBhojanTime', g.bhojanTime);
    setVal('venueBhojanNote', g.bhojanNote);
    setVal('googleMapsUrlInput', g.googleMapsUrl);
    setVal('googleMapsEmbedInput', g.googleMapsEmbed);

    // Families
    setVal('bHead1', fam.bHead1);
    setVal('bHead2', fam.bHead2);
    setVal('bParivar', fam.bParivar);
    setVal('gHead1', fam.gHead1);
    setVal('gHead2', fam.gHead2);
    setVal('gParivar', fam.gParivar);

    // Scroll & Ukhane
    setVal('scrollSealInput', sc.sealEmblem);
    setVal('scrollTitleInput', sc.title);
    setVal('scrollSubtitleInput', sc.subtitle);
    setVal('scrollInvitedByInput', sc.invitedBy);
    setVal('scrollBlessingInput', sc.blessing);

    if (uk.brideLines) {
        setVal('bUkhana1', uk.brideLines[0]);
        setVal('bUkhana2', uk.brideLines[1]);
        setVal('bUkhana3', uk.brideLines[2]);
        setVal('bUkhana4', uk.brideLines[3]);
    }
    if (uk.groomLines) {
        setVal('gUkhana1', uk.groomLines[0]);
        setVal('gUkhana2', uk.groomLines[1]);
        setVal('gUkhana3', uk.groomLines[2]);
        setVal('gUkhana4', uk.groomLines[3]);
    }

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

    // Story quote
    setVal('storyQuoteInput', st.quote);

    // Media (Audio & Video)
    const med = s.media || {};
    setVal('bgMusicUrl', med.backgroundAudio || med.bgMusicUrl || med.customAudio || '');
    setVal('videoUrlInput', med.videoUrl || (med.useGhibliVideo === true ? (med.defaultVideo || 'assets/video/ghibli_wedding_journey.mp4') : ''));
    setVal('videoPosterInput', med.videoPoster || 'assets/images/hero_couple.jpg');
    setVal('videoTitleInput', med.videoTitle || '');
    setCheck('useGhibliVideoToggle', med.useGhibliVideo === true);
    [
        ['previewHeroImg', med.heroImage, 'assets/images/hero_couple.jpg'],
        ['previewSakharpudaImg', med.sakharpudaImage, 'assets/images/sakharpuda.jpg'],
        ['previewHaladImg', med.haladImage, 'assets/images/halad.jpg'],
        ['previewSaptapadiImg', med.saptapadiImage, 'assets/images/saptapadi.jpg'],
        ['previewSahyadriImg', med.sahyadriImage, 'assets/images/sahyadri_romance.jpg']
    ].forEach(([id, src, fallback]) => {
        const image = document.getElementById(id);
        if (image) image.src = src || fallback;
    });

    // Section Visibility
    const sec = s.sections || {};
    setCheck('secShowStory', sec.showStory !== false);
    setCheck('secShowCeremonies', sec.showCeremonies !== false);
    setCheck('secShowVideo', sec.showVideo !== false);
    setCheck('secShowPhotos', sec.showPhotos !== false);
    setCheck('secShowUkhane', sec.showUkhane !== false);
    setCheck('secShowScroll', sec.showScroll !== false);
    setCheck('secShowRsvp', sec.showRsvp !== false);
    setCheck('secShowVenue', sec.showVenue !== false);
    setCheck('secShowHosts', sec.showHosts !== false);
    setCheck('secShowCountdown', sec.showCountdown !== false);
    setCheck('secShowPetals', sec.showPetals !== false);
    setCheck('secShowSwagotsuk', sec.showSwagotsuk !== false);
    setCheck('secShowBhojan', sec.showBhojan !== false);
    setCheck('secShowVinita', sec.showVinita !== false);
    setCheck('secShowBalhatta', sec.showBalhatta !== false);
    setCheck('secShowAher', sec.showAher !== false);
    setCheck('secShowSaptapadi', sec.showSaptapadi !== false);
    setCheck('secShowDresscode', sec.showDresscode !== false);
    setCheck('secShowShagun', sec.showShagun !== false);
    setCheck('secShowAarti', sec.showAarti !== false);

    // Language
    setCheck('cfgAllowGuestLangSwitch', s.allowGuestLanguageSwitch !== false);
    const primaryLanguage = ['mr', 'hi', 'en'].includes(s.activeLanguage) ? s.activeLanguage : 'mr';
    const guestLanguages = Array.isArray(s.guestLanguages) ? s.guestLanguages : [primaryLanguage];
    setCheck('cfgGuestLangMR', guestLanguages.includes('mr') || primaryLanguage === 'mr');
    setCheck('cfgGuestLangHI', guestLanguages.includes('hi') || primaryLanguage === 'hi');
    setCheck('cfgGuestLangEN', guestLanguages.includes('en') || primaryLanguage === 'en');

    updateLaunchTexts();
}

function collectFormData() {
    if (!weddingSettings) weddingSettings = {};
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
    g.weddingDateTimeISO = getVal('weddingDateTimeInput') || '2026-12-17T12:35:00+05:30';
    g.venueName = getVal('venueNameInput');
    g.venueAddress = getVal('venueAddressInput');
    g.venuePhone = getVal('venuePhoneInput');
    g.bhojanTime = getVal('venueBhojanTime');
    g.bhojanNote = getVal('venueBhojanNote');
    g.googleMapsUrl = getVal('googleMapsUrlInput');
    g.googleMapsEmbed = getVal('googleMapsEmbedInput');

    weddingSettings.traditional = {
        swagotsuk: getVal('swagotsukInput'),
        vinita: getVal('vinitaInput'),
        aherNote: getVal('aherNoteInput')
    };

    weddingSettings.families = {
        bHead1: getVal('bHead1'),
        bHead2: getVal('bHead2'),
        bParivar: getVal('bParivar'),
        gHead1: getVal('gHead1'),
        gHead2: getVal('gHead2'),
        gParivar: getVal('gParivar')
    };

    weddingSettings.scroll = {
        sealEmblem: getVal('scrollSealInput'),
        title: getVal('scrollTitleInput'),
        subtitle: getVal('scrollSubtitleInput'),
        invitedBy: getVal('scrollInvitedByInput'),
        blessing: getVal('scrollBlessingInput')
    };

    weddingSettings.ukhane = {
        brideLines: [getVal('bUkhana1'), getVal('bUkhana2'), getVal('bUkhana3'), getVal('bUkhana4')],
        groomLines: [getVal('gUkhana1'), getVal('gUkhana2'), getVal('gUkhana3'), getVal('gUkhana4')]
    };

    // Media (Audio & Video) — use 'backgroundAudio' to match script.js
    weddingSettings.media = weddingSettings.media || {};
    const audioUrlInput = document.getElementById('bgMusicUrl');
    const videoUrlInput = document.getElementById('videoUrlInput');
    if (audioUrlInput) weddingSettings.media.backgroundAudio = audioUrlInput.value.trim();
    else if (!Object.prototype.hasOwnProperty.call(weddingSettings.media, 'backgroundAudio')) {
        weddingSettings.media.backgroundAudio = weddingSettings.media.bgMusicUrl || '';
    }
    weddingSettings.media.bgMusicUrl = weddingSettings.media.backgroundAudio;
    if (videoUrlInput) weddingSettings.media.videoUrl = videoUrlInput.value.trim();
    else if (!Object.prototype.hasOwnProperty.call(weddingSettings.media, 'videoUrl')) {
        weddingSettings.media.videoUrl = weddingSettings.media.customVideo || '';
    }
    const videoPosterInput = document.getElementById('videoPosterInput');
    const videoTitleInput = document.getElementById('videoTitleInput');
    if (videoPosterInput) weddingSettings.media.videoPoster = videoPosterInput.value.trim();
    if (videoTitleInput) weddingSettings.media.videoTitle = videoTitleInput.value.trim();

    weddingSettings.shagun = {
        upiId: getVal('cfgUpiId'),
        payeeName: getVal('cfgPayeeName'),
        enabled: Boolean(getVal('cfgUpiId') && getVal('cfgPayeeName')),
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

    const primaryLanguage = ['mr', 'hi', 'en'].includes(weddingSettings.activeLanguage) ? weddingSettings.activeLanguage : 'mr';
    const selectedGuestLanguages = ['mr', 'hi', 'en'].filter(lang => getCheck(`cfgGuestLang${lang.toUpperCase()}`));
    if (!selectedGuestLanguages.includes(primaryLanguage)) selectedGuestLanguages.unshift(primaryLanguage);
    weddingSettings.guestLanguages = selectedGuestLanguages;
    weddingSettings.allowGuestLanguageSwitch = selectedGuestLanguages.length > 1;

    weddingSettings.sections = {
        showStory: getCheck('secShowStory'),
        showCeremonies: getCheck('secShowCeremonies'),
        showVideo: getCheck('secShowVideo'),
        showPhotos: getCheck('secShowPhotos'),
        showUkhane: getCheck('secShowUkhane'),
        showScroll: getCheck('secShowScroll'),
        showRsvp: getCheck('secShowRsvp'),
        showVenue: getCheck('secShowVenue'),
        showHosts: getCheck('secShowHosts'),
        showCountdown: getCheck('secShowCountdown'),
        showPetals: getCheck('secShowPetals'),
        showSwagotsuk: getCheck('secShowSwagotsuk'),
        showBhojan: getCheck('secShowBhojan'),
        showVinita: getCheck('secShowVinita'),
        showBalhatta: getCheck('secShowBalhatta'),
        showAher: getCheck('secShowAher'),
        showSaptapadi: getCheck('secShowSaptapadi'),
        showDresscode: getCheck('secShowDresscode'),
        showShagun: getCheck('secShowShagun'),
        showAarti: getCheck('secShowAarti')
    };
}

async function saveSettings() {
    collectFormData();
    const targetSlug = activeWebsiteId || 'aaditi-rohan';

    // Ensure settings contains client identifier
    weddingSettings.slug = targetSlug;
    weddingSettings.id = targetSlug;

    localStorage.setItem('wedding_settings', JSON.stringify(weddingSettings));
    localStorage.setItem('wedding_settings_' + targetSlug, JSON.stringify(weddingSettings));

    const curIdx = allWebsites.findIndex(w => w.id === targetSlug || w.slug === targetSlug);
    if (curIdx >= 0) {
        allWebsites[curIdx].bride = weddingSettings?.general?.brideName || allWebsites[curIdx].bride;
        allWebsites[curIdx].groom = weddingSettings?.general?.groomName || allWebsites[curIdx].groom;
        allWebsites[curIdx].title = weddingSettings?.general?.weddingTitle || allWebsites[curIdx].title;
        allWebsites[curIdx].date = weddingSettings?.general?.weddingDateText || allWebsites[curIdx].date;
        allWebsites[curIdx].venue = weddingSettings?.general?.venueName || allWebsites[curIdx].venue;
        allWebsites[curIdx].theme = weddingSettings?.templateId || allWebsites[curIdx].theme;
        allWebsites[curIdx].openingStyle = weddingSettings?.openingStyle || allWebsites[curIdx].openingStyle;
        try {
            localStorage.setItem('wedding_websites_list', JSON.stringify(allWebsites));
        } catch(e) {}
        renderWebsitesDropdown();
        renderWebsitesGrid();
        updateActiveWebsiteBadge();
        updateClientStatsCounters();
    }

    let serverSaved = false;
    try {
        const res = await fetch(`/api/settings?client=${encodeURIComponent(targetSlug)}`, {
            method: 'POST',
            headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(weddingSettings)
        });
        if (res.ok) serverSaved = true;
    } catch(e) {}

    markSaved();
    refreshPreviewIframe();
    if (serverSaved) {
        showToast(`✓ '${targetSlug}' क्लायंटचे बदल सर्व्हरवर सेव्ह झाले! (Saved to ${targetSlug}.json)`);
    } else {
        showToast(`✓ '${targetSlug}' चे बदल स्थानिकरित्या (LocalStorage) सुरक्षित सेव्ह झाले!`);
    }
}

function initMediaUploadControls() {
    const controls = [
        { kind: 'video', inputId: 'videoFileInput', dropId: 'videoDropzone', previewId: 'adminVideoPreview', pathId: 'activeVideoPath', progressId: 'videoUploadProgress', clearId: 'clearVideoBtn', maxBytes: 150 * 1024 * 1024, extensions: ['mp4', 'webm'] },
        { kind: 'audio', inputId: 'audioFileInput', dropId: 'audioDropzone', previewId: 'adminAudioPreview', pathId: 'activeAudioPath', progressId: 'audioUploadProgress', clearId: 'clearAudioBtn', maxBytes: 50 * 1024 * 1024, extensions: ['mp3', 'wav'] }
    ];

    const previewVideo = document.getElementById('adminVideoPreview');
    const previewAudio = document.getElementById('adminAudioPreview');
    let resumePreviewAudio = false;
    if (previewVideo && previewAudio) {
        previewVideo.addEventListener('play', () => {
            resumePreviewAudio = !previewAudio.paused;
            previewAudio.pause();
        });
        const resumeAudio = () => {
            if (resumePreviewAudio) previewAudio.play().catch(() => {});
            resumePreviewAudio = false;
        };
        previewVideo.addEventListener('ended', resumeAudio);
        previewAudio.addEventListener('play', () => {
            if (!previewVideo.paused) previewVideo.pause();
        });
    }

    const updatePreview = (control, url) => {
        const preview = document.getElementById(control.previewId);
        const source = preview?.querySelector('source');
        const path = document.getElementById(control.pathId);
        if (path) path.textContent = url || '—';
        if (!preview) return;
        preview.pause?.();
        if (source) {
            if (url) source.setAttribute('src', url);
            else source.removeAttribute('src');
        } else if (url) preview.setAttribute('src', url);
        else preview.removeAttribute('src');
        preview.load();
    };

    const photoControls = [
        { inputId: 'uploadHeroInput', previewId: 'previewHeroImg', mediaKey: 'heroImage', galleryId: 'gal_1', galleryIndex: 0, category: 'couple', fallback: 'assets/images/hero_couple.jpg' },
        { inputId: 'uploadSakharpudaInput', previewId: 'previewSakharpudaImg', mediaKey: 'sakharpudaImage', galleryId: 'gal_2', galleryIndex: 1, category: 'engagement', fallback: 'assets/images/sakharpuda.jpg' },
        { inputId: 'uploadHaladInput', previewId: 'previewHaladImg', mediaKey: 'haladImage', galleryId: 'gal_3', galleryIndex: 2, category: 'haldi', fallback: 'assets/images/halad.jpg' },
        { inputId: 'uploadSaptapadiInput', previewId: 'previewSaptapadiImg', mediaKey: 'saptapadiImage', galleryId: 'gal_4', galleryIndex: 3, category: 'wedding', fallback: 'assets/images/saptapadi.jpg' },
        { inputId: 'uploadSahyadriInput', previewId: 'previewSahyadriImg', mediaKey: 'sahyadriImage', galleryId: 'gal_5', galleryIndex: 4, category: 'couple', fallback: 'assets/images/sahyadri_romance.jpg' }
    ];

    photoControls.forEach(control => {
        const input = document.getElementById(control.inputId);
        input?.addEventListener('change', async () => {
            const file = input.files?.[0];
            input.value = '';
            if (!file) return;
            const extension = (file.name.split('.').pop() || '').toLowerCase();
            if (!file.type.startsWith('image/') || !['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(extension)) {
                showToast('कृपया JPG, PNG, WebP किंवा GIF फोटो निवडा.');
                return;
            }
            if (file.size > 15 * 1024 * 1024) {
                showToast('फोटोचा आकार १५ MB पेक्षा कमी ठेवा.');
                return;
            }

            try {
                const client = encodeURIComponent((activeWebsiteId || 'aaditi-rohan').replace(/[^a-z0-9_-]/gi, '_'));
                const response = await fetch(`/api/upload?client=${client}`, {
                    method: 'POST',
                    headers: getAuthHeaders({ 'X-Filename': encodeURIComponent(file.name) }),
                    body: file
                });
                const result = await response.json();
                if (!response.ok || !result.success || !result.url) {
                    throw new Error(result.error || 'फोटो अपलोड झाला नाही.');
                }

                weddingSettings = weddingSettings || {};
                weddingSettings.media = weddingSettings.media || {};
                weddingSettings.media[control.mediaKey] = result.url;
                weddingSettings.gallery = Array.isArray(weddingSettings.gallery) ? weddingSettings.gallery : [];
                const photo = weddingSettings.gallery.find(item => item.id === control.galleryId) || weddingSettings.gallery[control.galleryIndex];
                if (photo) {
                    photo.src = result.url;
                    photo.url = result.url;
                } else {
                    weddingSettings.gallery.push({ id: control.galleryId, title: control.mediaKey, caption: '', category: control.category, src: result.url });
                }
                const preview = document.getElementById(control.previewId);
                if (preview) preview.src = result.url;
                renderPhotos();
                markDirty();
                await saveSettings();
                showToast('✓ फोटो अपलोड करून गॅलरीमध्ये सेव्ह केला!');
            } catch (error) {
                showToast('फोटो अपलोड अयशस्वी: ' + (error.message || error));
            }
        });
    });

    const saveMediaUrl = async (control, url) => {
        if (!weddingSettings) weddingSettings = {};
        weddingSettings.media = weddingSettings.media || {};
        if (control.kind === 'video') {
            weddingSettings.media.videoUrl = url;
            weddingSettings.media.customVideo = url;
            weddingSettings.media.useGhibliVideo = url === 'assets/video/ghibli_wedding_journey.mp4';
            weddingSettings.sections = weddingSettings.sections || {};
            weddingSettings.sections.showVideo = Boolean(url);
            setCheck('secShowVideo', Boolean(url));
        } else {
            weddingSettings.media.backgroundAudio = url;
            weddingSettings.media.bgMusicUrl = url;
            weddingSettings.media.customAudio = url;
        }
        updatePreview(control, url);
        markDirty();
        await saveSettings();
    };

    const uploadFile = (control, file) => {
        if (!file) return;
        const extension = (file.name.split('.').pop() || '').toLowerCase();
        if (!control.extensions.includes(extension)) {
            showToast(control.kind === 'video' ? 'MP4 किंवा WebM व्हिडिओ निवडा.' : 'MP3 किंवा WAV ऑडिओ निवडा.');
            return;
        }
        if (file.size > control.maxBytes) {
            showToast(control.kind === 'video' ? 'व्हिडिओचा आकार १५० MB पेक्षा कमी ठेवा.' : 'ऑडिओचा आकार ५० MB पेक्षा कमी ठेवा.');
            return;
        }

        const progress = document.getElementById(control.progressId);
        const fill = progress?.querySelector('.fill');
        progress?.classList.remove('hidden');
        if (fill) fill.style.width = '0%';
        const client = encodeURIComponent((activeWebsiteId || 'aaditi-rohan').replace(/[^a-z0-9_-]/gi, '_'));
        const request = new XMLHttpRequest();
        request.open('POST', `/api/upload?client=${client}`);
        const adminToken = getAdminToken();
        if (adminToken) request.setRequestHeader('X-Admin-Token', adminToken);
        request.setRequestHeader('X-Filename', encodeURIComponent(file.name));
        request.upload.addEventListener('progress', event => {
            if (event.lengthComputable && fill) fill.style.width = `${Math.round(event.loaded / event.total * 100)}%`;
        });
        request.addEventListener('load', async () => {
            progress?.classList.add('hidden');
            try {
                const result = JSON.parse(request.responseText || '{}');
                if (request.status < 200 || request.status >= 300 || !result.success || !result.url) {
                    throw new Error(result.error || 'फाइल अपलोड झाली नाही.');
                }
                await saveMediaUrl(control, result.url);
                showToast(control.kind === 'video' ? '✓ व्हिडिओ अपलोड करून सेव्ह केला!' : '✓ ऑडिओ अपलोड करून सेव्ह केला!');
            } catch (error) {
                showToast('अपलोड अयशस्वी: ' + (error.message || error));
            }
        });
        request.addEventListener('error', () => {
            progress?.classList.add('hidden');
            showToast('सर्व्हरशी संपर्क झाला नाही. वेबसाइट सर्व्हरवरून उघडा.');
        });
        request.send(file);
    };

    controls.forEach(control => {
        const input = document.getElementById(control.inputId);
        const dropzone = document.getElementById(control.dropId);
        input?.addEventListener('change', () => {
            uploadFile(control, input.files?.[0]);
            input.value = '';
        });
        dropzone?.addEventListener('dragover', event => event.preventDefault());
        dropzone?.addEventListener('drop', event => {
            event.preventDefault();
            uploadFile(control, event.dataTransfer?.files?.[0]);
        });
        document.getElementById(control.clearId)?.addEventListener('click', async () => {
            if (!weddingSettings) weddingSettings = {};
            weddingSettings.media = weddingSettings.media || {};
            if (control.kind === 'video') {
                weddingSettings.media.videoUrl = '';
                weddingSettings.media.customVideo = '';
                weddingSettings.media.useGhibliVideo = false;
                weddingSettings.sections = weddingSettings.sections || {};
                weddingSettings.sections.showVideo = false;
                setCheck('secShowVideo', false);
                const videoUrlInput = document.getElementById('videoUrlInput');
                if (videoUrlInput) videoUrlInput.value = '';
                const fallbackToggle = document.getElementById('useGhibliVideoToggle');
                if (fallbackToggle) fallbackToggle.checked = false;
            } else {
                weddingSettings.media.backgroundAudio = '';
                weddingSettings.media.bgMusicUrl = '';
                weddingSettings.media.customAudio = '';
                const audioUrlInput = document.getElementById('bgMusicUrl');
                if (audioUrlInput) audioUrlInput.value = '';
                document.querySelectorAll('.audio-preset-card').forEach(card => card.classList.remove('active'));
            }
            updatePreview(control, '');
            markDirty();
            await saveSettings();
            showToast(control.kind === 'video' ? '✓ व्हिडिओ काढला; व्हिडिओ विभाग पाहुण्यांना दिसणार नाही.' : '✓ ऑडिओ काढला; संगीत बटण पाहुण्यांना दिसणार नाही.');
        });
    });

    const currentMedia = weddingSettings?.media || {};
    updatePreview(controls[0], currentMedia.videoUrl || currentMedia.customVideo || '');
    updatePreview(controls[1], currentMedia.backgroundAudio || currentMedia.bgMusicUrl || currentMedia.customAudio || '');

    const useDefaultVideoToggle = document.getElementById('useGhibliVideoToggle');
    useDefaultVideoToggle?.addEventListener('change', async () => {
        if (!weddingSettings) weddingSettings = {};
        weddingSettings.media = weddingSettings.media || {};
        const url = useDefaultVideoToggle.checked ? 'assets/video/ghibli_wedding_journey.mp4' : '';
        weddingSettings.media.videoUrl = url;
        weddingSettings.media.customVideo = url;
        weddingSettings.media.useGhibliVideo = Boolean(url);
        weddingSettings.sections = weddingSettings.sections || {};
        weddingSettings.sections.showVideo = Boolean(url);
        setCheck('secShowVideo', Boolean(url));
        updatePreview(controls[0], url);
        markDirty();
        await saveSettings();
    });
}

/* ========================================================
   13. INITIALIZATION & EVENT LISTENERS
   ======================================================== */
document.addEventListener('DOMContentLoaded', async () => {
    // 0. Verify admin auth state
    await verifyAdminAuth();

    // Setup admin modal & auth listeners
    const btnAdminLogout = document.getElementById('btnAdminLogout');
    const btnCloseAdminModal = document.getElementById('btnCloseAdminLoginModal');
    const btnCancelAdminModal = document.getElementById('btnCancelAdminLogin');
    const btnSubmitAdminModal = document.getElementById('btnSubmitAdminLogin');
    const inputAdminPass = document.getElementById('adminPasswordInput');

    if (btnAdminLogout) btnAdminLogout.addEventListener('click', adminLogout);
    if (btnCloseAdminModal) btnCloseAdminModal.addEventListener('click', closeAdminLoginModal);
    if (btnCancelAdminModal) btnCancelAdminModal.addEventListener('click', closeAdminLoginModal);
    if (btnSubmitAdminModal) btnSubmitAdminModal.addEventListener('click', submitAdminLogin);
    if (inputAdminPass) {
        inputAdminPass.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') submitAdminLogin();
        });
    }

    // Check URL parameters for explicit site selection (?client=... or ?site=... or ?id=...)
    const urlParams = new URLSearchParams(window.location.search);
    const paramSite = urlParams.get('client') || urlParams.get('site') || urlParams.get('website') || urlParams.get('id');
    if (paramSite) {
        activeWebsiteId = paramSite;
    }

    // 1. Load Multi-Website Hub
    await loadWebsites();

    // 2. Load active client settings
    try {
        const res = await fetch(`/api/settings?client=${encodeURIComponent(activeWebsiteId)}`);
        if (res.ok) weddingSettings = await res.json();
    } catch(e) {}

    if (!weddingSettings || !weddingSettings.templateId) {
        try {
            const siteSettings = localStorage.getItem('wedding_settings_' + activeWebsiteId);
            if (siteSettings) {
                weddingSettings = JSON.parse(siteSettings);
            } else {
                const local = localStorage.getItem('wedding_settings');
                if (local) weddingSettings = JSON.parse(local);
            }
        } catch(e) {}
    }

    // Static fallback to websites/${activeWebsiteId}.json or settings.json
    if (!weddingSettings || !weddingSettings.general) {
        try {
            const staticRes = await fetch(`websites/${activeWebsiteId}.json?_t=` + Date.now());
            if (staticRes.ok) {
                weddingSettings = await staticRes.json();
            } else {
                const defRes = await fetch('settings.json?_t=' + Date.now());
                if (defRes.ok) {
                    const staticData = await defRes.json();
                    weddingSettings = deepMerge(staticData, weddingSettings || {});
                }
            }
        } catch(e) {}
    }

    if (!weddingSettings || !weddingSettings.templateId) {
        weddingSettings = {
            templateId: 'royal-paithani',
            activeLanguage: 'mr',
            openingStyle: 'royal-scroll'
        };
    }

    // 3. Initialize UI Tabs
    initTabs();

    // 4. Render All Dynamic Components
    renderTemplatesGrid();
    initOpeningStyles();
    renderCeremonies();
    renderStorySteps();
    renderPhotos();
    renderDressCode();
    await initRsvpManager(activeWebsiteId);
    await initWishesManager(activeWebsiteId);
    populateForm(weddingSettings);
    initMediaUploadControls();

    // 5. Connect Command Center & Action Buttons
    const saveBtn = document.getElementById('saveAllBtn');
    if (saveBtn) saveBtn.addEventListener('click', saveSettings);

    const btnCreateNew = document.getElementById('btnCreateNewWebsite');
    if (btnCreateNew) btnCreateNew.addEventListener('click', openCreateWebsiteModal);

    const btnHubCreate = document.getElementById('btnHubCreateNew');
    if (btnHubCreate) btnHubCreate.addEventListener('click', openCreateWebsiteModal);

    const btnCloseCreate = document.getElementById('btnCloseCreateWebsiteModal');
    if (btnCloseCreate) btnCloseCreate.addEventListener('click', closeCreateWebsiteModal);

    const btnCancelCreate = document.getElementById('btnCancelCreateWebsite');
    if (btnCancelCreate) btnCancelCreate.addEventListener('click', closeCreateWebsiteModal);

    const btnSubCreate = document.getElementById('btnSubmitCreateWebsite');
    if (btnSubCreate) btnSubCreate.addEventListener('click', submitCreateWebsite);

    const formCreate = document.getElementById('formCreateWebsite');
    if (formCreate) {
        formCreate.addEventListener('submit', (e) => {
            e.preventDefault();
            submitCreateWebsite();
        });
    }

    const backdropCreate = document.getElementById('createWebsiteBackdrop');
    if (backdropCreate) backdropCreate.addEventListener('click', closeCreateWebsiteModal);

    const btnDelCurrent = document.getElementById('btnDeleteCurrentWebsite');
    if (btnDelCurrent) btnDelCurrent.addEventListener('click', deleteCurrentWebsite);

    const webSelector = document.getElementById('websiteSelector');
    if (webSelector) {
        webSelector.addEventListener('change', (e) => switchWebsite(e.target.value));
    }

    // RSVP & Guest List actions
    const btnClearRsvps = document.getElementById('btnClearAllRsvps');
    if (btnClearRsvps) btnClearRsvps.addEventListener('click', clearAllRsvps);

    const btnAddRsvp = document.getElementById('btnAddAdminRsvp');
    if (btnAddRsvp) btnAddRsvp.addEventListener('click', openAddAdminRsvp);

    const btnCloseRsvpM = document.getElementById('btnCloseAdminRsvpModal');
    if (btnCloseRsvpM) btnCloseRsvpM.addEventListener('click', closeAddAdminRsvp);

    const btnCancelRsvp = document.getElementById('btnCancelAdminRsvp');
    if (btnCancelRsvp) btnCancelRsvp.addEventListener('click', closeAddAdminRsvp);

    const btnSaveRsvp = document.getElementById('btnSaveAdminRsvp');
    if (btnSaveRsvp) btnSaveRsvp.addEventListener('click', saveAdminRsvp);

    const btnExpRsvps = document.getElementById('btnExportRsvpsCsv');
    if (btnExpRsvps) btnExpRsvps.addEventListener('click', exportRsvpsCsv);

    const btnClearWishes = document.getElementById('btnClearAllWishes');
    if (btnClearWishes) btnClearWishes.addEventListener('click', clearAllWishes);

    // Launch commands
    const btnLaunch = document.getElementById('btnLaunchWebsite');
    if (btnLaunch) btnLaunch.addEventListener('click', openLaunchModal);

    const btnHubLaunch = document.getElementById('btnHubLaunchCurrent');
    if (btnHubLaunch) btnHubLaunch.addEventListener('click', openLaunchModal);

    const btnCloseLaunch = document.getElementById('btnCloseLaunchModal');
    if (btnCloseLaunch) btnCloseLaunch.addEventListener('click', closeLaunchModal);

    const btnCloseLaunchFooter = document.getElementById('btnCloseLaunchModalFooter');
    if (btnCloseLaunchFooter) btnCloseLaunchFooter.addEventListener('click', closeLaunchModal);

    // Download & Launch ZIP / HTML
    const dlZipTop = document.getElementById('btnDownloadWebsiteZipTop');
    if (dlZipTop) dlZipTop.addEventListener('click', downloadNetlifyZip);

    const dlHtmlTop = document.getElementById('btnDownloadHtmlTop');
    if (dlHtmlTop) dlHtmlTop.addEventListener('click', downloadSingleHtml);

    const btnNetlifyZip = document.getElementById('btnLaunchNetlifyZip');
    if (btnNetlifyZip) btnNetlifyZip.addEventListener('click', downloadNetlifyZip);

    const btnModalNetlify = document.getElementById('btnModalLaunchNetlify');
    if (btnModalNetlify) btnModalNetlify.addEventListener('click', downloadNetlifyZip);

    const btnFullZip = document.getElementById('btnLaunchFullZip');
    if (btnFullZip) btnFullZip.addEventListener('click', downloadNetlifyZip);

    const btnSingleHtml = document.getElementById('btnLaunchSingleHtml');
    if (btnSingleHtml) btnSingleHtml.addEventListener('click', downloadSingleHtml);

    const btnModalHtml = document.getElementById('btnModalLaunchHtml');
    if (btnModalHtml) btnModalHtml.addEventListener('click', downloadSingleHtml);

    const btnDlPanelHtml = document.getElementById('btnDownloadHtmlPanel');
    if (btnDlPanelHtml) btnDlPanelHtml.addEventListener('click', downloadSingleHtml);

    const btnDlPanelZip = document.getElementById('btnDownloadWebsiteZipPanel');
    if (btnDlPanelZip) btnDlPanelZip.addEventListener('click', downloadNetlifyZip);

    // WhatsApp copy
    const btnCopyWa = document.getElementById('btnCopyWhatsappText');
    if (btnCopyWa) btnCopyWa.addEventListener('click', copyWhatsappInvite);

    const btnModalCopyWa = document.getElementById('btnModalCopyWhatsapp');
    if (btnModalCopyWa) btnModalCopyWa.addEventListener('click', copyWhatsappInvite);

    // Responsive Preview
    const btnResp = document.getElementById('btnResponsivePreview');
    if (btnResp) btnResp.addEventListener('click', openResponsivePreview);

    const btnCloseResp = document.getElementById('btnCloseResponsiveModal');
    if (btnCloseResp) btnCloseResp.addEventListener('click', closeResponsivePreview);

    const btnRefPreview = document.getElementById('btnRefreshPreviewIframe');
    if (btnRefPreview) btnRefPreview.addEventListener('click', refreshPreviewIframe);

    document.querySelectorAll('.device-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const dev = btn.getAttribute('data-device');
            setPreviewDevice(dev);
        });
    });

    // Item CRUD Modals
    const btnAddCer = document.getElementById('btnAddCeremony');
    if (btnAddCer) btnAddCer.addEventListener('click', openAddCeremony);

    const btnCloseCer = document.getElementById('btnCloseCeremonyModal');
    if (btnCloseCer) btnCloseCer.addEventListener('click', () => document.getElementById('ceremonyModal').classList.add('hidden'));

    const btnCancelCer = document.getElementById('btnCancelCeremony');
    if (btnCancelCer) btnCancelCer.addEventListener('click', () => document.getElementById('ceremonyModal').classList.add('hidden'));

    const btnSaveCer = document.getElementById('btnSaveCeremony');
    if (btnSaveCer) btnSaveCer.addEventListener('click', saveCeremony);

    const btnAddSt = document.getElementById('btnAddStoryStep');
    if (btnAddSt) btnAddSt.addEventListener('click', openAddStory);

    const btnCloseSt = document.getElementById('btnCloseStoryModal');
    if (btnCloseSt) btnCloseSt.addEventListener('click', () => document.getElementById('storyModal').classList.add('hidden'));

    const btnCancelSt = document.getElementById('btnCancelStory');
    if (btnCancelSt) btnCancelSt.addEventListener('click', () => document.getElementById('storyModal').classList.add('hidden'));

    const btnSaveSt = document.getElementById('btnSaveStory');
    if (btnSaveSt) btnSaveSt.addEventListener('click', saveStoryStep);

    const btnAddPh = document.getElementById('btnAddGalleryPhoto');
    if (btnAddPh) btnAddPh.addEventListener('click', openAddPhoto);

    const btnClosePh = document.getElementById('btnClosePhotoModal');
    if (btnClosePh) btnClosePh.addEventListener('click', () => document.getElementById('photoModal').classList.add('hidden'));

    const btnCancelPh = document.getElementById('btnCancelPhoto');
    if (btnCancelPh) btnCancelPh.addEventListener('click', () => document.getElementById('photoModal').classList.add('hidden'));

    const btnSavePh = document.getElementById('btnSavePhoto');
    if (btnSavePh) btnSavePh.addEventListener('click', savePhoto);

    const btnAddDc = document.getElementById('btnAddDressCode');
    if (btnAddDc) btnAddDc.addEventListener('click', openAddDresscode);

    const btnCloseDc = document.getElementById('btnCloseDresscodeModal');
    if (btnCloseDc) btnCloseDc.addEventListener('click', () => document.getElementById('dresscodeModal').classList.add('hidden'));

    const btnCancelDc = document.getElementById('btnCancelDresscode');
    if (btnCancelDc) btnCancelDc.addEventListener('click', () => document.getElementById('dresscodeModal').classList.add('hidden'));

    const btnSaveDc = document.getElementById('btnSaveDresscode');
    if (btnSaveDc) btnSaveDc.addEventListener('click', saveDresscode);

    const btnRefreshWish = document.getElementById('btnRefreshWishes');
    if (btnRefreshWish) btnRefreshWish.addEventListener('click', initWishesManager);

    const btnAddTestW = document.getElementById('btnAddTestWish');
    if (btnAddTestW) {
        btnAddTestW.addEventListener('click', async () => {
            const name = prompt('पाहुण्याचे नाव प्रविष्ट करा:', 'सुनील व अनिता कुलकर्णी');
            if (!name) return;
            const message = prompt('सदिच्छा संदेश प्रविष्ट करा:', 'आदिती आणि रोहन यांना सुखमय, समृद्ध आणि आनंदी वैवाहिक आयुष्यासाठी लाख लाख शुभेच्छा!');
            if (!message) return;
            try {
                await fetch('/api/wishes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, message, city: 'पुणे', timestamp: 'आत्ताच' })
                });
                showToast('✓ सदिच्छा संदेश जोडला गेला!');
                initWishesManager();
            } catch(e) {}
        });
    }

    // Additional button handlers & utility connectors
    const btnResetDefaults = document.getElementById('resetDefaultsBtn');
    if (btnResetDefaults) {
        btnResetDefaults.addEventListener('click', () => {
            if (!confirm('तुम्हाला खरोखर सर्व सेटिंग्ज मूळ डीफॉल्ट स्थितीत पूर्ववत करायच्या आहेत का?')) return;
            localStorage.removeItem('wedding_settings');
            localStorage.removeItem('wedding_settings_' + activeWebsiteId);
            showToast('✓ मूळ सेटिंग्ज लोड केल्या जात आहेत...');
            location.reload();
        });
    }

    // Template category filters
    const tplFilterBtns = document.querySelectorAll('.tpl-filter-btn');
    tplFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tplFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.getAttribute('data-cat') || 'all';
            const cards = document.querySelectorAll('.template-card');
            cards.forEach(card => {
                const cardCat = card.getAttribute('data-category') || 'royal';
                if (cat === 'all' || cardCat === cat) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Language selector pills in admin
    document.querySelectorAll('.btn-select-lang').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-set-lang') || 'mr';
            if (weddingSettings) {
                weddingSettings.activeLanguage = lang;
                const guestLanguageOption = document.getElementById(`cfgGuestLang${lang.toUpperCase()}`);
                if (guestLanguageOption) guestLanguageOption.checked = true;
                const langSelect = document.getElementById('activeLanguage');
                if (langSelect) langSelect.value = lang;
                markDirty();
                showToast("✓ मुख्य भाषा '" + (lang === 'mr' ? 'मराठी' : lang === 'hi' ? 'हिंदी' : 'English') + "' निवडली गेली!");
            }
        });
    });

    ['cfgGuestLangMR', 'cfgGuestLangHI', 'cfgGuestLangEN'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', markDirty);
    });

    const btnSaveAudio = document.getElementById('saveAudioOnlyBtn');
    if (btnSaveAudio) {
        btnSaveAudio.addEventListener('click', () => {
            if (!weddingSettings) weddingSettings = {};
            weddingSettings.media = weddingSettings.media || {};
            const audioVal = (document.getElementById('bgMusicUrl')?.value || weddingSettings.media.backgroundAudio || weddingSettings.media.bgMusicUrl || '').trim();
            weddingSettings.media.bgMusicUrl = audioVal;
            weddingSettings.media.backgroundAudio = audioVal;
            saveSettings();
            showToast('✓ ऑडिओ सेटिंग्ज सेव्ह झाल्या!');
        });
    }

    const btnResetAudio = document.getElementById('resetAudioToDefaultBtn');
    if (btnResetAudio) {
        btnResetAudio.addEventListener('click', async () => {
            if (!weddingSettings) weddingSettings = {};
            weddingSettings.media = weddingSettings.media || {};
            const defaultAudio = 'assets/audio/marathi_wedding_shehnai.mp3';
            const audioInp = document.getElementById('bgMusicUrl');
            if (audioInp) audioInp.value = defaultAudio;
            weddingSettings.media.bgMusicUrl = defaultAudio;
            weddingSettings.media.backgroundAudio = defaultAudio;
            const preview = document.getElementById('adminAudioPreview');
            const source = preview?.querySelector('source');
            if (source) source.setAttribute('src', defaultAudio);
            else if (preview) preview.setAttribute('src', defaultAudio);
            preview?.load();
            const path = document.getElementById('activeAudioPath');
            if (path) path.textContent = defaultAudio;
            markDirty();
            await saveSettings();
            showToast('✓ ऑडिओ मूळ सनई वादनावर सेट केला!');
        });
    }

    const btnResetPhotos = document.getElementById('resetPhotosToGhibliBtn');
    if (btnResetPhotos) {
        btnResetPhotos.addEventListener('click', async () => {
            if (confirm('सर्व फोटो मूळ राजेशाही व घिबली फोटोंवर रीसेट करायचे का?')) {
                if (weddingSettings) {
                    const defaults = [
                        { id: 'gal_1', title: 'मुख्य जोडी', caption: 'नवदांपत्य', category: 'couple', src: 'assets/images/hero_couple.jpg' },
                        { id: 'gal_2', title: 'साखरपुडा', caption: 'मंगल साखरपुडा सोहळा', category: 'engagement', src: 'assets/images/sakharpuda.jpg' },
                        { id: 'gal_3', title: 'हळदीचा रंग', caption: 'सोनियाची हळद', category: 'haldi', src: 'assets/images/halad.jpg' },
                        { id: 'gal_4', title: 'सप्तपदी', caption: 'अग्नी साक्षीने पवित्र सप्तपदी', category: 'wedding', src: 'assets/images/saptapadi.jpg' },
                        { id: 'gal_5', title: 'सह्याद्री सफर', caption: 'निसर्गाच्या कुशीतील गोड क्षण', category: 'couple', src: 'assets/images/sahyadri_romance.jpg' }
                    ];
                    weddingSettings.gallery = defaults;
                    weddingSettings.media = weddingSettings.media || {};
                    ['heroImage', 'sakharpudaImage', 'haladImage', 'saptapadiImage', 'sahyadriImage'].forEach((key, index) => {
                        weddingSettings.media[key] = defaults[index].src;
                    });
                    ['previewHeroImg', 'previewSakharpudaImg', 'previewHaladImg', 'previewSaptapadiImg', 'previewSahyadriImg'].forEach((id, index) => {
                        const image = document.getElementById(id);
                        if (image) image.src = defaults[index].src;
                    });
                    renderPhotos();
                    markDirty();
                    await saveSettings();
                    showToast('✓ फोटो मूळ गॅलरीवर रीसेट केले!');
                }
            }
        });
    }

    const btnRefreshMap = document.getElementById('refreshMapPreviewBtn');
    if (btnRefreshMap) {
        btnRefreshMap.addEventListener('click', () => {
            const addr = (document.getElementById('venueAddressInput')?.value || 'माउली गार्डन, बाणेर रोड, पुणे').trim();
            const iframe = document.getElementById('mapPreviewIframe');
            if (iframe) {
                iframe.src = 'https://maps.google.com/maps?q=' + encodeURIComponent(addr) + '&t=&z=15&ie=UTF8&iwloc=&output=embed';
                showToast('✓ नकाशा प्रिव्ह्यू रीफ्रेश झाला!');
            }
        });
    }

    const btnRefreshRsvp = document.getElementById('btnRefreshRsvps');
    if (btnRefreshRsvp) {
        btnRefreshRsvp.addEventListener('click', async () => {
            await initRsvpManager();
            showToast('✓ पाहुण्यांची यादी रीफ्रेश झाली!');
        });
    }

    const btnActivatePrev = document.getElementById('btnActivateFromPreview');
    if (btnActivatePrev) {
        btnActivatePrev.addEventListener('click', () => {
            closeResponsivePreview();
            saveSettings();
            showToast('✓ बदल लागू झाले व सेव्ह झाले!');
        });
    }

    const btnClosePrevM = document.getElementById('btnClosePreviewModal');
    if (btnClosePrevM) {
        btnClosePrevM.addEventListener('click', closeResponsivePreview);
    }

    const btnOpenTabPrev = document.getElementById('btnOpenNewTabFromPreview');
    if (btnOpenTabPrev) {
        btnOpenTabPrev.addEventListener('click', (e) => {
            e.preventDefault();
            const url = (activeWebsiteId && activeWebsiteId !== 'aaditi-rohan')
                ? `index.html?site=${encodeURIComponent(activeWebsiteId)}`
                : 'index.html';
            window.open(url, '_blank');
        });
    }

    // Realtime QR update for Shagun
    const upiInp = document.getElementById('cfgUpiId');
    const nameInp = document.getElementById('cfgPayeeName');
    function updateShagunQr() {
        const id = upiInp ? upiInp.value.trim() : 'aaditi.rohan@okaxis';
        const name = nameInp ? nameInp.value.trim() : 'Aaditi & Rohan Vivah';
        const uri = 'upi://pay?pa=' + encodeURIComponent(id) + '&pn=' + encodeURIComponent(name) + '&am=1101&cu=INR&tn=' + encodeURIComponent('Wedding Shagun');
        const qrEl = document.getElementById('adminQrPreview');
        if (qrEl) {
            qrEl.src = 'https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=' + encodeURIComponent(uri);
        }
    }
    if (upiInp) upiInp.addEventListener('input', updateShagunQr);
    if (nameInp) nameInp.addEventListener('input', updateShagunQr);

    // Track input changes to mark dirty
    document.querySelectorAll('input, select, textarea').forEach(inp => {
        inp.addEventListener('input', markDirty);
        inp.addEventListener('change', markDirty);
    });
});

// Explicit Global Window Bindings for Robust Onclick Delegation
window.switchWebsite = switchWebsite;
window.deleteSpecificWebsite = deleteSpecificWebsite;
window.deleteCurrentWebsite = deleteCurrentWebsite;
window.openResponsivePreview = openResponsivePreview;
window.closeResponsivePreview = closeResponsivePreview;
window.setPreviewDevice = setPreviewDevice;
window.openCreateWebsiteModal = openCreateWebsiteModal;
window.closeCreateWebsiteModal = closeCreateWebsiteModal;
window.submitCreateWebsite = submitCreateWebsite;
window.openLaunchModal = openLaunchModal;
window.closeLaunchModal = closeLaunchModal;
window.downloadNetlifyZip = downloadNetlifyZip;
window.downloadSingleHtml = downloadSingleHtml;
window.copyWhatsappInvite = copyWhatsappInvite;
window.saveSettings = saveSettings;
window.refreshPreviewIframe = refreshPreviewIframe;
window.deleteRsvpItem = deleteRsvpItem;
window.clearAllRsvps = clearAllRsvps;
window.exportRsvpsCsv = exportRsvpsCsv;
window.openAddAdminRsvp = openAddAdminRsvp;
window.closeAddAdminRsvp = closeAddAdminRsvp;
window.saveAdminRsvp = saveAdminRsvp;
window.deleteWishItem = deleteWishItem;
window.clearAllWishes = clearAllWishes;
window.selectTemplate = selectTemplate;
