# AFMD Transcritor: design system

Identidade AFMD em lavanda e azul. Tipografia: Libre Baskerville nos títulos e Montserrat no corpo.

## Tipografia

| Papel | Fonte | Uso |
|-------|-------|-----|
| Display | Libre Baskerville 400/700 | títulos, números de destaque |
| Corpo | Montserrat 400/500/600 | texto, botões, rótulos |

Escala: 11px rótulos em caixa alta com espaçamento, 13px apoio, 15px corpo, 21px título de seção, 30 a 44px título da página.

## Cores (tokens em `:root`)

| Token | Claro | Escuro | Uso |
|-------|-------|--------|-----|
| `--bg` | #f6f4fb | #171a2b | fundo da página |
| `--surface` | #ffffff | #20243b | cartões e campos |
| `--lav-100` | #ece7f8 | #2c2a4a | área de soltar arquivo, destaques, seleção |
| `--lav-300` | #c9bdea | #5a4f94 | borda tracejada |
| `--lav-600` | #7461b8 | #b7a8ee | rótulos, foco |
| `--blue-600` | #3b5bb5 | #7e9bf0 | ação primária |
| `--navy` | #20304b | #eceaf7 | texto (navy já usado no painel AFMD) |
| `--muted` | #5f6683 | #a6abc7 | texto secundário |
| `--line` | #d9d3ea | #363b5c | bordas |
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
