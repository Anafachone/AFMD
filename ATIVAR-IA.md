# Ativar a IA do AFMD Transcrições

**Estado atual:** código da conexão implementado e testado com provedor simulado. Não existe uma API publicada nem uma chave de provedor configurada. Só reinstalar a extensão não ativa a transcrição.

## 1. Conta de API

Acesse https://platform.openai.com/ com sua conta. A API possui cobrança separada da assinatura do ChatGPT. Confira a área de Billing da plataforma antes de criar uma chave. Não envie essa chave no chat e não a cole na extensão.

## 2. Serviço na hospedagem

O Registro.br registra o domínio e permite configurar DNS; não hospeda este processo Node. O arquivo `render.yaml` prepara uma opção de instalação na Render usando `plan: free`, sem deploy automático. Não cria uma conta nem contrata/pública serviços sozinho. A disponibilidade e condições do plano precisam ser confirmadas na tela da plataforma antes de criar o serviço. Em planos com suspensão por inatividade, a primeira solicitação pode demorar.

A ativação exige que você conecte sua conta GitHub à hospedagem e autorize o acesso ao repositório Anafachone/AFMD. A chave OpenAI será informada **somente no campo secreto AFMD_AI_KEY da hospedagem**. O código AFMD_ACCESS_TOKEN é gerado pela plataforma e deve ser guardado com segurança; ele é diferente da chave OpenAI.

Não compartilhe senha de hospedagem, GitHub, chave de IA ou códigos de acesso pelo chat. Esta sessão não tem uma integração autenticada com Render ou Registro.br para criar o serviço ou editar o DNS por você.

## 3. Endereço do serviço

A hospedagem fornece um endereço HTTPS para o serviço depois de uma implantação bem-sucedida. Podemos testar primeiro esse endereço. O subdomínio api.afmd.com.br é opcional; só configure DNS e domínio personalizado depois de conhecer o destino real fornecido pela hospedagem. Nenhum destino DNS foi inventado ou configurado aqui.

## 4. Conectar e testar

Na extensão 0.3, abra Configurações → Serviço seguro de IA. Informe o endereço HTTPS e o código de acesso AFMD do serviço, não a chave OpenAI. Clique em Conectar serviço seguro.

Grave uma fala curta e clique em Encerrar e transcrever. A transcrição desta versão ocorre após encerrar a gravação. Se houver erro, o áudio permanece disponível para ouvir, baixar e tentar novamente. Resumo e ata usam o mesmo serviço autenticado.

Leia SERVICE-SETUP.md para os limites e controles implementados. Ainda são necessárias validações com a conta real de API, Chrome instalado, Safari/iPhone e Meet real. O teste de microfone automatizado usa áudio sintético e uma resposta de provedor simulada, sem enviar áudio pessoal e sem gerar cobrança de API.
