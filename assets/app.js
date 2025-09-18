// ===== App JS (v4) — 24h clock, full EN<->DE i18n, smooth scroll, modal =====
document.addEventListener('DOMContentLoaded', () => {
  // year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // 24h live clock
  const clock = document.getElementById('clock');
  function fmt(n){ return n < 10 ? '0'+n : ''+n; }
  function swap(to){
  const de = (to==='de');
  if(de){ apply(DE); langBtn.textContent='EN'; langBtn.setAttribute('aria-label','Switch to English'); }
  else { apply(EN); langBtn.textContent='DE'; langBtn.setAttribute('aria-label','Switch to German'); }
  langBtn.setAttribute('aria-pressed', String(de));
  localStorage.setItem('lang', to); lang = to;
}

  function tick(){
    const d = new Date();
    const t = `${fmt(d.getHours())}:${fmt(d.getMinutes())}:${fmt(d.getSeconds())}`;
    if (clock) clock.textContent = t;
  }
  tick(); setInterval(tick, 1000);

  // resume modal
  const modal = document.getElementById('resumeModal');
  const openBtn = document.getElementById('openResume');
  const closeBtn = modal?.querySelector('.close');
  openBtn?.addEventListener('click', (e) => { e.preventDefault(); modal.showModal(); });
  closeBtn?.addEventListener('click', () => modal.close());

  // --- i18n dictionaries ---
  const EN = {
    'header.subtitle':'Project Manager & Electronics & Computer Engineer',
    'header.localtime':'Local time',
    'nav.projects':'Projects','nav.experience':'Experience','nav.education':'Education','nav.skills':'Skills','nav.contact':'Contact','nav.resume':'Resume',
    'hero.title':'Power Electronics • Embedded Systems • Agile/PM',
    'hero.summary':'Electronics/embedded engineer & certified project manager (PMP®, PMI-ACP®, PSM I) with 7+ years in telecom and airport systems. Now pursuing an M.Sc. in Electronics & Computer Engineering at FH Joanneum, focusing on power electronics, embedded C (MSP430/ARM), and RF/analog. Current thesis: building a DCF-77 receiver for FMCW radar — from PCB design to firmware.',
    'hero.ctaProjects':'See Projects','hero.ctaEmail':'Email Me','hero.location':'Based in Graz, AT',
    'hero.thesisTitle':'Current Thesis','hero.thesisDesc':'DCF-77 Receiver for FMCW Radar (HW + FW)',
    'hero.certsTitle':'Certifications','hero.certsDesc':'PMP®, PMI-ACP®, PSM I, IELTS',
    'hero.interestsTitle':'Interests','hero.interestsDesc':'Power converters, magnetics, RF/analog, DSP, test & measurement',
    'hero.langTitle':'Languages','hero.langDesc':'English (Fluent), German (B2), Turkish (Native)',
    'projects.title':'Featured Projects',
    'prj.dcf.title':'DCF-77 Receiver for FMCW Radar',
    'prj.dcf.desc':'RF/analog front-end + MSP430 C firmware decoding 60-bit time data; automatic RTC sync for embedded radar. PCB in Altium.',
    'prj.res.title':'Series/Bidirectional Resonant Converter',
    'prj.res.desc':'LTspice modeling of resonant topologies (ZVS/ZCS), transformer design with Litz wire, prototype build and performance analysis.',
    'prj.pwm.title':'PWM via Memory-Mapped GPIO (Zybo)',
    'prj.pwm.desc':'Compared kernel GPIO vs. MMIO for PWM; measured jitter & clock precision under system load; integrated with RTC example.',
    'exp.title':'Experience',
    'exp.tt.title':'Project Manager — Türk Telekom','exp.tt.time':'Jun 2022 – Aug 2023 • PMO',
    'exp.tt.b1':'Directed multiple technical projects; improved workflows and reduced operational costs ~20%.',
    'exp.tt.b2':'Agile practices to enhance team productivity and delivery.',
    'exp.tt.b3':'Led nationwide rollout of 60+ EV charging stations; coordinated vendors; QR-payment integration.',
    'exp.iga.pm.title':'Special Airport System Project Manager — İGA İstanbul Airport','exp.iga.pm.time':'May 2019 – Jun 2022',
    'exp.iga.pm.b1':'Oversaw mission-critical airport systems; downtime reduced ~15% via proactive testing.',
    'exp.iga.pm.b2':'Vendor/contract management for large-scale deployments.',
    'exp.iga.pm.b3':'Projects: VDGS and Passenger Boarding Bridges (PBB) installation & integration.',
    'exp.iga.eng.title':'Special Airport System Engineer — İGA İstanbul Airport','exp.iga.eng.time':'Apr 2017 – May 2019',
    'exp.iga.eng.b1':'Designed/optimized electrical schematics for real-time monitoring systems (↑ accuracy ~25%).',
    'exp.iga.eng.b2':'Cross-functional collaboration with HW/SW teams to deploy secure systems.',
    'edu.title':'Education',
    'edu.fh.title':'FH Joanneum — M.Sc. Electronics & Computer Engineering',
    'edu.fh.time':'Aug 2023 – Present',
    'edu.fh.b1':'Focus: Power Electronics, Embedded C (MSP430/ARM), RF/Analog.',
    'edu.fh.b2':'Master’s thesis: DCF-77 receiver for FMCW radar (HW + FW).',
    
    'edu.ytu.title':'Yildiz Technical University — MBA',
    'edu.ytu.time':'2018 – 2020',
    'edu.ytu.b1':'Management, finance, operations, and leadership.',
    
    'edu.sau.title':'Sakarya University — B.Sc. Electrical & Electronic Engineering',
    'edu.sau.time':'2008 – 2014',
    'edu.sau.b1':'Foundations in circuits, embedded systems, and power electronics.',
    'skills.title':'Skills',
    'skills.power':'Power Electronics','skills.powerDesc':'Resonant, magnetics, isolation',
    'skills.embed':'Embedded C','skills.embedDesc':'MSP430, ARM, RTC/GPIO/PWM',
    'skills.edasim':'EDA & Simulation','skills.edasimDesc':'Altium, OrCAD, LTspice',
    'skills.rf':'RF/Analog','skills.rfDesc':'Op-amps, filters, comparators',
    'skills.pm':'Project Management','skills.pmDesc':'PMP, PMI-ACP, Scrum',
    'skills.lead':'Leadership','skills.leadDesc':'Stakeholders, vendors, PMO',
    'skills.soft':'Soft Skills','skills.softDesc':'Communication, teamwork',
    'skills.langs':'Languages','skills.langsDesc':'EN (Fluent), DE (B2), TR',
    'contact.title':'Get in touch',
    'contact.blurb':'Open to internships, working student roles, and junior positions in power electronics, embedded, or test engineering.',
    'contact.name':'Name','contact.email':'Email','contact.msg':'Message','contact.send':'Send',
    'contact.quick':'Quick info','contact.quickDesc':'Graz, Austria • Resident • Start: Immediately',
    'contact.cvEng':'CV — Engineering','contact.cvPmp':'CV — Project Management',
    'resume.title':'Resume','resume.subtitle':'Electronics & Computer Engineering (M.Sc.)',
    'resume.contact':'Contact','resume.links':'Links','resume.certs':'Certifications','resume.profileTitle':'Profile',
    'resume.profile':'Certified PMP®, PMI-ACP®, and Scrum Master with 7+ years leading technical projects in telecom and airport systems. Currently advancing an M.Sc. in Electronics & Computer Engineering, bridging project leadership with power electronics, embedded C, and RF/analog design.',
    'resume.eduTitle':'Education','resume.projectsTitle':'Projects','resume.skillsTitle':'Skills',
    'resume.edu1':'FH Joanneum — M.Sc. Electronics & Computer Engineering (Aug 2023 – Present)',
    'resume.edu2':'Yildiz Technical University — MBA (2018 – 2020)',
    'resume.edu3':'Sakarya University — B.Sc. Electrical & Electronic Engineering (2008 – 2014)',
    'resume.pr1':'DCF-77 Receiver: RF receiver + MSP430 firmware for embedded radar RTC synchronization.',
    'resume.pr2':'Series/Bidirectional Resonant Converter: LTspice simulations, transformer design, prototype and performance evaluation.',
    'resume.sk1':'Power Electronics, Embedded C (MSP430/ARM), RF/Analog design.',
    'resume.sk2':'EDA/Simulation: Altium, OrCAD, LTspice; MATLAB/Simulink; Python; VHDL.',
    'resume.sk3':'Project Management: PMP®, PMI-ACP®, Scrum; Risk, PMO reporting; Stakeholder & Vendor management.',
    'resume.sk4':'Languages: English (Fluent), German (B2), Turkish (Native).'
  };

  const DE = {
    'header.subtitle':'Projektmanagerin & Elektronik- & Computer-Ingenieurin',
    'header.localtime':'Ortszeit',
    'nav.projects':'Projekte','nav.experience':'Erfahrung','nav.education':'Ausbildung','nav.skills':'Fähigkeiten','nav.contact':'Kontakt','nav.resume':'Lebenslauf',
    'hero.title':'Leistungselektronik • Embedded Systems • Agile/PM',
    'hero.summary':'Elektronik/Embedded-Ingenieurin & zertifizierte Projektmanagerin (PMP®, PMI-ACP®, PSM I) mit 7+ Jahren Erfahrung in Telekommunikation und Flughafensystemen. Derzeit M.Sc. an der FH Joanneum mit Fokus auf Leistungselektronik, Embedded-C (MSP430/ARM) und RF/Analog. Aktuelle Masterarbeit: DCF-77-Empfänger für FMCW-Radar — von PCB-Design bis Firmware.',
    'hero.ctaProjects':'Projekte ansehen','hero.ctaEmail':'E-Mail senden','hero.location':'Mit Sitz in Graz, AT',
    'hero.thesisTitle':'Aktuelle Masterarbeit','hero.thesisDesc':'DCF-77-Empfänger für FMCW-Radar (HW + FW)',
    'hero.certsTitle':'Zertifizierungen','hero.certsDesc':'PMP®, PMI-ACP®, PSM I, IELTS',
    'hero.interestsTitle':'Interessen','hero.interestsDesc':'Leistungskonverter, Magnetics, RF/Analog, DSP, Messtechnik',
    'hero.langTitle':'Sprachen','hero.langDesc':'Englisch (Fließend), Deutsch (B2), Türkisch (Muttersprache)',
    'projects.title':'Ausgewählte Projekte',
    'prj.dcf.title':'DCF-77-Empfänger für FMCW-Radar',
    'prj.dcf.desc':'RF/Analog-Frontend + MSP430-C-Firmware zur Dekodierung von 60-Bit-Zeitdaten; automatische RTC-Synchronisierung. PCB in Altium.',
    'prj.res.title':'Serien-/Bidirektionaler Resonanzwandler',
    'prj.res.desc':'LTspice-Modellierung von Resonanztopologien (ZVS/ZCS), Trafo-Design mit Litzdraht, Prototypenbau und Performance-Analyse.',
    'prj.pwm.title':'PWM über Memory-Mapped GPIO (Zybo)',
    'prj.pwm.desc':'Kernel-GPIO vs. MMIO für PWM verglichen; Jitter & Taktgenauigkeit unter Last gemessen; mit RTC-Beispiel integriert.',
    'exp.title':'Erfahrung',
    'exp.tt.title':'Projektmanager — Türk Telekom','exp.tt.time':'Jun 2022 – Aug 2023 • PMO',
    'exp.tt.b1':'Leitete mehrere technische Projekte; ~20% Kostenreduktion.','exp.tt.b2':'Agile-Praktiken eingeführt.','exp.tt.b3':'Landesweite Einführung von 60+ EV-Ladestationen inkl. QR-Zahlung.',
    'exp.iga.pm.title':'Projektmanager Spezialsysteme — Flughafen Istanbul','exp.iga.pm.time':'Mai 2019 – Jun 2022',
    'exp.iga.pm.b1':'Verantwortlich für kritische Flughafensysteme; Ausfallzeiten ~15% reduziert.',
    'exp.iga.pm.b2':'Lieferanten- und Vertragsmanagement.',
    'exp.iga.pm.b3':'Projekte: VDGS & Fluggastbrücken (PBB).',
    'exp.iga.eng.title':'Ingenieur Spezialsysteme — Flughafen Istanbul','exp.iga.eng.time':'Apr 2017 – Mai 2019',
    'exp.iga.eng.b1':'Schaltpläne für Echtzeit-Monitoring (↑ Genauigkeit ~25%).',
    'exp.iga.eng.b2':'Zusammenarbeit mit HW/SW-Teams.',
    'edu.title':'Ausbildung',
    'edu.fh.title':'FH Joanneum — M.Sc. Electronics & Computer Engineering',
    'edu.fh.time':'Aug 2023 – heute',
    'edu.fh.b1':'Schwerpunkte: Leistungselektronik, Embedded-C (MSP430/ARM), RF/Analog.',
    'edu.fh.b2':'Masterarbeit: DCF-77-Empfänger für FMCW-Radar (HW + FW).',
    
    'edu.ytu.title':'Yildiz Technical University — MBA',
    'edu.ytu.time':'2018 – 2020',
    'edu.ytu.b1':'Management, Finanzen, Prozesse und Führung.',
    
    'edu.sau.title':'Sakarya University — B.Sc. Electrical & Electronic Engineering',
    'edu.sau.time':'2008 – 2014',
    'edu.sau.b1':'Grundlagen in Schaltungen, Embedded-Systemen und Leistungselektronik.',
    'skills.title':'Fähigkeiten',
    'skills.power':'Leistungselektronik','skills.powerDesc':'Resonanz, Magnetics, Isolation',
    'skills.embed':'Embedded-C','skills.embedDesc':'MSP430, ARM, RTC/GPIO/PWM',
    'skills.edasim':'EDA & Simulation','skills.edasimDesc':'Altium, OrCAD, LTspice',
    'skills.rf':'RF/Analog','skills.rfDesc':'OP-Amps, Filter, Komparatoren',
    'skills.pm':'Projektmanagement','skills.pmDesc':'PMP, PMI-ACP, Scrum',
    'skills.lead':'Führung','skills.leadDesc':'Stakeholder, Lieferanten, PMO',
    'skills.soft':'Soft Skills','skills.softDesc':'Kommunikation, Teamarbeit',
    'skills.langs':'Sprachen','skills.langsDesc':'EN (Fließend), DE (B2), TR',
    'contact.title':'Kontakt',
    'contact.blurb':'Offen für Praktika, Werkstudentenstellen und Junior-Positionen in Leistungselektronik, Embedded oder Test Engineering.',
    'contact.name':'Name','contact.email':'E-Mail','contact.msg':'Nachricht','contact.send':'Senden',
    'contact.quick':'Kurzinfo','contact.quickDesc':'Graz, Österreich • Aufenthaltsstatus: Resident • Start: sofort',
    'contact.cvEng':'Lebenslauf — Engineering','contact.cvPmp':'Lebenslauf — Projektmanagement',
    'resume.title':'Lebenslauf','resume.subtitle':'Elektronik & Computer Engineering (M.Sc.)',
    'resume.contact':'Kontakt','resume.links':'Links','resume.certs':'Zertifikate','resume.profileTitle':'Profil',
    'resume.profile':'Zertifizierte Projektmanagerin (PMP®, PMI-ACP®, PSM I) mit 7+ Jahren in technischen Großprojekten. Verbindet Führung mit Leistungselektronik, Embedded-C und RF/Analog-Design.',
    'resume.eduTitle':'Ausbildung','resume.projectsTitle':'Projekte','resume.skillsTitle':'Kompetenzen',
    'resume.edu1':'FH Joanneum — M.Sc. Electronics & Computer Engineering (Aug 2023 – heute)',
    'resume.edu2':'Yildiz Technical University — MBA (2018 – 2020)',
    'resume.edu3':'Sakarya University — B.Sc. Electrical & Electronic Engineering (2008 – 2014)',
    'resume.pr1':'DCF-77-Empfänger: RF-Empfänger + MSP430-Firmware zur RTC-Synchronisierung.',
    'resume.pr2':'Serien-/Bidirektionaler Resonanzwandler: LTspice-Simulationen, Trafo-Design, Prototyp & Bewertung.',
    'resume.sk1':'Leistungselektronik, Embedded-C (MSP430/ARM), RF/Analog-Design.',
    'resume.sk2':'EDA/Simulation: Altium, OrCAD, LTspice; MATLAB/Simulink; Python; VHDL.',
    'resume.sk3':'Projektmanagement: PMP®, PMI-ACP®, Scrum; Risiko, PMO-Reporting; Stakeholder & Lieferanten.',
    'resume.sk4':'Sprachen: Englisch (Fließend), Deutsch (B2), Türkisch (Muttersprache).'
  };

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#contact-form'); // update if your id/class differs
    if (!form) return;
  
    // Reset if user returns via Back/Forward (bfcache restore)
    window.addEventListener('pageshow', (e) => {
      const navEntries = performance.getEntriesByType('navigation');
      const backForward = navEntries[0]?.type === 'back_forward';
      if (e.persisted || backForward) form.reset();
    });
  });
  
    // i18n apply
  const i18nEls = [...document.querySelectorAll('[data-i18n]')];
  const langBtn = document.getElementById('langToggle');
  let lang = localStorage.getItem('lang') || 'en';

  function apply(dict){
    i18nEls.forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) el.textContent = dict[key];
    });
  }
  function swap(to){
    if(to==='de'){ apply(DE); langBtn.textContent='EN'; }
    else        { apply(EN); langBtn.textContent='DE'; }
    localStorage.setItem('lang', to);
    lang = to;
  }
  swap(lang);
  langBtn?.addEventListener('click', ()=> swap(lang==='de' ? 'en' : 'de'));

  // smooth scroll with header offset handled by CSS scroll-margin-top
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',(e)=>{
      const id=a.getAttribute('href');
      if(id && id.length>1){
        const el=document.querySelector(id);
        if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
      }
    });
  });
});
