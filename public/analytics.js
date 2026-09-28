/* Seyir Analytics Consent 1.0 — shared by AltinSeyir and KonutSeyir. */
(function () {
  'use strict';
  if (window.SeyirConsent) return;
  var tag = document.currentScript;
  var id = tag && tag.dataset.measurementId;
  var key = tag && tag.dataset.consentKey;
  var policy = tag && tag.dataset.policyUrl;
  if (!id || !key) return; // Fail closed if integration configuration is missing.
  var loaded = false, choice = null, banner = null, opener = null;
  var denied = {analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'};
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window['ga-disable-' + id] = true;
  window.gtag('consent', 'default', denied);

  function valid(value) { return value === 'granted' || value === 'denied' ? value : null; }
  function read() {
    var value = null;
    try { value = valid(localStorage.getItem(key)); } catch (_) {}
    if (value) return value;
    try {
      var part = document.cookie.split('; ').find(function (c) { return c.indexOf(key + '=') === 0; });
      if (part) value = valid(decodeURIComponent(part.slice(key.length + 1)));
    } catch (_) {}
    // The former AltinSeyir 'all' button described future advertising consent,
    // not Analytics. Keep that record intact; do not invent Analytics consent.
    if (!value && key === 'altinseyir_analytics_consent') {
      try { if (JSON.parse(localStorage.getItem('altinseyir_consent_v2') || 'null')?.choice === 'necessary') value = 'denied'; } catch (_) {}
    }
    return value;
  }
  function save(value) {
    try { localStorage.setItem(key, value); } catch (_) {}
    try { document.cookie = key + '=' + value + '; Path=/; Max-Age=31536000; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : ''); } catch (_) {}
  }
  function clearAnalyticsCookies() {
    var names;
    try { names = document.cookie.split(';').map(function (c) { return c.trim().split('=')[0]; }).filter(function (n) { return /^(_ga(?:_|$)|_gid$|_gat(?:_|$))/.test(n); }); } catch (_) { return; }
    var domains = [''], host = location.hostname.split('.');
    while (host.length > 1) { domains.push(host.join('.'), '.' + host.join('.')); host.shift(); }
    var paths = ['/'], parts = location.pathname.split('/').filter(Boolean), path = '';
    parts.forEach(function (part) { path += '/' + part; paths.push(path, path + '/'); });
    names.forEach(function (name) { domains.forEach(function (domain) { paths.forEach(function (p) {
      document.cookie = name + '=; Max-Age=0; Path=' + p + (domain ? '; Domain=' + domain : '') + '; SameSite=Lax';
    }); }); });
  }
  function enable() {
    if (choice !== 'granted' || loaded) return;
    window['ga-disable-' + id] = false;
    window.gtag('consent', 'update', {analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    loaded = true;
    window.gtag('js', new Date());
    window.gtag('config', id, {allow_google_signals:false,allow_ad_personalization_signals:false});
    var script = document.createElement('script');
    script.id = 'seyir-ga-tag'; script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(script);
  }
  function close() {
    if (banner) banner.remove();
    banner = null;
    if (opener && opener.isConnected) opener.focus();
    opener = null;
  }
  function choose(value) {
    if (!valid(value)) return;
    choice = value; save(value);
    if (value === 'granted') { enable(); close(); }
    else {
      window['ga-disable-' + id] = true;
      window.gtag('consent', 'update', denied);
      clearAnalyticsCookies(); close();
      // Removing a script does not unload its listeners. Reload without the tag.
      if (loaded) location.reload();
    }
  }
  function open(focus) {
    if (banner) return;
    banner = document.createElement('aside');
    banner.className = 'seyir-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'seyir-consent-title');
    banner.setAttribute('aria-describedby', 'seyir-consent-description');
    banner.innerHTML = '<div><strong id="seyir-consent-title">Ziyaret ölçümü tercihi</strong><p id="seyir-consent-description">Siteyi geliştirmek için Google Analytics ile kullanım istatistikleri toplamak istiyoruz. Kabul etmezseniz Analytics yüklenmez. Tercihinizi daha sonra değiştirebilirsiniz.</p><a class="seyir-consent-details">Ayrıntılar</a></div><div class="seyir-consent-actions"><button type="button" data-seyir-choice="denied">Reddet</button><button type="button" data-seyir-choice="granted">Kabul et</button></div>';
    banner.querySelector('a').href = policy || '/';
    banner.addEventListener('click', function (event) {
      var button = event.target.closest('[data-seyir-choice]');
      if (button) choose(button.dataset.seyirChoice);
    });
    banner.addEventListener('keydown', function (event) { if (event.key === 'Escape' && choice) close(); });
    document.body.appendChild(banner);
    if (focus) { opener = document.activeElement; banner.querySelector('button').focus(); }
  }
  window.SeyirConsent = {open:function () { open(true); },getChoice:function () { return choice; }};
  document.addEventListener('click', function (event) {
    var link = event.target.closest('[data-seyir-preferences], #consent-reset');
    if (link) { event.preventDefault(); open(true); }
  });
  window.addEventListener('storage', function (event) {
    if (event.key !== key) return;
    var next = valid(event.newValue);
    if (next === choice) return;
    choice = next;
    if (next === 'granted') { enable(); close(); }
    else {
      window['ga-disable-' + id] = true;
      window.gtag('consent', 'update', denied);
      clearAnalyticsCookies();
      if (next) save(next);
      else { try { document.cookie = key + '=; Path=/; Max-Age=0; SameSite=Lax'; } catch (_) {} }
      if (loaded) location.reload();
      else if (!next) open(false);
      else close();
    }
  });
  choice = read();
  if (choice === 'granted') enable();
  else clearAnalyticsCookies();
  function mount() { if (!choice) open(false); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once:true});
  else mount();
})();
