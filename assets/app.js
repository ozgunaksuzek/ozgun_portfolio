// ===== App JS (v3) — robust DE <-> EN + smooth scroll + modal =====
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

  // EN dictionary (baseline) — prevents losing English when page loads in DE
  const EN = {
    'nav.projects':'Projects','nav.experience':'Experience','nav.skills':'Skills','nav.contact':'Contact','nav.resume':'Resume',
    'hero.title':'Power Electronics • Embedded Systems • Agile/PM',
    'hero.summary':'Electronics/embedded engineer & certified project manager (PMP®, PMI-ACP®, PSM I) with 7+ years in telecom and airport systems. Now pursuing an M.Sc. in Electronics & Computer Engineering at FH Joanneum, focusing on power electronics, embedded C (MSP430/ARM), and RF/analog. Current thesis: building a DCF-77 receiver for FMCW radar — from PCB design to firmware.',
    'hero.ctaProjects':'See Projects','hero.ctaEmail':'Email Me','hero.location':'Based in Graz, AT',
    'hero.thesisTitle':'Current Thesis','hero.thesisDesc':'DCF-77 Receiver for FMCW Radar (HW + FW)',
    'hero.certsTitle':'Certifications','hero.certsDesc':'PMP®, PMI-ACP®, PSM I, IELTS',
    'hero.interestsTitle':'Interests','hero.interestsDesc':'Power converters, magnetics, RF/analog, DSP, test & measurement',
    'hero.langTitle':'Languages','hero.langDesc':'English (Fluent), German (B2), Turkish (Native)',
    'projects.title':'Featured Projects','exp.title':'Experience','skills.title':'Skills',
    'contact.title':'Get in touch','contact.blurb':'Open to internships, working student roles, and junior positions in power electronics, embedded, or test engineering.','contact.send':'Send',
    'contact.quick':'Quick info','contact.quickDesc':'Graz, Austria • Resident • Start: Immediately','contact.cvEng':'CV — Engineering','contact.cvPmp':'CV — Project Management',
    'resume.title':'Resume','resume.subtitle':'Electronics & Computer Engineering (M.Sc.)','resume.contact':'Contact','resume.links':'Links','resume.certs':'Certifications','resume.profileTitle':'Profile',
    'resume.profile':'Certified PMP®, PMI-ACP®, and Scrum Master with 7+ years leading technical projects in telecom and airport systems. Currently advancing an M.Sc. in Electronics & Computer Engineering, bridging project leadership with power electronics, embedded C, and RF/analog design.',
    'resume.eduTitle':'Education','resume.projectsTitle':'Projects','resume.skillsTitle':'Skills'
  };

  // DE dictionary
  const DE = {
    'nav.projects':'Projekte','nav.experience':'Erfahrung','nav.skills':'Fähigkeiten','nav.contact':'Kontakt','nav.resume':'Lebenslauf',
    'hero.title':'Leistungselektronik • Embedded Systems • Agile/PM',
    'hero.summary':'Elektronik/Embedded-Ingenieurin & zertifizierte Projektmanagerin (PMP®, PMI-ACP®, PSM I) mit 7+ Jahren Erfahrung in Telekommunikation und Flughafensystemen. Derzeit M.Sc. an der FH Joanneum mit Fokus auf Leistungselektronik, Embedded-C (MSP430/ARM) und RF/Analog. Aktuelle Masterarbeit: DCF-77-Empfänger für FMCW-Radar — von PCB-Design bis Firmware.',
    'hero.ctaProjects':'Projekte ansehen','hero.ctaEmail':'E-Mail senden','hero.location':'Mit Sitz in Graz, AT',
    'hero.thesisTitle':'Aktuelle Masterarbeit','hero.thesisDesc':'DCF-77-Empfänger für FMCW-Radar (HW + FW)',
    'hero.certsTitle':'Zertifizierungen','hero.certsDesc':'PMP®, PMI-ACP®, PSM I, IELTS',
    'hero.interestsTitle':'Interessen','hero.interestsDesc':'Leistungskonverter, Magnetics, RF/Analog, DSP, Messtechnik',
    'hero.langTitle':'Sprachen','hero.langDesc':'Englisch (Fließend), Deutsch (B2), Türkisch (Muttersprache)',
    'projects.title':'Ausgewählte Projekte','exp.title':'Erfahrung','skills.title':'Fähigkeiten',
    'contact.title':'Kontakt','contact.blurb':'Offen für Praktika, Werkstudentenstellen und Junior-Positionen in Leistungselektronik, Embedded oder Test Engineering.','contact.send':'Senden',
    'contact.quick':'Kurzinfo','contact.quickDesc':'Graz, Österreich • Aufenthaltsstatus: Resident • Start: sofort',
    'contact.cvEng':'Lebenslauf — Engineering','contact.cvPmp':'Lebenslauf — Projektmanagement',
    'resume.title':'Lebenslauf','resume.subtitle':'Elektronik & Computer Engineering (M.Sc.)','resume.contact':'Kontakt','resume.links':'Links','resume.certs':'Zertifikate','resume.profileTitle':'Profil',
    'resume.profile':'Zertifizierte Projektmanagerin (PMP®, PMI-ACP®, PSM I) mit 7+ Jahren in technischen Großprojekten. Verbindet Führung mit Leistungselektronik, Embedded-C und RF/Analog-Design.',
    'resume.eduTitle':'Ausbildung','resume.projectsTitle':'Projekte','resume.skillsTitle':'Kompetenzen'
  };

  // find all i18n nodes once
  const i18nEls = [...document.querySelectorAll('[data-i18n]')];

  // toggle + persist
  const langBtn = document.getElementById('langToggle');
  let lang = localStorage.getItem('lang') || 'en';

  function apply(dict) {
    i18nEls.forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) el.textContent = dict[key];
    });
  }
  function swap(to) {
    if (to === 'de') { apply(DE); langBtn.textContent = 'EN'; }
    else            { apply(EN); langBtn.textContent = 'DE'; }
    localStorage.setItem('lang', to);
    lang = to;
  }

  // initial render (don’t overwrite EN even if last session was DE)
  swap(lang);

  langBtn?.addEventListener('click', () => swap(lang === 'de' ? 'en' : 'de'));

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
