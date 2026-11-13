export const mortgagedHomeGuide = {
  slug: 'ipotekli-ev-alirken-borc-kapama-tapu',
  title: 'İpotekli ev alırken banka borcu ve tapu devri nasıl planlanır?',
  summary: 'Banka kapama tutarını doğrulayın, satış bedelini bankaya ve satıcıya ayrılan tutarlarla eşleştirin, ipoteğin terkinini kontrol edin.',
  publishedAt: '2026-11-13',
  updatedAt: '2026-11-13',
  body: [
    'İpotekli bir konut için fiyat üzerinde anlaştığınızda üç bilgiyi yan yana koyun. Tapuda hangi ipotek kayıtlı, banka satış günü borcu hangi tutarla kapatacak ve terkin hangi aşamada tapuya işlenecek? Bu üç bilgi ödeme sırasını belirler. Özellikle satış bedelinin bir kısmıyla satıcının kredisi kapatılacaksa bankaya giden tutarı ve satıcıya kalan bakiyeyi önceden yazılı olarak eşleştirin.'
  ]
} as const;

export const mortgagedHomeGuideSections = [
  {
    heading: 'Tapudaki ipotek ile bankanın kapama tutarını eşleştirin',
    paragraphs: [
      'Satıcıyla birlikte güncel tapu kaydından ada, parsel, bağımsız bölüm ve ipotek alacaklısını kontrol edin. Birden fazla ipotek veya başka kısıtlayıcı kayıt varsa her birinin alacaklısını, kapsamını ve kaldırılma koşulunu ayrı yazın. Bankadan, satıcının katılımı veya yetkilendirmesiyle, işlem gününe ait yazılı kapama tutarını isteyin. Tapuda yer alan ipotek tutarı üzerinden güncel borç hesabı yapmayın.',
      'Kapama belgesinde tutarın hangi tarihe kadar geçerli olduğunu, ödeme hesabını ve açıklamasını, varsa işlemiş faiz veya erken ödeme tazminatını ve kapama sonrası hangi ipotek için terkin talebi gönderileceğini kontrol edin. Tüketici konut finansmanında sabit faizli sözleşmede hüküm varsa erken ödeme tazminatı gündeme gelebilir. Bankanın yazılı toplamında yer alan bir kalemi bütçeye ikinci kez eklemeyin.'
    ]
  },
  {
    heading: 'Satış bedelini iki ödeme kalemiyle kontrol edin',
    paragraphs: [
      'Varsayımsal satış bedeli 4.500.000 TL. Bankanın işlem günü için verdiği toplam kapama tutarı 1.180.000 TL. Taraflar ve banka, bu tutarın satış bedelinden doğrudan bankaya ödeneceği planı kabul ederse satıcı bakiyesi 4.500.000 − 1.180.000 = 3.320.000 TL olur. Bu örnekte alıcı ayrıca 95.000 TL işlem gideri öngörüyorsa toplam bütçesi 4.595.000 TL’dir. Gider tutarı örnek varsayımdır.',
      'Randevu ertelenir ve yeni kapama tutarı 1.195.000 TL olursa sabit satış bedelinde satıcıya kalan tutar 3.305.000 TL’ye iner. Eski ödeme talimatındaki 3.320.000 TL aynen kullanılırsa banka ve satıcıya giden toplam 4.515.000 TL olur. Yeni banka belgesi geldiğinde iki ödeme kalemini birlikte güncelleyin.',
      'Kapama tutarı satış bedelini aşarsa satıcının farkı hangi kaynaktan ve ne zaman karşılayacağını yazılı teyit edin. Örneğin 4.560.000 TL kapama tutarı ile 4.500.000 TL satış bedeli arasında 60.000 TL açık vardır. Banka farklı bir çözümü yazılı olarak kabul etmedikçe bu açık giderilmeden kapama planını tamamlanmış saymayın.'
    ]
  },
  {
    heading: 'Paranın çıkışı ile tescilin sırasını belirleyin',
    paragraphs: [
      'Satıcı kendi nakdiyle borcu kapatabiliyorsa güncel kayıtta terkin görüldükten sonra satışa geçmeyi planlayabilirsiniz. Kapama satış bedeline bağlıysa bankanın, tarafların ve varsa alıcının kredi bankasının kabul ettiği ödeme ve tescil sırasını yazılı olarak netleştirin. Alıcıdan tescil öncesi bankaya ödeme isteniyorsa, satış iptal edildiğinde bankaya giden tutarın iadesinden kimin sorumlu olacağını ve iade şartını ödeme öncesinde belirleyin.',
      'TKGM’nin Güvenilir Hesap açıklamasına göre sistemde bloke edilen bedel tescil tamamlandığında satıcının hesabına aktarılır. Bankaya satış öncesi yapılacak borç kapama ödemesinin bu akışa nasıl dahil edileceğini ayrıca doğrulayın. Bankaya ve satıcıya yapılacak ödemelerin hangi belge veya aşamaya bağlandığını, hesaba yatırılacak tutarı ve randevu ertelenirse uygulanacak adımı tek sayfaya yazın.'
    ]
  },
  {
    heading: 'Kapama dekontundan sonra tapu kaydını yeniden kontrol edin',
    paragraphs: [
      'Türk Medeni Kanunu’nun 883. maddesine göre alacak sona erince taşınmaz maliki alacaklıdan ipoteğin terkinini isteyebilir. TKGM’nin e-Terkin açıklamasında, alacaklı kurumun elektronik terkin talebinin sisteme iletilmesi ve işlem tamamlanınca güncel kayıt alınması ayrı adımlardır. Banka dekontu, terkin talebinin referansı ve güncel tapu kaydı işlem dosyasında ayrı yer alsın.',
      'Kanunun 888. maddesi uyarınca aksi kararlaştırılmadıkça ipotekli taşınmazın devri borçlunun sorumluluğunu ve güvenceyi değiştirmez. Tapu devri gerçekleştiğinde eski ipoteğin sicilden silinip silinmediğini bağımsız bölümün güncel kaydından kontrol edin. Alıcı kredili alıyorsa eski ipotek ile kendi bankasının yeni ipoteğini alacaklı ve kayıt bilgilerine göre ayırt edin.'
    ]
  }
];

export const mortgagedHomeGuideEvidence = {
  takeaways: [
    'İşlem gününün banka kapama tutarı değiştiğinde satıcıya ödenecek bakiyeyi de güncelleyin.',
    'Banka kapaması, elektronik terkin talebi ve güncel tapu kaydı için ayrı belgeler alın.'
  ],
  sources: [
    {
      label: 'Adalet Bakanlığı · Türk Medeni Kanunu',
      url: 'https://mevzuat.adalet.gov.tr/mevzuat/103249',
      scope: '8 Aralık 2001 tarihli Resmî Gazete. Türkiye’de ipoteğin terkini ve ipotekli taşınmaz devrinin etkisi için 883 ve 888. maddeler.'
    },
    {
      label: 'TKGM · E-Terkin',
      url: 'https://www.tkgm.gov.tr/e-hizmetler/diger-hizmetler/e-terkin',
      scope: '13 Kasım 2026 kaynak kontrolü. Elektronik terkin talebi ve güncel tapu kaydının alınması.'
    },
    {
      label: 'TKGM · Güvenilir Hesap',
      url: 'https://www.tkgm.gov.tr/e-hizmetler/diger-hizmetler/guvenilir-hesap',
      scope: '13 Kasım 2026 kaynak kontrolü. Bloke satış bedelinin tescil sonrasında satıcıya aktarılması.'
    },
    {
      label: 'Ticaret Bakanlığı · Konut finansmanı sözleşmeleri',
      url: 'https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/konut-finansmani-sozlesmeleri-hakkinda-bilgilendirme',
      scope: '13 Kasım 2026 kaynak kontrolü. Tüketici konut finansmanında erken ödeme ve tazminat koşulları.'
    }
  ]
};

export const mortgagedHomeGuideWorkbook = {
  question: 'Satış günü hangi tutar kime ödenecek ve eski ipoteğin silindiğini hangi kayıt gösterecek?',
  deliverable: 'Geçerli kapama tutarı, yazılı ödeme sırası ve güncel tapu kaydından oluşan işlem dosyası.',
  rows: [
    {
      finding: 'Tapuda banka ipoteği görünüyor.',
      evidence: 'Güncel tapu kaydı, bağımsız bölüm bilgisi ve tarihli banka kapama belgesi.',
      action: 'Alacaklı ile ipotek kaydını eşleştirin. Kapama tutarının son geçerlilik tarihini kaydedin.'
    },
    {
      finding: 'Borcun bir kısmı satış bedelinden kapatılacak.',
      evidence: 'Bankanın yazılı talimatı, satış bedeli, satıcı bakiyesi ve iptal halinde iade koşulu.',
      action: 'Ödeme kalemlerini toplayın. Toplamı satış bedeliyle karşılaştırın ve gecikme halinde ikisini birlikte güncelleyin.'
    },
    {
      finding: 'Banka kredinin kapandığını bildirdi.',
      evidence: 'Ödeme dekontu, bankanın terkin talebi ve işlem sonrası güncel tapu kaydı.',
      action: 'Eski ipoteğin kayıttan silindiğini bağımsız bölüm bilgileri üzerinden doğrulayın.'
    }
  ]
};
