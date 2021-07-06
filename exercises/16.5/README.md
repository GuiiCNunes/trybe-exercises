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

## Links
