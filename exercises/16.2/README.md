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

## Links

- [Documentação Redux](https://redux.js.org/)
- [Documentação React](https://reactjs.org/)