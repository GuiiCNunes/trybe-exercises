# Bloco 26 - Introdução ao desenvolvimento Web com NodeJS

## Testes com NodeJS

Ferramentas: **Mocha** , **Chai** e **Sinon**.
Conceitos: **asserts** , **testes** **unitários** e **TDD** .

### Instalação

```
npm install -D mocha chai
```

### Tipos de Testes

* Testes unitários: Escopo limitado a um pequeno fragmentod e código. Interação mínima com recusrsos externos.

* Testes de integração: Junção de múltiplos escopos(cada um tendo seu próprio teste) interagindo.

* Testes de Ponto-a-ponto: Fluxo completo de uma aplicação, de um ponto a outro. Mais completo, mas necessita que os testes anteriores existam ou venham a existir.

### Escrevendo testes

* `describe`: Agrupa um conjunto de testes em um contexto. Primeiro parâmetro é a descrição e o segundo uma *callback* com os testes.
* `it`: Especifica qual teste estamos realizando. Primeiro parâmetro é a descrição do teste e o segundo uma *callback* com o teste.
* *validações*: Os anteriores diziam respeito ao `mocha`, já para validações utilizamos o `chai`. Um exemplo: `expect(resposta).equals('reprovado');`.
  - [Documentação dos validadores](https://www.chaijs.com/api/bdd/)
  - [Documentação Getters, puramente estéticos, facilitam a leitura](https://www.chaijs.com/api/bdd/#method_language-chains)

### Executando testes

É possível instalar o `mocha` globalmente (`npm install -g mocha `) e chamar ele apontando o arquivo de teste: `mocha tests/calculaSituacao.js`. Porém, o mais recomendado é instalar no projeto e rodar todos os testes (ou cada um) por comando. Para isso, é necessário adicionar essas linhas ao `package.json`:

```
{
// ...
  "scripts": {
    "start": "node index.js",
    "test": "mocha tests"
  },
// ...
}
```

Para rodar os testes:

```
npm run test
// Ou
npm test
```

### Isolando Testes

Os testes devem ser isolados, ou seja, não utilizar a rede ou disco, não realizando operações de *IO*(*input*/*output*). Isso porque, realizando as operações de *IO*, os testes teriam uma complexidade desnecessária. Por exemplo, se testar a interação com um banco de dados, teriamos que garantir que os valores utilizados estivessme lá e que, após os testes, eles voltassem para o valor original.
Para esse isolamento, operações de *IO* serão simuladas dentro do teste. Entrando o conceito de *Test Doubles*, que são objetos que fingem ser outros objetos para fins de teste. Podendo simular pacotes e funções. A ferramenta utilizada para isso é o `sinon`([Documentação](https://sinonjs.org/)).
Instalação:

```
npm install --save-dev sinon
```

O `sinon` disponibiliza diversas funções para a simulação, uma delas é o `stub`. Ele simula a interação com dependências externas.

```
const fs = require('fs');
const sinon = require('sinon');

sinon.stub(fs, 'readFileSync')
  .returns('Valor a ser retornado');
```

**OBS.**: É necessário importar o pacote que o `stub` irá simular.
**OBS.**: É possível restaurar o comportamento da função utilizando a função `restore()`:

```
fs.readFileSync.restore();
```

#### Escopo do Dublê

É possível criar escopos de dublês, para que uma determinada simulação possa agir de jeitos diferentes conforme a necessidade. Para isso, utiliza-se o `after` e o `before`. Ou seja, o que fazer antes e depois de cada teste (ou describe, dependendo do escopo que forem colocados).

```
describe('leArquivo', () => {
  describe('Quando o arquivo existe', () => {
    before(() => {
      sinon.stub(fs, 'readFileSync').returns(CONTEUDO_DO_ARQUIVO);
    });

    after(() => {
      fs.readFileSync.restore();
    });

    describe('a resposta', () => {
      it('é uma string', () => {
        const resposta = leArquivo('arquivo.txt');

        expect(resposta).to.be.a('string');
      });

      it('é igual ao conteúdo do arquivo', () => {
        const resposta = leArquivo('arquivo.txt');

        expect(resposta).to.be.equals(CONTEUDO_DO_ARQUIVO);
      });
    });
  });
```

## Links

- [Artigo (em português): Test Doubles (Mocks, Stubs, Fakes, Spies e Dummies)](https://medium.com/rd-shipit/test-doubles-mocks-stubs-fakes-spies-e-dummies-a5cdafcd0daf)
- [Vídeo: TDD (Test Driven Development) // Dicionário do Programador](https://www.youtube.com/watch?v=bLdEypr2e-8)
