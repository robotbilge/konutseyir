export const mortgageOfferGuide = {
 slug: 'konut-kredisi-faiz-karsilastirmasi-kasim-2026-sigorta-maliyeti',
 title: 'Konut kredisinde düşük faiz her zaman ucuz mu? Kasım 2026 taksit karşılaştırması',
 summary: 'Aylık %3,10 ve %3,45 oranlarıyla 2 milyon TL kredi ve 120 ay vadede taksit farkını hesapladık. Sigorta, yıllık maliyet ve toplam ödeme neden birlikte kontrol edilmeli?',
 publishedAt: '2026-11-25',
 updatedAt: '2026-11-25',
 body: [
  'Kasım 2026 sonunda ev almak isteyenlerin önünde tek bir kredi faizi yok. Türkiye İş Bankası’nın erişilebilir konut kredisi ürün sayfasında hayat sigortalı kampanya için aylık %3,10, hayat sigortasız kampanya için aylık %3,45 oranı listeleniyor. Bunlar bankanın ürün sayfasında gösterilen örnek oranlardır; herkesin alabileceği kesin teklif değildir. Müşterinin kredi notu, geliri, vadesi, teminatı ve kampanya koşulları sonucu değiştirebilir.',
  'Asıl kritik soru yalnız “Aylık faiz kaç?” değil, “Peşinatımı verdikten sonra 120 ay boyunca ve işlemin başında cebimden toplam ne kadar çıkacak?” sorusudur. İki örnek oranı aynı kredi tutarı ve vadede karşılaştırarak finansman teklifinin nasıl okunması gerektiğini gösterelim.'
 ]
} as const;

export const mortgageOfferGuideSections = [
 {heading:'2 milyon TL kredi: aynı vade, farklı aylık faiz',paragraphs:[
  'Örnek hesaplama: Anapara 2.000.000 TL, vade 120 ay ve eşit taksitli sabit oran varsayılmıştır. Aylık %3,10 faizle yaklaşık 63.632 TL taksit ve 7.635.801 TL toplam taksit; aylık %3,45 faizle yaklaşık 70.199 TL taksit ve 8.423.830 TL toplam taksit oluşur. Aylık fark yaklaşık 6.567 TL, 120 taksit toplamında yaklaşık 788.029 TL’dir. Sonuçlar yuvarlanmıştır; vergiler ve diğer maliyetler dahil değildir.',
  'Bu iki rakam aynı bankanın hayat sigortalı ve sigortasız ürün seçeneklerinden alınan ilan edilmiş faiz örnekleriyle oluşturulmuş matematiksel senaryodur. %3,10 seçeneğinin toplamda kesin 788 bin TL avantajlı olduğunu göstermez; sigorta primleri ve diğer ödeme koşulları eklenince gerçek fark değişir.'
 ]},
 {heading:'Hayat sigortası dahil edilmeden “en ucuz kredi” denemez',paragraphs:[
  'Hayat sigortalı kampanyada aylık faiz daha düşük görünebilir. Ancak sigortanın ilk yıl primi, sonraki yıllardaki yenileme koşulları, ödeme şekli, poliçe kapsamı, iptal ve iade koşulları toplam finansman maliyetinin parçasıdır. Hayat sigortasız seçenekte aylık taksit yüksek olabilir fakat sigorta gideri aynı şekilde doğmayabilir.',
  'Bir teklif dosyasında en az şu kalemleri ayrı satırlara yazın: aylık taksit, toplam taksit, tahsis ücreti, ekspertiz, ipotekle ilgili masraflar, DASK, varsa konut/hayat sigortası ve bankanın sözleşme öncesi gösterdiği yıllık maliyet oranı. Aynı hizmeti iki kez gider saymayın.'
 ]},
 {heading:'Kredi üst sınırı ile bankanın teklif ettiği faiz farklı şeylerdir',paragraphs:[
  'BDDK’nın 19 Kasım 2026 tarihli kararı ikinci evini alacak bazı tüketiciler için kredi-değer oranına ilişkin kısıtı değiştirdi. Bu, bankaların faiz oranını indirmesi veya herkesin belirtilen üst sınırda kredi alabilmesi anlamına gelmiyor. Kredi-değer üst sınırı, enerji sınıfı ve ekspertiz değerine; fiilen kullanılabilecek kredi ise banka onayına ve geri ödeme gücüne bağlıdır.',
  'Yeni düzenlemeyi ayrı makalemizde açıklıyoruz. Bu yazının konusu ise bankadan alınan iki finansman teklifinin nakit akışıyla nasıl karşılaştırılacağıdır. 2 milyon TL kredi hesabını kullanıcının kendi başvurusu için kesin ödeme planı sanmamak gerekir.'
 ]},
 {heading:'Önce taksiti, sonra bütçenin dayanıklılığını hesaplayın',paragraphs:[
  'Örneğin hane aylık net gelirinin 120.000 TL olduğunu varsayalım. Yaklaşık 63.632 TL taksit gelirin %53’ünden fazlasını, yaklaşık 70.199 TL taksit yaklaşık %58,5’ini tüketir. Bu örnekler banka kredi onay eşiği değildir; sadece nakit akışı baskısını görünür kılar.',
  'Aidat, ısınma, ulaşım, çocuk eğitimi, vergi ve beklenmeyen giderler için aylık nakit kalmadığında düşük oranlı kredi bile finansal risk oluşturabilir. Bankanın kabul ettiği borçluluk sınırını tahmin etmeyin; geri ödeme kapasitenizi kendi yaşam giderlerinizle test edin.'
 ]},
 {heading:'KonutSeyir’de teklifleri karşılaştırırken dört kontrol',paragraphs:[
  'Birinci adım: her bankadan aynı kredi tutarı ve 120 ay gibi aynı vadeyle yazılı ödeme planı isteyin. İkinci adım: faiz oranının aylık mı yıllık mı olduğunu ve sabit mi değişken mi olduğunu kontrol edin. Üçüncü adım: tek seferlik ve dönemsel masrafları ayrı toplamlayın. Dördüncü adım: peşinat ile alım giderlerini hesabın dışında bırakmayın.',
  'KonutSeyir’in konut kredisi hesaplama aracıyla aylık faiz, vade ve anapara senaryolarını değiştirin; alım maliyeti aracıyla tapu ve diğer başlangıç harcamalarını görün. Son karar için yazılı banka teklifini ve sigorta koşullarını esas alın. Faizler ve kampanyalar değişebilir: bu yazıdaki oranların erişim tarihi 25 Kasım 2026’dır.'
 ]},
 {heading:'Sonuç: önemli olan faiz ilanı değil, gerçek ödeme yükü',paragraphs:[
  'Kasım 2026 konut kredisi gündeminde faiz oranları ve ikinci ev için kredi erişimi birlikte tartışılıyor. Ancak bir reklamda görülen düşük aylık oran, başlangıç masrafları ve sözleşme şartları görülmeden “en ucuz finansman” anlamına gelmez. Farklı kampanyaları aynı anapara, vade ve sigorta kapsamı ile eşitlemek daha güvenilir bir karşılaştırmadır.',
  'İlan fiyatına ve banka kampanyasına bakıp acele karar vermek yerine, taksiti gelir-gider bütçenize yerleştirin. İşlem günündeki güncel oranı bankadan alın ve finansman kararınızı tüm maliyetler üzerinden verin.'
 ]}
];