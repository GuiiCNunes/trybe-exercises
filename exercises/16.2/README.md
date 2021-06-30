# Bloco 16 - Gerenciamento de estado com Redux

## Usando o Redux no React

Para a prática: [Repositório](https://github.com/GuiiCNunes/exercises-redux-step-by-step)
O React é uma ferramenta independente, que pode ser utilizado com [React](https://reactjs.org/), [Angular](https://angularjs.org/), [Vue](https://vuejs.org/), [Ember](https://emberjs.com/) e JavaScript puro.

Para utilizar um *framework* junto com o Redux, é comum utilizar uma biblioteca para fazer a conexão. Entre React e Redux, essa biblioteca é a **React Redux**. Ela é instalada com o comando: `npm install react-redux`.

### Configurando Redux com React

1. Criar a aplicação
  `npx create-react-app my-app`
2. Instalar as dependências
  `npm install --save redux react-redux`
  - `redux` para possibilitar a implementação.
  - `react-redux` para conectar Redux e React.

### Componentes

É uma boa prática deixar todos os componentes(*store*, *reducers*,...) em arquivos separados

#### store

Pode ser alocado em um arquivo *src/store/index.js*. Tendo o conteúdo:

```
import { createStore, combineReducers } from 'redux';
import rootReducer from '../reducers';

const store = createStore(rootReducer);

export default store;
```

#### reducers

Todo aplicação deve possuir um *rootReducer*, esse deve agrupar todos os *reducers* para serem passados para o `createStore()` na *store*. É uma boa prática criar um diretório chamado *reducers*.

Exemplo de um *reducer*, seria o *src/reducers/myReducer.js*:

```
const INITIAL_STATE = {
  state: '',
};

function myReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'NEW_ACTION':
      return { state: action.state };
    default:
      return state;
  }
}

export default myReducer;
```

Dentro da pasta *reducers*, deve existir um *src/reducers/index.js*, que agruparia todos os *reducers* dentro do `rootReducer`. Ficando mais ou menos assim:

```
import { combineReducers } from 'redux';
import myReducer from './myReducer';

const rootReducer = combineReducers({ myReducer });

export default rootReducer;
```

#### actions

Por convenção, é um objeto que deve possuir uma *key* *type*, podendo ter outras. Exemplo:

```
export const newAction = (state) => ({ type: 'NEW_ACTION', state });
```

#### provider

É necessário configurar o *src/index.js* para configurar o *Provider*.
O código do *index.js* ficaria assim:

```
import React from 'react';
import ReactDOM from 'react-dom';
// o provider é o meio pelo qual disponibilizamos o store
// com os estados de toda a aplicação para todos os demais componentes
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './store';

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root'),
);
```

O `provider` precisa encapsular o APP e receber uma *props* com nome de `store` com o valor da *store*.

#### mapStateToProps

Para utilizar os componentes junto com o Redux, é necessário conectá-los. Começando por importá-los e adicioná-los a página. Mais ou menos assim:

```
import React from 'react';
import FirstComponent from './FirstComponent';
import SecondComponent from './SecondComponent';

class App extends React.Component {
  render() {
    return (
      <div>
        <FirstComponent />
        <SecondComponent />
      </div>
    );
  }
}

export default App;
```

E cada componente ficaria assim:

```
import React from 'react';
import { connect } from 'react-redux';

class FirstComponent extends React.Component {
  render() {
    return (
      <div>
        <div>
          {this.props.myFirstState.map((element,index) => (
            <p key={ index }>{element}</p>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  myFirstState: state.myReducer.state});

export default connect(mapStateToProps, null)(FirstComponent);
```

A função `mapStateToProps` injeta o *state* dentro das *props* do componente.
No caso, são os dados providos pelo *reducer* `myReducer`. Que são colocados dentro da variável `myFirstState`.
E, por fim, utiliza-se a função `connect()()` para conectar o redux ao componente. Essa função conecta o componente com a *store*. Passando uma *callback* (`mapStateToProps`) no primeiro parênteses e o componente no segundo.
No exemplo é realizado **apenas a leitura dos dados**.

#### connect

Da acesso ao *store* do Redux. Tem a estrutura assim: `connect()()`.
Nos primeiros parênteses devem estar presentes os métodos nativos do Redux. Esses métodos tem uma ordem:

  - Se utilizar somente o `mapDispatchToProps`
    `export default connect(null, mapDispatchToProps)(Component)`
  - Se utilizar somente o `mapStateToProps`
    `export default connect(mapStateToProps, null)(Component)`
  - Se utilizar ambos:
    `export default connect(mapStateToProps, mapDispatchToProps)(Component)`

Como mostrado, no segundo parêntese vai o componente a ser colocado.
[Documentação](https://react-redux.js.org/api/connect)

### mapDispatchToProps e dispatch

Exemplo:

- Action:
  ```
  //actions.js

  export const newAction = (state) => ({ type: 'NEW_ACTION', state });
  ```

- Component: 
  ```
  import React from 'react';
  import { connect } from 'react-redux';
  import { newAction } from './actions';
  // Import referente a `action creator` criada para disparar a ação para a store.

  class SecondComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { inputValue: '' }; 
      // Esse estado irá armazenar o valor do input
    }

    render() {
      const { myFirstDispatch } = this.props
      return (
        <div>
          <input
            type="text"
            onChange={event => this.setState({ inputValue: event.target.value })}
          />
          <button onClick={() => this.props.myFirstDispatch(this.state.inputValue)}> /
            Executar qualquer tarefa
          </button>
      // O botão está disparando o mapDispatch e enviando o valor para a store
        </div>
      );
    }
  }

  // utilizando `action`:
  // const mapDispatchToProps = (dispatch) => ({
    // myFirstDispatch: (state) => dispatch({ type: 'NEW_ACTION', state }),
  // });

  // No caso acima, vemos que o mapDispatchToProps é uma função que retorna um objeto, e sua key recebe uma callback. 
  // Essa callback terá um parâmetro correspondente ao estado que será enviado para a store.
  // Nessa callback, chamamos a função `dispatch`, que receberá como argumento a `action`, 
  // que é um objeto contendo o "type" e o parametro da callback, o "state", que será o novo valor do estado.


  // utilizando `action creator `:

  const mapDispatchToProps = (dispatch) => ({
    myFirstDispatch: (state) => dispatch(newAction(state))});

  // Podemos utilizar o mapDispatchToProps de outra forma também! Lembra do arquivo que foi criado contendo a função "newAction?
  // No exemplo acima, o dispatch está recebendo como argumento a "newAction", que também é chamada de `action creator`.
  // E é aí que está a vantagem de utilizar  as `action creator`, pois elas também geram uma `action`.

  export default connect(null, mapDispatchToProps)(SecondComponent);
  ```
- Reducer:

  ```
  // reducers/myReducer.js

  const INITIAL_STATE = {
    state: '',
  };

  function myReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'NEW_ACTION':
        return { state: action.state };
        // Nesse caso a utilização do spread operator (...) não é necessário, pois estamos trabalhando com uma única chave no estado.
        // Mas caso tenha dúvidas sobre a utilização, consulte a documentação do Redux https://redux.js.org/recipes/using-object-spread-operator
      default:
        return state;
    }
  }

  export default myReducer;
  ```

- rootReducer:

  ```
  // reducers/index.js

  import { combineReducers } from 'redux';
  import myReducer from './myReducer';

  const rootReducer = combineReducers({ myReducer });

  export default rootReducer;
  ```

O `mapDispatchoProps` é uma função que recebe o `dispatch` da *store* (via `connect()()`) e retorna um objeto de funções, estas funções disparam (via `dispatch` passado) os *actions creators*(ou *actions* diretamente). Essas funções são passadas ao componente via *props*, similar ao `mapStateToProps`, mas ao invés de serem dados para ser mostrados, são métodos para serem executados. Como se fosse um componente pai passando uma função que altera seu estado a um componente filho.
Ou seja, ao chamar essa função (seja com um `onClick` ou outra coisa), a função pega o valor passado e atribui ao *state* do *reducer* utilizado. **Cada *reducer* tem seu próprio *state***.

> O mapDispatchToProps , assim como o mapStateToProps , podem ser criados via funções convencionais ou arrow functions. O que é indispensável é que o retorno seja um objeto, pois é assim que o Redux o espera.

### Estruturas

- Redux: *store*, *actions* e *reducers*.
- Conexão Redux e React: *provider* , *connect* , *dispatch* , *mapDispatchToProps* e *mapStateToProps*.

## Gif

![Fluxo de dados Redux](./fluxo-de-dados-redux.gif)

  [Fonte](redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)

## Checklist react-redux: Passo a passo para guardar no coração e colar na parede

- npx create-react-app my-app-redux;
- npm install --save redux react-redux;
- npm install.

*Criar dentro do diretório src:*
- diretório actions;
- diretório reducers;
- diretório store.

*Criar dentro do diretório actions:*
- arquivo index.js.

*Criar dentro do diretório reducers:*
- arquivo index.js.

*Criar dentro do diretório store:*
- arquivo index.js.

*Em src/index.js:*
- definir o Provider, `<Provider store={ store }>` , para fornecer os estados à todos os componentes encapsulados em `<App />` .

**Se a sua aplicação não terá outras páginas, não é necessário configurar as rotas. Caso contrário:**
- npm install react-router-dom;

*Em src/index.js:*
- definir o BrowserRouter, `<BrowserRouter>` .

*No arquivo App.js:*
- definir o Switch, `<Switch>` ;
- definir a Route, `<Route>` .

**O BrowserRouter, o Switch e a Route são três componentes essenciais para trabalhar rotas em React.**
*Caso necessário:*
- criar o diretório components;
- criar o diretório pages.

*No arquivo store/index.js:*
- importar o rootReducer e criar a store;
- configurar o Redux DevTools.

*Na pasta reducers:*
- criar os reducers necessários;
- configurar os exports do arquivo index.js.

*Na pasta actions:*
- criar os actionTypes;
- criar as actions necessárias.

*Nos componentes:*
- criar a função mapStateToProps se necessário;
- criar a função mapDispatchToProps se necessário;
- fazer o connect se necessário.

## Links

- [Documentação Redux](https://redux.js.org/)
- [Documentação React](https://reactjs.org/)

- [Redux Devtools for Dummies](https://codeburst.io/redux-devtools-for-dummies-74566c597d7)
- [Connect react-redux](https://react-redux.js.org/api/connect)
- [Why use Redux](https://blog.logrocket.com/why-use-redux-reasons-with-clear-examples-d21bffd5835/)
- [Redux: Usage with React](https://redux.js.org/basics/usage-with-react/#usage-with-react)
- [Why use React Redux](https://react-redux.js.org/introduction/why-use-react-redux)
- [React Redux: Official Redux binding for React](https://react-redux.js.org/)
- [Getting Started with React and Redux](https://scotch.io/courses/getting-started-with-react-and-redux)
- [Redux API Reference](https://redux.js.org/api/api-reference)
- [React Redux API Reference](https://react-redux.js.org/api/connect#overview)
