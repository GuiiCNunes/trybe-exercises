# Bloco 15 - Testes automatizados com React Testing Library

## RTL - Testando React Router

O Route quebra os testes por criar um histórico de navegação, assim os testes se tornam *interdependentes* ( e **deveriam ser independentes**). A solução é 'customizar' o `render` do componente, para que dentro dele haja sempre um novo `route` que recebe um *history* vazio a cada novo teste, cortando essa dependência.
A documentação traz exemplos de uma função que faz isso nesse [link](https://testing-library.com/docs/example-react-router#reducing-boilerplate).

Comumente a função que faz esse procedimento é chamada de `renderWithRouter`, ela é considerada um *helper* (assistente) que executa uma tarefa específica, facilita a leitura do código e evita repetições de código.
Um exemplo dela :

```
//src/renderWithRouter.js
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={history}>{component}</Router>), history,
  });
};

export default renderWithRouter;
```

- O que está acontecendo:
  1. A função recebe o componente que será renderizado.
  2. Com a lib `history`, a função `createMemoryHistory()` cria um novo histórico de navegação toda vez que for chamada.
  3. Ela retorna o *array* da função `render()` espalhado em um objeto (utilizando o *spread*), junto com o `history` utilizado, para caso seja necessário manuzeá-lo nos testes.

- **Ponto Importante**
  O componente a ser testado deve estar encapsulado dentro do `<BrowserRouter />`, se não o teste perde o controle sobre o componente. O que isso significa: caso queira testar o `<App />`, é necessário que o `<BrowserRouter />` esteja no arquivo *index.js* encapsulando o componente `<App />`.

Dentro da [documentação](https://reacttraining.com/react-router/web/api/history) da lib `history`, são apresentadas diversas propriedades e métodos que podem ser usado para validar a movimentação entre as páginas. 
Como o `history.location.pathname` que retorna a página atual. Um exemplo de uso:

```
const pathname = history.location.pathname;
expect(pathname).toBe('/about');
```

Outro é o `history.push(caminho)`, que simula o digitar da url na barra do navegador. Exemplo:

```
history.push('/pagina/que-nao-existe/');
const noMatch = getByText(/Página não encontrada/i);
expect(noMatch).toBeInTheDocument();
```

### Ponto sobre o export default

Só pode haver um no documento, para exportar mais coisas, utiliza-se o `export` apenas, ai na hora do `import` faz a desestruturação de cada item exportado apontando para o documento.

## Links

- [Documentação da Lib History](https://reacttraining.com/react-router/web/api/history)
- [Exemplo renderWithRouter na Documentação](https://testing-library.com/docs/example-react-router#reducing-boilerplate)
- [Outra forma de fazer, só que com mais código](https://testing-library.com/docs/example-react-router)

- [Why I Never Use Shallow Rendering](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering)
- [Video - Migrating from shallow rendering react components to explicit component mocks](https://www.youtube.com/watch?v=LHUdxkThTM0)
- [React Router Example](https://testing-library.com/docs/example-react-router)
- [History Docs](https://github.com/ReactTraining/history/tree/master/docs)
- [RTL FAQ](https://testing-library.com/docs/react-testing-library/faq)
- [Sending Emails with ReactJS](https://blog.mailtrap.io/react-send-email/)
- [Explore aqui as funcionalidades mais modernas da RTL!](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library/)