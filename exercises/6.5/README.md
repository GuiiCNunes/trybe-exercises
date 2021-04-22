# Bloco 6 - HTML e CSS: Forms, Flexbox e Responsivo

## CSS Responsivo - Mobile First

### Media Query

```
@media screen and () {}
```

Incluir bloco de *CSS* caso uma condição seja verdadeira, podendo ter várias condições. Pode ser chamada tanto no *CSS* em sí, quanto no *HTML*. No caso do *HTML*, basta *linkar* um CSS normalmente e adicionar a propriedade `media` nele, colocando o que viria após do `@media` no *CSS*.
[MDN](https://developer.mozilla.org/pt-BR/docs/Web/CSS/Media_Queries/Using_media_queries)
- `@media`: *AT-RULE*, uma isntrução de como se comportat.
- `screen`: Tipo de media. No caso, tela.
  - `all` , padrão.
  - `print`: modo impressão
  - `speech`: leitor de tela.
  - ...
- `and` Operador lógico. No caso, **E**.
  - `,` **OU**.
  - `not` **negação**.
- Media Features: são os recursos que tentão fazer a correspondência. Entre os parenteses.
  - **View/Page Characteristics**: `min-width`, `max-width`, `height`, `aspect-ratio`, ...
  - **Display Quality**: `resolution`, `scan`, `grid`, ...
  - **Color**: `inverted-colors`, `monochrome`, ...
  - **Interaction**: `any-pointer`, `any-hover`, ...
  - **...**
- Pode ser colocado mais operadores lógicos antes das chaves.
- CSS vai dentro das chaves.

- **!important**: Ao colocar isso em algum valor de propriedade, ela ganha relevância maior em relação aos outros. Ou seja, ela não será alterada caso a propriedade receba novos valores mais para baixo no CSS. Quebra o lance de ser cascata.