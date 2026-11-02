export function validateConnection(input){
 let url;try{url=new URL(input.url);}catch{throw new Error('Informe um endereço válido para o serviço.');}if(url.username||url.password||url.search||url.hash)throw new Error('Use o endereço do serviço sem senha, parâmetros ou fragmentos.');
 if(url.protocol!=='https:'&&!(url.protocol==='http:'&&['localhost','127.0.0.1'].includes(url.hostname)))throw new Error('O serviço precisa usar HTTPS. HTTP só é aceito no próprio computador.');
 if(!input.token||input.token.length<32)throw new Error('Informe o código de acesso do serviço (mínimo 32 caracteres).');
 return {url:url.href.replace(/\/$/,''),token:input.token};
}
export function createServiceClient({getConnection,fetchImpl=fetch}){
 return {async request(route,options={}){
  if(!['/api/status','/api/transcribe','/api/generate'].includes(route))throw new Error('Operação não permitida.');
  const stored=await getConnection();if(!stored)throw new Error('Serviço de IA ainda não conectado. Abra Configurações → Conectar serviço seguro.');
  const connection=validateConnection(stored);let response;
  try{response=await fetchImpl(connection.url+route,{...options,headers:{...options.headers,Authorization:`Bearer ${connection.token}`},redirect:'error',cache:'no-store',signal:AbortSignal.timeout(180000)});}catch{throw new Error('Não foi possível conectar ao serviço seguro. Confira o endereço, sua conexão e a permissão de acesso.');}
  let data;try{data=await response.json();}catch{throw new Error('O endereço informado não respondeu como serviço AFMD.');}
  if(!response.ok){const errors={401:'Código de acesso recusado. Confira a conexão em Configurações.',403:'Este navegador não tem permissão para acessar o serviço.',429:'Limite temporário de solicitações atingido. Aguarde um minuto.'};throw new Error(errors[response.status]||data.error||'O serviço não concluiu a solicitação.');}
  if(route==='/api/status'&&data.service!=='afmd-transcricoes')throw new Error('O endereço informado não é um serviço AFMD compatível.');
  return data;
 }};
}
