import {urbanSlug,urbanSources} from './urban-sources';
export const urbanGuide={slug:urbanSlug,title:'Kentsel dönüşüm bütçesi: Hibe, kredi ve nakit açığı nasıl ayrılır?',summary:'Yapım teklifinden aylık nakit planına geçin. Hibe ile krediyi ayırın; destek geç geldiğinde ve teslim geciktiğinde ne kadar ek para gerektiğini örnekle görün.',body:[
 'Kentsel dönüşümde “Bana düşen yapım bedeli ne?” sorusu gereklidir; fakat bütçeyi tamamlamaz. Tahliye sonrası kira, iki taşınma, geçici konut depozitosu ve ödeme aşamaları aynı döneme yığılabilir. Toplam kaynak yeterli görünürken belirli bir ayda para bulunamaması mümkündür.',
 'Bu rehberde bir bağımsız bölümün bütçesini ele alıyoruz. Sayılar öğretici varsayımdır; İstanbul veya başka bir il için piyasa maliyeti, resmî destek tutarı ya da hak sahipliği sonucu değildir. Kendi hesabınızda yazılı teklif, kurum teyidi ve banka ödeme planını birlikte kullanın.'
]};
export const urbanGuideSections=[
 {heading:'Önce dört farklı tutarı birbirinden ayırın',paragraphs:[
 'Yapım ve geçici barınma gideri, projenin sizden götürdüğü tutardır. Hibe ve geri ödemesiz kira desteği bu yükü azaltabilir; kredi ise ödemeyi finanse ederken borç doğurur. “Destek paketi” içindeki kredi anaparasını hibeyle toplayıp tamamını kazanç saymayın.',
 'Depozito başka bir ayrımdır: İleride geri alınabilir olması, taşınma gününde nakit gerektirmediği anlamına gelmez. Bütçede bağlanan nakit olarak tutun. İade koşulu ve tarihi doğrulanmadıysa teslim ayında otomatik iade geliri yazmayın. Kredi taksidi de nakit çıkışıdır; anapara/faiz ayrımı bilinmiyorsa taksidin tamamını projenin yeni gideri diye adlandırmayın.'
 ],bullets:['Yapım ve barınma gideri: harcanan tutarlar.','Geri ödemesiz destek: doğrulanmış hibe ve kira ödemeleri.','Kredi: kullanımı ve taksitleri ayrı izlenen borç.','Depozito: giderden ayrı, geçici olarak bağlanan nakit.']},
 {heading:'Örnek dosya: 2,4 milyon TL yapım bedeli neden 2,4 milyon TL nakitle bitmez?',paragraphs:[
 'Tamamen varsayımsal dosyada size düşen yapım bedeli 2.400.000 TL olsun. Ödeme başlangıçta %30, 9. ayda %40, teslimde %30: sırasıyla 720.000, 960.000 ve 720.000 TL. Sözleşmede teslim 18 ay; ayrıca 6 aylık gecikme senaryosu çalıştırılıyor. Başlangıç birikimi 1.000.000 TL.',
 'Geçici kira ayda 25.000 TL ve bu örnekte artış sıfır. İki taşınmanın toplamı 50.000 TL, diğer başlangıç gideri 50.000 TL, depozito 50.000 TL. Kullanıcının kurumla doğruladığını varsaydığımız hibe 600.000 TL ve kredi 600.000 TL, ikisi de 9. ayda geliyor. Kira desteği 1–18. aylarda ayda 5.000 TL. Bu tutarlar herhangi bir programın güncel tarifesi değildir.',
 'Kredi için banka planından girilen taksit 19. aydan başlayarak ayda 10.000 TL. Araç bu taksidi kendisi faizden üretmez. 24 aylık senaryoda toplam kira 600.000 TL; yapım, kira, taşınma ve diğer gider toplamı 3.100.000 TL olur. Depozito 50.000 TL ve dönem içindeki altı taksit 60.000 TL eklenince toplam nakit çıkışı 3.210.000 TL’ye ulaşır.',
 'Geri ödemesiz destek toplamı 600.000 + 18 × 5.000 = 690.000 TL’dir. Kredi anaparası ayrı 600.000 TL. Bu dönemi tamamlamak için toplam özkaynak katkısı 3.210.000 − 690.000 − 600.000 = 1.920.000 TL olur. Başlangıçtaki 1.000.000 TL’ye ek en yüksek nakit ihtiyacı 920.000 TL’dir. Bu rakam kalan kredi borcu veya kredinin hayat boyu maliyeti değildir.'
 ]},
 {heading:'İlk açık 7. ayda: Toplam kadar ödeme sırası da önemlidir',paragraphs:[
 'Örnekte başlangıç ödemesi 720.000 TL; taşınma, diğer gider ve depozito birlikte 150.000 TL. Birikimden 870.000 TL çıkınca 130.000 TL kalır. İlk aylarda 25.000 TL kiradan 5.000 TL destek düşülür: ayda 20.000 TL net çıkış. Altıncı ay sonunda 10.000 TL kalırken 7. ayda 10.000 TL açık doğar.',
 '9. ayda hibe ve kredi gelmesi, 7. aydaki ödeme ihtiyacını geriye dönük ortadan kaldırmaz. Köprü finansmanı gerekiyorsa bunun koşul ve maliyetini ayrıca belgeleyin. Aracın bakiyesi dışarıdan otomatik para eklemez; negatif tutar, ek kaynak olmadan o tarihte oluşacak açığı gösterir.',
 'Aylık modelde aynı ayın girişleri giderlerinden önce kullanılabilir kabul edilir. Ayın 25’inde gelecek destek, ayın 5’indeki müteahhit ödemesini karşılamayabilir. Büyük ödemelerde aylık tabloyu gün bazında banka hesabı ve sözleşme takvimiyle ayrıca kontrol edin.'
 ]},
 {heading:'Altı ay gecikmenin bedeli yalnız altı kira değildir',paragraphs:[
 'Aynı dosyada teslim 18. ayda gerçekleşirse toplam nakit çıkışı 3.000.000 TL, özkaynak katkısı 1.710.000 TL olur. Destek süresi uzamadan teslim 24. aya giderse özkaynak ihtiyacı 210.000 TL artar: 150.000 TL ek kira ve 19–24. aylara denk gelen 60.000 TL kredi taksidi.',
 'Burada yapım bedeli sabittir; ek taşınma, sözleşmedeki fiyat artış maddesi, yeni aidat, destek ödeme gecikmesi ve sermayenin zaman değeri yoktur. Bu nedenle 210.000 TL her dönüşüm için gecikme maliyeti değildir. Sözleşmeniz farklıysa kendi kalemlerinizi ve tarihlerinizi yeniden girin. Kira desteğinin bitişi teslim uzadı diye otomatik ileri taşınmamalıdır.'
 ]},
 {heading:'İki müteahhit teklifini aynı kapsamda okumak',paragraphs:[
 'İkinci öğretici örnekte A teklifi 2.400.000 TL yapım katkısı, 100.000 TL bilinen ek gider, 90 m² teslim net alanı ve 18 ay; B teklifi 2.300.000 TL katkı, 250.000 TL ek gider, 85 m² net alan ve 24 ay olsun. Bilinen toplam A’da 2.500.000 TL, B’de 2.550.000 TL’dir. A’nın teslim net m² başına katkısı yaklaşık 27.778 TL; B’nin 30.000 TL olur.',
 'Bu oran bir dairenin piyasa m² fiyatı değildir. Arsa payı karşılığı, mevcut ve yeni hakların niteliği, teknik şartname ve teminatlar bu basit bölmede yoktur. Düşük başlık bedelinden otomatik iyi teklif sonucu çıkarmayın. KDV, hariç işler, fiyat artış maddesi, teslim/gecikme koşulu ve net alan belgesi aynı kapsamda karşılaştırılmalıdır.'
 ]},
 {heading:'Resmî destekleri nasıl doğrulamalı?',paragraphs:[
 'KDB’nin Finansal Destek sayfası Yarısı Bizden, kira yardımı ve faiz desteği belgelerine erişim sağlar. Kira Yardımı Kılavuzu malik ve kiracı başvurularını farklı belge durumlarıyla ele alır. Kişisel dosyanızda hangi yolun geçerli olduğunu yetkili idareden öğrenin; bir programın adını görmek ödeme onayı değildir.',
 'İstanbul için KDB programları ile İBB’nin kira/mali destek başlıkları aynı program sayılmaz. Aynı anda yararlanma, ödeme takvimi ve kişisel koşullar kurumdan doğrulanmadan destekleri üst üste eklemeyin. 21 Ekim 2026 kontrolünde İBB’nin ilgili sayfalarına doğrudan erişimde hata alındı; bu nedenle eski tutar veya oranı güncelmiş gibi bu rehbere aktarmadık.',
 'Riskli yapı tespiti, hızlı tarama, proje uygunluğu ve finansman kararı ayrı kontrollerdir. Yapının durumunu bütçe hesabından çıkarmayın. Risk/teknik iddialar için yetkili incelemeye; tapu, sözleşme ve hak uyuşmazlığı için yetkili kurum ve uzman değerlendirmesine başvurun.'
 ]},
 {heading:'İmza öncesi dosyanızda bulunması gereken sonuç',paragraphs:[
 'Tek bir toplam yerine dört çıktı hazırlayın: bedel/kapsam tablosu, belge ve açık sorular listesi, ay bazında giriş-çıkış çizelgesi ve gecikme senaryosu. Tutarın kaynağını, kontrol tarihini ve belgenin hangi bağımsız bölüme ait olduğunu not edin. Eksik bilgiyi sıfır maliyet veya kesin destek olarak tamamlamayın.',
 'Dönüşüm bütçesi aracı planı görünür kılar; sözleşmeyi, bankanın teklifini veya resmî başvuruyu onaylamaz. Hesaplamadan sonra en yüksek nakit açığının hangi ayda oluştuğunu bulun ve o aya ait kaynağın gerçekten kullanılabilir olduğunu doğrulayın.'
 ]}
];
export const urbanGuideEvidence={takeaways:['Hibe maliyeti azaltır; kredi anaparası geri ödenecek borçtur. Aynı destek başlığında birleşmeleri bu ayrımı değiştirmez.','Örnekte ilk açık 7. ayda, en yüksek ek nakit ihtiyacı 920.000 TL. Destek tarihi ile ödeme tarihi birlikte kontrol edilmelidir.','18 aydan 24 aya gecikme örneğinde ek kira ve dönem içi taksit toplamı özkaynak ihtiyacını 210.000 TL artırır.'],sources:urbanSources};
export const urbanGuideWorkbook={question:'İmzadan önce hangi tutarın ve tarihin kanıtı eksik?',deliverable:'Tek bağımsız bölüm için bedel, belge kaynağı, ödeme ayı ve açık soruyu eşleştiren dönüşüm dosyası.',rows:[
 {finding:'Düşük yapım bedelinin dışında kalan işler belli değil.',evidence:'KDV dahil yazılı teklif, teknik şartname ve hariç işler listesi.',action:'Bilinen ek giderleri ayrı yazın; kapsamı eşitlemeden iki teklifi sıralamayın.'},
 {finding:'Destek toplamı biliniyor, ödeme günü/ayı belirsiz.',evidence:'Kurumun dosyanıza ilişkin tutar, takvim ve birlikte kullanım teyidi.',action:'Doğrulanmadıysa desteği hesaba katmayın; ara dönemdeki açığı ayrıca görün.'},
 {finding:'Teslim uzuyor ama kira ve taksit değişmiyor gibi hesaplanmış.',evidence:'Mevcut kira koşulu, destek süresi, kredi planı ve sözleşmedeki gecikme maddesi.',action:'Ek kira/taksidi takvime yerleştirin; destek süresini kendiliğinden uzatmayın.'}
]};
