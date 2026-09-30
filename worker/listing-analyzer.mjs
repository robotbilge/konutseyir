export const selectorConfig = {
  version: 1,
  updatedAt: "2026-09-30",
  providers: {
    sahibinden: {
      label: "Sahibinden",
      hosts: ["sahibinden.com"],
      match: ["https://*.sahibinden.com/*"],
      selectors: {
        price: [], area: [], netArea: [], grossArea: [], city: [], district: [], neighborhood: [], address: [], referenceM2: [], monthlyRent: []
      }
    },
    hepsiemlak: {
      label: "Hepsiemlak",
      hosts: ["hepsiemlak.com"],
      match: ["https://*.hepsiemlak.com/*"],
      selectors: {
        price: [], area: [], netArea: [], grossArea: [], city: [], district: [], neighborhood: [], address: [], referenceM2: [], monthlyRent: []
      }
    },
    emlakjet: {
      label: "Emlakjet",
      hosts: ["emlakjet.com"],
      match: ["https://*.emlakjet.com/*"],
      selectors: {
        price: [], area: [], netArea: [], grossArea: [], city: [], district: [], neighborhood: [], address: [], referenceM2: [], monthlyRent: []
      }
    }
  }
};

const providerEntries = Object.entries(selectorConfig.providers);

export function getProvider(input) {
  let url;
  try { url = new URL(input); } catch { return null; }
  if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
  const key=providerEntries.find(([, provider]) =>
    provider.hosts.some(host => url.hostname === host || url.hostname.endsWith("." + host))
  )?.[0] || null;
  if(!key||url.pathname.split("/").filter(Boolean).length<1||!/(ilan|detay|satilik|kiralik|konut|daire|arsa|isyeri)/i.test(url.pathname))return null;
  return key;
}

export function cleanNumber(value) {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) return value;
  if (typeof value !== "string") return null;
  const normalized = value.replace(/\u00a0/g, " ").trim();
  const match = normalized.match(/[\d][\d.,\s]*/);
  if (!match) return null;
  let digits = match[0].replace(/\s/g, "");
  if (digits.includes(".") && digits.includes(",")) digits = digits.replace(/\./g, "").replace(",", ".");
  else if (/[.,]\d{1,2}$/.test(digits)) digits = digits.replace(",", ".");
  else digits = digits.replace(/[.,]/g, "");
  const number = Number(digits);
  return Number.isFinite(number) && number > 0 ? number : null;
}

function first(...values) {
  return values.find(value => value !== undefined && value !== null && value !== "") ?? null;
}

export function parseListingData(input = {}) {
  const data = input && typeof input === "object" ? input : {};
  const area = first(cleanNumber(data.netArea), cleanNumber(data.area), cleanNumber(data.grossArea));
  return {
    price: cleanNumber(data.price),
    area,
    netArea: cleanNumber(data.netArea),
    grossArea: cleanNumber(data.grossArea),
    city: typeof data.city === "string" ? data.city.trim().slice(0, 100) : null,
    district: typeof data.district === "string" ? data.district.trim().slice(0, 100) : null,
    neighborhood: typeof data.neighborhood === "string" ? data.neighborhood.trim().slice(0, 120) : null,
    address: typeof data.address === "string" ? data.address.trim().slice(0, 300) : null,
    referenceM2: cleanNumber(data.referenceM2),
    monthlyRent: cleanNumber(data.monthlyRent)
  };
}

export function valuation(currentM2, referenceM2) {
  if (!(currentM2 > 0) || !(referenceM2 > 0)) return null;
  const differencePercent = Number(((currentM2 / referenceM2 - 1) * 100).toFixed(10));
  let label, tone;
  if (differencePercent < -10) { label = "Fırsat / Çok ucuz"; tone = "green"; }
  else if (differencePercent < -5) { label = "Avantajlı / Ucuz"; tone = "green"; }
  else if (differencePercent <= 5) { label = "Piyasa değerinde / Normal"; tone = "yellow"; }
  else if (differencePercent <= 15) { label = "Pahalı"; tone = "red"; }
  else { label = "Çok şişirilmiş / Aşırı pahalı"; tone = "red"; }
  return { differencePercent, label, tone };
}

export function analyzeListing(input = {}) {
  const listing = parseListingData(input);
  const currentM2 = listing.price && listing.area ? listing.price / listing.area : null;
  const valuationResult = currentM2 && listing.referenceM2 ? valuation(currentM2, listing.referenceM2) : null;
  const grossPaybackYears = listing.price && listing.monthlyRent
    ? listing.price / (listing.monthlyRent * 12)
    : null;
  return {
    listing,
    currentM2,
    referenceM2: listing.referenceM2,
    valuation: valuationResult,
    grossPaybackYears,
    status: !listing.price || !listing.area ? "partial" : valuationResult ? "analyzed" : "reference_missing",
    methodology: "İlan fiyatı / net m²; platformun sayfada yayımladığı bölge verisiyle karşılaştırma. Brüt kira çarpanı boşluk, gider ve vergileri içermez."
  };
}

function textFrom(value) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(textFrom).join(" ");
  if (!value || typeof value !== "object") return "";
  return value["@value"] || value.name || value.addressLocality || value.addressRegion || "";
}

function flattenJsonLd(value, out = []) {
  if (Array.isArray(value)) value.forEach(item => flattenJsonLd(item, out));
  else if (value && typeof value === "object") {
    out.push(value);
    if (value["@graph"]) flattenJsonLd(value["@graph"], out);
  }
  return out;
}

export function parseJsonLd(html) {
  const out = {};
  const scripts = String(html).matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  for (const [, raw] of scripts) {
    try {
      const nodes = flattenJsonLd(JSON.parse(raw.replace(/<!--|-->/g, "")));
      const node = nodes.find(item => /Product|Offer|House|Apartment|Residence/i.test(String(item["@type"]))) || nodes[0];
      if (!node) continue;
      const offer = Array.isArray(node.offers) ? node.offers[0] : node.offers || node;
      const address = node.address || {};
      const addressText = textFrom(address);
      out.price ??= cleanNumber(first(offer.price, offer.lowPrice, node.price));
      out.area ??= cleanNumber(first(node.floorSize?.value, node.floorSize, node.size));
      out.netArea ??= out.area;
      out.city ??= first(address.addressRegion, address.addressCountry?.name);
      out.district ??= first(address.addressLocality);
      out.address ??= first(addressText, node.name);
    } catch { /* Ignore malformed provider JSON-LD. */ }
  }
  return out;
}

export async function extractHtml(html, providerKey) {
  const config = selectorConfig.providers[providerKey];
  const values = parseJsonLd(html);
  if (!config || typeof HTMLRewriter === "undefined") return parseListingData(values);
  const captures = [];
  for (const [field, rules] of Object.entries(config.selectors)) {
    for (const rule of rules) {
      if (!rule?.selector || typeof rule.selector !== "string") continue;
      captures.push({ field, selector: rule.selector, attribute: rule.attribute || null, values: [] });
    }
  }
  for (const capture of captures) {
    try {
      const handler = capture.attribute
        ? { element(element) { const value = element.getAttribute(capture.attribute); if (value) capture.values.push(value); } }
        : { text(chunk) { if (!chunk.lastInTextNode || chunk.text.trim()) capture.values.push(chunk.text); } };
      await new HTMLRewriter().on(capture.selector, handler).transform(new Response(html)).text();
      const value = capture.values.join(" ").trim();
      if (value && !values[capture.field]) values[capture.field] = value;
    } catch { /* Ignore outdated selectors so other extraction paths can continue. */ }
  }
  return parseListingData(values);
}

export async function fetchListing(url) {
  const response = await fetch(url, {
    redirect: "manual",
    headers: {
      Accept: "text/html,application/xhtml+xml",
      "User-Agent": "KonutSeyir/1.0 (+https://konutseyir.com/veri)"
    },
    signal: AbortSignal.timeout(8000)
  });
  if (response.status >= 300 && response.status < 400) throw new Error("redirect_blocked");
  if (!response.ok) throw new Error("upstream_unavailable");
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) throw new Error("invalid_content_type");
  const reader = response.body?.getReader();
  if (!reader) throw new Error("empty_response");
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 1_500_000) { await reader.cancel(); throw new Error("response_too_large"); }
    chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks));
}
