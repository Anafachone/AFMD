export function normalize(text=''){return text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
export function classify(meeting,clients){
 const title=normalize(meeting.title);const metadata=normalize([meeting.title,...(meeting.participants||[]),...(meeting.emails||[])].join(' '));
 const scored=clients.map(client=>{const terms=[client.name,...(client.aliases||[])].map(normalize).map(s=>s.trim()).filter(s=>s.length>=3);const score=terms.reduce((n,term)=>n+(title.includes(term)?5:metadata.includes(term)?3:0),0);return {id:client.id,score};}).filter(x=>x.score>=3).sort((a,b)=>b.score-a.score);
 if(scored.length!==1)return null;
 return scored[0].id;
}
export function parseImport(raw,filename){
 if(filename.toLowerCase().endsWith('.json')){const data=JSON.parse(raw);if(data.format!=='afmd-meet-v1'||!Array.isArray(data.segments))throw new Error('Selecione uma exportação do AFMD Meet.');const text=data.segments.filter(s=>s&&typeof s.text==='string').map(s=>`[${String(s.time||'')}] ${String(s.speaker||'Participante não identificado')}: ${s.text}`).join('\n');if(!text.trim())throw new Error('A exportação não contém falas.');return {title:String(data.title||'Reunião importada'),text,participants:[...new Set(data.segments.map(s=>String(s.speaker||'Participante não identificado')))],source:'Google Meet · legendas'};}
 if(!raw.trim())throw new Error('O arquivo está vazio.');return {title:filename.replace(/\.[^.]+$/,''),text:raw,participants:[],source:'Texto importado'};
}
