import {readFile,writeFile,chmod} from 'node:fs/promises';import {randomBytes} from 'node:crypto';
const url=new URL('../.env',import.meta.url);let text;
try{text=await readFile(url,'utf8');}catch(e){if(e.code!=='ENOENT')throw e;text=await readFile(new URL('../.env.example',import.meta.url),'utf8');}
if(!/^AFMD_ACCESS_TOKEN=.+$/m.test(text)){const line='AFMD_ACCESS_TOKEN='+randomBytes(32).toString('hex');text=/^AFMD_ACCESS_TOKEN=$/m.test(text)?text.replace(/^AFMD_ACCESS_TOKEN=$/m,line):text+'\n'+line+'\n';await writeFile(url,text,{mode:0o600});await chmod(url,0o600);console.log('Código de acesso criado no arquivo .env. Guarde esse arquivo no servidor, fora do Git.');}else console.log('Código existente preservado; nenhuma credencial foi substituída.');
console.log('Configure AFMD_AI_KEY com segurança no servidor. Não compartilhe chaves no chat.');
