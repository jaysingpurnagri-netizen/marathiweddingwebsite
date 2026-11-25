/**
 * language_engine.js
 * Multi-Language Engine supporting:
 * - Marathi (मराठी)
 * - Hindi (हिंदी)
 * - English
 * Controlled by Admin in Admin Dashboard, with optional guest switcher on website.
 */

(function() {
    'use strict';

    let currentLang = 'mr';

    function getLanguageSettings() {
        return window.currentSettings || window.PRELOADED_WEDDING_SETTINGS || {};
    }

    function getAllowedLanguages() {
        const settings = getLanguageSettings();
        const primary = ['mr', 'hi', 'en'].includes(settings.activeLanguage) ? settings.activeLanguage : 'mr';
        if (settings.allowGuestLanguageSwitch === false) return [primary];
        const configured = Array.isArray(settings.guestLanguages) ? settings.guestLanguages : [primary];
        const allowed = [...new Set(configured.filter(code => ['mr', 'hi', 'en'].includes(code)))];
        if (!allowed.includes(primary)) allowed.unshift(primary);
        return allowed;
    }

    function syncGuestLanguageButtons() {
        const allowed = getAllowedLanguages();
        document.querySelectorAll('.lang-btn[data-lang]').forEach(btn => {
            btn.hidden = !allowed.includes(btn.getAttribute('data-lang'));
        });
        const pill = document.getElementById('headerLangPill');
        if (pill) pill.hidden = allowed.length < 2;
    }

    function getActiveLanguage() {
        const allowed = getAllowedLanguages();
        // 1. URL parameter (?lang=mr|hi|en)
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && allowed.includes(urlLang)) {
            return urlLang;
        }

        // 2. User guest choice in localStorage
        const storedUserLang = localStorage.getItem('userLanguage');
        if (storedUserLang && allowed.includes(storedUserLang)) {
            return storedUserLang;
        }

        // 3. Admin setting from window.currentSettings or window.PRELOADED_WEDDING_SETTINGS
        const s = getLanguageSettings();
        if (s && allowed.includes(s.activeLanguage)) {
            return s.activeLanguage;
        }

        return 'mr'; // default Marathi
    }

    function applyLanguage(langCode) {
        if (!getAllowedLanguages().includes(langCode)) langCode = getAllowedLanguages()[0] || 'mr';
        if (!window.I18N_TRANSLATIONS || !window.I18N_TRANSLATIONS[langCode]) {
            langCode = 'mr';
        }
        currentLang = langCode;
        localStorage.setItem('userLanguage', langCode);
        document.documentElement.setAttribute('lang', langCode);

        const t = window.I18N_TRANSLATIONS[langCode];

        // 1. Top Announcement Bar
        const topAnnounce = document.querySelector('.top-announcement');
        if (topAnnounce && t.topBarShloka) {
            topAnnounce.innerHTML = t.topBarShloka;
        }

        // 2. Navigation Menu Links
        const navMap = {
            '#hero': t.nav.home,
            '#story': t.nav.story,
            '#ceremonies': t.nav.ceremonies,
            '#ghibli-video': t.nav.video,
            '#gallery': t.nav.gallery,
            '#saptapadi': t.nav.saptapadi,
            '#dresscode': t.nav.dresscode,
            '#shagun': t.nav.shagun,
            '#aarti': t.nav.aarti,
            '#rsvp': t.nav.rsvp,
            '#venue': t.nav.venue
        };
        document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (navMap[href]) {
                link.innerHTML = navMap[href];
            }
        });

        // 3. Header Action Buttons
        const reopenBtn = document.getElementById('reopenGateBtn');
        if (reopenBtn && t.headerActions.openStyles) {
            reopenBtn.innerHTML = `<span class="btn-text">${t.headerActions.openStyles}</span>`;
        }
        const quickThemesBtn = document.getElementById('quickThemesBtn');
        if (quickThemesBtn && t.headerActions.themes) {
            quickThemesBtn.innerHTML = `<span class="btn-text">${t.headerActions.themes}</span>`;
        }
        const musicBtnText = document.getElementById('headerMusicText');
        if (musicBtnText && t.headerActions.musicText) {
            musicBtnText.textContent = t.headerActions.musicText;
        }
        const floatingRsvpText = document.querySelector('#floatingRsvpBtn span');
        if (floatingRsvpText && t.rsvp.quickAction) {
            floatingRsvpText.textContent = t.rsvp.quickAction;
        }

        const rsvpAttendanceLabel = document.getElementById('rsvpAttendanceLabel');
        if (rsvpAttendanceLabel && t.rsvp.attendanceQuestion) {
            rsvpAttendanceLabel.innerHTML = `<i class="fa-solid fa-calendar-check"></i> ${t.rsvp.attendanceQuestion}`;
        }
        const rsvpYesOption = document.getElementById('rsvpAttendingYes');
        if (rsvpYesOption && t.rsvp.attendingYes) rsvpYesOption.textContent = t.rsvp.attendingYes;
        const rsvpNoOption = document.getElementById('rsvpAttendingNo');
        if (rsvpNoOption && t.rsvp.attendingNo) rsvpNoOption.textContent = t.rsvp.attendingNo;
        const rsvpWishesLabel = document.getElementById('rsvpWishesLabel');
        if (rsvpWishesLabel && t.rsvp.wishesLabel) {
            rsvpWishesLabel.innerHTML = `<i class="fa-solid fa-heart"></i> ${t.rsvp.wishesLabel}`;
        }
        const rsvpWishesInput = document.getElementById('rsvpWishes');
        if (rsvpWishesInput && t.rsvp.wishesPlaceholder) rsvpWishesInput.placeholder = t.rsvp.wishesPlaceholder;

        // 4. Entrance Gate / Opening Styles
        const dockTitle = document.querySelector('.dock-title');
        if (dockTitle && t.entrance.title) {
            dockTitle.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> ${t.entrance.title}`;
        }
        const btnWax = document.querySelector('[data-style="envelope-wax"]');
        if (btnWax && t.entrance.waxSealBtn) btnWax.innerHTML = `<i class="fa-solid fa-envelope"></i> ${t.entrance.waxSealBtn}`;
        const btnDoors = document.querySelector('[data-style="temple-doors"]');
        if (btnDoors && t.entrance.doorsBtn) btnDoors.innerHTML = `<i class="fa-solid fa-archway"></i> ${t.entrance.doorsBtn}`;
        const btnScroll = document.querySelector('[data-style="royal-scroll"]');
        if (btnScroll && t.entrance.scrollBtn) btnScroll.innerHTML = `<i class="fa-solid fa-scroll"></i> ${t.entrance.scrollBtn}`;
        const btnCurtains = document.querySelector('[data-style="silk-curtains"]');
        if (btnCurtains && t.entrance.curtainsBtn) btnCurtains.innerHTML = `<i class="fa-solid fa-masks-theater"></i> ${t.entrance.curtainsBtn}`;
        const btnBook = document.querySelector('[data-style="book-flip"]');
        if (btnBook && t.entrance.bookBtn) btnBook.innerHTML = `<i class="fa-solid fa-book-open"></i> ${t.entrance.bookBtn}`;
        const btnBox = document.querySelector('[data-style="shagun-box"]');
        if (btnBox && t.entrance.boxBtn) btnBox.innerHTML = `<i class="fa-solid fa-gift"></i> ${t.entrance.boxBtn}`;

        // Entrance Cards Subtitles & Buttons
        const enter1 = document.getElementById('btnEnterCelebration1');
        if (enter1 && t.entrance.enterBtn) enter1.innerHTML = `<i class="fa-solid fa-heart"></i> ${t.entrance.enterBtn}`;
        const enter2 = document.getElementById('btnEnterCelebration2');
        if (enter2 && t.entrance.doorsEnterBtn) enter2.innerHTML = `<i class="fa-solid fa-door-open"></i> ${t.entrance.doorsEnterBtn}`;
        const enter3 = document.getElementById('btnEnterCelebration3');
        if (enter3 && t.entrance.scrollEnterBtn) enter3.innerHTML = `<i class="fa-solid fa-scroll"></i> ${t.entrance.scrollEnterBtn}`;
        const enter4 = document.getElementById('btnEnterCelebration4');
        if (enter4 && t.entrance.curtainsEnterBtn) enter4.innerHTML = `<i class="fa-solid fa-masks-theater"></i> ${t.entrance.curtainsEnterBtn}`;
        const enter5 = document.getElementById('btnEnterCelebration5');
        if (enter5 && t.entrance.bookEnterBtn) enter5.innerHTML = `<i class="fa-solid fa-book-open"></i> ${t.entrance.bookEnterBtn}`;
        const enter6 = document.getElementById('btnEnterCelebration6');
        if (enter6 && t.entrance.boxEnterBtn) enter6.innerHTML = `<i class="fa-solid fa-gift"></i> ${t.entrance.boxEnterBtn}`;

        const skipBtn = document.getElementById('btnSkipEntrance');
        if (skipBtn && t.entrance.skip) skipBtn.innerHTML = `${t.entrance.skip} <i class="fa-solid fa-arrow-right"></i>`;
        const hintEl = document.querySelector('.gate-footer-hint');
        if (hintEl && t.entrance.hint) hintEl.innerHTML = `<i class="fa-solid fa-music"></i> ${t.entrance.hint}`;

        // 5. Hero Section
        const weddingTitleEl = document.getElementById('dynWeddingTitle');
        if (weddingTitleEl && t.hero.weddingTitle) {
            // Only override if default
            if (!window.currentSettings?.general?.weddingTitle || ['शुभ विवाह', 'Royal Wedding Celebration'].includes(weddingTitleEl.textContent)) {
                weddingTitleEl.textContent = t.hero.weddingTitle;
            }
        }
        const calendarBtn = document.getElementById('btnAddToCalendar');
        if (calendarBtn && t.hero.calendarBtn) {
            calendarBtn.innerHTML = `<i class="fa-regular fa-calendar-plus"></i> <span>${t.hero.calendarBtn}</span>`;
        }

        // Countdown Timer Units
        const uDays = document.getElementById('lblDays');
        if (uDays && t.hero.days) uDays.textContent = t.hero.days;
        const uHours = document.getElementById('lblHours');
        if (uHours && t.hero.hours) uHours.textContent = t.hero.hours;
        const uMins = document.getElementById('lblMinutes');
        if (uMins && t.hero.minutes) uMins.textContent = t.hero.minutes;
        const uSecs = document.getElementById('lblSeconds');
        if (uSecs && t.hero.seconds) uSecs.textContent = t.hero.seconds;

        // 6. Section Headers (Story, Ceremonies, Gallery, Saptapadi, Dresscode, Shagun, Aarti, RSVP, Venue)
        setSectionHeader('story', t.story.tag, t.story.title);
        setSectionHeader('ghibli-video', t.video.tag, t.video.title, t.video.desc);
        setSectionHeader('ceremonies', t.ceremonies.tag, t.ceremonies.title, t.ceremonies.desc);
        setSectionHeader('gallery', t.gallery.tag, t.gallery.title, t.gallery.desc);
        setSectionHeader('saptapadi', t.saptapadi.tag, t.saptapadi.title, t.saptapadi.desc);
        renderSaptapadiVows(t.saptapadi.vows);
        setSectionHeader('dresscode', t.dresscode.tag, t.dresscode.title, t.dresscode.desc);
        setSectionHeader('aarti', t.aarti.tag, t.aarti.title, t.aarti.desc);
        setSectionHeader('rsvp', t.rsvp.tag, t.rsvp.title, t.rsvp.desc);
        setSectionHeader('venue', t.venue.tag, t.venue.title);

        // 7. Shagun Section
        const shagunBadge = document.querySelector('.shagun-badge');
        if (shagunBadge && t.shagun.badge) shagunBadge.textContent = t.shagun.badge;
        const shagunTitle = document.querySelector('.shagun-title');
        if (shagunTitle && t.shagun.title) shagunTitle.textContent = t.shagun.title;
        const shagunAppBtn = document.getElementById('btnOpenUpiApp');
        if (shagunAppBtn && t.shagun.appBtn) {
            shagunAppBtn.innerHTML = `<i class="fa-solid fa-mobile-screen"></i> ${t.shagun.appBtn}`;
        }

        // 8. Aarti Section
        const btnDiya = document.getElementById('btnLightDiya');
        if (btnDiya && t.aarti.diyaBtn) {
            btnDiya.innerHTML = `<i class="fa-solid fa-fire"></i> ${t.aarti.diyaBtn}`;
        }
        const teamGroomTitle = document.getElementById('dynGroomTeamName');
        if (teamGroomTitle && t.aarti.teamGroom) teamGroomTitle.textContent = t.aarti.teamGroom;
        const teamBrideTitle = document.getElementById('dynBrideTeamName');
        if (teamBrideTitle && t.aarti.teamBride) teamBrideTitle.textContent = t.aarti.teamBride;

        // 9. RSVP Form Labels
        const rsvpSubmitBtn = document.querySelector('#rsvpForm .btn-submit');
        if (rsvpSubmitBtn && t.rsvp.submitBtn) {
            rsvpSubmitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> ${t.rsvp.submitBtn}`;
        }

        // 10. Update Active Buttons in Language Switcher Pills
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === langCode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        syncGuestLanguageButtons();
    }

    function setSectionHeader(sectionId, tag, title, desc) {
        const sec = document.getElementById(sectionId);
        if (!sec) return;
        const tagEl = sec.querySelector('.section-tag');
        if (tagEl && tag) tagEl.textContent = tag;
        const titleEl = sec.querySelector('.section-title');
        if (titleEl && title) titleEl.textContent = title;
        if (desc) {
            const descEl = sec.querySelector('.section-description');
            if (descEl) descEl.textContent = desc;
        }
    }

    function renderSaptapadiVows(vows) {
        const grid = document.getElementById('saptapadiGrid');
        if (!grid || !Array.isArray(vows) || vows.length === 0) return;

        grid.replaceChildren();
        vows.slice(0, 7).forEach((vow, index) => {
            const card = document.createElement('article');
            card.className = 'saptapadi-card';

            const number = document.createElement('span');
            number.className = 'saptapadi-number';
            number.textContent = new Intl.NumberFormat(currentLang, {
                minimumIntegerDigits: 2,
                useGrouping: false
            }).format(index + 1);

            const copy = document.createElement('div');
            const title = document.createElement('h3');
            title.className = 'saptapadi-vow-title';
            title.textContent = vow.title || '';
            const description = document.createElement('p');
            description.className = 'saptapadi-vow-desc';
            description.textContent = vow.desc || '';

            copy.append(title, description);
            card.append(number, copy);
            grid.appendChild(card);
        });
    }

    // -------------------------------------------------------------
    // LANGUAGE SWITCHER PILL CREATOR
    // -------------------------------------------------------------
    function injectLanguageSwitcherPill() {
        if (document.getElementById('headerLangPill')) return;

        const pill = document.createElement('div');
        pill.className = 'lang-selector-pill';
        pill.id = 'headerLangPill';
        pill.style.cssText = `
            display: inline-flex;
            align-items: center;
            background: rgba(28, 18, 14, 0.7);
            border: 1px solid rgba(212, 175, 55, 0.5);
            border-radius: 20px;
            padding: 3px 6px;
            gap: 4px;
            margin-right: 8px;
            backdrop-filter: blur(8px);
        `;

        pill.innerHTML = `
            <button type="button" class="lang-btn" data-lang="mr" style="background:transparent; border:none; color:#E0D4C5; font-size:0.82rem; font-weight:700; padding:4px 10px; border-radius:15px; cursor:pointer; transition:all 0.2s;">मराठी</button>
            <button type="button" class="lang-btn" data-lang="hi" style="background:transparent; border:none; color:#E0D4C5; font-size:0.82rem; font-weight:700; padding:4px 10px; border-radius:15px; cursor:pointer; transition:all 0.2s;">हिंदी</button>
            <button type="button" class="lang-btn" data-lang="en" style="background:transparent; border:none; color:#E0D4C5; font-size:0.82rem; font-weight:700; padding:4px 10px; border-radius:15px; cursor:pointer; transition:all 0.2s;">English</button>
        `;

        // Style active state dynamically
        const style = document.createElement('style');
        style.textContent = `
            .lang-btn.active {
                background: linear-gradient(135deg, #D4AF37, #996515) !important;
                color: #1a0808 !important;
                box-shadow: 0 2px 6px rgba(212, 175, 55, 0.4);
            }
            .lang-btn:hover:not(.active) {
                color: #FFD700 !important;
                background: rgba(212, 175, 55, 0.15) !important;
            }
        `;
        document.head.appendChild(style);

        // Insert into header-actions
        const headerActions = document.querySelector('.header-actions');
        if (headerActions) {
            headerActions.insertBefore(pill, headerActions.firstChild);
        }
    }

    // -------------------------------------------------------------
    // INITIALIZATION
    // -------------------------------------------------------------
    document.addEventListener('DOMContentLoaded', () => {
        injectLanguageSwitcherPill();
        document.querySelectorAll('.lang-btn[data-lang]').forEach(button => {
            if (button.dataset.languageBound === 'true') return;
            button.dataset.languageBound = 'true';
            button.addEventListener('click', () => {
                const code = button.getAttribute('data-lang');
                if (!code) return;
                applyLanguage(code);
                if (window.IndianCultureEngine && typeof window.IndianCultureEngine.showToast === 'function') {
                    const names = { mr: 'मराठी', hi: 'हिंदी', en: 'English' };
                    window.IndianCultureEngine.showToast(`🌐 भाषा बदलली: ${names[code] || code}`);
                }
            });
        });
        syncGuestLanguageButtons();
        const initialLang = getActiveLanguage();
        applyLanguage(initialLang);
    });

    document.addEventListener('wedding-settings-applied', () => {
        syncGuestLanguageButtons();
        const activeLanguage = getActiveLanguage();
        if (activeLanguage !== currentLang) applyLanguage(activeLanguage);
    });

    window.LanguageEngine = {
        applyLanguage: applyLanguage,
        getActiveLanguage: getActiveLanguage,
        getCurrentLang: () => currentLang
    };

})();
