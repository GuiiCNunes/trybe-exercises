# Bloco 13 - Ciclo de Vida de Componentes e React Router

## React Router

### props.children

Quando criado um componente pai, com componentes filhos, o `props.children` permite pegar os componentes filhos, retornando um objeto (caso de único filho) ou um array de objetos. Exemplos:

Chamado do componente pai:

```
class App extends Component {
  render() {
    return (
      <div className='main'>
        <ComponentePai>
          <p>SUPIMPA</p>
        </ComponentePai>
      </div>
    )
  }
}
```

Dentro do componente pai:

```
const ComponentePai = (props) => {
  return (
    <div>
      {props.children}
    </div>
  )
}
```

Assim é possível manipular a tag `p` que foi passada ao chamar o componente, dentro do componente.

### React Router Dom

É necessário instalá-lo

```
npm install react-router-dom
```

[Repositório](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)

### BrowserRouter e Route

`BrowserRouter` é um componente que encapsula a aplicação e possibilita a navegação entre diferetes páginas. Não é nativo do *React*.
`Route` é um componente fundamental do *React Route*. Ele faz o mapeamento, ligando url e componente.
Pode ser feito destas formas:

- `<Route path="/about" component={About} />` se o caminho passado no `path` corresponder com `/about` no ínicio, ele renderiza o componente `About`. *Ele aceita substrings*, caso o path passado sejá uma substring presente na URL, ele renderiza o componente.

- `<Route exact path="/about" component={About} />` o `path` passado deve ser exato ao da url, impossibilitando que pegue substrings.

- Outras formas:

```
  <Route path="/about" >
    <About />
  </Route>
```

Lembrando que a aplicação (ou seja, o return do *App.js*) **deve estar encapsulado** dentro de um `<BrowserRouter> </BrowserRouter>` e os elementos `BrowserRouter`e `Route` **devem ser importados** da lib `react-router-dom`.

### Link
