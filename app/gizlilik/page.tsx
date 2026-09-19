import {InfoPage} from '../../components/info-page';

export default function Privacy(){
 return <InfoPage eyebrow="GİZLİLİK" title="Verileriniz nasıl kullanılır?">
  <p>Hesaplayıcıya girilen tutarlar ve kontrol listesi seçimleri tarayıcı belleğinde işlenir; sunucuya gönderilmez. Sayfa yenilendiğinde sıfırlanır. Kullanıcı hesabı veya kişisel ilan kaydı oluşturulmaz.</p>
  <p>Veri sayfası kamu verilerini almak için KonutSeyir API’sine istek gönderir. Sunucu veri tabanında kamuya açık ekonomik gözlemler ve veri çekim zamanları saklanır.</p>
  <p>Emlak haberi bildirimi yalnızca açık izninizle etkinleşir. Bildirim aboneliğinin teknik uç noktası ve şifreleme anahtarları bildirim göndermek için saklanır; bildirimleri kapattığınızda abonelik kaydı silinir. Haberlerde başlık, kısa özet, yayın tarihi ve özgün kaynak bağlantısı tutulur.</p>
  <p>Barındırma sağlayıcısı Cloudflare, istekleri işlerken IP adresi ve teknik erişim kayıtlarını güvenlik ve hizmet sunumu amacıyla işleyebilir. Ayrıntılar için <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare gizlilik politikasına</a> bakın.</p>
  <p>Bu sürümün kodunda reklam, davranışsal takip, analiz çerezi veya üçüncü taraf takip etiketi bulunmaz. Bunlar eklendiğinde bu açıklama ve gerekli tercih mekanizmaları güncellenmelidir.</p>
  <p>Yazdırma/PDF dosyasını kullanıcı kendi cihazında oluşturur. Resmî kaynak bağlantılarına gittiğinizde ilgili sitenin koşulları geçerlidir. İletişim bilgileri <a href="/iletisim">iletişim sayfasındadır</a>.</p>
 </InfoPage>
}
