# Bloco 32 - Introdução à Python

## Aprendendo Python

### Comandos

  * Abrir no terminal: `python3`

  > Este tipo de terminal é chamado de terminal interativo ou REPL ( Read-Eval-Print Loop ), que pode ser traduzido como loop de leitura-avaliação-impressão. O que ele faz é receber uma entrada digitada pela pessoa, avaliar sua execução e imprimir seu resultado.

  1. **Exercício 1**: No terminal, inicialize duas variáveis a e b, sendo a = 10 e b = 5. Mostre o resultado das 7 operações básicas (soma, subtração, multiplicação, divisão, divisão inteira, potenciação e módulo) envolvendo essas variáveis.

  ```python
    a = 10
    b = 5
    a + b
    a - b
    a * b
    a / b
    a // b
    a ** b
    a % b
  ```

  2. **Exercício 2**: Declare e inicialize uma variável: hours = 6 . Quantos minutos têm em 6 horas? E quantos segundos? Declare e inicialize variáveis minutes e seconds que recebem os respectivos resultados das contas. Depois, imprima cada uma delas.

  ```python
    hours = 6
    minutes = hours * 60
    seconds = hours * 60 * 60
    print(hours)
    print(minutes)
    print(seconds)
  ```

  3. **Exercício 3**: Teste e verifique o que acontece se você colocar um ponto e vírgula no final de uma instrução em Python.

  ```python
    hours = 6;
  ```

  4. **Exercício 4**: Suponha que o preço de capa de um livro seja 24,20, mas as livrarias recebem um desconto de 40%. O transporte custa 3,00 para o primeiro exemplar e 75 centavos para cada exemplar adicional. Qual é o custo total de atacado para 60 cópias? Escreva uma expressão que receba o custo total e a imprima.

  ```python
    n = 60
    cost = 24.20
    discont = 0.4
    firstUnit = 3
    otherUnits = 0.75
    totalCoast = ((cost * (1 - discont)) * n) + (firstUnit + ( otherUnits * (n - 1) ))
    print(totalCoast)
  ```

### Tipos

  - *int*
  - *float*
  - *complex*
    * `a = 5j`
    * `(3 + 4j) + 4  # saída: (7+4j)`
  - *str*
  - *bool*
    * Início maiúsculo
  - Sequências
    * *list*
    * *tuple*
    * *range*
  - Conjuntos
    * *set*
    * *frozenset*
  - Mapeamento
    * *dict*
  - Sequências binárias
    * *bytes*
    * *bytearray*
    * *memoryview*
  - Entre outros...

  - `type(operando)`

  - Listas
    * *list*
      ```python
      fruits = ["orange", "apple", "grape", "pineapple"]  # elementos são definidos separados por vírgula, envolvidos por colchetes

      fruits[0]  # o acesso é feito por indices iniciados em 0

      fruits[-1]  # o acesso também pode ser negativo

      fruits.append("banana")  # adicionando uma nova fruta

      fruits.remove("pineapple")  # removendo uma fruta

      fruits.extend(["pear", "melon", "kiwi"])  # acrescenta uma lista de frutas a lista original

      fruits.index("apple")  # retorna o índice onde a fruta está localizada, neste caso 1

      fruits.sort()  # ordena a lista de frutas
      ```

      ```python
      trybe_course = ["Introdução", "Front-end", "Back-end"]
      ```
      **Exercício 5**: Adicione o elemento "Ciência da Computação" à lista.
        `trybe_course.append("Ciência da Computação")`
      **Exercício 6**: Acesse e altere o primeiro elemento da lista para "Fundamentos".
        `trybe_course[0] = "Fundamentos"`
  - Tuplas
    * São similares a listas, porém não podem ser modificados durante a execução do programa.
    * São sobrescritas, ao invés de modificadas.
    ```python
      user = ("Cássio", "Botaro", 42)  # elementos são definidos separados por vírgula, envolvidos por parenteses

      user[0]  # acesso também por índices
    ```
  - Conjuntos
    * Conjunto de elementos únicos e não ordenados. Como conjuntos, implementam operações de união, intersecção e outras.
    ```python
      permissions = {"member", "group"}  # elementos separados por vírgula, envolvidos por chaves

      permissions.add("root")  # adiciona um novo elemento ao conjunto

      permissions.add("member")  # como o elemento já existe, nenhum novo item é adicionado ao conjunto

      permissions.union({"user"})  # retorna um conjunto resultado da união

      permissions.intersection({"user", "member"})  # retorna um conjunto resultante da intersecção dos conjuntos

      permissions.difference({"user"})  # retorna a diferença entre os dois conjuntos
    ```
  
  **Exercício 7**: Um conjunto ou set pode ser inicializado utilizando-se também o método set() . Inicialize uma variável com essa função var = set() e adicione seu nome ao conjunto utilizando um dos métodos vistos acima. Depois, imprima a variável e confira se o retorno é: {'seu_nome'}.
  ```python
  var = set()
  var.add("Guilherme Nunes")
  print(var)
  ```
  - Conjuntos imutáveis (*frozenset*)
    * Variação do set, porém imutável, ou seja, seus elementos não podem ser modificados durante a execução do programa.
    ```python
      permissions = frozenset(["member", "group"])  # assim como o set, qualquer estrutura iterável pode ser utilizada para criar um frozenset

      permissions.union({"user"})  # novos conjuntos imutáveis podem ser criados à partir do original, mas o mesmo não pode ser modificado

      permissions.intersection({"user", "member"})  # retorna um conjunto resultante da intersecção dos conjuntos

      permissions.difference({"user"})  # retorna a diferença entre os dois conjuntos
    ```
  - Dicionários (dict)
    * Estrutura que associa uma chave a um determinado valor. É a representação do tão famoso **objeto** que utilizamos em JavaScript.
    ```python
      people_by_id = {1: "Cássio", 2: "João", 3: "Felipe"}  # elementos no formato "chave: valor" separados por vírgula, envolvidos por chaves

      people_by_name = {"Cássio": 1, "João": 2, "Felipe": 3}  # outro exemplo, dessa vez usando strings como chaves (ao contrário de JS, as aspas duplas são obrigatórias)

      # elementos são acessados por suas chaves
      people_by_id[1]  # saída: Cássio

      # elementos podem ser removidos com a palavra chave del
      del people_by_id[1]
      people_by_id.items()  # dict_items([(1, "Cássio"), (2, "João"), (3, "Felipe")])
      # um conjunto é retornado com tuplas contendo chaves e valores
    ```

  ```python
    info = {
      "personagem": "Margarida",
      "origem": "Pato Donald",
      "nota": "Namorada do personagem principal nos quadrinhos do Pato Donald",
    }
  ```
  **Exercício 8**: O que acontecerá se você tentar acessar o valor da chave "personagem" como fazíamos em JavaScript, utilizando object.key ?
    ```python
      >>> info.personagem
      Traceback (most recent call last):
        File "<stdin>", line 1, in <module>
      AttributeError: 'dict' object has no attribute 'personagem'
    ```
  **Exercício 9**: Insira no objeto uma nova propriedade com o nome de chave "recorrente" e o valor "Sim". Em seguida, imprima o objeto no console.
    ```python
      info["recorrente"] = "Sim"
      print(info)
    ```
  **Exercício 10**: Remova a propriedade cuja chave é "origem" e imprima o objeto no console.
    ```python
      del info["origem"]
      print(info)
    ```
  
  - Range (range)
    > Estrutura capaz de gerar uma sequência numérica de um valor inicial até um valor final, modificando seu valor de acordo com o passo ( `step` ) definido. Pode ser declarado como `range( [start], stop[, step] )` , em que `start` e `step` podem ser omitidos, possuindo valores iniciais iguais a *0* e *1* respectivamente.

    > Um ponto de atenção é que o `stop` **não** é incluído na sequência, portanto caso queira uma sequência de 1 até 10 a chamada deverá ser `range(1, 11)`
    
    > Seus valores são criados a medida que esta sequência é percorrida.

    ```python
      # vamos converter o range em uma lista para ajudar na visualização

      # definimos somente o valor de parada
      list(range(5))  # saída: [0, 1, 2, 3, 4]

      # definimos o valor inicial e o de parada
      list(range(1, 6))  # saída: [1, 2, 3, 4, 5]

      # definimos valor inicial, de parada e modificamos o passo para 2
      list(range(1, 11, 2))  # saída: [1, 3, ,5 ,7 , 9]

      # podemos utilizar valores negativos para as entradas também
      list(range(10, 0, -1))  # saída: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    ```
  **Exercício 11**: Após uma consulta do banco de dados, temos linhas que contém nome, sobrenome e idade como: "Thiago", "Nobre", 29 . Que estrutura vista anteriormente seria recomendada dado que após esta consulta somente exibimos estes valores.

  Tupla?

  **Exercício 12**: Realizar a contagem de quantas vezes cada elemento aparece em uma sequência é uma técnica muito útil na solução de alguns problemas. Qual é a estrutura mais recomendada para o armazenamento desta contagem?

  Tupla? Dict?

### Estruturas Condicionais

```python
position = ""
if salary <= 2000:
    position = "estagiário"
elif 2000 < salary <= 5800:
    position = "júnior"
elif 5800 < salary <= 7500:
    position = "pleno"
elif 7500 < salary <= 10500:
    position = "senior"
else:
    position = "líder"
```

### Estrutura de Repetição

- `for`
  ```python
  restaurants = [
      {"name": "Restaurante A", "nota": 4.5},
      {"name": "Restaurante B", "nota": 3.0},
      {"name": "Restaurante C", "nota": 4.2},
      {"name": "Restaurante D", "nota": 2.3},
  ]
  filtered_restaurants = []
  min_rating = 3.0
  for restaurant in restaurants:
      if restaurant["nota"] > min_rating:
          filtered_restaurants.append(restaurant)
  
  print(filtered_restaurants)  # imprime a lista de restaurantes, sem o B e D
  ```

  > Dado que a maior parte do tempo estamos percorrendo estruturas, os criadores da linguagem decidiram que o for each seria o laço de repetição principal na linguagem.

  > Para cada repetição do nosso laço, um novo elemento da estrutura iterável é atribuído a variável de iteração. No exemplo acima vemos que, a cada iteração, um novo restaurante é colocado na variável restaurant .

  > Em alguns casos, ainda podemos querer percorrer uma sequência numérica, e para isto iteramos sobre a estrutura de dados range .

  ```python
  for index in range(5):
    print(index)
  ```

  > Além de listas, várias outras estruturas são iteráveis, como strings ( str ), tuplas ( tuple ), conjuntos ( set ), dicionários ( dict ) e até mesmo arquivos.

* Compressão de Listas
  ```python
  min_rating = 3.0
  filtered_restaurants = [restaurant
                          for restaurant in restaurants
                          if restaurant["nota"] > min_rating]
  print(filtered_restaurants)  # imprime a lista de restaurantes, sem o B e D
  ```

  > A compreensão de listas é declarada da mesma maneira que uma lista comum, porém no lugar dos elementos nós colocamos a iteração que irá gerar os elementos da nova lista. Um detalhe importante é que é possível filtrar esses elementos utilizando o if .

  ```python
  # min_rating = 3.0
  filtered_restaurants = [restaurant["name"]  # aqui pedimos somente o nome do restaurante
  #                        for restaurant in restaurants
  #                        if restaurant["nota"] > min_rating]
  # print(filtered_restaurants)  # imprime a lista de restaurantes, sem o B e D
  ```

  * Equivalente ao `map` e `filter` do JS.

* `while`
  - Fibonacci
  ```python
  n = 10
  last, next = 0, 1
  while last < n:
      print(last)
      last, next = next, last + next
  ```

  **VEJA**:
  > Foi utilizado um truque neste exemplo que se chama atribuição múltipla. Isto é atribuição de vários valores a múltiplas variáveis ao mesmo tempo. Este truque pode ser utilizado também para fazer a troca de valores entre variáveis: `a, b = b, a` .

  **Exercício 13**: O Fatorial de um número inteiro é representado pela multiplicação de todos os números predecessores maiores que 0. Por exemplo o fatorial de 5 é 120 pois 5! = 1 * 2 * 3 * 4 * 5 . Escreva um código que calcule o fatorial de um número inteiro.

  ```python
  n = 5
  result = n
  while n > 1:
      n, result = n - 1, (result * (n - 1))

  print(result)
  ```

  **Exercício 14**: Um sistema de avaliações registra valores de 0 a 10 para cada avaliação. Após algumas mudanças estes valores precisam ser ajustados para avaliações de 0 a 100. Dado uma sequência de avaliações `ratings = [6, 8, 5, 9, 10]` . Escreva um código capaz de gerar as avaliações após a mudança. Neste caso o resultado deveria ser [`60, 80, 50, 90, 100]` .
  Experimente utilizar a sintaxe de compreensão de listas.

  ```python
  ratings = [6, 8, 5, 9, 10]
  up = 10
  new_ratings = [rating * up
                  for rating in ratings]
  print(new_ratings)
  ```

  **Exercício 15**: Percorra a lista do exercício 14 e imprima "Múltiplo de 3" se o elemento for divisível por 3.
  ```python
  for rat in new_ratings:
    if rat % 3 == 0:
      print("Múltiplo de 3")
  ```

### Funções

  ```python
  def imc (peso, altura):
    return peso / (altura / 100) ** 2

  ```

  ```python
  # Forma Posicional
  imc (100, 185)
  # Ou Forma Nominal
  imc (peso=100, altura=185)
  ```
  
  > Os parâmetros podem ser passados de forma posicional ou nomeada. Os posicionais são aqueles definidos através da posição ao qual é chamado e os nomeados são definidos através do nome.

  ```python
  def soma(x, y):
    return x + y

  soma(2, 2)  # os parâmetros aqui são posicionais

  soma(x=2, y=2)  # aqui estamos nomeando os parâmetros
  ```

  > Os parâmetros também podem ser variádicos. Ou seja, podem variar em sua quantidade. Parâmetros posicionais variádicos são acessados como tuplas no interior de uma função e parâmetros nomeados variádicos como dicionário.

  ```python
  def concat(*strings):
    # Equivalente a um ", ".join(strings), que concatena os elementos de um iterável em uma string utilizando um separador
    # Nesse caso a string resultante estaria separada por vírgula
    final_string = ""
    for string in strings:
        final_string += string
        if not string == strings[-1]:
            final_string += ', '
    return final_string

  # pode ser chamado com 2 parâmetros
  concat("Carlos", "João")  # saída: "Carlos, João"

  # pode ser chamado com um número n de parâmetros
  concat("Carlos", "João", "Maria")  # saída: "Carlos, João, Maria"

  # dict é uma função que já vem embutida no python
  dict(nome="Felipe", sobrenome="Silva", idade=25)  # cria um dicionário utilizando as chaves passadas

  dict(nome="Ana", sobrenome="Souza", idade=21, turma=1)  # o número de parâmetros passados para a função pode variar
  ```

  > Variáveis definidas dentro das funções tem escopo local, porém uma função quando não encontra um nome no escopo local irá procurar no espaço de nomes global.

  ```python
  len([1, 2, 3, 4])  # função len não aceita argumentos nomeados

  len(obj=[1, 2, 3, 4])  # este código irá falhar

  print("Botaro", "Cássio", ", ")  # imprime Botaro Cássio ,

  print("Botaro", "Cássio", sep=", ")  # nomeando o terceiro parâmetro, agora temos a saída: Botaro, Cássio
  ```

### Escrevendo os primeiros arquivos

> ... precisamos saber que todo arquivo com extensão .py é considerado um módulo. Módulos são declarados utilizando snake case , ou seja, com nomes minúsculos e quando possuírem mais de uma palavra, devem ser separadas por underscore ( _ ).

```python
PI = 3.14  # PI é uma "constante" em nosso módulo


def square(side):
    '''Calculate area of square.'''
    return side * side


def rectangle(length, width):
    '''Calculate area of rectangle.'''
    return length * width


def circle(radius):
    '''Calculate area of circle.'''
    return PI * radius * radius
```

> Esse código segue algumas boas práticas para legibilidade, por exemplo, entre cada função temos um espaço de 2 linhas. As funções são declaradas com nomes em letras minúsculas e a constante PI é definida em letras maiúsculas.

```python
import area


PEOPLE_AT_CONCERT_PER_SQUARE_METER = 2  # numero de pessoas por metro quadrado em média
FIELD_LENGTH = 240  # em metros
FIELD_WIDTH = 45  # em metros
PEOPLE_AT_CONCERT = area.rectangle(FIELD_LENGTH, FIELD_WIDTH) // PEOPLE_AT_CONCERT_PER_SQUARE_METER


print("Estão presentes no show aproximadamente", PEOPLE_AT_CONCERT, "pessoas")
```

> O `import` é utilizado para termos todas as funções do módulo disponíveis em outro arquivo. Uma outra maneira de utilizarmos o import é utilizando from area import rectangle , porém, tome cuidado com conflitos de nomes caso utilize a segunda maneira.

```python
# ...


if __name__ == "__main__":
    print("Área do quadrado:", square(10))
    print("Área do retângulo:", rectangle(2, 2))
    print("Área do círculo:", circle(3))
```

> A variável `__name__` é utilizada pelo interpretador Python para identificar o arquivo que esta sendo executado e seu valor será "__main__" quando invocamos um módulo como script .

### `help`

* Retorna o que aquilo faz

```python
help("if")

import math

help(abs)

help(len)

help(math.sin)
```

## Links

- [Guia de configuração de ambiente Python](https://app.betrybe.com/course/real-life-engineer/python/)

- [Python Para Zumbis](https://www.youtube.com/channel/UCripRddD4BnaMcU833ExuwA)
- [Tuplas Mutantes em Python](http://pythonclub.com.br/tuplas-mutantes-em-python.html)
- [Pense em Python](https://penseallen.github.io/PensePython2e/01-jornada.html)
- [Introdução à Programação com Python](https://python.nilo.pro.br/)
- [Introdução ao Python - Microsoft](https://docs.microsoft.com/pt-br/learn/modules/intro-to-python)
- [Tutorial Python](https://docs.python.org/pt-br/3/tutorial/index.html)