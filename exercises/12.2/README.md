# Bloco 12 - Componentes com Estado, Eventos e Formulários com React

## Formulários no React

Os formulários no *React* tem uma estrutura semelhante ao do *html* normal, mas seus componentes precisam ser controlados pelo estado. Para isso é necessário ter chaves no objeto `state` com o mesmo *name* dos campos do formulário, e com o valor com o mesmo tipo do input. Alem disso, é necessário que o `value` do *input* seja definido pelo `state` e o evento seja uma função que utilize o `this.setState()`. Exemplo:

```
import React, { Component } from 'react'
import './Form.css'

class Form extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      estadoFavorito: '',
    };
  }


  handleChange(event) {
    this.setState({
      estadoFavorito: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <h1>Estados e React - Tecnologia fantástica ou reagindo a regionalismos?</h1>
        <form className="form">
          <label>
            Diga qual o seu Estado favorito! De React ou do Brasil, você decide! =)
              <textarea name="estadoFavorito" value={this.state.estadoFavorito} onChange={this.handleChange} />
          </label>
          <input
            type="number"
            name="idade"
          />
          <input
            type="checkbox"
            name="vaiComparecer"
          />
        </form>
      </div>
    );
  }
}

export default Form;
```

A função `handle` pode ser otimizada para colocar a chave como o `event.target.name` e o valor como `event.target.value`, assim uma função contempla todos os campos do formulário. **Atentar para os do tipo *checkbox*, que, ao invés do `value`, usa-se o `checked`**. Um *handle* genérico:

```
handleChange({ target }) {
  const { name } = target;
  const value = target.type === 'checkbox' ? target.checked : target.value;

  this.setState({
    [name]: value,
  });
}
```

***Inputs* do tipo `file` são componentes não controlados**, porque o `file` é somente leitura.

## Transmitindo informações do elemento filho para o pai

Consiste em passar o valor de atribuição via *props*, e com ele a função que atribui o valor ao *state*.
Ou seja, o componente pai é o único que possui o `state`, o filho recebe o valor e a função de alteração do `state` via *props*, depois apenas pega o novo valor adicionado e atribui a função, que é executada no componente pai.
**Todas as funções que manipulam o estado devem ser declaradas no elemento pai**. Exemplo:

```
import React from 'react';

class Button extends React.Component {
  render() {
    /* A função que altera o estado do componente pai chega
       ao componente filho via `props`! */
    const { handleClick } = this.props;

    return (<button type="button" onClick={handleClick} >Contar clique!</button>);
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);

    // O componente pai é o dono do estado!
    this.state = {
      numeroDeCliques: 0,
    };
  }

  /* A função de alterar o estado é definida no componente pai*/
  handleClick() {
    this.setState((estadoAnterior) => ({
      numeroDeCliques: estadoAnterior.numeroDeCliques + 1,
    }));
  }

  /* O componente filho recebe a função de alterar estado do pai via `props`,
     na forma de uma callback */
  render() {
    return (
      <div>
        <h1>{`${this.state.numeroDeCliques} cliques!`}</h1>
        <Button handleClick={this.handleClick} />
      </div>
    );
  }
}

export default App
```

## Links

- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)