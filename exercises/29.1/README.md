# Bloco 29 - Arquitetura: SOLID e ORM

## Arquitetura - Princípios SOLID

* Acrônimo para 5 princípios.
* Mais focado em POO ( Programação Orientada a Objetos), mas também é aplicável em outros cenários similares.
* Letras:
  - `S` ingle responsibility principle ( Princípio da responsabilidade única ): uma classe deve ter apenas uma única responsabilidade;
  - `O` pen/Closed principle ( Princípio aberto/fechado ): entidades de software devem ser abertas para extensão, mas fechadas para modificação;
  - `L` iskov substitution principle ( Princípio de substituição de Liskov ): objetos em um programa devem ser substituíveis por instâncias de seus subtipos, sem alterar a funcionalidade do programa;
  - `I` nterface segregation principle ( Princípio da segregação da interface ): muitas interfaces de clientes específicas são melhores do que uma para todos os propósitos;
  - `D` ependency inversion principle ( Princípio da inversão da dependência ): deve-se depender de abstrações, não de objetos concretos.

* Quando aplicados na programação funcional:
  - `S` ingle responsibility principle ( Princípio da responsabilidade única ): uma classe ou função deve ter uma, e apenas uma, tarefa a realizar dentro do seu código;
  - `O` pen/Closed principle ( Princípio aberto/fechado ): você deve ser capaz de estender um comportamento de uma função sem modificar seus comportamentos já existentes;
  - ~~`L` iskov substitution principle ( Princípio de substituição de Liskov ): Não se aplica. Estudaremos este depois!~~
  - ~~`I` nterface segregation principle ( Princípio da segregação da interface ): Não se aplica. Estudaremos este depois!~~
  - `D` ependency inversion principle ( Princípio da inversão da dependência ): quem usa uma função deve ser capaz de determinar quais outros módulos ela usa em sua lógica.

### Configurações Eslint

Uma forma de manter as boas práticas e padronização do código, pontos que tem grande relação com o SOLID, é utilizar o Eslint.

* Instalação

```
npm i -D eslint eslint-config-trybe-backend
```
**OBS.**: O último pacote é da Trybe.

* Configurando com arquivo `.eslintrc.json`:

```
{
  "extends": ["trybe-backend"]
}
```

* Configurando excessões no arquivo `.eslintignore`
  - Similar ao `.gitignore`
```
tests
```


## Links

- [Artigo científico](https://web.archive.org/web/20150906155800/http://www.objectmentor.com/resources/articles/Principles_and_Patterns.pdf)
- [Sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs)
- [Complexidade Cognitiva](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/cognitive-complexity.md)
- [Complexidade Ciclomática](https://eslint.org/docs/rules/complexity)
- [Número máximo de linhas](https://eslint.org/docs/rules/max-lines-per-function)
- [Número máximo de caracteres](https://eslint.org/docs/rules/max-lines-per-function)
