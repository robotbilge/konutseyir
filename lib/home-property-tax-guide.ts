export const homePropertyTaxGuide = {
  slug: 'ev-alinca-emlak-vergisi-bildirim-eski-borc',
  title: 'Ev alınca emlak vergisi ne zaman başlar, eski borcu kim öder?',
  summary: 'Tapu devrinden önce belediye borcunu kontrol edin. Bildirim süresini, ilk taksit yılını ve bina vergisi bütçesini ayrı hesaplayın.',
  publishedAt: '2026-11-16',
  updatedAt: '2026-11-16',
  body: [
    'Kasım ayında ev alan birinin kendi emlak vergisi mükellefiyeti ertesi yıl başlar. Buna rağmen belediye, satış yılına veya daha eski yıllara ait ödenmemiş emlak vergisini alıcıdan da isteyebilir. Tapu günü için borç kontrolü, bildirim için son tarih ve ilk vergi taksiti için bütçe üç ayrı iş kalemidir.'
  ]
} as const;

export const homePropertyTaxGuideSections = [
  {
    heading: 'Tapu tarihinden iki ayrı takvim çıkarın',
    paragraphs: [
      '1319 sayılı Emlak Vergisi Kanunu’nun 9, 23 ve 33. maddelerine göre ikinci el bir meskenin satışı sonrası alıcının bina vergisi mükellefiyeti izleyen bütçe yılında başlar. Alıcı, taşınmazın bulunduğu belediyeye bildirimi kural olarak devrin gerçekleştiği yıl içinde verir. Tapu devri ekim, kasım veya aralık ayındaysa bildirim için devir tarihinden itibaren üç ay vardır.',
      '16 Kasım 2026’da tapusu alınan bir konut için üç aylık bildirim süresi 16 Şubat 2027’ye ulaşır. Alıcının mükellefiyeti 2027’de başlar. Aynı konut 16 Eylül 2026’da alınsaydı bildirim 2026 sonuna kadar verilirdi. Her iki senaryoda da ilk taksit dönemi Mart–Mayıs 2027, ikinci taksit dönemi Kasım 2027 olur. Bu ödeme dönemleri 1319 sayılı Kanun’un 30. maddesinden gelir.',
      'Belediyenin bildirim kanalını kontrol edin. Başvuruda daireyi tapudaki ada, parsel ve bağımsız bölüm numarasıyla eşleştirin. Bildirim kaydını ve başvuru numarasını saklayın. Tapu müdürlüğünün belediyeye işlemi bildirmesiyle alıcının emlak vergisi bildirimi ayrı işlemlerdir.'
    ]
  },
  {
    heading: 'Tapuya gitmeden önce borcu yıl yıl kontrol edin',
    paragraphs: [
      'Kanunun 30. maddesine göre devreden ve devralan, devrin yapıldığı yıla ve geçmiş yıllara ait ödenmemiş emlak vergisinden müteselsilen sorumludur. Belediye alacağın tamamını taraflardan birinden isteyebilir. Alıcının satıcıya rücu hakkı saklıdır. Bu hak, belediyenin alıcıdan tahsilatını engellemez.',
      'Satıcıdan belediye kaydındaki ilgili bağımsız bölüm için güncel borç dökümünü isteyin. Yıl, taksit, vergi aslı ve varsa gecikme tutarını ayrı görün. Satıcının kişisel vergi ekranı başkasına açık olmayabilir. Dökümü satıcının bizzat almasını veya yetkili kanaldan paylaşmasını isteyin. Birden çok daire aynı kişiye kayıtlıysa ödemenin bu dairenin doğru siciline işlendiğini kontrol edin.',
      'Örneğin belediye dökümünde Kasım 2026 taksiti 2.400 TL, önceki yıllardan toplam 3.100 TL açık görünüyorsa, tapu öncesi kapatılması gereken örnek bakiye 5.500 TL’dir. Satıcı ödemeyi üstleniyorsa dekontun yanında belediye kaydında düşen bakiyeyi de görün. Ödeme henüz kayda geçmemişse, doğrulama zamanını ve satış bedeline etkisini tapudan önce yazılı netleştirin.'
    ]
  },
  {
    heading: 'İlk yılın taksitlerini belediyenin vergi değeriyle bütçeleyin',
    paragraphs: [
      'Belediyeden ilgili yılın bina vergi değerini ve tahakkukunu ayrı isteyin. Bina vergi değeri, 1319 sayılı Kanun’un 29. maddesine göre hesaplanan TL cinsinden vergilendirme değeridir. Aynı dairenin ilan bedeli, satış bedeli ve arsa metrekare birim değeri ayrı kalemlerdir. 2026 için 7566 sayılı Kanun’la özel bir geçiş hükmü getirildi. 2027 bütçesini kapatmadan önce o yılın kaydını belediyeden doğrulayın.',
      'Varsayım olarak 2027 bina vergi değeri 2.800.000 TL olan bir mesken düşünün. 1319 sayılı Kanun’un 8. maddesindeki genel mesken oranı binde 1 ile bina vergisi 2.800 TL, büyükşehir belediye sınırları ve mücavir alanlarda binde 2 ile 5.600 TL olur. Büyükşehir örneğinde iki eşit vergi taksiti 2.800 TL’dir. Hesap ek kalemleri ve kişiye özel indirimleri dışarıda bırakır.',
      'Büyükşehir örneğinde eski 5.500 TL belediye borcu açık kalır ve alıcı tarafından ödenirse, ilk kendi vergi yılı sonuna kadar toplam 11.100 TL bina vergisi ve eski bakiye çıkışı oluşur. Satıcı eski borcu devirden önce kapatırsa aynı varsayımlarla alıcının bu iki kalem için çıkışı 5.600 TL’ye iner. Bu nedenle teklif dosyanızda eski bakiye ile yeni taksitleri ayrı satırlara yazın.'
    ]
  }
];

export const homePropertyTaxGuideEvidence = {
  takeaways: [
    'Tapu devrinin gerçekleştiği yılı, bildirim son tarihini ve alıcı adına ilk taksit dönemini ayrı kaydedin.',
    'Satıştan önce belediye borç bakiyesini, ilk taksit öncesinde ilgili yılın bina vergi değerini doğrulayın.'
  ],
  sources: [
    {
      label: 'Gelir İdaresi Başkanlığı · 1319 sayılı Emlak Vergisi Kanunu',
      url: 'https://sakarya.gib.gov.tr/mevzuat/kanun/447',
      scope: '16 Kasım 2026 kontrolü. Maddeler 8, 9, 23, 29, 30 ve 33. Mesken oranları binde, bildirim ve ödeme dönemleri takvim olarak belirtilir.'
    },
    {
      label: 'Çorum Defterdarlığı · Emlak Vergisi',
      url: 'https://corum.gib.gov.tr/vergi-konulari/1_bireysel/6_emlak_vergisi/6',
      scope: '2026 alım örnekleri. Belediyeye bildirim, izleyen yılda mükellefiyet ve bina vergisinin kapsamı.'
    },
    {
      label: 'Gelir İdaresi Başkanlığı · 57 Seri No.lu Genel Tebliğ',
      url: 'https://gib.gov.tr/mevzuat/kanun/447/teblig/11037',
      scope: '27 Temmuz 2011. Emlak vergisi bildirimleri ve devre konu taşınmazın ödenmemiş vergisinde tarafların sorumluluğu.'
    },
    {
      label: 'Resmî Gazete · 7566 sayılı Kanun',
      url: 'https://www.resmigazete.gov.tr/eskiler/2025/12/20251219-1.htm',
      scope: '19 Aralık 2025, madde 10. 2026 bina ve arazi vergi değerlerine ilişkin geçiş düzenlemesi.'
    }
  ]
};

export const homePropertyTaxGuideWorkbook = {
  question: 'Tapu günü bakiyesiyle ilk vergi yılının bütçesi ayrı ayrı doğrulandı mı?',
  deliverable: 'Bağımsız bölümle eşleştirilmiş borç dökümü, bildirim kaydı ve iki taksit için TL cinsinden bütçe.',
  rows: [
    {
      finding: 'Tapu devri yılın son üç ayında.',
      evidence: 'Tapu devri tarihi, belediye başvuru kaydı ve bağımsız bölüm bilgileri.',
      action: 'Üç aylık bildirim süresini ve izleyen yılın taksit dönemlerini takvime yazın.'
    },
    {
      finding: 'Belediye kaydında geçmiş taksit açık görünüyor.',
      evidence: 'İlgili bağımsız bölüme ait güncel borç dökümü ve ödeme belgesi.',
      action: 'Kapatacak tarafı yazılı belirleyin ve tapudan önce belediye bakiyesini yeniden sorun.'
    },
    {
      finding: 'İlk vergi yılı bütçesi hazırlanıyor.',
      evidence: 'İlgili yıla ait bina vergi değeri, tahakkuk ve uygulanacak oran.',
      action: 'Her taksiti TL olarak bütçeleyin. Eski bakiyeyi ayrı bir nakit çıkışı olarak izleyin.'
    }
  ]
};
