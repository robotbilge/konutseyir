# KonutSeyir İlan Analizi

Bu Manifest V3 eklenti, açık Sahibinden, Hepsiemlak veya Emlakjet ilanından kullanıcı tıklamasıyla erişilebilen verileri okur. Çalıştırılabilir kod uzaktan indirilmez; \`/api/selectors\` yalnızca CSS seçicilerden oluşan yapılandırma döndürür.

## Yerel kurulum

1. Chrome'da \`chrome://extensions\` sayfasını açın.
2. Geliştirici modunu etkinleştirin.
3. **Paketlenmemiş öğe yükle** seçeneğiyle bu klasörü (\`extension/\`) seçin.
4. Desteklenen bir ilan detay sayfasını açın, eklenti simgesini seçin ve **Bu ilanı analiz et** düğmesine basın.

## Veri sınırı

İlk sürüm JSON-LD yapılandırılmış verisini kullanır. Sağlayıcıya özgü seçiciler başlangıçta boştur; canlı sayfalarda doğrulanmamış seçici tahmini eklenmez. Eşleşen alanlar \`worker/listing-analyzer.mjs\` içindeki \`selectorConfig\` üzerinden tanımlanıp Worker yeniden yayımlandığında eklentiyi güncellemek gerekmez. Bölge m² referansı bulunmadığında fiyat etiketi üretilmez.
