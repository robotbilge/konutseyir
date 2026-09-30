const API = "https://konutseyir.com/api";
const button = document.getElementById("analyze");
const status = document.getElementById("status");
const result = document.getElementById("result");

function formatMoney(value) {
  return new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(value) + " TL";
}

function setError(message) {
  status.textContent = message;
  result.style.display = "none";
}

button.addEventListener("click", async () => {
  button.disabled = true;
  result.style.display = "none";
  status.textContent = "İlan sayfası ve bölge verisi kontrol ediliyor…";
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id || !/^https:\/\/(.*\.)?(sahibinden\.com|hepsiemlak\.com|emlakjet\.com)\//i.test(tab.url || "")) {
      setError("Bu sayfa desteklenmiyor. Sahibinden, Hepsiemlak veya Emlakjet ilanı açın.");
      return;
    }
    const configResponse = await fetch(API + "/selectors");
    if (!configResponse.ok) throw new Error("Ayarlar alınamadı.");
    const config = await configResponse.json();
    const provider = Object.entries(config.providers || {}).find(([, value]) =>
      value.hosts?.some(host => new URL(tab.url).hostname === host || new URL(tab.url).hostname.endsWith("." + host))
    );
    if (!provider) throw new Error("Bu ilan adresi desteklenmiyor.");
    const extracted = await chrome.tabs.sendMessage(tab.id, {
      type: "KONUTSEYIR_EXTRACT",
      selectors: provider[1].selectors || {}
    });
    if (!extracted?.ok) throw new Error("İlan bilgileri okunamadı.");
    const response = await fetch(API + "/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: tab.url, listingData: extracted.data })
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Analiz tamamlanamadı.");
    render(payload);
  } catch (error) {
    setError(error instanceof TypeError ? "Bağlantı kurulamadı. İlanı yenileyip yeniden deneyin." : error.message || "Analiz sırasında hata oluştu.");
  } finally {
    button.disabled = false;
  }
});

function render(payload) {
  const item = payload.analysis || {};
  const valuation = item.valuation;
  status.textContent = payload.message || "İlan verileri alındı.";
  result.style.display = "block";
  result.innerHTML = "";
  if (valuation) {
    const badge = document.createElement("span");
    badge.className = "badge " + valuation.tone;
    badge.textContent = valuation.label;
    result.append(badge);
    const summary = document.createElement("div");
    summary.className = "metric";
    summary.textContent = "Bu konut, platformun bölge endeksine göre m² bazında %" +
      Math.abs(valuation.differencePercent).toLocaleString("tr-TR", { maximumFractionDigits: 2 }) +
      (valuation.differencePercent >= 0 ? " daha pahalıdır." : " daha ucuzdur.");
    result.append(summary);
  } else {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = "Bölge endeksi bulunamadı";
    result.append(badge);
  }
  if (item.currentM2) {
    const metric = document.createElement("div");
    metric.className = "metric";
    metric.textContent = "İlan m² fiyatı: " + formatMoney(item.currentM2);
    result.append(metric);
  }
  const link = document.createElement("a");
  link.className = "cta";
  link.textContent = "Detaylı getiriyi KonutSeyir'de incele";
  link.href = payload.calculatorUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  result.append(link);
}
