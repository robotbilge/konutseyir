export const cities=[
 {slug:"istanbul",name:"İstanbul",region:"İstanbul",note:"İstanbul’da ulaşım vaadini zamanla sınayın."},
 {slug:"ankara",name:"Ankara",region:"Ankara",note:"Ankara’da toplam aylık barınma giderini karşılaştırın."},
 {slug:"izmir",name:"İzmir",region:"İzmir",note:"İzmir’de sürekli kullanım ile dönemsel kullanım bütçesini ayırın."},
 {slug:"adana",name:"Adana",region:"Adana ve Mersin",note:"Adana’da alan ve kullanım giderini birlikte kontrol edin."},
 {slug:"antalya",name:"Antalya",region:"Antalya, Burdur ve Isparta",note:"Antalya’da sezonluk bedelden yıllık gelire geçerken boş ayları yazın."},
 {slug:"bursa",name:"Bursa",region:"Bursa, Eskişehir ve Bilecik",note:"Bursa’da konut arzını ilan sayısından farklı okuyun."},
 {slug:"kocaeli",name:"Kocaeli",region:"Kocaeli, Sakarya, Düzce, Bolu ve Yalova",note:"Kocaeli’de bağlantı mesafesini günlük yolculukla doğrulayın."},
 {slug:"konya",name:"Konya",region:"Konya ve Karaman",note:"Konya’da büyük metrekareyi kullanılabilir alanla sınayın."},
 {slug:"gaziantep",name:"Gaziantep",region:"Gaziantep, Adıyaman ve Kilis",note:"Gaziantep’te yeni yapı beyanını belgeyle eşleştirin."},
 {slug:"trabzon",name:"Trabzon",region:"Trabzon, Ordu, Giresun, Rize, Artvin ve Gümüşhane",note:"Trabzon’da güzergâh ve bina bakımını konum ilanından ayırın."},
 {slug:"balikesir",name:"Balıkesir",region:"Balıkesir ve Çanakkale",note:"Balıkesir’de kıyı konutu ile merkez konutunu aynı kirayla sıralamayın."},
 {slug:"mugla",name:"Muğla",region:"Aydın, Denizli ve Muğla",note:"Muğla’da kiralama vaadini uygulanabilir sözleşme ve izinle sınayın."},
] as const;

export const guides=[
  {
    "slug": "kira-carpani-nedir",
    "title": "Kira çarpanı nedir?",
    "summary": "Brüt çarpanı net getiriden ayırın; iki benzer ilanı aynı kira ve maliyet tanımıyla karşılaştırın.",
    "body": [
      "Kira çarpanı satış fiyatının yıllık brüt kiraya oranıdır. Düşük çıkan sayının fırsat mı, eksik gider hesabı mı olduğunu anlamak için aşağıdaki iki aşamalı hesabı uygulayın."
    ]
  },
  {
    "slug": "ev-pahali-mi",
    "title": "Bir evin pahalı olduğu nasıl anlaşılır?",
    "summary": "Alan hatasını, il göstergesinden farkı ve kişisel bütçe sınırını ayrı kontrol edin.",
    "body": [
      "Bir ilanın il ortalamasından yüksek olması tek başına pahalı olduğunu göstermez. Önce aynı şeyleri karşılaştırdığınızdan emin olun; sonra fiyatın hangi belge ve nakit akışıyla desteklendiğini araştırın."
    ]
  },
  {
    "slug": "net-kira-getirisi",
    "title": "Net kira getirisi nasıl hesaplanır?",
    "summary": "Tahsilatı, malike kalan giderleri ve başlangıç sermayesini belgeleyerek elde kalan kirayı bulun.",
    "body": [
      "Sözleşmedeki aylık kira düzenli gelir vaadidir; net kira, tahsilat ve malikin giderleri düşüldükten sonra kalan tutardır. Aynı aidatı ya da vergiyi iki kez düşmek de hiç düşmemek kadar yanıltıcıdır."
    ]
  },
  {
    "slug": "reel-konut-getirisi",
    "title": "Reel konut getirisi neden önemlidir?",
    "summary": "TL kârını satın alma gücünden ayırın; dönem sonu yaklaşımının sınırını görün.",
    "body": [
      "Reel getiri, aynı dönem enflasyonuyla düzeltilmiş toplam sonucu gösterir. Yalnız fiyat artışından enflasyonu çıkarmak doğru oranı vermez."
    ]
  },
  {
    "slug": "ev-mi-mevduat-mi",
    "title": "Ev mi mevduat mı?",
    "summary": "Aynı sermaye ve aynı tarihlerde net nakdi karşılaştırın; vade yenilemesini garanti saymayın.",
    "body": [
      "Bu sorunun cevabı tek bir faiz veya fiyat artış oranı değildir. Evde oturmanın sağladığı kira tasarrufu ile kiraya verilerek elde edilen gelir ayrı senaryolardır."
    ]
  },
  {
    "slug": "konut-kredisi-maliyeti",
    "title": "Konut kredisi gerçek maliyeti",
    "summary": "Aylık oran, ödeme planı ve ek giderlerin toplam ödemeye etkisini ayrı okuyun.",
    "body": [
      "Aylık taksitin bütçeye uyması kredinin toplam maliyetini açıklamaz. Bankadan sözleşme öncesi bilgi formu ve ödeme planını isteyin; hesabı bu iki belgeyle kontrol edin."
    ]
  },
  {
    "slug": "tapu-kontrolu",
    "title": "Tapu kaydında neler kontrol edilmeli?",
    "summary": "Satın aldığınız bağımsız bölümün kimliğini ve kayıt üzerindeki sınırlamaları ödeme öncesinde eşleştirin.",
    "body": [
      "İlanda gösterilen daire ile tapudaki taşınmazın aynı olması kontrolün başlangıcıdır. Parsel haritası bir konumu gösterir; malik ve kısıtlama araştırmasının tamamı değildir."
    ]
  },
  {
    "slug": "iskan-kat-mulkiyeti",
    "title": "İskân ve kat mülkiyeti farkı",
    "summary": "Kullanım izni, tapu niteliği ve projeye uygunluğu üç ayrı kontrol olarak ele alın.",
    "body": [
      "Yapı kullanma izin belgesi ile kat mülkiyeti farklı kayıtlardır. İlandaki “iskânlı” veya “krediye uygun” ifadesi belge kontrolünü tamamlamaz."
    ]
  },
  {
    "slug": "deprem-riski-kontrolu",
    "title": "Deprem riski nasıl araştırılır?",
    "summary": "AFAD tehlike bilgisinden binaya özgü incelemeye geçiş adımlarını izleyin.",
    "body": [
      "Bir harita rengi veya yakın geçmiş deprem listesi satın alacağınız binanın dayanıklılık sonucu değildir. Konum bilgisi ile yapının performansını ayrı kanıtlarla araştırın."
    ]
  },
  {
    "slug": "aidat-borc-kontrolu",
    "title": "Aidat ve ortak gider kontrolü",
    "summary": "Aylık aidatın arkasındaki bütçeyi, büyük onarımı ve devir günündeki borcu görün.",
    "body": [
      "Bugünkü aidat tutarı tek başına yeterli değildir. Alıcının nakit ihtiyacını değiştiren unsur, henüz tahsil edilmemiş büyük onarım kararı da olabilir."
    ]
  },
  {
    "slug": "kiracili-ev-almak",
    "title": "Kiracılı ev alırken dikkat",
    "summary": "Mevcut kira sözleşmesini ve teslim beklentisini aynı alım dosyasında değerlendirin.",
    "body": [
      "Kiracılı evde piyasa kirası ile fiilen tahsil edeceğiniz kira farklı olabilir. Satın alma kararı “kiracı çıkar” sözüne dayanıyorsa önce hukuki ve teslim koşullarını netleştirin."
    ]
  },
  {
    "slug": "brut-net-metrekare",
    "title": "Brüt ve net metrekare",
    "summary": "İlanda ucuzluk algısını değiştiren payda hatasını örnekle ayıklayın.",
    "body": [
      "Metrekare fiyatında işlem basittir; belirleyici olan bölünen alanın neyi kapsadığıdır. Bir ilandaki brüt tanımı diğer ilanın brüt tanımıyla dahi aynı olmayabilir."
    ]
  },
  {
    "slug": "ilan-fiyati-pazarlik",
    "title": "İlan fiyatı ve pazarlık payı",
    "summary": "Rastgele indirim yüzdesi yerine belgelenmiş toplam maliyete dayalı teklif oluşturun.",
    "body": [
      "İlan bedeli satıcının talebidir. İndirim miktarı, tek başına iyi alım yapıldığını göstermez; yüksek başlangıç fiyatından büyük indirim hâlâ pahalı sonuç verebilir."
    ]
  },
  {
    "slug": "emlak-alim-masraflari",
    "title": "Ev alırken unutulan masraflar",
    "summary": "Başlangıç bütçesini yazılı teklifler ve resmî tahakkuklarla tamamlayın.",
    "body": [
      "Bir ev için ayırdığınız para satış bedeline tam yetiyorsa işlem bütçeniz henüz tamamlanmış değildir. Alım gideri ile yıllık gideri ve ayrılan nakit rezervini ayırın."
    ]
  },
  {
    "slug": "konut-endeksi-okuma",
    "title": "Konut fiyat endeksi nasıl okunur?",
    "summary": "KFE puanını TL fiyatından, bölgeyi ilden ve yayın tarihini veri döneminden ayırın.",
    "body": [
      "KFE fiyat hareketini izler; ilan için otomatik ekspertiz üretmez. Sonuç okumaya başlamadan serinin adını, kapsamını, birimini ve dönemini kontrol edin."
    ]
  }
] as const;

export type GuideSection={heading:string;paragraphs:string[];bullets?:string[]};

export const guideExpansions:Record<string,GuideSection[]>={
  "kira-carpani-nedir": [
    {
      "heading": "Aynı ev için iki farklı sonuç",
      "paragraphs": [
        "Örnek hesap, piyasa verisi değildir: 5.000.000 TL fiyat ve aylık 30.000 TL kira, yılda 360.000 TL brüt gelir verir. Fiyat / yıllık kira = 13,89 yıl; ay cinsinden 166,67 aydır. Brüt getiri %7,20 olur.",
        "300.000 TL alım gideri, bir ay boşluk, 35.000 TL yıllık gider ve 20.000 TL örnek vergi bütçesi ekleyin. Yıllık net kira 275.000 TL, toplam yatırım 5.300.000 TL olur. Net getiri %5,19; sabit net gelirle basit geri dönüş 19,27 yıldır."
      ]
    },
    {
      "heading": "İki ilandan hangisini elemek gerekir?",
      "paragraphs": [
        "İki evin çarpanını aynı tarihteki kira ile hesaplayın. Birinde mevcut sözleşme kirasını, diğerinde gelecekte beklenen kirayı kullanırsanız sıralama güvenilir olmaz. İlanı verenin kira tahminini en az üç benzer kiralık ilanla sınayın; bunların da istenen fiyat olduğunu not edin.",
        "Daha düşük çarpanlı evin bakım borcu veya belirsiz teslimi varsa, fiyat farkını önce TL gider olarak yazın. Belgesi olmayan riske keyfî yüzde indirim uygulamak, hesap hatasını kesin sonuç gibi gösterir."
      ],
      "bullets": [
        "Kira kaynağını ve kontrol tarihini kaydedin.",
        "Giderlerden sonra net gelir sıfır veya eksi ise geri dönüş yılı üretmeyin.",
        "Artışlı kira projeksiyonunu sabit kira çarpanından ayrı okuyun; ikisi farklı soruları yanıtlar."
      ]
    },
    {
      "heading": "Bu sayı ile karar sınırı",
      "paragraphs": [
        "Çarpan, benzer ilanları ilk sıraya koymak içindir. Satış değeri artışını, paranın zaman değerini ve binanın teknik durumunu ölçmez. Net kira aracında bir ay daha boşluk eklediğinizde karar değişiyorsa yatırımınız doluluk varsayımına hassastır."
      ]
    }
  ],
  "ev-pahali-mi": [
    {
      "heading": "Alan hatası fiyat farkını tersine çevirebilir",
      "paragraphs": [
        "Varsayımsal A evi 5.400.000 TL ve 90 m² net; B evi 5.800.000 TL ve 110 m² nettir. Net birim fiyatlar 60.000 ve yaklaşık 52.727 TL/m² olur. B toplamda daha pahalıyken net metrekarede yaklaşık %12,12 daha düşüktür.",
        "A için 120 m² brüt, B için 110 m² net kullanırsanız bu kıyas bozulur. Onaylı proje veya ölçümle doğrulanamayan alanı açıkça ilan beyanı olarak işaretleyin."
      ]
    },
    {
      "heading": "Üç sütunlu teklif dosyası hazırlayın",
      "paragraphs": [
        "Birinci sütunda aynı mikro konumdaki ilanları; ikinci sütunda doğrulanmış farkları; üçüncüde farkın size maliyetini yazın. Çatı gideri için yönetim kararı, tadilat için yazılı teklif, kiracılı ev için mevcut sözleşme kullanın.",
        "TCMB il göstergesinden yüzde fark, yalnız geniş kapsamlı referansa uzaklığı gösterir. KFE endeks puanını TL/m² sanmayın. Kullanılan serinin birimi, dönemi ve alan türü görünmüyorsa o kıyası teklif gerekçesine dönüştürmeyin."
      ],
      "bullets": [
        "Benzer kat, bina niteliği ve aynı alan türüyle en az üç ilan bulun.",
        "Eksik belgeleri fiyat avantajı varsayarak kapatmayın.",
        "Alım masrafları sonrası elinizde kalacak nakdi ayrı hesaplayın."
      ]
    },
    {
      "heading": "Teklif üst sınırı nasıl kullanılır?",
      "paragraphs": [
        "Örneğin toplam nakit bütçeniz 5.600.000 TL, belgelenmiş başlangıç gideriniz 250.000 TL ve ayıracağınız nakit rezerv 150.000 TL ise satış bedeline ayırabileceğiniz tutar 5.200.000 TL’dir. Bu, evin piyasa değeri değildir; sizin ödeme sınırınızdır. Değerleme, bütçe ve pazarlığı aynı sayı olarak sunmayın."
      ]
    }
  ],
  "net-kira-getirisi": [
    {
      "heading": "Bir yılın nakit hesabını çıkarın",
      "paragraphs": [
        "Örnek: aylık kira 30.000 TL, boşluk bir ay, yıllık malik gideri 35.000 TL ve kullanıcı tarafından hesaplanan yıllık vergi 20.000 TL olsun. Tahsilat 330.000 TL; net kira 275.000 TL; aylık ortalama net nakit yaklaşık 22.917 TL’dir. Bu aylık ortalama, her ay aynı tutarın yatacağı anlamına gelmez.",
        "5.000.000 TL satış bedeli ve 300.000 TL alım gideri için net oran 275.000 / 5.300.000 = %5,19 olur. İkinci bir ay boş kalırsa net 245.000 TL’ye ve oran %4,62’ye iner. Bir aylık kayıp, net yıllık geliri yaklaşık %10,91 azaltır."
      ]
    },
    {
      "heading": "Gideri belgeyle sınıflandırın",
      "paragraphs": [
        "Yönetimin aidat dökümünde kiracıya ait olağan kalem ile malike kalan yenileme payını ayırın. İlk tadilatı başlangıç maliyetine yazdıysanız aynı faturayı yıllık bakıma eklemeyin. Sigorta, emlak vergisi ve onarım için ödeme tarihlerini kaydedin.",
        "Gelir vergisi için GİB’in ilgili gelir yılı rehberini kullanın. Rehberin yayın yılı ile verginin ait olduğu yıl farklı olabilir. Araç vergi beyannamesi hazırlamaz; hesapladığınız yıllık TL tutarını tek kez düşer."
      ],
      "bullets": [
        "Brüt aylık sözleşme kirasını girin.",
        "Vergi sonrası kira tutarını girip ayrıca vergi düşmeyin.",
        "Kredi taksitini işletme gideriyle karıştırmayın; finansman nakit akışını ayrı izleyin."
      ]
    },
    {
      "heading": "Pozitif net kira yeterli mi?",
      "paragraphs": [
        "Yıllık net kira, satış fiyatındaki değişimi ve satana kadar geçecek zamanı içermez. Kullanımınız için nakit akışı önemliyse önce beklenmeyen onarım ve boşlukta taksitleri karşılayıp karşılayamadığınızı kontrol edin; sonra reel getiri hesabına geçin."
      ]
    }
  ],
  "reel-konut-getirisi": [
    {
      "heading": "Yüzde farkı değil oranların oranı",
      "paragraphs": [
        "Örnek konutun başlangıç tutarı 5.000.000 TL, fiyat artışı %20, dönem net kirası 250.000 TL, satış gideri 150.000 TL olsun. Dönem sonu toplamı 6.100.000 TL; nominal kâr 1.100.000 TL ve nominal getiri %22’dir.",
        "Aynı dönem enflasyonu %30 ise 6.100.000 / 1,30 = yaklaşık 4.692.308 TL başlangıç dönemi alım gücü bulunur. Reel zarar yaklaşık 307.692 TL, reel oran −%6,15’tir. %22 − %30 = −%8 yöntemi bu nedenle yanlıştır."
      ]
    },
    {
      "heading": "Hesaplayıcının tek tutar varsayımı",
      "paragraphs": [
        "Araç, dönem başı konut değerini girilen fiyat değişimiyle büyütür; net kira ve satış giderini dönem sonunda ekler/çıkarır. Başlangıç değerine tapu ve tadilat da eklerseniz bu kalemler de aynı oranda değerlenmiş gibi olur. Alım masrafları ile krediyi içeren yatırım performansı için ayrı nakit akışı tablosu gerekir.",
        "Yıl içinde gelen kiraların her biri farklı süre enflasyona maruz kalır. Bu araç hepsini dönem sonunda elde edilmiş kabul eder; aylık yeniden yatırım veya iç verim oranı hesabı değildir."
      ],
      "bullets": [
        "Fiyat değişimi, kira ve TÜFE aynı döneme ait olmalı.",
        "TÜFE kişisel harcama sepetinizin birebir değişimi değildir.",
        "Satış gerçekleşmediyse sonucu gerçekleşmiş kâr diye adlandırmayın."
      ]
    },
    {
      "heading": "Sonucun karar değeri",
      "paragraphs": [
        "Nominal artış yüksekken reel oran eksi çıkması hesabın bozulduğu anlamına gelmez. Önce dönemi ve giderleri doğrulayın. TÜİK’in araçlar arası geçmiş reel getiri tablosu, konutunuza ait toplam getiri yerine kullanılamaz; kapsamları ayrıdır."
      ]
    }
  ],
  "ev-mi-mevduat-mi": [
    {
      "heading": "Önce sermaye ve dönemi eşitleyin",
      "paragraphs": [
        "Tamamen varsayımsal bir yıllık örnekte iki seçenek için 5.300.000 TL başlangıç sermayesi kullanın. Konuta 5.000.000 TL, alım giderine 300.000 TL ayrılıyorsa mevduatı yalnız 5.000.000 TL üzerinden hesaplamayın. Eşit sermaye, başlangıç maliyetinin alternatif getirisini de görünür kılar.",
        "Konut yıl sonunda 5.800.000 TL’ye satılır, net kira 275.000 TL ve satış gideri 150.000 TL olursa toplam 5.925.000 TL; başlangıca göre yaklaşık %11,79 nominal getiri olur. Satış fiyatı burada senaryodur, piyasa tahmini değildir."
      ]
    },
    {
      "heading": "Kısa vadeyi yıllık garantiye çevirmeyin",
      "paragraphs": [
        "5.300.000 TL, yıllık brüt %39, 45 gün ve yalnız örnek olarak %17,5 stopaj varsayımıyla yaklaşık 210.239 TL net faiz üretir. Bu 45 günlük sonuçtur. Aynı oranla yıl boyu yenileme yapılacağı bilinmediği için yıllık kesin gelir diye sunulamaz.",
        "Banka teklifinde yıllık brüt oranı, faiz işleyecek anaparayı, gün sayısını, stopajı ve vade bozma koşulunu okuyun. TCMB ağırlıklı ortalaması banka taahhüdü değildir. Konutta da kira tahsilatı ve satışa kadar geçen süreyi hesaba katın."
      ]
    },
    {
      "heading": "Kullanım amacına göre karar dosyası",
      "paragraphs": [
        "Oturum için alınan evde ödenmeyen kendi kiranızı karşı fayda olarak yazın; aynı ev için ayrıca kiracı geliri eklemeyin. Yatırım için alınan evde tahsil edilen net kira kullanılır. Acil nakit ihtiyacında satış süresi, fiyattan bağımsız bir kısıttır."
      ],
      "bullets": [
        "Banka teklifini aynı tarihte yazılı alın.",
        "Konutun net kira ve satış giderini ayrı belgeleyin.",
        "Eşit dönem oluşmadan iki yüzdelik oranı sıralamayın."
      ]
    }
  ],
  "konut-kredisi-maliyeti": [
    {
      "heading": "Ödeme planını ilk aydan sınayın",
      "paragraphs": [
        "Örnek: 2.000.000 TL kredi, aylık %2,5, 120 ay ve sıfır ek gider için eşit taksit yaklaşık 52.724 TL’dir. İlk ay faiz 50.000 TL, anapara azalması yaklaşık 2.724 TL olur. Uzun vadede ilk taksitlerin büyük bölümü faiz olabilir.",
        "Toplam taksit yaklaşık 6.326.830 TL; bunun yaklaşık 4.326.830 TL’si faizdir. 25.000 TL başlangıç gideri girerseniz araç toplamına ayrıca eklenir. Bu örnek bir banka teklifi değildir."
      ]
    },
    {
      "heading": "Aylık oranı yıllık maliyet sanmayın",
      "paragraphs": [
        "Aylık %2,5’i 12 ile çarpmak %30 verir; fakat bileşik yıllık karşılığı (1,025 üzeri 12 − 1) yaklaşık %34,49’dur. Bankanın yıllık maliyet oranı ise kapsamındaki ücret ve ödeme tarihlerinden de etkilenir. Bu üç sayıyı aynı kavram olarak okumayın.",
        "Sigortalı ve sigortasız teklifleri, ekspertiz ve başlangıç giderlerini birlikte karşılaştırın. Aynı gider ödeme planında zaten varsa araca ikinci kez eklemeyin."
      ],
      "bullets": [
        "Faiz alanı aylık yüzde; yıllık oranı doğrudan yazmayın.",
        "Vade tam ay olmalı; ara ödemeli plan eşit taksit formülüne uymaz.",
        "İlk taksit tarihi ve varsa ödemesiz dönem banka planında ayrıca kontrol edilir."
      ]
    },
    {
      "heading": "Vade uzatmanın sınırı",
      "paragraphs": [
        "Daha uzun vade aylık ödeme yükünü hafifletebilir; toplam faiz farklılaşır. İki teklifi aynı kredi tutarı ve aynı ek gider kapsamıyla çalıştırın. Matematiksel bütçe sonucu kredi onayı, ekspertiz sonucu veya bankanın vereceği limit değildir."
      ]
    }
  ],
  "tapu-kontrolu": [
    {
      "heading": "Üç kimliği yan yana koyun",
      "paragraphs": [
        "İlan adresi ve kapı numarası, tapudaki ada/parsel/bağımsız bölüm bilgisi, onaylı projedeki kat ve bölüm yerini tek tabloda karşılaştırın. Kapıda 8 yazması tapuda da 8 olduğu anlamına gelmeyebilir. Otopark ve depo gibi eklentilerin de hangi bölüme bağlı olduğunu sorun.",
        "Örnek kontrol: satıcı size dördüncü kattaki ön cephe daireyi gösteriyor; projedeki ilgili bağımsız bölüm üçüncü katta ve arka cephede görünüyorsa fiyat pazarlığına devam etmek sorunu çözmez. Önce numara değişikliği veya kayıt uyumsuzluğu açıklanmalıdır."
      ]
    },
    {
      "heading": "Hangi belgeyi kimden istemeli?",
      "paragraphs": [
        "Malikin yetkili kanaldan paylaşacağı güncel tapu kaydı ve işlem yetkisini inceleyin. İpotek, haciz, şerh ve beyan için tapu müdürlüğündeki işlem kontrolünü esas alın. Vekâleten satışta vekâletin kapsamı ayrıca incelenmelidir.",
        "TKGM Parsel Sorgu’yu konum kontrolünde kullanın; ekran görüntüsünü güncel mülkiyet veya takyidat belgesi yerine koymayın. Belediye proje dosyası tapunun yerine geçmediği gibi tapu da fiilî durumun projeye uygunluğunu tek başına kanıtlamaz."
      ],
      "bullets": [
        "Belge tarihini yazın; eski ekran görüntüsüyle yetinmeyin.",
        "Paylı mülkiyette alınan pay ile fiziksel kullanım beklentisini ayırın.",
        "Borç kapama ve kayıt kaldırma adımlarını ödeme planıyla birlikte netleştirin."
      ]
    },
    {
      "heading": "Ne zaman işlemi durdurmalı?",
      "paragraphs": [
        "Malik/temsil yetkisi, bağımsız bölüm kimliği veya kısıtlamanın kaldırılma yolu doğrulanamıyorsa kapora ve bağlayıcı sözleşme öncesinde tapu müdürlüğü ile hukukçuya başvurun. Bu rehber bir taşınmaza ait kayıt sorgulaması yapmaz."
      ]
    }
  ],
  "iskan-kat-mulkiyeti": [
    {
      "heading": "Aynı bağımsız bölüme ait dosya kurun",
      "paragraphs": [
        "Satıcıdan yapı kullanma izin belgesinin örneğini, tapu niteliğini ve onaylı proje bilgisini isteyin. Belediye veya ilgili idarede izin belgesinin hangi bina/blok ve bölümleri kapsadığını doğrulayın. Projede satın alınan bölümün katı, konumu ve eklentileriyle fiilî durumu eşleştirin.",
        "Örneğin çok bloklu bir projede A bloğu için gösterilen kullanım belgesini B bloğundaki daireye otomatik uygulamayın. Belgenin varlığı kadar kapsamı da önemlidir."
      ]
    },
    {
      "heading": "Eksik belgeyi maliyet tahminiyle kapatmayın",
      "paragraphs": [
        "Kat irtifakından kat mülkiyetine geçiş için gereken işlemleri ilgili tapu müdürlüğünden sorun; eksik işlemin nedenini öğrenmeden sabit bir geçiş masrafı veya tamamlanma tarihi varsaymayın.",
        "Sonradan kapatılan balkon, birleştirilen bölüm veya ortak alan kullanımı kayıtlarla farklı olabilir. Bankanın kredi verebiliyor olması bu farkların tamamını gidermez."
      ],
      "bullets": [
        "Tapudaki nitelik ve bağımsız bölüm kimliği",
        "İzin belgesinin tarihi, bina/blok kapsamı",
        "Onaylı projenin fiilî kullanım ile eşleşmesi",
        "Varsa eksik işlem ve düzeltme için yetkili kurumun açıklaması"
      ]
    },
    {
      "heading": "Sonuç dosyanız ne olmalı?",
      "paragraphs": [
        "Her belge için “görüldü / kurumdan doğrulandı / eksik” durumu yazın. Eksik olanın yerine satıcının sözünü koymayın. Teknik uygunsuzluk için mühendislik; mülkiyet ve sözleşme uyuşmazlığı için hukuki değerlendirme gerekir."
      ]
    }
  ],
  "deprem-riski-kontrolu": [
    {
      "heading": "AFAD haritasından ne öğrenilir?",
      "paragraphs": [
        "AFAD Türkiye Deprem Tehlike Haritası seçilen noktanın deprem tehlikesine ilişkin bilgi verir. Binanın proje, malzeme ve uygulama kalitesini göstermez. Aynı adreste güvenli/güvensiz hükmü çıkarmak için bu harita yeterli değildir.",
        "Haritada önce adres/koordinatın doğru yerde olduğunu kontrol edin, sorgu tarihini ve baktığınız parametreyi kaydedin. Sayısal değerin düşük görünmesini rapor yerine kullanmayın."
      ]
    },
    {
      "heading": "Satıcıya yöneltilecek belge soruları",
      "paragraphs": [
        "Ruhsat, onaylı mimari/statik proje, zemin etüdü ve varsa önceki teknik inceleme raporunu sorun. Binada güçlendirme, kat ekleme, kullanım değişikliği veya taşıyıcıya müdahale iddiası varsa belge ve fiilî durum uzman tarafından birlikte incelenmelidir.",
        "Örnek: giriş katında dükkânlar birleştirilmiş ve değişikliğe ait proje gösterilemiyorsa bunu yalnız tadilat masrafı saymayın. Yetkin teknik inceleme tamamlanana kadar yapısal güvence çıkarılamaz."
      ],
      "bullets": [
        "Raporun adres ve bina kimliği doğru mu?",
        "Rapor tarihi, inceleme yöntemi ve kapsamı belirtilmiş mi?",
        "Raporu hazırlayan kuruluşun yetkisi doğrulanabiliyor mu?",
        "Rapordan sonra yapılan değişiklik var mı?"
      ]
    },
    {
      "heading": "Hangi noktada yetkili inceleme gerekir?",
      "paragraphs": [
        "Bina yaşı, DASK poliçesi veya gözle çatlak görülmemesi tek başına performans belgesi değildir. Belirsizlik varsa yetkili mühendislik değerlendirmesi alın. KonutSeyir bu belgeleri görmeden bina puanı, mahalle güvenlik sıralaması veya konuta özel risk skoru üretmez."
      ]
    }
  ],
  "aidat-borc-kontrolu": [
    {
      "heading": "Aylık gider ile tek seferlik katılım payı",
      "paragraphs": [
        "Örnek: malike kalan aylık olağan gider 1.500 TL ise yıllık 18.000 TL’dir. Genel kurulda ayrıca 60.000 TL cephe gideri kararlaştırılmışsa ilk yıl nakit ihtiyacı 78.000 TL olur. Sonraki yıllara aynı 60.000 TL’yi otomatik tekrarlamak hatalıdır.",
        "Bu bir hukuki borç paylaşımı hükmü değil, bütçe örneğidir. Hangi borçtan kimin sorumlu olduğu devir, karar, tahakkuk ve sözleşme belgeleri üzerinden ayrıca incelenmelidir."
      ]
    },
    {
      "heading": "Yönetimden istenecek dosya",
      "paragraphs": [
        "Yönetim planı, son işletme bütçesi, daire borç dökümü ve büyük işlere ait kurul kararlarını isteyin. Borç yazısının hangi tarihe kadar ve hangi kalemleri kapsadığını belirtmesini sağlayın. Sadece “aidat borcu yok” yazısı, planlanan giderin olmadığı anlamına gelmeyebilir.",
        "Satış sözleşmesinde devir tarihine kadar ve sonrasında ödenecek tutarları kalem kalem konuşun. Satıcının kapattığı gider için ödeme belgesi alın; yönetimde kayıtla eşleştirin."
      ],
      "bullets": [
        "Aidat içindeki kiracı/malik kalemlerini ayırın.",
        "Çatı, asansör, cephe ve merkezi tesis yenilemesini sorun.",
        "Net kira hesabında aynı gideri hem aidat hem bakım altında yazmayın."
      ]
    },
    {
      "heading": "Getiriyi bozan eşiği görün",
      "paragraphs": [
        "Yıllık net kiranız 275.000 TL ise örnekteki 60.000 TL ek iş bu tutarın yaklaşık %21,82’sidir. Bu oranı görmeden küçük aidat farkına odaklanmak kararın asıl maliyetini kaçırır. Belgesi olmayan gelecekteki işler için tutar uydurmak yerine teklif ve karar isteyin."
      ]
    }
  ],
  "kiracili-ev-almak": [
    {
      "heading": "Kiracı dosyası olmadan gelir yazmayın",
      "paragraphs": [
        "Yazılı sözleşme ve ekleri, başlangıç/yenileme tarihleri, son ödeme kayıtları, depozito ve yan gider paylaşımını görün. Türk Borçlar Kanunu m.310’daki el değiştirme düzenlemesi nedeniyle satışın kira ilişkisini kendiliğinden bitirdiğini varsaymayın.",
        "Evi oturmak için alıyorsanız gerçekçi teslim koşulları; kiraya vermek için alıyorsanız mevcut sözleşmeyle beklenen tahsilat önemlidir. Tahliye bildirimi veya taahhüt olduğu söyleniyorsa geçerliliğini ve uygulanabilirliğini hukukçu incelemelidir."
      ]
    },
    {
      "heading": "İlk yıl gelirini yeniden hesaplayın",
      "paragraphs": [
        "Örnek: mevcut kira 18.000 TL, çevredeki ilanlarda istenen kira 30.000 TL olsun. Artış ve devir olmadan mevcut sözleşme üzerinden 12 aylık brüt gelir 216.000 TL’dir. 360.000 TL yazmak geliri 144.000 TL, yani mevcut tutara göre %66,67 fazla gösterir.",
        "Bu farkın ne zaman kapanacağı bilinmiyorsa bugünden piyasa kirasına ulaşılmış gibi fiyatlamayın. Belirli bir tahliye süresi, dava sonucu veya otomatik artış burada hesaplanmaz."
      ],
      "bullets": [
        "Depozitonun tutarı ve devir işlemi yazılı mı?",
        "Fiilî kullanım, sözleşmedeki kullanım ile aynı mı?",
        "Gecikmiş tahsilat ve yan gider var mı?",
        "Teslim şartı satış sözleşmesinde somut mu?"
      ]
    },
    {
      "heading": "Kararı hangi bilgi değiştirir?",
      "paragraphs": [
        "Teslim tarihi zorunluysa, belirsiz teslimi yalnız fiyat indirimiyle telafi edilmiş saymayın. Yatırımda ise kredi taksitini mevcut kira karşılamıyorsa aradaki fark için nakit bütçesi ayırın. Mevcut sözleşme görülmeden net kira aracı da güvenilir sonuç üretemez."
      ]
    }
  ],
  "brut-net-metrekare": [
    {
      "heading": "Aynı ev nasıl iki fiyat gibi görünür?",
      "paragraphs": [
        "5.000.000 TL fiyatlı, 100 m² net ve 130 m² brüt bir daire düşünün. Net birim fiyat 50.000 TL/m², brüt birim fiyat yaklaşık 38.462 TL/m²’dir. İki sonuç aynı evindir; yaklaşık %30’luk payda farkını fiyat avantajı sanmayın.",
        "Diğer daire 4.800.000 TL ve 85 m² netse net fiyatı yaklaşık 56.471 TL/m² olur. Daha düşük satış bedeline rağmen net alan başına daha pahalıdır. Alan doğrulanmadan otomatik ucuz/pahalı etiketi uygun değildir."
      ]
    },
    {
      "heading": "Alan kaynağını bir sütun daha ekleyerek izleyin",
      "paragraphs": [
        "Her ilanın fiyat, net, brüt sütunlarının yanına “alan kaynağı” yazın: ilan beyanı, onaylı proje veya yerinde ölçüm. Kullanılan balkon, teras, depo ve ortak alanı bağımsız bölüm içi alanla birleştirmeyin; projedeki niteliğini ayrıca kaydedin.",
        "TCMB brüt il göstergesini nete uyarlamak için aracın kullandığı ilanın brüt/net oranı bir varsayımdır; TCMB’nin yayımladığı bağımsız bir net fiyat serisi değildir. Örneğin brüt/net 1,30 ise 40.000 TL/brüt m² yaklaşık 52.000 TL/net m² karşılığına çevrilir."
      ],
      "bullets": [
        "Net/brüt oranı her bina için sabit kabul edilemez.",
        "Tapu belgesinden tek başına ayrıntılı kullanılabilir alan çıkarmayın.",
        "Proje üzerindeki bölüm ile gösterilen daireyi eşleştirin."
      ]
    },
    {
      "heading": "Kullanım değeri ayrıca ölçülür",
      "paragraphs": [
        "Aynı net alan iki planda aynı kullanışlılığı vermez. Oda ölçülerini ve sirkülasyon alanını kontrol edin; işlevsiz koridor veya az gün ışığı metrekare hesabında görünmez. Sonuç fiyatı standartlaştırır, plan kalitesini puanlamaz."
      ]
    }
  ],
  "ilan-fiyati-pazarlik": [
    {
      "heading": "İndirim yüzdesinin yanıltıcı örneği",
      "paragraphs": [
        "A ilanı 6.000.000 TL’den 5.400.000 TL’ye iniyor: indirim %10. B ilanı benzer nitelikle 5.200.000 TL ve indirim yok. Yalnız indirim oranına bakarsanız A’yı seçebilirsiniz; aynı kapsamda A hâlâ 200.000 TL daha yüksek bedel istiyor.",
        "Bunlar varsayımsal rakamlardır. Gerçekte yakın tarihli benzer ilanlarda alan, bina, kat, cephe, kiracılı durum ve hukuki nitelik farklarını kaydedin. İlanları gerçekleşmiş satış emsali diye adlandırmayın."
      ]
    },
    {
      "heading": "Bir sayfalık teklif notu",
      "paragraphs": [
        "Teklif notunda önerilen satış bedeli, alıcı gideri, belgelenmiş tadilat, kredi koşulu ve teslim tarihini ayrı satırlara yazın. 5.400.000 TL fiyat ile 250.000 TL tadilat, toplam 5.650.000 TL olur; tadilatın 100.000 TL’si için belgeniz yoksa kesin gider diye sunmayın.",
        "TCMB göstergesinden farkı pazarlıkta yardımcı bağlam olarak kullanabilirsiniz. İl ortalamasından sapma, satıcının aynı oranda indirim yapması gerektiği sonucunu üretmez."
      ],
      "bullets": [
        "Fiyatı düşüren her gerekçe için belge veya teklif gösterin.",
        "Kredi ön onayı ile kesin finansmanı ayırın.",
        "Kapora, iade koşulu ve teslim maddelerini fiyat kadar önemseyin."
      ]
    },
    {
      "heading": "Teklifin son kontrolü",
      "paragraphs": [
        "İndirimden sonra toplam nakit ihtiyacı bütçeyi aşıyorsa pazarlık hedefi gerçekleşmiş sayılmaz. Belirsiz kayıt, yetki veya teknik sorun için yalnız daha düşük fiyat önermek yerine önce inceleme tamamlanmalıdır."
      ]
    }
  ],
  "emlak-alim-masraflari": [
    {
      "heading": "Altı kalemlik bütçe örneği",
      "paragraphs": [
        "Tamamen örnek tutarlar: satış 5.000.000 TL, tapu/işlem gideri 105.000 TL, hizmet bedeli 120.000 TL, ilk tadilat 150.000 TL, başlangıç kredi gideri 25.000 TL ve diğer gider 20.000 TL. Ek gider 420.000 TL; toplam başlangıç ihtiyacı 5.420.000 TL olur.",
        "Bu örnekteki kalemler vergi/komisyon tarife duyurusu değildir. Kendi resmî tahakkukunuzu ve sözleşmeli hizmet tutarınızı girin; oran ve taraf paylaşımını işlem için doğrulayın."
      ]
    },
    {
      "heading": "Hangi kalem hangi hesaba gider?",
      "paragraphs": [
        "Kredi anaparası evin finansmanıdır; satış bedeline ikinci kez gider olarak eklenmez. İlk tadilat başlangıç maliyetidir. Sonraki yılların bakımı net kira hesabına; gelecekteki kredi faizi kredi ödeme planına; satış gideri ise satış senaryosuna aittir.",
        "Örnekte ayrıca 150.000 TL acil nakit ayırırsanız gerekli nakit 5.570.000 TL’ye çıkar. Rezerv henüz harcanmadığından gerçekleşmiş yatırım maliyeti 5.420.000 TL olarak kalır. Nakit ihtiyacı ile gerçekleşen maliyet farklıdır."
      ],
      "bullets": [
        "TKGM işlem tahakkuku ve döner sermaye tutarı",
        "Aracılık sözleşmesinde hizmet bedeli ve KDV kapsamı",
        "Bankanın sözleşme öncesi bilgi formu",
        "Kalemli tadilat teklifi ve teslim tarihi"
      ]
    },
    {
      "heading": "Giderlerin getiriye etkisi",
      "paragraphs": [
        "Yıllık net kira 275.000 TL ise yalnız satış fiyatına göre %5,50 görünen getiri, 5.420.000 TL toplam maliyet üzerinde yaklaşık %5,07’dir. Küçük görünen masraflar aynı kira için sonucu değiştirir; toplam maliyeti net kira hesabına taşıyın."
      ]
    }
  ],
  "konut-endeksi-okuma": [
    {
      "heading": "120 puan, 120 TL/m² değildir",
      "paragraphs": [
        "Örnek endeks bir yıl önce 120, bugün 156 ise yıllık değişim (156 / 120 − 1) × 100 = %30’dur. Her iki değer aynı seriye ve 12 ay aralıklı dönemlere ait olmalıdır. Endeks düzeyi 156, bir dairenin birim fiyatı değildir.",
        "TCMB KFE yönteminde konutların nitelik farklarının etkisini ayırmaya yönelik yaklaşım kullanılır. Bu yüzden endeks artışını belirli bir dairenin birebir fiyat artışı gibi uygulamak uygun değildir."
      ]
    },
    {
      "heading": "Bölge, il ve birim fiyat ayrımı",
      "paragraphs": [
        "Bazı bölgesel KFE serileri birden fazla ili kapsar; şehir sayfasında gösterilen kapsama bakın. İl bazlı TL/m² göstergesi farklı ölçüdür. Bölgesel endeks puanından mahalle fiyatı veya kira tutarı türetmeyin.",
        "Dönem Ağustos, yayın Eylül ve veri çekimi Ekim olabilir. Bunlar üç ayrı tarihtir. Kaynak kesintisinde eski verinin yeni çekilmiş olması dönemi güncellemez; ekranda dönem bilgisini esas alın."
      ],
      "bullets": [
        "Aylık artış ile yıllık artışı karıştırmayın.",
        "Eksik ayı sıfır veya bir önceki kayıt saymayın.",
        "Revizyon sonrası farklı yöntem veya bazlı serileri doğrudan birleştirmeyin."
      ]
    },
    {
      "heading": "Endeksten reel yoruma",
      "paragraphs": [
        "Aynı örnekte nominal artış %30, aynı dönem TÜFE artışı varsayımsal %35 ise reel değişim 1,30 / 1,35 − 1 = −%3,70 olur. Kira ve işlem gideri bu endeks hesabına dahil değildir. Kişisel konut performansı için gerçek alım/satış bedeli ve net nakit akışını ayrıca kullanın."
      ]
    }
  ]
};

export const cityEvaluations:Record<string,{title:string;paragraphs:string[];checks:string[]}>= {
  "istanbul": {
    "title": "İstanbul’da ulaşım vaadini zamanla sınayın",
    "paragraphs": [
      "İl düzeyindeki KFE İstanbul kapsamındadır; bu ölçek ilçe ve mahalle farklarını ortadan kaldırmaz. İlanı aynı sokak çevresi, bina niteliği ve alan tanımıyla karşılaştırın. İl fiyat göstergesi değerleme raporu değildir.",
      "Bir ilanda “metroya yakın” yazıyorsa kullanacağınız istasyon girişine yürüyüşü ve iş saatindeki toplam kapıdan kapıya süreyi ayrı kaydedin. Henüz açılmamış bir ulaşım projesini bugünkü erişim gibi fiyatlamayın. Açılış ve güzergâh iddiasını ilgili işletmecinin duyurusundan doğrulayın."
    ],
    "checks": [
      "Gösterilen dairenin bağımsız bölümünü belediye projesiyle eşleştirin.",
      "Yönetimden büyük onarım/dönüşüm kararı ve daire borç dökümü isteyin.",
      "Ulaşımı aynı gün/saat koşuluyla karşılaştırıp kira dosyasına not edin."
    ]
  },
  "ankara": {
    "title": "Ankara’da toplam aylık barınma giderini karşılaştırın",
    "paragraphs": [
      "KFE Ankara kapsamındaki genel değişimi gösterir; yeni proje ile yerleşik mahalle arasındaki fiyat farkını tek başına açıklamaz. İl satış adedi de belirli konutun ne kadar sürede satılacağını söylemez.",
      "Aynı kira bedelli iki evin ısınma ve ortak gideri farklı olabilir. Örnek olarak aylık malik gideri 1.000 TL yerine 2.500 TL ise yıllık fark 18.000 TL’dir. Bu yerel ortalama değil, bütçe farkını göstermek için örnektir. Gerçek tutar için geçmiş tüketim ve yönetim bütçesi isteyin."
    ],
    "checks": [
      "Isınma sistemi ve mümkünse son tam yıl tüketim/gider dökümü",
      "Kullanacağınız iş veya kampüs girişine gerçek erişim",
      "Yeni projede bitmiş altyapı ile satış vaadinin ayrımı"
    ]
  },
  "izmir": {
    "title": "İzmir’de sürekli kullanım ile dönemsel kullanım bütçesini ayırın",
    "paragraphs": [
      "KFE İzmir ölçeğindeki eğilimi verir; merkez veya kıyı ilçesinin emsali yerine geçmez. İlk elemede konutun yıl boyu oturum, uzun dönem kira veya dönemsel kullanım amacını seçin.",
      "Bir ilanın sezonluk aylık bedelini 12 ile çarpmadan önce hangi ayların kiralanabilir olduğuna ilişkin kayıt isteyin. Mevcut binada cephe, çatı ve ortak tesis için yapılan işleri yönetim kararları ve faturalarla kontrol edin; konumdan otomatik bakım oranı çıkarmayın."
    ],
    "checks": [
      "Uzun dönem sözleşme kirası ve sezonluk ilan tutarını ayrı tutun.",
      "Belediyeden proje/izin kapsamını ve fiilî bölümü eşleştirin.",
      "Konuma ilişkin tehlike bilgisi ile binaya özgü mühendislik raporunu ayırın."
    ]
  },
  "adana": {
    "title": "Adana’da alan ve kullanım giderini birlikte kontrol edin",
    "paragraphs": [
      "Şehir ekranındaki bölgesel KFE Adana ve Mersin’i birlikte kapsar. İki ilin ortak eğilimi, Adana’daki seçtiğiniz mahallenin fiyatı değildir; il satış adedi de TL/m² serisi olarak kullanılamaz.",
      "Önce alan beyanını doğrulayın; daha geniş görünen ev için brüt alanın hangi ortak payları içerdiğini sorun. Soğutma ve yalıtım iddiasını cihaz varlığıyla sınırlı tutmayın: enerji kimlik belgesi, bakım kayıtları ve gerçek tüketim dokümanları karar dosyasını destekler."
    ],
    "checks": [
      "Aynı alan türündeki yakın ilanları tarihleriyle kaydedin.",
      "Ortak cihaz ve tesis yenileme kararlarını yönetimden isteyin.",
      "Teknik durum için proje ve binaya ait incelemeyi esas alın."
    ]
  },
  "antalya": {
    "title": "Antalya’da sezonluk bedelden yıllık gelire geçerken boş ayları yazın",
    "paragraphs": [
      "Bölgesel KFE Antalya, Burdur ve Isparta’yı kapsar. Bu seri belirli bir turizm bölgesinin kira veya fiyat tarifesi değildir. İl göstergesiyle farktan yabancı talebi veya gelecek artış tahmini üretilemez.",
      "Örnek olarak dört ay 50.000 TL ve kalan sekiz ay sıfır gelir, yılda 200.000 TL brüt eder; 50.000 × 12 = 600.000 TL değildir. Bu tutarlar piyasa fiyatı değildir. Dönemsel kiralamada izin, yönetim ve diğer koşulları resmî kurumdan doğrulamadan geliri uygulanabilir kabul etmeyin."
    ],
    "checks": [
      "Kiralanabilir ay, tahsilat ve hizmet giderini ayrı kaydedin.",
      "Site yönetim planını ve kullanım kısıtlarını inceleyin.",
      "Yazılı izin/uygunluk olmadan kısa dönem gelir taahhüdüne güvenmeyin."
    ]
  },
  "bursa": {
    "title": "Bursa’da konut arzını ilan sayısından farklı okuyun",
    "paragraphs": [
      "Bölgesel KFE Bursa, Eskişehir ve Bilecik’i kapsar; yalnız Bursa ilçelerinin fiyat hareketi değildir. TÜİK il satış sayısı il genelindeki işlemleri gösterir; seçtiğiniz projede doluluk oranını vermez.",
      "Aynı projenin farklı aracılardaki ilanlarını ayrı konut saymak arzı büyütür. Blok, kat, alan ve fotoğraf benzerliğini kontrol ederek tekrarı ayıklayın. Teslim edilmiş daire ile henüz tamamlanmamış projeyi aynı emsal kümesine koymayın."
    ],
    "checks": [
      "İlanın teslim ve fiilî kullanım durumunu yerinde/evrakla doğrulayın.",
      "Günlük işe erişimi kilometre yerine zamanla kaydedin.",
      "Proje çevresindeki bitmiş hizmetler ile planlanan hizmetleri ayırın."
    ]
  },
  "kocaeli": {
    "title": "Kocaeli’de bağlantı mesafesini günlük yolculukla doğrulayın",
    "paragraphs": [
      "Bölgesel KFE Kocaeli, Sakarya, Düzce, Bolu ve Yalova’yı birlikte kapsar. Beş ilin ortak hareketini tek ilçe veya sanayi aksı için gerçekleşmiş getiri saymayın. İl birim fiyatı gösteriliyorsa bunun ayrı seri ve dönem olduğunu kontrol edin.",
      "İstanbul’a veya işe yakınlık beyanı için düzenli kullandığınız saatlerde erişimi ölçün. Vardiya/servis güzergâhına ilişkin bilgi bir sözleşme garantisi değilse kalıcı ulaşım avantajı varsaymayın. Yakın bir tesisin etkisi hakkında ölçüm olmadan çevresel kalite puanı üretmeyin."
    ],
    "checks": [
      "Geçiş, ulaşım ve otopark giderini aylık bütçeye ekleyin.",
      "Servis ve toplu taşıma bilgisini işletmeciden doğrulayın.",
      "Yerel emsallerde kat, alan ve bina niteliğini eşleştirin."
    ]
  },
  "konya": {
    "title": "Konya’da büyük metrekareyi kullanılabilir alanla sınayın",
    "paragraphs": [
      "Bölgesel KFE Konya ve Karaman’ı kapsar. İki ilin endeks değişimi seçtiğiniz sitenin fiyatı değildir. Fiyat kıyasına önce aynı kullanım amacı ve aynı alan tanımıyla başlayın.",
      "Daha büyük daireyi yalnız TL/m² düşük diye seçmeyin. Kullanılmayan oda ve koridorun ısınma, bakım ve eşya bütçesine etkisini kendi kullanımınızla hesaplayın. Kampüs veya hastane yakınlığını düzenli kiracı talebi ispatı saymayın; mevcut sözleşme/emsal isteyin."
    ],
    "checks": [
      "Net alanı onaylı proje ve ölçümle kontrol edin.",
      "Tramvay/durak girişine gerçek erişim ve sefer bilgisini doğrulayın.",
      "Isınma ile malike kalan aidatı toplam sahip olma maliyetine ekleyin."
    ]
  },
  "gaziantep": {
    "title": "Gaziantep’te yeni yapı beyanını belgeyle eşleştirin",
    "paragraphs": [
      "Bölgesel KFE Gaziantep, Adıyaman ve Kilis’i kapsar. Ortak bölgesel artışı Gaziantep’teki bir binanın değer artışı olarak kullanmayın. Yeni teslim ve mevcut konut için hukuki/teknik belge kapsamını ayrı inceleyin.",
      "“Yeni”, “yenilenmiş” ve “güçlendirilmiş” aynı şey değildir. İlgili işlemin ruhsat, proje ve teknik raporunu isteyin; yalnız boya ve iç dekorasyonu yapısal inceleme gibi okumayın. Gerçekleşmiş yeniden yapım veya güçlendirme maliyeti için yazılı belge gerekir."
    ],
    "checks": [
      "Yapım/onarım iddiasına ait tarihli belge",
      "Bağımsız bölüm ve izin kapsamının eşleşmesi",
      "Mevcut kira sözleşmesi ile ilan kira tahmininin ayrımı"
    ]
  },
  "trabzon": {
    "title": "Trabzon’da güzergâh ve bina bakımını konum ilanından ayırın",
    "paragraphs": [
      "Bölgesel KFE Trabzon, Ordu, Giresun, Rize, Artvin ve Gümüşhane’yi kapsar. Altı ilin ortak endeksini Trabzon’daki mahalle fiyatı gibi okumayın. Mahalle farkı için aynı tarihli ve benzer nitelikli ilanlar gerekir.",
      "Haritada kısa görünen mesafeyi giriş kapısına kadar yürüyerek veya kullandığınız araçla sınayın. Eğim, merdiven ve otoparka erişim kullanım ihtiyacınıza uymalıdır. Nem veya drenaj sorunu iddiasını konumdan tahmin etmek yerine uzman incelemesi ve geçmiş onarım kayıtlarıyla araştırın."
    ],
    "checks": [
      "Tapu/proje ile eklenti ve otopark hakkı",
      "Cephe, çatı ve drenaj için bakım faturası/kararı",
      "Yıl boyu kira ile dönemsel ilan gelirinin ayrımı"
    ]
  },
  "balikesir": {
    "title": "Balıkesir’de kıyı konutu ile merkez konutunu aynı kirayla sıralamayın",
    "paragraphs": [
      "Bölgesel KFE Balıkesir ve Çanakkale’yi kapsar. Bu endeks şehir merkezindeki bir daire ile kıyıdaki ikinci konutun farklı kullanım değerini açıklamaz; ilçe bazlı emsal değildir.",
      "Kullanım amacı seçtikten sonra iki bütçe kurun: sürekli oturumda yıllık ulaşım ve aidat; dönemsel kullanımda boş aylardaki bakım ve sabit giderler. Evin kullanılmadığı ayları gideri sıfır aylar saymayın. Her gider için son yılın belgesini isteyin."
    ],
    "checks": [
      "Sabit abonelik/aidat ile kullanıma bağlı tüketimi ayırın.",
      "Sezonluk kira iddiasının kapsadığı ay ve hizmetleri yazın.",
      "Tapu niteliği, bağımsız bölüm ve yapı kullanım belgesini kontrol edin."
    ]
  },
  "mugla": {
    "title": "Muğla’da kiralama vaadini uygulanabilir sözleşme ve izinle sınayın",
    "paragraphs": [
      "Bölgesel KFE Aydın, Denizli ve Muğla’yı birlikte kapsar. Muğla ilçeleri için ayrı satış bedeli üretmez. İkinci konut kullanımı ve gelir amaçlı kiralama aynı nakit hesabı değildir.",
      "“Kira garantili” ilanda garantiyi veren tarafı, süreyi, kesintileri ve ödeme koşullarını yazılı sözleşmede görün. Sezon doluluğu ya da günlük ilan fiyatı gelir garantisi değildir. Kiralama biçimine uygun resmî izin gerekliliklerini ilgili kurumdan doğrulayın."
    ],
    "checks": [
      "Hizmet bedeli, temizlik ve malike kalan sabit giderler",
      "Yönetim planı ve kiralama koşulları",
      "Belge kapsamına uyan bağımsız bölüm ve kullanım niteliği"
    ]
  }
};
