import {guides} from './content';

export const publicationDate = (guide: (typeof guides)[number]) =>
 'publishedAt' in guide && typeof guide.publishedAt === 'string' ? guide.publishedAt : '';

export const guidesByPublication = [...guides].sort((a, b) =>
 (Date.parse(publicationDate(b)) || 0) - (Date.parse(publicationDate(a)) || 0));
