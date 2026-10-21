import {urbanGuideEvidence} from './urban-article';
import {urbanSlug} from './urban-sources';
export type EditorialSource={label:string;url:string;scope:string};
export const editorialUpdatedAt='2026-10-16';

export const guideEvidence:Record<string,{takeaways:string[];sources:EditorialSource[]}>= {
 [urbanSlug]:urbanGuideEvidence,
  "kira-carpani-nedir": {
    "takeaways": [
      "5 milyon TL ve 30 bin TL aylık kira: brüt çarpan 13,89 yıl; gider eklenince aynı evin net sonucu farklıdır.",
      "Çarpanı aynı tarihli, aynı kira tanımlı benzer konutları elemek için kullanın."
    ],
    "sources": [
      {
        "label": "GİB · Hazır Beyan rehberleri",
        "url": "https://intvrg.gib.gov.tr/hazirbeyan/pdflink.html",
        "scope": "Kira ve gayrimenkul elden çıkarma gelirinin beyanını ilgili gelir yılı rehberinden kontrol etmek için; kişiye özel vergi hesaplaması yapılmaz."
      }
    ]
  },
  "ev-pahali-mi": {
    "takeaways": [
      "İl göstergesinden fark ile emsal farkı ve sizin bütçe sınırınız üç ayrı sonuçtur.",
      "Alan türünü eşitlemeden ve belge farkını görmeden teklif üretmeyin."
    ],
    "sources": [
      {
        "label": "TCMB · KFE metaverisi",
        "url": "https://www.tcmb.gov.tr/wps/wcm/connect/b4628fa9-11a7-4426-aee6-dae67fc56200/KFE-Metaveri.pdf?MOD=AJPERES",
        "scope": "Endeksin kapsamı ve yöntemi; tek taşınmazın satış veya ekspertiz bedeli değildir."
      },
      {
        "label": "TKGM · Parsel Sorgu açıklaması",
        "url": "https://www.tkgm.gov.tr/e-hizmetler/sik-kullanilanlar/parsel-sorgulama",
        "scope": "Taşınmazın konumunu kontrol etmek için; güncel malik, yetki ve kısıtlamaların tamamına ilişkin tapu incelemesinin yerine geçmez."
      }
    ]
  },
  "net-kira-getirisi": {
    "takeaways": [
      "Net kira hesabında brüt sözleşme kirası, tahsil edilecek ay, malik gideri ve yıllık TL vergi ayrı girilir.",
      "Bir ay daha boşluk, örnekte yıllık net nakdi yaklaşık %10,91 azaltır."
    ],
    "sources": [
      {
        "label": "GİB · Hazır Beyan rehberleri",
        "url": "https://intvrg.gib.gov.tr/hazirbeyan/pdflink.html",
        "scope": "Kira ve gayrimenkul elden çıkarma gelirinin beyanını ilgili gelir yılı rehberinden kontrol etmek için; kişiye özel vergi hesaplaması yapılmaz."
      }
    ]
  },
  "reel-konut-getirisi": {
    "takeaways": [
      "Reel oran, nominal oran eksi enflasyon değildir; büyüme katsayıları bölünür.",
      "Basit hesap net kirayı dönem sonunda alır; aylık nakit akışı veya kredi performansı ölçmez."
    ],
    "sources": [
      {
        "label": "TÜİK · Veri Portalı / TÜFE",
        "url": "https://veriportali.tuik.gov.tr/",
        "scope": "TÜFE endeksi, yıllık değişim ve on iki aylık ortalamalara göre değişim farklı göstergelerdir; dönem ve sütun adı kontrol edilmelidir."
      },
      {
        "label": "TÜİK · Finansal yatırım araçları metaverisi",
        "url": "https://veriportali.tuik.gov.tr/tr/press/54170/metadata",
        "scope": "Geçmiş dönem brüt mevduat, BIST 100, külçe altın, dolar, euro ve DİBS için nominal/reel gösterge kapsamı; kişisel net portföy getirisi değildir."
      }
    ]
  },
  "ev-mi-mevduat-mi": {
    "takeaways": [
      "Konut masrafları dahil başlangıç sermayesi ve karşılaştırılan tarihler eşit olmalı.",
      "45 günlük mevduat sonucunu aynı oranla bir yıllık yenileme garantisi gibi okumayın."
    ],
    "sources": [
      {
        "label": "Ticaret Bakanlığı · Konut finansmanı bilgilendirmesi",
        "url": "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/konut-finansmani-sozlesmeleri-hakkinda-bilgilendirme",
        "scope": "Sözleşme öncesi bilgi, ödeme planı ve finansman koşulları; bankanın gerçek teklifi ayrıca alınmalıdır."
      },
      {
        "label": "TCMB · Elektronik Veri Dağıtım Sistemi",
        "url": "https://evds3.tcmb.gov.tr/",
        "scope": "Seri adı, coğrafi kapsam, birim ve dönemi kaynaktan kontrol etmek için; banka teklifi değildir."
      },
      {
        "label": "GİB · Hazır Beyan rehberleri",
        "url": "https://intvrg.gib.gov.tr/hazirbeyan/pdflink.html",
        "scope": "Kira ve gayrimenkul elden çıkarma gelirinin beyanını ilgili gelir yılı rehberinden kontrol etmek için; kişiye özel vergi hesaplaması yapılmaz."
      }
    ]
  },
  "konut-kredisi-maliyeti": {
    "takeaways": [
      "Aylık oran, bileşik yıllık karşılık ve bankanın yıllık maliyet oranı aynı şey değildir.",
      "Ödeme planının ilk ay faiz/anapara ayrımını yeniden hesaplayın."
    ],
    "sources": [
      {
        "label": "Ticaret Bakanlığı · Konut finansmanı bilgilendirmesi",
        "url": "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/konut-finansmani-sozlesmeleri-hakkinda-bilgilendirme",
        "scope": "Sözleşme öncesi bilgi, ödeme planı ve finansman koşulları; bankanın gerçek teklifi ayrıca alınmalıdır."
      }
    ]
  },
  "tapu-kontrolu": {
    "takeaways": [
      "Kapı numarası, tapu bağımsız bölümü ve proje konumu aynı taşınmazı göstermeli.",
      "Parsel haritası güncel malik/yetki/kısıtlama kontrolünün tamamı değildir."
    ],
    "sources": [
      {
        "label": "TKGM · Parsel Sorgu açıklaması",
        "url": "https://www.tkgm.gov.tr/e-hizmetler/sik-kullanilanlar/parsel-sorgulama",
        "scope": "Taşınmazın konumunu kontrol etmek için; güncel malik, yetki ve kısıtlamaların tamamına ilişkin tapu incelemesinin yerine geçmez."
      },
      {
        "label": "TKGM · Kat irtifakı ve kat mülkiyeti genelgesi",
        "url": "https://www.tkgm.gov.tr/duyurular/kat-irtifaki-ve-kat-mulkiyeti-genelgesi",
        "scope": "Kat irtifakı/kat mülkiyeti işlemleri ve belge kapsamı; belediye proje dosyası ve fiilî uygunluk ayrıca incelenir."
      }
    ]
  },
  "iskan-kat-mulkiyeti": {
    "takeaways": [
      "İzin belgesinin hangi blok ve bölümü kapsadığını kontrol edin.",
      "Krediye uygunluk ifadesi proje ve tapu uyumsuzluğunu kendiliğinden gidermez."
    ],
    "sources": [
      {
        "label": "TKGM · Kat irtifakı ve kat mülkiyeti genelgesi",
        "url": "https://www.tkgm.gov.tr/duyurular/kat-irtifaki-ve-kat-mulkiyeti-genelgesi",
        "scope": "Kat irtifakı/kat mülkiyeti işlemleri ve belge kapsamı; belediye proje dosyası ve fiilî uygunluk ayrıca incelenir."
      }
    ]
  },
  "deprem-riski-kontrolu": {
    "takeaways": [
      "AFAD tehlike bilgisi bina dayanıklılık raporu değildir.",
      "Teknik raporun doğru binaya, doğru tarihe ve açık inceleme yöntemine sahip olduğunu araştırın."
    ],
    "sources": [
      {
        "label": "AFAD · Tehlike ve risk ayrımı",
        "url": "https://amasya.afad.gov.tr/yeni-deprem-tehlike-haritasi-yayimlandi",
        "scope": "Deprem tehlike haritasının kapsamı; bir binanın dayanıklılık veya performans raporu değildir."
      }
    ]
  },
  "aidat-borc-kontrolu": {
    "takeaways": [
      "Aylık aidattan başka karara bağlanmış büyük onarımları sorun.",
      "Yazılı borç dökümünün tarihini ve kapsadığı kalemleri kontrol edin."
    ],
    "sources": [
      {
        "label": "634 sayılı Kat Mülkiyeti Kanunu",
        "url": "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.634.pdf",
        "scope": "Yönetim planı, ortak gider ve bağımsız bölüm düzeni; borcun kime ait olduğu somut belge ve devir koşullarıyla incelenir."
      }
    ]
  },
  "kiracili-ev-almak": {
    "takeaways": [
      "Gelir hesabında ilk önce mevcut sözleşme kirası ve ödeme kaydı kullanılır.",
      "Piyasa kirası ve “kiracı çıkacak” ifadesi gerçekleşmiş gelir/teslim değildir."
    ],
    "sources": [
      {
        "label": "6098 sayılı Türk Borçlar Kanunu",
        "url": "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6098.pdf",
        "scope": "m.310 el değiştirme, m.344 kira bedeli; belirli dosyanın tahliye sonucu veya uygulanacak kira bedeli hesaplanmaz."
      }
    ]
  },
  "brut-net-metrekare": {
    "takeaways": [
      "Alan kaynağını da emsal tablosuna ekleyin; yalnız ilan rakamına dayanmayın.",
      "İlanın brüt/net katsayısıyla türetilen gösterge resmî net fiyat serisi değildir."
    ],
    "sources": [
      {
        "label": "TKGM · Kat irtifakı ve kat mülkiyeti genelgesi",
        "url": "https://www.tkgm.gov.tr/duyurular/kat-irtifaki-ve-kat-mulkiyeti-genelgesi",
        "scope": "Kat irtifakı/kat mülkiyeti işlemleri ve belge kapsamı; belediye proje dosyası ve fiilî uygunluk ayrıca incelenir."
      },
      {
        "label": "TCMB · KFE metaverisi",
        "url": "https://www.tcmb.gov.tr/wps/wcm/connect/b4628fa9-11a7-4426-aee6-dae67fc56200/KFE-Metaveri.pdf?MOD=AJPERES",
        "scope": "Endeksin kapsamı ve yöntemi; tek taşınmazın satış veya ekspertiz bedeli değildir."
      }
    ]
  },
  "ilan-fiyati-pazarlik": {
    "takeaways": [
      "Büyük indirim, benzer konuta göre düşük nihai fiyat anlamına gelmez.",
      "Teklifinizi toplam gider, doğrulanmış nitelik farkı ve teslim şartına bağlayın."
    ],
    "sources": [
      {
        "label": "TKGM · Parsel Sorgu açıklaması",
        "url": "https://www.tkgm.gov.tr/e-hizmetler/sik-kullanilanlar/parsel-sorgulama",
        "scope": "Taşınmazın konumunu kontrol etmek için; güncel malik, yetki ve kısıtlamaların tamamına ilişkin tapu incelemesinin yerine geçmez."
      },
      {
        "label": "Ticaret Bakanlığı · Taşınmaz ticareti ve hizmet bedeli",
        "url": "https://afyon.ticaret.gov.tr/basvurular/tasinmaz-ticareti-yetki-belgesi-verilmesi",
        "scope": "Alım satıma aracılıkta toplam hizmet bedeli tavanı; taraf paylaşımı ile KDV ayrıca kontrol edilir."
      }
    ]
  },
  "emlak-alim-masraflari": {
    "takeaways": [
      "Alım gideri, yıllık gider ve henüz harcanmamış rezerv farklı tutarlardır.",
      "Kredi anaparasını ev bedeline ikinci kez masraf olarak eklemeyin."
    ],
    "sources": [
      {
        "label": "GİB · Tapu işleminde gerçek bedel broşürü",
        "url": "https://cdn.gib.gov.tr/api/gibportal-file/file/getFileResources?objectKey=arsiv%2Fonceki-dokumanlar%2Fduyurular%2Ftapu%2Ftapubrosur1.pdf",
        "scope": "Satış işlemi harcının matrah ve taraf ayrımı. Arşiv broşürüdür; güncel işlem tahakkuku ve yürürlükteki tarife ayrıca doğrulanmalıdır."
      },
      {
        "label": "Ticaret Bakanlığı · Taşınmaz ticareti ve hizmet bedeli",
        "url": "https://afyon.ticaret.gov.tr/basvurular/tasinmaz-ticareti-yetki-belgesi-verilmesi",
        "scope": "Alım satıma aracılıkta toplam hizmet bedeli tavanı; taraf paylaşımı ile KDV ayrıca kontrol edilir."
      },
      {
        "label": "Ticaret Bakanlığı · Konut finansmanı bilgilendirmesi",
        "url": "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/konut-finansmani-sozlesmeleri-hakkinda-bilgilendirme",
        "scope": "Sözleşme öncesi bilgi, ödeme planı ve finansman koşulları; bankanın gerçek teklifi ayrıca alınmalıdır."
      }
    ]
  },
  "konut-endeksi-okuma": {
    "takeaways": [
      "Endeks puanı ile TL/m² farklı birimdir; birbirinin yerine kullanılmaz.",
      "Dönem, yayımlanma tarihi ve veri çekim zamanı farklı tarihler olabilir."
    ],
    "sources": [
      {
        "label": "TCMB · KFE metaverisi",
        "url": "https://www.tcmb.gov.tr/wps/wcm/connect/b4628fa9-11a7-4426-aee6-dae67fc56200/KFE-Metaveri.pdf?MOD=AJPERES",
        "scope": "Endeksin kapsamı ve yöntemi; tek taşınmazın satış veya ekspertiz bedeli değildir."
      },
      {
        "label": "TCMB · Elektronik Veri Dağıtım Sistemi",
        "url": "https://evds3.tcmb.gov.tr/",
        "scope": "Seri adı, coğrafi kapsam, birim ve dönemi kaynaktan kontrol etmek için; banka teklifi değildir."
      }
    ]
  }
};

export const toolEvidence:Record<string,{intro:string;exampleTitle:string;exampleSteps:string[];result:string;checks:string[];sources:EditorialSource[];faqs?:{q:string;a:string}[]}>= {
  "kira-carpani": {
    "intro": "Bu araç sabit kirayla brüt karşılaştırma ve ayrıca seçtiğiniz artışla brüt kira projeksiyonu yapar. Hiçbiri vergi, bakım, boşluk veya gelecekteki satış bedelini içermez.",
    "exampleTitle": "Örnek: ilk yıl ile artışlı ikinci yılı ayırın",
    "exampleSteps": [
      "5.000.000 TL fiyat ÷ 30.000 TL aylık kira = 166,67 ay, yani 13,89 yıl sabit kira çarpanı.",
      "İlk yıl brüt kira 360.000 TL; fiyat üzerinden brüt getiri %7,20.",
      "Yalnız varsayım olarak %25 artış seçilirse ikinci yıl aylık kira 37.500 TL ve iki yıl toplam brüt kira 810.000 TL olur."
    ],
    "result": "Artışlı projeksiyon, kira sözleşmenizin yasal artış sınırı veya gelecekteki gelir garantisi değildir. Net sonuç için aynı konutun alım giderlerini ve yıllık kesintilerini net kira hesabında kullanın.",
    "checks": [
      "Aynı tarih ve benzer nitelikte kira emsali kullanın.",
      "Mevcut kiracının sözleşme kirasını gelecekte umduğunuz kira ile değiştirmeyin.",
      "İkinci hesapta artış oranını sıfıra indirerek sonucun ne kadar değiştiğine bakın."
    ],
    "sources": [
      {
        "label": "GİB · Hazır Beyan rehberleri",
        "url": "https://intvrg.gib.gov.tr/hazirbeyan/pdflink.html",
        "scope": "Kira ve gayrimenkul elden çıkarma gelirinin beyanını ilgili gelir yılı rehberinden kontrol etmek için; kişiye özel vergi hesaplaması yapılmaz."
      }
    ],
    "faqs": [
      {
        "q": "Brüt çarpan neden gerçek geri dönüş yılı değil?",
        "a": "Fiyatı bugünkü yıllık kiraya böler; kira ve konut değerinin gelecekteki değişimini, giderleri ve zaman değerini içermez."
      },
      {
        "q": "Kira sıfırsa ne olur?",
        "a": "Yıllık gelir sıfırdır; bir geri dönüş yılı hesaplanamaz. Sonsuz veya sıfır yıl sonucu yatırım bilgisi olmaz."
      }
    ]
  },
  "net-kira": {
    "intro": "Tahsil edilebilir brüt kiradan malike kalan yıllık gider ve kendi hesapladığınız vergi düşülür. Net getiri, satış bedeli ile alım giderleri toplamına bölünür.",
    "exampleTitle": "Örnek: boşluk ve gider sonucu değiştirir",
    "exampleSteps": [
      "5.000.000 TL fiyat + 300.000 TL alım gideri = 5.300.000 TL başlangıç yatırımı.",
      "30.000 TL × (12 − 1 boş ay) = 330.000 TL tahsilat.",
      "330.000 − 35.000 TL yıllık gider − 20.000 TL örnek vergi = 275.000 TL net kira; net oran %5,19."
    ],
    "result": "Bir ay daha boş kalırsa yıllık net 245.000 TL, getiri %4,62 olur. Vergi örneği kişisel vergi hesabı değildir.",
    "checks": [
      "Kiracının ödediği olağan aidatı malik giderine tekrar eklemeyin.",
      "İlk tadilat aynı anda alım gideri ve yıllık bakım olmasın.",
      "GİB rehberinde gelir yılını kontrol edip yıllık vergi tutarını girin."
    ],
    "sources": [
      {
        "label": "GİB · Hazır Beyan rehberleri",
        "url": "https://intvrg.gib.gov.tr/hazirbeyan/pdflink.html",
        "scope": "Kira ve gayrimenkul elden çıkarma gelirinin beyanını ilgili gelir yılı rehberinden kontrol etmek için; kişiye özel vergi hesaplaması yapılmaz."
      }
    ],
    "faqs": [
      {
        "q": "Net kira negatif çıkarsa hata mı var?",
        "a": "Tahsilat yıllık gider ve vergiyi karşılamıyorsa negatif nakit mümkündür. Böyle bir sonuç için basit geri dönüş yılı yoktur."
      },
      {
        "q": "Kredi taksiti yıllık gider mi?",
        "a": "Bu araç finansmansız kira verimini ölçer. Kredi anapara ve faiz akışını ayrıca inceleyin; taksidin tamamını işletme gideri saymak farklı bir ölçüm üretir."
      }
    ]
  },
  "metrekare": {
    "intro": "Sonuç fiyatı seçtiğiniz alana böler. Araç alanı ölçmez ve proje uygunluğunu doğrulamaz; girdinin net mi brüt mü olduğunu sizin eşleştirmeniz gerekir.",
    "exampleTitle": "Örnek: aynı fiyat, iki farklı alan tanımı",
    "exampleSteps": [
      "5.000.000 TL ÷ 100 m² net = 50.000 TL/net m².",
      "Aynı evde 130 m² brüt kullanılırsa yaklaşık 38.462 TL/brüt m².",
      "İkinci ilanın 90 m² net ve 4.800.000 TL olması yaklaşık 53.333 TL/net m² anlamına gelir."
    ],
    "result": "İkinci evin toplam bedeli daha düşük olsa da net m² fiyatı ilk evden yaklaşık %6,67 yüksektir. Bu fark tek başına değerleme veya pahalılık kararı değildir.",
    "checks": [
      "Alan türünü her ilanda aynı tutun.",
      "Alan kaynağını ilan beyanı/proje/ölçüm olarak kaydedin.",
      "Kat, bina niteliği, konum ve eklenti farklarını ayrıca kontrol edin."
    ],
    "sources": [
      {
        "label": "TKGM · Kat irtifakı ve kat mülkiyeti genelgesi",
        "url": "https://www.tkgm.gov.tr/duyurular/kat-irtifaki-ve-kat-mulkiyeti-genelgesi",
        "scope": "Kat irtifakı/kat mülkiyeti işlemleri ve belge kapsamı; belediye proje dosyası ve fiilî uygunluk ayrıca incelenir."
      }
    ],
    "faqs": [
      {
        "q": "Tapuda m² görünmesi ölçümü tamamlar mı?",
        "a": "Kayıttaki alanın hangi kapsamı ifade ettiğini kontrol edin; bağımsız bölüm sınırları ve fiilî kullanım için onaylı proje/ölçüm gerekebilir."
      },
      {
        "q": "Alım giderleri sonuca dahil mi?",
        "a": "Araç yalnız girdiğiniz fiyatı böler. Toplam yatırım/m² ölçmek isterseniz toplam alım tutarını kullanın ve bunu ilan birim fiyatından ayrı adlandırın."
      }
    ]
  },
  "reel-getiri": {
    "intro": "Basit dönem sonu hesabı, dönem başı konut değerini fiyat değişimiyle büyütür; girilen net kirayı ekler ve satış giderini düşer. Sonucu aynı dönem enflasyonuyla düzeltir. Alım masrafları ve kredi bu basit modelde yoktur.",
    "exampleTitle": "Örnek: TL kârı varken satın alma gücü azalabilir",
    "exampleSteps": [
      "5.000.000 TL konut değeri × 1,20 fiyat katsayısı = 6.000.000 TL.",
      "250.000 TL dönem net kirası eklenip 150.000 TL satış gideri düşülür: toplam 6.100.000 TL; nominal getiri %22.",
      "Aynı dönemde %30 enflasyonla 6.100.000 ÷ 1,30 = yaklaşık 4.692.308 TL başlangıç alım gücü; reel getiri −%6,15."
    ],
    "result": "Örnek fiyat artışı ve enflasyon varsayımdır. Hesap kirayı dönem sonunda elde edilmiş kabul eder; aylık tahsilatların yeniden yatırımını ve finansman nakit akışını ölçmez.",
    "checks": [
      "Fiyat değişimi, kira ve enflasyon aynı döneme ait olmalı.",
      "Konut değeri alanına kredi tutarını veya masraflı toplam yatırımı yazmayın.",
      "Satış yapılmadıysa sonucu gerçekleşmiş kâr olarak sunmayın."
    ],
    "sources": [
      {
        "label": "TÜİK · Veri Portalı / TÜFE",
        "url": "https://veriportali.tuik.gov.tr/",
        "scope": "TÜFE endeksi, yıllık değişim ve on iki aylık ortalamalara göre değişim farklı göstergelerdir; dönem ve sütun adı kontrol edilmelidir."
      },
      {
        "label": "TÜİK · Finansal yatırım araçları metaverisi",
        "url": "https://veriportali.tuik.gov.tr/tr/press/54170/metadata",
        "scope": "Geçmiş dönem brüt mevduat, BIST 100, külçe altın, dolar, euro ve DİBS için nominal/reel gösterge kapsamı; kişisel net portföy getirisi değildir."
      }
    ],
    "faqs": [
      {
        "q": "Nominal getiriden enflasyon çıkarılır mı?",
        "a": "Hayır. Reel oran (1 + nominal oran) / (1 + enflasyon) − 1 formülüyle bulunur; oranlar ondalık biçimde kullanılmalıdır."
      },
      {
        "q": "Alım masraflarını konut değerine ekleyebilir miyim?",
        "a": "Bu basit formülde girilen başlangıç tutarının tamamı fiyat değişimiyle büyütülür. Masrafları eklemek onları da değerlenmiş gibi gösterir; ayrıntılı yatırım için ayrı nakit akışı gerekir."
      }
    ]
  },
  "alim-maliyeti": {
    "intro": "Belgelenmiş başlangıç giderlerini satış bedeline ekler. Yıllık bakım, gelecekteki kredi faizi ve henüz harcanmamış nakit rezervi ayrı takip edilir.",
    "exampleTitle": "Örnek: ilan bedeli ile nakit ihtiyacı farkı",
    "exampleSteps": [
      "Satış bedeli 5.000.000 TL; örnek tapu/işlem gideri 105.000 TL, hizmet 120.000 TL, tadilat 150.000 TL, finansman başlangıç gideri 25.000 TL ve diğer 20.000 TL.",
      "Ek giderler toplamı 420.000 TL; alım maliyeti 5.420.000 TL; satış fiyatına oranla ek maliyet %8,40.",
      "Ayrıca 150.000 TL rezerv ayırırsanız gerekli nakit 5.570.000 TL olur; rezerv harcanmadıkça gerçekleşmiş maliyet değildir."
    ],
    "result": "Örnek giderler güncel yasal tarife değildir. İşlem için resmî tahakkuk ve yazılı tekliflerinizi girin.",
    "checks": [
      "Kredi anaparasını masraf olarak ikinci kez eklemeyin.",
      "KDV dahil hizmet tutarı girip KDV’yi diğer giderde yeniden saymayın.",
      "Finansman alanında gelecekteki tüm faiz yerine başlangıç gideri kapsamını koruyun."
    ],
    "sources": [
      {
        "label": "GİB · Tapu işleminde gerçek bedel broşürü",
        "url": "https://cdn.gib.gov.tr/api/gibportal-file/file/getFileResources?objectKey=arsiv%2Fonceki-dokumanlar%2Fduyurular%2Ftapu%2Ftapubrosur1.pdf",
        "scope": "Satış işlemi harcının matrah ve taraf ayrımı. Arşiv broşürüdür; güncel işlem tahakkuku ve yürürlükteki tarife ayrıca doğrulanmalıdır."
      },
      {
        "label": "Ticaret Bakanlığı · Taşınmaz ticareti ve hizmet bedeli",
        "url": "https://afyon.ticaret.gov.tr/basvurular/tasinmaz-ticareti-yetki-belgesi-verilmesi",
        "scope": "Alım satıma aracılıkta toplam hizmet bedeli tavanı; taraf paylaşımı ile KDV ayrıca kontrol edilir."
      },
      {
        "label": "Ticaret Bakanlığı · Konut finansmanı bilgilendirmesi",
        "url": "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/konut-finansmani-sozlesmeleri-hakkinda-bilgilendirme",
        "scope": "Sözleşme öncesi bilgi, ödeme planı ve finansman koşulları; bankanın gerçek teklifi ayrıca alınmalıdır."
      }
    ],
    "faqs": [
      {
        "q": "Her masraf için yüzde kullanmalı mıyım?",
        "a": "Hayır. Bu araç TL tutarlarını toplar; işlem tahakkuku ve yazılı sözleşme/teklif tutarı daha açıklayıcıdır."
      },
      {
        "q": "Tadilatı yıllık kira giderine de yazmalı mıyım?",
        "a": "Aynı faturayı iki kez yazmayın. Başlangıç tadilatı alım maliyetinde; sonraki dönemin ayrı bakımı yıllık kira giderinde izlenebilir."
      }
    ]
  },
  "tapu-harci": {
    "intro": "Araç normal satış için alıcı ve satıcı payını ayrı gösterir. Harç ile döner sermaye aynı kalem değildir; istisna veya farklı işlem türleri için otomatik hüküm kurulmaz.",
    "exampleTitle": "Örnek: taraf payı ile toplamı ayırın",
    "exampleSteps": [
      "5.000.000 TL beyan bedeli ve araçta kullanılan %2 taraf oranıyla alıcı harcı 100.000 TL, satıcı harcı 100.000 TL olur.",
      "Döner sermaye alanına yalnız aritmetik örnek olarak 5.000 TL girilirse araç alıcı toplamını 105.000 TL gösterir.",
      "İşlem toplamı iki tarafın harcı ve girilen döner sermayeyle 205.000 TL olur."
    ],
    "result": "5.000 TL güncel döner sermaye tarifesi değildir. Gerçek satış bedelini, matrahı, işlem niteliğini ve resmî tahakkuku tapu müdürlüğüyle doğrulayın. Araç döner sermayeyi alıcı tarafına eklediğinden gerçek paylaşımı ayrıca kontrol edin.",
    "checks": [
      "İndirim/istisna veya özel işlem türü olup olmadığını sorun.",
      "Resmî tahakkuk ile aritmetik örneği karıştırmayın.",
      "Emlak vergisi değeri tek başına gerçek satış bedelinin yerine geçmez."
    ],
    "sources": [
      {
        "label": "GİB · Tapu işleminde gerçek bedel broşürü",
        "url": "https://cdn.gib.gov.tr/api/gibportal-file/file/getFileResources?objectKey=arsiv%2Fonceki-dokumanlar%2Fduyurular%2Ftapu%2Ftapubrosur1.pdf",
        "scope": "Satış işlemi harcının matrah ve taraf ayrımı. Arşiv broşürüdür; güncel işlem tahakkuku ve yürürlükteki tarife ayrıca doğrulanmalıdır."
      },
      {
        "label": "492 sayılı Harçlar Kanunu · (4) sayılı tarife",
        "url": "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.492.pdf",
        "scope": "Tapu işlemleri için özellikle 20/a; hesap örneği işlem gününün resmî tahakkuku değildir."
      }
    ]
  },
  "emlak-komisyonu": {
    "intro": "Toplam aracılık tavanı ile taraflardan birinin ödeyeceği tutarı ayırın. Eşit paylaşım bir hesap varsayımıdır; yazılı sözleşmede farklı paylaşım olabilir.",
    "exampleTitle": "Örnek: eşit paylaşım ve örnek KDV",
    "exampleSteps": [
      "5.000.000 TL satışta KDV hariç toplam %4 = 200.000 TL toplam tavan.",
      "Eşit paylaşımda bir taraf 100.000 TL; yalnız hesap örneği olarak %20 KDV seçilirse bu tarafa 20.000 TL KDV eklenir.",
      "Bir taraf için KDV dahil 120.000 TL; aynı paylaşımda iki taraf toplamı 240.000 TL olur."
    ],
    "result": "Tavan her işlemde mutlaka alınacak ücret değildir. KDV oranını ve hizmet bedelinin paylaşımını sözleşme/fatura için ayrıca doğrulayın; %2’yi her taraf için değişmez yasal tavan saymayın.",
    "checks": [
      "Yetkilendirme/aracılık sözleşmesindeki hizmeti okuyun.",
      "Hizmet fiyatının KDV dahil mi hariç mi olduğunu teyit edin.",
      "Alım maliyetine yalnız sizin ödediğiniz payı ekleyin."
    ],
    "sources": [
      {
        "label": "Ticaret Bakanlığı · Taşınmaz ticareti ve hizmet bedeli",
        "url": "https://afyon.ticaret.gov.tr/basvurular/tasinmaz-ticareti-yetki-belgesi-verilmesi",
        "scope": "Alım satıma aracılıkta toplam hizmet bedeli tavanı; taraf paylaşımı ile KDV ayrıca kontrol edilir."
      }
    ]
  },
  "kira-artis-orani": {
    "intro": "Aritmetik sonuç, girdiğiniz oranı mevcut kiraya uygular. TÜFE yıllık değişimi ile on iki aylık ortalamalara göre değişim farklıdır; doğru dönem/sütun seçilmelidir.",
    "exampleTitle": "Örnek: oranı doğru tutara uygulayın",
    "exampleSteps": [
      "Mevcut kira 30.000 TL; tamamen varsayımsal oran %25 olsun.",
      "Artış tutarı 30.000 × 0,25 = 7.500 TL; yeni tutar 37.500 TL.",
      "Bu örnek güncel TÜFE veya belirli sözleşmeniz için uygulanabilir artış kararı değildir."
    ],
    "result": "Türk Borçlar Kanunu m.344 kapsamında sözleşme ve yenileme koşulları ayrıca incelenir. Araç kira tespit davası, uyarlama veya tahliye değerlendirmesi yapmaz.",
    "checks": [
      "Yenileme tarihine uygun veri dönemini kontrol edin.",
      "Yıllık TÜFE değişimi yerine gereken on iki aylık ortalama serisini seçin.",
      "Sözleşme ve özel durum için hukuki değerlendirme gerekebilir."
    ],
    "sources": [
      {
        "label": "6098 sayılı Türk Borçlar Kanunu",
        "url": "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6098.pdf",
        "scope": "m.310 el değiştirme, m.344 kira bedeli; belirli dosyanın tahliye sonucu veya uygulanacak kira bedeli hesaplanmaz."
      },
      {
        "label": "TÜİK · Veri Portalı / TÜFE",
        "url": "https://veriportali.tuik.gov.tr/",
        "scope": "TÜFE endeksi, yıllık değişim ve on iki aylık ortalamalara göre değişim farklı göstergelerdir; dönem ve sütun adı kontrol edilmelidir."
      }
    ]
  },
  "altin-bazli-konut": {
    "intro": "Konut bedelini gram karşılığına ve altın birikimini hedef peşinat tutarına çevirir. Peşinat oranı bankanın kabul edeceği kredi oranı değildir.",
    "exampleTitle": "Örnek: gram bütçesi ve peşinat açığı",
    "exampleSteps": [
      "5.000.000 TL konut ve varsayımsal 5.000 TL/gram referans fiyatı: konut 1.000 gram eder.",
      "250 gram birikim 1.250.000 TL; %30 hedef peşinat 1.500.000 TL’dir.",
      "Birikim peşinatın %83,33’ünü karşılar; eksik peşinat 250.000 TL. Aynı %30 oranıyla matematiksel konut bütçesi yaklaşık 4.166.667 TL olur."
    ],
    "result": "Gram referansı altının gerçek bozdurma bedeli değildir. Alış/satış farkı, işçilik, masraflar ve bankanın kredi limiti bu sonuçta yoktur.",
    "checks": [
      "Fiyatın tarihini ve alış/satış yönünü kontrol edin.",
      "Elinizdeki altının saf gram eşdeğeri ile ürün adedini karıştırmayın.",
      "Peşinat dışında alım gideri için nakit bırakın."
    ],
    "sources": [
      {
        "label": "Ticaret Bakanlığı · Konut finansmanı bilgilendirmesi",
        "url": "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/konut-finansmani-sozlesmeleri-hakkinda-bilgilendirme",
        "scope": "Sözleşme öncesi bilgi, ödeme planı ve finansman koşulları; bankanın gerçek teklifi ayrıca alınmalıdır."
      },
      {
        "label": "TCMB · Elektronik Veri Dağıtım Sistemi",
        "url": "https://evds3.tcmb.gov.tr/",
        "scope": "Seri adı, coğrafi kapsam, birim ve dönemi kaynaktan kontrol etmek için; banka teklifi değildir."
      }
    ]
  },
  "hisseli-tapu": {
    "intro": "Pay/payda oranının alan ve değer üzerindeki matematiksel karşılığını gösterir. Bu tutar belirli oda, kat veya bölümü müstakilen satın aldığınız anlamına gelmez.",
    "exampleTitle": "Örnek: pay ile kullanım alanı farklıdır",
    "exampleSteps": [
      "120 m² toplam alan, 6.000.000 TL değer ve 1/4 pay için oran %25’tir.",
      "Matematiksel alan karşılığı 30 m²; değer karşılığı 1.500.000 TL olur.",
      "Bu sonuç binanın belli 30 m²’lik bölümünün size ait olduğunu veya payın bu tutara satılabildiğini kanıtlamaz."
    ],
    "result": "Mülkiyet türünü, payı ve varsa kullanım düzenlemesini tapu ve sözleşme kayıtlarıyla doğrulayın. Miras payı için tahmin yerine yetkili belgedeki oranı kullanın.",
    "checks": [
      "Payda sıfır olamaz; pay/payda tapu kaydıyla aynı olmalı.",
      "Toplam parsel alanı ile bağımsız bölüm alanını karıştırmayın.",
      "Hukuki kullanım hakkını matematiksel alan hesabından çıkarmayın."
    ],
    "sources": [
      {
        "label": "TKGM · Parsel Sorgu açıklaması",
        "url": "https://www.tkgm.gov.tr/e-hizmetler/sik-kullanilanlar/parsel-sorgulama",
        "scope": "Taşınmazın konumunu kontrol etmek için; güncel malik, yetki ve kısıtlamaların tamamına ilişkin tapu incelemesinin yerine geçmez."
      },
      {
        "label": "TKGM · Kat irtifakı ve kat mülkiyeti genelgesi",
        "url": "https://www.tkgm.gov.tr/duyurular/kat-irtifaki-ve-kat-mulkiyeti-genelgesi",
        "scope": "Kat irtifakı/kat mülkiyeti işlemleri ve belge kapsamı; belediye proje dosyası ve fiilî uygunluk ayrıca incelenir."
      }
    ]
  },
  "kredi": {
    "intro": "Eşit taksitli sabit faiz formülü kullanılır. Ek gider toplam ödemeye eklenir; bankanın yıllık maliyet oranını veya ara ödemeli planını yeniden üretmez.",
    "exampleTitle": "Örnek: ilk ayda anapara neden az azalır?",
    "exampleSteps": [
      "2.000.000 TL kredi, aylık %2,5 ve 120 ay için aylık taksit yaklaşık 52.724 TL.",
      "İlk ay faiz 50.000 TL; taksitin yaklaşık 2.724 TL’si anaparayı azaltır.",
      "Sıfır ek giderle toplam taksit yaklaşık 6.326.830 TL. 25.000 TL ek gider girilirse toplam ödeme yaklaşık 6.351.830 TL olur."
    ],
    "result": "Aylık %2,5 oran, yıllık %2,5 değildir. Bu ödeme kapasitesi hesabı bankanın onaylayacağı limit veya gerçek teklif değildir.",
    "checks": [
      "Bankanın aylık oranını ve tam ay vadesini girin.",
      "Ek gideri ödeme planında zaten saydıysanız iki kez eklemeyin.",
      "Sigorta, ekspertiz ve diğer maliyetleri yazılı teklifle doğrulayın."
    ],
    "sources": [
      {
        "label": "Ticaret Bakanlığı · Konut finansmanı bilgilendirmesi",
        "url": "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/konut-finansmani-sozlesmeleri-hakkinda-bilgilendirme",
        "scope": "Sözleşme öncesi bilgi, ödeme planı ve finansman koşulları; bankanın gerçek teklifi ayrıca alınmalıdır."
      }
    ]
  },
  "mevduat": {
    "intro": "Yıllık brüt oran, seçilen gün sayısına 365 gün esasıyla uygulanır; stopaj yalnız faizden düşülür. Örnek oranlar bankanın güncel teklifi veya mevzuat teyidi değildir.",
    "exampleTitle": "Örnek: 32 günlük net faiz",
    "exampleSteps": [
      "1.000.000 TL × %39 × 32 / 365 = 34.191,78 TL brüt faiz.",
      "Yalnız örnek olarak %17,5 stopaj seçilirse 5.983,56 TL kesinti; 28.208,22 TL net faiz.",
      "Vade sonu toplam yaklaşık 1.028.208,22 TL. Form ekranı TL tutarını tam sayıya yuvarlayabilir."
    ],
    "result": "Oranın 32 gün sonra da aynı kalacağı varsayılmaz. Bir bölümüne faiz işlemeyen hesaplarda toplam bakiye yerine gerçekten faiz işleyecek anaparayı kullanın.",
    "checks": [
      "Yıllık brüt faiz ile net/aylık teklif ayrımını doğrulayın.",
      "Stopajı hesap açılış/yenileme tarihi ve vade için bankadan kontrol edin.",
      "Erken kapama, kampanya süresi ve faizsiz bakiye şartını okuyun."
    ],
    "sources": [
      {
        "label": "TCMB · Elektronik Veri Dağıtım Sistemi",
        "url": "https://evds3.tcmb.gov.tr/",
        "scope": "Seri adı, coğrafi kapsam, birim ve dönemi kaynaktan kontrol etmek için; banka teklifi değildir."
      },
      {
        "label": "GİB · Hazır Beyan rehberleri",
        "url": "https://intvrg.gib.gov.tr/hazirbeyan/pdflink.html",
        "scope": "Kira ve gayrimenkul elden çıkarma gelirinin beyanını ilgili gelir yılı rehberinden kontrol etmek için; kişiye özel vergi hesaplaması yapılmaz."
      }
    ]
  },
  "net-satis": {
    "intro": "Satış tutarından kalan borç ve girdiğiniz tüm satış giderleri TL olarak düşülür. Araç otomatik vergi, yasal oran veya satış garantisi üretmez.",
    "exampleTitle": "Örnek: satış bedeli elde kalan nakit değildir",
    "exampleSteps": [
      "5.000.000 TL satış bedeli; 1.200.000 TL kalan borç, 120.000 TL hizmet, 50.000 TL hazırlık, 30.000 TL taşınma ve 100.000 TL diğer gider.",
      "Toplam çıkış 1.500.000 TL; elde kalan yaklaşık net nakit 3.500.000 TL.",
      "Bu tutar yatırım kârı değildir; ilk alış bedeli ve geçmiş giderler bu modelde düşülmez."
    ],
    "result": "Diğer gider kalemine size ait harç, varsa ilgili gelir yılına göre hesaplanmış vergi ve borç kapama ek maliyetlerini yalnız bir kez ekleyin. Giderler satıştan yüksekse sonuç negatif olabilir.",
    "checks": [
      "Borç kapama tutarını planlanan gün için bankadan alın.",
      "Hizmet bedelini KDV ve taraf paylaşımıyla doğrulayın.",
      "Vergi yükümlülüğünü GİB rehberi ve kişisel durumunuzla kontrol edin."
    ],
    "sources": [
      {
        "label": "GİB · Hazır Beyan rehberleri",
        "url": "https://intvrg.gib.gov.tr/hazirbeyan/pdflink.html",
        "scope": "Kira ve gayrimenkul elden çıkarma gelirinin beyanını ilgili gelir yılı rehberinden kontrol etmek için; kişiye özel vergi hesaplaması yapılmaz."
      },
      {
        "label": "Ticaret Bakanlığı · Taşınmaz ticareti ve hizmet bedeli",
        "url": "https://afyon.ticaret.gov.tr/basvurular/tasinmaz-ticareti-yetki-belgesi-verilmesi",
        "scope": "Alım satıma aracılıkta toplam hizmet bedeli tavanı; taraf paylaşımı ile KDV ayrıca kontrol edilir."
      },
      {
        "label": "492 sayılı Harçlar Kanunu · (4) sayılı tarife",
        "url": "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.492.pdf",
        "scope": "Tapu işlemleri için özellikle 20/a; hesap örneği işlem gününün resmî tahakkuku değildir."
      }
    ]
  },
  "tcmb-ilan": {
    "intro": "İlanın birim fiyatını TCMB il göstergesiyle aynı alan türünde kıyaslar. İl göstergesinden sapma, mahalle emsali veya ekspertiz sonucu değildir.",
    "exampleTitle": "Örnek: brüt ve yaklaşık net kıyas aynı farkı göstermeli",
    "exampleSteps": [
      "Tamamen örnek veri: 5.000.000 TL ilan, 125 m² brüt ve 100 m² net. İlan fiyatı 40.000 TL/brüt m² ve 50.000 TL/net m².",
      "TCMB il göstergesini yalnız örnek olarak 32.000 TL/brüt m² alırsak brüt fark %25 olur.",
      "İlanın 125/100 = 1,25 katsayısıyla türetilen yaklaşık net gösterge 40.000 TL/net m²; net kıyas da %25 fark verir."
    ],
    "result": "32.000 TL burada canlı TCMB verisi değildir. Türetilen net karşılık TCMB’nin yayımladığı net seri değildir; aynı brüt kıyasın ilanın alan oranıyla ifadesidir. Brüt/net bilgisi eksikse tahminle tamamlamayın.",
    "checks": [
      "Şehir, veri dönemi ve TL/brüt m² birimini kontrol edin.",
      "İlandan aktarılan fiyat ve alanı yeniden okuyun.",
      "Kira göstergesinde birim doğrulanmadan alanla çarpım yapmayın.",
      "KFE endeks puanını bu hesapta TL/m² yerine kullanmayın."
    ],
    "sources": [
      {
        "label": "TCMB · KFE metaverisi",
        "url": "https://www.tcmb.gov.tr/wps/wcm/connect/b4628fa9-11a7-4426-aee6-dae67fc56200/KFE-Metaveri.pdf?MOD=AJPERES",
        "scope": "Endeksin kapsamı ve yöntemi; tek taşınmazın satış veya ekspertiz bedeli değildir."
      },
      {
        "label": "TCMB · Elektronik Veri Dağıtım Sistemi",
        "url": "https://evds3.tcmb.gov.tr/",
        "scope": "Seri adı, coğrafi kapsam, birim ve dönemi kaynaktan kontrol etmek için; banka teklifi değildir."
      },
      {
        "label": "TKGM · Kat irtifakı ve kat mülkiyeti genelgesi",
        "url": "https://www.tkgm.gov.tr/duyurular/kat-irtifaki-ve-kat-mulkiyeti-genelgesi",
        "scope": "Kat irtifakı/kat mülkiyeti işlemleri ve belge kapsamı; belediye proje dosyası ve fiilî uygunluk ayrıca incelenir."
      }
    ]
  },
  "tuik-karsilastir": {
    "intro": "TÜİK’in geçmiş dönem göstergelerini aynı süre ve ölçüyle karşılaştırır. Yüzdelik geçmiş getiriye girdiğiniz tutarın uygulanması kişisel hesap ekstresi değildir.",
    "exampleTitle": "Örnek: nominal tutar ile reel değer ayrı okunur",
    "exampleSteps": [
      "Varsayımsal nominal getiri %20 ise 100.000 TL için göstergeye göre nominal tutar 120.000 TL olur.",
      "Aynı dönem TÜFE artışı varsayımsal %25 ise reel değer 120.000 / 1,25 = 96.000 TL; reel fark −4.000 TL, oran −%4.",
      "TÜİK’in doğrudan yayımladığı reel oranı kullanıyorsanız tekrar enflasyon düşmeyin."
    ],
    "result": "TÜİK mevduat serisi brüttür; bankanızın stopaj sonrası net faiziyle aynı değildir. Altın, döviz ve piyasa göstergelerindeki alış/satış farkı ile kişisel işlem maliyetleri ayrıca dikkate alınır.",
    "checks": [
      "1/3/6/12 ay seçimini tüm araçlar için aynı tutun.",
      "Nominal, TÜFE ve Yİ-ÜFE sonuçlarını birbirinden ayırın.",
      "Konutunuzun kira dahil toplam getirisini bu tablonun parçası saymayın."
    ],
    "sources": [
      {
        "label": "TÜİK · Finansal yatırım araçları metaverisi",
        "url": "https://veriportali.tuik.gov.tr/tr/press/54170/metadata",
        "scope": "Geçmiş dönem brüt mevduat, BIST 100, külçe altın, dolar, euro ve DİBS için nominal/reel gösterge kapsamı; kişisel net portföy getirisi değildir."
      }
    ]
  },
  "altinla-konut": {
    "intro": "Altın birikiminin TL karşılığını il düzeyindeki konut birim fiyatına bölerek yaklaşık alan karşılığı verir. Bu alan satın alınabilir bir daire, net kullanım alanı veya kredi onayı değildir.",
    "exampleTitle": "Örnek: altın miktarından gösterge m² hesabına",
    "exampleSteps": [
      "250 saf gram ve varsayımsal 5.000 TL/gram = 1.250.000 TL referans değer.",
      "İl göstergesi yalnız örnek olarak 50.000 TL/brüt m² ise 1.250.000 / 50.000 = 25 brüt m² karşılık.",
      "İşlem giderleri ve altın alış/satış farkı bu 25 m² sonucuna dahil değildir."
    ],
    "result": "İl ortalaması mahalle ve bina fiyatı değildir. Gerçek bir ilan için toplam bedel, alan kaynağı, alım gideri ve altının net bozdurma teklifini birlikte doğrulayın.",
    "checks": [
      "Ürün adedi ile saf gram eşdeğerini karıştırmayın.",
      "Altın fiyatı ve il göstergesinin farklı tarihlere ait olabileceğini kontrol edin.",
      "Birimi TL/m² olmayan veya eksik veride alan sonucu üretmeyin."
    ],
    "sources": [
      {
        "label": "TCMB · KFE metaverisi",
        "url": "https://www.tcmb.gov.tr/wps/wcm/connect/b4628fa9-11a7-4426-aee6-dae67fc56200/KFE-Metaveri.pdf?MOD=AJPERES",
        "scope": "Endeksin kapsamı ve yöntemi; tek taşınmazın satış veya ekspertiz bedeli değildir."
      },
      {
        "label": "TCMB · Elektronik Veri Dağıtım Sistemi",
        "url": "https://evds3.tcmb.gov.tr/",
        "scope": "Seri adı, coğrafi kapsam, birim ve dönemi kaynaktan kontrol etmek için; banka teklifi değildir."
      }
    ]
  }
};
