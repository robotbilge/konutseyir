export const daskBudgetGuide = {
  slug: 'dask-teminat-acigi-konut-butcesi',
  title: 'DASK poliçesi varken deprem sonrası nakit açığı nasıl hesaplanır?',
  summary: 'Poliçedeki bina teminatını yeniden yapım maliyetiyle karşılaştırın. Eşya ve geçici barınma için ayrı bir bütçe kurun.',
  publishedAt: '2026-11-05',
  updatedAt: '2026-11-05',
  body: [
    'Satın alacağınız evin DASK poliçesi geçerli olabilir ama poliçenin gösterdiği tutar, deprem sonrası ihtiyaç duyacağınız toplam para hakkında tek başına fikir vermez. Ev alırken bina hasarını, ev eşyasını ve geçici barınmayı ayrı hesaplayın. Ardından hangi giderin hangi poliçeden karşılanabileceğini ve ilk ay cebinizden ne çıkabileceğini görün.'
  ]
} as const;

export const daskBudgetGuideSections = [
  {
    heading: 'Poliçe tutarını satış fiyatıyla karşılaştırmayın',
    paragraphs: [
      'Satış bedeline arsa payı ve konum da yansır. DASK sigorta bedelinin hesabında arsa bedeli yer almaz. Bina için önce sigortacıyla doğruladığınız güncel poliçe bedelini, sonra bağımsız bölümünüz için aynı kapsamda hazırlanmış yeniden yapım maliyeti tahminini kaydedin. Ortak bölümler için hesaba giren payı iki kalemde birden saymamak için maliyet tahmininin kapsamını yazılı isteyin.',
      'DASK, poliçe sınırları içinde depremin ve deprem kaynaklı belirli olayların binada yol açtığı maddi zararları kapsar. Ev eşyası, geçici konaklama ve kira mahrumiyeti kapsam dışındadır. Ayrıca geçerli bir poliçenin varlığı, binanın deprem performansı hakkında teknik bir sonuç vermez. Poliçe incelemesini bina güvenliği incelemesinden ayrı yürütün.'
    ]
  },
  {
    heading: 'Örnek hesapta üç gideri ayrı toplayın',
    paragraphs: [
      'Tutarlar TL cinsinden varsayımsaldır. Bağımsız bölüm için yeniden yapım maliyeti 2.050.000 TL, güncel olduğu varsayılan DASK sigorta bedeli 1.400.000 TL olsun. İkisi arasındaki 650.000 TL fark, teminatın tamamı hesaba alınsa bile bina bütçesinde kalan farkı gösterir. Bu, hasar ödemesi tahmini değildir. Hasarın kapsamı, muafiyet ve hasar tarihindeki poliçe koşulları gerçek ödemeyi etkiler.',
      'Yenilenmesi gereken eşya için 180.000 TL ve altı ay geçici konaklama için aylık 28.000 TL varsayalım. Konaklama bütçesi 168.000 TL olur. Bu iki kalem için doğrulanmış ek teminat yoksa örnekte DASK dışında kalan bütçe 998.000 TL’ye ulaşır. Bu tutara nakliye, depozito ve diğer giderler dahil değildir. Evini kiraya veren malik için kira kaybı ayrı senaryodur. Kendi geçici konaklama gideriyle aynı zararmış gibi toplamayın.'
    ]
  },
  {
    heading: 'İlk ay gereken nakdi toplam hasar bütçesinden ayırın',
    paragraphs: [
      'Örnekte ilk ayın 28.000 TL kirasına iade edilebilir 28.000 TL depozito ve 12.000 TL taşınma gideri eklenirse taşınma anında 68.000 TL gerekir. Depozito ilk gün nakit çıkışıdır. Tam iade edilirse kalıcı maliyetin parçası olmaz. Altı aylık toplamda ilk ayın kirasını yeniden eklemeyin.',
      'Olası sigorta ödemesini taşınma gününün kullanılabilir nakdi olarak kabul etmeyin. Sigorta ödemesi hesaba geçmeden karşılamanız gereken giderleri toplayarak ilk ayın nakit ihtiyacını hesaplayın. Konaklama süresini altı aydan dokuza uzatarak ikinci bir hesap yapın. Aynı aylık kira varsayımıyla yalnız bu uzama bütçeye 84.000 TL ekler.'
    ]
  },
  {
    heading: 'Teklifleri primden önce teminat satırlarıyla karşılaştırın',
    paragraphs: [
      'Alım öncesi satıcıdan poliçeyi ve sigortacı teyidini isteyin. Adres, bağımsız bölüm bilgileri, metrekare beyanı, poliçe tarihleri ve tapu devrinde yapılacak güncellemeyi kontrol edin. DASK poliçesini yetkili kişinin e-Devlet üzerinden sorgulaması, eski bir belge üzerinden karar verme riskini azaltır.',
      'İsteğe bağlı konut sigortası teklifinde deprem nedeniyle oluşan bina farkı, eşya ve geçici konaklama için ayrı satır arayın. Her satırda limit, muafiyet, varsa gün sınırı ve ödemenin hangi belgeye bağlı olduğunu yazılı sorun. Örneğin konaklama için altı aylık bütçe kurduysanız teklifte 60 gün sınırı bulunması üçüncü aydan itibaren nakit ihtiyacı doğurabilir. Teklifin adı veya toplam primi bu farkı göstermez.'
    ]
  }
];

export const daskBudgetGuideEvidence = {
  takeaways: [
    'DASK sigorta bedelini aynı kapsamdaki yeniden yapım maliyetiyle kıyaslayın.',
    'Bina teminatı farkını, eşya giderini ve geçici barınma nakdini ayrı izleyin. Ek poliçedeki limit ve süreyi yazılı doğrulayın.'
  ],
  sources: [
    {
      label: 'DASK · Teminat ve kapsamı',
      url: 'https://www.dask.gov.tr/tr/teminat-ve-kapsami',
      scope: '5 Kasım 2026 kaynak kontrolü. Türkiye’de Zorunlu Deprem Sigortasının bina teminatı, kapsam dışı giderler ve sigorta bedelinin güncellenmesi. Rehberdeki TL tutarları varsayımsaldır.'
    },
    {
      label: 'DASK · Sıkça sorulan sorular',
      url: 'https://www.dask.gov.tr/tr/sikca-sorulan-sorular',
      scope: '5 Kasım 2026 kaynak kontrolü. Arsa bedelinin kapsamı ve ihtiyari deprem teminatı.'
    },
    {
      label: 'e-Devlet · DASK poliçe sorgulama',
      url: 'https://www.turkiye.gov.tr/dask-police-sorgulama',
      scope: '5 Kasım 2026 kaynak kontrolü. Kimlik doğrulamasıyla kullanılan poliçe sorgulama hizmeti.'
    }
  ]
};

export const daskBudgetGuideWorkbook = {
  question: 'Deprem sonrası hangi giderler poliçenizin dışında kalabilir ve ilk ay ne kadar nakit gerekir?',
  deliverable: 'Bina, eşya ve geçici konaklama için ayrı gider, teminat ve ödeme tarihi çizelgesi.',
  rows: [
    {
      finding: 'Satıcı geçerli bir poliçe gösterdi.',
      evidence: 'Güncel poliçe, taşınmaz bilgileri ve aynı kapsamda yeniden yapım maliyeti.',
      action: 'Poliçeyi ilgili daireyle eşleştirin ve bina teminatı farkını hesaplayın.'
    },
    {
      finding: 'Ek konut sigortası teklifinde tek bir toplam prim var.',
      evidence: 'Deprem ek teminatları, muafiyetler, konaklama gün sınırı ve ödeme belgeleri.',
      action: 'Eşya, bina farkı ve konaklamanın her biri için kalan gideri ayrı hesaplayın.'
    },
    {
      finding: 'Hasar ödemesinin tarihi bilinmiyor.',
      evidence: 'İlk ay kira, depozito ve taşınma teklifleri.',
      action: 'İlk ay nakit ihtiyacını henüz alınmamış tazminattan bağımsız yazın.'
    }
  ]
};
