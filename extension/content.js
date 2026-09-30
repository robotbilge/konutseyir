(() => {
  const allowed = /(^|\.)((sahibinden\.com)|(hepsiemlak\.com)|(emlakjet\.com))$/i.test(location.hostname);
  const listingPath = location.pathname.split("/").filter(Boolean).length >= 2 && /(ilan|detay|satilik|kiralik|konut|daire|arsa|isyeri)/i.test(location.pathname);
  if (!allowed || !listingPath) return;

  function clean(value) {
    if (typeof value === "number" && Number.isFinite(value) && value > 0) return value;
    if (typeof value !== "string") return null;
    const match = value.replace(/\u00a0/g, " ").match(/[\d][\d.,\s]*/);
    if (!match) return null;
    let text = match[0].replace(/\s/g, "");
    if (text.includes(".") && text.includes(",")) text = text.replace(/\./g, "").replace(",", ".");
    else if (/[.,]\d{1,2}$/.test(text)) text = text.replace(",", ".");
    else text = text.replace(/[.,]/g, "");
    const number = Number(text);
    return Number.isFinite(number) && number > 0 ? number : null;
  }

  function nodesOf(value, out = []) {
    if (Array.isArray(value)) value.forEach(item => nodesOf(item, out));
    else if (value && typeof value === "object") {
      out.push(value);
      if (value["@graph"]) nodesOf(value["@graph"], out);
    }
    return out;
  }

  function extract(selectors = {}) {
    const data = {};
    for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
      try {
        const nodes = nodesOf(JSON.parse(script.textContent || ""));
        const node = nodes.find(item => /Product|Offer|House|Apartment|Residence/i.test(String(item["@type"]))) || nodes[0];
        if (!node) continue;
        const offer = Array.isArray(node.offers) ? node.offers[0] : node.offers || node;
        const address = node.address || {};
        data.price ??= clean(offer.price || offer.lowPrice || node.price);
        data.area ??= clean(node.floorSize?.value || node.floorSize || node.size);
        data.netArea ??= data.area;
        data.city ??= address.addressRegion || null;
        data.district ??= address.addressLocality || null;
        data.address ??= [address.streetAddress, address.addressLocality, address.addressRegion].filter(Boolean).join(", ");
      } catch { /* Ignore malformed JSON-LD. */ }
    }

    for (const [field, rules] of Object.entries(selectors)) {
      if (!Array.isArray(rules)) continue;
      for (const rule of rules) {
        if (!rule?.selector || typeof rule.selector !== "string") continue;
        try {
          const element = document.querySelector(rule.selector);
          const value = rule.attribute ? element?.getAttribute(rule.attribute) : element?.textContent;
          if (!value) continue;
          if (field === "price" || /Area|m2|M2|Rent/i.test(field)) data[field] ??= clean(value);
          else data[field] ??= value.trim().slice(0, 300);
        } catch { /* Ignore outdated selectors. */ }
      }
    }
    data.url = location.href;
    return data;
  }

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type !== "KONUTSEYIR_EXTRACT") return false;
    sendResponse({ ok: true, data: extract(message.selectors || {}) });
    return false;
  });
})();
