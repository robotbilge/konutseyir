export const rentalExpenseGuide = {
  slug: 'konut-kira-geliri-gercek-gider-goturu-gider',
  title: 'Konut kira gelirinde gerçek gider mi, götürü gider mi?',
  summary: '2026 konut kirası için gider eşiğini hesaplayın. İstisnayı, kabul edilen belgeli giderleri ve kredi faizini doğru ayırın.',
  publishedAt: '2026-11-12',
  updatedAt: '2026-11-12',
  body: [
    '2026’da 348.000 TL konut kirası tahsil ettiyseniz ve mesken istisnasından yararlanabiliyorsanız, örnek hesapta götürü gider indirimi 43.500 TL olur. Gerçek gider yönteminin bu indirimi geçmesi için istisna payı ayrılmadan önceki uygun giderlerinizin 52.200 TL’yi aşması gerekir. Farkı bulmak için yıl içindeki bütün ödemelerinizi değil, kira gelirinden indirilebilen giderleri toplayın.'
  ]
} as const;

export const rentalExpenseGuideSections = [
  {
    heading: 'Önce tahsilatı ve istisna hakkınızı belirleyin',
    paragraphs: [
      'Örnek, 2026 takvim yılında Türkiye’de bir konuttan 12 ay boyunca ayda 29.000 TL kira tahsil eden ve mesken istisnasına hak kazanan bir gerçek kişiyi ele alıyor. Başka beyana tabi geliri, matrah indirimi veya mahsup edilecek vergisi olmadığı varsayılıyor. Toplam hasılat 348.000 TL. 2026 takvim yılı için geçerli 58.000 TL mesken istisnasından sonra 290.000 TL kalıyor.',
      'Kira defterine her ödemenin tahsil edildiği tarihi ve ait olduğu dönemi ayrı yazın. Örneğin gelecek yıla ait peşin kira ile geçmiş yıldan gecikerek gelen kira, GİB’in açıkladığı farklı dönem kurallarına tabidir. İstisna, hak sahibi bir mükellefin birden fazla konuttan kira geliri varsa toplama bir defa uygulanır. Ticari, zirai veya mesleki kazancın yıllık beyanı ve diğer gelirlerle birlikte değerlendirilen brüt gelir sınırı istisna hakkını etkileyebilir. Kendi dosyanızda önce Gelir Vergisi Kanunu’nun 21. maddesindeki şartları kontrol edin.'
    ]
  },
  {
    heading: 'Gerçek gider için belgeleri ayıklayın',
    paragraphs: [
      'Konut sahibinin ödediği sigorta ve koşulları karşılayan bakım ve onarım giderleri gerçek gider hesabına girebilir. Her kalem için faturayı, ödemeyi kimin yaptığını ve giderin hangi konuta ait olduğunu gösteren kaydı saklayın. Kiracının karşıladığı gideri ev sahibinin ödediği giderler arasına eklemeyin. Bir işin bakım mı yoksa değer artırıcı yatırım mı olduğunu faturanın açıklaması ve işin kapsamı üzerinden inceleyin.',
      '7566 sayılı Kanun, 2025’ten başlayan vergilendirme dönemlerine ilişkin beyannamelerde, kiraya verilen konutlara ilişkin borç faizlerini 74. maddenin ilgili gider bendinin kapsamı dışında bıraktı. Örneğin banka dökümünde görülen 80.000 TL konut kredisi faizini bu karşılaştırmada gider toplamına eklemeyin. Kredi ödemesini konutun nakit akışında ayrıca takip edin.',
      'GİB rehberi, şartları sağlanan bir konut için edinim bedelinin %5’ine ilişkin ilk beş yıllık indirimi ayrıca açıklar. Bu indirim ilgili konutun geliriyle sınırlıdır ve indirilemeyen kısım gider fazlası sayılmaz. Aşağıdaki örnekte bu özel kalem ve amortisman hesaba alınmamıştır. Bunlardan yararlanıyorsanız genel gider eşiğini uygulamadan önce ilgili sınırları kontrol edin.'
    ]
  },
  {
    heading: '348.000 TL tahsilatta gider eşiği nasıl bulunur?',
    paragraphs: [
      'Götürü yöntemde, örnekte istisna sonrası kalan 290.000 TL’nin %15’i indirilir. 43.500 TL gider düşüldüğünde vergi matrahı 246.500 TL olur.',
      'Gerçek yöntemde istisnaya düşen gider kısmı indirilemez. Örnekte giderin indirilebilen oranı 290.000 ÷ 348.000, yani 5/6. Uygun ve belgeli giderler toplamı 69.600 TL ise bunun 58.000 TL’si indirilir ve matrah 232.000 TL’ye iner. Gider toplamı 34.800 TL ise 29.000 TL indirilebilir ve matrah 261.000 TL olur.',
      'İki yöntemde de aynı istisna sonrası tutar kullanıldığından, özel sınırları bulunmayan giderlerle bu örneğin eşik hesabı brüt hasılat × %15’tir. 348.000 × %15 = 52.200 TL. Bu gider düzeyinde iki yöntem de 43.500 TL indirim sağlar. Kredi faizini ya da kiracının ödediği faturaları gider sayarsanız eşiği yanlış tarafta geçebilirsiniz.'
    ]
  },
  {
    heading: 'Vergi farkını gelecek yılın giderleriyle birlikte okuyun',
    paragraphs: [
      'Örnekteki üç matrah da 2026 ücret dışı tarifenin ikinci diliminde. İlk 190.000 TL için 28.500 TL, kalan kısım için %20 üzerinden hesaplanan gelir vergisi götürü yöntemde 39.800 TL. 69.600 TL belgeli giderle gerçek yöntemde 36.900 TL, 34.800 TL giderle 42.700 TL. Böylece ilk gider senaryosunda gerçek yöntem 2.900 TL avantaj sağlar, ikinci senaryoda götürü yöntem 2.900 TL avantaj sağlar. Hesap damga vergisi ve kişiye özel beyanname kalemleri hariçtir.',
      'Götürü gider yöntemini seçen mükellef iki yıl geçmeden gerçek gidere dönemez. Seçim aynı mükellefin taşınmazları için birlikte yapılır. Bu yıl büyük bir onarım ödemesi varsa veya gelecek yıl belgeli giderin artmasını bekliyorsanız iki dönemin tahsilat ve gider tahminlerini ayrı yazın. İleri yıl için henüz belirlenmemiş istisna ve vergi dilimlerini bugünkü rakamlarla kesinleştirmeyin.',
      'Beyan öncesi üç belgeyi yan yana koyun. Banka tahsilat dökümü, kabul edilen giderlerin fatura listesi ve önceki beyannamede seçtiğiniz yöntem. Hesapta kullandığınız her kalem için tutarı, dönemi ve hangi konuta ait olduğunu kaydedin.'
    ]
  }
];

export const rentalExpenseGuideEvidence = {
  takeaways: [
    'Önce mesken istisnasına hak kazanıp kazanmadığınızı ve önceki yöntem seçiminizi kontrol edin.',
    'Örnek koşullarda gider eşiğini brüt hasılatın %15’iyle hesaplayın. Uygun belgeli gideri kredi ve diğer nakit ödemelerinden ayırın.'
  ],
  sources: [
    {
      label: 'GİB · Gelir Vergisi Kanunu, madde 21',
      url: 'https://gib.gov.tr/mevzuat/kanun/433/madde/6998',
      scope: '12 Kasım 2026 itibarıyla mevzuat metni. Mesken kira geliri istisnası ve yararlanma şartları.'
    },
    {
      label: 'GİB · 332 Seri No.lu Gelir Vergisi Genel Tebliği',
      url: 'https://cdn.gib.gov.tr/api/gibportal-file/file/getFile?objectKey=MEVZUAT_TEBLIGLER%2FUNIVERSAL%2F2025%2F193_Teblig332.pdf',
      scope: '2026 takvim yılı için TL cinsinden mesken kira istisnası ve gelir vergisi tarifesi.'
    },
    {
      label: 'GİB · Kira Geliri Rehberi',
      url: 'https://cdn.gib.gov.tr/api/gibportal-file/file/getFileResources?objectKey=arsiv%2Ffileadmin%2Fbeyannamerehberi%2F2026%2F2026_Kira_Geliri.pdf',
      scope: 'Mart 2026 yayını, 2025 gelirlerine ilişkin beyan rehberi. Tahsilat dönemi, gider belgesi, istisnaya isabet eden gider ve yöntem seçimi.'
    },
    {
      label: 'GİB · 7566 sayılı Kanun',
      url: 'https://www.gib.gov.tr/mevzuat/kanun/651',
      scope: '4 Aralık 2025 kabul tarihli Kanun. Madde 1 ve yürürlük hükmü, kiraya verilen konutların borç faizine ilişkin değişikliği açıklar.'
    }
  ]
};

export const rentalExpenseGuideWorkbook = {
  question: 'Tahsil ettiğiniz konut kirasında kabul edilen belgeli gideriniz hangi yöntemde daha düşük matrah sağlıyor?',
  deliverable: 'Tahsilat, istisna hakkı ve gider belgeleriyle eşleşen iki matrah hesabı.',
  rows: [
    {
      finding: 'Ödemeler farklı aylara veya yıllara ait.',
      evidence: 'Banka tahsilat kaydı, kira sözleşmesi ve ödemenin ait olduğu ay.',
      action: 'Tahsilatın hangi yılın hasılatına girdiğini belirleyin. Mesken istisnası koşullarını kontrol edin.'
    },
    {
      finding: 'Banka faizi, sigorta ve onarım aynı listede.',
      evidence: 'Banka dökümü, sigorta poliçesi, faturalar ve ödeme kayıtları.',
      action: 'Sadece kanunen uygun belgeli kalemleri toplayın. İstisnaya isabet eden gideri ayırın.'
    },
    {
      finding: 'Bu yılki giderler gelecek yıl değişebilir.',
      evidence: 'Önceki beyanname, bu yılın gider eşiği ve gelecek yılın yazılı bakım teklifleri.',
      action: 'İki yöntemi karşılaştırın. Götürü seçiminden gerçek yönteme geçiş süresini dikkate alın.'
    }
  ]
};
