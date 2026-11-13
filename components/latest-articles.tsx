import {ArrowUpRight, FileText} from 'lucide-react';
import {guidesByPublication, publicationDate} from '../lib/guide-publication-order';

const dateFormat = new Intl.DateTimeFormat('tr-TR', {
  dateStyle: 'medium',
  timeZone: 'Europe/Istanbul',
});

const latestArticles = guidesByPublication
  .map(guide => ({guide, date: publicationDate(guide)}))
  .filter(({date}) => Number.isFinite(Date.parse(date)))
  .slice(0, 3);

export function LatestArticles() {
  return (
    <section className="latest-news latest-articles" aria-labelledby="latest-articles-title">
      <header>
        <h2 id="latest-articles-title">Son Yayınlanan Makaleler</h2>
        <a href="/rehber/">Tüm makaleler <ArrowUpRight aria-hidden="true"/></a>
      </header>
      <div>
        {latestArticles.map(({guide, date}) => (
          <article key={guide.slug}>
            <FileText aria-hidden="true"/>
            <span>KonutSeyir Makaleleri</span>
            <h3><a href={`/rehber/${guide.slug}/`}>{guide.title}</a></h3>
            <small><time dateTime={date}>{dateFormat.format(new Date(date))}</time></small>
          </article>
        ))}
      </div>
    </section>
  );
}
