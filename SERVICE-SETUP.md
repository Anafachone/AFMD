# Ativação do serviço privado de transcrição

A versão 0.3 conecta a extensão a uma API privada AFMD. Não existe um serviço publicado ou credencial de IA provisionada automaticamente. Sem essas duas condições, a gravação continua disponível, mas não produz transcrição. Não reinstale o app esperando que a conta de API seja criada por isso.

## No servidor

Requer Node 24+, acesso HTTPS de saída para `api.openai.com` e um domínio HTTPS para a extensão. Uma assinatura do ChatGPT não inclui crédito de API.

1. Obtenha acesso a um servidor ou hospedagem capaz de executar Node continuamente.
2. Execute `node scripts/init-service.mjs`. Cria `.env` e um código aleatório de acesso de 256 bits se não existir; preserva credenciais já presentes. Não imprime o código.
3. Configure `AFMD_AI_KEY` pelo gerenciador seguro da hospedagem ou no `.env` privado do servidor. O código `AFMD_ACCESS_TOKEN` deve ter pelo menos 32 caracteres. Nenhum valor real deve ir ao Git, ZIP, logs ou chat.
4. Execute `npm start`. Por padrão, escuta apenas `127.0.0.1:4173`. Use um serviço de processo da hospedagem para mantê-lo ativo.
5. Encaminhe o domínio HTTPS ao processo local por reverse proxy. Não publique a porta HTTP diretamente. Configure um limite de corpo no proxy de pelo menos 25 MB e timeout de 190 segundos.
6. Opcionalmente restrinja `AFMD_EXTENSION_ID` ao ID da instalação Chrome permitida. Sem essa opção, origens Chrome Extension válidas ainda precisam apresentar o código secreto de acesso.

Não existe autenticação por usuário, cobrança por cliente, gestão de contas ou uma arquitetura multicliente nesta versão. É uma instalação privada. Revogue o código trocando `AFMD_ACCESS_TOKEN` no servidor e reiniciando o processo.

## No painel AFMD

1. Abra Configurações e informe o endereço HTTPS e o **código de acesso do serviço**, que é diferente da chave OpenAI.
2. Clique em Conectar serviço seguro e autorize somente o domínio escolhido na solicitação do Chrome.
3. O painel verifica identidade do serviço e autenticação. Sem chave de IA no servidor, informa a condição e não afirma que pode transcrever.
4. Grave com a ciência dos participantes. Clique em Encerrar e transcrever. A transcrição desta versão ocorre **após encerrar**, não em streaming ao vivo.
5. Se a rede ou a IA falhar, o áudio continua disponível na tela para ouvir, baixar e tentar transcrever novamente. O áudio não fica salvo no histórico.

O código de acesso fica no Chrome Storage Session da extensão (ou Session Storage na versão web), nunca no localStorage de transcrições e nunca no backup. Ele permanece acessível ao dono do navegador e não substitui segurança física do dispositivo.

## Controles implementados

- Chave do provedor exclusiva do processo servidor; a extensão não recebe essa chave.
- HTTPS exigido no cliente; HTTP permitido apenas no loopback para desenvolvimento.
- Código de acesso obrigatório e comparação por digest de tamanho fixo.
- Origens de sites alheios recusadas; opção de restringir a um ID de extensão.
- Solicitações sem autenticação recusadas antes de ler o áudio.
- Limites de áudio de 24 MB, texto de 100 mil caracteres, 12 operações por minuto e 2 operações simultâneas por processo.
- Timeout das chamadas externas, URL fixa do provedor, redirecionamentos recusados e erros sem conteúdo sensível.
- Sem persistência de áudio/transcrição no servidor por este código. O provedor tem sua própria política de tratamento/retenção.

Os limites por processo pressupõem uma única instância privada. Uma instalação distribuída requer rate limit compartilhado, gestão de usuários, monitoramento e revisão de segurança próprios. Os testes usam um provedor simulado; acurácia e autorização reais ainda precisam ser verificadas com uma conta de API válida.
