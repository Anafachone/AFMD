import {cp,readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');const ext=path.join(root,'extension');
await mkdir(ext,{recursive:true});
for(const name of ['app.js','service-client.js','model.js','style.css','fonts','icon.png'])await cp(path.join(root,'public',name),path.join(ext,name),{recursive:true});
const html=(await readFile(path.join(root,'public/index.html'),'utf8')).replaceAll('href="/','href="./').replaceAll('src="/','src="./').replace('<link rel="manifest" href="./manifest.webmanifest">','');
await writeFile(path.join(ext,'dashboard.html'),html);
console.log('Painel e fontes locais incluídos em extension/.');
