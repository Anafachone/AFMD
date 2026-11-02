# AFMD Transcrições

## Baixar e instalar no Chrome

**[Baixar extensão AFMD 0.3.0 (.zip)](https://github.com/Anafachone/AFMD/raw/refs/heads/main/afmd-chrome.zip)**

Extraia o ZIP, abra `chrome://extensions`, ative **Modo do desenvolvedor**, clique em **Carregar sem compactação** e escolha a pasta **AFMD-Transcricoes** que contém `manifest.json`. Confirme o nome **AFMD Transcrições**, versão **0.3.0**. Clique no ícone da extensão e em **Abrir painel AFMD**.

A extensão inclui o painel e uma conexão configurável com API privada. A ativação exige servidor HTTPS e credencial própria de IA; instalar o ZIP sozinho não ativa o processamento. Consulte [SERVICE-SETUP.md](SERVICE-SETUP.md). A captura de legendas do Meet permanece experimental.

Versão 0.3.0: painel AFMD embarcado na própria extensão Chrome, versão web responsiva para iPhone e coleta experimental de legendas do Google Meet. O serviço de IA exige servidor HTTPS, credencial de provedor e código de acesso próprio; consulte SERVICE-SETUP.md para ativar a conexão.

## Executar

Node.js 24 ou superior, sem dependências npm de produção:

```sh
node scripts/init-service.mjs
npm run dev
```

O servidor escuta em `127.0.0.1:4173` por padrão. `npm test` executa testes de importação, cliente da API e autenticação/limites do servidor; os testes do servidor abrem uma porta local temporária. `node tests/browser.mjs` executa os fluxos de navegador se Playwright e Chromium estiverem disponíveis.

Para transcrever áudio e gerar documentos, configure `AFMD_AI_KEY` e `AFMD_ACCESS_TOKEN` no servidor e conecte o painel em Configurações. A ativação está detalhada em [SERVICE-SETUP.md](SERVICE-SETUP.md). A chave permanece no servidor. São usados os endpoints HTTPS `api.openai.com/v1/audio/transcriptions` (gpt-4o-transcribe) e `api.openai.com/v1/chat/completions` (gpt-4o-mini). O ambiente precisa permitir api.openai.com; nenhuma chave é necessária para texto importado, edição, pastas e exportação. Não há resultado fictício quando a IA está indisponível. Limite de arquivo: 24 MB; texto enviado à geração: 100 mil caracteres. Serviço pago conforme uso do provedor.

## iPhone

É uma aplicação web instalável (PWA), não um aplicativo da App Store. Hospede em HTTPS sob controle de acesso e abra no Safari; Compartilhar → Adicionar à Tela de Início. Não existe URL pública provisionada neste repositório. Para desenvolvimento em outro dispositivo, um servidor HTTPS/reverse proxy precisa encaminhar para a porta local. Se necessário, `HOST=0.0.0.0` permite acesso pela rede, mas não exponha este servidor sem autenticação, TLS e limites de uso.

Pode gravar o microfone com permissão enquanto a tela permanece aberta, importar arquivos, consultar transcrições e gerar documentos. Não captura o áudio de chamadas do Meet/WhatsApp em outros aplicativos do iPhone. Suspensão ou bloqueio de tela pode interromper a gravação. Baixe o áudio ao encerrar: ele só permanece na memória da sessão e não é guardado com o histórico. O shell instalado pode abrir offline depois da primeira visita; IA exige conexão.

## Chrome / Meet

1. Execute `npm run build:extension` para copiar o painel, fontes e ícone para a pasta `extension`. Abra `chrome://extensions`, ative o modo de desenvolvedor e carregue essa pasta. O nome deve ser **AFMD Transcrições**, versão **0.3.0**. A instalação abre o painel em uma aba; o botão “Abrir painel AFMD” também está disponível na janela da extensão.
2. Entre em uma reunião em `meet.google.com`, informe os participantes e ative as legendas.
3. Abra a extensão, clique em Iniciar e depois Encerrar.
4. O painel embarcado importa automaticamente capturas concluídas, sem duplicá-las. Atribui a pasta quando há uma única associação de cliente. A exportação JSON continua disponível para usar na versão web ou guardar uma cópia.

A captura usa elementos de legendas com `data-message-text` e nomes quando presentes em `data-participant-name`. Esses atributos não são API oficial: o layout atual do Meet pode não fornecê-los. Esta integração é experimental, validada apenas com fixture de DOM; **não validada em uma reunião real**. Exibe contagem zero sem fabricar falas quando não encontra legendas. Não há reconhecimento biométrico, identificação garantida em falas simultâneas, nem captura direta do áudio da aba. A captura deve ser encerrada antes da exportação. Os trechos ficam no armazenamento local da extensão e são importados automaticamente pelo painel embarcado. O painel web continua separado e recebe JSON por importação manual. Não há sincronização entre dispositivos.

## Organização e privacidade

Histórico, clientes e documentos ficam em localStorage deste navegador. Não há contas, autenticação, armazenamento remoto ou sincronização entre computador e iPhone. Exporte e restaure cópias nas Configurações. Limpar os dados do navegador apaga o histórico. Não use dispositivos compartilhados para conteúdo confidencial sem proteção adicional.

A associação automática é determinística: compara nomes/aliases/e-mails cadastrados com título e participantes. Se houver um único cliente correspondente, associa; se nenhum ou mais de um corresponderem, deixa A revisar. Não cria clientes sozinha nem infere identidades pelo áudio. Etiquetas são editáveis. Para ensinar uma associação, use “Editar cliente e associações” e acrescente o nome ou e-mail ao cadastro.

Áudio só é enviado ao provedor quando você importa ou encerra uma gravação com IA configurada. Transcrições são enviadas ao clicar para gerar documento ou perguntar. O servidor não persiste áudio nem transcrições. O provedor possui políticas próprias de tratamento e retenção. Não há compartilhamento automático com terceiros ou participantes. Atas são minutas e precisam de revisão.

## Identidade e escopo

Superfícies off-white, azul-marinho, azul de referência aproximado e dourado. Libre Caslon Text fornecida pela usuária; Montserrat da coleção oficial Google Fonts com licença incluída. O ícone é uma interpretação gerada do monograma da referência, e deve ser substituído pelo arquivo oficial antes da distribuição.

Próximas integrações necessárias para a versão completa: validar/adaptar seletores no Meet real, captura de áudio da aba com transcrição em fluxo e diarização, login/sincronização, classificação semântica com confiança e revisão, publicação privada em HTTPS. Nenhuma publicação foi feita.
