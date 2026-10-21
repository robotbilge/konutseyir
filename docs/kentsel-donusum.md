# Kentsel dönüşüm: kapsam ve hesap analizi

Tarih: 21 Ekim 2026. Mevcut React/Vite, statik ön üretim ve Cloudflare yayın yöntemi korunur. Yeni API, anahtar, D1 tablosu veya dış ücretli hizmet yoktur.

## Kullanıcı soruları ve sayfalar

- `/kentsel-donusum`: bağımsız bölümün yazılı yapım bedeli, dönemsel barınma ve doğrulanmış finansman takviminden aylık nakit planı. Aynı sayfada resmî destek yönlendirmesi ve iki teklif kapsam karşılaştırması.
- `/rehber/kentsel-donusum-butcesi-hibe-kredi-nakit-acigi`: özgün uygulama makalesi; hesapla eşleşen örnek, belge tablosu ve birincil kaynaklar. Rehber dizini, sitemap ve Article metaverisine dahil.
- Ana sayfa alıcı bağlantısı, araç dizini, resmî kontroller, kontrol listesi ve footer üzerinden erişim. Yeni üst menü veya mükerrer kredi aracı yok.

## Hesap sözleşmesi

Ay 0 başlangıç; ay 1..teslim+gecikme dönemsel kira. Üç yapım taksiti başlangıç, kullanıcının belirttiği ara ay ve fiilî teslim ayındadır. Paylar %100 eder, TL yapım bedeli sabittir. Kira artışı yalnız kullanıcı varsayımıdır ve her 12 tam kiralama ayından sonra bileşik uygulanır.

Kullanıcı destekleri senaryoya dahil etmeyi işaretlemiyorsa hibe, kredi, kira desteği ve bu kredi taksitleri dahil edilmez. Araç bu tutarların gerçekten onaylandığını doğrulamaz; destekli sonucu varsayım olarak etiketler. İşaretliyse tek hibe ve tek kredi girişi belirtilen ayda, kira desteği belirtilen ay sayısı boyunca, kredi taksidi belirtilen ilk aydan hesap sonuna kadar uygulanır. Hak sahipliği hesaplanmaz. Aylık girişler giderden önce kullanılabilir kabul edilir.

- Proje gideri = yapım + taşınma + diğer başlangıç giderleri + dönem kiraları.
- Toplam nakit çıkışı = proje gideri + bağlanan depozito + dönem içindeki kredi taksitleri.
- Geri ödemesiz destek = hibe + dönem içindeki kira desteği.
- Özkaynak katkısı = max(0, toplam çıkış − geri ödemesiz destek − kullanılan kredi).
- Aylık bakiye = başlangıç birikimi + birikimli finansman girişleri − birikimli çıkışlar.
- En yüksek ek nakit ihtiyacı = max(0, eksi en düşük aylık bakiye).

Kredi hibe sayılmaz. Taksidin anapara/faiz ayrımı bilinmediğinden kalan borç ve hayat boyu kredi maliyeti üretilmez. Depozito gider değildir; iade tarihi otomatik varsayılmaz. Gün bazında finansman, aylık ek birikim, destek gecikmesi, yapım eskalasyonu ve enflasyondan arındırma modele dahil değildir. Sonuç ekranında bu sınırlar ve kullanılan bütün girdiler görünürdür.

Teklif karşılaştırması bilinen bedel+ek gideri teslim net alanına böler; bu piyasa m² fiyatı değildir. Kapsam/KDV, fiyat artış maddesi, teslim/gecikme ve teminat/şartname notları eksikse açıkça belirtilir. Kazanan veya müteahhit güvenlik puanı üretilmez.

## Resmî kaynak ve güncellik

KDB finansal destek dizini ve kira yardımı kılavuzu 21 Ekim 2026'da incelendi. İBB destek sayfaları arama dizininde mevcutken doğrudan erişimde 502 döndürdü. Sabit destek oranı/tutarı ve kesin uygunluk kuralı koda eklenmedi; durum kullanıcıya açıklanır. Destekler birlikte kullanılabilir varsayılmaz. Liste tüm yerel programları kapsadığını iddia etmez. Kaynaklar `lib/urban-sources.ts` içinde kapsamlarıyla tutulur.

## Doğrulama ve kabul

Normal örnek, desteklerin hariç tutulması, 6 aylık gecikme, geç gelen hibenin ara nakit açığı, kira bileşik artışı, çakışan ödeme ayları, depozito ayrımı, sıfır/boş/hatalı/uç girdiler, finansman fazlası, iki teklif hesabı ve örnek makalenin sayıları test edilir. İç bağlantılar/fragmentler, sitemap/canonical/Article tarihleri, 16 rehber, mevcut finans ve API akışları regresyon testlerine dahildir. Formlar kullanıcı eylemiyle hesaplanır, girdi değişince eski sonuç kaldırılır. Veriler yalnız sayfa belleğinde tutulur.

Yerel typecheck/build/test sonrası GitHub PR kontrolü, ana dal üretim yayını ve canlı form/rehber doğrulaması yapılır. AdSense kabulü veya yatırım/teknik güvenlik garantisi verilmez.
