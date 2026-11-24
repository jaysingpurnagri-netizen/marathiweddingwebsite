/**
 * indian_culture_engine.js
 * Comprehensive Indian Culture Wedding Engine:
 * - 6 Interactive Invitation Opening Experiences with 3D Physics
 * - Procedural Web Audio Sound Synthesizers (Wax Seal, Temple Bell, Fanfare, Silk Swoosh, Page Flip)
 * - Digital Shagun & UPI QR Code Generator (GPay, PhonePe, Paytm)
 * - Virtual Aarti & Sacred Diya Lighting
 * - Baraat Battle (Team Groom vs Team Bride Fun Cheer)
 * - Wardrobe & Dress Code Palette Guide
 * - 20 Indian Cultural Themes Gallery & Live Switcher
 */

(function() {
    'use strict';

    // -------------------------------------------------------------
    // 1. PROCEDURAL WEB AUDIO SYNTHESIZERS (Zero external audio dependency)
    // -------------------------------------------------------------
    let audioCtx = null;
    function getAudioContext() {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) audioCtx = new AudioContextClass();
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    const SoundFX = {
        // Wax seal crack: quick click + crunch
        waxCrack: function() {
            try {
                const ctx = getAudioContext();
                if (!ctx) return;
                const now = ctx.currentTime;
                // Pop click
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(320, now);
                osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);
                gain.gain.setValueAtTime(0.7, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.12);

                // Cracking noise burst
                const bufferSize = ctx.sampleRate * 0.08;
                const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
                }
                const noise = ctx.createBufferSource();
                noise.buffer = buffer;
                const noiseGain = ctx.createGain();
                noiseGain.gain.setValueAtTime(0.6, now);
                noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
                noise.connect(noiseGain);
                noiseGain.connect(ctx.destination);
                noise.start(now);
            } catch(e){}
        },

        // Resonant Brass Temple Bell Chime
        templeBell: function() {
            try {
                const ctx = getAudioContext();
                if (!ctx) return;
                const now = ctx.currentTime;
                const freqs = [880, 1760, 2640, 3520];
                const gains = [0.4, 0.25, 0.15, 0.08];

                freqs.forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, now);
                    gain.gain.setValueAtTime(gains[i], now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now);
                    osc.stop(now + 2.5);
                });
            } catch(e){}
        },

        // Royal Fanfare Trumpet / Bugle Arpeggio
        royalFanfare: function() {
            try {
                const ctx = getAudioContext();
                if (!ctx) return;
                const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
                notes.forEach((freq, i) => {
                    const startTime = ctx.currentTime + i * 0.14;
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(freq, startTime);
                    gain.gain.setValueAtTime(0.35, startTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.35);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(startTime);
                    osc.stop(startTime + 0.35);
                });
            } catch(e){}
        },

        // Silk Curtain Swoosh
        silkSwoosh: function() {
            try {
                const ctx = getAudioContext();
                if (!ctx) return;
                const now = ctx.currentTime;
                const bufferSize = ctx.sampleRate * 0.6;
                const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
                }
                const noise = ctx.createBufferSource();
                noise.buffer = buffer;
                const filter = ctx.createBiquadFilter();
                filter.type = 'bandpass';
                filter.frequency.setValueAtTime(450, now);
                filter.frequency.exponentialRampToValueAtTime(1400, now + 0.3);
                filter.frequency.exponentialRampToValueAtTime(300, now + 0.6);
                const gain = ctx.createGain();
                gain.gain.setValueAtTime(0.4, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
                noise.connect(filter);
                filter.connect(gain);
                gain.connect(ctx.destination);
                noise.start(now);
            } catch(e){}
        },

        // Book Page Turn
        pageFlip: function() {
            try {
                const ctx = getAudioContext();
                if (!ctx) return;
                const now = ctx.currentTime;
                const bufferSize = ctx.sampleRate * 0.25;
                const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
                }
                const noise = ctx.createBufferSource();
                noise.buffer = buffer;
                const filter = ctx.createBiquadFilter();
                filter.type = 'highpass';
                filter.frequency.setValueAtTime(800, now);
                const gain = ctx.createGain();
                gain.gain.setValueAtTime(0.35, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
                noise.connect(filter);
                filter.connect(gain);
                gain.connect(ctx.destination);
                noise.start(now);
            } catch(e){}
        },

        // Flower Twinkle Chimes
        flowerTwinkle: function() {
            try {
                const ctx = getAudioContext();
                if (!ctx) return;
                [1500, 2000, 2600, 3200].forEach((freq, idx) => {
                    const t = ctx.currentTime + idx * 0.08;
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, t);
                    gain.gain.setValueAtTime(0.25, t);
                    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(t);
                    osc.stop(t + 0.5);
                });
            } catch(e){}
        }
    };

    // -------------------------------------------------------------
    // 2. INVITATION OPENING EXPERIENCES CONTROLLER (6 STYLES)
    // -------------------------------------------------------------
    const STYLES = ['envelope-wax', 'temple-doors', 'royal-scroll', 'silk-curtains', 'book-flip', 'shagun-box'];
    let currentOpenStyle = 'envelope-wax';

    function initOpeningStyles() {
        // Read active opening style from settings or localStorage
        const storedStyle = localStorage.getItem('weddingOpeningStyle');
        const defaultStyle = (window.currentSettings && window.currentSettings.openingStyle) ? window.currentSettings.openingStyle : 'envelope-wax';
        currentOpenStyle = storedStyle || defaultStyle;

        // Activate matching style in dock
        switchOpenStyleStage(currentOpenStyle);

        // Bind Dock Buttons
        const dockBtns = document.querySelectorAll('.open-styles-dock .dock-btn');
        dockBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const chosen = btn.getAttribute('data-style');
                if (chosen) {
                    currentOpenStyle = chosen;
                    localStorage.setItem('weddingOpeningStyle', chosen);
                    switchOpenStyleStage(chosen);
                }
            });
        });

        // 1. STYLE 1: WAX SEAL ENVELOPE
        const btnWax = document.getElementById('btnBreakWaxSeal');
        const stageEnvelope = document.getElementById('stageEnvelope');
        if (btnWax && stageEnvelope) {
            btnWax.addEventListener('click', (e) => {
                e.stopPropagation();
                SoundFX.waxCrack();
                stageEnvelope.classList.add('opened');
            });
            stageEnvelope.addEventListener('click', () => {
                if (!stageEnvelope.classList.contains('opened')) {
                    SoundFX.waxCrack();
                    stageEnvelope.classList.add('opened');
                }
            });
        }

        // 2. STYLE 2: TEMPLE DOORS
        const stageDoors = document.getElementById('stageDoors');
        const leftDoor = document.getElementById('templeDoorLeft');
        const rightDoor = document.getElementById('templeDoorRight');
        function openTempleDoors() {
            if (stageDoors && !stageDoors.classList.contains('opened')) {
                SoundFX.templeBell();
                stageDoors.classList.add('opened');
            }
        }
        if (leftDoor) leftDoor.addEventListener('click', openTempleDoors);
        if (rightDoor) rightDoor.addEventListener('click', openTempleDoors);
        if (stageDoors) stageDoors.addEventListener('click', openTempleDoors);

        // 3. STYLE 3: ROYAL FARMAN
        const stageScroll = document.getElementById('stageScroll');
        const btnScrollRibbon = document.getElementById('btnScrollRibbon');
        function unrollRoyalFarman() {
            if (stageScroll && !stageScroll.classList.contains('opened')) {
                SoundFX.royalFanfare();
                stageScroll.classList.add('opened');
            }
        }
        if (btnScrollRibbon) btnScrollRibbon.addEventListener('click', unrollRoyalFarman);
        if (stageScroll) stageScroll.addEventListener('click', unrollRoyalFarman);

        // 4. STYLE 4: SILK CURTAINS
        const stageCurtains = document.getElementById('stageCurtains');
        const btnOpenCurtains = document.getElementById('btnOpenCurtains');
        function partSilkCurtains() {
            if (stageCurtains && !stageCurtains.classList.contains('opened')) {
                SoundFX.silkSwoosh();
                stageCurtains.classList.add('opened');
            }
        }
        if (btnOpenCurtains) btnOpenCurtains.addEventListener('click', partSilkCurtains);
        if (stageCurtains) stageCurtains.addEventListener('click', partSilkCurtains);

        // 5. STYLE 5: 3D BOOK PATRIKA
        const stageBook = document.getElementById('stageBook');
        const btnOpenBook = document.getElementById('btnOpenBookCover');
        function flipOpenBook() {
            if (stageBook && !stageBook.classList.contains('opened')) {
                SoundFX.pageFlip();
                stageBook.classList.add('opened');
            }
        }
        if (btnOpenBook) btnOpenBook.addEventListener('click', flipOpenBook);
        if (stageBook) stageBook.addEventListener('click', flipOpenBook);

        // 6. STYLE 6: SHAGUN JEWEL BOX
        const stageBox = document.getElementById('stageBox');
        const btnOpenBox = document.getElementById('btnOpenBoxLid');
        const boxClasp = document.getElementById('boxClasp');
        function openShagunBox() {
            if (stageBox && !stageBox.classList.contains('opened')) {
                SoundFX.waxCrack();
                SoundFX.flowerTwinkle();
                stageBox.classList.add('opened');
            }
        }
        if (btnOpenBox) btnOpenBox.addEventListener('click', openShagunBox);
        if (boxClasp) boxClasp.addEventListener('click', openShagunBox);
        if (stageBox) stageBox.addEventListener('click', openShagunBox);

        // Enter Celebration Buttons (dismiss modal & start music)
        document.querySelectorAll('.card-enter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                dismissEntranceGate();
            });
        });
        for (let i = 1; i <= 6; i++) {
            const btn = document.getElementById(`btnEnterCelebration${i}`);
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    dismissEntranceGate();
                });
            }
        }

        // Direct skip link
        document.querySelectorAll('.btn-gate-skip').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                dismissEntranceGate();
            });
        });
        const btnSkip = document.getElementById('btnSkipEntrance') || document.getElementById('btnSkipDirectly');
        if (btnSkip) {
            btnSkip.addEventListener('click', () => {
                dismissEntranceGate();
            });
        }

        // Reopen button in header
        const reopenBtn = document.getElementById('reopenGateBtn');
        if (reopenBtn) {
            reopenBtn.addEventListener('click', () => {
                reopenEntranceGate(currentOpenStyle);
            });
        }
    }

    function switchOpenStyleStage(styleId) {
        currentOpenStyle = styleId;
        const stages = {
            'envelope-wax': 'stageEnvelope',
            'temple-doors': 'stageDoors',
            'royal-scroll': 'stageScroll',
            'silk-curtains': 'stageCurtains',
            'book-flip': 'stageBook',
            'shagun-box': 'stageBox'
        };

        const instructions = {
            'envelope-wax': 'लग्नपत्रिका उघडण्यासाठी खालील मेणाच्या मुद्रेवर (Seal) स्पर्श करा 🪷',
            'temple-doors': 'मंदिराचे पवित्र महाद्वार उघडण्यासाठी दरवाजावर स्पर्श करा 🔔',
            'royal-scroll': 'शाही फर्मान पत्र वाचण्यासाठी रेशमी गाठ सोडा 📜',
            'silk-curtains': 'विवाह मंडपात प्रवेश करण्यासाठी रेशमी पडद्यावर स्पर्श करा 🎭',
            'book-flip': 'शुभ लग्नपत्रिका उघडण्यासाठी पुस्तकाच्या पानावर स्पर्श करा 📖',
            'shagun-box': 'शाही शगुन पेटी उघडण्यासाठी सुवर्ण कुलूपावर स्पर्श करा 🎁'
        };

        const instructionEl = document.getElementById('gateInstructionText');
        if (instructionEl && instructions[styleId]) {
            instructionEl.textContent = instructions[styleId];
        }

        // Update dock active buttons
        const dockBtns = document.querySelectorAll('.open-styles-dock .dock-btn');
        dockBtns.forEach(b => {
            if (b.getAttribute('data-style') === styleId) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });

        // Hide all stages strictly and show ONLY the selected active one
        Object.keys(stages).forEach(k => {
            const el = document.getElementById(stages[k]);
            if (el) {
                if (k === styleId) {
                    el.classList.remove('hidden');
                    el.style.display = 'flex';
                    el.classList.remove('opened'); // reset animation so user can click to open
                } else {
                    el.classList.add('hidden');
                    el.style.display = 'none';
                }
            }
        });
    }

    function dismissEntranceGate() {
        const modal = document.getElementById('invitationEntranceModal');
        if (modal) {
            modal.classList.add('gate-dismissed');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 650);
        }
        // Start background music
        try {
            const audio = document.getElementById('weddingAudio');
            if (audio && audio.paused) {
                audio.play().catch(() => {});
            }
            const musicBtn = document.getElementById('toggleMusicBtn');
            if (musicBtn) musicBtn.classList.add('active');
        } catch(e){}

        // Trigger flower petal cascade
        SoundFX.flowerTwinkle();
        if (typeof triggerFlowerShowerBurst === 'function') {
            triggerFlowerShowerBurst();
        }
    }

    function reopenEntranceGate(styleId) {
        const modal = document.getElementById('invitationEntranceModal');
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.remove('gate-dismissed');
            }, 20);
            switchOpenStyleStage(styleId || currentOpenStyle);
        }
    }

    // -------------------------------------------------------------
    // 3. DIGITAL SHAGUN & UPI QR GENERATOR
    // -------------------------------------------------------------
    let currentShagunAmt = 1101;

    function initDigitalShagun(settings) {
        const shagun = (settings && settings.shagun) ? settings.shagun : {
            upiId: 'aditya.sadhana@okaxis',
            payeeName: 'Aditya & Sadhana Vivah',
            note: 'सस्नेह शुभाशीर्वाद व डिजिटल आहेर',
            amounts: [501, 1101, 2101, 5101]
        };

        const upiIdEl = document.getElementById('dynUpiId');
        if (upiIdEl) upiIdEl.textContent = shagun.upiId || 'aditya.sadhana@okaxis';

        const noteEl = document.getElementById('dynShagunNote');
        if (noteEl && shagun.note) noteEl.textContent = shagun.note;

        // Amount Chips
        const chipsContainer = document.getElementById('shagunAmountChips');
        if (chipsContainer) {
            chipsContainer.innerHTML = '';
            const amounts = (shagun.amounts && shagun.amounts.length) ? shagun.amounts : [501, 1101, 2101, 5101];
            amounts.forEach((amt, idx) => {
                const chip = document.createElement('button');
                chip.type = 'button';
                chip.className = `amount-chip ${idx === 1 ? 'active' : ''}`;
                chip.textContent = `₹${amt.toLocaleString('en-IN')}`;
                chip.setAttribute('data-amt', amt);
                chip.addEventListener('click', () => {
                    chipsContainer.querySelectorAll('.amount-chip').forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                    currentShagunAmt = amt;
                    updateShagunQr(shagun.upiId, shagun.payeeName, amt, shagun.note);
                });
                chipsContainer.appendChild(chip);
            });
            currentShagunAmt = amounts[1] || amounts[0] || 1101;
        }

        updateShagunQr(shagun.upiId, shagun.payeeName, currentShagunAmt, shagun.note);
    }

    function updateShagunQr(upiId, payeeName, amount, note) {
        const id = upiId || 'aditya.sadhana@okaxis';
        const name = payeeName || 'Aditya & Sadhana';
        const tn = note || 'Wedding Shagun';
        const upiUri = `upi://pay?pa=${encodeURIComponent(id)}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(tn)}`;

        const qrImg = document.getElementById('shagunQrImg');
        if (qrImg) {
            qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiUri)}`;
        }

        const appBtn = document.getElementById('btnOpenUpiApp');
        if (appBtn) {
            appBtn.href = upiUri;
        }
    }

    // -------------------------------------------------------------
    // 4. VIRTUAL AARTI & BARAAT BATTLE
    // -------------------------------------------------------------
    function initAartiAndBaraat(settings) {
        // Aarti Diya
        const diyaContainer = document.getElementById('diyaContainer');
        const btnLightDiya = document.getElementById('btnLightDiya');
        const diyaCounterText = document.getElementById('diyaCounterText');
        let diyaCount = parseInt(localStorage.getItem('diyaCount') || '128', 10);

        function lightDiya() {
            if (diyaContainer) {
                diyaContainer.classList.add('is-lit');
                diyaCount++;
                localStorage.setItem('diyaCount', diyaCount);
                if (diyaCounterText) {
                    diyaCounterText.innerHTML = `<i class="fa-solid fa-heart" style="color:#E63946;"></i> आतापर्यंत ${diyaCount} पाहुण्यांनी मंगल दीप तेवून शुभाशीर्वाद दिले!`;
                }
                SoundFX.templeBell();
                SoundFX.flowerTwinkle();
                showFloatingToast('🪔 मंगल दीप प्रज्वलित झाला! नवदाम्पत्याला आपले शुभाशीर्वाद लाभले.');
            }
        }
        if (btnLightDiya) btnLightDiya.addEventListener('click', lightDiya);
        if (diyaContainer) diyaContainer.addEventListener('click', lightDiya);

        // Baraat Poll
        let groomVotes = parseInt(localStorage.getItem('groomVotes') || '142', 10);
        let brideVotes = parseInt(localStorage.getItem('brideVotes') || '168', 10);

        function updateBaraatUI() {
            const total = groomVotes + brideVotes;
            const pctG = total > 0 ? Math.round((groomVotes / total) * 100) : 50;
            const pctB = 100 - pctG;

            const countG = document.getElementById('countGroomVotes');
            const countB = document.getElementById('countBrideVotes');
            const meterG = document.getElementById('meterGroom');
            const meterB = document.getElementById('meterBride');
            const pctGEl = document.getElementById('pctGroom');
            const pctBEl = document.getElementById('pctBride');

            if (countG) countG.textContent = `${groomVotes} मते`;
            if (countB) countB.textContent = `${brideVotes} मते`;
            if (meterG) meterG.style.width = `${pctG}%`;
            if (meterB) meterB.style.width = `${pctB}%`;
            if (pctGEl) pctGEl.textContent = `${pctG}% वरपक्ष`;
            if (pctBEl) pctBEl.textContent = `${pctB}% वधूपक्ष`;
        }

        const btnGroom = document.getElementById('btnVoteGroom');
        const btnBride = document.getElementById('btnVoteBride');

        if (btnGroom) {
            btnGroom.addEventListener('click', () => {
                groomVotes++;
                localStorage.setItem('groomVotes', groomVotes);
                updateBaraatUI();
                SoundFX.royalFanfare();
                showFloatingToast('🕺 वरपक्षाला आपले मत नोंदवले गेले! दंगा सुरू राहू द्या!');
            });
        }
        if (btnBride) {
            btnBride.addEventListener('click', () => {
                brideVotes++;
                localStorage.setItem('brideVotes', brideVotes);
                updateBaraatUI();
                SoundFX.flowerTwinkle();
                showFloatingToast('💃 वधूपक्षाला आपले मत नोंदवले गेले! नवरीकडील जल्लोष भारी!');
            });
        }
        updateBaraatUI();
    }

    // -------------------------------------------------------------
    // 5. WARDROBE & DRESS CODE PALETTE GUIDE
    // -------------------------------------------------------------
    function renderDressCode(items) {
        const grid = document.getElementById('dresscodeGrid');
        if (!grid) return;
        grid.innerHTML = '';

        const list = (items && items.length) ? items : [
            {
                event: 'हळदी सोहळा (Haldi)',
                attire: 'पिवळा कुर्ता / पिवळी साडी किंवा लेहेंगा',
                colors: ['#FFB703', '#F59E0B', '#FDE68A', '#FFFBEB'],
                notes: 'झेंडूची फुले आणि पिवळ्या रंगाचा आनंदोत्सव'
            },
            {
                event: 'मेहंदी व संगीत (Mehendi & Sangeet)',
                attire: 'हिरवा / पिस्ता कुर्ता, डिझायनर लेहेंगा, इंडो-वेस्टर्न',
                colors: ['#0E4D45', '#2A9D8F', '#1A1A2E', '#E94560'],
                notes: 'गर्द हिरवा व मिडनाइट रॉयल ब्लू सह चकाकणारे दागिने'
            },
            {
                event: 'शुभ विवाह व मंगलाष्टके (Main Wedding)',
                attire: 'पारंपरिक पैठणी, रेशमी धोतर, फेटा / शेरवानी',
                colors: ['#800020', '#D4AF37', '#A81B27', '#FFF9EC'],
                notes: 'शाही लाल, मरून आणि सोन्याचा अस्सल जरीकाठ'
            },
            {
                event: 'स्नेहभोजन व स्वागत समारंभ (Reception)',
                attire: 'सूट, शेरवानी, कॉकटेल साडी, गाऊन',
                colors: ['#1A237E', '#D4AF37', '#5A3D31', '#B76E79'],
                notes: 'रॉयल फॉर्मल व आधुनिक वेस्टर्न-क्लासिक'
            }
        ];

        list.forEach(item => {
            const card = document.createElement('div');
            card.className = 'dresscode-card';

            const dotsHtml = (item.colors || []).map(c => 
                `<span class="palette-dot" style="background:${c};" title="${c}"></span>`
            ).join('');

            card.innerHTML = `
                <h4 class="dresscode-event-name">${item.event}</h4>
                <div class="palette-swatches">${dotsHtml}</div>
                <p class="dresscode-attire"><i class="fa-solid fa-shirt"></i> <strong>सुचवलेला पोशाख:</strong> ${item.attire}</p>
                <p class="dresscode-note"><i class="fa-solid fa-sparkles"></i> ${item.notes || ''}</p>
            `;
            grid.appendChild(card);
        });
    }

    // -------------------------------------------------------------
    // 6. 20 INDIAN CULTURAL THEMES MODAL CONTROLLER
    // -------------------------------------------------------------
    let allThemesList = [];

    async function loadThemesList() {
        try {
            const res = await fetch('templates.json');
            if (res.ok) {
                allThemesList = await res.json();
            }
        } catch(e){}

        if (!allThemesList || !allThemesList.length) {
            allThemesList = [
                { id: 'royal-rajputana', nameCultural: '१. राजपूताना राजवाडा थाट', nameEnglish: 'Royal Rajputana & Mewar', primaryColor: '#8B0000', secondaryColor: '#D4AF37', badge: 'राजपूत महाल', region: 'Rajasthan' },
                { id: 'south-kalyanam', nameCultural: '२. दक्षिण भारतीय कल्याणम', nameEnglish: 'South Indian Kalyanam', primaryColor: '#7B1113', secondaryColor: '#D4AF37', badge: 'कांचीपुरम', region: 'Tamil Nadu' },
                { id: 'punjabi-anand-karaj', nameCultural: '३. पंजाबी आनंद कारज', nameEnglish: 'Punjabi Anand Karaj', primaryColor: '#D81B60', secondaryColor: '#FFA000', badge: 'फुलकारी ढोल', region: 'Punjab' },
                { id: 'bengali-biye', nameCultural: '४. बंगाली शुभो दृष्टी', nameEnglish: 'Bengali Biye', primaryColor: '#A30000', secondaryColor: '#FFD700', badge: 'टोपोर अल्पना', region: 'Bengal' },
                { id: 'gujarati-lagna', nameCultural: '५. गुजराती लग्न व पाटोळा', nameEnglish: 'Gujarati Vivah', primaryColor: '#C0392B', secondaryColor: '#E67E22', badge: 'पाटोळा रास', region: 'Gujarat' },
                { id: 'kerala-kasavu', nameCultural: '६. केरळ कसावू विवाह', nameEnglish: 'Kerala Kasavu Vivaham', primaryColor: '#1A4D2E', secondaryColor: '#D4AF37', badge: 'कसावू सौष्ठव', region: 'Kerala' },
                { id: 'royal-paithani', nameCultural: '७. राजेशाही पैठणी थाट', nameEnglish: 'Royal Marathi Peshwai', primaryColor: '#800020', secondaryColor: '#D4AF37', badge: 'पैठणी मानबिंदू', region: 'Maharashtra' },
                { id: 'kashmiri-chinar', nameCultural: '८. काश्मिरी पश्मिना व चिनार', nameEnglish: 'Kashmiri Chinar', primaryColor: '#B23A22', secondaryColor: '#E5A93B', badge: 'चिनार व्हॅली', region: 'Kashmir' },
                { id: 'awadhi-nawabi', nameCultural: '९. लखनवी अवधी जाळी', nameEnglish: 'Awadhi & Mughal Shahi', primaryColor: '#0F4C3A', secondaryColor: '#C5A059', badge: 'अवधी नजाकत', region: 'Awadh' },
                { id: 'marwari-bandhej', nameCultural: '१०. मारवाडी बांधेज थाट', nameEnglish: 'Marwari Bandhej', primaryColor: '#C0392B', secondaryColor: '#F39C12', badge: 'गोटा पट्टी', region: 'Marwar' },
                { id: 'telugu-pelli', nameCultural: '११. तेलगू पेल्ली संदडी', nameEnglish: 'Telugu Pelli Sandadi', primaryColor: '#8B1E3F', secondaryColor: '#D4AF37', badge: 'कलमकारी वारसा', region: 'Andhra' },
                { id: 'odia-jagannath', nameCultural: '१२. ओडिया जगन्नाथ संस्कृती', nameEnglish: 'Odia Pattachitra Heritage', primaryColor: '#9E2A2B', secondaryColor: '#E09F3E', badge: 'पट्टचित्र कला', region: 'Odisha' },
                { id: 'goan-coastal', nameCultural: '१३. कोकण-गोवा सागरतीर', nameEnglish: 'Goan Coastal Vivah', primaryColor: '#0077B6', secondaryColor: '#F4A261', badge: 'सागरी मांडव', region: 'Goa' },
                { id: 'peacock-regal', nameCultural: '१४. वृंदावन मयूर पंख', nameEnglish: 'Peacock Regal & Flute', primaryColor: '#005F73', secondaryColor: '#EE9B00', badge: 'मयूरपंख', region: 'Vrindavan' },
                { id: 'vintage-farman', nameCultural: '१५. जुना राजेशाही फर्मान', nameEnglish: 'Vintage Shahi Farman', primaryColor: '#5D4037', secondaryColor: '#C5A059', badge: 'शाही फर्मान', region: 'Heritage' },
                { id: 'sacred-havan', nameCultural: '१६. वैदिक अग्नी व सप्तपदी', nameEnglish: 'Sacred Vedic Havan', primaryColor: '#B71C1C', secondaryColor: '#E65100', badge: 'अग्नीसाक्षी', region: 'Vedic' },
                { id: 'bollywood-glam', nameCultural: '१७. बॉलिवूड स्टारलाईट संगीत', nameEnglish: 'Bollywood Starlight Glam', primaryColor: '#1A1A2E', secondaryColor: '#D4AF37', badge: 'स्टारलाईट', region: 'Modern' },
                { id: 'haldi-sunshine', nameCultural: '१८. हळदी सोहळा व झेंडू', nameEnglish: 'Haldi Sunshine', primaryColor: '#D97706', secondaryColor: '#F59E0B', badge: 'हळदी उत्सव', region: 'Festive' },
                { id: 'modern-minimal', nameCultural: '१९. आधुनिक रोझ गोल्ड', nameEnglish: 'Modern Minimal Indo-Western', primaryColor: '#5A3D31', secondaryColor: '#B76E79', badge: 'इंडो-वेस्टर्न', region: 'Modern' },
                { id: 'ashtavinayak-divine', nameCultural: '२०. अष्टविनायक शुभाशीर्वाद', nameEnglish: 'Ashtavinayak Blessings', primaryColor: '#991B1B', secondaryColor: '#D97706', badge: 'श्री गणेश कृपा', region: 'Devbhoomi' }
            ];
        }
    }

    function initThemesModal() {
        const btnOpen = document.getElementById('quickThemesBtn');
        const btnOpenMenu = document.getElementById('btnOpenThemeModal');
        const modal = document.getElementById('themesModal');
        const btnClose = document.getElementById('btnCloseThemeModal');
        const grid = document.getElementById('themeCardsGrid');

        function openModal() {
            renderThemeCards();
            if (modal) modal.classList.remove('gate-dismissed');
        }
        function closeModal() {
            if (modal) modal.classList.add('gate-dismissed');
        }

        if (btnOpen) btnOpen.addEventListener('click', openModal);
        if (btnOpenMenu) btnOpenMenu.addEventListener('click', openModal);
        if (btnClose) btnClose.addEventListener('click', closeModal);
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
        }
    }

    function renderThemeCards() {
        const grid = document.getElementById('themeCardsGrid');
        if (!grid) return;
        grid.innerHTML = '';

        const activeTheme = document.body.getAttribute('data-theme') || 'royal-paithani';

        allThemesList.forEach(t => {
            const isSelected = (t.id === activeTheme);
            const card = document.createElement('div');
            card.style.cssText = `
                background: ${t.bgPreview || '#FFF'};
                border: 2px solid ${isSelected ? '#D4AF37' : 'rgba(212,175,55,0.3)'};
                border-radius: 12px;
                padding: 16px;
                box-shadow: ${isSelected ? '0 8px 25px rgba(212,175,55,0.4)' : '0 4px 12px rgba(0,0,0,0.06)'};
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                position: relative;
                transition: all 0.25s ease;
            `;

            card.innerHTML = `
                <div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                        <span style="background:${t.primaryColor}; color:#FFF; font-size:0.75rem; font-weight:700; padding:2px 8px; border-radius:10px;">${t.badge || t.categoryLabel || 'थीम'}</span>
                        <span style="font-size:0.75rem; color:#888;">${t.region || ''}</span>
                    </div>
                    <h4 style="font-family:'Rozha One',serif; color:${t.primaryColor}; font-size:1.05rem; margin-bottom:4px;">${t.nameCultural || t.nameMarathi || t.nameEnglish}</h4>
                    <p style="font-size:0.8rem; color:#666; margin-bottom:10px;">${t.nameEnglish}</p>
                    <div style="display:flex; gap:6px; margin-bottom:12px;">
                        <span style="width:22px; height:22px; border-radius:50%; background:${t.primaryColor}; border:1px solid #FFF; box-shadow:0 1px 3px rgba(0,0,0,0.2);"></span>
                        <span style="width:22px; height:22px; border-radius:50%; background:${t.secondaryColor}; border:1px solid #FFF; box-shadow:0 1px 3px rgba(0,0,0,0.2);"></span>
                        <span style="width:22px; height:22px; border-radius:50%; background:${t.accentColor || '#B8860B'}; border:1px solid #FFF; box-shadow:0 1px 3px rgba(0,0,0,0.2);"></span>
                    </div>
                </div>
                <button type="button" class="btn-apply-theme" style="
                    background: ${isSelected ? 'linear-gradient(135deg, #00875A, #00A86B)' : 'linear-gradient(135deg, #8B0000, #B22222)'};
                    color: #FFD700;
                    border: 1px solid #FFD700;
                    border-radius: 20px;
                    padding: 7px 14px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    cursor: pointer;
                    width: 100%;
                ">${isSelected ? '✓ सक्रिय थीम (Active)' : 'ही थीम निवडा (Apply)'}</button>
            `;

            const applyBtn = card.querySelector('.btn-apply-theme');
            applyBtn.addEventListener('click', () => {
                document.body.setAttribute('data-theme', t.id);
                localStorage.setItem('activeTheme', t.id);
                SoundFX.flowerTwinkle();
                showFloatingToast(`🎨 '${t.nameCultural || t.nameEnglish}' थीम लागू झाली!`);
                renderThemeCards();
                setTimeout(() => {
                    const modal = document.getElementById('themesModal');
                    if (modal) modal.classList.add('gate-dismissed');
                }, 500);
            });

            grid.appendChild(card);
        });
    }

    // -------------------------------------------------------------
    // 7. FLOATING QUICK SWITCHER DOCK
    // -------------------------------------------------------------
    function initFloatingSwitcherDock() {
        const trigger = document.getElementById('btnToggleFloatingMenu');
        const menu = document.getElementById('floatingStylesMenu');
        if (trigger && menu) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                menu.classList.toggle('is-open');
            });
            document.addEventListener('click', (e) => {
                if (!menu.contains(e.target) && e.target !== trigger) {
                    menu.classList.remove('is-open');
                }
            });
        }

        // Reopen buttons in floating menu
        const reopenBtns = document.querySelectorAll('#floatingStylesMenu [data-reopen]');
        reopenBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const style = btn.getAttribute('data-reopen');
                if (style) {
                    currentOpenStyle = style;
                    localStorage.setItem('weddingOpeningStyle', style);
                    reopenEntranceGate(style);
                    if (menu) menu.classList.remove('is-open');
                }
            });
        });
    }

    // -------------------------------------------------------------
    // 8. TOAST NOTIFICATIONS
    // -------------------------------------------------------------
    function showFloatingToast(message) {
        let toast = document.getElementById('floatingToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'floatingToast';
            toast.style.cssText = `
                position: fixed;
                top: 24px;
                left: 50%;
                transform: translateX(-50%) translateY(-20px);
                background: linear-gradient(135deg, #8B0000, #4A040F);
                color: #FFD700;
                border: 2px solid #FFD700;
                padding: 12px 24px;
                border-radius: 30px;
                font-size: 0.95rem;
                font-weight: 700;
                box-shadow: 0 10px 30px rgba(0,0,0,0.6);
                z-index: 100050;
                opacity: 0;
                transition: all 0.35s cubic-bezier(0.34, 1.3, 0.64, 1);
                pointer-events: none;
                text-align: center;
                max-width: 90vw;
            `;
            document.body.appendChild(toast);
        }
        toast.innerHTML = message;
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(-20px)';
        }, 3200);
    }

    // -------------------------------------------------------------
    // 9. PUBLIC API & LIFECYCLE
    // -------------------------------------------------------------
    window.IndianCultureEngine = {
        init: async function() {
            await loadThemesList();
            initOpeningStyles();
            initThemesModal();
            initFloatingSwitcherDock();
            if (window.currentSettings) {
                this.update(window.currentSettings);
            }
        },
        update: function(settings) {
            if (!settings) return;
            initDigitalShagun(settings);
            initAartiAndBaraat(settings);
            renderDressCode(settings.dressCode);

            // Update couple names in entrance stages
            const g = settings.general || {};
            const coupleName = `चि. सौ. कां. ${g.brideName || 'आदिती'} ❤️ चि. ${g.groomName || 'रोहन'}`;
            const dateStr = `<i class="fa-regular fa-calendar-days"></i> ${g.weddingDateText || 'रविवार, १७ डिसेंबर २०२६'} • ${g.venueName ? g.venueName.split(',')[0] : 'माउली गार्डन'}`;

            ['gateCardCouple', 'gateDoorsCouple', 'gateScrollCouple', 'gateCurtainsCouple', 'gateBookCouple', 'gateBookCoverCouple', 'gateBoxCouple'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.textContent = coupleName;
            });

            ['gateCardDate', 'gateDoorsDate', 'gateScrollDate', 'gateCurtainsDate', 'gateBookDate', 'gateBoxDate'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.innerHTML = dateStr;
            });
        },
        SoundFX: SoundFX,
        showToast: showFloatingToast,
        reopen: reopenEntranceGate
    };

    document.addEventListener('DOMContentLoaded', () => {
        window.IndianCultureEngine.init();
    });

})();
