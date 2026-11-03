export const saleChainGuide = {
  slug: 'ev-satip-ev-alma-tapu-nakit-plani',
  title: 'Ev satıp yeni ev alırken iki tapu işlemi nasıl planlanır?',
  summary: 'Satış parası gecikirse oluşacak nakit açığını hesaplayın. İki tapu işlemini, kaporayı ve teslim tarihlerini tek takvimde eşleştirin.',
  publishedAt: '2026-11-03',
  updatedAt: '2026-11-03',
  body: [
    'Mevcut evinizin satış bedeli yeni evin alımını karşılayabilir ama ödeme günü para hesabınıza geçmemişse işlem durabilir. İki tapu randevusunu peş peşe koymadan önce hangi paranın hangi anda kullanılabileceğini, gecikmenin maliyetini ve taşınma süresini hesaplayın.'
  ]
} as const;

export const saleChainGuideSections = [
  {
    heading: 'Ödeme anında hesabınızda olacak parayı yazın',
    paragraphs: [
      'Mevcut ev için satış fiyatından, satış gelirinden ödenecek kredi kapama tutarını ve satıcıya ait işlem giderlerini düşerek işe başlayın. Kredi varsa kapama tutarını bankadan işlem gününe uygun olarak isteyin. Kesintilerin satış anından önce mi, satış bedelinden mi ödeneceğini bankayla netleştirin. Önceden ödenecek bir kalem, cebinizden çıkacağı güne ayrıca yazılmalıdır.',
      'Yeni ev için fiyat, satış bedeline mahsup edilecek kapora ve devir gününde ödenecek belgeli giderleri ayrı satırlara koyun. Kullanılabilir nakdi kaporadan önce ölçtüyseniz kaporayı o nakitten düşün. Aksi hâlde hem satış fiyatından hem nakitten ikinci kez düşebilirsiniz. Mevcut evin alıcısından alınan ve iade koşulu bulunan bir ödemeyi de koşulsuz nakit gibi kullanmayın.'
    ]
  },
  {
    heading: 'Örnek hesapta 410 bin TL kalırken neden 3,92 milyon TL açık çıkıyor?',
    paragraphs: [
      'Tutarlar varsayımsal ve TL cinsindendir. Mevcut evin satış fiyatı 5.000.000, satıştan kapatılacak kredi 600.000, satıcıya ait giderler 70.000 olsun. Kullanıma hazır net satış geliri 4.330.000 TL’dir. Kapora ödendikten sonra serbest nakit 900.000 TL olsun. Yeni evin fiyatı 4.800.000 TL, fiyatın içindeki ödenmiş kapora 100.000 TL, devir günü giderleri 120.000 TL kabul edildiğinde o gün 4.820.000 TL gerekir.',
      'Satış geliri alımdan önce hesaba geçerse 5.230.000 TL kullanılabilir ve devirden sonra 410.000 TL kalır. Satış geliri alımdan sonra geçerse aynı anda yalnız 900.000 TL vardır ve açık 3.920.000 TL’ye çıkar. Satış fiyatı değişmediği hâlde ödeme sırası işlemin yapılabilirliğini değiştirir.',
      'Satıştan sonra kısa süreli kiralama, depo ve ikinci taşınma için yazılı teklifler toplam 85.000 TL ise örnekte 325.000 TL kalır. Bu rezervin bir kısmı sonradan iade edilecek depozitoysa o tutarı nakit ihtiyacında tutun, kalıcı giderde ayrı gösterin. Örnekteki gider tutarları güncel harç, komisyon tarifesi veya piyasa ortalaması değildir.'
    ]
  },
  {
    heading: 'Her tapu işlemi için ödeme ve tescili ayrı takip edin',
    paragraphs: [
      'TKGM’nin Güvenilir Hesap açıklamasında, sistemde bloke edilen satış bedelinin tescil tamamlandığında satıcıya aktarıldığı belirtiliyor. Mevcut evin satışı için bloke edilmiş tutarı yeni alımın hazır parası saymadan önce hesabınıza kullanılabilir olarak geçtiğini doğrulayın. Randevu onayı ve ödeme bildirimi farklı aşamalardır.',
      'Her işlem için alıcı, satıcı, banka ve varsa ödeme sistemiyle işlem referansını, finansman şeklini ve aktarım sırasını teyit edin. İpotek kapama veya kredi kullandırımına bağlı bir işlem varsa, o dosyanın sisteme uygunluğunu ve ödeme adımlarını ilgili kurumlardan yazılı doğrulayın. İki tapu işlemini birbirine bağlayan otomatik bir aktarım varsaymayın.'
    ]
  },
  {
    heading: 'Takvimi üç ayrı gecikmeyle sınayın',
    paragraphs: [
      'Önce para gecikmesini deneyin. İlk işlem öğleden sonra sarkarsa ikinci satıcının ödeme son saati aşılacak mı? Satış gelirinden bağımsız fonunuz açığı karşılamıyorsa, yeni alım için esnek bir gün aralığı ve ödeme koşulu müzakere edin. Finansman kullanılacaksa ön onayı, kullandırıma hazır para gibi kabul etmeden önce koşulları ve son geçerlilik tarihini sorun.',
      'Sonra satışın gerçekleşmediği senaryoyu çalıştırın. Mevcut evin alıcısı çekilirse yeni alım için ayrılmış kaporaya ve masraflara ne olacağını belgeye bakarak belirleyin. Satışa bağlı koşul, süre uzatma ve iade hükümlerini somut sözleşmeye göre inceletin. Gecikme halinde kimin, hangi tarihe kadar, kime bildirim yapacağını yazın.',
      'Son olarak anahtar teslimini geciktirin. Satış ve alım tamamlandığı hâlde yeni evde tadilat veya geç teslim varsa barınma boşluğu oluşabilir. İki ev için anahtar teslim tarihini, sayaç okumalarını ve teslim tutanağını ayrı planlayın. Geçici konaklama bütçesi, sadece satış fiyatı farkından bakınca görünmez.'
    ]
  }
];

export const saleChainGuideEvidence = {
  takeaways: [
    'Yeni evin ödeme günündeki nakit açığını, mevcut evin satış geliri zamanında geçerse ve geçmezse ayrı hesaplayın.',
    'Kapora, kredi kapaması ve taşınma rezervini ödeme tarihlerine dağıtın. Tescil ile hesabınıza geçen kullanılabilir bakiyeyi ayrı kontrol edin.'
  ],
  sources: [
    {
      label: 'TKGM · Güvenilir Hesap',
      url: 'https://www.tkgm.gov.tr/e-hizmetler/diger-hizmetler/guvenilir-hesap',
      scope: '3 Kasım 2026 kaynak kontrolü. Satış bedelinin bloke edilmesi, tescil sonrası aktarım ve iptal süreci. Örnekteki TL tutarları varsayımsaldır.'
    }
  ]
};

export const saleChainGuideWorkbook = {
  question: 'Mevcut evin bedeli beklediğiniz gün gelmezse yeni alım yapılabilir mi?',
  deliverable: 'İki taşınmaz için tescil, ödeme, anahtar teslimi ve alternatif tarihleri gösteren nakit çizelgesi.',
  rows: [
    {
      finding: 'Satış fiyatı yeni evin bedelini karşılıyor gibi görünüyor.',
      evidence: 'İşlem gününe uygun kredi kapama yazısı ve taraflara düşen gider dökümü.',
      action: 'Satış bedelinden kullanılabilir net gelire geçin, erken ödenecek kalemleri tarihlendirin.'
    },
    {
      finding: 'İkinci işlem ilk satışın aynı gün tamamlanmasına bağlı.',
      evidence: 'Ödeme yöntemi, işlem referansları ve ikinci satıcının yazılı ödeme koşulu.',
      action: 'İlk satış bedeli olmadan açığı hesaplayın. Açık kapanmıyorsa ikinci işlem için tarih esnekliğini yazılı netleştirin.'
    },
    {
      finding: 'Tapu günü belli ama taşınma günü belirsiz.',
      evidence: 'İki evin teslim tarihleri, teslim tutanağı ve geçici barınma teklifleri.',
      action: 'Anahtar teslimleri arasındaki boşluğu ve maliyetini ayrı bütçeleyin.'
    }
  ]
};
