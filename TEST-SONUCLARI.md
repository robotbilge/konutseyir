# KonutSeyir v1.0.1 — Test Sonuçları

| Kontrol | Beklenen | Gerçekleşen | Sonuç |
|---|---|---|---|
| EVDS birim fiyat parser | Çeyrek veriyi doğru tarihe ve TL/m² değerine çevirir | Birim testleri CI'da çalıştırılacak | Bekliyor |
| Altın tutarı ve m² hesabı | Türkçe sayı, pozitif tutar ve bölme kontrol edilir | Birim testleri CI'da çalıştırılacak | Bekliyor |
| TypeScript kontrolü | Tür hatası yok | GitHub Actions sonucu bekleniyor | Bekliyor |
| Statik derleme ve prerender | Yeni /altinla-konut sayfası üretilir; mevcut sayfalar korunur | GitHub Actions sonucu bekleniyor | Bekliyor |
| Mevcut site testleri | Sayfa linkleri, SEO, consent, AdSense ve içerik testleri geçer | GitHub Actions sonucu bekleniyor | Bekliyor |
| 320 px mobil görünüm | Form, şehir satırı ve büyük tutarlar taşmaz | Canlı sayfa görsel kontrolü bekleniyor | Bekliyor |
| AltınSeyir query akışı | Parametreli giriş otomatik hesaplar; snapshot değeri korunur | Canlı sayfada parametreli kontrol bekleniyor | Bekliyor |
| Üretim API ve deploy | Worker ve Pages dağıtılır; canlı API şehir verisini döndürür | Ana dala alım sonrası kontrol edilecek | Bekliyor |

Not: TCMB EVDS konut birim fiyatları çeyreklik ve TL/brüt m² cinsindedir. Bir il için kaynakta değer yoksa araç o ili sonuçtan çıkarır; KFE endeksiyle tahmin üretmez.
