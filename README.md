# KonutSeyir

Kaynak depo: https://github.com/robotbilge/konutseyir

Konutseyir.com için GitHub + Cloudflare Pages + Worker + D1 dağıtımı. Bu paket henüz canlı hesaba yüklenmedi. Önceki Sites yayını değiştirilmedi.

## Çalışan kapsam

- 35 önceden HTML üretilmiş sayfa, mobil menü, konuyla eşleşen rehber bağlantıları.
- Ortak hesap motoruyla net kira (zarar dahil), TL/yüzde getiri, kira çarpanı, masraflı başlangıç yatırımı.
- Kredisiz bir yıllık ev/mevduat/altın senaryosu; enflasyondan arındırılmış TL ve yüzde sonuçları.
- Ayrı sabit taksitli kredi hesabı, gerçek gün sayısıyla mevduat ve faiz üzerinden stopaj.
- Yazdır/PDF, kontrol listesi, kaynak ve veri durumları, sitemap, canonical ve 404.
- Worker: TCMB günlük USD/EUR XML aktarımı, anahtarlı EVDS uyumlu adaptör, D1 geçmişi, zamanlanmış güncelleme.

## Yerelde

Node 24 ve package.json içindeki pnpm sürümünü kullanın.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm test
pnpm typecheck
pnpm build
pnpm preview
```

Statik önizlemede API bağı ayrı çalıştırılmadıysa veri sayfası erişim hatasını açıkça gösterir. Bu normaldir; sayısal örnek veri API yanıtı yerine geçirilmez. Hesaplar API olmadan çalışır.

## İlk kurulum: Cloudflare

1. Cloudflare hesabınızda bir D1 veritabanı oluşturun: `konutseyir-data`. UUID'sini kaydedin.
2. Workers & Pages altında `konutseyir` adlı **Direct Upload** Pages projesi oluşturun. Kaynak GitHub'da kalır, GitHub Actions Wrangler ile dağıtır. Dashboard'un sürükle-bırak yöntemi Functions katmanını kurmaz; bu paket için Actions/CLI kullanın.
3. GitHub'da özel `konutseyir` deposu oluşturup bu klasörün içeriğini ekleyin. node_modules, .env, .dev.vars, dist ve .render eklemeyin.
4. GitHub deposunda `production` environment oluşturun. Actions secrets:
   - `CLOUDFLARE_API_TOKEN`: yalnızca ilgili hesabın Pages/Workers/D1 dağıtımı için yetkili token.
   - `CLOUDFLARE_ACCOUNT_ID`: hesap kimliği.
5. Repository/environment variables:
   - `CLOUDFLARE_D1_DATABASE_ID`: D1 UUID.
   - `VITE_CONTACT_EMAIL`: çalıştığı doğrulanmış, yayında gösterilecek iletişim e-postası. Bu yoksa dağıtım durur.
   - `EVDS_CPI_SERIES`, `EVDS_HOUSING_SERIES`, `EVDS_DEPOSIT_SERIES`: opsiyonel; aşağıdaki veri koşullarına göre doldurun.
6. `main` dalına gönderin veya Actions içinden workflow'u çalıştırın. Testler → D1 şeması → Worker → Pages sırasıyla dağıtılır.
7. Pages projesi → Custom domains bölümünden `konutseyir.com` ve `www.konutseyir.com` ekleyin. Cloudflare'ın o proje için oluşturduğu DNS kaydını kullanın; eski `chatgpt.site` hedefine yönlendirmeyin. Başka hizmetlere ait kayıtları silmeyin. www kök alana 301 yönlenir.
8. HTTPS etkinleşince `/`, `/karsilastir`, `/api/health`, `/api/market-data`, `/rehber/net-kira-getirisi`, `/sitemap.xml` adreslerini kontrol edin.

Servis bağı root wrangler.jsonc içindeki MARKET_API'dir. Worker herkese açık workers.dev adresi olmadan Pages üzerinden erişilir. Cron hafta içi 13:30 UTC (16:30 Türkiye) çalışır. İlk veriler ilk başarılı cron sonrasında gelir; Sources ekranı o zamana kadar veri yok der. İlk dağıtımdan sonra Cloudflare panelindeki zamanlanmış tetikleme veya bir sonraki cron ile kontrol edin.

## EVDS ve diğer veriler

- Ücretsiz, anahtarsız: TCMB günlük döviz XML. 15.09.2026 tarihinde HTTP 200 ve XML ayrıştırma doğrulandı. Bu, Cloudflare ağında üretim erişiminin test edildiği anlamına gelmez.
- EVDS adaptörü EVDS 2 uyumlu REST sözleşmesini kullanır. Güncel EVDS hesabınızda endpoint/seri tanımlarını teyit edin. Anahtar olmadan uçtan uca doğrulanmış değildir. Kod alanları bilerek boş; tahmini seri kodu yok.
- Anahtarı **Worker secret** olarak Cloudflare panelinden `EVDS_API_KEY` adıyla ekleyin veya `pnpm exec wrangler secret put EVDS_API_KEY --config worker/wrangler.deploy.json` kullanın. Sohbete, GitHub koduna veya VITE_ değişkenlerine eklemeyin.
- CPI ve housing aylık endeks **seviyesi** olmalı; yıllık değişim serisi kullanmayın. Aynı ayın bir önceki yıl gözlemi yoksa oran hesaplanmaz. Yeniden bazlama/revizyon döneminde tutarlı seri gerekir.
- Deposit serisi yıllık brüt yüzde cinsinde, temsil ettiği vade açıkça belirlenmiş aylık seri olmalı. Kod, frekans, birim ve dönüşüm gerçek hesapla doğrulanmadan etkinleştirmeyin. Seri banka teklifine eşit değildir.
- TÜİK il satışları, ilçe fiyatları ve otomatik vergi oranları bu sürümde entegre değildir. Şehir sayfaları kaynak yönlendirmesidir ve veri eklenene kadar noindex tutulur; sitemap'e alınmaz.
- Mevduat stopajı kullanıcı girdisidir. Açılış/yenileme tarihi, vade ve hesap türüne göre banka/GİB ile doğrulanmalıdır. Sabit örnekler otomatik yasal kural gibi sunulmaz.

## API

GET `/api/health`: servis/D1 durumu; kaynak güncelliğini garanti etmez.
GET `/api/market-data`: alan başına kaynak, gözlem dönemi, son çekim, durum, yıllık endeks değişimi.
GET `/api/history?series=cpi`: sınırlı geçmiş; usd, eur, cpi, housing, deposit.

D1'da yalnızca kamu gözlemleri saklanır. Kullanıcı hesap girdileri sunucuya gönderilmez. Yazma HTTP uç noktası yoktur. Anahtarlar hata mesajlarında gösterilmez.

## Finansal varsayımlar

Konut + net kira, dönem sonu satış gideri sonrası değerle karşılaştırılır. Başlangıç sermayesi ev fiyatı + alım maliyetidir. Kira yıl içinde yeniden yatırıma yönlendirilmez. Reel TL sonucu başlangıç satın alma gücüdür. Kredi aracı ayrı hesaplanır; kaldıraçlı yatırım getirisi iddiası yoktur. 365 günlük mevduat basit faizdir, otomatik vade yenileme/bileşik getiri varsayılmaz. Net kira vergisi ve satış vergisi kişinin durumuna göre tutar olarak girilir. Negatif net kira korunur; pozitif olmayan net kirada amortisman verilmez.

## Yayın sonrası

Önce gerçek EVDS yanıtlarını kaynak ekranındaki dönem/birimlerle karşılaştırın. İletişim e-postasını test edin. Arama konsoluna sitemap ekleyin. Reklam/analiz kodu bu pakette yoktur; AdSense onayı garanti edilmez. Reklam eklemeden önce yayıncı bilgileri, gerekli gizlilik/tercih akışları ve içerik editör kontrolü tamamlanmalıdır.

## Kaynaklar

- https://developers.cloudflare.com/pages/functions/bindings/
- https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/
- https://www.tcmb.gov.tr/kurlar/today.xml
- https://evds3.tcmb.gov.tr/
- https://data.tuik.gov.tr/
- https://www.gib.gov.tr/
