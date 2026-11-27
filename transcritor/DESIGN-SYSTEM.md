# TRANSFILES: design system

Identidade AFMD em lavanda azulada (tom periwinkle, sem roxo) e azul. Tipografia: Libre Baskerville nos títulos e Montserrat no corpo.

## Tipografia

| Papel | Fonte | Uso |
|-------|-------|-----|
| Display | Libre Baskerville 400/700 | títulos, números de destaque |
| Corpo | Montserrat 400/500/600 | texto, botões, rótulos |

Escala: 11px rótulos em caixa alta com espaçamento, 13px apoio, 15px corpo, 21px título de seção, 30 a 44px título da página.

## Cores (tokens em `:root`)

| Token | Claro | Escuro | Uso |
|-------|-------|--------|-----|
| `--bg` | #f4f6fc | #151a2e | fundo da página |
| `--surface` | #ffffff | #1d2440 | cartões e campos |
| `--lav-100` | #e8ecfa | #26305a | área de soltar arquivo, destaques, seleção |
| `--lav-300` | #bcc8ee | #4a5d9c | borda tracejada |
| `--lav-600` | #5a70c2 | #a9bcf2 | rótulos, foco |
| `--blue-600` | #2f52b0 | #7e9bf0 | ação primária |
| `--navy` | #20304b | #e9ecf8 | texto (navy já usado no painel AFMD) |
| `--muted` | #5b6585 | #a4adcc | texto secundário |
| `--line` | #d3daee | #34406a | bordas |
| `--ok` / `--err` | #2d7a57 / #a8383f | #6fcf9f / #f08a90 | estados |

As tonalidades de lavanda e o azul vivo são uma proposta nova. O navy vem do painel existente. Ajuste os valores se a AFMD tiver hexadecimais oficiais.

## Componentes

- **Seção**: cartão `--surface`, borda `--line`, raio 10px, rótulo "Etapa N" em `--lav-600`.
- **Área de soltar arquivo**: borda tracejada `--lav-300`, fundo `--lav-100`, ativa com `--blue-600`. Teclado: Enter ou Espaço abre o seletor.
- **Opção de modo**: cartão selecionável, marcada com borda `--blue-600` e fundo `--lav-100`.
- **Botão primário**: fundo `--blue-600`, texto `--on-accent`. Secundário: borda `--line`. Desabilitado a 50%.
- **Estatística**: bloco `--lav-100` com rótulo em caixa alta e número em Libre Baskerville.
- **Campo de transcrição**: textarea editável, linha 1.8, contador de palavras.
- **Mensagem de estado**: `role="status"`, verde para sucesso, vermelho para erro.

## Acessibilidade

Foco visível de 3px em `--lav-600`, controles com rótulo, animações respeitam `prefers-reduced-motion`, tema claro e escuro por tokens.

## Código

`index.html` é a página publicada como Artifact no Claude. Nenhum dado sai do navegador na redução do arquivo.

## Estrutura (referência: Tracker Semanal)

- **Cabeçalho em destaque**: bloco `--hero` (lavanda azulada) com borda fina `--ink`, raio 16px, título em Libre Baskerville 400 e um selo branco à direita com o limite em MB.
- **Cartões**: fundo `--card`, borda `--line`, raio 14px, rótulo "Passo N" em caixa alta com espaçamento.
- **Botões**: contorno `--ink`, raio 10px, altura mínima 42px. Primário sólido em `--ink`.
- **Estatísticas**: cartões brancos com borda fina. A economia usa o fundo `--hero`.
- **Foco**: contorno de 2px em `--ink`.

## Visual macio (versão móbile, até 720px de largura)

No computador vale a estrutura do Tracker Semanal. No celular o visual fica macio: cantos bem arredondados (cartões 26px, cabeçalho 28px, botões em pílula), sombras suaves em lavanda, bordas claras, cabeçalho em degradê lavanda azulada e botão principal em azul-lavanda `#5a70c2`. O rótulo "AFMD" foi removido do topo da página.

## Alternador Vídeo / PDF

Controle segmentado no topo (`.seg`) troca entre o compressor de vídeo (limite padrão 180 MB) e o de PDF (limite padrão 300 MB). O selo do cabeçalho mostra o limite do modo ativo. O PDF tem dois métodos: reduzir imagens (as páginas viram JPEG) ou manter texto (compressão leve).

## Saída de vídeo

O vídeo é codificado com WebCodecs em MP4 H.264 + AAC, com tempos exatos de imagem e áudio, o formato que o WhatsApp aceita. Se o navegador não tiver esses codificadores, a página usa o plano B (gravação em tempo real) e avisa que o resultado pode travar no WhatsApp.

## Aba Word ⇄ PDF

Terceira opção do alternador. Converte .docx em PDF (texto selecionável, com títulos, listas, negrito, itálico e tabelas simples em texto) e PDF em .docx (apenas texto, em parágrafos). Imagens, cabeçalhos, rodapés, colunas e a posição exata na página não são preservados. O selo de limite de MB fica oculto nessa aba.

## TRANSFILES: ferramentas

Navegação em duas camadas: categorias (alternador `.seg`: Vídeo, Áudio, Imagens, PDF, Word ⇄ PDF) e seletor "Ferramenta" dentro da categoria. Ferramentas novas usam o painel genérico (`#genPanel`): passo 1 escolhe os arquivos, passo 2 mostra as opções, o resultado e o botão Salvar.

| Categoria | Ferramentas |
|-----------|-------------|
| Vídeo | Comprimir (limite padrão 180 MB), cortar ou converter para MP4 |
| Áudio | Extrair, cortar ou converter (saída em MP4 só de áudio, AAC) |
| Imagens | Converter entre JPG, PNG e WebP, comprimir e redimensionar (vários arquivos viram ZIP) |
| PDF | Comprimir (limite padrão 300 MB), juntar, dividir (ZIP), extrair páginas, girar |
| Word ⇄ PDF | Word (.docx) para PDF e PDF para Word (só texto) |

Qualidade e legitimidade: juntar, dividir, extrair e girar PDF copiam as páginas sem recompressão. Qualquer alteração em PDF invalida assinaturas digitais, e a página avisa isso. Imagens convertidas perdem os dados EXIF. Tudo roda no navegador, sem enviar arquivos.

## Identidade visual AFMD (versão atual)

- **Estrutura:** barra lateral em degradê lavanda azulada (`#5468bf` a `#4a5eb2`) no computador, com o nome TRANSFILES em Libre Baskerville espaçado em branco, filete dourado claro e ícones de linha. No celular a barra vira um topo com abas roláveis.
- **Área de trabalho:** fundo creme `#f4f3ef`, cartões brancos com borda fina e sombra suave, filete dourado sob o título da página.
- **Ferramentas da categoria:** chips em pílula, o ativo em azul-lavanda `#4a5fb0`.
- **Lavanda azulada:** só em destaques (área de soltar arquivo, estatística de economia, cabeçalho no celular).
- **Botão principal:** azul-lavanda `#4a5fb0`. Foco em dourado.

## PowerPoint para PDF

Na aba "Word, PowerPoint e PDF", a opção PowerPoint (.pptx) para PDF converte cada slide em uma página com texto selecionável, imagens PNG/JPG, formas simples, cores e fundo liso. Não reproduz fontes, tabelas, gráficos, SmartArt, degradês, animações nem efeitos. Para fidelidade total, o caminho é exportar para PDF no próprio PowerPoint.
