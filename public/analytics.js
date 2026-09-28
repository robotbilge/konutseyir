(function () {
  var measurementId = document.currentScript && document.currentScript.dataset.measurementId;
  var loaded = false;

  window.ksEnableAnalytics = function () {
    if (loaded || !measurementId) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { anonymize_ip: true });
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(script);
  };

  try {
    if (localStorage.getItem('ks_analytics_consent') === 'granted') window.ksEnableAnalytics();
  } catch (_) {}
})();
