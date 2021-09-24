# Bloco 26 - Introdução ao desenvolvimento Web com NodeJS

## Node.js - Fluxo Assíncrono

### Callbacks

- `node-style`: são *callbacks* que recebem dois parâmetros, erro e resultado. Sendo uma convenção nas API. Ex.:

```
const fs = require('fs');

fs.readFile('./arquivo.txt', (err, content) => {
  if (err) {
    console.error(`Erro ao ler o arquivo: ${err.message}`);
    return;
  }

  console.log(`Arquivo lido com sucesso. Conteúdo: ${content.toString('utf8')}`);
});
```

Lado ruim é que o resultado da operação só existe naquela *callback*. Para utilizarmos o resultado, precisariamos colocar outra *callback* dentro. O que pode gerar uma identação nada amistosa, aumentando a dificuldade de ler e dar manuteção ao código. Isso é chamado de ***callback hell***.

### Promises

Resolver o ***callback hell***. Podem ser **resolvidas**(`ressolve`) ou **rejeitadas**(`reject`). Sintaxe:

```
const p = new Promise((resolve, reject) => {
  // Aqui é onde vamos realizar a lógica que precisamos
  // para "tentar cumprir" a promessa
});
```

#### Exemplos

```
// Tratando erros de forma sincrona
function dividirNumeros(num1, num2) {
  if (num2 == 0) throw new Error("Não pode ser feito uma divisão por zero");

  return num1 / num2;
}

try {
  const resultado = dividirNumeros(2, 1);
  console.log(`resultado: ${resultado}`);
} catch (e) {
  console.log(e.message);
}
```

```
// Tratando erros de forma assíncrona
function dividirNumeros(num1, num2) {
  const promise = new Promise((resolve, reject) => {
    if (num2 == 0) reject(new Error("Não pode ser feito uma divisão por zero"));

    const resultado = num1 / num2;
    resolve(resultado)
  });

  return promise;
}

dividirNumeros(2, 1)
  .then(result => console.log(`sucesso: ${result}`))
  .catch(err => console.log(`erro: ${err.message}`));
```

**Utilizando junto com `node-style callback`:**

```
const fs = require('fs');

function readFilePromise (fileName) {
  return new Promise((resolve, reject) => {

    fs.readFile(fileName, (err, content) => {
      if (err) return reject(err);
      resolve(content);
    });

  });
}

// Uso
// ...

readFilePromise('./file.txt') // A função me promete que vai ler o arquivo
  .then((content) => { // Caso ela cumpra o que prometeu
    console.log(`Lido arquivo com ${content.byteLength} bytes`); // Escrevo o resultado no console
  })
  .catch((err) => { // Caso ela não cumpra o que prometeu
    console.error(`Erro ao ler arquivo: ${err.message}`); // Escrevo o erro no console
  });
```

**Exemplo de resolução do *callback hell*, chamando várias *promises*:**
```
const fs = require('fs');

function readFilePromise (fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, content) => {
      if (err) return reject(err);
      resolve(content);
    });
  });
}

readFilePromise('file1.txt') // A função me promete que vai ler o arquivo
  .then((content) => { // Caso arquivo 1 seja lido,
    console.log(`Lido file1.txt com ${content.byteLength} bytes`); // Escrevo o resultado no console
    return readFilePromise('file2.txt'); // Chamo novamente a função, que me retorna uma nova Promise
  })
  .then(content => { // Caso a Promise retornada pelo `then` anterior seja resolvida,
    console.log(`Lido file2.txt com ${content.byteLength} bytes`); // Escrevemos o resultado no console
    return readFilePromise('file3.txt'); // E chamamos a função novamente, recebendo uma nova promessa
  })
  .then((content) => { // Caso a promessa de leitura do `file3.txt` seja resolvida,
    console.log(`Lido file3.txt com ${content.byteLength} bytes`); // Logamos o resultado no console
  })
  .catch((err) => { // Caso qualquer uma das promessas ao longo do caminho seja rejeitada
    console.log(`Erro ao ler arquivos: ${err.message}`); // Escrevemos o resultado no console
  });
```

### Lendo arquivos com métodos síncronos

Para isso utilizamos o módulo nativo do Node, o `fs`.

```
// io-local/readFileSync.js
const fs = require('fs');

const nomeDoArquivo = 'meu-arquivo.txt';

try {
  const data = fs.readFileSync(nomeDoArquivo, 'utf8');
  console.log(data);
} catch (err) {
  console.error(`Erro ao ler o arquivo: ${err.path}`);
  console.log(err);
}
```

- `fs.readFileSync`: recebe dois parâmetros, o primeiro o nome do arquivo e o segundo uma *string* com a decodificação a ser utilizada( este ultimo é opcional).

### Lendo arquivos com métodos assíncronos

Para a leitura assíncrona é utilizado a função `fs.readFile`. Exemplo:

```
io-local/readFile.js
const fs = require('fs');

const nomeDoArquivo = 'meu-arquivo.txt';

fs.readFile(nomeDoArquivo, 'utf8', (err, data) => {
  if (err) {
    console.error(`Não foi possível ler o arquivo ${nomeDoArquivo}\n Erro: ${err}`);
    process.exit(1);
  }
  console.log(`Conteúdo do arquivo: ${data}`);
});
```

O método recebe trÊs parâmetros:

1. Nome do arquivo.
2. (Opcional) Define o *enconding* utilizado para a leitura.
3. Uma *callback* para receber e manipular os dados lidos.
  - Está *callback* recebe 2 parâmetros: `err` e `data`. O primeiro recebe o erro, se ocorrer. E o segundo o conteúdo do arquivo, caso não ocorra o erro.
  
**Pode ser utilizado com *Promises*, que é mais recomendado**:
*Para isso a importação fica diferente.*

```
const fs = require('fs').promises;

const nomeDoArquivo = 'meu-arquivo.txt';

fs.readFile(nomeDoArquivo, 'utf8')
  .then((data) => {
    console.log(`Conteúdo do arquivo: ${data}`);
  })
  .catch((err) => {
    console.error(`Não foi possível ler o arquivo ${nomeDoArquivo}\n Erro: ${err}`);
    process.exit(1); // Encerra a execução do script e informa ao sistema operacional que houve um erro com código
  });
```

### Escrevendo dados em arquivos

Para isso utilizamos o método `writeFile`. Pode ser utilizado com *callbacks* e *Promises* (mais recomendado).

```
const fs = require('fs').promises;

fs.writeFile('./meu-arquivo.txt', 'Meu textão')
  .then(() => {
    console.log('Arquivo escrito com sucesso!');
  })
  .catch((err) => {
    console.error(`Erro ao escrever o arquivo: ${err.message}`);
  });
```

### Utilizando async/await

Utilizados para tratar *Promises* como código síncrono.
Exemplo:

```
const fs = require('fs').promises;

async function main() {
  try {
    await fs.writeFile('./meu-arquivo.txt', 'Meu textão');
    console.log('Arquivo escrito com sucesso!');
  } catch (err) {
    console.error(`Erro ao escrever o arquivo: ${err.message}`);
  }
}

main()
```

**Funções que recebem o `async` passam a retornar uma *promise*.**
**Possui um terceiro parâmetro opcional:**

- *[flag](https://nodejs.org/api/fs.html#fs_file_system_flags)*: Se `w`, reescreve o arquivo se existir (padrão). Se `wx`, dispara um erro caso o arquivo já exista.

```
const fs = require('fs').promises;

// A flag wx abre o arquivo para escrita **apenas** caso ele não exista. Caso o contrário, um erro será lançado
fs.writeFile('./meu-arquivo.txt', 'Eu estive aqui :eyes:', { flag: 'wx' })
  .then(() => {
    console.log('Arquivo salvo');
  })
  .catch((err) => {
    // Se o arquivo existir, um erro é retornado
    console.error('err');
  });
```

### Promise.all

Recebe um *array* de *Promises* e retorna uma única *Promise*. Ela é resolvida assim que todas as *Promises* forem resolvidas. Utilizando um único `catch`, que será chamado caso qualquer uma das *Promises* seja rejeitada.

```
const fs = require('fs').promises;

Promise.all([
  fs.readFile('file1.txt'),
  fs.readFile('file2.txt'),
  fs.readFile('file3.txt'),
])
  .then(([file1, file2, file3]) => {
    const fileSizeSum = file1.byteLength + file2.byteLength + file3.byteLength;
    console.log(`Lidos 3 arquivos totalizando ${fileSizeSum} bytes`);
  })
  .catch((err) => {
    console.error(`Erro ao ler arquivos: ${err.message}`);
  });
```

## Links

- [Asynchrony: Under the Hood - Shelley Vohr - JSConf EU](https://www.youtube.com/watch?v=SrNQS8J67zc)
- [Entendendo Promises de uma vez por todas](https://medium.com/trainingcenter/entendendo-promises-de-uma-vez-por-todas-32442ec725c2)
- [Using Promises | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [Promises | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Entenda tudo sobre Async/Await](https://showmethecode.com.br/async-await/)
- [Entendendo funções callback em JavaScript](https://medium.com/totvsdevelopers/entendendo-fun%C3%A7%C3%B5es-callback-em-javascript-7b500dc7fa22)
- [ECMAScript proposal: Top-level await](https://github.com/tc39/proposal-top-level-await)