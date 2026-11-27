import {ArrowUpRight} from 'lucide-react';
import {guidesByPublication, publicationDate} from '../lib/guide-publication-order';

const dateFormat = new Intl.DateTimeFormat('tr-TR', {
  dateStyle: 'medium',
  timeZone: 'Europe/Istanbul',
});

function articleVisual(guide: (typeof guidesByPublication)[number]) {
  const searchText = `${guide.title} ${guide.summary}`.toLocaleLowerCase('tr-TR');
  if (/tapu|ipotek|vergi|borç|miras|önalım|iskan|kat mülkiyeti|teminat|evrak|belge/.test(searchText)) {
    return {
      src: '/images/articles/home-documents.jpg',
      alt: 'Konut alımındaki belge kontrolünü temsil eden evrak ve ev anahtarı',
    };
  }
  if (/kira|kiracı|kiralama|depozito|kredi|faiz|getiri|hesap|mevduat|bütçe|maliyet|taksit/.test(searchText)) {
    return {
      src: '/images/articles/housing-budget.jpg',
      alt: 'Konut bütçesi ve finansman planlamasını temsil eden hesap makinesi ve anahtar',
    };
  }
  return {
    src: '/images/articles/housing-market.jpg',
    alt: 'Konut piyasası makalesini temsil eden şehir içi konutlar',
  };
}

const latestArticles = guidesByPublication
  .map(guide => ({guide, date: publicationDate(guide)}))
  .filter(({date}) => Number.isFinite(Date.parse(date)))
  .slice(0, 3);

export function LatestArticles() {
  return (
    <section className="latest-news latest-articles" aria-labelledby="latest-articles-title">
      <header>
        <div>
          <p className="eyebrow">MAKALELER</p>
          <h2 id="latest-articles-title">Konut gündemindeki son yazılar</h2>
        </div>
        <a href="/rehber/">Tüm makaleler <ArrowUpRight aria-hidden="true"/></a>
      </header>
      <div className="latest-article-grid">
        {latestArticles.map(({guide, date}, index) => {
          const visual = articleVisual(guide);
          return (
            <article key={guide.slug}>
              <div className="latest-article-image">
                <img
                  src={visual.src}
                  alt={visual.alt}
                  width="1200"
                  height="720"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  decoding="async"
                />
              </div>
              <div className="latest-article-copy">
                <small><time dateTime={date}>{dateFormat.format(new Date(date))}</time> · KonutSeyir</small>
                <h3><a href={`/rehber/${guide.slug}/`}>{guide.title}</a></h3>
                <p>{guide.summary}</p>
                <a className="latest-article-read" href={`/rehber/${guide.slug}/`}>Makaleyi oku <ArrowUpRight aria-hidden="true"/></a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
