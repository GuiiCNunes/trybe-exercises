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

### Link's

- [Explicando o Uso do *:after e *:before](https://stackoverflow.com/questions/59495417/is-box-sizing-inherited-if-declared-inside-universal-selector)
- [Grid Container](https://www.origamid.com/projetos/css-grid-layout-guia-completo/)
- [Responsive Web Design - Media Queries](https://www.w3schools.com/css/css_rwd_mediaqueries.asp)
- [What media query breakpoints should I use?](https://ricostacruz.com/til/css-media-query-breakpoints)
- [Usando Media Queries](https://developer.mozilla.org/pt-BR/docs/Web/CSS/Media_Queries/Using_media_queries)
- [Media Queries Breakpoints For Responsive Design In 2021](https://devfacts.com/media-queries-breakpoints-2021/)
- [Como simular tamanhos de tela diferentes com o Google Chrome](https://developers.google.com/web/tools/chrome-devtools/device-mode/?hl=pt-BR)
- [Referência do Bootstrap sobre layout responsivo](https://getbootstrap.com/docs/3.4/css/)
- [Guia sobre media queries do MDN](https://developer.mozilla.org/pt-BR/docs/Web/Guide/CSS/CSS_Media_queries)
- [Página do W3Schools sobre media queries](https://www.w3schools.com/css/css_rwd_mediaqueries.asp)
- [Listão de media queries para os dispositivos mais comuns 🔝](https://css-tricks.com/snippets/css/media-queries-for-standard-devices/)
- [Construtor de media queries](http://giona.net/tools/css3-mediaquery-generator/)
- [Artigo - Como criar layouts responsivos com Flexbox (em inglês)](https://www.quackit.com/css/flexbox/tutorial/create_a_responsive_flexbox_layout.cfm)
- [Artigo - Como escrever CSS focado para mobile first (em inglês)](https://zellwk.com/blog/how-to-write-mobile-first-css/)
- [Artigo - Como escrever CSS focado para mobile first (português)](https://www.todoespacoonline.com/w/2015/03/como-escrever-seu-css-para-projetos-mobile-first/)
- [Artigo - CSS modular com mobile first (português)](https://www.felipefialho.com/blog/css-modular-com-mobile-first/)
- [Artigo - As muitas faces do mobile first (português)](https://tableless.com.br/as-muitas-faces-do-mobile-first/)
- [Vídeo - Tutorial de CSS media query [1] (português)](https://www.youtube.com/watch?v=KAxbHLgybnY)
- [Vídeo - Tutorial de CSS media query [2] (português)](https://www.youtube.com/watch?v=AltqAPZzAqo)