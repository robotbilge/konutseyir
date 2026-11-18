import {readFile} from 'node:fs/promises';

const source=await readFile(process.argv[2],'utf8');
for(const block of source.matchAll(/<structure:Dataflow\b[\s\S]*?<\/structure:Dataflow>/g)){
  const id=block[0].match(/\bid="([^"]+)"/)?.[1]||'';
  const names=[...block[0].matchAll(/<common:Name[^>]*>([^<]+)<\/common:Name>/g)].map(match=>match[1]);
  if(names.some(name=>/konut|satış|ilçe/i.test(name)))console.log('TÜİK dataflow adayı:',id,names.join(' | '));
}
