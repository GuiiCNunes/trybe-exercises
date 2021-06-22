# Bloco 15 - Testes automatizados com React Testing Library

## RTL - Primeiros passos

Testes com *react-testing-library* podem ser divididos em 3 etapas:

1. Acessar os elementos da sua tela
2. Interagir com os elementos (quando necessário)
3. Realizar os testes

### render()

A função `render(<Componente />)` renderiza o componente passado como parâmetro em um "simulação" dentro do teste. Alem disso, ela retorna identificadores que podem ser trabalhados nos testes. Como o:

- `getByLabelText()` contém todos os textos presentes dentro de tag's `label`, pode ser passado um texto como parâmetro, assim retorna só a label com o texto.
- `getByText()` contém todos os textos presentes na tela, pode receber como parâmetro um *regex* para realizar a busca.
- `getByRole()` contém todas as "funções" que o componente possui, ela segue [regras pré estabelecidas](https://www.w3.org/TR/html-aria/#docconformance). Lembrando que retorna **APENAS UMA ROLE**.
- `getAllByRole()`retorna todas as ocorrências da *role* específicada, retorna um *array*.
- `getByTestId()` procura pelos elementos que possuem a propriedade `data-testid`, recebe como parâmetro o *testid* que desejar.

[Resumo da utilziação do RTL](https://github.com/testing-library/react-testing-library/raw/main/other/cheat-sheet.pdf)

**Lembrando que estes são seletores, para realizar o teste efetivamente, utiliza-se os *matchers* do Jest.**

O `render()` aceita qualquer componente, não precisando ser renderizada a aplicação inteira. Inclusive, **podem ser passadas props dentro do elemento passado como parâmetro**.

- `get...` trava ao não encontrar os elementos.
- `query...` prossegue os testes mesmo não encontrando o elemento.
- `find...` para elementos assíncronos.

### fireEvent

Simula a interação dos usuários. [Documentação](https://testing-library.com/docs/dom-testing-library/api-events/)

- `.change(elemento, objeto)` simula alterações de *inputs* pelo usuário. O primeiro parâmetro é o elemento que receberá as alterações e o segundo é um objeto que contém as alterções. Por exemplo, se for um input de texto, basta passar um `{ target: { value: 'texto inserido' } }`. Ou seja, esse objeto deve conter as chaves e valores que utilizamos no que está sendo testado.
- `.click(elemento, objeto)` simula o *click* em um elemento. Mesmo racional do anterior, em relação aos parâmetros. Caso o evento que disparou não seja tratado, não é necessário passar o objeto.
...[Lista de Eventos Simulados](https://github.com/testing-library/dom-testing-library/blob/main/src/event-map.js)

## Links

- [react-testing-library vs enzyme](https://www.npmtrends.com/react-testing-library-vs-enzyme)
- [enzyme](https://github.com/airbnb/enzyme)
- [Documentação de testes](https://reactjs.org/docs/testing.html)
- [react-testing-library](https://github.com/testing-library/react-testing-library)
- [Cheatsheet react-testing-library](https://testing-library.com/docs/react-testing-library/cheatsheet)
- [Cheatsheet dom-testing-library](https://testing-library.com/docs/dom-testing-library/cheatsheet/)
- [jest-dom](https://github.com/testing-library/jest-dom)
- [Lista de Queries](https://testing-library.com/docs/dom-testing-library/api-queries)

- [Confident React - Webinar de Kent C. Dodds apresentando a React Testing Library e comparando-a com o Enzyme](https://applitools.com/blog/react-kent-c-dodds-frontend-visual-testing?utm_referrer=https://github.com/frontendbr/forum/issues/1501)
- [Documentação do React - Testing Overview](https://reactjs.org/docs/testing.html)
- [Code Sandbox - React Testing Library Examples](https://codesandbox.io/s/github/kentcdodds/react-testing-library-examples)
- [GitHub da React Testing Library](https://github.com/testing-library/react-testing-library)
- [My experience moving from Enzyme to react-testing-library](https://medium.com/@boyney123/my-experience-moving-from-enzyme-to-react-testing-library-5ac65d992ce)
- [FAQ da react-testing-library](https://testing-library.com/docs/react-testing-library/faq)

