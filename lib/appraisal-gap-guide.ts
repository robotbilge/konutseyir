export const appraisalGapGuide = {
  slug: 'ekspertiz-dusuk-cikarsa-pesinat-acigi',
  title: 'Konut ekspertizi düşük çıkarsa peşinat açığı nasıl hesaplanır?',
  summary: 'Satış fiyatı, ekspertiz değeri ve banka teklifini ayrı okuyun. Kapora öncesinde ne kadar ek nakit gerekebileceğini hesaplayın.',
  publishedAt: '2026-11-04',
  updatedAt: '2026-11-04',
  body: [
    'Satıcı 4,8 milyon TL istiyor ve siz 3,8 milyon TL krediye güveniyorsunuz. Banka evi 4,2 milyon TL değerinde kabul ederse, satış fiyatı ve faiz teklifi aynı kalsa bile peşinat ihtiyacınız artabilir. Bu rehber, farkı kapora vermeden önce bir nakit sınırına çevirmek için dört adım sunuyor.'
  ]
} as const;

export const appraisalGapGuideSections = [
  {
    heading: 'Satış fiyatını, teminat değerini ve banka teklifini ayrı yazın',
    paragraphs: [
      'Satış fiyatı satıcıyla anlaştığınız bedeldir. Teminat değeri, bankanın kredi hesabında esas aldığı konut değeridir. Bankanın yazılı kredi tutarı ise değerleme, gelir ve diğer değerlendirmeler sonucunda kullanabileceğiniz tutarı gösterir. Ön görüşmede söylenen tutarı, ekspertiz sonrası yazılı teyit gelene kadar bütçede bir senaryo olarak tutun.',
      'BDDK’nın 29 Ocak 2026 tarihli 11364 sayılı kararı, kredi tavanını teminat değerinin dilimine ve Enerji Kimlik Belgesi sınıfına bağlar. Teminat değeri 5 milyon TL ve altında olan C sınıfı konutta tabloda yüzde 80 oranı yer alır. Aynı karar, 10656 sayılı karardaki konut sahipliği hükümlerinin uygulanmaya devam ettiğini belirtir. Kendinizin, eşinizin veya 18 yaş altındaki çocuklarınızın konut sahipliği varsa banka ile dosyanıza uygulanan oranı ve istisnaları teyit edin.'
    ]
  },
  {
    heading: 'Örnek hesapta nakit açığı nasıl oluşuyor?',
    paragraphs: [
      'Aşağıdaki tutarlar TL cinsinden varsayımsaldır. Satış fiyatı 4.800.000 TL, alıcının ayırdığı işlem gideri 120.000 TL ve kapora öncesi kullanılabilir nakdi 1.350.000 TL olsun. C sınıfı bir ev ve konut sahipliği nedeniyle oran indirimi uygulanmayan bir başvuru varsayalım. Satışı tamamlamak için toplam 4.920.000 TL gerekir. İşlemin bütçeye sığması için gereken kredi en az 3.570.000 TL’dir.',
      'Satış fiyatını teminat değeri olarak varsayarsanız yüzde 80 üzerinden 3.840.000 TL tavan ve 270.000 TL nakit payı görürsünüz. Bankanın esas aldığı teminat değeri 4.200.000 TL olursa tavan 3.360.000 TL’ye iner. Tavanın tamamı kullanılsa bile nakit ihtiyacı 1.560.000 TL, açık 210.000 TL olur.',
      'Banka değerlendirme sonunda 3.200.000 TL kredi teklif ederse nakit ihtiyacı 1.720.000 TL’ye ve açık 370.000 TL’ye çıkar. Aradaki 160.000 TL, düzenleyici tavan ile banka teklifinin farkıdır. 120.000 TL gider, bir resmî tarife veya piyasa ortalaması yerine örnek bütçe girdisidir.'
    ]
  },
  {
    heading: 'Teklif sınırını ve ekspertiz eşiğini geriye doğru hesaplayın',
    paragraphs: [
      'Yazılı kredi 3.200.000 TL’de, kullanılabilir nakit 1.350.000 TL’de ve gider 120.000 TL’de kalırsa satış bedeli için üst sınır 4.430.000 TL’dir. Hesap, kullanılabilir nakit ile krediyi toplayıp giderleri düşer. Bu tutar evin değerine dair bir görüş yerine, mevcut finansmanla tamamlayabileceğiniz alış fiyatını gösterir. Gider veya kredi tutarı değişirse sınırı tekrar hesaplayın.',
      'Diğer yönden, 4.800.000 TL satış fiyatını koruyabilmek için gereken 3.570.000 TL krediyi yüzde 80’e bölün. Sonuç 4.462.500 TL asgari teminat değeridir. Bu eşik yalnızca aynı oran dilimi ve aynı başvuru koşulları geçerliyken işe yarar. Ekspertiz bu eşiği geçse bile bankadan gereken tutarın kullandırılacağına ilişkin yazılı teyit alın.'
    ]
  },
  {
    heading: 'Kapora öncesinde üç belgeyi ve iki eşiği netleştirin',
    paragraphs: [
      'Değerleme raporunda tarih ve bağımsız bölüm bilgilerini, Enerji Kimlik Belgesi’nde ilgili bina ve sınıf bilgisini, bankanın yazılı teklifinde net kullanıma hazır tutarı ve geçerlilik süresini kontrol edin. Ticaret Bakanlığının yayımladığı yönetmelikteki sözleşme öncesi bilgi formunda kredi tutarı, ücretler ve ekspertiz koşulları yer alır. Konuta ilişkin ekspertiz raporunun bir örneğini bankadan talep edin.',
      'Kapora metninde banka kredisinin hangi asgari tutarın altında kalması hâlinde ne olacağını ve son belge teslim tarihini yazılı netleştirin. Kredi reddi ile kredinin yetersiz kalmasını ayrı ele alın. Ödenmiş ve fiyata mahsup edilecek kaporayı tapu günü bakiyesinden düşerken, o ödemeden sonra kalan nakdi kullanın. Böylece kaporayı aynı hesapta iki kez düşmezsiniz.'
    ]
  }
];

export const appraisalGapGuideEvidence = {
  takeaways: [
    'İşlem giderlerini ekleyin ve kullanılabilir nakdi düşün. Kalan tutar, alımı tamamlamak için gereken en düşük kredidir.',
    'BDDK tavanı ile bankanın yazılı kredi teklifini ayrı tutun. Kapora kararını, gerekli tutar ve son teyit tarihi üzerinden değerlendirin.'
  ],
  sources: [
    {
      label: 'BDDK · 29 Ocak 2026 tarihli 11364 sayılı Kurul Kararı',
      url: 'https://www.bddk.org.tr/Mevzuat/DokumanGetir/1327',
      scope: '4 Kasım 2026 kaynak kontrolü. Türkiye’de tüketici konut kredileri ve kapsamdaki konut teminatlı krediler için teminat değeri dilimleri (TL) ve Enerji Kimlik Belgesi sınıfına göre azami oranlar (%).'
    },
    {
      label: 'BDDK · 24 Ağustos 2023 tarihli 10656 sayılı Kurul Kararı',
      url: 'https://www.bddk.org.tr/Mevzuat/DokumanGetir/1191',
      scope: '4 Kasım 2026 kaynak kontrolü. Konut sahipliğinin kredi/değer sınırına etkisi ve karar kapsamındaki istisnalar.'
    },
    {
      label: 'Ticaret Bakanlığı · Konut Finansmanı Sözleşmeleri Yönetmeliği',
      url: 'https://tuketici.ticaret.gov.tr/data/5e819a8e13b876a1b04c7a4a/Konut%20Finansman%C4%B1%20S%C3%B6zle%C5%9Fmeleri%20Y%C3%B6netmeli%C4%9Fi.pdf',
      scope: '4 Kasım 2026 kaynak kontrolü. Sözleşme öncesi bilgi formunun içeriği ve konuta ilişkin ekspertiz raporunun örneğini isteme hakkı.'
    }
  ]
};

export const appraisalGapGuideWorkbook = {
  question: 'Ekspertiz beklediğinizden düşük gelirse hangi kredi tutarında satış bütçeniz açık verir?',
  deliverable: 'Gerekli asgari kredi, azami satış bedeli ve kapora için son teyit tarihini içeren alım çizelgesi.',
  rows: [
    {
      finding: 'Bütçe, ilandaki satış fiyatına oran uygulanarak kuruldu.',
      evidence: 'Banka değerleme raporu, Enerji Kimlik Belgesi ve bankanın uyguladığı oran.',
      action: 'Teminat tavanını yeniden hesaplayın ve bankanın yazılı teklifinden ayrı kaydedin.'
    },
    {
      finding: 'Banka teklifi, alımı tamamlamak için gereken kredinin altında.',
      evidence: 'Yazılı kredi tutarı, kullanılabilir nakit ve alıcıya ait belgeli işlem giderleri.',
      action: 'Nakit açığını ve aynı koşullarda karşılanabilecek azami satış bedelini hesaplayın.'
    },
    {
      finding: 'Kapora isteniyor ancak ekspertiz veya kredi tutarı kesinleşmedi.',
      evidence: 'Kapora metni, gereken asgari kredi ve bankanın son teyit tarihi.',
      action: 'Yetersiz kredi ve kredi reddi hâlinde uygulanacak koşulları ayrı yazın.'
    }
  ]
};
