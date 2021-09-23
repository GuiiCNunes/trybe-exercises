# Bloco 26 - Introdução ao desenvolvimento Web com NodeJS

## Node.js - Introdução

### Módulos Node

Conjunto de funcionalidades isolada do restante do código. Com variáveis, funções, classes,... separadas e dentro de um escopo próprio.
São de 3 tipos:

- Módulos Internos: (core modules) são inclusos no Node e instalados juntos. Exemplos:
  * [fs](https://nodejs.org/api/fs.html) : Fornece uma API para interagir com o sistema de arquivos de forma geral;
  * [url](https://nodejs.org/api/url.html) : Provê utilitários para ler e manipular URLs;
  * [querystring](https://nodejs.org/api/querystring.html) : Disponibiliza ferramentas para leitura e manipulação de parâmetros de URLs;
  * [util](https://nodejs.org/api/util.html) : Oferece ferramentas e funcionalidades comumente úteis a pessoas programadoras.
- Módulos Locais: são funcionalidades definidas com a nossa aplicação, estando em arquivos diferentes. Podendo ser publicados no NPM, virando
- Módulos de Terceiros: são criados por outras pessoas e disponibilizados para uso no NPM.

### Importando e exportando módulos

Existem dois sistemas de módulso:

- Módulos ES6: nome vem do ECMAScript 6. Para importá-los se usa o `import` e para exportá-los o `export`. Não é suportado pelo Node de forma nativa, sendo necessário o uso de transpiladores ([Babel](https://babeljs.io/)) ou supersets de linguagem ([Typescript](https://www.typescriptlang.org/))
- Módulos CommonJS: nativo do Node. **Será o utilizado.**

### CommonJS

#### Exportando módulos

Utiliza-se a variável global `module.exports`, atribuindo o que desejamos exportar.

```
// brlValue.js
const brl = 5.37;

module.exports = brl;
```

O `module`garante o isolamento do código, fazendo com que só seja acessível aos que o importam.

Exemplos:

```
// brlValue.js
const brl = 5.37;

const usdToBrl = (valueInUsd) => valueInUsd * brl;

module.exports = usdToBrl;
```

```
// index.js
const convert = require('./brlValue');

const usd = 10;
const brl = convert(usd);

console.log(brl) // 53.7
```

Exportando 2 coisas com um objeto:
```
// brlValue.js
const brl = 5.37;

const usdToBrl = (valueInUsd) => valueInUsd * brl;

module.exports = {
  brl,
  usdToBrl,
};
```

#### Importando módulos

Para importar módulos, utiliza-se o `require`.

- Módulos Locais: `require('./meuModulo')`. É possivel importar uma pasta, quando a funcionalidade está distribuida em vários arquivos. Para isso a pasta precisa ter um arquivo `index.js`. Ele importa todos os módulos e o exporta de maneira única. Exemplo:

```
// meuModulo/funcionalidade-1.js

module.exports = function () {
  console.log('funcionalidade1');
}

// meuModulo/funcionalidade-2.js

module.exports = function () {
  console.log('funcionalidade2');
}

// meuModulo/index.js
const funcionalidade1 = require('./funcionalidade-1');
const funcionalidade2 = require('./funcionalidade-2');

module.exports = { funcionalidade1, funcionalidade2 };

// minha-aplicacao/index.js
const meuModulo = require('./meuModulo');1

console.log(meuModulo); // { funcionalidade1: [Function: funcionalidade1], funcionalidade2: [Function: funcionalidade2] }

meuModulo.funcionalidade1();
```

- Módulos Internos: Passamos como parâmetro o nome do pacote. Exemplo:
```
const fs = require('fs');

fs.readFileSync('./meuArquivo.txt');
```

- Módulos de terceiros: Passamos como parâmetro o nome. A diferença é que é necessário primeiro sua instalação.

### NPM

[Cheat Sheet](https://github.com/tryber/Trybe-CheatSheets/blob/master/backend/nodejs/npm/README.md)

#### npm init

Permite criar um novo pacote Node.js na pasta onde é executado. Pede informações ao ser executado, para pular e ir no padrão `npm init -y`. O resultado desse comando é criar um arquivo `package.json` com as respostas e alguns metadados.
Dentro desse arquivo teremos os `scripts` e outras configurações ( como o `main`, que aponta o primeiro arquivo a ser chamado no pacote).

#### npm run

Esse comando faz com que o npm rode o `script` desejado, que esta configurado no `package.json`. Estes são atalhos que executam determinadas tarefas. Para criar um `script` basta adicionar uma nova chave em `scripts` no `package.json`, a chave será o atalho em si, e o valor o comando que desejamos. Exemplo:

```
{
  "scripts": {
    "lint": "eslint ."
  }
}
```
```
// Sintaxe
npm run <nome do script>

// Exemplo
npm run lint
```

#### npm start

É um script que não depende do `npm run`. É o comando que executa a aplicação principal do pacote. Exemplo:
```
// Pacote que calcula o IMC
{
  // ...
  "scripts": {
    "start": "node imc.js"
  }
  // ...
}
```
**OBS.**: O `node` é utilizado para chamar o arquivo desejado.

Essa padronização veio para os desenvolvedores saberem sempre como iniciar o pacote.

#### npm install

Responsável por instalar os pacotes. Formas de uso:

- `npm install <nome do pacote>`: Baixa o pacote do registro do NPM e o adiciona ao objeto `dependencies` do `package.json`.
- `npm install -D <nome do pacote>`: Semelhante ao anterior, mas adiciona o pacote ao `devDependencies`. Indicando que o pacote não é necessário para executar a aplicação, mas para o desenvolvimento é.
- `npm install`: Baixa e instala todos os pacotes listados nos objetos de `dependencies` e `devDependencies` do `package.json`.

## Links

- [NPM Comandos Cheat Sheet](https://github.com/tryber/Trybe-CheatSheets/blob/master/backend/nodejs/npm/README.md)
- [Documentação oficial do Node.js](https://nodejs.org/en/docs/)
- [Documentação oficial do NPM](https://docs.npmjs.com/)
- [Vídeo: Node.js // Dicionário do Programador](https://www.youtube.com/watch?v=vYekSMBCCiM&t=426s)
- [O guia completo do package.json do Node.js](https://www.luiztools.com.br/post/o-guia-completo-do-package-json-do-node-js/)
- [Tudo que você queria saber sobre o package-lock.json mas estava com vergonha de perguntar](https://medium.com/trainingcenter/tudo-que-voc%C3%AA-queria-saber-sobre-o-package-lock-json-mas-estava-com-vergonha-de-perguntar-e70589f2855f)
- [Entendendo módulos ES6](https://medium.com/trainingcenter/entendendo-m%C3%B3dulos-no-javascript-73bce1d64dbf)
- [JavaScript Transpilers: What They Are & Why We Need Them](https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them)
