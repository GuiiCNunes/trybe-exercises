# Bloco 16 - Gerenciamento de estado com Redux

## Introdução ao Redux - O estado global da aplicação

*Redux* é como um estado global da aplicação, ele evita que seja necessário 'escavar' informações. Se você precisa utilizar uma informação de um componente em outro, que não compartilham o mesmo elemento pai, fica sucetível ao erro, pois você precisaria transitar essa informação (*state* e *props*) por componentes que não utilizariam ela. O *Redux* ataca esse problema com uma *store* global, e outros elementos:

- *actions*: Possíveis ações que a aplicação pode realizar na *store*. Elas são **intenções** de mudança de estado. Representam regras de negócio.
- *stores*: É onde os estados da aplicação são guardados, de maneira segura. Para garantir a integridade dos dados, as mudanças e consultas só são realizadas por *actions* pré-definidas. 
- *reducers*: Evitam que a *store* seja manipulada diretamente, facilitando a manutenção do código. Seguem as regras definidas pelas *actions*.

- Analogia a uma padaria.
  - *store* é o forno, *Reducer* é o padeiro e as *actions* seriam suas atribuições.
  - O cliente entra na padaria com a **intenção** de comprar um pão e solicita (*action*) ao padeiro (*reducer*), isso coloca a **intenção** a ser executada.
  - Após a socilitação (*action*), o padeiro(*action*) vai até o forno (*store*) e retira um pão, atualizando a quantidade de pães em menos um.
  - Ele leva o pão até o cliente e encerra o fluxo.
  - Durante cada agente cumpriu seu papel, evitando conflitos.

### Criar uma store

Para criar uma *store* utiliza-se o comando:

```
const store = Redux.createStore(reducer);
```

Exercício e mais informações [aqui](https://www.freecodecamp.org/learn/front-end-libraries/redux/create-a-redux-store?messages=success%5B0%5D%3Dflash.signin-success).

Sendo o `reducer` uma *callback* com a regra de negócio.

### Pegando valores

Para pegar algum valor de dentro da *store*, utiliza-se o comando:

```
const currentState = store.getState();
```

Caso o *state* do *store* possua mais de uma chave, a sintaxe fica: `store.aquelaKey.getState()`.

Exercício e mais informações [aqui](https://www.freecodecamp.org/learn/front-end-libraries/redux/get-state-from-the-redux-store).

### Definir uma action

*Actions* são objetos em JS que guardam relação com um evento que ocorreu. A *store* recebe essas informações e atualiza seu estado de acordo com elas. Podem carregar dados ou não, mas é obrigatório que carreguem o seu *type*.

```
const action = { type: 'LOGIN' };
```

Exercício e mais informações [aqui](https://www.freecodecamp.org/learn/front-end-libraries/redux/define-a-redux-action).

- ***Action Creator***: é responsabilidade dele enviar a *action* para o *Redux store*. Ele nada mais é que uma função que retorna a *action* (ou seja, o objeto).

### Dispatch

É uma função que envia uma action para o *reducer*, atualizando a *store*. Exemplo:

```
store.dispatch(setUser())
```

A função `setUser()`, no caso, retorna um objeto contendo dados do usuário. **Ela é um *Action Creator***.

### Reducers

É apenas uma função que recebe um `state` e uma `action` como parâmetros e retorna um novo `state`. Servindo para alterar a *store*. Ele **nunca deve chamar um endpoint de uma API**.
O `state`deve ser *read-only*, ou seja, ele sempre deve retornar uma nova cópia do `state` e nunca modificar o `state` diretamente.

Exercício e mais informações [aqui](https://www.freecodecamp.org/learn/front-end-libraries/redux/handle-an-action-in-the-store).

### Combinando Reducers

Para colcoar multiplos *reducers*, com regras específicas, apontando para um mesmo *store*, utiliza-se a função `combineReducers()`. Ela recebe como parâmetro um objeto contendo todos os *reducer* necessários. Exemplo de uso:

```
// Arquivo index.js

import { combineReducers } from 'redux';
import meuReducer from './meuReducer';
import meuOutroReducer from './meuOutroReducer';

const reducerCombinado = combineReducers({
  meuReducer,
  meuOutroReducer});

export default reducerCombinado;
```

Após isso basta fazer a importação no *store*, assim:

```
import { createStore } from 'redux';
// Importando o reducer combinado que fizemos logo acima
import reducerCombinado from './reducers/index';

const store = createStore(reducerCombinado);
...
```

Documentação sobre a função [aqui](https://redux.js.org/api/combinereducers/).

### Listeners

É possível atribui uma *callback* que será executada toda vez que a *store* for alterada. Para isso, utiliza-se a função `store.subscribe()`, passando a *callback* a ser executada como parâmetro.

Documentação sobre a função [aqui](https://www.freecodecamp.org/learn/front-end-libraries/redux/register-a-store-listener)

## Exercísios do CodeCamp

01. [Definindo um action creator](https://www.freecodecamp.org/learn/front-end-libraries/redux/define-an-action-creator)
02. [Enviando uma action para um reducer](https://www.freecodecamp.org/learn/front-end-libraries/redux/dispatch-an-action-event)
03. [Criando um Reducer para receber e manipular uma action](https://www.freecodecamp.org/learn/front-end-libraries/redux/handle-an-action-in-the-store)
04. [Criando um reducer que aceita actions de tipos distintos](https://www.freecodecamp.org/learn/front-end-libraries/redux/use-a-switch-statement-to-handle-multiple-actions)
05. [Usando const para os action types](https://www.freecodecamp.org/learn/front-end-libraries/redux/use-const-for-action-types/)
06. [Registrando um listener para no store](https://www.freecodecamp.org/learn/front-end-libraries/redux/register-a-store-listener)
07. [Combinando múltiplos reducers](https://www.freecodecamp.org/learn/front-end-libraries/redux/combine-multiple-reducers)
08. [Enviando dados através das actions](https://www.freecodecamp.org/learn/front-end-libraries/redux/send-action-data-to-the-store)
09. [Criando um contador com Redux]https://www.freecodecamp.org/learn/front-end-libraries/redux/write-a-counter-with-redux()
10. [Por que nunca modificar um state ?](https://www.freecodecamp.org/learn/front-end-libraries/redux/never-mutate-state)
11. [Utilizando o spread operator como ferramenta para manter a imutabilidade do state](https://www.freecodecamp.org/learn/front-end-libraries/redux/use-the-spread-operator-on-arrays)
12. [Removendo itens de um array preservando a imutabilidade](https://www.freecodecamp.org/learn/front-end-libraries/redux/remove-an-item-from-an-array)
13. [Trabalhando com Object.assign](https://www.freecodecamp.org/learn/front-end-libraries/redux/copy-an-object-with-object-assign)

## Links

- [Redux utilizando apenas JS!](https://medium.com/jaguaribetech/introdu%C3%A7%C3%A3o-ao-redux-usando-apenas-javascript-6d6d55bd9be4)
- [Conceitos do Redux](https://alligator.io/redux/redux-intro/)
- [5 motivos para aprender Redux](https://blog.getty.io/5-motivos-para-aprender-redux-6ac730f3f1f2)
- [Tutorial da página da documentação do Redux](https://redux.js.org/basics/basic-tutorial)
- [Introdução ao Flux](https://www.freecodecamp.org/news/an-introduction-to-the-flux-architectural-pattern-674ea74775c9/)
- [Curso feito pelo criador do Redux](https://egghead.io/courses/getting-started-with-redux)
- [O que são funções puras ?](https://www.freecodecamp.org/news/why-redux-needs-reducers-to-be-pure-functions-d438c58ae468/)
