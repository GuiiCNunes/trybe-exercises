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

## Links