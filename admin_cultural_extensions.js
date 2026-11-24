/**
 * admin_cultural_extensions.js
 * Extends the Admin Dashboard with:
 * 1. 6 Invitation Opening Styles Visual Selector
 * 2. Digital Shagun & UPI Settings with Live QR Preview
 * 3. Live RSVP Management Table with Metrics & CSV Export
 * 4. Dress Code & Color Palette Editor
 */

(function() {
    'use strict';

    // -------------------------------------------------------------
    // 1. OPENING STYLES SELECTOR
    // -------------------------------------------------------------
    function initOpeningStylesTab() {
        const activeStyle = (window.weddingSettings && window.weddingSettings.openingStyle) ? window.weddingSettings.openingStyle : 'envelope-wax';
        updateActiveStyleCard(activeStyle);

        // Bind clicks on style cards and buttons
        const cards = document.querySelectorAll('.opening-style-card');
        cards.forEach(card => {
            const styleId = card.getAttribute('data-style-card');
            card.addEventListener('click', (e) => {
                selectOpeningStyle(styleId);
            });
            const btn = card.querySelector('.btn-select-style');
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    selectOpeningStyle(styleId);
                });
            }
        });
    }

    function selectOpeningStyle(styleId) {
        if (!styleId) return;
        if (!window.weddingSettings) window.weddingSettings = {};
        window.weddingSettings.openingStyle = styleId;
        updateActiveStyleCard(styleId);

        if (typeof window.markDirty === 'function') {
            window.markDirty();
        }

        // Show toast
        const names = {
            'envelope-wax': 'मेणाची राजमुद्रा पाकीट (Wax Seal Envelope)',
            'temple-doors': 'मंदिर महाद्वार व पितळी घंटा (Temple Doors)',
            'royal-scroll': 'गुंडाळलेला शाही फर्मान (Royal Farman)',
            'silk-curtains': 'रेशमी मखमली पडदा (Silk Curtains)',
            'book-flip': '३D लग्नपत्रिका बुक (Book Flip)',
            'shagun-box': 'शाही शगुन पेटी (Jewel Box)'
        };
        if (typeof window.showToast === 'function') {
            window.showToast(`✓ '${names[styleId] || styleId}' मुख्य ओपनिंग स्टाईल म्हणून निवडली! 'सर्व बदल सेव्ह करा' वर क्लिक करा.`);
        }
    }

    function updateActiveStyleCard(styleId) {
        const cards = document.querySelectorAll('.opening-style-card');
        cards.forEach(card => {
            const sid = card.getAttribute('data-style-card');
            const btn = card.querySelector('.btn-select-style');
            if (sid === styleId) {
                card.classList.add('is-active-style');
                if (btn) btn.textContent = '✓ सक्रिय स्टाईल (Active)';
            } else {
                card.classList.remove('is-active-style');
                if (btn) btn.textContent = 'ही स्टाईल निवडा';
            }
        });
    }

    // -------------------------------------------------------------
    // 2. DIGITAL SHAGUN & UPI SETTINGS
    // -------------------------------------------------------------
    function initShagunSettingsTab() {
        const s = (window.weddingSettings && window.weddingSettings.shagun) ? window.weddingSettings.shagun : {
            upiId: 'aditya.sadhana@okaxis',
            payeeName: 'Aditya & Sadhana Vivah',
            note: 'सस्नेह शुभाशीर्वाद व डिजिटल आहेर',
            amounts: [501, 1101, 2101, 5101]
        };

        const upiInput = document.getElementById('cfgUpiId');
        const nameInput = document.getElementById('cfgPayeeName');
        const noteInput = document.getElementById('cfgShagunNote');
        const a1 = document.getElementById('cfgAmt1');
        const a2 = document.getElementById('cfgAmt2');
        const a3 = document.getElementById('cfgAmt3');
        const a4 = document.getElementById('cfgAmt4');

        if (upiInput) upiInput.value = s.upiId || 'aditya.sadhana@okaxis';
        if (nameInput) nameInput.value = s.payeeName || 'Aditya & Sadhana Vivah';
        if (noteInput) noteInput.value = s.note || 'सस्नेह शुभाशीर्वाद व डिजिटल आहेर';

        const amounts = s.amounts || [501, 1101, 2101, 5101];
        if (a1 && amounts[0]) a1.value = amounts[0];
        if (a2 && amounts[1]) a2.value = amounts[1];
        if (a3 && amounts[2]) a3.value = amounts[2];
        if (a4 && amounts[3]) a4.value = amounts[3];

        function onShagunChange() {
            if (!window.weddingSettings) window.weddingSettings = {};
            window.weddingSettings.shagun = {
                upiId: (upiInput && upiInput.value.trim()) || 'aditya.sadhana@okaxis',
                payeeName: (nameInput && nameInput.value.trim()) || 'Aditya & Sadhana Vivah',
                note: (noteInput && noteInput.value.trim()) || 'सस्नेह शुभाशीर्वाद व डिजिटल आहेर',
                amounts: [
                    parseInt(a1 ? a1.value : 501, 10) || 501,
                    parseInt(a2 ? a2.value : 1101, 10) || 1101,
                    parseInt(a3 ? a3.value : 2101, 10) || 2101,
                    parseInt(a4 ? a4.value : 5101, 10) || 5101
                ]
            };

            // Update live QR preview
            const qrPreview = document.getElementById('adminQrPreview');
            if (qrPreview) {
                const upiUri = `upi://pay?pa=${encodeURIComponent(window.weddingSettings.shagun.upiId)}&pn=${encodeURIComponent(window.weddingSettings.shagun.payeeName)}&am=1101&cu=INR&tn=${encodeURIComponent(window.weddingSettings.shagun.note)}`;
                qrPreview.src = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(upiUri)}`;
            }

            if (typeof window.markDirty === 'function') window.markDirty();
        }

        [upiInput, nameInput, noteInput, a1, a2, a3, a4].forEach(el => {
            if (el) el.addEventListener('input', onShagunChange);
        });

        onShagunChange();
    }

    // -------------------------------------------------------------
    // 3. LIVE RSVP MANAGEMENT DASHBOARD
    // -------------------------------------------------------------
    let allRsvps = [];

    async function initRsvpManagerTab() {
        await loadRsvps();

        const searchInput = document.getElementById('rsvpSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                const q = searchInput.value.toLowerCase().trim();
                const filtered = allRsvps.filter(r => 
                    (r.name && r.name.toLowerCase().includes(q)) || 
                    (r.phone && r.phone.toLowerCase().includes(q)) ||
                    (r.message && r.message.toLowerCase().includes(q))
                );
                renderRsvpTable(filtered);
            });
        }

        const refreshBtn = document.getElementById('btnRefreshRsvps');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', async () => {
                await loadRsvps();
                if (typeof window.showToast === 'function') {
                    window.showToast("✓ RSVPs यादी ताजी झाली!");
                }
            });
        }

        const exportBtn = document.getElementById('btnExportRsvpsCsv');
        if (exportBtn) {
            exportBtn.addEventListener('click', exportRsvpsToCsv);
        }
    }

    async function loadRsvps() {
        try {
            const res = await fetch('/api/rsvp?_t=' + Date.now());
            if (res.ok) {
                allRsvps = await res.json();
            } else {
                const resStatic = await fetch('rsvps.json?_t=' + Date.now());
                if (resStatic.ok) allRsvps = await resStatic.json();
            }
        } catch(e) {
            // Local fallback
            try {
                const local = localStorage.getItem('weddingRSVPs');
                if (local) allRsvps = JSON.parse(local);
            } catch(err){}
        }

        if (!allRsvps || !allRsvps.length) {
            allRsvps = [
                {
                    name: 'राजेश व सुप्रिया कुलकर्णी',
                    phone: '+91 98220 54321',
                    guests: 3,
                    status: 'yes',
                    food: 'pure-veg',
                    stay: 'yes',
                    message: 'आदित्य आणि साधना, तुम्हाला लग्नाच्या खूप खूप शुभेच्छा!'
                },
                {
                    name: 'अमित व स्नेहा देशमुख',
                    phone: '+91 98500 12345',
                    guests: 2,
                    status: 'yes',
                    food: 'pure-veg',
                    stay: 'no',
                    message: 'खूप खूप अभिनंदन! आम्ही नक्की येत आहोत.'
                },
                {
                    name: 'डॉ. विजय व रेखा वाकोडे (काका-काकू)',
                    phone: '+91 97654 98765',
                    guests: 4,
                    status: 'yes',
                    food: 'jain',
                    stay: 'yes',
                    message: 'दोघांनाही सुखी संसारासाठी मनःपूर्वक शुभाशीर्वाद!'
                }
            ];
        }

        updateRsvpMetrics(allRsvps);
        renderRsvpTable(allRsvps);
    }

    function updateRsvpMetrics(list) {
        const total = list.length;
        let totalGuests = 0;
        let vegCount = 0;
        let stayCount = 0;

        list.forEach(r => {
            const g = parseInt(r.guests, 10) || 1;
            totalGuests += g;
            if (r.food === 'pure-veg' || r.food === 'jain') vegCount++;
            if (r.stay === 'yes') stayCount++;
        });

        const mTotal = document.getElementById('metricTotalRsvps');
        const mGuests = document.getElementById('metricTotalGuests');
        const mVeg = document.getElementById('metricPureVeg');
        const mStay = document.getElementById('metricStayRooms');

        if (mTotal) mTotal.textContent = total;
        if (mGuests) mGuests.textContent = totalGuests;
        if (mVeg) mVeg.textContent = vegCount;
        if (mStay) mStay.textContent = stayCount;
    }

    function renderRsvpTable(list) {
        const tbody = document.getElementById('rsvpTableBody');
        if (!tbody) return;
        tbody.innerHTML = '';

        if (!list.length) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:20px; color:#888;">कोणतीही नोंद सापडली नाही.</td></tr>';
            return;
        }

        list.forEach((r, idx) => {
            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid #EEE';

            const statusBadge = (r.status === 'regret') 
                ? '<span style="background:#FEE2E2; color:#B91C1C; padding:3px 8px; border-radius:10px; font-size:0.75rem; font-weight:700;">येऊ शकत नाही</span>'
                : '<span style="background:#DCFCE7; color:#15803D; padding:3px 8px; border-radius:10px; font-size:0.75rem; font-weight:700;">✓ उपस्थित</span>';

            const foodBadge = (r.food === 'jain')
                ? '<span style="color:#B45309; font-weight:700;">जैन (Jain)</span>'
                : '<span style="color:#047857; font-weight:600;">शाकाहारी</span>';

            const stayText = (r.stay === 'yes') ? '<span style="color:#8E44AD; font-weight:700;">हवी</span>' : '<span style="color:#888;">नको</span>';

            tr.innerHTML = `
                <td style="padding:10px; font-weight:700; color:#800020;">${r.name || 'अनामिक'}</td>
                <td style="padding:10px; color:#555;">${r.phone || '-'}</td>
                <td style="padding:10px; text-align:center; font-weight:700;">${r.guests || 1}</td>
                <td style="padding:10px;">${statusBadge}</td>
                <td style="padding:10px;">${foodBadge}</td>
                <td style="padding:10px; text-align:center;">${stayText}</td>
                <td style="padding:10px; font-size:0.85rem; color:#444; max-width:240px;">${r.message || '-'}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    function exportRsvpsToCsv() {
        if (!allRsvps.length) {
            alert('डाऊनलोड करण्यासाठी कोणतीही RSVP नोंद उपलब्ध नाही.');
            return;
        }

        const headers = ['नाव (Name)', 'फोन (Phone)', 'व्यक्ती संख्या (Guests)', 'उपस्थिती (Status)', 'भोजन (Food)', 'निवास (Stay)', 'संदेश (Message)'];
        const rows = allRsvps.map(r => [
            `"${(r.name || '').replace(/"/g, '""')}"`,
            `"${(r.phone || '').replace(/"/g, '""')}"`,
            r.guests || 1,
            `"${r.status || 'yes'}"`,
            `"${r.food || 'pure-veg'}"`,
            `"${r.stay || 'no'}"`,
            `"${(r.message || '').replace(/"/g, '""')}"`
        ]);

        const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `wedding_rsvps_${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // -------------------------------------------------------------
    // 4. DRESS CODE & COLOR PALETTE EDITOR
    // -------------------------------------------------------------
    function initDresscodeAdmin() {
        const container = document.getElementById('dresscodeListAdmin');
        if (!container) return;

        const list = (window.weddingSettings && window.weddingSettings.dressCode && window.weddingSettings.dressCode.length)
            ? window.weddingSettings.dressCode
            : [
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

        container.innerHTML = '';
        list.forEach((item, idx) => {
            const card = document.createElement('div');
            card.className = 'admin-card';
            card.style.cssText = 'background:#FFF; border:1px solid #DDD; border-radius:12px; padding:18px;';

            const colorsHtml = (item.colors || ['#FFB703', '#F59E0B', '#D4AF37', '#800020']).map((c, ci) => `
                <div style="display:flex; align-items:center; gap:6px;">
                    <input type="color" value="${c}" data-dc-color="${ci}" style="width:36px; height:36px; border-radius:50%; border:none; cursor:pointer;">
                    <input type="text" value="${c}" data-dc-hex="${ci}" style="width:75px; font-size:0.8rem; padding:4px 6px; border:1px solid #DDD; border-radius:4px;">
                </div>
            `).join('');

            card.innerHTML = `
                <div class="form-row">
                    <div class="form-group" style="flex:1;">
                        <label>समारंभाचे नाव (Event)</label>
                        <input type="text" value="${item.event || ''}" data-dc-event style="font-weight:700;">
                    </div>
                    <div class="form-group" style="flex:2;">
                        <label>सुचवलेला पोशाख (Attire / Dress Code)</label>
                        <input type="text" value="${item.attire || ''}" data-dc-attire>
                    </div>
                </div>
                <div class="form-group">
                    <label>विशेष टीप / दागिने / फेटा (Notes)</label>
                    <input type="text" value="${item.notes || ''}" data-dc-notes>
                </div>
                <div class="form-group">
                    <label>रंग पॅलेट (Palette Colors - 4 Swatches)</label>
                    <div style="display:flex; gap:14px; flex-wrap:wrap;">
                        ${colorsHtml}
                    </div>
                </div>
            `;

            // Bind change handlers
            card.querySelectorAll('input').forEach(input => {
                input.addEventListener('input', () => {
                    const eventVal = card.querySelector('[data-dc-event]').value;
                    const attireVal = card.querySelector('[data-dc-attire]').value;
                    const notesVal = card.querySelector('[data-dc-notes]').value;
                    const colors = [];
                    card.querySelectorAll('[data-dc-color]').forEach(cp => colors.push(cp.value));

                    list[idx] = {
                        event: eventVal,
                        attire: attireVal,
                        notes: notesVal,
                        colors: colors
                    };
                    if (!window.weddingSettings) window.weddingSettings = {};
                    window.weddingSettings.dressCode = list;
                    if (typeof window.markDirty === 'function') window.markDirty();
                });
            });

            container.appendChild(card);
        });
    }

    // -------------------------------------------------------------
    // 5. EXTEND POPULATE & COLLECT PIPELINE
    // -------------------------------------------------------------
    document.addEventListener('DOMContentLoaded', () => {
        // Delay slightly to ensure main admin.js has loaded settings
        setTimeout(() => {
            initOpeningStylesTab();
            initShagunSettingsTab();
            initRsvpManagerTab();
            initDresscodeAdmin();
        }, 500);
    });

    // Hook into global scope
    window.CulturalExtensions = {
        initOpeningStyles: initOpeningStylesTab,
        initShagun: initShagunSettingsTab,
        initRsvp: initRsvpManagerTab,
        initDresscode: initDresscodeAdmin
    };

})();
