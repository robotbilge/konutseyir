// All news URLs stay crawlable so search engines can read noindex.
export function isNewsListPath(pathname){
 return /^\/haberler(?:\/|\.html|\/index\.html)?$/.test(pathname);
}
export function isNewsPath(pathname){
 return isNewsListPath(pathname)||isNewsDetailPath(pathname);
}
export function isNewsDetailPath(pathname){
 const path=pathname.replace(/\/+$/,'')||'/';
 return path.startsWith('/haberler/')&&path!=='/haberler/index.html';
}
