# Bloco 6 - HTML e CSS: Forms, Flexbox e Responsivo

## CSS Flexbox - Parte 1

### Introdução, estrutura básica, flex-direction, flex-wrap, flex-flow e reverse

```
display: flex;
```

- Importante diferenciar os eixos *Main Axis* (eixo principal) e *Cross Axis* (eixo transversal)

![](css_flexbox_axes-ae037e975930d45a18d1ef4417501d82.png)

- `flex-direction`: Define o eixo principal (horizontal, vertical, inverso)
  - `row` padrão, horizontal, esquerda para direita.
  - `row-reverse` horizontal, direita para esquerda.
  - `column` vertical, de cima para baixo.
  - `column` vertical, de baixo para cima.
- `flex-wrap`: Define se os itens devem quebrar a linha ou não, seguindo o eixo transversal.
  - `nowrap` padrão, não quebra.
  - `wrap` quebra, conforme o eixo utilizado.
  - `wrap-reverse` quebra, conforme o eixo utilizado no sentido inverso.
- `flex-flow` : agrupamento do `direction` e `wrap`, nessa ordem.
- `justify-content`: Alinha os itens conforme o eixo principal.
  - `flex-start` no começo do eixo.
  - `flex-end` no final do eixo.
  - `center` no centro do eixo.
  - `space-between` com espaçamento igual entre os itens.
  - `space-around` com espaçamento das bordas menores.
  - `space-evenly` com espaçamentos iguais.
- `align-items`: Alinha os itens conforme o eixo transversal.
  - `stretch` padrão, alonga os elementos igualmente para caber.
  - `flex-start` alinha os itens no inicio do eixo.
  - `flex-end` alinha os itens ao final do eixo.
  - `center` alinha os itens no centro do eixo.
  - `baseline` alinha os elementos seguindo o texto no interior deles. [Para ficar mais claro](/pract3.html)
- `align-content`: alinha as linhas relação ao eixo transversal, **Só funciona com mais de uma linha**
  - `stretch` padrão, alonga as linhas de itens conforme o eixo transversal.
  - `flex-start` alinha todas as linhas de itens no começo do eixo.
  - `flex-end` alinha todas as linhas de itens no final do eixo.
  - `center` alinha as linhas no centro.
  - `space-between` cria espaço entre as linhas, com a primeira no topo e a ultima no *bottom*.
  - `space-around` cria espaços maiores entre as linhas do que nas extremidades.
  - `space-evenly` com espaçamentos iguais.