export type CityEditorialSource={label:string;url:string;scope:string};
export type CityEditorial={question:string;context:string;comparison:{title:string;rows:{criterion:string;first:string;second:string;proof:string}[]};workedExample:{title:string;inputs:string[];calculation:string;interpretation:string};steps:{title:string;text:string}[];redFlags:string[];sources:CityEditorialSource[]};

export const cityEditorial:Record<string,CityEditorial>={
  "istanbul": {
    "question": "Daha düşük bedelli ev, ikinci aktarmayla birlikte gerçekten daha ucuz mu?",
    "context": "İstanbul’da iki evi iş ve okul düzeninizle karşılaştırırken istasyona kuş uçuşu mesafeyi kullanmayın. Kapıdan kapıya yolculuğu yürüme, bekleme, araç içi süre ve aktarma olarak bölün. Aşağıdaki yöntem yerinde ölçülmüş bir İstanbul hat araştırması değildir; kendi iki ilanınıza uygulanacak dosyadır.",
    "comparison": {
      "title": "A: doğrudan hat / B: iki araçlı ulaşım",
      "rows": [
        {
          "criterion": "Yolun başlangıcı",
          "first": "Ev kapısından istasyon girişine yürüyüş",
          "second": "Ev kapısından ilk durağa yürüyüş",
          "proof": "Aynı kişi, benzer gün ve saatte süre tutar; çıkış kapısını kaydeder."
        },
        {
          "criterion": "Günlük para çıkışı",
          "first": "Gidiş-dönüş gerçek kart tutarı",
          "second": "İki araç, varsa aktarma ve ek bağlantı",
          "proof": "Kullanılacak kart türü için operatör tarifesi; abonman/aktarmayı iki kez saymayın."
        },
        {
          "criterion": "Erişilebilirlik",
          "first": "İşletmedeki hat ve kullanılan istasyon girişi",
          "second": "Aktarma yürüyüşü, asansör ve son sefer",
          "proof": "Metro İstanbul hat, ekipman ve sefer duyuruları; henüz açılmamış hattı bugünkü hizmet saymayın."
        }
      ]
    },
    "workedExample": {
      "title": "Varsayımsal 22 iş günlük karşılaştırma",
      "inputs": [
        "A: konutla ilgili aylık ödeme 32.000 TL, tek yön 45 dakika, gidiş-dönüş ulaşım 80 TL.",
        "B: aynı kapsamdaki konut ödemesi 30.000 TL, tek yön 70 dakika, gidiş-dönüş ulaşım 130 TL. Tutarlar İstanbul tarifesi değildir."
      ],
      "calculation": "A aylık 32.000 + 22 × 80 = 33.760 TL; B 30.000 + 22 × 130 = 32.860 TL. B ayda 900 TL daha az nakit gerektirir; (70 − 45) × 2 × 22 / 60 = 18,33 saat daha fazla yol sürer.",
      "interpretation": "Aylık 900 TL tasarrufun 18,33 saat ek yolculuğa değip değmediğini siz belirlersiniz; saate otomatik ücret biçmiyoruz. İki seçenek satın alma ise aynı kapsamdaki kredi/nakit kullanım hesabıyla başlayın, satış bedelini aylık kira gibi kullanmayın."
    },
    "steps": [
      {
        "title": "İki gerçek güzergâh yazın",
        "text": "İşletmedeki hatları ve kullanılan girişleri kaydedin; evden hedef kapıya kadar her aşamayı ölçün."
      },
      {
        "title": "Ücreti doğrulayın",
        "text": "Kart tipiniz ve seyahat sıklığınız için güncel tarifeyi kontrol edin; işverenin karşıladığı tutarı kendi giderinizden çıkarın."
      },
      {
        "title": "Çıktıyı iki sayıyla saklayın",
        "text": "Aylık ek nakit ve aylık ek saati yan yana yazın. Birini diğerinin garantili parasal karşılığı saymayın."
      }
    ],
    "redFlags": [
      "“Metroya yakın” ifadesinde giriş, yürüyüş veya aktarma belirtilmemesi.",
      "Planlanan hat açılışının bugünkü erişim gibi fiyat gerekçesi yapılması."
    ],
    "sources": [
      {
        "label": "Metro İstanbul · Hat, sefer ve ücret bilgileri",
        "url": "https://www.metro.istanbul/home",
        "scope": "İşletmedeki hat, sefer, ekipman ve ücret bağlantıları; dairenizden kapıdan kapıya süreyi garanti etmez."
      },
      {
        "label": "Şehir Hatları · Sefer tarifeleri",
        "url": "https://sehirhatlari.istanbul/tr/seferler",
        "scope": "Deniz bağlantısı kullanıyorsanız işletmecinin sefer programını kontrol etmek için; tüm ulaşım türlerini kapsamaz."
      }
    ]
  },
  "ankara": {
    "question": "Merkezi ısıtmalı ve bağımsız ısıtmalı iki evin yıllık gideri nasıl eşitlenir?",
    "context": "Tek soğuk ayın faturasını on ikiyle çarpmak veya merkezi ısıtma payını aidata zaten dahil olduğu hâlde yeniden eklemek kıyası bozar. Ankara’daki iki ilan için aynı tam yıl, benzer kullanım ve aynı gider kapsamını esas alın; belirli bir ısıtma türünü koşulsuz daha ucuz ilan etmeyin.",
    "comparison": {
      "title": "Merkezi sistem / bağımsız sistem belge dosyası",
      "rows": [
        {
          "criterion": "Tüketim ve paylaşım",
          "first": "Daireye ait yıllık ısıtma tahakkuku ve paylaştırma dökümü",
          "second": "Son tam yıl faturaları ve kullanım durumu",
          "proof": "Yönetim dökümü ile faturada dönem ve kapsam kontrolü."
        },
        {
          "criterion": "Bakım",
          "first": "Ortak sistem bakımı aidata dahil mi?",
          "second": "Kombi bakımı ve olası cihaz yenilemesi",
          "proof": "Yönetim bütçesi veya yazılı servis teklifi; yenileme tek seferlik giderdir."
        },
        {
          "criterion": "Belge eşleşmesi",
          "first": "Isıtma projesi ile fiilî sistem aynı mı?",
          "second": "Bağımsız cihaz ve tesisat bilgisi doğrulanmış mı?",
          "proof": "Yetkili belediye/proje dosyası ve hizmet sağlayıcı kayıtları; il genelindeki portal evin belgesini otomatik doğrulamaz."
        }
      ]
    },
    "workedExample": {
      "title": "Varsayımsal yıllık tutarları aylık bütçeye çevirin",
      "inputs": [
        "A merkezi sistem: yıllık daire ısı payı 28.800 TL; ısı hariç ortak gider ayda 1.200 TL.",
        "B bağımsız sistem: yıllık tüketim 24.000 TL; ısı hariç ortak gider ayda 900 TL; yıllık bakım 1.800 TL. Bunlar Ankara fiyat ortalaması değildir."
      ],
      "calculation": "A = 28.800 + 12 × 1.200 = 43.200 TL/yıl. B = 24.000 + 12 × 900 + 1.800 = 36.600 TL/yıl. Kapsam eşitse B 6.600 TL/yıl, aylık ortalama 550 TL daha düşüktür.",
      "interpretation": "Bu fark konfor eşitliği veya gelecek fatura garantisi değildir. A ve B’de evin alanı, kullanılan aylar, hedef sıcaklık ve boş geçen dönemler farklıysa önce bunları açıklayın; eksik faturadan tüketim uydurmayın."
    },
    "steps": [
      {
        "title": "Isıtma satırını ayırın",
        "text": "Yönetime aidatın hangi kısmının ısı, hangi kısmının başka ortak gider olduğunu sorun."
      },
      {
        "title": "Aynı yılı toplayın",
        "text": "On iki aylık dönemi ve o dönemde evin kullanılıp kullanılmadığını not edin; yalnız en yüksek veya en düşük faturayı seçmeyin."
      },
      {
        "title": "Kararı kullanımınızla sınayın",
        "text": "Gerçekleşmiş geçmiş toplamın yanına bakım/cihaz yenileme ihtiyacını ayrı yazın; mükerrer gideri temizleyin."
      }
    ],
    "redFlags": [
      "Aidatta dahil ısı giderinin ayrıca ikinci kez istenmesi.",
      "Fatura görülmeden “yalıtım var, gider çok düşük” sonucuna ulaşılması."
    ],
    "sources": [
      {
        "label": "Ankara Büyükşehir Belediyesi · Yapı denetim ve ruhsat birimi",
        "url": "https://www.ankara.bel.tr/teskilat-semasi/yapi-denetim-ve-ruhsat-sube-mudurlugu-26",
        "scope": "İlgili yapı/proje belgesi için kurum ve yetkili idareyi belirlemede başlangıç; bütün ilçelerin dosyasına açık erişim değildir."
      },
      {
        "label": "EPDK · Doğal gaz piyasası",
        "url": "https://epdk.gov.tr/Detay/Icerik/18-1007/dogal-gaz-piyasasi",
        "scope": "Dağıtım şirketi ve tarife bilgilerinin resmî yönlendirmesi; evin tüketimini ve yıllık maliyetini göstermez."
      }
    ]
  },
  "izmir": {
    "question": "Merkezde sürekli oturum ile kıyıda dönemsel kullanımın toplam yıllık yükü nasıl karşılaştırılır?",
    "context": "İzmir’de günlük yaşam için kullanılacak bir evle yılın sınırlı bölümünde kullanılacak bir konut aynı ihtiyacı karşılamaz. Dönemsel konut alınsa bile merkezdeki barınma gideri sürüyorsa iki kalemi birlikte yazın. Burada mahalle fiyatı veya kira ortalaması üretilmiyor.",
    "comparison": {
      "title": "Tek ana konut / ana konuta ek dönemsel konut",
      "rows": [
        {
          "criterion": "Karşılanan ihtiyaç",
          "first": "Yıl boyu ana barınma",
          "second": "Belirli geceler ikinci kullanım",
          "proof": "Planlanan kullanım takvimi; çalışılan/okula gidilen günlerin adresi."
        },
        {
          "criterion": "Devam eden gider",
          "first": "Tek evin aidat ve sahiplik gideri",
          "second": "İkinci ev giderine ek devam eden ana barınma",
          "proof": "Sözleşmeler, yönetim bütçesi ve yıllık ödemeler."
        },
        {
          "criterion": "Konum ve kullanım",
          "first": "Günlük hedeflere erişim",
          "second": "Fiilî kullanım, belge niteliği ve ulaşım",
          "proof": "İzmir belediyesinin kent rehberinden konum; ilgili idareden bağımsız bölüm/proje belgesi."
        }
      ]
    },
    "workedExample": {
      "title": "Varsayımsal ikinci konutun görünmeyen ek yükü",
      "inputs": [
        "A tek ana konutun yıllık nakit gideri 360.000 TL.",
        "B’de ana barınma 300.000 TL olarak sürüyor; kıyı konutunun sabit gideri 48.000 TL ve yıllık ulaşım/bakım 24.000 TL. Alış bedeli ve finansman dahil değil."
      ],
      "calculation": "B = 300.000 + 48.000 + 24.000 = 372.000 TL; A’dan yılda 12.000 TL fazla. Kıyı konutunun kendi ek gideri 72.000 TL’dir; bu, yalnız ana konutlar arasındaki farkla görünmez.",
      "interpretation": "B’nin satın alma sermayesi ve fırsat maliyeti ayrıca vardır. İkinci kullanım 30 geceyse 72.000 / 30 = 2.400 TL/gece yalnız bu ek giderlerin karşılığıdır; otel emsali veya tam sahiplik maliyeti değildir."
    },
    "steps": [
      {
        "title": "Kullanım gününü belirleyin",
        "text": "Fiilen kullanılacak geceleri ve ana barınma giderinin sürüp sürmediğini yazın."
      },
      {
        "title": "Haritadan belgeye geçin",
        "text": "Kent rehberinde doğru konumu bulun; haritadaki konumun izin, yapı güvenliği veya yıl boyu kullanım garantisi olmadığını gözetin."
      },
      {
        "title": "İki bütçe çıkarın",
        "text": "Dönemsel evin ayrı gideri ve iki evin birlikte yıllık yükünü ayrı satırlarda tutun."
      }
    ],
    "redFlags": [
      "İkinci ev alınca devam edecek ana konut giderinin hesaptan silinmesi.",
      "Kullanılmayan aylarda aidat ve bakımın sıfır sayılması."
    ],
    "sources": [
      {
        "label": "İzmir Büyükşehir Belediyesi · CBS projeleri",
        "url": "https://cbs.izmir.bel.tr/cbs_portal/Projeler",
        "scope": "Kent rehberi ve imar bilgi sistemine kurumsal erişim; izin belgesi veya tek daire değerlemesi değildir."
      }
    ]
  },
  "adana": {
    "question": "Büyük görünen daire, gerçekten daha fazla kullanılabilir alan ve daha düşük toplam gider sunuyor mu?",
    "context": "Adana için ilan dosyasında brüt alanın yanında doğrulanmış net alanı ve son tam dönem kullanım giderini yazın. Soğutma tüketimini yalnız metrekareyle tahmin etmeyin; cihaz, kullanım süresi ve yapı özellikleri farklıdır. Örnekteki elektrik giderleri yerel ortalama veya tarife değildir.",
    "comparison": {
      "title": "A: geniş brüt beyan / B: daha küçük brüt beyan",
      "rows": [
        {
          "criterion": "Alan",
          "first": "140 m² brüt, 100 m² net beyan",
          "second": "125 m² brüt, 105 m² net beyan",
          "proof": "Onaylı bağımsız bölüm planı ve ölçüm; belediye kent rehberi iç alanı ölçmez."
        },
        {
          "criterion": "Soğutma",
          "first": "Eski cihazın değişim ihtiyacı",
          "second": "Mevcut cihazla devam",
          "proof": "Geçmiş fatura dönemi, kullanım ve yazılı servis/cihaz teklifi."
        },
        {
          "criterion": "Bağımsız bölüm",
          "first": "Eklenmiş balkon/depo kullanımı var mı?",
          "second": "İlan alanı ile proje sınırı aynı mı?",
          "proof": "İlgili belediyedeki proje ve fiilî ölçüm; konum verisi uygunluk belgesi değildir."
        }
      ]
    },
    "workedExample": {
      "title": "Varsayımsal alan kıyası ve üç yıllık cihaz bütçesi",
      "inputs": [
        "A: 4.500.000 TL / 100 m² net; B: 4.650.000 TL / 105 m² net.",
        "A yıllık kullanım gideri 18.000 TL ve ilk gün cihaz değişimi 25.000 TL; B yılda 14.000 TL, başlangıç değişimi yok. Basit üç yıl boyunca tutarlar sabit varsayılıyor."
      ],
      "calculation": "Net birim fiyat A’da 45.000, B’de yaklaşık 44.286 TL/m². Üç yıllık ilgili gider A’da 25.000 + 3 × 18.000 = 79.000 TL; B’de 3 × 14.000 = 42.000 TL. A’nın 150.000 TL düşük satış bedelinden bu kapsamda 37.000 TL ek gider düşülürse fark 113.000 TL kalır.",
      "interpretation": "B toplamda daha pahalı olsa da net alan biriminde daha düşüktür. Üç yıllık gider örneği enerji fiyat tahmini değildir; konutların diğer farklarını ve paranın zaman değerini içermez."
    },
    "steps": [
      {
        "title": "Alan türünü belgelendirin",
        "text": "İlanın net/brüt beyanını kaynaklarıyla kaydedin; doğrulanmayan ek alanı kullanılabilir net alana katmayın."
      },
      {
        "title": "Cihazı ve tüketimi ayırın",
        "text": "Tek seferlik cihaz alımını başlangıç bütçesine, tüketimi dönemsel gidere yazın."
      },
      {
        "title": "Aynı kapsamda sıralayın",
        "text": "Satış fiyatı, net m² ve sahiplik giderini üç ayrı sonuç olarak gösterin."
      }
    ],
    "redFlags": [
      "Elektrik faturasının hangi kullanıma ait olduğunun bilinmemesi.",
      "Brütü büyük olan evin net alanının da mutlaka daha büyük sayılması."
    ],
    "sources": [
      {
        "label": "Adana Büyükşehir Belediyesi · Bulut kent bilgi sistemi",
        "url": "https://www.adana.bel.tr/tr/bulut-kent-bilgi-sistemi",
        "scope": "Resmî kent rehberine giriş; adres/konum ön kontrolü içindir, net alan veya bina güvenliği raporu değildir."
      }
    ]
  },
  "antalya": {
    "question": "Dönemsel kiralama ilanındaki yüksek bedel, uzun dönem kiradan sonra gerçekten daha çok nakit bırakır mı?",
    "context": "Antalya’daki bir ilan için kiralanabilir gün, net tahsilat ve hizmet gideri ayrı olmalı. İzin ve kullanım koşulları doğrulanmadan bir dönemsel gelir senaryosunu uygulanabilir iş modeli saymayın. Örnek doluluk ve bedeller Antalya istatistiği değildir.",
    "comparison": {
      "title": "Uzun dönem sözleşme / dönemsel kiralama dosyası",
      "rows": [
        {
          "criterion": "Gelirin dayanağı",
          "first": "Mevcut sözleşme ve tahsilat",
          "second": "Gerçek konaklama dönemi, iptal ve tahsilat kayıtları",
          "proof": "İstenen ilan bedeli yerine sözleşme ve ödeme kaydı."
        },
        {
          "criterion": "Gider kapsamı",
          "first": "Malike kalan bakım/yan gider",
          "second": "Yönetim, temizlik, değişim, enerji ve boş dönem gideri",
          "proof": "Yazılı hizmet teklifi; kesinti tabanı ve KDV kapsamı."
        },
        {
          "criterion": "Uygulanabilirlik",
          "first": "Mevcut kira sözleşmesi koşulları",
          "second": "Konut için gerekli izin ve yönetim koşulları",
          "proof": "Antalya İl KTB başvuru/kurallar bağlantıları ve konuta ait gerçek belge."
        }
      ]
    },
    "workedExample": {
      "title": "Varsayımsal iki kira modeli ve başabaş noktası",
      "inputs": [
        "Uzun dönem: aylık 28.000 TL, 11 tahsilat ayı, yıllık malik gideri 30.000 TL.",
        "Dönemsel: tahsil edilen günlük bedel 3.000 TL, 120 gün, brüt üzerinden %20 hizmet kesintisi, gün başına 250 TL değişken gider ve yılda 35.000 TL sabit gider. Vergi ve finansman her iki hesapta hariç."
      ],
      "calculation": "Uzun dönem = 28.000 × 11 − 30.000 = 278.000 TL. Dönemsel = 3.000 × 120 × 0,80 − 250 × 120 − 35.000 = 223.000 TL. Aynı varsayımla başabaş gün sayısı (278.000 + 35.000) / (3.000 × 0,80 − 250) = 145,58; tam günle en az 146 tahsil edilmiş gün gerekir.",
      "interpretation": "120 günün 146 güne çıkması bir tahmin değildir; mevcut örneğin duyarlılık sınırıdır. Gün sayısı gerçekleşmiyor veya izin koşulları sağlanmıyorsa daha yüksek günlük bedel yeterli kanıt olmaz."
    },
    "steps": [
      {
        "title": "Önce hukuki kullanım yolunu doğrulayın",
        "text": "İl KTB’nin resmî yönlendirmesinden konutunuz için gereken belge ve koşulları öğrenin."
      },
      {
        "title": "Kesintiyi TL’ye çevirin",
        "text": "Hizmet bedelinin hangi brüt tutardan kesileceğini ve hangi giderlerin ayrıca malike kaldığını yazın."
      },
      {
        "title": "Tahsil edilmiş günle karşılaştırın",
        "text": "Rezerve edilen, iptal edilen ve gerçekten tahsil edilmiş günleri ayırın; sonra net tutarı uzun dönemle eşitleyin."
      }
    ],
    "redFlags": [
      "Günlük en yüksek ilan bedelinin yılın tüm günlerine uygulanması.",
      "Hizmet yüzdesinin yanında kalan enerji/temizlik ve izin giderlerinin gizlenmesi."
    ],
    "sources": [
      {
        "label": "Antalya İl Kültür ve Turizm Müdürlüğü · Konut kiralama yönlendirmeleri",
        "url": "https://antalya.ktb.gov.tr/TR-310055/",
        "scope": "Turizm amaçlı konut başvurusu, kılavuz ve yönetmelik bağlantıları; izin veya doluluk garantisi değildir."
      }
    ]
  },
  "bursa": {
    "question": "Henüz teslim edilmemiş projedeki düşük bedel, bekleme maliyetinden sonra avantajını koruyor mu?",
    "context": "Bursa’da bitmiş bir daire ile ileride teslim edilecek projeyi aynı tarihte taşınılabiliyormuş gibi kıyaslamayın. Sözleşmedeki teslim tarihini, ödeme takvimini ve beklerken devam edecek barınma giderini birlikte kullanın. Örnek gecikme bir proje hakkında iddia değildir.",
    "comparison": {
      "title": "Hemen kullanılabilir konut / ileri teslim proje",
      "rows": [
        {
          "criterion": "Başlangıç",
          "first": "Fiilî kullanım ve teslim tutanağı",
          "second": "Sözleşmeli ileri teslim ve ödeme takvimi",
          "proof": "Satıcı belgesi, konuta/bloka ait ruhsat ve kullanım belgesi kapsamı."
        },
        {
          "criterion": "Bekleme",
          "first": "Taşınma tarihine kadar sınırlı ara gider",
          "second": "Teslime kadar kira, olası çift taşınma",
          "proof": "Mevcut kira sözleşmesi ve planlanan nakit tarihleri."
        },
        {
          "criterion": "İddia ve belge",
          "first": "Gösterilen bitmiş bağımsız bölüm",
          "second": "Örnek daire ile satın alınan bölüm farklı olabilir",
          "proof": "Proje numarası, kat ve eklenti listesi; belediye/ilgili idareden belge doğrulaması."
        }
      ]
    },
    "workedExample": {
      "title": "Varsayımsal teslim süresinin indirim üzerindeki etkisi",
      "inputs": [
        "Bitmiş A konutu 5.200.000 TL. Projedeki B 4.800.000 TL; 12 ay sonra teslim varsayılıyor.",
        "Bekleme kirası ayda 25.000 TL ve ek taşınma 40.000 TL; diğer alım giderleri eşit kabul ediliyor. Finansman ve sermayenin zaman değeri bu basit toplama dahil değil."
      ],
      "calculation": "B’nin bekleme dahil toplamı 4.800.000 + 12 × 25.000 + 40.000 = 5.140.000 TL; A’ya göre fark yalnız 60.000 TL. Teslim altı ay daha uzarsa 150.000 TL ek kira ile B toplamı 5.290.000 TL’ye çıkar; A’dan 90.000 TL yüksek olur.",
      "interpretation": "Bu sonuç projenin gecikeceğini söylemez. İlk görülen 400.000 TL fiyat farkının hangi bekleme süresinde eridiğini gösterir; yazılı gecikme hükümlerinin tahsil edileceğini otomatik varsaymaz."
    },
    "steps": [
      {
        "title": "Satın alınan bölümü tanımlayın",
        "text": "Örnek daire yerine sözleşmedeki bağımsız bölüm, blok ve alan çizimini esas alın."
      },
      {
        "title": "Ödeme ve teslimi aynı çizelgeye koyun",
        "text": "Peşinat/taksit tarihleri ile mevcut kira ve taşınma ödemelerini aylara dağıtın."
      },
      {
        "title": "Bir gecikme senaryosu ekleyin",
        "text": "Ek kira ve taşınma bütçesinin karşılanıp karşılanamadığını kontrol edin; belgesiz telafi vaadini kesin gelir yazmayın."
      }
    ],
    "redFlags": [
      "Yalnız örnek dairenin gösterilip satın alınan bölümün tanımlanmaması.",
      "Teslim tarihi ve gecikme koşulunun sözlü bırakılması."
    ],
    "sources": [
      {
        "label": "Bursa Büyükşehir Belediyesi · İmar hizmetleri",
        "url": "https://www.bursa.bel.tr/hizmet-kat/imar-19",
        "scope": "Ruhsat başvuru belgesi ve imar hizmeti bağlantıları; ilçe yetkisi ve proje dosyası ayrıca kontrol edilir."
      }
    ]
  },
  "kocaeli": {
    "question": "İşe yakın görünen evde otoyol, köprü ve park gideri fiyat avantajını tüketiyor mu?",
    "context": "Kocaeli’de ev ile iş arasındaki yolun toplam kilometresini, ücretli geçişleri ve kullanılacak araç sınıfını yazın. Haritadaki en kısa güzergâh ile her gün tercih edeceğiniz yol aynı olmayabilir. Ulaşımpark ve KGM kaynakları güzergâh/tarife kontrolü sağlar; burada gerçek geçiş ücreti sabitlenmiyor.",
    "comparison": {
      "title": "Ücretli güzergâh / alternatif erişim",
      "rows": [
        {
          "criterion": "Ücretli geçiş",
          "first": "Seçilen giriş/çıkış, araç sınıfı ve iki yön",
          "second": "Ücretsiz yol veya uygun toplu taşıma",
          "proof": "KGM’nin ilgili işletmeci/tarife yönlendirmesi; bir yön ücretini iki yön sanmayın."
        },
        {
          "criterion": "Yakıt ve park",
          "first": "Günlük km, tüketim ve otopark",
          "second": "Alternatif yolun gerçek tüketimi veya kart gideri",
          "proof": "Araç kullanım kaydı, park teklifi ve Ulaşımpark hat tarifesi."
        },
        {
          "criterion": "Süre",
          "first": "Yoğun saatte kapıdan kapıya yol",
          "second": "Alternatifin aktarma/bekleme dahil süresi",
          "proof": "Aynı iş başlangıç saatinde sizin ölçümünüz; servis vaadi sözleşme değildir."
        }
      ]
    },
    "workedExample": {
      "title": "Varsayımsal 22 günlük işe gidiş bütçesi",
      "inputs": [
        "A: aylık aynı kapsamdaki konut ödemesi 29.000 TL; günlük 80 km, 100 km’de 7 litre, litre başı 50 TL varsayımı.",
        "A günlük toplam geçiş 300 TL ve park 80 TL. B aylık konut 32.000 TL; tüm günlük erişim gideri 120 TL. Bu rakamlar KGM veya yerel tarife değildir."
      ],
      "calculation": "A günlük yakıt = 80 × 7 / 100 × 50 = 280 TL. A aylık = 29.000 + 22 × (280 + 300 + 80) = 43.520 TL. B = 32.000 + 22 × 120 = 34.640 TL. Bu kapsamda B ayda 8.880 TL daha düşüktür.",
      "interpretation": "A’nın konut ödemesi daha düşükken erişim toplamı daha yüksektir. Araç satın alma, sigorta, bakım ve değer kaybı dahil olmadığı için bu rakam otomobilin tam maliyeti değildir; eksik kalemleri ayrıca ekleyin."
    },
    "steps": [
      {
        "title": "Güzergâhı kesinleştirin",
        "text": "İşe gerçek giriş noktasını, ücretli kesimleri ve araç sınıfını yazın."
      },
      {
        "title": "Gerçek tarife ile güncelleyin",
        "text": "KGM ve ilgili işletmeciden güncel ücreti, Ulaşımpark’tan alternatif hat/kart koşulunu kontrol edin."
      },
      {
        "title": "Konut farkını erişim farkıyla birlikte görün",
        "text": "Aylık konut bedeli avantajını ulaşım giderinden sonra tekrar hesaplayın; süreyi ayrı sütunda bırakın."
      }
    ],
    "redFlags": [
      "İlanın “İstanbul’a yakın” deyip ücretli geçiş ve vardiya saatini belirtmemesi.",
      "Gidiş-dönüşün bir yön ücret ve kilometresiyle hesaplanması."
    ],
    "sources": [
      {
        "label": "Ulaşımpark · Otobüs tarifesi",
        "url": "https://www.ulasimpark.com.tr/otobus/fiyat-tarifesi",
        "scope": "Kocaeli hat/kart ve ücret kapsamını doğrulamak için; evden işe tam güzergâh garantisi değildir."
      },
      {
        "label": "KGM · Otoyol ve köprü ücretleri",
        "url": "https://www.kgm.gov.tr/Sayfalar/KGM/SiteTr/Otoyollar/UcretlerAna.aspx",
        "scope": "Araç sınıfı ve ilgili yol/işletmeci tarifesine yönlendirme; örnekteki günlük ücret gerçek tarife değildir."
      }
    ]
  },
  "konya": {
    "question": "Daha büyük daire için ödediğiniz farkı gerçekten kullanıyor musunuz?",
    "context": "Konya’daki iki ilanda net alan, her gün kullanılan alan ve planın işlevini ayrı yazın. “Kullanılan alan” kişisel tercih ölçüsüdür; resmî net alanın yerine geçmez. Boş tuttuğunuz odanın ısınma/bakım maliyetini belgesiz olarak sıfır varsaymayın.",
    "comparison": {
      "title": "Büyük plan / ihtiyaca uygun plan",
      "rows": [
        {
          "criterion": "Resmî alan",
          "first": "Daha geniş net alan",
          "second": "Daha küçük net alan",
          "proof": "Onaylı proje ve ölçüm; ilandaki brüt rakamla kıyaslanmaz."
        },
        {
          "criterion": "Günlük fayda",
          "first": "Boş kalan oda ve dolaşım alanı",
          "second": "Düzenli kullanılan oda düzeni",
          "proof": "Kendi mobilya ve kullanım planınız; uzman değerlemesi değildir."
        },
        {
          "criterion": "Süren gider",
          "first": "Aidat/ısıtma toplamı ve bina paylaşımı",
          "second": "Aynı kapsamdaki yıllık toplam",
          "proof": "Yönetim bütçesi ve tam dönem faturaları; sırf m²’den fatura türetilmez."
        }
      ]
    },
    "workedExample": {
      "title": "Varsayımsal kullanılabilirlik oranı ve yıllık gider",
      "inputs": [
        "A: 5.400.000 TL ve 150 m² net; günlük kullanılan alanınız 90 m².",
        "B: 4.800.000 TL ve 115 m² net; günlük kullanılan alanınız 95 m². Yıllık aynı kapsamlı gider A’da 60.000 TL, B’de 42.000 TL varsayılıyor."
      ],
      "calculation": "Net m² fiyatı A’da 36.000 TL; B’de yaklaşık 41.739 TL. Kişisel kullanım oranı A’da 90 / 150 = %60; B’de 95 / 115 ≈ %82,61. A 600.000 TL daha fazla alım bedeli ve yılda 18.000 TL daha fazla örnek gider gerektirir.",
      "interpretation": "A’nın net m² fiyatı düşük olsa da ihtiyaçlarınıza göre otomatik olarak iyi tercih olmaz. Kişisel kullanım oranı piyasa fiyatı veya ekspertiz düzeltmesi değildir; oda/koridor planını kararınıza görünür kılar."
    },
    "steps": [
      {
        "title": "Plan üzerinde kullanım işaretleyin",
        "text": "Her gün kullanılacak odaları ve zorunlu dolaşımı belirleyin; ölçümleri net alanla karıştırmadan saklayın."
      },
      {
        "title": "Konumu ayrı doğrulayın",
        "text": "Konya hizmet portalından kent rehberi/numarataj ve gereken ulaşım bağlantılarına geçin; plan kalitesini konum puanıyla değiştirmeyin."
      },
      {
        "title": "Fiyat ve gideri iki eşikte görün",
        "text": "Ek alım bedelini bugün, gider farkını yıllık bütçede değerlendirin. Büyük alanın sizin için sağlayacağı faydayı ayrıca yazın."
      }
    ],
    "redFlags": [
      "Brüt alanın net alan diye sunulması.",
      "Daha az kullanılan oda için cihaz/yönetim koşuluna bakmadan sıfır gider kabul edilmesi."
    ],
    "sources": [
      {
        "label": "Konya Büyükşehir Belediyesi · Hizmetler",
        "url": "https://www.konya.bel.tr/hizmet",
        "scope": "Kent rehberi, numarataj, imar portalı ve ATUS bağlantıları; dairenin iç alanını veya tüketimini doğrulayan belge değildir."
      }
    ]
  },
  "gaziantep": {
    "question": "“Yeni”, “yenilenmiş” ve “güçlendirilmiş” denilen ev için hangi farklı belgeler gerekir?",
    "context": "Gaziantep’te ilan sıfatını teknik sonuca dönüştürmeyin. Yeni yapı, iç yenileme ve yapısal güçlendirme farklı iş kapsamlarıdır; biri diğerinin kanıtı olmaz. Bu dosya herhangi bir şehir, mahalle veya binaya deprem puanı vermez.",
    "comparison": {
      "title": "Yeni yapı iddiası / yenileme veya güçlendirme iddiası",
      "rows": [
        {
          "criterion": "Yapım/iş türü",
          "first": "Yapım tarihi ve ilgili izinlerin kapsamı",
          "second": "İç dekorasyon mu, taşıyıcı sisteme müdahale mi?",
          "proof": "İşin adı yerine ruhsat/proje/raporda yazan kapsam."
        },
        {
          "criterion": "Bağımsız bölüm",
          "first": "Gösterilen binanın doğru blok ve bölümü",
          "second": "İşlem yapılan binanın kayıtla eşleşmesi",
          "proof": "Ada/parsel, blok, bölüm ve rapor adresinin birlikte kontrolü."
        },
        {
          "criterion": "Teknik iddia",
          "first": "Yeni olmak tek başına performans sonucu değil",
          "second": "Boya/fatura güçlendirme raporu değil",
          "proof": "Yetkin teknik inceleme, gerekiyorsa onaylı proje ve ilgili idare kayıtları; iletişim birimi teknik rapor verisi yerine geçmez."
        }
      ]
    },
    "workedExample": {
      "title": "Varsayımsal belge talebini fiyat karşılaştırmasından ayırın",
      "inputs": [
        "A ilanı 4.800.000 TL ve “yeni”; B 4.350.000 TL ve “güçlendirilmiş” diyor.",
        "B için gösterilen 180.000 TL iç tadilat faturası, yapısal işin yetkili raporu ve onaylı projesini göstermiyor."
      ],
      "calculation": "İki satış talebi arasındaki fark 4.800.000 − 4.350.000 = 450.000 TL’dir. 180.000 TL fatura ise yalnız faturada yazan işin bedelidir; 450.000 TL farkın teknik riski telafi ettiği sonucu hesaplanamaz.",
      "interpretation": "Belge eksikliği için uydurma güçlendirme maliyeti veya indirim oranı üretmeyin. Önce B’deki iddianın kapsamını ve binaya ait kayıtları uzmanla doğrulayın; A’yı da yalnız “yeni” sözüyle güvenli kabul etmeyin."
    },
    "steps": [
      {
        "title": "İlan ifadesini somut soruya çevirin",
        "text": "Hangi tarihte, hangi binada, hangi teknik iş yapıldı? İşi tanımlayan proje/raporu isteyin."
      },
      {
        "title": "Kayıt ve yetkiyi eşleştirin",
        "text": "Belgedeki adresi, hazırlayanın yetkisini ve ilgili idare onay kapsamını kontrol ettirin. Gerekirse il müdürlüğünden yetkili birim yönlendirmesi alın."
      },
      {
        "title": "Teknik ve ticari kararı ayırın",
        "text": "İnceleme sonucunu görmeden düşük fiyatı güvenlik indirimi saymayın; sonrasında belgelenmiş alım ve gider hesabına dönün."
      }
    ],
    "redFlags": [
      "İç dekorasyon faturasının yapısal güçlendirme belgesi olarak sunulması.",
      "Başka blok veya binaya ait raporun kullanılması.",
      "“Yeni” ifadesinden otomatik dayanıklılık kararı verilmesi."
    ],
    "sources": [
      {
        "label": "Gaziantep Çevre, Şehircilik ve İklim Değişikliği İl Müdürlüğü",
        "url": "https://gaziantep.csb.gov.tr/",
        "scope": "Yerel yetkili birim ve resmî duyurulara başlangıç; açık bina performans/hasar sorgu hizmeti varmış gibi sunulmaz."
      },
      {
        "label": "AFAD · Türkiye Deprem Tehlike Haritaları",
        "url": "https://www.turkiye.gov.tr/afad-turkiye-deprem-tehlike-haritalari",
        "scope": "Kimlik doğrulamasıyla kullanılan resmî deprem tehlike haritası hizmeti; Gaziantep’te bir binanın performans raporu değildir."
      }
    ]
  },
  "trabzon": {
    "question": "Haritada yakın olan ev, giriş yolu ve bakım dosyasından sonra hâlâ uygun mu?",
    "context": "Trabzon’daki bir evin otobüs durağına doğrusal uzaklığı, binanın kullanılacak kapısına erişimi açıklamaz. Yokuş, merdiven, servis yolu ve otopark hakkını sizin günlük kullanımınızla sınayın. Nem/drenaj sorunu konumdan varsayılmaz; bulgu varsa teknik inceleme ve bakım kayıtları gerekir.",
    "comparison": {
      "title": "Kısa harita mesafesi / gerçek giriş güzergâhı",
      "rows": [
        {
          "criterion": "Kapıya erişim",
          "first": "Haritada görülen en yakın çizgi",
          "second": "Yasal/fiilî yaya ve araç yolu",
          "proof": "Kent rehberinde konum, gerçek girişte yürüyüş; geçiş hakkı için tapu/proje kontrolü."
        },
        {
          "criterion": "Durak",
          "first": "Yakındaki durak simgesi",
          "second": "Kullanılacak hat, yön ve saat",
          "proof": "Trabzon AKUS hat/durak bilgisi; simge bütün gün sefer garantisi değildir."
        },
        {
          "criterion": "Bakım",
          "first": "Yeni boya ile görünen yüzey",
          "second": "Çatı, cephe, drenaj ve geçmiş onarım dosyası",
          "proof": "Yönetim kararı, fatura ve uzman bulgusu; gözlemden performans puanı çıkarılmaz."
        }
      ]
    },
    "workedExample": {
      "title": "Varsayımsal zaman farkı ve bir defalık bakım",
      "inputs": [
        "A: duraktan gerçek girişe 8 dakika, aylık malik gideri 1.000 TL ve size ait kesinleşmiş tek seferlik bakım 45.000 TL.",
        "B: aynı kapsamda 3 dakika, aylık malik gideri 1.400 TL ve bu örnekte kesinleşmiş ek bakım yok. Ayda 22 gidiş-dönüş varsayılıyor."
      ],
      "calculation": "İlk yıl A gideri 12 × 1.000 + 45.000 = 57.000 TL; B 12 × 1.400 = 16.800 TL. A ilk yıl 40.200 TL fazla gider gerektirir. A’nın ek yürüyüşü (8 − 3) × 2 × 22 = 220 dakika/aydır.",
      "interpretation": "B’de bu örnekte karar bulunmaması, gelecekte hiç onarım çıkmayacağı anlamına gelmez. A’daki tek seferlik 45.000 TL’yi sonraki yıllara otomatik taşımayın; erişim süresini de yalnız mesafeden türetmeyin."
    },
    "steps": [
      {
        "title": "Doğru kapıdan gidin",
        "text": "Otobüsten indiğiniz yön ile binanın gerçek girişini birleştirin; alternatif özel geçiş varsa hukuki dayanağını sorun."
      },
      {
        "title": "Bakım gerekçesini belgeleyin",
        "text": "Yalnız görünüşe göre maliyet yazmayın; karar, teklif ve daireye düşen payı ayırın."
      },
      {
        "title": "İlk yıl ve sonraki yılı ayırın",
        "text": "Tek seferlik bakımın etkisini ilk yıl nakit bütçesinde, düzenli gideri yıllık sürdürülebilir bütçede gösterin."
      }
    ],
    "redFlags": [
      "Yakın durak gösterilirken karşı yöndeki veya erişilemeyen geçişin gizlenmesi.",
      "Taze boyanın geçmiş su/nem sorununun giderildiği kanıtı sayılması."
    ],
    "sources": [
      {
        "label": "Trabzon Büyükşehir Belediyesi · AKUS",
        "url": "https://ulasim.trabzon.bel.tr/",
        "scope": "Hat ve durak bilgisi; kişisel yürüme süresi ve bina girişinin uygunluğu değildir."
      },
      {
        "label": "Trabzon Büyükşehir Belediyesi · Kent rehberi",
        "url": "https://cbskent.trabzon.bel.tr/",
        "scope": "Konum ve belediye harita katmanlarına başlangıç; tapu geçiş hakkı veya bina raporu değildir."
      }
    ]
  },
  "balikesir": {
    "question": "Yılda az kullanılan ikinci konutun boş aylardaki yükü ne kadar?",
    "context": "Balıkesir’de sürekli yaşam için konut ile ikinci konutun giderini yalnız kullanılan ay sayısına göre hesaplamayın. Aidat, sigorta, malik vergileri ve bakımın bazı kalemleri kullanım olmasa da sürer. Belirli bir kıyı ilçesi için fiyat veya doluluk iddiası oluşturulmuyor.",
    "comparison": {
      "title": "Sürekli kullanım / sınırlı ikinci kullanım",
      "rows": [
        {
          "criterion": "Sabit ödemeler",
          "first": "Yıl boyunca kullanımda ödenen kalemler",
          "second": "Boş aylarda devam eden kalemler",
          "proof": "Yönetim bütçesi, sigorta, belediye ve abonelik belgeleri."
        },
        {
          "criterion": "Değişken gider",
          "first": "Gerçekleşen tam yıl tüketimi",
          "second": "Yalnız kullanım günlerine bağlı tüketim/ulaşım",
          "proof": "Faturaları sabit ve kullanıma bağlı kısma ayırın."
        },
        {
          "criterion": "Kapsam dışı sermaye",
          "first": "Alım ve varsa kredi",
          "second": "Aynı sermaye ihtiyacı kullanım az diye kaybolmaz",
          "proof": "Alım maliyeti ve ödeme planı ayrı tutulur; gece başı örnek tam yatırım maliyeti değildir."
        }
      ]
    },
    "workedExample": {
      "title": "Varsayımsal 40 gecelik kullanım hesabı",
      "inputs": [
        "İkinci konutun aylık aidatı 2.000 TL; yıllık diğer sabit giderleri 12.000 TL; o yıl bakım gideri 9.000 TL.",
        "Yılda 40 gece kullanım; kullanım kaynaklı ek gider gece başına 300 TL varsayılıyor. Vergi/aidat oranı değil, kullanıcının TL bütçesidir."
      ],
      "calculation": "Sabit ve bakım toplamı 12 × 2.000 + 12.000 + 9.000 = 45.000 TL. Kullanım gideri 40 × 300 = 12.000 TL; yıllık toplam 57.000 TL. Yalnız bu giderlerin kullanılan gece başına karşılığı 57.000 / 40 = 1.425 TL.",
      "interpretation": "20 gece kullanırsanız değişken gider 6.000 TL’ye iner, toplam 51.000 TL ve gece başı 2.550 TL olur. Düşük kullanım toplamı biraz azaltırken kullanım başına gideri artırır. Alış bedeli, finansman ve zaman değeri bu örnekte yoktur."
    },
    "steps": [
      {
        "title": "Boş ay listesini çıkarın",
        "text": "Evin kullanılmadığı ayların hangi ödemeleri devam ediyor? Her kalemin yanına sabit/değişken yazın."
      },
      {
        "title": "İlgili idareyi bulun",
        "text": "Belediye hizmeti ve mülke ait kayıt için doğru büyükşehir/ilçe birimini belirleyin; Büyükşehir bilgi edinme kanalı yönlendirme sağlar."
      },
      {
        "title": "Kendi kullanım eşiğinizi görün",
        "text": "20 ve 40 geceyi aynı sabit bütçede çalıştırın. Gece başı sonucu otel fiyatıyla tam maliyet eşitliği sanmayın."
      }
    ],
    "redFlags": [
      "Evin kapalı olduğu aylarda tüm giderlerin sıfır gösterilmesi.",
      "Belediye kaydına başvurulmadan sözlü borç/tarife bilgisiyle işlem yapılması."
    ],
    "sources": [
      {
        "label": "Balıkesir Büyükşehir Belediyesi · Bilgi edinme",
        "url": "https://e-belediye.balikesir.bel.tr/BilgiEdinme/Index/",
        "scope": "Belediyenin görev alanındaki bilgi ve belge talebi; konutun tüm borçlarını gösteren ortak bir sorgu değildir."
      }
    ]
  },
  "mugla": {
    "question": "“Kira garantisi” sözleşmesinde size kalan tutar ve ödeme yükümlüsü açık mı?",
    "context": "Muğla’daki bir ilanın gelir vaadini garanti veren taraf, süre, kesinti ve koşullarla birlikte okuyun. İzin verilebilir kiralama biçimi ile özel şirketin ödeme taahhüdü farklı konulardır. Bu metin yerel doluluk tahmini veya herhangi bir sözleşmenin geçerlilik raporu değildir.",
    "comparison": {
      "title": "Sabit net ödeme iddiası / brüt hasılat paylaşımı",
      "rows": [
        {
          "criterion": "Ödeme tabanı",
          "first": "Belirlenmiş tarihte net tutar mı?",
          "second": "Gerçekleşen brüt gelirden pay mı?",
          "proof": "İmzalanacak sözleşmede borçlu taraf ve hesap tanımı."
        },
        {
          "criterion": "Kesintiler",
          "first": "Aidat, enerji, bakım ve vergi kime ait?",
          "second": "Yönetim payı, platform, temizlik ve boş dönem",
          "proof": "Kesinti listesi, KDV kapsamı ve örnek hesap ekstresi."
        },
        {
          "criterion": "İzin ve sona erme",
          "first": "Konut için uygulanabilir izin koşulu",
          "second": "İptal, kullanım günleri ve işletmeci değişimi",
          "proof": "Muğla İl KTB rehberi; sözleşme için ayrıca hukuk incelemesi."
        }
      ]
    },
    "workedExample": {
      "title": "Varsayımsal “600 bin TL gelir” ifadesini çözün",
      "inputs": [
        "Yıllık 600.000 TL tutar brüt hasılat olarak tanımlanıyor; bunun üzerinden %25 hizmet kesintisi var.",
        "Malike kalan yıllık aidat/bakım 60.000 TL ve diğer gider 20.000 TL. Vergi ve finansman hariç. Alternatif uzun dönem neti yalnız örnek olarak 390.000 TL/yıl."
      ],
      "calculation": "600.000 × 0,75 − 60.000 − 20.000 = 370.000 TL elde kalır; 600.000 TL net değildir. Alternatif 390.000 TL ile eşitlenmesi için aynı kesinti yapısında brüt (390.000 + 80.000) / 0,75 ≈ 626.667 TL olmalıdır.",
      "interpretation": "Sözleşme gerçekten koşulsuz net 600.000 TL diyorsa bu örnek uygulanmaz; ödeme gücü, güvence ve istisnalar ayrıca incelenir. Hasılat hedefi ile tahsil edilebilir ödeme taahhüdünü aynı adla sunmayın."
    },
    "steps": [
      {
        "title": "Garanti veren kişiyi ve borcu tanımlayın",
        "text": "Satıcı, işletmeci ve ödeme yapacak taraf aynı mı? Ödeme tarihi, süre ve sona erme koşulunu yazın."
      },
      {
        "title": "Bir örnek ekstre isteyin",
        "text": "Brütten size ödenecek nete kadar tüm kesintilerin nasıl uygulandığını sözleşme eki üzerinde gösterin."
      },
      {
        "title": "İzin ile geliri ayrı doğrulayın",
        "text": "İl KTB’nin başvuru yönlendirmesinden konut için gereken koşulları kontrol edin; belge gelirin gerçekleşmesini garanti etmez."
      }
    ],
    "redFlags": [
      "Sözleşmede “tahmini hasılat” yazarken ilanda “net kira garantisi” denmesi.",
      "Garanti süresi içinde kullanım kısıtı, fesih veya ek kesinti şartının belirtilmemesi."
    ],
    "sources": [
      {
        "label": "Muğla İl Kültür ve Turizm Müdürlüğü · Konut kiralama başvuruları",
        "url": "https://mugla.ktb.gov.tr/TR-451170/konutlarin-turizm-amacli-kiralanmasi-basvurulari.html",
        "scope": "Resmî başvuru yardım kılavuzu; özel işletmecinin gelir vaadini onaylamaz."
      },
      {
        "label": "Muğla İl Kültür ve Turizm Müdürlüğü · Mevzuat",
        "url": "https://mugla.ktb.gov.tr/TR-447189/mevzuat.html",
        "scope": "Turizm amaçlı kiralama yönetmeliği ve ilgili resmî kaynaklara yönlendirme; kişiye özel hukuki yorum değildir."
      }
    ]
  }
};

export const cityEditorialScopeNote="Bu karar dosyaları, şehir sayfasındaki resmî veri kartlarından farklıdır. Kartlar kaynak ve dönem belirtilen TCMB/TÜİK göstergelerini sunar; buradaki tablolar ve açıkça varsayımsal örnekler kendi ilanınıza belge ve bütçe kontrolü uygulamanız içindir. Örnekler yerel fiyat, tarife, doluluk araştırması veya konuta özgü teknik rapor değildir.";
