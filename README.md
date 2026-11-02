# AFMD Transcrições — versão simples, local e sem API paga

Gravar microfone ou importar um áudio, transcrever no computador, revisar e copiar/baixar o texto. Mantém a identidade AFMD: azul-marinho, azul de referência, dourado e off-white; Libre Caslon Text e Montserrat.

**Estado:** interface e motor local implementados; teste de reconhecimento real bloqueado neste ambiente pelo acesso ao repositório do modelo. Não há uma nova versão pronta para instalar até esse teste passar. O ZIP anterior que dependia de API foi retirado desta branch para evitar outra instalação incompleta.

## Uso previsto

1. Chrome no computador, sem conta de API e sem servidor de IA.
2. Clique em **Preparar transcrição** e autorize o download do modelo gratuito. O Whisper Tiny quantizado é baixado da Hugging Face e colocado no cache do navegador. São dezenas de MB; a internet é necessária no primeiro download e pode ser necessária novamente se o navegador limpar o cache.
3. Marque a ciência dos participantes e grave, ou escolha um áudio. Limite inicial: 10 minutos e 20 MB por arquivo.
4. Ao encerrar, a fala é reconhecida localmente por Transformers.js/ONNX Runtime Web/WASM. O áudio não é enviado a um servidor de transcrição.
5. Revise o texto e copie/baixe um TXT. Textos são salvos neste navegador; áudio fica disponível para ouvir e baixar durante a sessão, mas não é persistido no histórico.

Esta versão transcreve **após encerrar**, não em streaming. Não inclui atas, resumos, identificação de pessoas, captura do Meet, pastas de clientes ou sincronização. A versão para iPhone não foi validada e não é o alvo desta simplificação. Não há garantia de precisão; ruídos, música e falas simultâneas prejudicam o reconhecimento.

O histórico anterior `afmd-v1` não é apagado: transcrições existentes são exibidas na interface simples quando não há histórico novo. Os dados antigos de clientes permanecem no armazenamento, embora não exista mais uma tela para gerenciá-los.

## Desenvolvimento

Node 24+:

```sh
npm ci --ignore-scripts
npm run build
npm start
```

Os instaladores nativos de GPU não são executados porque a aplicação usa exclusivamente o backend WASM no navegador. O npm continua verificando integridade dos pacotes conforme package-lock.json. O servidor local só entrega arquivos, não oferece uma API de transcrição e não recebe áudio.

O build inclui o JavaScript do motor e os arquivos WASM/MJS locais. Só pesos, tokenizer e configurações do modelo são obtidos pela rede. Não é carregado JavaScript executável de CDN.

## Instalação da extensão, após validação do motor real

Carregue a pasta `extension` em `chrome://extensions` com Modo do desenvolvedor e Carregar sem compactação. O ícone abre diretamente a tela simples em uma aba. Não há janela separada de captura nem configuração de chave de API.

As únicas permissões opcionais de rede são os domínios de distribuição do modelo: `huggingface.co`, `*.huggingface.co`, `*.hf.co`. A preparação solicita essas permissões no clique do usuário. O worker recusa uploads e destinos externos fora desses domínios; as requisições remotas previstas são somente GET/HEAD de arquivos do modelo.

## Validação

`npm test`: integridade do pacote, arquivos do runtime, licença e política da extensão. Requer dependências instaladas e build pronto.

`node tests/simple-browser.mjs`: interface, microfone sintético e decodificação WAV real com worker simulado. Usa Playwright e Chromium disponíveis no ambiente de desenvolvimento; não equivale a validar reconhecimento.

`node tests/real-local-engine.mjs`: prepara o motor real no Chromium e tenta reconhecer o áudio público de referência JFK. Precisa de acesso HTTPS ao repositório Hugging Face e do arquivo `/tmp/afmd-local-test/jfk.wav`, obtido da amostra pública do whisper.cpp. O teste é pendente/bloqueado, não aprovado. Leia VALIDATION.md.

Nenhum app, API, serviço de hospedagem ou configuração DNS foi publicado. A configuração de rede salva para o ambiente de desenvolvimento aguarda revisão/publicação pelo usuário; ela não altera a rede do seu computador.
