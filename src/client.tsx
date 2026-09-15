import {hydrateRoot} from 'react-dom/client';
import {page} from './routes';
import '../app/globals.css';
import '../app/extended.css';
import '../app/audit.css';
import '../app/legal.css';
import './style.css';
page(location.pathname).then(element=>hydrateRoot(document.getElementById('root')!,element));
