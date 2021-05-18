# Bloco 10 - Testes automatizados com Jest

## Primeiros passos no Jest

Para executar o *Jest* é necessário dar um: `npm init -y` em uma pasta. Assim ela criará o arquivo *package.json*, esse arquivo terá um conteúdo semelhante a isso:

```
{
  "name": "pract",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Agora é necessário editar o valor da chave *test*, que está dentro de *scripts*. Seu valor deve ir de `"test": "echo \"Error: no test specified\" && exit 1"` para `"test": "jest"`.
Depois disso é só rodar o comando de instalação do *Jest*: `npm install --save-dev jest`

Explicações do que foi baixado e/ou criado:

- *package.json* é onde listamos as dependências e versões (entre outras informações da aplicação).
- *node_modules* é a pasta que guarda todos os arquivos baixados das dependências instaladas.
- *package-lock.json* é um arquivo que “trava” as versões das dependências. Quando outra pessoa executar *npm install* ou *npm i* para baixar as dependências, este arquivo garante que serão instaladas as mesmas versões para todo mundo.

Para rodar os testes basta dar um comando `npm test` na pasta onde foi instalado *Jest*.
**Os testes serão executados nos arquivos que possuem um *.test* ou *.spec* no nome, porque são os arquivos que o Jest reconhece.**

### test ou it

Dentro dos arquivos de teste deve ser chamada a função `test()` ou `it()` (que é um *alias*). Estas funções são globais, ou seja, ficam automaticamente disponíveis quando o *Jest* é instalado.
Estas funções esperam 3 argumentos. Sendo o primeiro o nome do teste, isso identifica o teste e também será o texto apresentado quando o teste for executado. O segundo argumento é uma função contendo suas ***expectations***, aqui que são executados os testes. O terceiro parâmetro é opcional, trata-se de um *timeout*, quanto tempo o Jest aguarda o teste antes de abortá-lo. Um exemplo:

```
// sum.js
const sum = (a, b) => a + b;

test('sums two values', () => {
  expect(sum(2, 3)).toEqual(5);
});
```

#### Padronização e Boas Práticas

Na prática, funções de teste são colocadas em arquivos diferentes daquelas que serão testadas. Podem ser agrupadas em uma pasta `__tests__` ou em arquivos com mesmo nome do alvo dos testes, acrescidos dos sufixos *.test* ou *.spec*. O Jest busca na pasta citada a cima, arquivos com a extensão *.js*, *.jsx*, *.ts* e *.tsx*.

#### module.exports

Serve para exportar uma variável/constante ou função para ser utilizada em outros arquivos. Sintaxe : `module.exports = variableToExport;` . Lembrando de trocar o ultimo valor pelo que se deseja exportar.
Para acessar isso em outro módulo, basta dar um `require('./variableToExport')`.

### Expect e Matchers

Conforme mostrado no exemplo, dentro da função chamada pela função `test()`, deve ser chamada uma função `expect()` passando como parâmetro a função alvo do teste. O `expect()` retorna um objeto do tipo *expectation*, este pode ser testado pelos *matchers* disponibilizados pelo *Jest*. [Documentação dos Matchers](https://jestjs.io/docs/expect).
Os mais comuns:

- `.toBe()`: Testa a [igualdade estrita](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) (===), entre o passado para o `expect` e seu argumento.
- `.toEqual()`: Testa a igualdade entre objetos ou arrays. Diferencia-se do `toBe()` por considerar atribuições por **referência**, ao passo que o `toBe()` só considera atribuições por **valor**.
- Null, Undefined e False: São formas de tratar melhor o retorno, por padrão, o retorno dos 3 é considerado apenas *falsy*. Se quiser especificar o que será retornado pode ser utilizado o:
  - `.toBeNull()` matches only `null`
  - `.toBeUndefined()` matches only `undefined`
  - `.toBeDefined()` is the opposite of `toBeUndefined`
  - `.toBeTruthy()` matches anything that an `if` statement treats as true
  - `.toBeFalsy()` matches anything that an `if` statement treats as false
  Fonte: [documentação](https://jestjs.io/docs/using-matchers#truthiness).
- Números(*number*): [Documentação](https://jestjs.io/pt-BR/docs/using-matchers#n%C3%BAmeros).
- `.toMatch()`: Compara *strings* com expressões regulares.
- `.toContain()`: Verifica se o item passado nos argumentos se encontra no *array*. **Pode ser utilziado para verificar se uma *string* possui uma *substring* específica.** Utiliza **igualdade estrita**(===). [Documentação](https://jestjs.io/pt-BR/docs/expect#tocontainitem)
- `.toContainEqual()`: Verifica a igualdade de todos os campos, em vez de verificar a identidade do objeto. [Documentação](https://jestjs.io/pt-BR/docs/expect#tocontainequalitem).
- `.toHaveLength()`: Verifica o tamanho do objeto. [Documentação](https://jestjs.io/pt-BR/docs/expect#tohavelengthnumber)
- `.toHaveProperty(keyPath, value?)`: Verifica se um objeto possui a chave especificada (primeiro parâmetro), o segundo parâmetro é opcional, e checa se o valor bate com o passado. [Documentação](https://jestjs.io/pt-BR/docs/expect#tohavepropertykeypath-value).
- `.toThrow(error?)`: Verifica se a função lança um erro, tendo um argumento opcional:
  - regular expression: error message **matches** the pattern.
  - string: error message **includes** the substring.
  - error object: error message is **equal to** the message property of the object. (`new Error('error')`)
  - error class: error object is **instance of** class.
  [Documentação](https://jestjs.io/pt-BR/docs/expect#tothrowerror)
  Atente-se para a sintaxe, o `toThrow()` **deve estar fora da função chamada pelo expect, eles ficam no mesmo 'nível'**. Exemplo:

```
const multiplyByTwo = (number) => {
  if (!number) {
    throw new Error('number é indefinido')
  }
  return number * 2;
};
multiplyByTwo(4);

test('testa se multiplyByTwo retorna o resultado da multiplicação', () => {
  expect(multiplyByTwo(4)).toBe(8);
});
test('testa se é lançado um erro quando number é indefinido', () => {
  expect(() => { multiplyByTwo() }).toThrow();
});
test('testa se a mensagem de erro é "number é indefinido"', () => {
  expect(() => { multiplyByTwo() }).toThrowError(new Error('number é indefinido'));
});
```

- Not: Testa o oposto. Ex.:

```
const workDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const weekDays = ['Sunday', ...workDays, 'Saturday'];

test('Sunday is a week day', () => {
  expect(weekDays).toContain('Sunday');
});

test('Sunday is not a workday', () => {
  expect(workDays).not.toContain('Sunday');
});
```

### Describe

Cria um bloco que agrupa vários testes. [Documentação](https://jestjs.io/pt-BR/docs/api#describename-fn). Serve para melhorar a organização interna, **não é obrigatório**, todos os testes podem ser feitos em nível superior. Delimita um escopo mais claro, separar testes por funções ou níveis de complexidade, etc... Exemplo:

```
const myBeverage = {
  delicious: true,
  sour: false,
};

describe('my beverage', () => {
  test('is delicious', () => {
    expect(myBeverage.delicious).toBeTruthy();
  });

  test('is not sour', () => {
    expect(myBeverage.sour).toBeFalsy();
  });
});
```

Um *describe* pode possuir *describes* internos.

## Links

- [Jest](https://jestjs.io/) 
- [Mocha](https://mochajs.org/) 
- [Jasmine](https://jasmine.github.io/)
- [O time de engenharia do Airbnb conseguiu diminuir o tempo de execução de sua suíte de testes de 12 para 4 minutos ao trocar Mocha por Jest](https://medium.com/airbnb-engineering/unlocking-test-performance-migrating-from-mocha-to-jest-2796c508ec50)
- [Create React App](https://github.com/facebook/create-react-app)

- [Conhecendo o Jest](https://medium.com/jaguaribetech/testando-seu-javascript-com-jest-de2a4674f4ad)
- [Export Module in Node.js](https://www.tutorialsteacher.com/nodejs/nodejs-module-exports)
- [Jest Crash Course - Unit Testing in JavaScript](https://www.youtube.com/watch?v=7r4xVDI2vho)
- [Objetos - Referências de valores em JavaScript](https://blog.da2k.com.br/2017/01/25/objetos-referencias-de-valores-em-javascript/)
- [Migrating from Mocha to Jest](https://medium.com/airbnb-engineering/unlocking-test-performance-migrating-from-mocha-to-jest-2796c508ec50)
- [Comparações de igualdade e uniformidade](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Equality_comparisons_and_sameness)