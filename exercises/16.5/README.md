# Bloco 16 - Gerenciamento de estado com Redux

## Testes em React-Redux

Quando renderizado o componente inicial (geralmente o *App.js*), é necessário que este esteja encapsulaod pelo `Provider`, para poder ter acesso ao *State*.
Semelhante ao `renderWithRouter()`, que é utilizado para testes com *Routes*, temos o `renderWithRedux()`, sendo ela:

```
const renderWithRedux = (
  component,
  { initialState, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}
```

Ela recebe um componente como primeiro parâmetro e desconstroi um objeto como segundo. Este objeto possui uma chave `initialState` e uma `store`, que possui como valor padrão uma nova `store` (que recebe um `reducer` importado e o `initialState` o mesmo que foi desconstruido). Alem disso, esse objeto possui um valor padrão vazio.
O objetivo dessa função é renderizar o componente envolvido pelo `provider`, com acesso a `store`. Além de retornar a própria `store`, quando necessário acessá-la diretamente.

*Imports* necessários:

```
import React from 'react'
import { Provider } from 'react-redux'
import { render, cleanup } from '@testing-library/react';
import { createStore, combineReducers } from 'redux';
```

**Ficar atento** para o `combineReducers`, se ele é utilizado na aplicação, ele deve ter a mesma estrutura nos testes. Caso isso ocorra, a `renderWithRedux` deve ser adaptada, com os *reducers* importados e colocados no lugar do **REDUCERS**:

```
const renderWithRedux = (
  component,
  { initialState, store = createStore(combineReducers({ REDUCERS }), initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}
```

**Outro ponto de atenção**, é que o `provider` deve estar no `index.js`, para poder encapsular o `App.js` em sua totalidade. Assim garantindo que a `store` é controlável.

### Testes Assíncronos

Uma opção é utilizar a lib `fetch-mock-jest`. Exemplo de uso:

```
// src/helper/index.js
import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../../reducers';

const createMockStore = (initialState) => (
  createStore(combineReducers({ reducer }), initialState, applyMiddleware(thunk))
);

const renderWithRedux = (
  component, { initialState, store = createMockStore(initialState) } = {},
) => ({
  ...render(<Provider store={ store }>{component}</Provider>),
  store});

export default renderWithRedux;
```

```
// src/App.test.js
import { fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import fetchMock from 'fetch-mock-jest';
import App from '../App';
import renderWithRedux from './helpers';

describe('Página principal', () => {
  test('Testa que o botão de adicionar cachorro está presente', async () => {
    const { queryByText } = renderWithRedux(<App />);
    const buttonDoguinho = queryByText('Novo Doguinho');

    expect(buttonDoguinho).toBeInTheDocument();

    fetchMock.getOnce('https://dog.ceo/api/breeds/image/random', {
      body: { message: 'myDogUrl' },
    });

    fireEvent.click(buttonDoguinho);
    await waitFor(() => expect(fetchMock.called()).toBeTruthy());
  });
});
```

## Links

- [fetch-mock-jest](https://www.npmjs.com/package/fetch-mock-jest)

- [Jest-RTL Redux](https://react-testing-examples.com/jest-rtl/redux/)
- [Writing Tests](https://redux.js.org/recipes/writing-tests)
- [React Redux Example](https://testing-library.com/docs/example-react-redux)
- [Testing React And Redux Apps With Jest](https://scotch.io/tutorials/testing-react-and-redux-apps-with-jest)
