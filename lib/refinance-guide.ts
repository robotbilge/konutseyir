export const refinanceGuide = {
  slug: 'konut-kredisi-yapilandirma-taksit-toplam-maliyet',
  title: 'Konut kredisini yapılandırmak ne zaman tasarruf sağlar?',
  summary: 'Düşük taksitin ne kadarının faiz indiriminden, ne kadarının vade uzamasından geldiğini üç ödeme planıyla karşılaştırın.',
  publishedAt: '2026-11-07',
  updatedAt: '2026-11-07',
  body: [
    'Banka daha düşük faiz ve taksit teklif ettiğinde önce kalan vadenizle aynı süreyi isteyin. Ardından uzatılmış vadenin bütçeyi ne kadar rahatlattığını ve bu rahatlığın toplam ödemeye etkisini ölçün. Aynı teklif, bir vadede tasarruf sağlarken başka bir vadede maliyeti artırabilir.'
  ]
} as const;

export const refinanceGuideSections = [
  {
    heading: 'Bugünden sonraki ödemeleri aynı tarihte karşılaştırın',
    paragraphs: [
      'Mevcut bankanızdan aynı gün için kalan taksit planını, bakiye anaparayı ve erken kapama dökümünü alın. Bakiye anapara, kapama tutarı ve kalan taksit toplamı üç farklı rakamdır. Kapama dökümünde işleyecek faiz ve varsa erken ödeme tazminatının ayrı satırlarda görünmesini isteyin.',
      'Yeni planı önce aynı kalan vadede, sonra aylık bütçenize uygun alternatif vadede alın. Eski borç yeni kredinin anaparasına dahilse eski kredinin kapama tutarını yeni taksitlerin üzerine tekrar eklemeyin. Başlangıçta cebinizden çıkan giderleri ve doğrulanmış iadeleri ayrıca yazın. Gider krediye eklenmişse etkisi zaten yeni taksitlere yansır.'
    ]
  },
  {
    heading: 'Aynı faizle iki yeni vade iki farklı sonuç veriyor',
    paragraphs: [
      'Örnek varsayımsaldır. Kalan anapara 1.000.000 TL, mevcut sabit aylık faiz yüzde 3 ve kalan vade 36 ay olsun. Yeni aylık sabit faiz yüzde 2,60. İki yeni seçenekte de başlangıçta ödenen net geçiş giderini 25.000 TL varsayalım. Kredi anaparası değişmiyor. Hesap eşit aylık taksit kullanıyor ve geçiş gideri dışında ek nakit akışı içermiyor. Rakamlar en yakın TL’ye yuvarlanmıştır.',
      'Mevcut planda aylık taksit yaklaşık 45.804 TL, kalan taksit toplamı 1.648.937 TL. Yeni kredide 36 ay seçilirse aylık taksit 43.112 TL olur. Geçiş gideri dahil toplam 1.577.014 TL ödenir. Yuvarlanmamış taksitler üzerinden hesaplanan tasarruf yaklaşık 71.922 TL’dir.',
      'Yeni kredide 48 ay seçilirse aylık taksit 36.707 TL’ye düşer. Buna karşılık geçiş gideri dahil toplam 1.786.949 TL’ye çıkar. Aylık ödeme yaklaşık 9.097 TL azalırken toplam ödeme mevcut plana göre yaklaşık 138.012 TL artar. Bu karşılaştırma nominal TL cinsindendir ve paranın zaman değerini hesaba katmaz.'
    ]
  },
  {
    heading: 'Evi yakında satacaksanız iki kredinin o günkü borcunu ekleyin',
    paragraphs: [
      '36 aylık yeni planda aylık ödeme yaklaşık 2.692 TL azalır. Başlangıçtaki 25.000 TL’yi yalnız taksit farkıyla telafi etmek, onuncu ödemeyi gerektirir. Bu, aylık bütçenin ne zaman toparlandığını gösterir. Erken satış kararında o gün kapatılması gereken borç da önemlidir.',
      'Örneğin 12. taksit sonrası satmayı düşünüyorsanız her seçenek için ilk 12 taksiti, cebinizden ödenen net geçiş giderini ve 12. taksit sonrası kapama tutarını toplayın. Kapama tahmini için ödeme planındaki bakiye anaparayı ve o tarihte uygulanabilecek tazminatı ayrı isteyin. Satış ayı belirsizse hesabı erken ve geç iki tarih için tekrarlayın.'
    ]
  },
  {
    heading: 'Bankadan alınacak belgelerle son hesabı yapın',
    paragraphs: [
      'Ticaret Bakanlığına göre erken ödeme tazminatı, sabit faizli konut kredisinde sözleşmede öngörülmüşse talep edilebilir. Kalan vade 36 ayı aşmıyorsa üst sınır erken ödenen anaparanın yüzde 1’i, aşıyorsa yüzde 2’sidir. Tazminat toplam indirim tutarını da aşamaz. Değişken faizli kredide erken ödeme tazminatı talep edilemez. Örnekteki 25.000 TL tüm geçiş giderleri için varsayımdır. Bankanın tazminat tarifesi olarak kullanılmaz.',
      'Yeniden finansman için onay vermeden önce bankanın karşılaştırmalı bilgilendirmesini ve iki ödeme planını alın. Sigorta iadesi varsa poliçe numarasını, iade tutarını ve ödeme tarihini yazılı teyit edin. Aynı vadeli teklif toplam ödemeyi düşürürken uzatılmış teklif yalnız aylık bütçenize uyuyorsa, bunun için ödeyeceğiniz farkı karar tablonuza yazın.'
    ]
  }
];

export const refinanceGuideEvidence = {
  takeaways: [
    'Faiz indiriminin etkisini görmek için önce aynı kalan vadeyi karşılaştırın.',
    'Satış ihtimali varsa karar tarihine kadarki taksitlere o günkü kapama borcunu ekleyin.'
  ],
  sources: [
    {
      label: 'Ticaret Bakanlığı · Konut finansmanı sözleşmeleri hakkında bilgilendirme',
      url: 'https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/konut-finansmani-sozlesmeleri-hakkinda-bilgilendirme',
      scope: '21 Ocak 2025 tarihli açıklama, 7 Kasım 2026 tarihinde kontrol edildi. Türkiye’de tüketici konut kredilerinde erken ödeme tazminatı ve kredi bağlantılı sigortanın durumu.'
    },
    {
      label: 'Ticaret Bakanlığı · Konut Finansmanı Sözleşmeleri Yönetmeliği',
      url: 'https://tuketici.ticaret.gov.tr/data/5e819a8e13b876a1b04c7a4a/Konut%20Finansman%C4%B1%20S%C3%B6zle%C5%9Fmeleri%20Y%C3%B6netmeli%C4%9Fi.pdf',
      scope: '7 Kasım 2026 kaynak kontrolü. 11. maddede erken ödeme, 12. maddede yeniden finansman ve onay öncesi karşılaştırmalı bilgilendirme. Örnekteki aylık oranlar ve TL tutarları varsayımsaldır.'
    }
  ]
};

export const refinanceGuideWorkbook = {
  question: 'Yeni teklif aynı kalan vadede ve evi satmayı düşündüğünüz ayda ne kadar ödeme gerektiriyor?',
  deliverable: 'Mevcut plan, aynı vadeli teklif ve uzatılmış teklif için aylık ödeme, toplam ödeme ve erken kapama çizelgesi.',
  rows: [
    {
      finding: 'Banka daha düşük taksit teklif ediyor.',
      evidence: 'Mevcut kalan vade, aynı vadeli yeni teklif ve alternatif vade.',
      action: 'Aylık taksiti ve vadeye kadar toplam ödemeyi ayrı sütunlarda karşılaştırın.'
    },
    {
      finding: 'Geçiş gideri tek toplam olarak verildi.',
      evidence: 'Kapama dökümü, yeni kredi giderleri ve doğrulanmış sigorta iadesi.',
      action: 'Peşin ödenen giderleri, krediye eklenen giderleri ve iadeleri ayırın.'
    },
    {
      finding: 'Kredi bitmeden evin satılması mümkün.',
      evidence: 'Olası satış ayları için iki planın bakiye anaparası ve kapama koşulları.',
      action: 'Her satış ayına kadar ödenen taksitlere kapama tutarını ve net geçiş giderini ekleyin.'
    }
  ]
};
