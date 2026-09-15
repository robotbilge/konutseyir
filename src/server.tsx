import {renderToString} from 'react-dom/server';
import {page,paths,meta} from './routes';
export {paths,meta};
export async function render(path:string){return renderToString(await page(path))}
