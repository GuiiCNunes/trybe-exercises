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

## Links