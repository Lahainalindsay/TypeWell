(() => {
  const state = { record: null, name: "", id: "" };
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // Public checksum detects accidental changes; it is not authentication.
  // Keep the version-2 algorithm in sync with src/features/certificate/verify.ts.
  function fnv1a(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    return (h >>> 0).toString(16).padStart(8, "0");
  }
  function certSignature(p) {
    return fnv1a(JSON.stringify([p.id, p.name, p.kind, p.type, p.completed, p.duration, p.metrics, p.groups, "wpmtest-cert-v2"]));
  }
  function certPayload() { return { version: 2, id: state.id, name: state.name, ...state.record }; }
  function certVerifyUrl(p) {
    const params = new URLSearchParams({ v: "2", id: p.id, name: p.name, kind: p.kind, type: p.type,
      date: p.completed, duration: p.duration, metrics: JSON.stringify(p.metrics), groups: JSON.stringify(p.groups), sig: certSignature(p) });
    return `${location.origin}/certificate/verify/?${params}`;
  }

  // Only a completed test can publish this structured result. Never infer test
  // identity, eligibility or scores from the URL, headings or CSS metric text.
  function parseResult(card) {
    try {
      const r = JSON.parse(card.dataset.certificateResult);
      if (!["typing", "data-entry", "numeric"].includes(r.kind) || !r.type || !r.completed || !r.duration || !Array.isArray(r.metrics) || !r.metrics.length || !Array.isArray(r.groups)) return null;
      if (![...r.metrics, ...r.groups].every(m => typeof m.label === "string" && typeof m.value === "string")) return null;
      return r;
    } catch { return null; }
  }
  function overlay(inner, cls = "") {
    closeModal();
    const el = document.createElement("div");
    el.id = "tw-cert-modal";
    el.className = `tw-cert-overlay ${cls}`;
    el.innerHTML = `<div class="tw-cert-shell">${inner}</div>`;
    document.body.appendChild(el);
    el.addEventListener("click", e => { if (e.target === el) closeModal(); });
    return el;
  }
  function closeModal() { document.getElementById("tw-cert-modal")?.remove(); }
  function askName() {
    const r = state.record;
    const details = [...r.metrics, { label: "Test", value: r.type }, { label: "Time taken", value: r.duration }, { label: "Date", value: r.completed }];
    const el = overlay(`
      <button class="tw-cert-x" aria-label="Close">×</button>
      <div class="tw-name-icon">▣</div><h2>Get Your Test Certificate</h2>
      <p>Enter how you'd like your name to appear on your certificate.</p>
      <label class="tw-name-label">Your Name<input id="tw-cert-name" maxlength="80" autocomplete="name" placeholder="Your name" /></label>
      <div class="tw-test-details"><strong>Test Details</strong>${details.map(m => `<span>${esc(m.label)} <b>${esc(m.value)}</b></span>`).join("")}</div>
      <button id="tw-generate-cert" class="tw-cert-primary">Generate My Certificate →</button>`, "tw-name-step");
    el.querySelector(".tw-cert-x").onclick = closeModal;
    const input = el.querySelector("#tw-cert-name");
    input.focus();
    const go = () => {
      const name = input.value.trim();
      if (!name) { input.focus(); input.classList.add("tw-input-error"); return; }
      state.name = name; state.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6); showCertificate();
    };
    el.querySelector("#tw-generate-cert").onclick = go;
    input.addEventListener("keydown", e => { if (e.key === "Enter") go(); });
  }
  function certificateMarkup() {
    const r = state.record;
    const title = r.kind === "data-entry" ? "DATA ENTRY RESULTS" : r.kind === "numeric" ? "NUMERIC ENTRY RESULTS" : "TYPING PROFICIENCY";
    return `<article id="tw-certificate" class="tw-certificate tw-cert-result">
      <div class="tw-cert-inner">
        <div class="tw-corner tl"></div><div class="tw-corner tr"></div><div class="tw-corner bl"></div><div class="tw-corner br"></div>
        <header class="tw-cert-brand"><div><strong>WPM<span>Test</span></strong><small>PRACTICE TODAY · GO FURTHER TOMORROW</small></div><div class="tw-medallion"><span>⌨</span></div><small>TYPING SKILLS<br/>OPEN DOORS</small></header>
        <div class="tw-cert-title"><span>CERTIFICATE OF</span><h1>${title}</h1><p>THIS CERTIFIES THAT</p></div>
        <div class="tw-cert-name">${esc(state.name)}</div>
        <p class="tw-cert-copy">completed the following test on <b>WPM<span>Test</span></b>:</p>
        <p class="tw-cert-test-name">${esc(r.type)}</p>
        <div class="tw-cert-stats tw-cert-result-stats" style="--cert-columns:${r.metrics.length}">${r.metrics.map(m => `<div><b>${esc(m.value)}</b><span>${esc(m.label)}</span></div>`).join("")}</div>
        <p class="tw-cert-session">Time taken: ${esc(r.duration)} · Date completed: ${esc(r.completed)}</p>
        ${r.groups.length ? `<div class="tw-cert-breakdown" aria-label="Results by field type">${r.groups.map(g => `<div><strong>${esc(g.label)}</strong><span>${esc(g.value)}</span></div>`).join("")}</div>` : ""}
        <div class="tw-cert-motto"><i></i><span>PRACTICE BUILDS PROGRESS</span><i></i></div>
        <footer class="tw-cert-footer"><div class="tw-signature">WPMTest Team<small>THE WPMTEST TEAM</small></div><div class="tw-gold-seal"><b>★</b><span>SKILLS<br/>CREATE<br/>OPPORTUNITY</span></div><div class="tw-signature right">Keep Typing<small>BRIGHTER TOMORROWS</small></div></footer>
        <small class="tw-cert-verify">Verification ID: ${esc(state.id)} · Full verification link required; ID alone cannot be checked.</small>
        <small class="tw-cert-disclaimer">This certificate records a self-administered WPMTest test result and is not an accredited professional certification.</small>
      </div></article>`;
  }
  function showCertificate() {
    const el = overlay(`<button class="tw-cert-x" aria-label="Close">×</button>${certificateMarkup()}<div class="tw-cert-actions"><button id="tw-download">Download</button><button id="tw-print">Print / Save PDF</button><button id="tw-verify-link">Copy Verification Link</button><button id="tw-share">Share</button><button id="tw-close">Close</button></div>`, "tw-preview-step");
    el.querySelector(".tw-cert-x").onclick = closeModal;
    el.querySelector("#tw-close").onclick = closeModal;
    el.querySelector("#tw-print").onclick = () => window.print();
    el.querySelector("#tw-download").onclick = downloadCertificate;
    el.querySelector("#tw-share").onclick = shareCertificate;
    el.querySelector("#tw-verify-link").onclick = copyVerificationLink;
  }
  async function copyVerificationLink() {
    const url = certVerifyUrl(certPayload());
    try { await navigator.clipboard.writeText(url); alert("Verification link copied. It includes your name and test results. The public checksum checks link consistency, not authenticity."); }
    catch { prompt("Copy your verification link:", url); }
  }
  function downloadCertificate() {
    const blob = new Blob([certificateSvg(state.name, state.record)], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `WPMTest-Certificate-${state.name.replace(/[^a-z0-9]+/gi, "-")}.svg`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function certificateSvg(name, r) {
    const title = r.kind === "data-entry" ? "DATA ENTRY RESULTS" : r.kind === "numeric" ? "NUMERIC ENTRY RESULTS" : "TYPING PROFICIENCY";
    const stats = r.metrics.map((m, i) => {
      const x = 180 + (i + .5) * 1240 / r.metrics.length;
      return `<text x="${x}" y="615" font-size="54" font-weight="700">${esc(m.value)}</text><text x="${x}" y="655" font-family="Arial" font-size="19">${esc(m.label)}</text>`;
    }).join("");
    const groups = r.groups.map((g, i) => `<text x="${320 + (i % 3) * 480}" y="${745 + Math.floor(i / 3) * 45}" font-family="Arial" font-size="20">${esc(g.label)}: ${esc(g.value)}</text>`).join("");
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
      <defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#fffdf7"/><stop offset="1" stop-color="#f5f1e7"/></linearGradient></defs>
      <rect width="1600" height="1000" fill="url(#g)"/><rect x="24" y="24" width="1552" height="952" rx="18" fill="none" stroke="#0c2948" stroke-width="18"/><rect x="45" y="45" width="1510" height="910" rx="12" fill="none" stroke="#b58a35" stroke-width="4"/>
      <text x="110" y="120" font-family="Arial" font-weight="700" font-size="54" fill="#071a30">WPM<tspan fill="#2389d7">Test</tspan></text>
      <circle cx="800" cy="115" r="70" fill="#0c3159" stroke="#c59a43" stroke-width="10"/><text x="800" y="138" text-anchor="middle" font-size="55">⌨</text>
      <g text-anchor="middle" font-family="Georgia" fill="#071a30">
        <text x="800" y="235" font-size="38" letter-spacing="10">CERTIFICATE OF</text><text x="800" y="315" font-size="68" font-weight="700">${title}</text>
        <text x="800" y="365" font-size="20" letter-spacing="7">THIS CERTIFIES THAT</text>
        <text x="800" y="450" font-style="italic" font-size="${Math.min(72, 1900 / Math.max(1, name.length))}" fill="#a87822">${esc(name)}</text><line x1="370" x2="1230" y1="475" y2="475" stroke="#b58a35"/>
        <text x="800" y="520" font-size="22">completed the following test on WPMTest:</text><text x="800" y="558" font-size="30" font-weight="700">${esc(r.type)}</text>
        ${stats}<text x="800" y="705" font-family="Arial" font-size="20">Time taken: ${esc(r.duration)} · Date completed: ${esc(r.completed)}</text>
        ${groups}<text x="800" y="835" font-family="Arial" font-size="18" letter-spacing="6">PRACTICE BUILDS PROGRESS</text>
        <text x="220" y="900" font-style="italic" font-size="34">WPMTest Team</text><text x="1350" y="900" font-style="italic" font-size="34">Keep Typing</text>
      </g><circle cx="800" cy="885" r="44" fill="#c79a43" stroke="#9c7127" stroke-width="4"/>
      <g text-anchor="middle" font-family="Arial" fill="#10263e"><text x="800" y="868" font-size="18">★</text><text x="800" y="885" font-size="9">SKILLS</text><text x="800" y="898" font-size="9">CREATE</text><text x="800" y="911" font-size="9">OPPORTUNITY</text>
        <text x="800" y="946" font-size="13">Verification ID: ${esc(state.id)} · Full verification link required; ID alone cannot be checked.</text>
        <text x="800" y="962" font-size="11">Self-administered test result. Not an accredited professional certification.</text>
      </g></svg>`;
  }
  async function shareCertificate() {
    const text = `${state.name} completed ${state.record.type}: ${state.record.metrics.map(m => `${m.label}: ${m.value}`).join("; ")}.`;
    const url = certVerifyUrl(certPayload());
    try {
      if (navigator.share) await navigator.share({ title: "My WPMTest Test Certificate", text, url });
      else { await navigator.clipboard.writeText(`${text} ${url}`); alert("Certificate result copied to clipboard."); }
    } catch {}
  }
  function enhance() {
    document.querySelectorAll(".result-card").forEach(card => {
      const actions = card.querySelector(".actions");
      if (!actions) return;
      const result = parseResult(card);
      const existing = actions.querySelector(".tw-get-cert");
      if (!result) { existing?.remove(); return; }
      if (existing) return;
      const btn = document.createElement("button");
      btn.className = "primary tw-get-cert"; btn.textContent = "🏅 Get Your Test Certificate";
      btn.onclick = () => { const current = parseResult(card); if (current) { state.record = current; askName(); } };
      const share = [...actions.querySelectorAll("button")].find(b => /share result/i.test(b.textContent || ""));
      actions.insertBefore(btn, share || actions.firstChild);
    });
  }
  const observer = new MutationObserver(enhance);
  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-certificate-result"] });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", enhance); else enhance();
})();
