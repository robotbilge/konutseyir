export const newTenantRentGuide = {
  slug: 'yeni-kiraci-kira-endeksi-bos-kalma-hesabi',
  title: 'Yeni Kiracı Kira Endeksi ile evinize kira biçebilir misiniz?',
  summary: 'TCMB’nin kira endeksini okuyun, mahalle emsallerini doğrulayın ve daha yüksek kira için beklemenin maliyetini hesaplayın.',
  publishedAt: '2026-11-15',
  updatedAt: '2026-11-15',
  body: [
    'Bir ev sahibinin elinde bugün başlayacak 24.000 TL’lik kira teklifi var. 27.000 TL için iki ay beklerse ilk yıl daha az tahsil edebilir. TCMB’nin Yeni Kiracı Kira Endeksi, kiralık konut piyasasının yönünü okumaya yarar. Hangi teklifi değerlendireceğinizi ise benzer konutların bedeli, başlangıç tarihi ve ilk yıl elde kalacak tutar birlikte belirler.'
  ]
} as const;

export const newTenantRentGuideSections = [
  {
    heading: 'TCMB bültenindeki üç rakamı ayrı okuyun',
    paragraphs: [
      'TCMB’nin Eylül 2026 bülteninde Türkiye geneli Yeni Kiracı Kira Endeksi (YKKE), 2023 ortalaması 100 kabul edildiğinde 342,9 puan. Endeks ağustosa göre %2,1, Eylül 2025’e göre nominal olarak %26,6 arttı. TÜFE ile düzeltildiğinde yıllık değişim −%2,4 oldu. Farklı karşılaştırma dönemleri olan bu değerleri aynı kira tutarına peş peşe uygulamayın.',
      'Aynı bültende nominal yıllık değişim İstanbul’da %35,5, Ankara’da %25,1 ve İzmir’de %23,7. Bu oranlar ilgili coğrafyanın eğilimini gösterir. TCMB, bankalardan sağlanan değerleme raporlarındaki tahmini kira bedellerini kullanır ve konut özelliklerinin etkisini istatistiksel olarak ayrıştırır. Endeks puanı TL cinsinden bir kira düzeyi vermez. Bir dairenin kira teklifini değerlendirmek için binaya ve mahalleye özgü emsalleri kullanın.',
      'TCMB ayrıca yeterli örneğin bulunduğu iller için ayrı bir çeyreklik birim kira göstergesi yayımlar. Birim kira TL/m² cinsinden bir değerleme göstergesidir. İl düzeyinde bir kontrol noktası olarak kullanın ve karşılaştırdığınız dairenin alan tanımını, veri çeyreğini ve konumunu kaydedin. Mahalle için bilgi eksikse il göstergesiyle o boşluğu doldurmak yerine emsal araştırmasına devam edin.'
    ]
  },
  {
    heading: 'Yeni kiralama ile sözleşme yenilemesini ayırın',
    paragraphs: [
      'Boş konut için YKKE’yi piyasanın yönünü okumakta kullanabilirsiniz. Mevcut sözleşmenin yenilenmesinde Türk Borçlar Kanunu’nun 344. maddesi, tarafların artış anlaşması için TÜFE’nin on iki aylık ortalamalara göre değişimini üst sınır olarak düzenler. Başlangıç tarihini, sözleşmenin hükmünü ve ilgili TÜİK bültenini dosyanıza ekleyin. YKKE’deki yıllık değişimi bu satıra yazmayın.',
      'Beş yıldan uzun süreli veya beş yıldan sonra yenilenen sözleşmelerde ve sonraki her beş yılın sonunda, hâkimin kira belirlemesinde konutun durumu ve emsal kira bedelleri de dikkate alınır. Bu durumda sözleşme tarihini ve emsalleri belgeleyin. Tek bir endeks oranıyla sonuç varsaymayın.'
    ]
  },
  {
    heading: 'Karşılaştırılabilir üç konut için aynı bilgileri isteyin',
    paragraphs: [
      'Önce aynı bina ya da yakın çevrede aynı oda sayısı, benzer net alan, bina yaşı ve ısınma türüne sahip konutları seçin. Eşyalı daireyi ayrı işaretleyin. Her kayıt için gözlem tarihi, istenen kira, aidat, taşınmaya uygun ilk gün ve varsa doğrulanabilen imzalı kira tutarını yazın. Aynı konut farklı yerlerde ilan edilmişse tek emsal olarak sayın.',
      'Örneğin üç ilanın istenen kiraları 24.000, 26.000 ve 28.000 TL olsun. 26.000 TL’lik ortanca, bu üç ilanın talep ettiği tutarların ortasındaki değerdir. Eğer 28.000 TL’lik daire eşyalı ve yüksek aidatlıysa boş ve eşyasız daire için fiyat dayanağını zorlamayın. Yerine daha benzer bir konut arayın veya o gözlemi ayrı tutun. Teklifleri incelerken aylık kira ve aidatı ayrı sütunlarda gösterin.'
    ]
  },
  {
    heading: 'Daha yüksek kira, kaç ay boş kalırsa avantajını kaybeder?',
    paragraphs: [
      'İlk 12 ayı bugünden başlatın. Örnek A’da 24.000 TL’lik kira hemen başlıyor ve 12 ay tahsil ediliyor. Toplam 288.000 TL. Örnek B’de 27.000 TL için iki ay bekleniyor, ardından 10 ay tahsil ediliyor ve yeni kiracıya hazırlık için fazladan 6.000 TL harcanıyor. Vergi ve iki seçenekte ortak giderler hariç elde kalan tutar 264.000 TL. İki ay bekleme senaryosu, ilk yıl 24.000 TL daha az bırakıyor.',
      'Bekleme eşiğini bulmak için ilk teklifin yıllık tahsilatına 6.000 TL ekleyin ve 27.000 TL’ye bölün. 294.000 ÷ 27.000 ≈ 10,89 ay tahsilat gerekiyor. Tam ay üzerinden 11 ay tahsilat, bir ay boşlukla 291.000 TL bırakır. Aynı kira düzeyinde ikinci boş ay sonucu tersine çevirir.',
      'Bütçenize karar vermeden önce aidatın boş aylarda kime düşeceğini, hazırlık masrafını ve kiranın başlayacağı günü yazılı teyit edin. 6.000 TL’yi yalnızca beklemeli seçeneğe özgüyse o seçeneğe ekleyin. Bir ay sonunda uygun bir teklif çıkmazsa o gün eldeki teklifleri ve kalan tahsilat aylarını yeniden karşılaştırın.'
    ]
  }
];

export const newTenantRentGuideEvidence = {
  takeaways: [
    'Endeks puanını, aylık değişimi ve yıllık değişimi kendi birimleriyle okuyun.',
    'Kira teklifini, boş ayları ve seçeneğe özgü giderleri bugünden başlayan aynı 12 aylık dönemde karşılaştırın.'
  ],
  sources: [
    {
      label: 'TCMB · Konut Fiyat Endeksi ve Yeni Kiracı Kira Endeksi',
      url: 'https://www.tcmb.gov.tr/wps/wcm/connect/8bbac42a-c854-4c58-8b0c-e7e55c35ec2d/KFE.pdf?MOD=AJPERES',
      scope: 'Eylül 2026 bülteni, Tablo 2. Türkiye geneli ve üç büyük il için endeks puanı (2023=100), aylık ve yıllık yüzde değişimler.'
    },
    {
      label: 'TCMB · Yeni Kiracı Kira Endeksi hesaplama yöntemi',
      url: 'https://tcmb.gov.tr/wps/wcm/connect/blog/tr/main%20menu/analizler/kiralar%20icin%20yeni%20bir%20gosterge%20yeni%20kiraci%20kira%20endeksi',
      scope: 'Şubat 2026. Banka değerleme raporları, kalite etkisinin ayrıştırılması ve çeyreklik il bazlı birim kira göstergesi.'
    },
    {
      label: 'Adalet Bakanlığı · Türk Borçlar Kanunu',
      url: 'https://mevzuat.adalet.gov.tr/mevzuat/103273?query=6098',
      scope: '6098 sayılı Kanun, madde 344. Yenilenen kira döneminde artış ve beş yıllık dönemlerde kira bedelinin belirlenmesi.'
    }
  ]
};

export const newTenantRentGuideWorkbook = {
  question: 'Piyasa göstergesi, benzer konutların teklifleri ve ilk yıl tahsilatı aynı kararı destekliyor mu?',
  deliverable: 'Tarih ve konum bilgisi taşıyan emsal listesi, sözleşme kontrolü ve bekleme eşiği hesabı.',
  rows: [
    {
      finding: 'Bölgedeki yıllık YKKE değişimi açıklandı.',
      evidence: 'TCMB bülteni, veri ayı, coğrafya ve değişim birimi.',
      action: 'Piyasa eğilimini kaydedin. TL bazındaki karar için aynı çevreden karşılaştırılabilir konutları toplayın.'
    },
    {
      finding: 'Konutta hâlihazırda kiracı var.',
      evidence: 'Kira sözleşmesi, yenileme tarihi ve ilgili TÜİK bülteni.',
      action: 'Sözleşme yenilemesi için geçerli hükmü ve uygulanacak ölçüyü kontrol edin.'
    },
    {
      finding: 'Daha yüksek teklif için konut boş tutulacak.',
      evidence: 'İki teklifin aylık kirası, başlangıç tarihi ve ek giderleri.',
      action: 'Her teklifin 12 aylık tahsilatını hesaplayın. Bekleme kaç ayı bulduğunda sonucun değiştiğini işaretleyin.'
    }
  ]
};
