# Bloco 13 - Ciclo de Vida de Componentes e React Router

## Ciclo de vida de componentes

Um componente *React* possui quatro fases em seu ciclo de vida, sendo:
- Inicialização - quando o componente recebe as props e os estados;
- Montagem - quando o componente é inserido no DOM;
- Atualização - quando os props ou estados do componente são alterados;
- Desmontagem - quando o componente morre, sumindo do DOM.

![Lifecycle Methods Diagram](./ReactLifecycleDiagram.png)
[Font](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

### Funções

- `componentDidMount()` dispara uma ou mais ações após o componente ser inserido no DOM (ideal para requisições) 
- `componentDidUpdate()` dispara uma ou mais ações após o componente ser atualizado
- `componentWillUnmount()` dispara uma ou mais ações antes de o componente ser desmontado
- `shouldComponentUpdate()` possibilita autorizar ou não o componente a atualizar
- *Outros métodos*: `getDerivedStateFromProps()`, `getSnapshotBeforeUpdate()`.

Implementação delas é semelhante ao do `render()`.

## Links

- [Video do conteúdo](https://www.youtube.com/watch?v=m_mtV4YaI8c)
- [Explicação sobre os outros métodos menos utilziados](https://pt-br.reactjs.org/docs/react-component.html#static-getderivedstatefromprops)