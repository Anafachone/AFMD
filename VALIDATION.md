# Validação atual — 0.4.0 simples e local

## Estado

Reconhecimento de fala real **bloqueado**, não aprovado. Não foi gerado novo ZIP para instalação nem substituída a versão principal do GitHub. O objetivo desta branch é remover API paga e deixar gravação/importação/transcrição local.

## Passou

- Build browser com Transformers.js 3.8.1 e ONNX Runtime Web/WASM local. Bibliotecas instaladas com scripts nativos de GPU desativados, mantendo verificação de integridade do npm e lockfile.
- Três testes de distribuição: arquivos WASM/MJS idênticos aos do pacote instalado, arquivos principais presentes, cópia pública/extensão coerente e manifest habilitando WASM local sem API paga.
- Teste de interface em Chromium com microfone sintético e worker simulado: preparação, consentimento, gravação, decodificação de WAV 8 kHz para 16 kHz, retenção de áudio e texto após erro, nova tentativa, edição/histórico e layout de 390px sem overflow. Não houve POST de áudio na rede.
- Os testes com worker simulado não validam reconhecimento nem qualidade linguística.

## Bloqueado

- `curl` para configuração pública de Xenova/whisper-tiny no domínio Hugging Face retornou HTTP 403 no proxy do ambiente.
- A política efetiva observada não permite Hugging Face.
- `node tests/real-local-engine.mjs` iniciou o worker verdadeiro, mas a preparação retornou `Failed to fetch`, tanto na tentativa inicial quanto após configurar o Chromium para usar explicitamente o proxy oficial. Nenhuma transcrição real foi obtida.
- Um rascunho de configuração adiciona `huggingface.co`, `*.huggingface.co`, `*.hf.co`. O salvamento foi confirmado, com `requires_publish: true`; ele não foi aplicado/publicado pelo agente.
- É necessário revisar/salvar/publicar esse rascunho nas configurações do ambiente, revalidar a política efetiva e repetir o teste do motor. Esse passo refere-se ao ambiente de desenvolvimento, não à publicação do app.
- A amostra pública JFK do whisper.cpp foi obtida para o teste em `/tmp/afmd-local-test/jfk.wav`. Não usa áudio pessoal. O reconhecimento de referência deve usar idioma inglês; a interface usa português por padrão.

## Ainda sem validação

- Reconhecimento em português e qualidade/velocidade em computador real da usuária.
- Instalação MV3 no Chrome gerenciado, que bloqueia carregamento de extensões por política administrativa.
- Cache offline completo depois de baixar o modelo.
- Safari/iPhone. Esta versão é voltada ao Chrome do computador.

## Escopo

Até 10 minutos e 20 MB; transcrição após encerrar, não em streaming. Sem nomes de participantes, diarização, Meet, resumos, atas, API de IA ou conta paga. O áudio fica na memória para ouvir/baixar/repetir; apenas textos são persistidos localmente. O histórico antigo não é apagado.
