# Seyir izin düzeltmesi — 28 Eylül 2026

## Kaynak ve teslim
- AltınSeyir: AltinSeyir-v56.zip temel alınarak v57 tam paket hazırlandı.
- KonutSeyir: robotbilge/konutseyir main dalından okunan güncel dosyalara göre Consent v1 kaynak yaması hazırlandı. Tam site paketi değildir.
- Canlı siteler değiştirilmedi. Canlı sitelere erişim ve Chrome/WebKit kurulumu başarısız oldu; gerçek Chrome, Safari, dokunma, hesapta veri alımı ve canlı console testleri tamamlanmadı.

## Bulunan nedenler
- AltınSeyir app.js, AdSense kimliği varsa showConsent fonksiyonundan çıkıyordu.
- Ayrı analytics.js kullanıcı iznini okumadan GA4 etiketini yüklüyordu.
- KonutSeyir buton HTML'inde disabled yoktu. Bileşene özel arka plan/yazı rengi eksikti; canlı hesaplanan CSS erişim yokluğu nedeniyle doğrulanamadı.
- KonutSeyir'de izni geri alma/tercihi yeniden açma akışı yoktu. Geçersiz depolama değerleri de pencereyi gizleyebiliyordu.

## Uygulanan değişiklikler
- İki sitede aynı JS motoru ve kapsamı yalnız pencereyle sınırlı aynı CSS.
- Yeni kullanıcıya “Ziyaret ölçümü tercihi”; Reddet ve Kabul et düğmeleri.
- Kabul: tek GA4 etiketi, tek config. Ret/karar yok: GA4 etiketi eklenmez.
- Consent Mode v2 parametreleri başta denied; kabul yalnız analytics_storage alanını granted yapar. Reklam izni verilmez.
- Footer “Çerez tercihleri” bağlantısı; mevcut kararı silmeden yeniden açma.
- İzni geri alma: ga-disable, denied güncellemesi, GA çerezlerini silme ve yüklenmiş GA dinleyicilerini kaldırmak için sayfayı yenileme.
- localStorage + host kapsamlı tercih çerezi; localStorage engelliyse çerez yedeği. İkisi de engelliyse oturumlar arasında kalıcılık garanti edilemez.
- KonutSeyir ks_analytics_consent granted/denied kayıtları korundu.
- AltınSeyir eski necessary tercihi ret sayıldı. Eski all seçeneği metninde Analytics izni bulunmadığı için bu kayıt silinmeden yeni ölçüm izni sorulur. Açık Analytics izni varmış gibi yorumlanmaz.
- Tercihler iki ayrı alan adı arasında paylaşılmaz. api.altinseyir.com haber sayfaları ayrı host olduğu için kendi tercih kaydını tutar.
- Kabul düğmesi #075b43 / beyaz; ret beyaz / yeşil çerçeve ve yazı. İkisi de en az 48px, opacity:1, pointer-events:auto.
- Mevcut reklam yükleme sistemi korunmuştur. Bu bileşen Analytics içindir; Google sertifikalı reklam CMP'sinin yerine geçmez.

## Doğrulama
25 Node VM ve statik kontrol geçti. Bunlar gerçek tarayıcı testleri değildir.
- Her site için ilk ziyaret, ret, kabul, yeniden açma, kayıtla yeniden başlatma, geçersiz tercih, localStorage engeli ve çerez yedeği.
- İzni geri alma, GA çerez temizliği, sekmeler arası değişiklik, iki kez yüklenmeye karşı koruma.
- AltınSeyir 58 HTML sayfasında yapılandırılmış tek başlatıcı ve tercih bağlantısı.
- Eski çakışan consent kodunun kaldırılması, iki motorun ve CSS'nin birebir eşitliği.
- JS sözdizimi kontrolleri geçti. Worker haber şablonu da güncellendi.

## Yayın sonrası zorunlu kontrol
Her alan adında Chrome ve gerçek iPhone Safari ile temiz tarayıcı verisi kullanın. İlk ziyarette pencere ve iki aktif düğmeyi doğrulayın. Network'te karar öncesinde ve ret sonrasında googletagmanager.com/gtag/js ve Analytics collect istekleri bulunmamalı. Kabulde doğru G- kimliğiyle etiket yüklenmeli. Yenileme ve farklı sayfada karar korunmalı. Tercihi yeniden açıp ret seçince sayfa yenilenmeli ve GA tekrar yüklenmemeli. Console hatalarını kontrol edin. GA hesabında Gerçek zamanlı rapor ayrıca doğrulanmalıdır.

Teknik dayanak: https://developers.google.com/tag-platform/security/concepts/consent-mode ve https://developers.google.com/tag-platform/security/guides/consent-debugging
