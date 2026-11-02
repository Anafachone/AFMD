import {build} from 'esbuild';
import {cp,readFile,writeFile,mkdir,readdir,rm} from 'node:fs/promises';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');const publicDir=path.join(root,'public');const ext=path.join(root,'extension');
await mkdir(path.join(publicDir,'runtime'),{recursive:true});await mkdir(path.join(publicDir,'licenses'),{recursive:true});
await build({entryPoints:[path.join(root,'src/transcriber.worker.js')],outfile:path.join(publicDir,'transcriber.worker.js'),bundle:true,format:'esm',platform:'browser',target:'chrome120',minify:true,legalComments:'eof'});
for(const name of await readdir(path.join(root,'node_modules/onnxruntime-web/dist'))){if(/^ort-wasm-simd-threaded(?:\.jsep)?\.(?:wasm|mjs)$/.test(name))await cp(path.join(root,'node_modules/onnxruntime-web/dist',name),path.join(publicDir,'runtime',name));}
await cp(path.join(root,'node_modules/@huggingface/transformers/LICENSE'),path.join(publicDir,'licenses/transformers.txt'));
const ortLicense=await readFile(path.join(root,'node_modules/onnxruntime-web/package.json'),'utf8');await writeFile(path.join(publicDir,'licenses/onnxruntime-source.txt'),'ONNX Runtime Web. MIT license. Source: https://github.com/microsoft/onnxruntime\nVersion: '+JSON.parse(ortLicense).version+'\n');
for(const name of ['app.js','style.css','fonts','icon.png','runtime','licenses','transcriber.worker.js'])await cp(path.join(publicDir,name),path.join(ext,name),{recursive:true});
await writeFile(path.join(ext,'dashboard.html'),await readFile(path.join(publicDir,'index.html'),'utf8'));
for(const name of ['service-client.js','model.js','captions.js','popup.js','popup.html','popup.css'])await rm(path.join(ext,name),{force:true});
console.log('Versão local simples: código e WASM incluídos, sem API paga. Modelo baixado sob demanda.');
