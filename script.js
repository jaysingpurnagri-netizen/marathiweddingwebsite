
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
 * Royal Indian Wedding Celebration - Interactive Client Script
 * Complete Multi-Cultural, Tri-Lingual (Marathi, Hindi, English), Audio, Video, RSVPs, Ceremonies
 */

const DEFAULT_SETTINGS_DATA = {
  "templateId": "royal-paithani",
  "activeLanguage": "mr",
  "allowGuestLanguageSwitch": true,
  "openingStyle": "envelope-wax",
  "sections": {
    "showStory": true,
    "showCeremonies": true,
    "showVideo": true,
    "showPhotos": true,
    "showSaptapadi": true,
    "showDresscode": true,
    "showAarti": true,
    "showBaraatPoll": true,
    "showShagun": true,
    "showScroll": true,
    "showRsvp": true,
    "showVenue": true,
    "showCountdown": true,
    "showPetals": true
  },
  "general": {
    "kuldaivat": "॥ शिवलक्ष्मी प्रसन्न ॥",
    "weddingTitle": "शुभ विवाह",
    "weddingShloka": "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    "brideSalutation": "चि. सौ. कां.",
    "brideName": "आदिती",
    "brideParents": "श्री. नागराज बाबुराव भोरे यांची द्वितीय कन्या",
    "brideGrandparents": "स्व. श्री. बाबुराव शिवराम भोरे यांची नात",
    "brideNativePlace": "गा. डारसुर, रा. पुणे",
    "groomSalutation": "चिरंजीव",
    "groomName": "रोहन",
    "groomParents": "श्री. दत्तात्रय नागोजी वाकोडे यांचा कनिष्ठ चिरंजीव",
    "groomGrandparents": "स्व. श्री. नागोजी सायबण्णा वाकोडे यांचा नातू",
    "groomNativePlace": "गा. सरडगी, रा. अंबरनाथ",
    "weddingDateText": "रविवार, १७ डिसेंबर २०२६",
    "weddingDateTimeISO": "2026-12-17T12:35:00+05:30",
    "weddingMuhurtText": "दुपारी १२ वा. ३५ मि. (गोरज मुहूर्त)",
    "venueName": "माउली गार्डन",
    "venueAddress": "भारत पेट्रोलियम स्टेशन समोर, बाणेर रोड, पुणे, महाराष्ट्र",
    "venuePhone": "+९१ ९८२२० १२३४५",
    "bhojanTime": "दुपारी १२:४५ ते दुपारी ३:०० वा.",
    "bhojanNote": "शुभविवाह सोहळ्यानंतर आयोजित स्नेहभोजनाचा (प्रीतीभोजनाचा) आस्वाद घ्यावा ही नम्र विनंती.",
    "swagotsuk": "समस्त भोरे व वाकोडे परिवार, आप्तेष्ट, काका, मामा, मावशी, भावंडे व स्नेही जन",
    "vinita": "आपले नम्र: समस्त भोरे परिवार व वाकोडे परिवार",
    "aherNote": "कृपया आहेर, पुष्पगुच्छ अथवा भेटवस्तू न आणता केवळ आपली मंगल उपस्थिती व शुभाशीर्वाद हीच बहुमोल भेट!",
    "googleMapsUrl": "https://maps.google.com/?q=Mauli+Garden+Baner+Road+Pune",
    "googleMapsEmbed": "https://maps.google.com/maps?q=Mauli+Garden+Baner+Road+Pune&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  "media": {
    "backgroundAudio": "assets/audio/marathi_wedding_shehnai.mp3",
    "audioAutoplay": false,
    "videoUrl": "",
    "videoTitle": "आमचा मंगल विवाह प्रवास व पूर्वझलक (Wedding Cinema Trailer)",
    "videoPoster": "assets/images/hero_couple.jpg"
  },
  "story": {
    "tag": "दोन जीवांचे मीलन / Divine Union",
    "title": "आमची रेशीमगाठ (Our Love Story)",
    "quote": "निसर्गाच्या साक्षीने, दोन हृदयांची तार जुळली आणि मैत्रीचे रूपांतर एका सुंदर, पवित्र जीवन प्रवासात झाले!",
    "steps": [
      {
        "title": "पहिली भेट व ओळख",
        "desc": "कॉलेजच्या दिवसांत निसर्गरम्य वातावरणात झालेली पहिली भेट आणि हळुवार सुरू झालेली सुंदर मैत्री."
      },
      {
        "title": "मैत्रीचे रूपांतर प्रेमात",
        "desc": "एकमेकांचे विचार, स्वप्ने आणि सुख-दुःखात सोबत लाभली आणि मैत्री प्रेमाच्या पवित्र बंधनात गुंफली गेली."
      },
      {
        "title": "कुटुंबाची संमती व साखरपुडा",
        "desc": "दोन्ही परिवारांच्या शुभाशीर्वादाने आणि आप्तेष्टांच्या उपस्थितीत संपन्न झालेला मंगल साखरपुडा सोहळा."
      }
    ]
  },
  "ceremonies": [
    {
      "id": "haldi",
      "badge": "उत्साह व परंपरा",
      "date": "रविवार, ०४ मे २०२६",
      "time": "सकाळी १०:०० वा.",
      "name": "मंगल हळदी समारंभ (Haldi Ceremony)",
      "desc": "सोनियाच्या हळदीने न्हाऊ घालू वधू-वरांना! मंगल गाणी आणि उत्साहाच्या वातावरणात होणारा हळद सोहळा.",
      "venue": "माउली हॉल, पुणे",
      "dressCode": "पिवळा किंवा केशरी पारंपारिक पोशाख",
      "icon": "fa-sun"
    },
    {
      "id": "mehendi",
      "badge": "रंग व आनंद",
      "date": "रविवार, ०४ मे २०२६",
      "time": "दुपारी ०२:०० वा.",
      "name": "मेहंदी व संगीत संध्या (Mehendi & Sangeet)",
      "desc": "हातांवर सजणारी शकुनाची लालभडक मेहंदी आणि सुरेल संगीताच्या तालावर होणारा नृत्याचा जल्लोष.",
      "venue": "माउली बॉलरूम, पुणे",
      "dressCode": "हिरवा किंवा गुलाबी उत्सव पोशाख",
      "icon": "fa-hand-sparkles"
    },
    {
      "id": "wedding",
      "badge": "मंगल मुहूर्त",
      "date": "सोमवार, ०५ मे २०२६",
      "time": "दुपारी १२:३५ वा. (गोरज मुहूर्त)",
      "name": "शुभविवाह व हस्तमिलाप (Sacred Wedding)",
      "desc": "सनईच्या मंगल सुरात, वेदोक्त मंत्रोच्चारात आणि अंतरपाटाच्या साक्षीने संपन्न होणारा मंगल परिणय सोहळा.",
      "venue": "माउली रॉयल पॅलेस, मुख्य मंडप, बाणेर, पुणे",
      "dressCode": "शाही रेशमी पारंपारिक पोशाख (Silk & Gold)",
      "icon": "fa-ring"
    },
    {
      "id": "saptapadi",
      "badge": "पवित्र सात वचने",
      "date": "सोमवार, ०५ मे २०२६",
      "time": "दुपारी ०१:१५ वा.",
      "name": "सप्तपदी व लाजा होम (Seven Sacred Vows)",
      "desc": "अग्नीच्या साक्षीने सात फेरे आणि आयुष्यभराच्या सुख-दुःखात सोबत देण्याची सात पवित्र वचने.",
      "venue": "माउली रॉयल पॅलेस, यज्ञ मंडप",
      "dressCode": "पारंपारिक वस्त्रे",
      "icon": "fa-fire"
    },
    {
      "id": "reception",
      "badge": "शाही मेजवानी",
      "date": "सोमवार, ०५ मे २०२६",
      "time": "दुपारी १२:४५ ते ०३:३० वा.",
      "name": "स्नेहभोजन व स्वागत समारंभ (Grand Reception)",
      "desc": "नुकत्याच विवाहबद्ध झालेल्या नवदाम्पत्याला शुभाशीर्वाद देण्यासाठी आयोजित स्वागत समारंभ व शाही प्रीतीभोजन.",
      "venue": "माउली बँक्वेट लॉन्स, बाणेर, पुणे",
      "dressCode": "भव्य इंडो-वेस्टर्न किंवा पारंपारिक पोशाख",
      "icon": "fa-champagne-glasses"
    }
  ],
  "gallery": [
    { "url": "assets/images/hero_couple.jpg", "caption": "नवदांपत्य - आदिती आणि रोहन", "category": "couple" },
    { "url": "assets/images/sakharpuda.jpg", "caption": "मंगल साखरपुडा सोहळा", "category": "engagement" },
    { "url": "assets/images/halad.jpg", "caption": "सोनियाची हळद", "category": "haldi" },
    { "url": "assets/images/saptapadi.jpg", "caption": "अग्नी साक्षीने पवित्र सप्तपदी", "category": "wedding" },
    { "url": "assets/images/sahyadri_romance.jpg", "caption": "निसर्गाच्या कुशीतील गोड क्षण", "category": "couple" }
  ],
  "shagun": {
    "upiId": "aditya.sadhana@okaxis",
    "payeeName": "Aditya & Sadhana Vivah",
    "note": "सस्नेह शुभाशीर्वाद व डिजिटल आहेर",
    "amounts": [501, 1101, 2101, 5101]
  },
  "dressCode": [
    { "event": "हळदी समारंभ", "attire": "पिवळा किंवा केशरी सुती/रेशमी पोशाख", "colors": ["#FFC107", "#FFA000", "#FFF9C4"], "notes": "झेंडूची फुले आणि पिवळ्या रंगाचा आनंदोत्सव" },
    { "event": "मेहंदी व संगीत", "attire": "हिरवा किंवा गुलाबी उत्सव पोशाख", "colors": ["#2E7D32", "#4CAF50", "#E91E63"], "notes": "सुरेल संगीत व नृत्याची रंगतदार रात्र" },
    { "event": "शुभविवाह सोहळा", "attire": "शाही रेशमी पारंपारिक वस्त्रे (पैठणी / शेरवानी)", "colors": ["#800020", "#D4AF37", "#B71C1C"], "notes": "वैदिक मंत्रोच्चार व अस्सल राजेशाही थाट" },
    { "event": "स्वागत समारंभ", "attire": "भव्य इंडो-वेस्टर्न किंवा पारंपारिक पोशाख", "colors": ["#0D47A1", "#C5A059", "#1A1A2E"], "notes": "नवदांपत्याला शुभाशीर्वाद व स्नेहभोजन" }
  ],
  "baraatPoll": { "groomVotes": 164, "brideVotes": 178 },
  "virtualAarti": { "diyasLit": 462 }
};

let currentSettings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS_DATA));

function setText(id, text) {
    const el = document.getElementById(id);
    if (el && text !== undefined && text !== null) {
        el.textContent = text;
    }
}

function setHtml(id, html) {
    const el = document.getElementById(id);
    if (el && html !== undefined && html !== null) {
        el.innerHTML = html;
    }
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

/* ========================================================
   1. DYNAMIC ADMIN SETTINGS SYNC
   ======================================================== */
async function loadAndApplySettings() {
    let merged = JSON.parse(JSON.stringify(DEFAULT_SETTINGS_DATA));

    if (typeof window !== 'undefined' && window.PRELOADED_WEDDING_SETTINGS) {
        merged = deepMerge(merged, window.PRELOADED_WEDDING_SETTINGS);
    }

    // 1. Detect requested client/website from multiple URL sources
    const urlParams = new URLSearchParams(window.location.search);
    let pathSlug = null;
    const pathMatch = window.location.pathname.match(/\/(c|sites)\/([^/]+)/);
    if (pathMatch) {
        pathSlug = decodeURIComponent(pathMatch[2]).toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    }

    const requestedClient = (typeof window !== 'undefined' && window.ACTIVE_CLIENT_SLUG)
        || pathSlug
        || urlParams.get('client')
        || urlParams.get('site')
        || urlParams.get('website')
        || urlParams.get('id')
        || (window.location.hash.replace(/^#/, ''))
        || 'aaditi-rohan';

    window.ACTIVE_CLIENT_SLUG = requestedClient;

    let siteLoaded = false;
    if (requestedClient) {
        // Try loading from multi-tenant API
        try {
            const resApi = await fetch(`/api/settings?client=${encodeURIComponent(requestedClient)}&_t=` + Date.now());
            if (resApi.ok) {
                const apiData = await resApi.json();
                if (apiData && Object.keys(apiData).length > 0) {
                    merged = deepMerge(merged, apiData);
                    siteLoaded = true;
                }
            }
        } catch(e) {}

        // Try loading websites/<requestedClient>.json
        if (!siteLoaded) {
            try {
                const resSite = await fetch(`websites/${requestedClient}.json?_t=` + Date.now());
                if (resSite.ok) {
                    const siteData = await resSite.json();
                    merged = deepMerge(merged, siteData);
                    siteLoaded = true;
                }
            } catch(e) {}
        }

        // Try client-specific localStorage
        if (!siteLoaded) {
            try {
                const localSite = localStorage.getItem('wedding_settings_' + requestedClient);
                if (localSite) {
                    const parsedSite = JSON.parse(localSite);
                    if (parsedSite && typeof parsedSite === 'object') {
                        merged = deepMerge(merged, parsedSite);
                        siteLoaded = true;
                    }
                }
            } catch(e) {}
        }
    }

    if (!siteLoaded) {
        // Fallback: Default settings.json
        try {
            const resStatic = await fetch('settings.json?_t=' + Date.now());
            if (resStatic.ok) {
                const staticData = await resStatic.json();
                merged = deepMerge(merged, staticData);
            }
        } catch(e) {}

        try {
            const local = localStorage.getItem('wedding_settings');
            if (local) {
                const parsed = JSON.parse(local);
                if (parsed && typeof parsed === 'object') {
                    merged = deepMerge(merged, parsed);
                }
            }
        } catch(err){}
    }

    currentSettings = merged;
    applySettingsToDOM(currentSettings);
}

function toPublicAssetUrl(path) {
    if (!path) return '';
    if (/^(?:[a-z]+:|\/)/i.test(path)) return path;
    return `/${path.replace(/^\.\//, '')}`;
}

function applySettingsToDOM(s) {
    window.currentSettings = s;
    if (window.IndianCultureEngine && typeof window.IndianCultureEngine.update === 'function') {
        window.IndianCultureEngine.update(s);
    }

    applySectionsVisibility(s.sections || {}, s);

    const urlParams = new URLSearchParams(window.location.search);
    const themeFromUrl = urlParams.get('theme') || urlParams.get('previewTheme');
    const activeTheme = themeFromUrl || s.templateId || 'royal-rajputana';
    document.body.setAttribute('data-theme', activeTheme);

    const g = s.general || {};
    const m = s.media || {};
    const st = s.story || {};

    // Header & Hero
    const brideName = g.brideName || 'आदिती';
    const groomName = g.groomName || 'रोहन';
    const brideSal = g.brideSalutation || 'चि. सौ. कां.';
    const groomSal = g.groomSalutation || 'चि.';
    setText('headerLogoText', `${groomSal} ${groomName} & ${brideSal} ${brideName}`);
    setText('dynWeddingTitle', g.weddingTitle || 'शुभ विवाह');
    setText('dynWeddingShloka', g.weddingShloka || 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥');
    setText('dynKuldaivat', g.kuldaivat || '॥ शिवलक्ष्मी प्रसन्न ॥');

    // Couple Details
    setText('dynBrideSalut', g.brideSalutation || 'चि. सौ. कां.');
    setText('dynBrideName', g.brideName || 'आदिती');
    setText('dynBrideGrandparents', g.brideGrandparents || 'स्व. श्री. बाबुराव शिवराम भोरे यांची नात');
    setText('dynBrideParents', g.brideParents || 'श्री. नागराज बाबुराव भोरे यांची द्वितीय कन्या');
    setText('dynBrideNative', g.brideNativePlace ? `📍 ${g.brideNativePlace}` : '📍 गा. डारसुर, रा. पुणे');

    setText('dynGroomSalut', g.groomSalutation || 'चिरंजीव');
    setText('dynGroomName', g.groomName || 'रोहन');
    setText('dynGroomGrandparents', g.groomGrandparents || 'स्व. श्री. नागोजी सायबण्णा वाकोडे यांचा नातू');
    setText('dynGroomParents', g.groomParents || 'श्री. दत्तात्रय नागोजी वाकोडे यांचा कनिष्ठ चिरंजीव');
    setText('dynGroomNative', g.groomNativePlace ? `📍 ${g.groomNativePlace}` : '📍 गा. सरडगी, रा. अंबरनाथ');

    // Entrance Gate Cards
    setText('gateCardCouple', `चि. सौ. कां. ${g.brideName || 'आदिती'} ❤️ चि. ${g.groomName || 'रोहन'}`);
    setText('gateCardShloka', g.weddingShloka || '॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ॥');
    setText('gateCardDate', `${g.weddingDateText || 'रविवार, १७ डिसेंबर २०२६'} • ${g.weddingMuhurtText || 'दु. १२:३५ वा.'}`);

    // Date, Muhurt & Venue
    setText('dynWeddingDateText', g.weddingDateText || 'रविवार, १७ डिसेंबर २०२६');
    setText('dynWeddingMuhurt', g.weddingMuhurtText || 'दुपारी १२ वा. ३५ मि. (गोरज मुहूर्त)');
    setText('dynVenueName', `${g.venueName || 'माउली गार्डन'}`);
    setText('dynVenueCardName', g.venueName || 'माउली गार्डन');
    setText('dynVenueAddress', g.venueAddress || 'भारत पेट्रोलियम स्टेशन समोर, बाणेर रोड, पुणे, महाराष्ट्र');
    setText('dynVenuePhone', g.venuePhone || '+९१ ९८२२० १२३४५');
    setText('dynBhojanTime', g.bhojanTime || 'दुपारी १२:४५ ते दुपारी ३:०० वा.');

    const mapBtn = document.getElementById('dynGoogleMapsBtn');
    if (mapBtn && g.googleMapsUrl) mapBtn.href = g.googleMapsUrl;
    const mapIframe = document.getElementById('dynGoogleMapsIframe');
    if (mapIframe && g.googleMapsEmbed) mapIframe.src = g.googleMapsEmbed;

    // Scroll details
    setText('dynScrollKuldaivat', g.kuldaivat || '॥ शिवलक्ष्मी प्रसन्न ॥');
    setText('dynScrollShloka', g.weddingShloka || 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥');
    setText('dynScrollBrideSalut', g.brideSalutation || 'चि. सौ. कां.');
    setText('dynScrollBrideName', g.brideName || 'आदिती');
    setText('dynScrollBrideParents', g.brideParents || 'श्री. नागराज बाबुराव भोरे यांची द्वितीय कन्या');
    setText('dynScrollGroomSalut', g.groomSalutation || 'चिरंजीव');
    setText('dynScrollGroomName', g.groomName || 'रोहन');
    setText('dynScrollGroomParents', g.groomParents || 'श्री. दत्तात्रय नागोजी वाकोडे यांचा कनिष्ठ चिरंजीव');
    setText('dynScrollDate', g.weddingDateText || 'रविवार, १७ डिसेंबर २०२६');
    setText('dynScrollMuhurt', g.weddingMuhurtText || 'दुपारी १२:३५ वा. (गोरज मुहूर्त)');
    setText('dynScrollVenue', g.venueName || 'माउली गार्डन, बाणेर रोड, पुणे');
    if (g.aherNote) setText('dynScrollAherNote', g.aherNote);

    // Media
    const audio = document.getElementById('weddingAudio');
    const audioSrc = document.getElementById('audioSource');
    const musicButton = document.getElementById('toggleMusicBtn');
    const audioUrl = Object.prototype.hasOwnProperty.call(m, 'backgroundAudio') ? m.backgroundAudio : (m.bgMusicUrl || m.customAudio || '');
    if (audio && audioSrc) {
        if (audioUrl) {
            const publicAudioUrl = toPublicAssetUrl(audioUrl);
            if (audioSrc.getAttribute('src') !== publicAudioUrl) {
                audioSrc.setAttribute('src', publicAudioUrl);
                audio.load();
            }
            if (musicButton) musicButton.hidden = false;
        } else {
            audio.pause();
            audioSrc.removeAttribute('src');
            audio.load();
            musicButton?.classList.remove('active');
            if (musicButton) musicButton.hidden = true;
        }
    }

    const video = document.getElementById('weddingVideo');
    const videoSection = document.getElementById('video');
    const videoNavLink = document.querySelector('#navMenu a[href="#video"]');
    const videoNavItem = document.getElementById('videoNavItem') || videoNavLink?.closest('li');
    const videoSource = video?.querySelector('source');
    const videoUrl = String(m.videoUrl || m.customVideo || '').trim();
    const videoConfigured = s.sections?.showVideo !== false && Boolean(videoUrl);
    const setVideoVisible = (visible) => {
        if (videoSection) {
            videoSection.hidden = !visible;
            videoSection.style.display = visible ? '' : 'none';
        }
        if (videoNavItem) videoNavItem.hidden = !visible;
        if (videoNavLink) (videoNavLink.closest('li') || videoNavLink).style.display = visible ? '' : 'none';
        const watchButton = document.getElementById('heroWatchVideoBtn');
        if (watchButton) watchButton.hidden = !visible;
    };

    // Keep video controls hidden until the browser confirms the selected file exists.
    setVideoVisible(false);
    if (video && videoSource && videoConfigured) {
        const publicVideoUrl = toPublicAssetUrl(videoUrl);
        const showLoadedVideo = () => setVideoVisible(true);
        const hideMissingVideo = () => setVideoVisible(false);
        video.addEventListener('loadedmetadata', showLoadedVideo, { once: true });
        video.addEventListener('error', hideMissingVideo, { once: true });
        if (videoSource.getAttribute('src') !== publicVideoUrl) {
            videoSource.setAttribute('src', publicVideoUrl);
            video.load();
        }
        if (m.videoPoster) video.poster = toPublicAssetUrl(m.videoPoster);
        else video.removeAttribute('poster');
        if (video.readyState >= 1) showLoadedVideo();
    } else if (video) {
        video.pause();
        videoSource?.removeAttribute('src');
        video.removeAttribute('src');
        video.load();
    }
    if (m.videoTitle) setText('dynVideoTitle', m.videoTitle);

    const storyImage = document.getElementById('dynStoryImg');
    const storyImageUrl = m.sahyadriImage || m.heroImage;
    if (storyImage && storyImageUrl) storyImage.src = toPublicAssetUrl(storyImageUrl);

    // Love Story
    if (st.tag) setText('dynStoryTag', st.tag);
    if (st.title) setText('dynStoryTitle', st.title);
    if (st.quote) setText('dynStoryQuote', st.quote);
    if (st.steps && Array.isArray(st.steps)) {
        renderStoryTimeline(st.steps);
    }

    // Ceremonies
    if (s.ceremonies && Array.isArray(s.ceremonies)) {
        renderCeremonies(s.ceremonies);
    }

    // Gallery
    const galleryItems = Array.isArray(s.gallery) ? s.gallery : s.photos;
    if (Array.isArray(galleryItems)) {
        renderGallery(galleryItems);
    }

    // Shagun
    const shagun = s.shagun || {};
    if (shagun.payeeName) setText('dynPayeeName', shagun.payeeName);
    if (shagun.upiId) setText('dynUpiId', shagun.upiId);
    if (shagun.note) setText('dynShagunNote', shagun.note);

    document.dispatchEvent(new Event('wedding-settings-applied'));
}

function applySectionsVisibility(sections, settings = {}) {
    const mapping = {
        showStory: '#story',
        showCeremonies: '#ceremonies',
        showVideo: '#video',
        showPhotos: '#gallery',
        showSaptapadi: '#saptapadi',
        showDresscode: '#dresscode',
        showAarti: '#aarti',
        showBaraatPoll: '#baraat-battle',
        showShagun: '#shagun',
        showRsvp: '#rsvp',
        showVenue: '#venue',
        showCountdown: '#countdownTimer',
        showPetals: '#petalsCanvas'
    };

    const galleryItems = Array.isArray(settings.gallery) ? settings.gallery : settings.photos;
    const availability = {
        showStory: !Array.isArray(settings.story?.steps) || settings.story.steps.length > 0 || Boolean(settings.story?.quote),
        showCeremonies: !Array.isArray(settings.ceremonies) || settings.ceremonies.length > 0,
        showPhotos: !Array.isArray(galleryItems) || galleryItems.length > 0,
        showVideo: Boolean(String(settings.media?.videoUrl || settings.media?.customVideo || '').trim()),
        showShagun: settings.shagun?.enabled !== false && Boolean(settings.shagun?.upiId && settings.shagun?.payeeName)
    };

    Object.keys(mapping).forEach(key => {
        const sel = mapping[key];
        const isVisible = sections[key] !== false && availability[key] !== false;
        const el = document.querySelector(sel);
        if (el) {
            el.style.display = isVisible ? '' : 'none';
        }
        // Nav link
        const navLink = document.querySelector(`#navMenu a[href="${sel}"]`);
        if (navLink) {
            const li = navLink.closest('li') || navLink;
            li.style.display = isVisible ? '' : 'none';
        }
    });

    const scrollButton = document.getElementById('heroOpenScrollBtn');
    const showScroll = sections.showScroll !== false;
    if (scrollButton) scrollButton.hidden = !showScroll;
    if (!showScroll) document.getElementById('scrollSection')?.classList.add('hidden');

    const floatingRsvpButton = document.getElementById('floatingRsvpBtn');
    if (floatingRsvpButton) floatingRsvpButton.hidden = sections.showRsvp === false;
}

function renderStoryTimeline(steps) {
    const container = document.getElementById('dynStoryTimeline');
    if (!container) return;
    container.innerHTML = '';
    steps.forEach((step, idx) => {
        const div = document.createElement('div');
        div.className = 'timeline-step';
        div.innerHTML = `
            <div class="step-num">${idx + 1}</div>
            <div class="step-content">
                <h4>${escapeHTML(step.title)}</h4>
                <p>${escapeHTML(step.desc)}</p>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderCeremonies(ceremonies) {
    const grid = document.getElementById('dynCeremoniesGrid');
    if (!grid) return;
    grid.innerHTML = '';
    ceremonies.forEach(c => {
        const card = document.createElement('div');
        card.className = 'ceremony-card';
        card.innerHTML = `
            <div class="ceremony-badge">${escapeHTML(c.badge || 'कार्यक्रम')}</div>
            <div class="ceremony-icon"><i class="fa-solid ${c.icon || 'fa-calendar-check'}"></i></div>
            <h3 class="ceremony-name">${escapeHTML(c.name)}</h3>
            <div class="ceremony-meta">
                <p><i class="fa-regular fa-calendar"></i> <strong>${escapeHTML(c.date)}</strong></p>
                <p><i class="fa-regular fa-clock"></i> ${escapeHTML(c.time)}</p>
                <p><i class="fa-solid fa-location-dot"></i> ${escapeHTML(c.venue)}</p>
            </div>
            <p class="ceremony-desc">${escapeHTML(c.desc)}</p>
            ${c.dressCode ? `<div class="ceremony-dress"><i class="fa-solid fa-shirt"></i> पोशाख: <strong>${escapeHTML(c.dressCode)}</strong></div>` : ''}
        `;
        grid.appendChild(card);
    });
}

function renderGallery(photos) {
    const grid = document.getElementById('dynGalleryGrid');
    if (!grid) return;
    grid.innerHTML = '';
    photos.forEach(p => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        const categoryAliases = { sakharpuda: 'engagement', halad: 'haldi', saptapadi: 'wedding', vivah: 'wedding', sahyadri: 'couple' };
        const rawCategory = String(p.category || 'all').toLowerCase();
        item.setAttribute('data-category', categoryAliases[rawCategory] || rawCategory);
        const photoUrl = escapeHTML(toPublicAssetUrl(p.url || p.src || p.image || ''));
        item.innerHTML = `
            <img src="${photoUrl}" alt="${escapeHTML(p.caption || 'Wedding Photo')}" loading="lazy">
            <div class="gallery-overlay">
                <span>${escapeHTML(p.caption || '')}</span>
            </div>
        `;
        grid.appendChild(item);
    });
}

/* ========================================================
   2. COUNTDOWN TIMER
   ======================================================== */
function initCountdown() {
    function update() {
        const targetISO = currentSettings?.general?.weddingDateTimeISO || '2026-12-17T12:35:00+05:30';
        const target = new Date(targetISO).getTime();
        const now = new Date().getTime();
        const diff = target - now;

        if (diff > 0) {
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            setText('days', String(d).padStart(2, '0'));
            setText('hours', String(h).padStart(2, '0'));
            setText('minutes', String(m).padStart(2, '0'));
            setText('seconds', String(s).padStart(2, '0'));
        } else {
            setText('days', '००');
            setText('hours', '००');
            setText('minutes', '००');
            setText('seconds', '००');
        }
    }
    update();
    setInterval(update, 1000);
}

/* ========================================================
   3. AUDIO TOGGLE & CONTROLLER
   ======================================================== */
function initAudio() {
    const audio = document.getElementById('weddingAudio');
    const toggleBtn = document.getElementById('toggleMusicBtn');
    const video = document.getElementById('weddingVideo');
    if (!audio) return;

    let resumeAudioAfterVideo = false;
    if (video) {
        video.addEventListener('play', () => {
            resumeAudioAfterVideo = !audio.paused;
            audio.pause();
            toggleBtn?.classList.remove('active');
        });
        video.addEventListener('ended', () => {
            if (resumeAudioAfterVideo) {
                audio.play().then(() => toggleBtn?.classList.add('active')).catch(() => {});
            }
            resumeAudioAfterVideo = false;
        });
        audio.addEventListener('play', () => {
            if (video && !video.paused) video.pause();
        });
    }

    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => {
                toggleBtn.classList.add('active');
            }).catch(() => {});
        } else {
            audio.pause();
            toggleBtn.classList.remove('active');
        }
    });
}

/* ========================================================
   4. ROYAL SCROLL MODAL
   ======================================================== */
function initScrollModal() {
    const scrollModal = document.getElementById('scrollSection');
    const openBtn = document.getElementById('heroOpenScrollBtn');
    const closeBtn = document.getElementById('btnCloseScroll');
    const backdrop = document.getElementById('scrollBackdrop');
    const enterBtn = document.getElementById('btnEnterWebsite');

    function openScroll() {
        if (scrollModal && window.currentSettings?.sections?.showScroll !== false) {
            scrollModal.classList.remove('hidden');
        }
    }
    function closeScroll() {
        if (scrollModal) scrollModal.classList.add('hidden');
    }

    if (openBtn) openBtn.addEventListener('click', openScroll);
    if (closeBtn) closeBtn.addEventListener('click', closeScroll);
    if (backdrop) backdrop.addEventListener('click', closeScroll);
    if (enterBtn) enterBtn.addEventListener('click', closeScroll);
}

/* ========================================================
   5. RSVP FORM SUBMISSION
   ======================================================== */
function initRSVP() {
    const form = document.getElementById('rsvpForm');
    const statusAlert = document.getElementById('rsvpStatusAlert');
    if (!form) return;

    const activeSite = (typeof window !== 'undefined' && window.ACTIVE_CLIENT_SLUG)
        || new URLSearchParams(window.location.search).get('client')
        || new URLSearchParams(window.location.search).get('site')
        || localStorage.getItem('wedding_active_slug')
        || 'aaditi-rohan';
    const wishesList = document.getElementById('guestWishesList');

    const renderGuestWishes = (items) => {
        if (!wishesList) return;
        wishesList.replaceChildren();
        const messages = (Array.isArray(items) ? items : [])
            .filter(item => typeof item?.message === 'string' && item.message.trim())
            .slice(0, 12);
        if (!messages.length) {
            const empty = document.createElement('p');
            empty.className = 'guest-wishes-empty';
            empty.textContent = 'अजून संदेश आलेले नाहीत. तुमचा संदेश पहिला असू शकतो!';
            wishesList.appendChild(empty);
            return;
        }
        messages.forEach(item => {
            const card = document.createElement('article');
            card.className = 'guest-wish-card';
            const message = document.createElement('p');
            message.textContent = item.message;
            card.appendChild(message);
            wishesList.appendChild(card);
        });
    };

    const loadGuestWishes = async () => {
        try {
            const response = await fetch(`/api/wishes/public?client=${encodeURIComponent(activeSite)}`);
            if (response.ok) {
                renderGuestWishes(await response.json());
                return;
            }
        } catch (error) {}
        try {
            renderGuestWishes(JSON.parse(localStorage.getItem('wedding_wishes_' + activeSite) || '[]'));
        } catch (error) {
            renderGuestWishes([]);
        }
    };

    loadGuestWishes();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = (document.getElementById('rsvpName') || document.getElementById('guestName'))?.value.trim();
        const phone = document.getElementById('rsvpPhone')?.value.trim();
        const guests = document.getElementById('rsvpGuests')?.value;
        const attending = document.getElementById('rsvpAttendance')?.value;
        const wishes = (document.getElementById('rsvpWishes') || document.getElementById('guestBlessing'))?.value.trim();

        const events = Array.from(form.querySelectorAll('input[name="events"]:checked')).map(cb => cb.value);

        const rsvpData = {
            id: 'rsvp_' + Date.now(),
            client: activeSite,
            site: activeSite,
            name, phone, guests, attending, events, wishes,
            timestamp: new Date().toISOString()
        };

        // Site-specific RSVP persistence
        try {
            const siteRsvps = JSON.parse(localStorage.getItem('wedding_rsvps_' + activeSite) || '[]');
            siteRsvps.unshift(rsvpData);
            localStorage.setItem('wedding_rsvps_' + activeSite, JSON.stringify(siteRsvps));
            localStorage.setItem('wedding_rsvps', JSON.stringify(siteRsvps));
        } catch(e) {}

        // If guest left a blessing / wish, also persist to client wishes wall
        if (wishes) {
            const wishItem = {
                id: 'wish_' + Date.now(),
                client: activeSite,
                site: activeSite,
                name: name || 'स्नेही पाहुणे',
                message: wishes,
                city: 'पुणे',
                timestamp: 'आत्ताच'
            };
            try {
                const existingWishes = JSON.parse(localStorage.getItem('wedding_wishes_' + activeSite) || '[]');
                existingWishes.unshift(wishItem);
                localStorage.setItem('wedding_wishes_' + activeSite, JSON.stringify(existingWishes));
            } catch(e) {}
        }

        // Attempt server sync
        let serverSaved = false;
        try {
            const response = await fetch('/api/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rsvpData)
            });
            serverSaved = response.ok;
        } catch(e) {}

        await loadGuestWishes();

        if (statusAlert) {
            statusAlert.className = `status-alert ${serverSaved ? 'success' : 'error'}`;
            statusAlert.textContent = serverSaved
                ? '✓ धन्यवाद! आपली उपस्थिती आणि संदेश नोंदवला गेला आहे.'
                : 'संदेश या उपकरणावर जतन झाला, पण सर्व्हरशी संपर्क झाला नाही. कृपया पुन्हा प्रयत्न करा.';
            statusAlert.classList.remove('hidden');
            setTimeout(() => { statusAlert.classList.add('hidden'); }, 7000);
        }

        form.reset();
    });
}

/* ========================================================
   6. CALENDAR & UTILITIES
   ======================================================== */
function initCalendar() {
    const calBtns = [document.getElementById('btnAddToCalendar'), document.getElementById('addToCalendarBtn')];
    calBtns.forEach(btn => {
        if (!btn) return;
        btn.addEventListener('click', () => {
            const title = encodeURIComponent(`शुभ विवाह: ${currentSettings?.general?.brideName || 'आदिती'} & ${currentSettings?.general?.groomName || 'रोहन'}`);
            const loc = encodeURIComponent(currentSettings?.general?.venueAddress || 'माउली गार्डन, बाणेर रोड, पुणे');
            const details = encodeURIComponent(`${currentSettings?.general?.weddingTitle || 'शुभ विवाह सोहळा'} - ${currentSettings?.general?.weddingMuhurtText || 'गोरज मुहूर्त'}`);
            
            const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261217T070500Z/20261217T120000Z&details=${details}&location=${loc}`;
            window.open(gCalUrl, '_blank');
        });
    });

    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    if (mobileBtn && mainNav) {
        mobileBtn.addEventListener('click', () => {
            mainNav.classList.toggle('open');
        });
    }
}

/* ========================================================
   7. STUDIO GHIBLI PARTICLES ENGINE (Petals & Fireflies)
   ======================================================== */
function initGhibliParticles() {
    const canvas = document.getElementById('petalsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const petalColors = [
        'rgba(255, 183, 197, 0.75)', // Soft cherry blossom pink
        'rgba(255, 218, 185, 0.70)', // Peach blossom
        'rgba(254, 237, 190, 0.75)', // Marigold petal cream
        'rgba(255, 209, 220, 0.80)', // Pastel rose
        'rgba(255, 240, 245, 0.65)'  // White lavender petal
    ];

    const particles = [];
    const NUM_PETALS = Math.min(35, Math.floor(width / 35));
    const NUM_FIREFLIES = Math.min(22, Math.floor(width / 50));

    // Petals
    for (let i = 0; i < NUM_PETALS; i++) {
        particles.push({
            type: 'petal',
            x: Math.random() * width,
            y: Math.random() * height,
            size: 8 + Math.random() * 9,
            speedY: 0.8 + Math.random() * 1.4,
            speedX: 0.3 + Math.random() * 0.8,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 1.8,
            color: petalColors[Math.floor(Math.random() * petalColors.length)],
            swing: Math.random() * Math.PI * 2,
            swingSpeed: 0.02 + Math.random() * 0.03
        });
    }

    // Glowing Golden Fireflies (Ghibli Magic)
    for (let i = 0; i < NUM_FIREFLIES; i++) {
        particles.push({
            type: 'firefly',
            x: Math.random() * width,
            y: Math.random() * height,
            size: 1.8 + Math.random() * 2.5,
            speedY: -0.3 - Math.random() * 0.6,
            speedX: (Math.random() - 0.5) * 0.7,
            alpha: 0.2 + Math.random() * 0.8,
            alphaSpeed: 0.02 + Math.random() * 0.03,
            glow: 6 + Math.random() * 8
        });
    }

    function drawPetal(p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, 0, p.size / 2, p.size);
        ctx.bezierCurveTo(0, p.size / 2, -p.size / 4, 0, 0, 0);
        ctx.fill();
        ctx.restore();
    }

    function drawFirefly(f) {
        ctx.save();
        ctx.beginPath();
        const rad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.glow);
        rad.addColorStop(0, `rgba(255, 245, 180, ${f.alpha})`);
        rad.addColorStop(0.4, `rgba(255, 215, 0, ${f.alpha * 0.6})`);
        rad.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = rad;
        ctx.arc(f.x, f.y, f.glow, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, f.alpha + 0.2)})`;
        ctx.arc(f.x, f.y, f.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    let animFrameId;
    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            if (p.type === 'petal') {
                p.swing += p.swingSpeed;
                p.x += Math.sin(p.swing) * 0.8 + p.speedX;
                p.y += p.speedY;
                p.rotation += p.rotSpeed;

                if (p.y > height + 20) {
                    p.y = -20;
                    p.x = Math.random() * width;
                }
                if (p.x > width + 20) p.x = -20;

                drawPetal(p);
            } else if (p.type === 'firefly') {
                p.y += p.speedY;
                p.x += p.speedX;
                p.alpha += Math.sin(Date.now() * 0.003 + p.x) * 0.015;
                p.alpha = Math.max(0.15, Math.min(0.95, p.alpha));

                if (p.y < -20) {
                    p.y = height + 20;
                    p.x = Math.random() * width;
                }
                if (p.x < -20) p.x = width + 20;
                if (p.x > width + 20) p.x = -20;

                drawFirefly(p);
            }
        });

        animFrameId = requestAnimationFrame(animate);
    }

    animate();
}

/* ========================================================
   8. INITIALIZATION
   ======================================================== */
function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter') || 'all';
            const items = document.querySelectorAll('#dynGalleryGrid .gallery-item');
            items.forEach(item => {
                const cat = item.getAttribute('data-category') || 'all';
                if (filter === 'all' || cat === filter) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

function initFlowerShower() {
    const btnShower = document.getElementById('btnShowerFlowers');
    if (btnShower) {
        btnShower.addEventListener('click', () => {
            if (window.IndianCultureEngine?.SoundFX?.flowerTwinkle) {
                window.IndianCultureEngine.SoundFX.flowerTwinkle();
            }
            triggerFlowerShowerBurst();
        });
    }
}

function triggerFlowerShowerBurst() {
    const container = document.body;
    const colors = ['#FF69B4', '#FFD700', '#FF4500', '#FFA07A', '#FFB6C1', '#FFF0F5'];
    for (let i = 0; i < 45; i++) {
        const petal = document.createElement('div');
        petal.className = 'burst-petal';
        petal.style.position = 'fixed';
        petal.style.top = '-20px';
        petal.style.left = Math.random() * window.innerWidth + 'px';
        petal.style.width = (10 + Math.random() * 12) + 'px';
        petal.style.height = (14 + Math.random() * 14) + 'px';
        petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        petal.style.borderRadius = '50% 0 50% 50%';
        petal.style.opacity = '0.9';
        petal.style.pointerEvents = 'none';
        petal.style.zIndex = '99999';
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;
        petal.style.transition = `top ${2 + Math.random() * 2}s cubic-bezier(0.25, 1, 0.5, 1), transform 3s ease, opacity 3s ease`;

        container.appendChild(petal);

        setTimeout(() => {
            petal.style.top = (window.innerHeight + 50) + 'px';
            petal.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 80 - 40}px)`;
            petal.style.opacity = '0';
        }, 30);

        setTimeout(() => {
            if (petal.parentNode) petal.parentNode.removeChild(petal);
        }, 3500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadAndApplySettings();
    initCountdown();
    initAudio();
    initScrollModal();
    initRSVP();
    initCalendar();
    initGhibliParticles();
    initGalleryFilters();
    initFlowerShower();
});

// Storage sync across tabs
window.addEventListener('storage', (e) => {
    if (e.key === 'wedding_settings' && e.newValue) {
        try {
            const updated = JSON.parse(e.newValue);
            currentSettings = deepMerge(currentSettings, updated);
            applySettingsToDOM(currentSettings);
        } catch(err){}
    }
});
