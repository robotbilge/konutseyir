import {randomInt} from 'node:crypto';
import {randomGuidePublicationAt} from '../lib/guide-publication.mjs';

// Explicit local calendar day; use the result in a real scheduler, never sleep for hours.
const day=process.argv[2];
if(!day)throw Error('Usage: node scripts/guide-publication-time.mjs YYYY-MM-DD');
console.log(JSON.stringify({timezone:'Europe/Istanbul',publishAt:randomGuidePublicationAt(day,randomInt)}));
