# Bloco 12 - Componentes com Estado, Eventos e Formulários com React

## Componentes com estado e eventos

### Eventos

Semelhantes aos `eventListeners`, os eventos no *React* são situações que mudam o estado da página. Exemplo:

```
import React from 'react';
import './App.css';

/* Embora isso funcione, essa DEFINITIVAMENTE
não é a maneira correta de se criar eventos
em React! A função se refere ao componente,
então deve ser parte de sua classe! */
function handleClick() {
  console.log('Clicou no botão!')
}

class App extends React.Component {
  /* Repare que, diferentemente do HTML, no
  JSX você associa uma função a um evento
  passando a própria função entre chaves `{}` */
  render() {
    return <button onClick={handleClick}>Meu botão</button>
  }
}

export default App;
```

### this e bind

Funções dentro da `class` não precisam do `function`. Mas ao chamá-la, **deve colocar o** `this.` antes. Tambem é necessário declarar o *bind* dentro do `constructor`. Lembrando que o `constructor` precisa chamar o `super()` dentro dele.
O `bind` possibilita que o `this.` exista dentro das funções chamadas. Sintaxe:

```
constructor(props) {
  super()
  this.funcaoCriada = this.funcaoCriada.bind.(this);
}
```

**O parâmetro *props* é opcional, apenas se quiser utilizar em algo dentro do `constructor`.**
***Arrow functions* não precisam do `bind`.**

### state

Estado é onde as informações do componente são persistidas, guardadas. Ele é um objeto dentro do componente que pode ser acessado com o `this.state`. Para ser inicializado, dentro do `constructor`, atribua a ele um objeto, onde a chave é o indentificador da informação e o valor é a informação que deseja ser salva.
Para pegar essa informação pode usar o `this.state.identificadorDaInformação`. Porem, para atribuir um novo valor, fora do `constructor`, **não é possível simplesmente atribuir ao `this.state`**. Por ser **assíncrono**, o `state` necessita de uma função assíncrona para fazer a atribuição de um novo valor, ai que entra o `this.setState()`, que atribui um novo valor ao `state`. O parâmetro passado pode ser um objeto, para ser diretamente atribuido, mas é recomendável que seja uma função que retorne um objeto(*callback*). Essa função recebe dois parâmetros, o primeiro e o `state` como estáva antes, e o segundo é o *props*, que é **opcional**, caso não for utilizar, basta declarar o parâmetro com um `_` antes. Ficando:

```
this.setState((oldState, _props) => {
  /* Função que retorna um objeto */
});
```

Utilizar *Callback* é como utilizar o `then`das *Promises*, o novo `state` só roda após o antigo ser concluído.

Se precisar passar um parâmetro para a função chamada no evento, utiliza-se uma *arrow function*, no padrão:

```
<button onClick={() => this.minhaFuncao('meu parametro')}
```

## Links

- [Bulbapedia, the community-driven Pokémon encyclopedia](https://bulbapedia.bulbagarden.net/wiki/Main_Page)
- [How to become a pro with React setState() in 10 minutes](https://www.freecodecamp.org/news/get-pro-with-react-setstate-in-10-minutes-d38251d1c781/)
- [ReactJS Tutorial - 10 - State](https://www.youtube.com/watch?v=4ORZ1GmjaMc)
- [Manipulando Eventos - Documentação oficial do React](https://pt-br.reactjs.org/docs/handling-events.html)
- [FAQ sobre Estado - Documentação oficial do React](https://pt-br.reactjs.org/docs/faq-state.html)
- [(React + this + bind) = só sei que é assim - Desmistificando o limiar entre JavaScript e React](https://medium.com/tableless/https-medium-com-tableless-react-this-bind-so-sei-que-e-assim-73e75f2adbd3)
- [Binding vs arrow-function (for react onClick event)](https://stackoverflow.com/a/56311840)
