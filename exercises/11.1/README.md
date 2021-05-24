# Bloco 11 - Introdução à React

## 11.1 'Hello, world!' no React!

*React* é a principal biblioteca de construção de UI's, é um ecossistema que involve: *React*, *JSX*, *ES6*, *Webpack*, *Flux/Redux*, *axios/fetch* e *Jest/Mocha*.

### Instalação

Para instalação utilizamos o gerencidador de pacotes *npm*. Ao passo que o *npx*, **apenas executa o o pacote sem instalá-lo**.

```
npx create-react-app testando-meu-computador
```

O comando `create-react-app` apenas cria os arquivos necessários, **não há necessidade de salvá-lo nas dependÊncias do projeto**, logo, utiliza-se o `npx`. O parâmetro final é o nome do projeto.

Será criada uma nova pasta com o nome do projeto e, dentro dela, todo conteúdo do projeto. Para **iniciar o projeto** basta rodar um `npm start`.

### JSX

*Javascript Extension* é uma extensão de sintaxe do Javascript. Ela é recomendada pela documentação do *React*. Mescla *JS* e *HTML*, com pequenas diferenças para não gerar conflito. Exemplo:

```
const element = <h1>Hello, world!</h1>;
```

É possível incorporar expressões diretamente no código, como:

```
const nome = 'Jorge Maravilha';
const element = <h1>Hello, {nome}</h1>;
```
```
function nomeCompleto (nome, sobrenome) {
  return `${nome} ${sobrenome}`;
}

const element = <h1>Hello, {nomeCompleto("Jorge", "Maravilha")}</h1>;
```

### ReactDOM.render

Responsável por renderizar e atualizar o código dentro do *HTML*, exibindo os elementos *React*.

### CSS e Import

*CSS* fica igual, um arquivo maior, que possui os identificadores de elementos e classes, e pode alterar a estética deles. Sendo importado no começo do arquivo.

### Criação de componentes React

Pode ser feita de duas formas: usando funções ou utilizando classes, está ultima foi incorporada no ES2015 (ES6).

### Métodos e classes

Métodos são semelhantes as funções, porém pertence a uma classe. Classe é uma das formas de renderizar componentes na página, logo, quando precisamos alterar um componente, utilizamos componentes(e métodos) de classe. Ou seja, cada classe é um agrupamento de funções (métodos) que fazem sentido dentro de um contexto (propósito) e, em *React*, é um elemento que aparece na tela, cada um seguindo seu propósito.
Classes possuem acesso a métodos próprios, como o `render()`, que renderiza todo conteúdo criado na tela.
Sintaxe:

```
import React from 'react';

class ReactClass extends React.Component {
  render() {
    return (
      <h1>My first React Class Component!</h1>
    )
  }
}
```

## Links

- [REACT](https://pt-br.reactjs.org/)
- [Repositório REACT](https://github.com/facebook/react)

- [As diferentes formas de utilizar CSS no React](https://www.w3schools.com/react/react_css.asp)
- [Documentação Oficial - Import](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/import)
- [Documentação Oficial - Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [Criando um app com consumo de API local utilizando React](https://medium.com/better-programming/creating-a-simple-app-with-react-js-f6aa88998952)
- [Guia completo de React](https://tableless.com.br/guia-completo-react-ecossistema/)
- [Pesquisa anual do StackOverflow sobre frameworks mais amados, requisitados e odiados](https://insights.stackoverflow.com/survey/2019#technology-_-most-loved-dreaded-and-wanted-web-frameworks)

- [Exercício 3](https://www.freecodecamp.org/learn/front-end-libraries/react/)
- [Exercício 4](https://codepen.io/nathansebhastian/pen/qgOJKe)