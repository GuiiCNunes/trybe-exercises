# Bloco 18 - Context API e React Hooks

## React Hooks - useState e useContext

Os *hooks* permitem que componentes funcionais utilizem o *state*, simplificando mais código que o componente de classe. O mais comum deles é o `useState()`, essa função retorna um array de 2 funções, a primeira para pegar determinado estado e a segunda para atribuir algum valor a ele. A função recebe como argumento que será o valor *default* do estado. Exemplo: 

```
import React, { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <div>Counter: {counter}</div>
      <button type="button" onClick={() => setCounter(counter + 1)}>
        Increase Counter
      </button>
    </div>
  );
}

export default App;
```

**Pontos importantes**:
- Componentes funcionais não utilizam métodos. Ou seja, funções internas devem ser criadas como *arrow functions*.
- O *state* do componente deixa de ser um grande objeto, assim cada estado deve ser criado com seu próprio `useState()`.
- Não se utiliza mais o `constructor`, `render`, `this.`, etc... por deixar de ser um componente de classe.
- É mais simples lidar com estado anterior, visto que ele é o valor presente antes do `set...`.
- **Componentes funcionais recebem *props* por parâmetro.**

Outra *hook* muito utilizada é o `useContext()`, ela elimina a necessidade de utilizar um `Consumer` ao manipular a *ContextAPI*. Lembrando de manter a estrutura do `Context` e `Provider`, a diferença é que essa função recebe como argumento o `Context` e retorna um objeto referente ao `value` do `Provider`. Possibilitando o acesso dele dentro do componente funcional, sem a necessidade de utilizar o `Consumer` e a função filha dele.

## Exemplo

*AppContext*

```
import { createContext } from 'react';

const AppContext = createContext();

export default AppContext;
```

*Provider*

```

import React, { useState } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [stateA, setStateA] = useState('initialStateA');
  const [stateB, setStateB] = useState('initialStateB');
  const contextValue = {
    stateA,
    setStateA,
    stateB,
    setStateB,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export default Provider;
```

*App*

```
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import Provider from '../utils/Provider'

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

*Componente*

```
import React, { useContext } from 'react';
import AppContext from '../utils/AppContext';

const ComponenteX = () => {
  const { stateA, setStateA, stateB } = useContext(AppContext);

  return (
    <div>
      <p>{stateA}</p>
      <p>{stateB}</p>
      <button onClick={() => setStateA("newState")}>Click</button>
    </div>
  );
};

export default ComponenteX;
```

## Links

- [React Hooks Introduction, by Renan Lopes](https://www.youtube.com/watch?v=0pxd1DtockM)
- [React Hooks useContext, by Renan Lopes](https://www.youtube.com/watch?v=dbU-ZwDOCaE)
- [From Class Components to Function Components](https://www.robinwieruch.de/react-hooks-migration)
- [API de Referência dos Hooks](https://pt-br.reactjs.org/docs/hooks-reference.html)
