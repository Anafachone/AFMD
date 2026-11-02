# Validação

Data: 01/11/2026.

- `npm test`: 5 aprovados, 0 falhas, 0 ignorados.
- `node tests/browser.mjs`: aprovado; Chromium desktop 1440×1024 e viewport móvel 390×844. A gravação foi exercitada com um dispositivo de áudio sintético do Chromium, não com um iPhone físico.
- Sintaxe: servidor, app, service worker e scripts da extensão passaram no `node --check`.
- `git diff --check`: sem problemas.
- O teste encontrou e permitiu corrigir: caminho de arquivos estáticos, duplicação de legenda com pontuação parcial, busca comprimida pelo filtro e configurações inacessíveis no móvel.
- Os testes da extensão são fixtures e não comprovam compatibilidade com a versão atual do Meet.
- IA externa, diarização, transcrição em fluxo do áudio da aba, sincronização e Safari físico não foram validados; alguns ainda não estão implementados. Consulte README e design-qa.md.
- Nenhum deploy ou publicação foi realizado.

## Correção do pacote 0.2.0

- O ZIP agora inclui dashboard.html, app.js, CSS, fontes, ícone e o botão Abrir painel AFMD, além da captura Meet.
- `node tests/extension-bundle.mjs`: aprovado. Renderização dos arquivos embarcados via servidor de fixture, Chrome Storage simulado, importação automática de sessões concluídas, deduplicação, associação por cliente e abertura pelo popup. Sem pageerrors.
- Corrigido erro de inicialização de syncingCaptures encontrado nesse teste.
- `node tests/extension.mjs`: bloqueado; a política administrativa ExtensionInstallBlocklist do Chromium deste ambiente impede carregar a extensão. Não foi alterada nem contornada. O fixture não equivale a instalação real.
- Screenshot dos arquivos embarcados: test-results/extension-dashboard.png e test-results/extension-clients.png.
- ZIP final testado quanto à integridade e presença de painel/fontes.

## Correção 0.3.0 — microfone e API privada

- Diagnóstico confirmado pelo código e relato: a gravação funcionava, mas a extensão recusava todas as chamadas de IA.
- API autenticada implementada, chave de provedor somente no servidor, sessão do navegador contendo apenas endereço e código próprio de acesso.
- `npm test`: 15 testes aprovados (5 de modelo, 5 de cliente seguro, 5 de servidor). Nenhuma chamada a provedor real.
- `node tests/extension-bundle.mjs`: aprovado com servidor AFMD real local, microfone sintético e provedor simulado. Exercitou gravação, falha de provedor, preservação do áudio e nova tentativa até texto salvo, resumo, conexão e desconexão. O teste usa APIs Chrome simuladas devido à política de instalação do ambiente.
- `node tests/browser.mjs`: regressão desktop/móvel aprovada, com servidor local temporário.
- O vídeo enviado pela usuária excedeu o limite de transferência de 32 MiB e não foi assistido. O diagnóstico não usa conteúdo desse vídeo.
- `render.yaml` e ATIVAR-IA.md preparam a instalação, mas nenhum serviço foi criado ou publicado.
- Ativação real bloqueada até existir hospedagem HTTPS e credencial de provedor configurada. A conta de API e saldo da usuária ainda não foram confirmados.
- Registro.br foi informado como provedor de domínio; nenhuma configuração DNS foi alterada.
- Transcrição desta versão ocorre após encerrar o áudio, não em streaming. Diarização, Meet real e Safari físico permanecem sem validação.
