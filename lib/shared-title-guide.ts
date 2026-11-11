export const sharedTitleGuide = {
  slug: 'hisseli-tapu-parsel-payi-daire-payi-onalim',
  title: 'Hisseli tapulu ev alırken parsel payı ile daire payı nasıl ayrılır?',
  summary: 'Satılan payın hangi tapu kaydına ait olduğunu, önalım süresini ve kalan payı almanın toplam maliyetini kontrol edin.',
  publishedAt: '2026-11-11',
  updatedAt: '2026-11-11',
  body: [
    'Bir ilanda “1/6 hisseli daire” yazıyorsa ilk soru, altıda birin hangi taşınmaza ait olduğudur. Parselin altıda biri, tapuda ayrı kayıtlı bir dairenin altıda biri ve dairenin tamamıyla birlikte geçen arsa payı farklı işlemlerdir. Kapora vermeden önce tapudaki kaydı ilanda gösterilen yerle eşleştirin. Bir dairenin yalnızca bir kısmını alıyorsanız, kalan payın bedelini ve o payı alamadığınız durumda ne yapacağınızı da hesaplayın.'
  ]
} as const;

export const sharedTitleGuideSections = [
  {
    heading: 'Tapu kaydındaki pay hangi taşınmaza ait?',
    paragraphs: [
      'Parsel payı. Satıcı, 600 m² büyüklüğündeki bir parselin 1/6 payına sahip olabilir. Tapuda satılan kayıt parsel ise alıcı o taşınmaza paydaş olur. 600 × 1/6 = 100 m² hesabı, pay oranının yüzölçümüne uygulanmasıdır. Bu işlem parselde sınırları belirlenmiş 100 m² yer tahsis etmez. Satıcının yıllardır kullandığı katın bağımsız bölüm olarak kayıtlı olup olmadığını ayrıca araştırın.',
      'Daireye bağlı arsa payı. Tapuda 8 numaralı bağımsız bölüm kat mülkiyetiyle kayıtlıysa, bölümün 48/600 arsa payı bulunabilir. Satıcının o bağımsız bölümdeki mülkiyet payı tam ise işlem dairenin tamamını kapsar. 48/600 oranı, daireye bağlı arsa payını gösterir. Dairenin net alanını onaylı proje ve ölçüm üzerinden kontrol edin.',
      'Daire payı. Aynı 8 numaralı bağımsız bölümde satıcının mülkiyet payı 1/2 ise satış o bölümün yarı hissesini kapsar. Bir kişi dairenin tamamını fiilen kullanıyor olabilir. Fiilî kullanımın, kullanım anlaşmasının ve tapuda kayıtlı mülkiyetin kapsamını ayrı belgeleyin.'
    ]
  },
  {
    heading: 'Kapora öncesinde hangi belgeleri eşleştirmelisiniz?',
    paragraphs: [
      'Satıcıdan güncel tapu kayıt örneğini alın. Ada ve parseli, varsa blok ve bağımsız bölüm numarasını, mülkiyet türünü, satıcının payını ve kayıt üzerindeki ipotek, haciz veya diğer sınırlamaları kontrol edin. “Arsa payı” ile satıcının o taşınmazdaki “mülkiyet payı” için iki ayrı satır açın. Mirasçıların elbirliği kaydı varsa kimin hangi yetkiyle işlem yapabileceğini tapu müdürlüğünde teyit edin.',
      'Gezdiğiniz yeri kayıtlı bağımsız bölümle eşleştirmek için onaylı projede katı, konumu ve bölüm numarasını kontrol edin. Satıcı belirli bir katı, bahçeyi ya da otoparkı tek başına kullanabileceğinizi söylüyorsa dayanak belgeyi isteyin. Kullanım düzeninin kimleri bağladığını ve yeni alıcı açısından etkisini belge üzerinden değerlendirin.',
      'Ödeme yapmadan önce sözleşmeye satılacak taşınmazın kayıt bilgilerini, devredilecek payı, toplam bedeli ve belgeler uyuşmazsa uygulanacak iade koşulunu yazın. Kredili alımda bankadan, incelediğiniz kayıt ve pay için finansman koşullarını yazılı isteyin.'
    ]
  },
  {
    heading: 'Dışarıdan pay alırken önalım süresi nasıl işler?',
    paragraphs: [
      'Türk Medeni Kanunu madde 732 uyarınca paydaşlardan biri payını üçüncü kişiye satarsa diğer paydaşlar, koşulları oluştuğunda, alıcıya karşı dava açarak yasal önalım hakkını kullanabilir. Satışı alıcı veya satıcı diğer paydaşlara noter aracılığıyla bildirir. 25 Aralık 2025’te yürürlüğe giren değişiklik kapsamındaki satışlarda süre bildirimden itibaren üç ay ve her durumda satıştan itibaren en fazla bir yıldır. Değişiklikten önceki satışlarda madde 733’ün önceki hükümleri uygulanır.',
      'Genel feragat resmî şekilde düzenlenip tapuya şerh edilir. Belirli bir satışta hakkı kullanmaktan vazgeçme için yazılı şekil aranır. Satıcı diğer paydaşların onay verdiğini söylüyorsa belgenin hangi paya ve satışa ilişkin olduğunu inceleyin. Her paydaş için belgeyi ve varsa noter bildiriminin tebliğ tarihini ayrı kaydedin.',
      'Madde 734 uyarınca davada payın rayiç bedelini hâkim belirler. Önalım hakkını kullanan kişi, bu bedeli ve alıcıya düşen tapu giderlerini verilen kesin sürede nakden yatırır. Kanundaki geçiş hükmü bu bedel değişikliğini yürürlükten önce açılmış davalara da uygular. Eski bir devir veya süren dava varsa satış tarihini, tebliği ve dosyayı birlikte inceletin.'
    ]
  },
  {
    heading: 'İlk pay ucuz görünüyorsa toplam bedeli hesaplayın',
    paragraphs: [
      'Varsayımsal örnekte bir dairenin 1/2 payı için 1.550.000 TL isteniyor. Diğer 1/2 payın sahibi yazılı olarak 2.000.000 TL talep ediyor. İki işlem için öngördüğünüz toplam gider 90.000 TL ise dairenin tamamına ulaşmanın maliyeti 1.550.000 + 2.000.000 + 90.000 = 3.640.000 TL. Aynı kullanım ihtiyacını karşılayan tam mülkiyetli bir dairenin yazılı bedeli 3.500.000 TL ve alım gideri 90.000 TL ise toplam 3.590.000 TL olur. İlk yarı pay daha düşük bir bedelle alınsa bile iki adımlı alım bu senaryoda 50.000 TL daha pahalıya gelir.',
      'Aynı toplam bütçeyi korumak için ilk paya ayırabileceğiniz tutarı geriye doğru hesaplayın. 3.590.000 − 2.000.000 − 90.000 = 1.500.000 TL. İkinci pay için istenen bedel 250.000 TL yükselirse ilk paya ayırabileceğiniz tutar 1.250.000 TL’ye düşer. Bu rakamlar varsayımsal işlem tutarlarıdır. Kendi hesabınızda iki ayrı devrin giderlerini ve aradaki dönemde oluşacak finansman veya barınma masrafını tekliflerle güncelleyin.',
      'Diğer payın devri gerçekleşmezse elde kalacak hakkı ayrıca değerlendirin. İlk pay için ödeyeceğiniz 1.550.000 TL’ye ilk devrin giderlerini ekleyin. O payla konutu kullanıp kullanamayacağınızı, başka yerde kalma maliyetinizi ve payı yeniden satabilmek için hangi belgelere ihtiyaç duyacağınızı yazın. Amacınız dairenin tamamını edinmekse iki devrin koşullarını ve sırasını ilk ödeme öncesinde netleştirin.'
    ]
  }
];

export const sharedTitleGuideEvidence = {
  takeaways: [
    'Satılan payı ada, parsel ve varsa bağımsız bölüm kaydıyla eşleştirin.',
    'Birden fazla devir gerekiyorsa toplam gideri ve kalan payın bedeli değiştiğinde bütçenin nasıl etkilendiğini hesaplayın.'
  ],
  sources: [
    {
      label: 'Adalet Bakanlığı · Türk Medeni Kanunu',
      url: 'https://mevzuat.adalet.gov.tr/mevzuat/103249',
      scope: '8 Aralık 2001 tarihli ve 24607 sayılı Resmî Gazete. Paylı mülkiyet, yasal önalım ve geçiş hükmü için 688, 732–734 ve geçici 1. madde.'
    },
    {
      label: 'TBMM · 7571 sayılı değişiklik kanunu',
      url: 'https://cdn.tbmm.gov.tr/KKBSPublicFile/D28/Y3/KanunMetni/5189159c-4dec-44bf-87e0-9b23a810c791.htm',
      scope: '25 Aralık 2025 tarihli ve 33118 sayılı Resmî Gazete. Önalım süresi, rayiç bedel ve geçiş hükümleri için 35–37 ve 39. maddeler.'
    },
    {
      label: 'Adalet Bakanlığı · Kat Mülkiyeti Kanunu',
      url: 'https://mevzuat.adalet.gov.tr/mevzuat/103807',
      scope: '2 Temmuz 1965 tarihli ve 12038 sayılı Resmî Gazete. Bağımsız bölüm, arsa payı ve bunların sicildeki bağlantısı için 2, 3 ve 13. maddeler.'
    },
    {
      label: 'TKGM · Tapu Bilgileri Sorgulama',
      url: 'https://www.turkiye.gov.tr/tapu-bilgileri-sorgulama',
      scope: '11 Kasım 2026 kaynak kontrolü. Kimlik doğrulaması gerektiren tapu bilgileri hizmeti.'
    }
  ]
};

export const sharedTitleGuideWorkbook = {
  question: 'Kapora karşılığında hangi kayıt ve pay devredilecek, dairenin tamamı için kaç TL gerekiyor?',
  deliverable: 'Payı gösteren tapu kaydı, önalım belgeleri ve kalan pay için ayrı maliyet senaryosu.',
  rows: [
    {
      finding: 'İlanda bir kat gösteriliyor, tapuda parsel payı yazıyor.',
      evidence: 'Ada ve parsel, bağımsız bölüm kaydı, onaylı proje ve varsa kullanım anlaşması.',
      action: 'İlanla kaydı eşleştirin. Tek başına kullanım iddiasının dayanağını inceleyin.'
    },
    {
      finding: 'Bir paydaş, kayıtlı payını dışarıdan bir alıcıya satıyor.',
      evidence: 'Güncel paydaş listesi, varsa satışa özgü yazılı vazgeçme ve noter bildirim belgeleri.',
      action: 'Her paydaş için belgeyi ve geçerli süreyi işlem dosyasında ayrı kaydedin.'
    },
    {
      finding: 'Dairenin tamamı için ikinci bir devir gerekiyor.',
      evidence: 'İkinci payın yazılı bedeli, teklifin geçerlilik süresi, her iki devrin giderleri.',
      action: 'Toplam maliyeti hesaplayın. İkinci bedel artarsa ve ikinci devir gerçekleşmezse iki ayrı sonuç yazın.'
    }
  ]
};
