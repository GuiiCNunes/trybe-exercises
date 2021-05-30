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

