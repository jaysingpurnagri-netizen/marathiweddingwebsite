const fs = require('fs');
const path = require('path');

function bakeSettingsIntoHtml(html, s) {
    const g = s.general || {};
    const f = s.families || {};
    const sc = s.royalScroll || {};
    const u = s.ukhane || {};

    const bride = g.brideName || 'आदिती';
    const groom = g.groomName || 'रोहन';
    const brideSalut = g.brideSalutation || 'चि. सौ. कां.';
    const groomSalut = g.groomSalutation || 'चिरंजीव';
    const dateText = g.weddingDateText || 'रविवार, १७ डिसेंबर २०२६';
    const muhurtText = g.weddingMuhurtText || 'दुपारी १२ वा. ३५ मि. (गोरज मुहूर्त)';
    const venueName = g.venueName || 'माउली गार्डन';
    const venueAddr = g.venueAddress || 'भारत पेट्रोलियम स्टेशन समोर, बाणेर रोड, पुणे, महाराष्ट्र';
    const venuePhone = g.venuePhone || '+९१ ९८२२० १२३४५';
    const bhojanTime = g.bhojanTime || 'दुपारी १२:४५ ते दुपारी ३:०० वा.';
    const bhojanNote = g.bhojanNote || 'शुभविवाह सोहळ्यानंतर आयोजित स्नेहभोजनाचा (प्रीतीभोजनाचा) आस्वाद घ्यावा ही नम्र विनंती.';
    const swagotsuk = g.swagotsuk || 'समस्त भोरे व वाकोडे परिवार, आप्तेष्ट, काका, मामा, मावशी, भावंडे व स्नेही जन';
    const vinita = g.vinita || 'आपले नम्र: समस्त भोरे परिवार व वाकोडे परिवार';
    const balhatta = g.balhatta || 'काका-काकू, मामा-मामी आमच्या ताईच्या व दादाच्या लग्नाला नक्की नक्की यायचं हं! - कु. चिन्मय, कु. अनन्या आणि बाळगोपाळ';
    const aherNote = g.aherNote || 'कृपया आहेर, पुष्पगुच्छ अथवा भेटवस्तू न आणता केवळ आपली मंगल उपस्थिती व शुभाशीर्वाद हीच बहुमोल भेट!';
    const theme = s.templateId || 'royal-paithani';

    // 1. Set theme on body
    html = html.replace(/<body[^>]*>/i, `<body data-theme="${theme}">`);

    // 2. Set Page Title
    html = html.replace(/<title>.*?<\/title>/i, `<title>${brideSalut} ${bride} आणि ${groomSalut} ${groom} | शुभ विवाह निमंत्रण पत्र</title>`);

    // Helper to replace inner text of an element with given ID
    function replaceElementText(id, newText) {
        if (!newText) return;
        const re = new RegExp(`(<[^>]+id=["']${id}["'][^>]*>)([\\s\\S]*?)(<\\/[^>]+>)`, 'i');
        html = html.replace(re, (m, open, oldContent, close) => {
            return `${open}${newText}${close}`;
        });
    }

    // Direct element replacements
    replaceElementText('headerLogoText', `${bride} & ${groom}`);
    replaceElementText('dynWeddingTitle', g.weddingTitle || 'शुभ विवाह');
    replaceElementText('dynWeddingShloka', g.weddingShloka || 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥');
    replaceElementText('dynKuldaivat', g.kuldaivat || '॥ शिवलक्ष्मी प्रसन्न ॥');
    replaceElementText('dynBrideSalut', brideSalut);
    replaceElementText('dynBrideName', bride);
    replaceElementText('dynBrideGrandparents', g.brideGrandparents || '');
    replaceElementText('dynBrideParents', g.brideParents || '');
    replaceElementText('dynBrideNative', g.brideNativePlace || '');
    replaceElementText('dynGroomSalut', groomSalut);
    replaceElementText('dynGroomName', groom);
    replaceElementText('dynGroomGrandparents', g.groomGrandparents || '');
    replaceElementText('dynGroomParents', g.groomParents || '');
    replaceElementText('dynGroomNative', g.groomNativePlace || '');
    replaceElementText('dynDateText', dateText);
    replaceElementText('dynMuhurtText', muhurtText);
    replaceElementText('dynBhojanTime', bhojanTime);
    replaceElementText('dynBhojanNote', bhojanNote);
    replaceElementText('dynVenueShortText', venueName + ', बाणेर रोड, पुणे');
    replaceElementText('dynVenueName', venueName);
    replaceElementText('dynVenueAddress', venueAddr);
    replaceElementText('dynVenuePhone', venuePhone);
    replaceElementText('dynVenueBhojanTime', bhojanTime);
    replaceElementText('dynVenueBhojanNote', bhojanNote);
    replaceElementText('dynSwagotsuk', swagotsuk);
    replaceElementText('dynVinita', vinita);
    replaceElementText('dynBalhatta', balhatta);
    replaceElementText('dynAherNote', aherNote);
    replaceElementText('dynFooterNames', `${brideSalut} ${bride} & ${groomSalut} ${groom}`);

    // Families
    replaceElementText('dynBHead1', f.brideSideHead1 || '');
    replaceElementText('dynBHead2', f.brideSideHead2 || '');
    replaceElementText('dynBParivar', f.brideSideParivar || '');
    replaceElementText('dynGHead1', f.groomSideHead1 || '');
    replaceElementText('dynGHead2', f.groomSideHead2 || '');
    replaceElementText('dynGParivar', f.groomSideParivar || '');

    // Royal Scroll
    replaceElementText('dynScrollBrideSalut', brideSalut);
    replaceElementText('dynScrollBrideName', bride);
    replaceElementText('dynScrollBrideGrandparents', g.brideGrandparents || '');
    replaceElementText('dynScrollBrideParents', g.brideParents || '');
    replaceElementText('dynScrollBrideNative', g.brideNativePlace || '');
    replaceElementText('dynScrollGroomSalut', groomSalut);
    replaceElementText('dynScrollGroomName', groom);
    replaceElementText('dynScrollGroomGrandparents', g.groomGrandparents || '');
    replaceElementText('dynScrollGroomParents', g.groomParents || '');
    replaceElementText('dynScrollGroomNative', g.groomNativePlace || '');
    replaceElementText('dynScrollDate', dateText);
    replaceElementText('dynScrollMuhurt', muhurtText);
    replaceElementText('dynScrollBhojanTime', bhojanTime);
    replaceElementText('dynScrollVenue', `${venueName}, ${venueAddr}`);
    replaceElementText('dynScrollSwagotsuk', swagotsuk);
    replaceElementText('dynScrollVinita', vinita);
    replaceElementText('dynScrollAherNote', aherNote);

    // Google Maps Link & Embed
    if (g.googleMapsUrl) {
        html = html.replace(/(<a[^>]+id=["']dynGoogleMapsLink["'][^>]*href=["'])[^"']*([ "'])/i, `$1${g.googleMapsUrl}$2`);
    }
    if (g.googleMapsEmbed) {
        html = html.replace(/(<iframe[^>]+id=["']weddingMapIframe["'][^>]*src=["'])[^"']*([ "'])/i, `$1${g.googleMapsEmbed}$2`);
    }

    return html;
}

module.exports = { bakeSettingsIntoHtml };
