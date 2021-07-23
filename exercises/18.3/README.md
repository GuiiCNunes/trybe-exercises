# Bloco 18 - Context API e React Hooks

## React Hooks - useEffect e Hooks customizados

O `useEffect()` vem para substituir os *Lifecycle methods* : `componentDidMount` , `componentWillUnmount` , `componentDidUpdate` dos componentes de classe nos componentes funcionais. Com ele é possível executar funções assim que o componente for montado, atualizado ou antes de ser desmontado. Tudo isso em uma mesma sintaxe:

```
useEffect(() => {}, []);
```

Ele recebe dois argumentos, o primeiro é a função que será executada e o segundo é um *array*. Para saber qual método ele esta utilizando:

- `componentDidMount`: O *array* do segundo argumento é vazio.
- `componentDidUpdate`: O *array* do segundo argumento possui elementos, esses elementos são os que, se foram atualizado, disparam a execuçaõ da função. **Esses elementos devem ser estados, ou seja, devem estar ligados ao `useState`**.
- `componentWillUnmount`: Esse é o retorno da função passada como no primeiro argumento. Ele **deve ser uma outra função**, que será executada antes de desmanchar o componente.

Podem ter quantos `useEffect`forem necessários, como tambem mesclar vários em um (quando necessário).

### Exemplos


*componentDidMount*

```
import React, { useEffect, useState } from 'react';

function App() {
  const [pokemons, setPokemons] = useState([]);

  // useEffect sendo utilizado como componentDidMount

   useEffect(() => {
     const getPokemons = async () => {
      const endpoint = 'https://pokeapi.co/api/v2/pokemon?limit=$151';
      const { results } = await fetch(endpoint).then((data) => data.json());
      setPokemons(results)
    }

    getPokemons();
  }, []);

  return (
    <div>
      <h1>Trybe Go</h1>
      <button type="button">Buscar +10</button>
      <ul>
        {
          pokemons.map(({ name }) => <li key={name}>{name}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
```

*componentDidUpdate*

```
 import React, { useEffect, useState } from 'react';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [limit, setLimit] = useState(10);

  const handleMorePokemons = () => {
    setLimit(limit + 10);
    console.log(limit);
  };


  // Nesse caso, utilizamos o limit como segundo argumento no useEffect, 
  // pois dessa forma, ao clicar no botão, o estado será atualizado
  // e irá trazer mais dez pokemons da lista.

   useEffect(() => {
     const getPokemons = async () => {
      const endpoint = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
      const { results } = await fetch(endpoint).then((data) => data.json());
      setPokemons(results)
    }

    getPokemons();
  }, [limit]);

  // A sintaxe abaixo é análoga ao componentWillUnmount, para utilizá-la é necessário a chamada de uma callback dentro do useEffect.

  // useEffect(() => () => alert('unmount), [])

  return (
    <div>
      <h1>Trybe Go</h1>
      <button type="button" onClick={handleMorePokemons}>Buscar +10</button>
      <ul>
        {
          pokemons.map(({ name }) => <li key={name} >{name}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
```

**Nos exemplos, a função `getPokemons` existe para possibilitar o uso do `async` e `await` sem os *warnings* no console. LEMBRE-SE DE CHAMÁ-LA**

### Criando Hooks

Para criar *hooks* basta criar uma função externa que possui um state próprio, esta função retorna um *array* de dois elementos. O primeiro é o *state* do nosso *hook* e o segundo é o que dispara a mudança nele. Antes do retorno pode ser feito qualquer tratamento da informação necessário, deixando assim o código que utiliza o *hook* de fácil entendimento e manutenção. Como no exemplo:

```
// src/hooks/useAbility.js

import { useState, useEffect } from 'react';

const useAbility = () => {
  const [pokeUrl, setPokeUrl] = useState('');
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    const getAbilities = async () => {
      if (pokeUrl) {
        const { abilities: abilitiesList } = await fetch(pokeUrl)
        .then((data) => data.json());

        // map feito para percorrer a lista de habilidades e retornar o nome das mesmas.
        const result = abilitiesList.map(({ ability: { name } }) => name);

        setAbilities(result);
      }
    };
    getAbilities();
  }, [pokeUrl]);
  
  return [abilities, setPokeUrl]
};

export default useAbility;
```

```
import React, { useEffect, useState } from 'react';
import useAbility from './hooks/useAbility';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [limit, setLimit] = useState(10);
  const [abilities, setPokeUrl] = useAbility();

  const handleMorePokemons = () => {
    setLimit(limit + 10);
  };

  useEffect(() => {
    const getPokemons = async () => {
     const endpoint = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
     const { results } = await fetch(endpoint).then((data) => data.json());
     setPokemons(results)
    }

    getPokemons();
  }, [limit]);
 
  return (
    <div>
      <h1>Trybe Go</h1>
      <p>{ abilities.toString() }</p>
      <button type="button" onClick={handleMorePokemons}>Buscar +10</button>
      <ul>
        {
          pokemons.map(({ name, url }) => <li key={name} onClick={() => setPokeUrl(url)} >{name}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
```

**Um *hook* personalizado, por convenção, recebe um nome que comece com a palavra `use`.**

### Hooks criados pela comunidade

A comunidade cria *hooks* para facilitar o desenvolvimento. Como exemplos temos:

- Hooks de Redux
- Hooks de React Route Dom
- Entre muitos outros

## Links

- [React Hooks: How to use useEffect()](https://medium.com/javascript-in-plain-english/react-hooks-how-to-use-useeffect-ecea3e90d84f)
- [Writing Your Own Custom React Hooks](https://blog.bitsrc.io/writing-your-own-custom-hooks-4fbcf77e112e)
- [useHooks - Easy to understand React Hook recipes by Gabe Ragland](https://usehooks.com/)
- [Using the Effect Hook](https://pt-br.reactjs.org/docs/hooks-effect.html)
- [10 React Hooks you Should Have in Your Toolbox](https://blog.bitsrc.io/10-react-custom-hooks-you-should-have-in-your-toolbox-aa27d3f5564d)
