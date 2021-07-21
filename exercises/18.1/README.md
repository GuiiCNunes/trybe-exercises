# Bloco 18 - Context API e React Hooks

## Context API do React

É uma opção ao *Redux*, tambem podem ser utilizados juntos. As diferenças são que o *Context API* é nativo do *React*, não precisa de instalação de *lib* externa, não utiliza *props* ou *callbacks* manualmente, mas só passa o estado para os componentes filhos do componente que o criou. Componentes que não estão na arvore não recebem o estado.
**O problema que o *Context API* ataca é o *prop drilling***, ou seja, a necessidade de se ficar passando informação via *props* para componentes que não vão utilizar essa informação, mas sim passar para o seu filho, que irá passar para outro filho e assim por diante, até chegar no componente que de fato utilizará a informação. Qualquer erro no percurso demandaria tempo para ser encontrado, fora o excesso de código repetitivo e sem utilizade.

### Funcionamento

Para utilizar o *Context API* é necessário criar um *context*, com:

```
import React, { createContext } from 'react';

const MyContext = createContext(defaultValue);

export default MyContext;
```

O `createContext` retorna um objeto que possui duas propriedades, uma é o `Provider` e outra o `Consumer`. Ele recebe como argumento um objeto que será utilizado como valor padrão, caso não exista um `provider` vinculado. Por ser chamado em vários componentes diversos, tanto para criar o `Provider` quanto para chamar o `Consumer`, é uma boa prática criá-lo em um arquivo separado e exportá-lo/importá-lo para uso.

O `Provider` encapsula os componentes filhos (semelhante ao `BrowserRouter` e ao `Provider` do Redux) e passa o conteúdo do `value`, podendo ser qualquer tipo do JS(*string*, *number*, *object*, *array*, *func*), para o `Consumer` utilizar. Como:

```
<MyContext.Provider value={/* algum valor compartilhado */}>
  ...
</MyContext.Provider>
```

O `Consumer` **deve** ter como filho uma função, e essa recebe o `value` do `Provider` como argumento. Como:

```
function MyComponent() {
  return (
    <MyContext.Consumer>
      {(value) => {
        /* renderiza algo utilizando o valor recebido do contexto */
      }}
    </MyContext.Consumer>
  )
}
```

O `Consumer` utiliza o *value* do `Provider` correspondente mais próximo, caso não exista, ele utiliza o `defaultValue` (esse é o valor passado como argumento no `createContext`).

### Exemplo

*MyContext.js*

```
import React, { createContext } from 'react';

const MyContext = createContext();

export default MyContext;
```

*MyComponent.js*

```
import React from 'react';

import MyContext from './MyContext';

function MyComponent() {
  return (
    <MyContext.Provider value={123}>
      <MyOtherComponent />
    </MyContext.Provider>
  )
}

export default MyComponent;
```

*MyOtherComponent.js*

```
import React from 'react';

import MyContext from './MyContext';

function MyOtherComponent() {
  return (
    <MyContext.Consumer>
      {(value) => (
        <Something />
      )}
    </MyContext.Consumer>
  )
}

export default MyOtherComponent;
```

### contextType

É possível utilizar o `context` tanto com componentes de função quanto de classe. Mas os de classe possuem um diferencial, o `contextType`. Com ele é possível chamar o `this.context`, tirando a necessidade de um `Consumer`, como no exemplo:

```
const MyContext = createContext();

class MyComponent extends React.Component {
  componentDidMount() {
    const value = this.context;
    // ...
  }

  render() {
    const value = this.context;
    // ...
  }
}

MyComponent.contextType = MyContext;
```

Pode ser utilizado por qaulquer um dos *lifecycle method*. Cabendo destacar que só um *context* pode ser utilizado no componente. Para acessar outros, é necessário o uso do `Consumer`.

## Links

- [React Context & Hooks Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9hNokByJilPg5g9m2APUePI)
- [Documentação oficial do React sobre Context API](https://reactjs.org/docs/context.html)
- [Entendendo a Context API do React: criando um componente de loading](https://medium.com/reactbrasil/entendendo-a-context-api-do-react-criando-um-componente-de-loading-a84f84007dc7)
- [Tyler McGinnis - React Render Props](https://tylermcginnis.com/react-render-props/)
- [Documentação oficial do React sobre Render Props](https://reactjs.org/docs/render-props.html)
- [Uma comparação entre Context API e Redux: React Context vs Redux - Who wins?](https://www.youtube.com/watch?v=OvM4hIxrqAw)
