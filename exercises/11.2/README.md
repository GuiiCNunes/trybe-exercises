# Bloco 11 - Introdução à React

## Componentes React

Duas maneiras de definir um componente *React*:

- Via função:

```
  function Greeting(props) {
    return (<h1>Hello, {props.name}</h1>);
  }

  export default Greeting;
```

- Via classe:

```
  import React from 'react';

  class Greeting extends React.Component {
    render() {
      return (<h1>Hello, {this.props.name}</h1>);
    }
  }

  export default Greeting;
```

Uma das diferenças entre ambas é que via classe é mostrado o que esta no método `reder()`, enquanto que por função é o `return`.

### props

São parâmetros passados aos componentes. Esses parâmetros são setados como *tags* de um elemento *html*. Como no caso do exemplo de componente criado via classe, poderíamos chamar ele com: `<Greeting name="Samuel" />`, isso faz com que o componente tenha uma *prop* igual a `{ name: "Samuel" }`. **Lembrando de utilizar o `this.` para chamar o *prop***.

### Difereça entre tags e componentes

Os componentes possuem suas iniciais em letra maiúscula.