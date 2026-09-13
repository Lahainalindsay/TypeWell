(() => {
  const state = { record: null, name: "" };

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const metric = (card, label) => {
    const nodes = [...card.querySelectorAll('.metric')];
    const node = nodes.find(n => (n.textContent || '').toLowerCase().includes(label.toLowerCase()));
    if (!node) return '';
    const strong = node.querySelector('strong');
    return strong ? strong.textContent.trim() : '';
  };
  const parseResult = (card) => {
    const h2 = card.querySelector('h2')?.textContent || '';
    const m = h2.match(/([\d.]+)\s*WPM\s*[·•-]\s*([\d.]+)%/i);
    const duration = metric(card, 'Duration') || 'Completed test';
    const completed = metric(card, 'Completed') || new Date().toLocaleDateString();
    return { wpm: m?.[1] || metric(card, 'Net WPM') || '—', accuracy: m?.[2] || '—', duration, completed, type: inferType(duration) };
  };
  const inferType = (duration) => {
    const path = location.pathname.toLowerCase();
    if (path.includes('data-entry')) return 'Data Entry Typing Test';
    if (path.includes('10-key')) return '10-Key Typing Test';
    if (path.includes('numeric-keypad')) return 'Numeric Keypad Test';
    if (path.includes('kph')) return 'KPH Typing Test';
    if (path.includes('numbers')) return 'Numbers Typing Test';
    if (path.includes('punctuation')) return 'Punctuation Typing Test';
    const seconds = duration.match(/(\d+):(\d+)/);
    if (seconds) {
      const mins = Number(seconds[1]) + Number(seconds[2]) / 60;
      if (mins >= .9) return `${Math.max(1, Math.round(mins))} Minute Typing Test`;
    }
    return 'Typing Test';
  };

  function overlay(inner, cls='') {
    closeModal();
    const el = document.createElement('div');
    el.id = 'tw-cert-modal';
    el.className = `tw-cert-overlay ${cls}`;
    el.innerHTML = `<div class="tw-cert-shell">${inner}</div>`;
    document.body.appendChild(el);
    el.addEventListener('click', e => { if (e.target === el) closeModal(); });
    return el;
  }
  function closeModal(){ document.getElementById('tw-cert-modal')?.remove(); }

  function askName() {
    const r = state.record;
    const el = overlay(`
      <button class="tw-cert-x" aria-label="Close">×</button>
      <div class="tw-name-icon">▣</div>
      <h2>Get Your Typing Certificate</h2>
      <p>Enter how you'd like your name to appear on your certificate.</p>
      <label class="tw-name-label">Your Name<input id="tw-cert-name" maxlength="80" autocomplete="name" placeholder="Your name" /></label>
      <div class="tw-test-details"><strong>Test Details</strong><span>WPM <b>${esc(r.wpm)}</b></span><span>Accuracy <b>${esc(r.accuracy)}%</b></span><span>Test <b>${esc(r.type)}</b></span><span>Date <b>${esc(r.completed)}</b></span></div>
      <button id="tw-generate-cert" class="tw-cert-primary">Generate My Certificate →</button>
    `, 'tw-name-step');
    el.querySelector('.tw-cert-x').onclick = closeModal;
    const input = el.querySelector('#tw-cert-name');
    input.focus();
    const go = () => { const name = input.value.trim(); if (!name) { input.focus(); input.classList.add('tw-input-error'); return; } state.name = name; showCertificate(); };
    el.querySelector('#tw-generate-cert').onclick = go;
    input.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
  }

  function certificateMarkup() {
    const r = state.record, name = esc(state.name);
    return `<article id="tw-certificate" class="tw-certificate">
      <div class="tw-cert-inner">
        <div class="tw-corner tl"></div><div class="tw-corner tr"></div><div class="tw-corner bl"></div><div class="tw-corner br"></div>
        <header class="tw-cert-brand"><div><strong>Type<span>Well</span></strong><small>PRACTICE TODAY · GO FURTHER TOMORROW</small></div><div class="tw-medallion"><span>⌨</span></div><small>TYPING SKILLS<br/>OPEN DOORS</small></header>
        <div class="tw-cert-title"><span>CERTIFICATE OF</span><h1>TYPING PROFICIENCY</h1><p>THIS CERTIFIES THAT</p></div>
        <div class="tw-cert-name">${name}</div>
        <p class="tw-cert-copy">has demonstrated typing proficiency by completing a typing test on <b>Type<span>Well</span></b><br/>and has achieved the following results:</p>
        <div class="tw-cert-stats"><div><b>${esc(r.wpm)}</b><span>WORDS PER MINUTE<br/>(WPM)</span></div><div><b>${esc(r.accuracy)}%</b><span>ACCURACY</span></div><div><b>${esc(r.type)}</b><span>TEST TAKEN</span></div><div><b>${esc(r.completed)}</b><span>DATE COMPLETED</span></div></div>
        <div class="tw-cert-motto"><i></i><span>PRACTICE BUILDS PROGRESS</span><i></i></div>
        <footer class="tw-cert-footer"><div class="tw-signature">TypeWell Team<small>THE TYPEWELL TEAM</small></div><div class="tw-gold-seal"><b>★</b><span>SKILLS<br/>CREATE<br/>OPPORTUNITY</span></div><div class="tw-signature right">Keep Typing<small>BRIGHTER TOMORROWS</small></div></footer>
        <small class="tw-cert-disclaimer">This certificate records a TypeWell online typing-test result and is not an accredited professional certification.</small>
      </div>
    </article>`;
  }

  function showCertificate() {
    const el = overlay(`<button class="tw-cert-x" aria-label="Close">×</button>${certificateMarkup()}<div class="tw-cert-actions"><button id="tw-download">Download</button><button id="tw-print">Print / Save PDF</button><button id="tw-share">Share</button><button id="tw-close">Close</button></div>`, 'tw-preview-step');
    el.querySelector('.tw-cert-x').onclick = closeModal;
    el.querySelector('#tw-close').onclick = closeModal;
    el.querySelector('#tw-print').onclick = () => window.print();
    el.querySelector('#tw-download').onclick = downloadCertificate;
    el.querySelector('#tw-share').onclick = shareCertificate;
  }

  function downloadCertificate() {
    const r = state.record;
    const svg = certificateSvg(state.name, r);
    const blob = new Blob([svg], {type:'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download=`TypeWell-Certificate-${state.name.replace(/[^a-z0-9]+/gi,'-')}.svg`; a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function certificateSvg(name,r) {
    const safe = s => esc(s);
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#fffdf7"/><stop offset="1" stop-color="#f5f1e7"/></linearGradient></defs><rect width="1600" height="1000" fill="url(#g)"/><rect x="24" y="24" width="1552" height="952" rx="18" fill="none" stroke="#0c2948" stroke-width="18"/><rect x="45" y="45" width="1510" height="910" rx="12" fill="none" stroke="#b58a35" stroke-width="4"/><text x="110" y="120" font-family="Arial" font-weight="700" font-size="54" fill="#071a30">Type<tspan fill="#2389d7">Well</tspan></text><circle cx="800" cy="115" r="70" fill="#0c3159" stroke="#c59a43" stroke-width="10"/><text x="800" y="138" text-anchor="middle" font-size="55">⌨</text><text x="800" y="245" text-anchor="middle" font-family="Georgia" font-size="42" letter-spacing="10" fill="#0a2038">CERTIFICATE OF</text><text x="800" y="330" text-anchor="middle" font-family="Georgia" font-size="78" font-weight="700" fill="#071a30">TYPING PROFICIENCY</text><text x="800" y="390" text-anchor="middle" font-family="Georgia" font-size="22" letter-spacing="9" fill="#22364d">THIS CERTIFIES THAT</text><text x="800" y="490" text-anchor="middle" font-family="Georgia" font-style="italic" font-size="76" fill="#a87822">${safe(name)}</text><line x1="370" x2="1230" y1="515" y2="515" stroke="#b58a35"/><text x="800" y="565" text-anchor="middle" font-family="Georgia" font-size="24" fill="#15263a">has demonstrated typing proficiency by completing a typing test on TypeWell</text><text x="800" y="605" text-anchor="middle" font-family="Georgia" font-size="24" fill="#15263a">and has achieved the following results:</text><g font-family="Georgia" fill="#071a30" text-anchor="middle"><text x="330" y="700" font-size="62" font-weight="700">${safe(r.wpm)}</text><text x="650" y="700" font-size="62" font-weight="700">${safe(r.accuracy)}%</text><text x="1000" y="690" font-size="32" font-weight="700">${safe(r.type)}</text><text x="1320" y="690" font-size="32" font-weight="700">${safe(r.completed)}</text></g><g font-family="Arial" font-size="17" letter-spacing="3" fill="#26384c" text-anchor="middle"><text x="330" y="740">WORDS PER MINUTE (WPM)</text><text x="650" y="740">ACCURACY</text><text x="1000" y="740">TEST TAKEN</text><text x="1320" y="740">DATE COMPLETED</text></g><text x="800" y="815" text-anchor="middle" font-family="Arial" font-size="18" letter-spacing="8" fill="#1d3046">PRACTICE BUILDS PROGRESS</text><circle cx="800" cy="895" r="66" fill="#c79a43" stroke="#9c7127" stroke-width="4"/><text x="800" y="886" text-anchor="middle" font-size="25">★</text><text x="800" y="915" text-anchor="middle" font-family="Arial" font-size="14" letter-spacing="2">TYPEWELL</text><text x="220" y="900" font-family="Georgia" font-style="italic" font-size="34" fill="#10263e">TypeWell Team</text><text x="1250" y="900" font-family="Georgia" font-style="italic" font-size="34" fill="#10263e">Keep Typing</text></svg>`;
  }
  async function shareCertificate(){
    const text = `${state.name} achieved ${state.record.wpm} WPM with ${state.record.accuracy}% accuracy on the TypeWell ${state.record.type}.`;
    try { if (navigator.share) await navigator.share({title:'My TypeWell Typing Certificate', text, url:location.origin}); else { await navigator.clipboard.writeText(text+' '+location.origin); alert('Certificate result copied to clipboard.'); } } catch(e){}
  }

  function enhance() {
    document.querySelectorAll('.result-card').forEach(card => {
      const actions = card.querySelector('.actions');
      if (!actions || actions.querySelector('.tw-get-cert')) return;
      const btn = document.createElement('button');
      btn.className='primary tw-get-cert'; btn.innerHTML='🏅 Get Your Typing Certificate';
      btn.onclick=()=>{ state.record=parseResult(card); askName(); };
      const share=[...actions.querySelectorAll('button')].find(b=>/share result/i.test(b.textContent||''));
      actions.insertBefore(btn, share || actions.firstChild);
    });
  }
  const observer = new MutationObserver(enhance);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',enhance); else enhance();
})();