# Bloco 32 - Introdução à Python

## Entrada e Saída de Dados

### Estruturando uma aplicação

- Módulos
  * Arquivo com definições e instruções em Python.
  * `.py`
  * Pode ser importado em outros arquivos.
  ```python
  def sum(a, b):
    return a + b


  def pot(a, b):
    return a ** b


  print(sum(2, 2))
  print(pot(2, 3))
  ```

- Pacotes
  * São módulos que contém outros módulos e/ou pacotes.
  * Separados por responsabilidades similares.
  * Na prática, um diretório com os módulos e/ou pacotes.
  * Exemplos de `imports` de pacotes:
  ```python
  import http  # importa o pacote http como um módulo

  from http import client  # importa o módulo client do pacote http

  from http.client import HTTP_PORT  # importa a constante HTTP_POST do módulo client do pacote http
  ```

- Ambiente Virtual
  > Imagine que, em uma máquina, há um projeto Python que tem alguns pacotes de terceiros instalados e, dentre eles, há uma biblioteca na versão 1.4. Imagine também que, na mesma máquina, um novo projeto é iniciado e ele precisa da mesma biblioteca, mas, dessa vez, na versão 2.0. O que fazer? As versões são compatíveis? Se eu atualizar o sistema, a versão antiga vai continuar a funcionar?

  > O venv entra como resposta à essas perguntas! Ele é um módulo, já embutido na linguagem, que serve para isolar ambientes entre projetos. Ou seja, eu consigo ter dois projetos rodando, em dois ambientes diferentes, com versões diferentes de uma mesma biblioteca.

  > Na prática, o que vamos fazer é instalar as bibliotecas em um diretório, que está relacionado ao projeto. Assim, cada projeto pode ter suas próprias bibliotecas na versão que quiser. A ideia é a mesma do npm que vocês já vêm usando.

  * `python3 -m venv .venv`, sendo o `.venv` o nome do ambiente isolado.
    - Caso o `venv` não esteja instalado, `sudo apt install python3-venv`
  * Comando **DEVE** ser executado na Raiz do Projeto.
  * O ambiente é visto como um diretório na raiz do projeto.
    - Sendo um diretório oculto. `.nome_ambiente/`
  * Toda vez que precisar ser utilizado, deve ser iniciado com:
    `source .venv/bin/activate`
  * Para conferir se o comando de ativação due certo:
    `which python3`

### Entrada e Saída

- Entrada
  `input("Sua mensagem:")`
  * Libera para inserção de valores.
  * Parâmetro é opcional.
  * Valor passado pode ser atribuido a uma variável (sera uma `str`, *string*).
  * Exemplo:
  ```python
  import random

  random_number = random.randint(1, 10)  # escolhe um número aleatório entre 1 e 10
  guess = ""

  while guess != random_number:  # enquanto não adivinhar o número
      guess = int(input("Qual o seu palpite? "))  # pergunte a pessoa usuária um número

  print("O número sorteado era: ", guess)
  ```

  - `sys`
    ```python
    import sys


    if __name__ == "__main__":
        for argument in sys.argv:
            print("Received -> ", argument)
    ```
    * Para executar: `python3 arquivo.py 2 4 "teste"`
    * Ou seja, os parâmetros serão passados pela chamada do script.

- Saída
  * `print`
    - Pode receber *n* parâmetros.

    ```python
    print("O resultado é", 42)  # saída: O resultado é 42
    print("Os resultado são", 6, 23, 42)  # saída: Os resultados são 6 23 42

    print("Maria", "João", "Miguel", "Ana")  # saída: Maria João Miguel Ana
    print("Maria", "João", "Miguel", "Ana", sep=", ")  # saída: Maria, João, Miguel, Ana

    print("Em duas ")
    print("linhas.")

    print("Na mesma", end="")
    print("linha.")
    ```
  * Imprimindo erros:
  ```python
  import sys


  err = "Arquivo não encontrado"
  print(f"Erro aconteceu: {err}", file=sys.stderr)
  ```

    > Em Python , podemos fazer interpolação de variáveis e expressões utilizando [f-string](https://pyformat.info/) . Adicionamos um f antes das aspas e o valor de saída entre chaves. Essa dica é importante, pois é a maneira mais eficiente de formatar strings.
  
  * Formatando *strings*:
  ```python
  x = 5
  y = 3
  print(f"{x} / {y} = {x / y:.2f}")  # saída: 5 / 2 = 1.67
  # {x} é substituído por 5
  # {y} é substituído por 3
  # {x / y:.2f} O que vem após os dois pontos são formatadores, como nesse exemplo, duas casas decimais (.2f).
  print(f"{x:.^3}")  # saída: ".5."
  # . é o caractere utilizado para preencher
  # ^ indica que o valor será centralizado
  # 3 são o número de caracteres exibidos
  ```

**Exercício 1**: Faça um programa que solicite o nome de uma pessoa usuária e imprima-o na vertical. Exemplo:

```
F
U
L
A
N
O
```

```python
name = input("Digite seu nome:")

for letter in name:
  print(letter)
```

**Exercício 2**: Escreva um programa que receba vários números naturais e calcule a soma desses valores. Caso algum valor da entrada seja inválido, por exemplo uma letra, uma mensagem deve ser exibida, na saída de erros, no seguinte formato: "Erro ao somar valores, {valor} é um valor inválido". Ao final, você deve imprimir a soma dos valores válidos.

> Receba os valores em um mesmo input , solicitando à pessoa usuária que separe-os com um espaço. Receba os valores no formato str e utilize o método split para pegar cada valor separado. O método isdigit , embutido no tipo str , pode ser utilizado para verificar se a string corresponde a um número natural.

```python
import sys

result = 0
numbers = input("Digite os Números para Soma, separador por espaço(' '):").split(" ")

for number in numbers:
  if isdigit:
    result += number
  else:
    print(f"Erro ao somar valores, {number} é um valor inválido", file=sys.stderr)

print(result)
```

### Manipulação de Arquivos

- Função `open()`
  * Único parâmetro obrigatório é o nome do arquivo.
  * Por padrão, são abertos somente para leitura.
    - Isso pode ser alterado passando o parâmetro `mode="w"`.

  ```python
  file = open("arquivo.txt", mode="w")  # ao abrir um arquivo para escrita, um novo arquivo é criado mesmo que ele já exista, sobrescrevendo o antigo.

  # file = open("arquivo.txt", mode="w")

  file.write("nome idade\n")
  file.write("Maria 45\n")
  file.write("Miguel 33\n")

  #
  # file.write("Miguel 33\n")


  # Não precisa da quebra de linha, pois esse é um comportamento padrão do print
  print("Túlio 22", file=file)

  #
  # print("Túlio 22", file=file)

  # Multiplas linhas, usar \n
  LINES = ["Alberto 35\n", "Betina 22\n", "João 42\n", "Victor 19\n"]
  file.writelines(LINES)

  # file.writelines(LINES)


  file.close()
  ```

  * **Importante** fechar o arquivo com o `close()`
    - Sistema operacional tem um limite de arquivos abertos
  * Leitura:
  ```python
  # escrita
  file = open("arquivo.txt", mode="w")
  file.write("Trybe S2")
  file.close()

  # leitura
  file = open("arquivo.txt", mode="r")
  content = file.read()
  print(content)
  file.close()  # não podemos esquecer de fechar o arquivo
  ```

  > Um arquivo é também um iterável, ou seja, pode ser percorrido em um laço de repetição. A cada iteração, uma nova linha é retornada.

  ```python
  # escrita
  file = open("arquivo.txt", mode="w")
  LINES = ["Olá\n", "mundo\n", "belo\n", "do\n", "Python\n"]
  file.writelines(LINES)
  file.close()

  # leitura
  file = open("arquivo.txt", mode="r")
  for line in file:
      print(line)  # não esqueça que a quebra de linha também é um caractere da linha
  file.close()  # não podemos esquecer de fechar o arquivo
  ```

  * Arquivos Binários
    > Eles são arquivos que contêm uma série de bytes e a sua leitura pode variar de acordo com o arquivo. Nesse caso, devemos acrescentar um `b` ao parâmetro `mode` , indicando que será utilizado o modo binário.

    ```python
    # escrita
    file = open("arquivo.dat", mode="wb")
    file.write(b"C\xc3\xa1ssio 30")  # o prefixo b em uma string indica que seu valor está codificado em bytes
    file.close()

    # leitura
    file = open("arquivo.dat", mode="rb")
    content = file.read()
    print(content)  # saída: b'C\xc3\xa1ssio 30'
    file.close()  # não podemos esquecer de fechar o arquivo
    ```

### Lidando com exceções

* Dois tipos: *Erros de sintaxe* e *exceções*.
* Erros de sintaxe: `print{"Olá mundo!}`
* Exceções
  * Durante tempo de execução.
  * Ex.:
  ```python
  print(10 * (1 / 0))
  Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
  ZeroDivisionError: division by zero
  print(4 + spam * 3)
  Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
  NameError: name 'spam' is not defined
  print('2' + 2)
  Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
  TypeError: can only concatenate str (not "int") to str  
  ```
    - `ZeroDivisionError` , `NameError` e `TypeError`.
    - [Lista de todas as exceções](https://docs.python.org/pt-br/3/library/exceptions.html#bltin-exceptions)

* Tratamento
  - `try`e `except`
  - Ciclo:
    1. Se nenhuma exceção ocorrer, a cláusula `except` é ignorada, e a execução da instrução `try` é finalizada.
    2. Se ocorrer uma exceção durante a execução da cláusula `try` , as instruções remanescentes na cláusula são ignoradas. Se o tipo da exceção ocorrida tiver sido previsto em algum `except` , então essa cláusula será executada.
    3. Se não existir nenhum tratador previsto para tal exceção, trata-se de uma exceção não tratada e a execução do programa termina com uma mensagem de erro.

  ```python
  while True:
    try:
        x = int(input("Please enter a number: "))
        break
    except ValueError:
        print("Oops!  That was no valid number.  Try again...")
  ```

> O `finally` é uma outra cláusula do conjunto `try` , cuja finalidade é permitir a implementação de ações de limpeza, que sempre devem ser executadas independentemente da ocorrência de ações. Já o `else` ocorre sempre que todo o `try` for bem sucedido.

```python
try:
    arquivo = open("arquivo.txt", "r")
except OSError:
    # será executado caso haja uma exceção
    print("arquivo inexistente")
else:
    # será executado se tudo ocorrer bem no try
    print("arquivo manipulado e fechado com sucesso")
    arquivo.close()
finally:
    # será sempre executado, independentemente de erro
    print("Tentativa de abrir arquivo")
```

> O `with` é a palavra reservada para gerenciamento de contexto. Este gerenciamento ( `with` ) é utilizado para encapsular a utilização de um recurso, garantindo que certas ações sejam tomadas independentemente se ocorreu ou não um erro naquele contexto.

> A função `open` retorna um objeto que se comporta como um gerenciador de contexto de arquivo que será responsável por abrir e fechar o mesmo. Isto significa que o arquivo possui mecanismos especiais que, quando invocados, utilizando `with` , alocam um determinado recurso, no caso um arquivo, e, quando o bloco for terminado, este recurso será liberado.

```python
# Criamos um contexto, limitando o escopo onde o arquivo está aberto.
# O uso do "as" aqui é somente para atribuir o valor utilizado no contexto à variável file
with open("arquivo.txt", "w") as file:
    file.write("Michelle 27\n")
# como estamos fora do contexto, o arquivo foi fechado
print(file.closed)
```

**Exercício 3**: Dado um arquivo contendo estudantes e suas respectivas notas, escreva um programa que lê todas essas informações e filtre mantendo somente as pessoas que estão reprovadas, e escreva seus nomes em outro arquivo. A nota miníma para aprovação é 6.
Arquivo:
```
Marcos 10
Felipe 4
José 6
Ana 10
Maria 9
Miguel 5
```

Exemplo saída:
```
Felipe
Miguel
```
> A função split pode ser utilizada para dividir o nome em uma linha. Ex: line.split -> ["Marcos", "10"]

```python
reproves = []

with open("students.txt", "r") as file:
  for line in file:
    l = line.split(" ")
    if int(l[1]) < 6:
      reproves.append(l[0])

with open("reproves.txt", "w") as file:
  for reprove in reproves:
    print(reprove, file=file)

```

### Manipulando arquivos JSON

- Módulo nativo na linguagem: [json](https://docs.python.org/3/library/json.html)

> Seus principais métodos para manipulação são: `load` , `loads` , `dump` , `dumps`.

```python
import json  # json é um modulo que vem embutido, porém precisamos importá-lo


with open("pokemons.json") as file:
    content = file.read()  # leitura do arquivo
    pokemons = json.loads(content)["results"]  # o conteúdo é transformado em estrutura python equivalente, dicionário neste caso.
    # acessamos a chave results que é onde contém nossa lista de pokemons

print(pokemons[0])  # imprime o primeiro pokemon da lista
```

> A leitura pode ser feita diretamente do arquivo, utilizando o método `load` ao invés de `loads` . O `loads` carrega o JSON a partir de um texto e o `load` carrega o JSON a partir de um arquivo.

```python
import json


with open("pokemons.json") as file:
    pokemons = json.load(file)["results"]

print(pokemons[0])  # imprime o primeiro pokemon da lista
```

> A escrita de arquivos no formato JSON é similar a escrita de arquivos comum, porém primeiro temos de transformar os dados.

```python
import json

# Leitura de todos os pokemons
with open("pokemons.json") as file:
    pokemons = json.load(file)["results"]

# Separamos somente os do tipo grama
grass_type_pokemons = [
    pokemon for pokemon in pokemons if "Grass" in pokemon["type"]
]

# Abre o arquivo para escrevermos apenas o pokemons do tipo grama
with open("grass_pokemons.json", "w") as file:
    json_to_write = json.dumps(
        grass_type_pokemons
    )  # conversão de Python para o formato json (str)
    file.write(json_to_write)
```

> Assim como a desserialização, que faz a transformação de texto em formato **JSON** para **Python** , a serialização, que é o caminho inverso, também possui um método equivalente para escrever em arquivos de forma direta.

```python
import json

# leitura de todos os pokemons
with open("pokemons.json") as file:
    pokemons = json.load(file)["results"]

# separamos somente os do tipo grama
grass_type_pokemons = [
    pokemon for pokemon in pokemons if "Grass" in pokemon["type"]
]

# abre o arquivo para escrita
with open("grass_pokemons.json", "w") as file:
    # escreve no arquivo já transformando em formato json a estrutura
    json.dump(grass_type_pokemons, file)
```

> Arquivos JSON não seguem a nomenclatura habitual de leitura e escrita ( write e read ), pois são considerados formatos de serialização de dados. Seguem então as mesmas nomenclaturas utilizadas em módulos como [marshal](https://docs.python.org/3/library/marshal.html#module-marshal) e [pickle](https://docs.python.org/3/library/pickle.html#module-pickle) , que também são formatos de serialização.

### Manipulando CSV

> O formato CSV ( Comma Separated Values ) é muito comum em exportações de planilhas de dados e base de dados. Foi utilizado por muito tempo antes de sua definição formal e isso acabou gerando uma não padronização neste formato e o surgimento de vários dialetos.

> Cada dialeto tem seus próprios delimitadores e caracteres de citação, porém o formato geral é semelhante o suficiente para utilizarmos o mesmo módulo para este processamento.

> Ainda que seu nome indique que o delimitador seja a " , " (vírgula), existem variações que utilizam " ; " (ponto e vírgula) ou até mesmo tabulações (" \t ").

- Módulo [CSV](https://docs.python.org/3/library/csv.html)
  * Um leitor ( `reader` ) que nos ajuda a ler o conteúdo, já fazendo as transformações dos valores para Python;
  * E um escritor ( `writer` ) para facilitar a escrita nesse formato.

```python
import csv

with open("balneabilidade.csv") as file:
    beach_status_reader = csv.reader(file, delimiter=",", quotechar='"')
    header, *data = beach_status_reader

print(data)
```

> O leitor define como dialeto padrão `excel` , que significa dizer que o delimitador de campos será a `" , "` e o caractere de citação será aspas duplas ( ` ). Uma forma de modificar estes padrões é definindo-os de forma diferente na criação do leitor.

> Um leitor de CSV pode ser percorrido utilizando o laço de repetição for e, a cada iteração, retorna uma nova linha já transformada em uma lista python com seus respectivos valores.
> `header, *data` é um truque para separarmos o cabeçalho do restante dos dados. Quando há uma atribuição múltipla e o valor da direita ( `beach_status_reader` ) pode ser percorrido, o Python entende que deve atribuir cada um dos valores a uma variável da esquerda (`header, *data`), seguindo a ordem. Isto é chamado de desempacotamento de valores.

  ```python
  a, b = "cd"
  print(a)  # saída: c
  print(b)  # saída: d

  head, *tail = [1,2,3] # Quando um * está presente no desempacotamento, os valores são desempacotados em formato de lista.
  print(head)  # saída: 1
  print(tail)  # saída: [2, 3]
  ```

> Podemos fazer uma análise agrupando a balneabilidade por campanha e depois salvamos o resultado também no formato csv:

```python
import csv

# lê os dados
with open("balneabilidade.csv") as file:
    beach_status_reader = csv.reader(file, delimiter=",", quotechar='"')
    header, *data = beach_status_reader

# agrupa campanhas e suas respectivas balneabilidades
bathing_by_campaign = {}
for row in data:
    campaign = row[6]
    bathing = row[2]
    if campaign not in bathing_by_campaign:
        bathing_by_campaign[campaign] = {
            "Própria": 0,
            "Imprópria": 0,
            "Muito Boa": 0,
            "Indisponível": 0,
            "Satisfatória": 0,
        }
    bathing_by_campaign[campaign][bathing] += 1

# escreve o relatório em csv
# abre um arquivo para escrita
with open("report_por_campanha.csv", "w") as file:
    writer = csv.writer(file)

    # escreve o cabeçalho
    headers = [
        "Campanha",
        "Própria",
        "Imprópria",
        "Muito Boa",
        "Indisponível",
        "Satisfatória",
    ]
    writer.writerow(headers)

    # escreve as linhas de dados
    for campaign, bathing in bathing_by_campaign.items():
        # desempacota os valores de balneabilidade para formar uma linha
        # equivalente a
        # row = [campaign]
        # for value in bathing.values():
        #     row.append(value)
        row = [campaign, *bathing.values()]
        writer.writerow(row)
```

> Existe ainda o leitor e escritor baseado em dicionários. Sua principal vantagem é que, com ele, não precisamos manipular os índices para acessar os dados das colunas. Mas, devido a estrutura de dados utilizada, ele tem como desvantagem o espaço ocupado em memória, sendo maior que o comum:

```python
import csv

# lê os dados
with open("balneabilidade.csv") as file:
    beach_status_reader = csv.DictReader(file, delimiter=",", quotechar='"')
    # a linha de cabeçaçhos é utilizada como chave do dicionário
    # agrupa campanhas e suas respectivas balneabilidades
    bathing_by_campaign = {}
    for row in beach_status_reader:
        campaign = row["numero_boletim"]  # as linhas são dicionários
        bathing = row["categoria"]
        if campaign not in bathing_by_campaign:
            bathing_by_campaign[campaign] = {
                "Própria": 0,
                "Imprópria": 0,
                "Muito Boa": 0,
                "Indisponível": 0,
                "Satisfatória": 0,
            }
        bathing_by_campaign[campaign][bathing] += 1

# abre um arquivo para escrita
with open("report_por_campanha_dicionarios.csv", "w") as file:
    # os valores a serem escritos devem ser dicionários
    header = [
        "Campanha",
        "Própria",
        "Imprópria",
        "Muito Boa",
        "Indisponível",
        "Satisfatória",
    ]
    # É necessário passar o arquivo e o cabeçalho
    writer = csv.DictWriter(file, fieldnames=header)
    # escreve as linhas de dados
    for campaign, bathing in bathing_by_campaign.items():
        # desempacota os valores de balneabilidade para formar uma linha
        # equivalente a
        # row = {"campanha": campaign}
        # for name, value in bathing.items():
        #     row[name] = value
        row = {"Campanha": campaign, **bathing}
        writer.writerow(row)
```

> Ainda que a manipulação de arquivos seja algo trivial, caso precise fazer análises de dados, leve em consideração bibliotecas como [Pandas](https://pandas.pydata.org/) , elas foram construídas e são mantidas justamente para atender e facilitar este objetivo.

## Links

- [Lista de todas as exceções](https://docs.python.org/pt-br/3/library/exceptions.html#bltin-exceptions)
- [json](https://docs.python.org/3/library/json.html)

- [Documentação do módulo csv](https://docs.python.org/3/library/csv.html)
- [Documentação do módulo json](https://docs.python.org/3/library/json.html)
- [Python F-strings](https://realpython.com/python-f-strings/)
- [Trabalhando com arquivos em python](https://realpython.com/working-with-files-in-python/)