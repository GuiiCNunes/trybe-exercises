# Bloco 15 - Testes automatizados com React Testing Library

## RTL - Mocks e Inputs

Para rodar corretamente é necessário acrescentar ao arqui *src/setupTests.js* as linhas:

```
// setupTests.js
import MutationObserver from '@sheerun/mutationobserver-shim';
window.MutationObserver = MutationObserver;
```

*Esta biblioteca serve para monitoramento de alterações no DOM da página.*

### Mocks

Jeitos diferentes de fazer a mesma coisa

- Funções Simples
  - `funcaoA = jest.fn().mockImplementation((a, b) => a + b);`
  - `funcaoA = jest.fn((a, b) => a + b);`

- Funções que retornam *Promises*
  - `functionToMock = jest.fn().mockImplementation((a, b) => new Promise.resolve(a + b));`
  - `functionToMock = jest.fn((a, b) => new Promise.resolve(a + b));`
  - `functionToMock = jest.fn.mockResolvedValue(a + b);`
  - `functionToMock.mockResolvedValue(a + b);`

- *Mock* de *rejects*
  - `functionToMock = jest.fn((a, b) => new Promise.reject(a + b);`
  - `functionToMock = jest.fn().mockRejectedValue(a + b);`
  - `functionToMock.mockRejectedValue(a + b);`

#### Macetes

- Para *mockar* o `fetch`, chamar com `global.fetch`, ex.: `global.fetch.mockResolvedValue`
- O `fetch` retorna uma promise que deve ser tratada com o `.json()`, para isso basta fazer ele retornar um objeto que tenha uma chave `json` que tenha como valor uma *callback* que retorne o esperado. Ex.:

```
  jest.spyOn(global, "fetch")
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(respostaEsperada),
  });
```

- Deixe a *callback* do test `asyn` e, onde espera que seja assíncrono, lembre-se de usar o `await`.
- Utilize o `findByText`, que é uma junção do `waitFor` com `getByText`, ou seja, é um seletor assíncrono que retorna uma *Promise*. [Documentação](https://testing-library.com/docs/dom-testing-library/api-async).
- Se não quiser usar o `findByText`, podem ser utilziados seletores síncronos, sendo chamados dentro de uma *callback* na função `waitFor()`.

### Links

- [JavaScript, o Global Object e o this](https://medium.com/@felquis/javascript-o-global-object-e-o-this-ceda36059cff)
- [Public fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields)
- [But really, what is a JavaScript mock?](https://kentcdodds.com/blog/but-really-what-is-a-javascript-mock)
- [Why I Never Use Shallow Rendering](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering)
- [Video - Migrating from shallow rendering react components to explicit component mocks](https://www.youtube.com/watch?v=LHUdxkThTM0)
- [JEST - requireActual](https://jestjs.io/docs/en/jest-object#jestrequireactualmodulename)
- [Form Submit - react-testing-library](https://codesandbox.io/s/3vrjmrpr05)
- [Sending Emails with ReactJS](https://blog.mailtrap.io/react-send-email/)
- [RTL FAQ](https://testing-library.com/docs/react-testing-library/faq)