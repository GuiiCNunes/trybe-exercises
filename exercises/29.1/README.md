# Bloco 29 - Arquitetura: SOLID e ORM

## Arquitetura - Princípios SOLID

* Acrônimo para 5 princípios.
* Mais focado em POO ( Programação Orientada a Objetos), mas também é aplicável em outros cenários similares.
* Letras:
  - `S` ingle responsibility principle ( Princípio da responsabilidade única ): uma classe deve ter apenas uma única responsabilidade;
  - `O` pen/Closed principle ( Princípio aberto/fechado ): entidades de software devem ser abertas para extensão, mas fechadas para modificação;
  - `L` iskov substitution principle ( Princípio de substituição de Liskov ): objetos em um programa devem ser substituíveis por instâncias de seus subtipos, sem alterar a funcionalidade do programa;
  - `I` nterface segregation principle ( Princípio da segregação da interface ): muitas interfaces de clientes específicas são melhores do que uma para todos os propósitos;
  - `D` ependency inversion principle ( Princípio da inversão da dependência ): deve-se depender de abstrações, não de objetos concretos.

* Quando aplicados na programação funcional:
  - `S` ingle responsibility principle ( Princípio da responsabilidade única ): uma classe ou função deve ter uma, e apenas uma, tarefa a realizar dentro do seu código;
  - `O` pen/Closed principle ( Princípio aberto/fechado ): você deve ser capaz de estender um comportamento de uma função sem modificar seus comportamentos já existentes;
  - ~~`L` iskov substitution principle ( Princípio de substituição de Liskov ): Não se aplica. Estudaremos este depois!~~
  - ~~`I` nterface segregation principle ( Princípio da segregação da interface ): Não se aplica. Estudaremos este depois!~~
  - `D` ependency inversion principle ( Princípio da inversão da dependência ): quem usa uma função deve ser capaz de determinar quais outros módulos ela usa em sua lógica.

### Configurações Eslint

Uma forma de manter as boas práticas e padronização do código, pontos que tem grande relação com o SOLID, é utilizar o Eslint.

* Instalação

```
npm i -D eslint eslint-config-trybe-backend
```
**OBS.**: O último pacote é da Trybe.

* Configurando com arquivo `.eslintrc.json`:

```
{
  "extends": ["trybe-backend"]
}
```

* Configurando excessões no arquivo `.eslintignore`
  - Similar ao `.gitignore`
```
tests
```

### Open/Closed principle

> Significa que, caso você precise acrescentar um comportamento ao seu código e isso não for possível sem mudar trechos de códigos que já existem, temos um problema. Veja bem: quando um código funciona e está em produção numa aplicação enorme, queremos evitar mudar o que já existe e funciona.

* Todo o código muda ao longo do tempo, o que se deve buscar é escrever um código que, no futuro, se possa **acrescentar comportamentos sem mudar os que já existem**.

* Exemplo, fez um programa que calcula a média total dos alunos. Na primeira escola a utilizar, a média era 7, e o programa foi feito para isso. Porem, mais escolas quiseram aderir ao software, com médias diferentes. Para que não seja necessário sempre ficar alterando o código para cobrir as novas médias.

> Você deve ser capaz de estender um comportamento de uma função sem modificar seus comportamentos já existentes.

### Dependency Inversion Principle

> Suponha que você quer escrever um programa em JavaScript que faz uma requisição para a [API de dad jokes](https://icanhazdadjoke.com/api) . Assim sendo, você escreve o seguinte código:

```
// ./dipExample.js

const fetch = require('node-fetch');

const url = 'https://icanhazdadjoke.com';

const requestWithFetch = () => {
  fetch(url, {
    headers: new fetch.Headers({
      Accept: 'application/json',
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data.joke))
    .catch((err) => console.log(err));
};

const getJokes = (numberOfJokes) => {
  for (let i = 0; i < numberOfJokes; i += 1) requestWithFetch();
};

getJokes(5);

module.exports = { getJokes };
```

A aplicação feita fica dependente da lib `node-fetch`.

Imagine que o `fetch`caia em um desuso. E seja necessário implementas o `axios` para novas funções. Porem, não se quer alterar o código antigo para que ele não venha a quebrar. Ficando algo assim:

```
// ./dipExample.js

const axios = require('axios').default;
const fetch = require('node-fetch');

const url = 'https://icanhazdadjoke.com';

const requestWithAxios = () => {
  axios
    .get(url, {
      headers: { Accept: 'text/plain' },
    })
    .then((response) => console.log(response.data));
};

// const requestWithFetch = () => {
// ...

const getJokes = (numberOfJokes, jokeRequester = requestWithFetch) => {
  for (let i = 0; i < numberOfJokes; i += 1) jokeRequester();
};

getJokes(5, requestWithAxios);

module.exports = { getJokes };
```

Agora quem chama a função poderá escolher se quer usar o `fetch` ou o `axios`.

> Quem usa decide como se usa.



## Links

- [Artigo científico](https://web.archive.org/web/20150906155800/http://www.objectmentor.com/resources/articles/Principles_and_Patterns.pdf)
- [Sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs)
- [Complexidade Cognitiva](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/cognitive-complexity.md)
- [Complexidade Ciclomática](https://eslint.org/docs/rules/complexity)
- [Número máximo de linhas](https://eslint.org/docs/rules/max-lines-per-function)
- [Número máximo de caracteres](https://eslint.org/docs/rules/max-lines-per-function)

- [SRP em JavaScript](https://medium.com/@felipecesr/princ%C3%ADpios-solid-princ%C3%ADpio-da-responsabilidade-%C3%BAnica-srp-4033232e4abd)
- [JavaScript Clean Code with SOLID](https://levelup.gitconnected.com/javascript-clean-code-solid-9d135f824180)
- [Who said SOLID is applicable only in OO languages?](https://hackernoon.com/who-said-solid-is-applicable-only-in-oo-languages-heres-how-you-can-do-it-in-javascript-yyyo3590)
- [Guia Completo de SOLID](https://medium.com/joaorobertopb/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530)
- [Vídeo - SOLID Object-Oriented Design by Sandy Metz](https://www.youtube.com/watch?v=v-2yFMzxqwU)
- [Vídeo - Single Responsibility Principle Explained - SOLID Design Principles by Web Dev Simplified](https://www.youtube.com/watch?v=UQqY3_6Epbg)
- [Vídeo - Dependency Inversion Principle Explained - SOLID Design Principles by Web Dev Simplified](https://www.youtube.com/watch?v=9oHY5TllWaU)
- [Vídeo - Open/Closed Principle Explained - SOLID Design Principles by Web Dev Simplified](https://www.youtube.com/watch?v=-ptMtJAdj40)
- [Design Principles and Design Patterns - Artigo que cunhou o termo SOLID](https://web.archive.org/web/20150906155800/http://www.objectmentor.com/resources/articles/Principles_and_Patterns.pdf)