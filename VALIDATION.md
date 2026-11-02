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
