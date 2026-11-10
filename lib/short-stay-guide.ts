export const shortStayGuide = {
  slug: 'kisa-sureli-konut-kiralama-izin-doluluk',
  title: 'Kısa süreli konut kiralaması için izin nasıl alınır, kaç gece doluluk gerekir?',
  summary: '100 gün kuralını, apartman kararını ve başvuru belgelerini kontrol edin. Uzun dönem kirayla aynı nakdi sağlayacak doluluğu hesaplayın.',
  publishedAt: '2026-11-10',
  updatedAt: '2026-11-10',
  body: [
    'Bir apartman dairesini gecelik kiraya vermeyi düşünüyorsanız önce izin alıp alamayacağınızı araştırın. Ardından aynı dairenin uzun dönem kirasını, kısa konaklamalardan komisyon ve giderler çıktıktan sonra kalan nakitle karşılaştırın. Örnek dairede yıllık 252.000 TL’ye ulaşmak için 210 dolu gece gerekiyor. Gecelik tahsilat 400 TL azalırsa eşik 272 geceye çıkıyor.'
  ]
} as const;

export const shortStayGuideSections = [
  {
    heading: '100 gün sınırı her sözleşme için değerlendirilir',
    paragraphs: [
      '7464 sayılı Kanun uyarınca konutu tek seferde 100 gün veya daha kısa süreyle kiraya vermek için sözleşmeden önce turizm amaçlı kiralama izin belgesi alınır. Kanundaki tanım, bu süre içindeki kiralamayı konaklama amacına bakmadan kapsar. Örneğin üç haftalık iş görevi için kiralama da süre bakımından bu kapsama girer. 100 gün, sözleşme süresini ifade eder. Yıllık dolu gece hesabı ayrı yapılır.',
      'Tek seferde 100 günü aşan kiralamalar Kanunun genel kapsamı dışında kalır. Ancak madde 4, her defasında 100 günden uzun sözleşme yapılmasına rağmen ilk sözleşme tarihinden itibaren bir yıl içinde aynı konutun dört defadan fazla kiraya verilmesi için ayrıca yaptırım öngörür.',
      'Belgeyi kiraya veren alır ve Bakanlığın belirlediği plaket konut girişine asılır. Bir satış ilanında kısa kiralama geliri sunuluyorsa mevcut belgenin hangi bağımsız bölüm ve kimin adına düzenlendiğini görün. Satın alma sonrası sizin adınıza hangi işlemin gerekeceğini il kültür ve turizm müdürlüğünden işlem öncesinde teyit edin.'
    ]
  },
  {
    heading: 'Tapuyu ve apartman kararını eşleştirin',
    paragraphs: [
      'Standart apartman dairesinde, ilgili binadaki tüm kat maliklerinin oy birliğiyle aldığı uygunluk kararı aranır. Olağan bir çok bloklu sitede tek daire için inceleme dairenin bulunduğu bina üzerinden yapılır ve izin belgesinin örneği site yönetimine iletilir. Karar metnindeki blok ve bağımsız bölümün tapuyla eşleştiğini kontrol edin. Yöneticiyle yapılan görüşmenin ardından kurul kararının başvuruda kullanılacak örneğini isteyin.',
      'Güncel tapu kaydını, başvuru sahibinin kimlik ve varsa temsil belgelerini hazırlayın. Paylı veya elbirliği mülkiyetinde başvurunun onay belgeleri ayrıca değerlendirilir. Müstakil yapılar ve mevzuattaki koşulları sağlayan yüksek nitelikli konutlar için Bakanlığın ayrı başvuru listelerine bakın. İlanın “rezidans” demesi halinde tapuya işlenmiş yönetim planını ve ilgili imar belgesini isteyin.',
      'Başvuruyu e-Devlet’te Bakanlığın hizmetinden yapın ve konut tipinize ait güncel kılavuzu kullanın. İşletmeye geçmeden önce belgenin düzenlenmesini bekleyin. Belgelendirmeye dayanak bilgi ve belgeleri dosyalayın. Yönetmeliğin 27 Ekim 2026 tarihli değişikliği, belirli belge eksikliği, uygunsuzluğu veya değişikliklerinin tespitinden sonra bunların giderilmesi için 30 gün verilmesini ve süre sonunda eksikler giderilmemişse belgenin iptalini düzenler.'
    ]
  },
  {
    heading: 'Aynı dairede giderlerden sonra kalan nakdi hesaplayın',
    paragraphs: [
      'Varsayımsal 12 aylık örnekte uzun dönem kira ayda 24.000 TL, tahsilat 11 ay, malike kalan giderler yılda 12.000 TL. İşletme giderleri sonrası yıllık nakit 11 × 24.000 − 12.000 = 252.000 TL. İki seçenekte de vergi ve finansman hesap dışında. Tutarlar örnektir ve yerel piyasa gözlemi içermez.',
      'Kısa konaklamada komisyon öncesi tahsilat 2.400 TL/gece ve malikin ödediği platform kesintisi %15 olsun. Ortalama konaklama 3 gece ise rezervasyon başına 1.050 TL temizlik ve çamaşır gideri, dolu gece başına 350 TL eder. Buna 190 TL/gece değişken gider eklenir. Her dolu gecenin sabit giderleri karşılamaya katkısı 2.400 × 0,85 − 350 − 190 = 1.500 TL olur. Aidat, boşken de süren faturalar ve bakım gibi yıllık sabit giderler için 63.000 TL ayırın.',
      'Dolu gece eşiği, uzun dönem nakdi ile kısa kiralamanın sabit giderleri toplamının gece başı katkıya bölünmesiyle bulunur. Bu örnekte (252.000 + 63.000) ÷ 1.500 = 210 gece. Kısa kiralama 150 dolu gecede 162.000 TL, 210 gecede 252.000 TL ve 240 gecede 297.000 TL bırakır. Tadilat ve kişisel kullanım yüzünden 330 gece satışa açılabiliyorsa eşik, açık takvimin yaklaşık %64’üdür.'
    ]
  },
  {
    heading: 'İlk yılın nakit ihtiyacını ve sezon riskini sınayın',
    paragraphs: [
      'Diğer varsayımlar sabitken tahsilat 2.000 TL/geceye düşerse katkı 1.160 TL olur. 315.000 ÷ 1.160 işlemini bir üst tam geceye yuvarlayınca gereken doluluk 272 geceye, 330 gecelik takvimde yaklaşık %82’ye çıkar. Aynı 2.400 TL fiyatla konaklama ortalaması 3 geceden 2 geceye inerse temizlik gideri 525 TL/geceye yükselir. Bu durumda katkı 1.325 TL ve eşik 238 gecedir.',
      'İlk yıl kısa kiralama için 90.000 TL ek eşya ve kurulum ödemesi varsa, 2.400 TL fiyatlı temel senaryoda ilk yıl eşiği (315.000 + 90.000) ÷ 1.500 = 270 gecedir. Bu, harcamanın tamamının ilk yıl ödendiği nakit hesabıdır. Normal işletme yılında 210 geceyi, kurulum ödemesinin yapıldığı ilk yılda 270 geceyi esas alın. Kurulum ödemesini ilk yıl tablosunda ayrı satırda gösterin.',
      'Takvimi ay ay doldurun. Her ay için satışa açılacak geceyi, beklenen dolu geceyi, indirim sonrası tahsilatı ve tahmini rezervasyon adedini yazın. Dışarıdan görünen kapalı takvimde bakım ve kişisel kullanım da bulunabilir. Doluluğu mümkünse aynı daireye ait anonimleştirilmiş tahsilat ve konaklama kayıtlarıyla sınayın. Yıllık eşiğe ulaşsanız bile en zayıf üç ayın sabit giderleri için gereken nakdi ayrı hesaplayın.',
      'Platform kesintilerini gerçek sözleşmeden, temizlik ve yönetim ücretlerini yazılı tekliften alın. Her iki model için geçerli vergi ve diğer yükümlülükleri kendi durumunuza göre ayrıca hesaplayın. Başvuru dosyası tamamlanabiliyor ve düşük sezon varsayımlarıyla ulaştığınız doluluk eşiği karşılıyorsa, iki seçeneği vergi sonrası aynı dönem için karşılaştırın.'
    ]
  }
];

export const shortStayGuideEvidence = {
  takeaways: [
    '100 gün sınırı sözleşme süresine uygulanır. İşletme bütçesindeki doluluk yıllık takvimden hesaplanır.',
    'İzin dosyasını, normal işletme yılını ve eşya alınan ilk yılın nakit ihtiyacını ayrı inceleyin.'
  ],
  sources: [
    {
      label: '7464 sayılı Kanun · Resmî Gazete nüshası',
      url: 'https://dosya.tyf.gov.tr/public/upload/0/2023-11/7464SayiliKanun.pdf',
      scope: '2 Kasım 2023 tarihli ve 32357 sayılı Resmî Gazete. Türkiye’de sözleşme süresi, izin belgesi, bina kararı ve yaptırımlar için maddeler 1–4.'
    },
    {
      label: 'Kültür ve Turizm Bakanlığı · İl müdürlüklerince değerlendirilen başvurular',
      url: 'https://yigm.ktb.gov.tr/TR-436402/il-kultur-ve-turizm-mudurluklerince-degerlendirilecek-turizm-amacli-kiralanan-konut-izin-belgesi-basvurulari-hakkinda.html',
      scope: '10 Kasım 2026 kaynak kontrolü. Konut ve müstakil konut başvuru koşulları, tapu ve temsil belgeleri.'
    },
    {
      label: 'Kültür ve Turizm Bakanlığı · Yüksek nitelikli konut başvuruları',
      url: 'https://yigm.ktb.gov.tr/TR-436391/turizm-amacli-konut-kiralama-basvurulari.html',
      scope: '10 Kasım 2026 kaynak kontrolü. Rezidans tanımı, imar belgesi ve yönetim planı.'
    },
    {
      label: 'Kültür ve Turizm Bakanlığı · Yönetmelik değişikliği',
      url: 'https://teftis.ktb.gov.tr/TR-476733/konutlarin-turizm-amacli-kiralanmasi-faaliyetlerinin-duzenlenmesine-iliskin-yonetmelikte-degisiklik-yapilmasina-dair-yonetmelik.html',
      scope: '27 Ekim 2026 tarihli ve 33413 sayılı Resmî Gazete metnine bağlantı. Madde 12/4 uyarınca belge eksikliklerinin giderilmesi.'
    },
    {
      label: 'e-Devlet · Turizm Amaçlı Konut İzin Belgesi Başvurusu',
      url: 'https://www.turkiye.gov.tr/ktb-turizm-amacli-kiralanan-konut-izni-7918',
      scope: '10 Kasım 2026 kaynak kontrolü. Kimlik doğrulamasıyla erişilen resmî başvuru hizmeti.'
    }
  ]
};

export const shortStayGuideWorkbook = {
  question: 'Daireniz için hangi izin belgeleri gerekir ve kısa kiralama kaç dolu gecede uzun dönem kirayla eşitlenir?',
  deliverable: 'Bağımsız bölümle eşleşen başvuru dosyası ve düşük sezonu içeren 12 aylık nakit tablosu.',
  rows: [
    {
      finding: 'Bir apartman dairesi kısa süreli kiralanacak.',
      evidence: 'Güncel tapu kaydı, blok ve bağımsız bölümü belirten kurul kararı, e-Devlet başvuru kılavuzu.',
      action: 'Belge şartlarını eşleştirin. Karar veya başvuru sahibi konusunda tereddüt varsa önce il müdürlüğüne danışın.'
    },
    {
      finding: 'Gecelik ilan fiyatı yüksek, kalışlar kısa.',
      evidence: 'İndirim sonrası tahsilat, komisyon, ortalama kalış süresi, temizlik teklifi ve sabit giderler.',
      action: 'Rezervasyon başına gideri dolu geceye çevirin. Düşük fiyat ve kısa kalış için eşiği yeniden hesaplayın.'
    },
    {
      finding: 'İlk yıl eşya alınacak ve kışın talep düşecek.',
      evidence: 'Kurulum teklifleri, 12 aylık doluluk varsayımı ve uzun dönem için tahsil edilecek kira.',
      action: 'Kurulumu ilk yıl nakdine ekleyin. En zayıf üç ayın açığını ve gereken nakit payını ayrı yazın.'
    }
  ]
};
