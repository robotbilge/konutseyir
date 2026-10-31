// Detail URLs remain crawlable so search engines can read the noindex response.
export function isNewsDetailPath(pathname){
 const path=pathname.replace(/\/+$/,'')||'/';
 return path.startsWith('/haberler/')&&path!=='/haberler/index.html';
}
