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

### Keys

É uma boa prática colocar *keys* nos componentes criados em laços de repetição, de forma a facilitar a sua identificação e manipulação. Essa *key* deve ser um valor único que identifique o componente.

### Checagem de tipos

Para chegar os tipos presentes no *props*, utiliza-se a bilbioteca *prop-types*.
É preciso importar ela, e, antes do `export default` adicionar um objeto com as variáveis que serão recebidas e o seu tipo, atribuindo esse objeto a função `.propTypes`. Exemplo:

```
import React from 'react';
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (<h1>Hello, {this.props.name} {this.props.lastName}</h1>);
  }
}

Greeting.propTypes = {
  name: PropTypes.string,
  lastName: PropTypes.string,
};

export default Greeting;
```

Pode ser acrescentado um `.isRequired`, após a identificação do tipo (`PropTypes.string`) para sinalizar que aquela *props* pode ficar sem valor.

Obs.: Caso **não** tenha utilizado o `create-react-app` para preparar o aplicativo **React** , será necessário o download da depedência externa do **PropTypes** através do seguinte comando: `npm install --save-dev prop-types` .

#### Principais validadores:

```
MeuComponente.propTypes = {
  // Todos os validadores aqui são, por padrão, validadores opcionais.
  // Para torná-los obrigatórios basta adicionar .isRequired
  numeroObrigatório: PropTypes.number.isRequired,

  // Tipos básico do JS.
  stringOpcional: PropTypes.string,
  numeroOpcional: PropTypes.number,
  booleanoOpcional: PropTypes.bool,
  funcaoOpcional: PropTypes.func,
  objetoOpcional: PropTypes.object,
  arrayOpcional: PropTypes.array,

  // Um array de determinado tipo básico
  arrayDe: PropTypes.arrayOf(PropTypes.number),

  // Um objeto de determinado tipo básico
  objetoDe: PropTypes.objectOf(PropTypes.number),

  // Um objeto com forma específica
  objetoComForma: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
  }),

  // Um objeto que não permite props extras
  objetoComFormatoRigoroso: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number,
    avaibility: PropTypes.bool,
  }),
};
```

### Props Default

Pode ser atribuído um valor padrão para as *props* dentro do componente. Basta chamar a função `.defaultProps` do componente, antes do `export default` e atribuir um objeto, onde cada chave será a variável utilizada, e o valor o *default* dela.

```
UserName.defaultProps = {
  name: 'Stranger',
}
```

## Links

- [Index as a key is an anti-pattern, por Robin Pakorny](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)
- [React - PropTypes](https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html#proptypes)
- [ReactJS - Documentação oficial do React](https://pt-br.reactjs.org/)
- [W3Schools - React Components](https://www.w3schools.com/react/react_components.asp)
- [W3Schools - React Props](https://www.w3schools.com/react/react_props.asp)
- [Medium - React JS — Understanding Functional & Class Components](https://codeburst.io/react-js-understanding-functional-class-components-e65d723e909)
- [FullStack React - Repeating Elements](https://www.fullstackreact.com/30-days-of-react/day-13/#repeating-elements)
- [freeCodeCamp - Exercise](https://www.freecodecamp.org/learn/front-end-libraries/react/write-a-react-component-from-scratch)
- [Bit - Discover Components](https://bit.dev/components)
- [React Basics - Understanding React PropTypes - Episode #8](https://www.youtube.com/watch?v=XLthy2j_CCQ)