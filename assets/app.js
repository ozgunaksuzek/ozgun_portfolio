// ===== App JS (v2) =====
document.addEventListener('DOMContentLoaded', () => {
  // year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // resume modal (open + close)
  const modal = document.getElementById('resumeModal');
  const openBtn = document.getElementById('openResume');
  const closeBtn = modal?.querySelector('.close');
  openBtn?.addEventListener('click', (e) => { e.preventDefault(); modal.showModal(); });
  closeBtn?.addEventListener('click', () => modal.close());

  // i18n: capture EN originals, DE dictionary, toggle + persist
  const i18nEls = [...document.querySelectorAll('[data-i18n]')];
  i18nEls.forEach(el => { if (!el.dataset.i18nEn) el.dataset.i18nEn = (el.textContent || '').trim(); });

  const DE = {
    'nav.projects':'Projekte','nav.experience':'Erfahrung','nav.skills':'Fähigkeiten','nav.contact':'Kontakt','nav.resume':'Lebenslauf',
    'hero.title':'Leistungselektronik • Embedded Systems • Agile/PM',
    'hero.summary':'Elektronik/Embedded-Ingenieurin & zertifizierte Projektmanagerin (PMP®, PMI-ACP®, PSM I) mit 7+ Jahren Erfahrung in Telekommunikation und Flughafensystemen. Derzeit M.Sc. an der FH Joanneum mit Fokus auf Leistungselektronik, Embedded-C (MSP430/ARM) und RF/Analog. Aktuelle Masterarbeit: DCF-77-Empfänger für FMCW-Radar — von PCB-Design bis Firmware.',
    'hero.ctaProjects':'Projekte ansehen','hero.ctaEmail':'E-Mail senden','hero.location':'Mit Sitz in Graz, AT',
    'hero.thesisTitle':'Aktuelle Masterarbeit','hero.thesisDesc':'DCF-77-Empfänger für FMCW-Radar (HW + FW)',
    'hero.certsTitle':'Zertifizierungen','hero.certsDesc':'PMP®, PMI-ACP®, PSM I, IELTS',
    'hero.interestsTitle':'Interessen','hero.interestsDesc':'Leistungskonverter, Magnetics, RF/Analog, DSP, Messtechnik',
    'hero.langTitle':'Sprachen','hero.langDesc':'Englisch (Fließend), Deutsch (B2), Türkisch (Muttersprache)',
    'projects.title':'Ausgewählte Projekte',
    'exp.title':'Erfahrung','skills.title':'Fähigkeiten',
    'contact.title':'Kontakt','contact.blurb':'Offen für Praktika, Werkstudentenstellen und Junior-Positionen in Leistungselektronik, Embedded oder Test Engineering.','contact.send':'Senden',
    'contact.quick':'Kurzinfo','contact.quickDesc':'Graz, Österreich • Aufenthaltsstatus: Resident • Start: sofort',
    'contact.cvEng':'Lebenslauf — Engineering','contact.cvPmp':'Lebenslauf — Projektmanagement',
    'resume.title':'Lebenslauf','resume.subtitle':'Elektronik & Computer Engineering (M.Sc.)','resume.contact':'Kontakt','resume.links':'Links','resume.certs':'Zertifikate','resume.profileTitle':'Profil',
    'resume.profile':'Zertifizierte Projektmanagerin (PMP®, PMI-ACP®, PSM I) mit 7+ Jahren in technischen Großprojekten. Verbindet Führung mit Leistungselektronik, Embedded-C und RF/Analog-Design.',
    'resume.eduTitle':'Ausbildung','resume.projectsTitle':'Projekte','resume.skillsTitle':'Kompetenzen'
  };

  const langBtn = document.getElementById('langToggle');
  let lang = localStorage.getItem('lang') || 'en';

  function apply(langCode) {
    if (langCode === 'de') {
      i18nEls.forEach(el => { const k = el.dataset.i18n; if (DE[k]) el.textContent = DE[k]; });
      langBtn.textContent = 'EN';
    } else {
      i18nEls.forEach(el => { if (el.dataset.i18nEn) el.textContent = el.dataset.i18nEn; });
      langBtn.textContent = 'DE';
    }
    lang = langCode; localStorage.setItem('lang', lang);
  }

  langBtn?.addEventListener('click', () => apply(lang === 'de' ? 'en' : 'de'));
  apply(lang);

  // smooth scroll (header-safe)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id && id.length > 1) {
        const el = document.querySelector(id);
        if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
      }
    });
  });
});
