# Revisão da simplificação

A usuária pediu uma versão simples e sem API paga. A interface foi reduzida a preparar modelo, gravar/importar e copiar/baixar texto, preservando as fontes e cores AFMD.

Evidências: `test-results/simple-desktop.png` e `test-results/simple-mobile.png` (teste de interface com worker simulado, identificado pelo texto controlado). Os estados de modelo pronto e transcrição concluída nessas capturas são simulados para testar a interface; não comprovam reconhecimento.

Paleta off-white, navy, azul e dourado; nenhuma superfície branca pura declarada. Libre Caslon Text e Montserrat locais. Layout móvel sem overflow em 390px. A barra lateral é fixa no viewport; capturas full-page após rolagem podem mostrar a barra no deslocamento atual, o que não é usado como evidência de fidelidade pixel a pixel.

A referência anterior de dashboard completo não é mais o alvo 1:1: clientes, projetos, atas e resumo foram removidos do escopo desta versão. O alvo atual é o fluxo simples acordado na conversa.

Não há aceite final enquanto o motor não reconhecer áudio real. Modelo e cache offline aguardam teste após liberação da rede do ambiente.

final result: blocked
