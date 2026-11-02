import {pipeline,env} from '@huggingface/transformers';
env.allowLocalModels=false;
env.useBrowserCache=true;
env.backends.onnx.wasm.wasmPaths=new URL('./runtime/',self.location.href).href;
env.backends.onnx.wasm.numThreads=1;
env.backends.onnx.wasm.proxy=false;
const originalFetch=self.fetch.bind(self);
self.fetch=(input,options={})=>{
 const address=new URL(typeof input==='string'?input:(input instanceof URL?input.href:input.url),self.location.href);
 const method=options.method||input.method||'GET';
 const remote=address.protocol!==self.location.protocol||address.host!==self.location.host;
 const allowed=address.hostname==='huggingface.co'||address.hostname.endsWith('.huggingface.co')||address.hostname.endsWith('.hf.co');
 if(remote&&(!allowed||!['GET','HEAD'].includes(method.toUpperCase())))throw new Error('Conexão externa não permitida. O áudio deve permanecer local.');
 return originalFetch(input,options);
};
let loading=null,recognizer=null,busy=false;
async function prepare(){
 if(recognizer)return;
 if(!loading)loading=pipeline('automatic-speech-recognition','Xenova/whisper-tiny',{
  device:'wasm',dtype:'q8',progress_callback:progress=>self.postMessage({type:'progress',progress})
 }).then(value=>{recognizer=value;}).catch(error=>{loading=null;throw error;});
 await loading;
}
self.onmessage=async({data})=>{
 if(busy){self.postMessage({type:'error',id:data.id,message:'Aguarde o processamento em andamento.'});return;}
 busy=true;
 try{
  await prepare();
  if(data.type==='prepare'){self.postMessage({type:'ready',id:data.id});return;}
  if(data.type!=='transcribe')throw new Error('Operação inválida.');
  const audio=new Float32Array(data.audio);
  if(!audio.length||audio.length>16000*600)throw new Error('Use um áudio com até 10 minutos.');
  let energy=0;for(const value of audio){if(!Number.isFinite(value))throw new Error('Áudio inválido.');energy+=value*value;}
  if(Math.sqrt(energy/audio.length)<0.0001)throw new Error('O áudio parece estar silencioso. Confira o microfone e tente novamente.');
  const result=await recognizer(audio,{language:data.language==='english'?'english':'portuguese',task:'transcribe',chunk_length_s:30,stride_length_s:5});
  if(!result?.text?.trim())throw new Error('Nenhuma fala foi reconhecida neste áudio.');
  self.postMessage({type:'result',id:data.id,text:result.text.trim()});
 }catch(error){self.postMessage({type:'error',id:data.id,message:error.message||'Falha no reconhecimento local.'});}finally{busy=false;}
};
