# KonutSeyir v1.0.1 · Altınla Konut

## Geliştirme kapsamı
- Yeni `/altinla-konut` aracı; AltınSeyir v75 parametre adlarını aynen okur.
- Şehir bazında konut alım gücü, AltınSeyir snapshot değeri korunarak hesaplanır.
- Konut değeri için TCMB EVDS Konut Birim Fiyatları kullanılır. KFE endeks seviyesi m² fiyatı gibi kullanılmaz.
- Doğrudan ziyaretçide AltınSeyir güncel gram referansı ile seçilen altın türü için yaklaşık saf gram dönüşümü yapılır.
- GA4 `gold_housing_calculate` olayı, mevcut analytics scripti ve consent düzeni üzerinden gönderilir.
- Yeni AdSense alanı eklenmez. Var olan sayfa başlık/meta/canonical/sitemap üretiminden yararlanır.

## Formüller
- Saf gram: miktar × altın türünün yaklaşık saf gram karşılığı (AltınSeyir `pure_gram` varsa öncelikli).
- Altın TL: AltınSeyir `gold_value_try`; yoksa `pure_gram × gram_ref_try`; doğrudan girişte saf gram × güncel gram referansı.
- Şehir alım gücü: altın TL ÷ TCMB ortanca birim fiyatı (TL/brüt m²).
- Konut fiyatı ve altın fiyatının dönemleri farklı olabileceği sonuçta açıklanır.

## Veri kaynağı
TCMB EVDS, `TP.BIRIMFIYAT.<il kodu>`, çeyreklik, TL/brüt m². Yeterli değerleme verisi bulunmayan ilde boş sonuç gösterilir. TCMB KFE endeks serileri bu hesapta kullanılmaz.

## Sürüm ve doğrulama
- Sürüm: 1.0.1
- Test ayrıntısı: `TEST-SONUCLARI.md`
