export const homeSaleTaxGuide = {
  slug: 'ev-satisinda-deger-artisi-kazanci',
  title: 'Ev satışında değer artışı kazancı nasıl hesaplanır?',
  summary: 'Beş yıllık süreyi, Yİ-ÜFE ile alış bedelinin güncellenmesini ve 2026 istisnasını iki satış teklifi üzerinden hesaplayın.',
  publishedAt: '2026-11-08',
  updatedAt: '2026-11-08',
  body: [
    'Beş yıl dolmadan satacağınız ev için teklif aldığınızda önce iki tutar çıkarın. Biri satıştan elinize geçecek nakit, diğeri gelir vergisi hesabına girebilecek kazanç. İlki yeni evin peşinatını planlamak için, ikincisi satış sonrası vergiye pay ayırmanız gerekip gerekmediğini görmek için kullanılır.'
  ]
} as const;

export const homeSaleTaxGuideSections = [
  {
    heading: 'Beş yılı hangi tarihten sayacağınızı belirleyin',
    paragraphs: [
      'Bedel ödeyerek aldığı konutu beş yıl içinde satan gerçek kişinin kazancı, işlem ticari faaliyet kapsamında değilse değer artışı kazancı olarak değerlendirilir. Süre genellikle tapu tescilinden başlar ve takvim yılı sayarak değil, gün hesabıyla belirlenir. Örneğin 14 Aralık 2021’de tescil edilen bir evin 8 Kasım 2026’da satışı bu sürenin içindedir. Sınır güne denk gelen satışlarda iktisap tarihini ve işlemin planlanan gününü GİB ile teyit edin.',
      'Miras veya bağış gibi bedelsiz edinimler bu değer artışı kazancı kuralının dışındadır. TOKİ veya kooperatiften alınan ev tescilden önce fiilen kullanıma bırakılmışsa GİB, belirli durumlarda belgelenmiş fiilî kullanım tarihini esas alabilir. Tapu ve teslim tutanağını, varsa o tarihteki kullanım belgelerini birlikte inceleyin. Düzenli satışlar ticari kazanç yönünden ayrıca değerlendirilir.'
    ]
  },
  {
    heading: 'Alış ve satış ayından önceki iki endeks düzeyini alın',
    paragraphs: [
      'Alıştan önceki ay ile satıştan önceki ayın Türkiye geneli Yİ-ÜFE düzeylerini aynı seriden alın. Satışa esas endeksi alışa esas endekse bölün. Oran en az 1,10 ise alış bedelini bu oranla çarpın. Artış yüzde 10’un altında kalırsa belgeli alış bedelini kullanın.',
      'Endeks, TÜİK’in ülke içinde üretilip yurt içinde satılan ürünlere ilişkin üretici fiyat serisidir. Hesapta kullanılan iki sayı endeks puanıdır. Örneğin satış ayı ocak ise bir önceki yılın aralık düzeyi kullanılır. TÜFE, konut fiyat endeksi ve aylık yüzde değişim bu hesabın girdileri arasında yer almaz.'
    ]
  },
  {
    heading: 'İki teklif arasındaki farkı örnekle görün',
    paragraphs: [
      '20 Mayıs 2024’te 3.500.000 TL’ye alınan bir ev için 22 Ocak 2026’da iki satış seçeneği olduğunu varsayalım. TÜİK’in GİB rehberinde yer alan tarihsel serisinde Nisan 2024 Yİ-ÜFE düzeyi 3.369,98, Aralık 2025 düzeyi 4.783,04 puandır (2003=100). İki dönem arasındaki artış yüzde 41,93. Bu oranla endekslenen alış bedeli yaklaşık 4.967.578 TL olur. Satıcının üzerinde kalan, belgeli ve indirime uygun satış gideri ve harçların toplamı her iki teklifte de 100.000 TL varsayılmıştır.',
      '5.200.000 TL’lik teklifte safi kazanç yaklaşık 132.422 TL olur. Bu tutar 2026 için geçerli 150.000 TL yıllık istisnanın altında kalır. Aynı yıl istisnayı paylaşan başka kazanç yoksa örnekteki satış tek başına bu kalemde beyan doğurmaz.',
      '5.400.000 TL’lik teklifte safi kazanç yaklaşık 332.422 TL olur. Aynı varsayımla istisna düşüldüğünde yaklaşık 182.422 TL kalır. Bu tutar gelir vergisi hesabına girecek kazançtır. Ödenecek vergi, beyana tabi gelirler ve uygulanacak tarife dikkate alınarak hesaplanır. TL tutarları en yakın liraya yuvarlanmıştır.'
    ]
  },
  {
    heading: 'Pazarlıkta kullanacağınız sınırı hesaplayın',
    paragraphs: [
      'Belgeli giderleri ve kullanılabilir yıllık istisnayı endekslenmiş alış bedeline ekleyin. Örnekte giderlerin 100.000 TL’de kaldığı durumda istisnaya karşılık gelen satış fiyatı yaklaşık 5.217.578 TL’dir. Daha yüksek bir teklif geldiğinde farkı doğrudan ödenecek vergi gibi bütçenizden düşmeyin. Hazır Beyan hesabıyla vergi tutarını ayrıca kontrol edin.',
      'Satış fiyatına bağlı komisyon veya harç değişiyorsa her teklif için gider satırını yeniden hesaplayın. Satış tarihi başka aya kayarsa kullanılacak endeks ayı da kayar. Yıl değişirse yeni satış yılı için geçerli istisna tutarını kontrol edin. Yeni evin peşinatı için kullanabileceğiniz nakdi çıkarırken varsa kalan kredi kapama borcunu ve tahmini vergiyi ayrı satırlara alın.'
    ]
  },
  {
    heading: 'Tapudan önce hazırlayacağınız belgeler',
    paragraphs: [
      'Alış tapusu ve bedel belgesiyle başlayın. Gerçek satış bedelini, işlem gününü ve satıcıya ait belgeli giderleri aynı çizelgede tutun. Satış bedelindeki varsayım değiştikçe çizelgeyi güncelleyin.',
      'Bedelsiz edinim, tescilden önce teslim, birden fazla satış veya ticari faaliyet ihtimali varsa hesabı kesinleştirmeden önce vergi dairesi ya da mali müşavirle işlem belgeleri üzerinden değerlendirin. Beyan gerekiyorsa satış yılını izleyen yılın takvimini GİB’den kontrol edin.'
    ]
  }
];

export const homeSaleTaxGuideEvidence = {
  takeaways: [
    'Önce iktisap tarihini ve beş yıllık süreyi doğrulayın.',
    'İki teklif için safi kazancı ve satıştan elinize geçecek nakdi ayrı hesaplayın.'
  ],
  sources: [
    {
      label: 'GİB · Gayrimenkullerin 5 Yıl İçinde Elden Çıkarılmasında Gelir Vergisi Beyanı Rehberi',
      url: 'https://cdn.gib.gov.tr/api/gibportal-file/file/getFileResources?objectKey=arsiv%2Ffileadmin%2Fbeyannamerehberi%2F2026%2F2026_gayrimenkullerin_elden_cikarilmasi.pdf',
      scope: 'Şubat 2026 yayını, 8 Kasım 2026 kaynak kontrolü. İktisap tarihi, yüzde 10 endeksleme koşulu, 2026 için 150.000 TL istisna ve TÜİK tarihsel serisindeki Nisan 2024 ile Aralık 2025 Yİ-ÜFE düzeyleri.'
    },
    {
      label: 'TÜİK · Yurt İçi Üretici Fiyat Endeksi ve tarihsel seri',
      url: 'https://data.tuik.gov.tr/Bulten/Index?p=Domestic-Producer-Price-Index-February-2024-53687',
      scope: '4 Mart 2024 tarihli bültenin metaveri ve tarihsel seri bölümü. Türkiye geneli aylık üretici fiyat endeksi, 2003=100. Örnekte kullanılan iki dönemin düzeyleri GİB rehberindeki tarihsel tablodan alınmıştır.'
    },
    {
      label: 'GİB Hazır Beyan · Değer Artışı Kazancı Hesaplama',
      url: 'https://intvrg.gib.gov.tr/hazirbeyan/artisHesapla.html',
      scope: '8 Kasım 2026 kaynak kontrolü. Alış ve satış tarihleri, TL cinsinden bedeller ve giderler girilerek beyan durumunun ön kontrolü.'
    }
  ]
};

export const homeSaleTaxGuideWorkbook = {
  question: 'Satış teklifiniz ve işlem tarihiniz gelir vergisi hesabını nasıl değiştiriyor?',
  deliverable: 'Alış belgesi, iki endeks ayı, belgeli satış giderleri ve teklif başına safi kazancı gösteren bir çizelge.',
  rows: [
    {
      finding: 'Satış beş yıllık sürenin sonuna yakın.',
      evidence: 'Tapu tescili, gerekiyorsa fiilî kullanım belgeleri ve planlanan satış günü.',
      action: 'Süre hesabında kullanılacak tarihi doğrulayın.'
    },
    {
      finding: 'Satış teklifi yenilendi.',
      evidence: 'Yazılı teklif ile satıcıya düşen belgeli harç ve giderler.',
      action: 'Endekslenmiş maliyeti ve giderleri düşüp kalan tutarı yıllık istisnayla karşılaştırın.'
    },
    {
      finding: 'Satış geliri yeni evin peşinatına ayrılacak.',
      evidence: 'Kredi kapama dökümü, masraf belgeleri ve tahmini vergi.',
      action: 'Tapu günü kullanabileceğiniz nakdi ve sonraki ödemeler için ayıracağınız tutarı ayrı yazın.'
    }
  ]
};
