export const duplicateListingGuide = {
  slug: 'ayni-daire-farkli-fiyat-ilan-eids-kontrolu',
  title: 'Aynı daire farklı fiyatlarla ilandaysa hangisini esas almalısınız?',
  summary: 'Tekrarlanan konut ilanlarını ayıklayın, geçerli fiyatı yazılı teyit edin ve EİDS doğrulamasının kapsamını öğrenin.',
  publishedAt: '2026-11-09',
  updatedAt: '2026-11-09',
  body: [
    'Aynı daireyi dört farklı fiyatla görüyorsanız önce tek bir satılık konutla mı, yoksa aynı binadaki benzer dairelerle mi karşı karşıya olduğunuzu belirleyin. Ardından güncel satış talebini yazılı teyit edin. Bu iki kontrol, hem eski ilan fiyatına göre teklif vermenizi hem de aynı daireyi birkaç kez sayıp çevredeki fiyatları yanlış okumanızı önler.'
  ]
} as const;

export const duplicateListingGuideSections = [
  {
    heading: 'Önce ilanları daireye göre gruplayın',
    paragraphs: [
      'İlan numarasını, platformu, görünen güncelleme tarihini, istenen bedeli ve ilan vereni bir listeye yazın. Aynı fotoğraf, kat ve plan eşleşmesi güçlü bir ipucudur. Bir projede farklı daireler için aynı örnek fotoğraf kullanılabileceğinden tek başına fotoğraf eşleşmesiyle ilanları birleştirmeyin.',
      'Görüşmede blok, kat, cephe ve bağımsız bölümün aynı olup olmadığını sorun. Balkon yönü, manzara, oda planı ve dairenin boş ya da kiracılı olması ayırıcı olabilir. Açık adres ve tapu bilgileri kamuya açık ilanda görünmüyorsa bunları işlem öncesinde güvenli bir kanaldan doğrulayın. Eşleşme belirsizse ilanı ayrı bir emsal olarak saymadan önce netleştirin.'
    ]
  },
  {
    heading: 'En düşük görünen bedelin hâlâ geçerli olduğunu sorun',
    paragraphs: [
      'Aynı daireye ait ilanlarda daha eski bir fiyat kalmış olabilir. Son güncellenen ilan da her zaman son talebi göstermez. İlan verene belirli ilan numarası üzerinden yazın. Dairenin hâlâ satışta olduğunu, hangi bedelin geçerli olduğunu, teklifin ne zamana kadar geçerli sayıldığını ve teslim koşulunu teyit edin.',
      'Örneğin 4.800.000 TL görünen ilan eski, satıcının yazılı olarak teyit ettiği güncel talep 4.900.000 TL olabilir. Bu durumda 100.000 TL fark, alım giderlerinden önce ortaya çıkar. Aracılık bedeli veya başka bir ödeme isteniyorsa tutarını, kimin ödeyeceğini ve fiyata dahil olup olmadığını ayrı sorun. Yazılı teyitte hangi dairenin ve hangi tarihin kastedildiği belli olsun.'
    ]
  },
  {
    heading: 'Yedi ilan, dört ayrı daire ve iki farklı medyan',
    paragraphs: [
      'Varsayımsal örnekte baktığınız daire 4.800.000, 4.850.000, 4.900.000 ve 4.950.000 TL ile dört kez listeleniyor. Aynı çevredeki üç ayrı, benzer dairenin güncel ilan talepleri 5.100.000, 5.250.000 ve 5.400.000 TL. Yedi ilanı birden sıralarsanız ortadaki değer 4.950.000 TL olur. Ancak bu hesapta tek bir daire örneklemin yarısından fazlasını oluşturur.',
      'İncelediğiniz dairenin ilanlarını emsal listesinden çıkarınca üç ayrı dairenin ortanca talebi 5.250.000 TL olur. İki sonuç arasındaki 300.000 TL, bu örnekte tekrar sayımından ve hedef dairenin emsal grubuna katılmasından kaynaklanır. İncelediğiniz dairenin teyitli talebini, 4.900.000 TL’yi, ayrı sütunda tutun. Böylece bir konutun talebini üç ayrı konutun ilan fiyatlarıyla karşılaştırırsınız.',
      'Bu fiyatlar örnek TL tutarlarıdır. Gerçekleşen satış verisi veya değerleme sonucu içermez. Gerçek incelemede emsal sayısını, gözlem tarihini ve alan, kat, bina yaşı, tadilat ile teslim durumu farklarını kaydedin. Üç dairelik bir örneklem mahalle geneline fiyat biçmek için yetersizdir.'
    ]
  },
  {
    heading: 'EİDS neyi doğrular, ödeme öncesi neyi kontrol edersiniz?',
    paragraphs: [
      'Ticaret Bakanlığının açıklamasına göre EİDS, ilan platformlarında kimlik ve ilan verme yetkisini doğrular. Malik, emlak işletmesine ilan yayımlama iznini e-Devlet üzerinden taşınmazı ve süreyi seçerek verebilir. Bu izin tapuda işlem yapma yetkisi vermez. Aracılık ve yetkilendirme belgeleri ayrıca düzenlenir.',
      'EİDS doğrulaması görseniz de güncel fiyatı, bağımsız bölümü ve işlem tarafını ayrıca doğrulayın. TKGM Parsel Sorgu ile taşınmazın parselini ve konumunu karşılaştırabilirsiniz. Belirli daireyi eşleştirmek için blok ve bağımsız bölüm bilgilerine, satış tarafını ve varsa kısıtları değerlendirmek için güncel tapu kayıtlarına bakın. Satıcı adına işlem yapan kişi varsa yetki belgesini ve kapsamını inceleyin.',
      'Kapora talep edilirse önce ödeme yapılacak kişi veya işletmenin işlemdeki rolünü belgeyle doğrulayın. Daire, tutar, ödemenin amacı, satışa mahsup ve iade koşulları yazılı hale gelmeden ödeme kararı vermeyin. Fiyatı veya yetkiyi açıklayamayan ilanları emsal tablosunda teyitsiz olarak işaretleyin.'
    ]
  }
];

export const duplicateListingGuideEvidence = {
  takeaways: [
    'İlan sayısı yerine doğruladığınız ayrı daire sayısını kaydedin.',
    'Güncel satış talebini yazılı teyit edin ve ilan verme izniyle satış yetkisini ayrı kontrol edin.'
  ],
  sources: [
    {
      label: 'Ticaret Bakanlığı · EİDS yetki doğrulama uygulaması',
      url: 'https://icticaret.ticaret.gov.tr/haberler/elektronik-ilan-dogrulama-sistemi-eids-yetki-dogrulama-uygulamasi-hayata-gecirildi',
      scope: '16 Eylül 2024 tarihli açıklama. Taşınmaz ilanı verme izninin kapsamı ve aracılık belgelerinden farkı.'
    },
    {
      label: 'Ticaret Bakanlığı · İlan platformlarında EİDS doğrulaması',
      url: 'https://dabm.ticaret.gov.tr/haberler/ticaret-bakanligi-sosyal-medyadaki-sahte-ilanlara-gecit-vermiyor-eids-kurallarina-aykiri-paylasimlara-karsi-yaptirimlar-kararlilikla-uygulaniyor',
      scope: '13 Haziran 2026 tarihli açıklama. Türkiye’de ilan platformlarındaki taşınmaz ilanlarında kimlik ve yetki doğrulamasının kapsamı.'
    },
    {
      label: 'e-Devlet · EİDS Taşınmaz İlanı Yayınlama İzni İşlemleri',
      url: 'https://www.turkiye.gov.tr/ticaret-eids-tasinmaz-ilani-yetkilendirme-islemleri',
      scope: '9 Kasım 2026 kaynak kontrolü. Malik için ilan yayımlama izni işlemleri.'
    },
    {
      label: 'TKGM · Parsel Sorgulama',
      url: 'https://www.tkgm.gov.tr/e-hizmetler/sik-kullanilanlar/parsel-sorgulama',
      scope: '9 Kasım 2026 kaynak kontrolü. Parselin coğrafi konumu ve temel kadastro bilgileri.'
    }
  ]
};

export const duplicateListingGuideWorkbook = {
  question: 'Kaç ayrı daire var ve baktığınız dairenin teyitli satış talebi nedir?',
  deliverable: 'Tekrarları ayrılmış emsal listesi, tarihli fiyat teyidi ve ödeme öncesi belge kontrolü.',
  rows: [
    {
      finding: 'Aynı fotoğraf birkaç ilanda görünüyor.',
      evidence: 'İlan numaraları, blok, kat, cephe, plan ve bağımsız bölüm.',
      action: 'Eşleşmeyi doğrulayın. Aynı daireye ait kayıtları tek satırda gruplayın.'
    },
    {
      finding: 'Aynı daire için iki farklı bedel var.',
      evidence: 'Daireyi tanımlayan güncel yazılı teklif, geçerlilik tarihi ve masraflar.',
      action: 'Bütçeye teyitli bedeli girin. Daireyi kendi emsal hesabınızdan çıkarın.'
    },
    {
      finding: 'İlan doğrulanmış ve kapora isteniyor.',
      evidence: 'Güncel tapu bilgisi, işlem tarafının yetkisi ve yazılı ödeme koşulları.',
      action: 'İlan verme izninden ayrı olarak işlem yetkisini ve ödeme muhatabını doğrulayın.'
    }
  ]
};
