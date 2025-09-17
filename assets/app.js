/* =========================
Portfolio — App JS
========================= */


// 1) Dynamic year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


// 2) Resume modal open/close
const resumeModal = document.getElementById('resumeModal');
const openResumeBtn = document.getElementById('openResume');
if (resumeModal && openResumeBtn) {
openResumeBtn.addEventListener('click', (e)=>{ e.preventDefault(); resumeModal.showModal(); });
}


// 3) i18n — English <-> Deutsch
const dict = {
de: {
'nav.projects':'Projekte','nav.experience':'Erfahrung','nav.skills':'Fähigkeiten','nav.contact':'Kontakt','nav.resume':'Lebenslauf',
'hero.title':'Leistungselektronik • Embedded Systems • Agile/PM',
'hero.summary':'Elektronik/Embedded‑Ingenieurin & zertifizierte Projektmanagerin (PMP®, PMI‑ACP®, PSM I) mit 7+ Jahren Erfahrung in Telekommunikation und Flughafensystemen. Derzeit M.Sc. an der FH Joanneum mit Fokus auf Leistungselektronik, Embedded‑C (MSP430/ARM) und RF/Analog. Aktuelle Masterarbeit: DCF‑77‑Empfänger für FMCW‑Radar — von PCB‑Design bis Firmware.',
'hero.ctaProjects':'Projekte ansehen','hero.ctaEmail':'E‑Mail senden','hero.location':'Mit Sitz in Graz, AT',
'hero.thesisTitle':'Aktuelle Masterarbeit','hero.thesisDesc':'DCF‑77‑Empfänger für FMCW‑Radar (HW + FW)',
'hero.certsTitle':'Zertifizierungen','hero.certsDesc':'PMP®, PMI‑ACP®, PSM I, IELTS',
'hero.interestsTitle':'Interessen','hero.interestsDesc':'Leistungskonverter, Magnetics, RF/Analog, DSP, Messtechnik',
'hero.langTitle':'Sprachen','hero.langDesc':'Englisch (Fließend), Deutsch (B2), Türkisch (Muttersprache)',
'projects.title':'Ausgewählte Projekte','projects.view':'GitHub','projects.report':'Bericht (PDF)','projects.blog':'Blog',
'projects.dcf.title':'DCF‑77‑Empfänger für FMCW‑Radar','projects.dcf.desc':'RF/Analog‑Empfänger (OP‑Amps + diskrete Bauelemente), PCB in Altium und MSP430‑C‑Firmware zur Dekodierung von 60‑Bit‑Zeitdaten und automatischer RTC‑Synchronisierung.',
'projects.bsrc.title':'Serien-/Bidirektionaler Resonanzwandler','projects.bsrc.desc':'LTspice‑Modelle (ZVS/ZCS), Litz‑Trafo, Prototyp aufgebaut und getestet; Effizienz‑ und Transientenanalyse.',
'projects.zybo.title':'PWM über Memory‑Mapped GPIO (Zybo)','projects.zybo.desc':'Kernel‑GPIO vs. MMIO für PWM verglichen; Jitter & Taktgenauigkeit gemessen; mit RTC‑Beispiel integriert.',
'exp.title':'Erfahrung',
'exp.tt.title':'Projektmanager — Türk Telekom','exp.tt.time':'Jun 2022 – Aug 2023 • PMO','exp.tt.b1':'Leitete mehrere technische Projekte; ~20% Kostenreduktion.','exp.tt.b2':'Agile‑Praktiken eingeführt zur Produktivitätssteigerung.','exp.tt.b3':'Kernprojekt: landesweite Einführung von 60+ EV‑Ladestationen inkl. QR‑Zahlung.',
'exp.iga.pm.title':'Projektmanager Spezialsysteme — Flughafen Istanbul','exp.iga.pm.time':'Mai 2019 – Jun 2022','exp.iga.pm.b1':'Kritische Flughafensysteme verantwortet; Ausfallzeiten ~15% reduziert.','exp.iga.pm.b2':'Lieferanten‑/Vertragsmanagement.','exp.iga.pm.b3':'Projekte: VDGS & Fluggastbrücken (PBB).',
'exp.iga.eng.title':'Ingenieur Spezialsysteme — Flughafen Istanbul','exp.iga.eng.time':'Apr 2017 – Mai 2019','exp.iga.eng.b1':'Schaltpläne für Echtzeit‑Monitoring (↑ Genauigkeit ~25%).','exp.iga.eng.b2':'Zusammenarbeit mit SW/HW‑Teams.',
'exp.otomatica.title':'Projektingenieur — Otomatica','exp.otomatica.time':'Feb 2016 – Jul 2016','exp.otomatica.b1':'HVAC‑Automatisierung; Baustellenbetreuung.',
'exp.keytorc.title':'Softwaretest‑Ingenieur — Keytorc','exp.keytorc.time':'Aug 2015 – Dez 2015','exp.keytorc.b1':'Selenium‑Automatisierung; Regressionstests.',
'skills.title':'Fähigkeiten','skills.power':'Leistungselektronik','skills.powerDesc':'Resonanz, Magnetics, Isolation','skills.embed':'Embedded C','skills.embedDesc':'MSP430, ARM, RTC/GPIO/PWM','skills.edasim':'EDA & Simulation','skills.edasimDesc':'Altium, OrCAD, LTspice','skills.rf':'RF/Analog','skills.rfDesc':'OP‑Amps, Filter, Komparatoren','skills.pm':'Projektmanagement','skills.pmDesc':'PMP, PMI‑ACP, Scrum','skills.lead':'Führung','skills.leadDesc':'Stakeholder, Lieferanten, PMO','skills.soft':'Soft Skills','skills.softDesc':'Kommunikation, Teamarbeit','skills.langs':'Sprachen','skills.langsDesc':'EN (Fließend), DE (B2), TR',
'contact.quick':'Kurzinfo','contact.quickDesc':'Graz, Österreich • Aufenthaltsstatus: Resident • Start: sofort','contact.cvEng':'Lebenslauf — Engineering','contact.cvPmp':'Lebenslauf — Projektmanagement','contact.transcript':'Zeugnis',
'resume.title':'Lebenslauf','resume.subtitle':'Elektronik & Computer Engineering (M.Sc.)','resume.contact':'Kontakt','resume.links':'Links','resume.certs':'Zertifikate','resume.profileTitle':'Profil','resume.profile':'Zertifizierte Projektmanagerin (PMP®, PMI‑ACP®, PSM I) mit 7+ Jahren in technischen Großprojekten. Verbindet Führung mit Leistungselektronik, Embedded‑C und RF/Analog‑Design.','resume.eduTitle':'Ausbildung','resume.projectsTitle':'Projekte','resume.expTitle':'Berufserfahrung','resume.skillsTitle':'Kompetenzen'
}
};


const toggleBtn = document.getElementById('langToggle');
let currentLang = localStorage.getItem('lang') || 'en';


function applyLang(lang){
document.querySelectorAll('[data-i18n]').forEach(el=>{
const key = el.getAttribute('data-i18n');
const value = dict[lang]?.[key];
if(value) el.textContent = value;
});
if (toggleBtn) toggleBtn.textContent = lang==='de' ? 'EN' : 'DE';
currentLang = lang;
localStorage.setItem('lang', lang);
}


if (toggleBtn){
toggleBtn.addEventListener('click',()=>{
applyLang(currentLang==='de' ? 'en' : 'de');
});
}


// Apply saved language on load
if (currentLang==='de') applyLang('de');


// 4) Smooth scroll for internal nav links
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(a=>{
a.addEventListener('click', (e)=>{
const id = a.getAttribute('href');
if (id.length > 1){
e.preventDefault();
document.querySelector(id)?.scrollIntoView({behavior:'smooth'});
}
});
});
