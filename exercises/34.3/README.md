# Bloco 34 - Redes e Raspagem de Dados

# Raspagem de Dados

> **Raspagem de dados** é uma técnica computacional para extrair dados provenientes de um serviço ou aplicação, estruturando-os em banco de dados, planilhas, ou outros formatos. Consiste em extrair dados de sites e transportá-los para um formato mais simples e maleável para que possam ser analisados e cruzados com mais facilidade.

## Lib *requests*

* Instalação:

```
python3 -m pip install requests
```

Exemplos de uso:

```python
import requests


# Requisição do tipo GET
response = requests.get("https://www.betrybe.com/")
print(response.status_code)  # código de status
print(response.headers["Content-Type"])  # conteúdo no formato html

# Conteúdo recebido da requisição
print(response.text)

# Bytes recebidos como resposta
print(response.content)

# Requisição do tipo post
response = requests.post("http://httpbin.org/post", data="some content")
print(response.text)

# Requisição enviando cabeçalho (header)
response = requests.get("http://httpbin.org/get", headers={"Accept": "application/json"})
print(response.text)

# Requisição a recurso binário
response = requests.get("http://httpbin.org/image/png")
print(response.content)

# Recurso JSON
response = requests.get("http://httpbin.org/get")
# Equivalente ao json.loads(response.content)
print(response.json())

# Podemos também pedir que a resposta lance uma exceção caso o status não seja OK
response = requests.get("http://httpbin.org/status/404")
response.raise_for_status()
```

## Rate Limit

> Muitas vezes a página de onde estamos removendo o conteúdo possui uma limitação de quantas requisições podemos enviar em um curto período de tempo, evitando assim ataques de negação de serviço.

* Exemplo:

```python
import requests


# À partir da décima requisição somos bloqueados de acessar o recurso
# Código de status 429: Too Many Requests
for _ in range(15):
    response = requests.get("https://www.cloudflare.com/rate-limit-test/")
    print(response.status_code)
```

* É uma boa prática colocar uma pausa entre as requisições, assim o site não fica fora do ar.

```python
import requests
import time


# Coloca uma pausa de 6 segundos a cada requisição
# Obs: este site de exemplo tem um rate limit de 10 requisições por minuto
for _ in range(15):
    response = requests.get("https://www.cloudflare.com/rate-limit-test/")
    print(response)
    time.sleep(6)
```

## Timeout

> Ás vezes pedimos um recurso ao servidor, mas caso o nosso tráfego de rede esteja lento ou tenha um problema interno do servidor, nossa resposta pode demorar ou até mesmo ficar travada indefinidamente.

* Exemplo:

```python
import requests

# Por 10 segundos não temos certeza se a requisição irá retornar
response = requests.get("https://httpbin.org/delay/10")
print(response)
```

* Pode ser definido um tempo limite, e após esse tempo fazer algo. Isso deve ser feito através do tratamento de exceção. Esse tempo é definido por tentativa e experimentação.

```python
import requests


try:
    # recurso demora muito a responder
    response = requests.get("http://httpbin.org/delay/10", timeout=2)
except requests.ReadTimeout:
    # vamos fazer uma nova requisição
    response = requests.get("http://httpbin.org/delay/1", timeout=2)
finally:
    print(response.status_code)
```

* Obs.: No exemplo, o valor final da url foi trocado apenas para simulação, esse valor tende a ser o mesmo.

## Analisando respostas

* Para a extração de dados de um site, utilizamos a biblioteca `parsel`.

```
python3 -m pip install parsel
```

> Para ajudar na didática, vamos utilizar o site http://books.toscrape.com/ . Ele é um site próprio para o treinamento de raspagem de dados.

1. Criando um seletor:

```python
from parsel import Selector
import requests


response = requests.get("http://books.toscrape.com/")
selector = Selector(text=response.text)
print(selector)
```

2. Extraindo títulos dos livros:
  * Para isso, o recurso inspecionar do navegador é muito útil, pois com ele podemos identificar o elemento que buscamos.

  ![Elemento Inspecionar](elementoInspecionar.png)

```python
# ...


# response = requests.get("http://books.toscrape.com/")
# selector = Selector(text=response.text)

# O título está no atributo title em um elemento âncora (<a>)
# Dentro de um h3 em elementos que possuem classe product_pod
titles = selector.css(".product_pod h3 a::attr(title)").getall()
# Estamos utilizando a::attr(title) para capturar somente o valor contido no texto do seletor

# Os preços estão no texto de uma classe price_color
# Que se encontra dentro da classe .product_price
prices = selector.css(".product_price .price_color::text").getall()

# Combinando tudo podemos buscar os produtos
# em em seguida buscar os valores individualmente
for product in selector.css(".product_pod"):
    title = product.css("h3 a::attr(title)").get()
    price = product.css(".price_color::text").get()
    print(title, price)
```

> O seletor principal que contém todo o conteúdo da página pode ser utilizado em uma busca para encontrar seletores mais específicos. Podemos fazer isto utilizando a função css . Ela recebe um seletor CSS como parâmetro, embora podemos passar um tipo especial de seletor quando queremos algum valor bem específico como o texto ou um atributo.

> Após definir o seletor, podemos utilizar a função `get` para buscar o primeiro seletor/valor que satisfaça aquela busca. A função `getall` é similar, porém trás todos os valores que satisfaçam aquele seletor.

## Recursos Paginados

* Navegar entre as páginas para pegar todos os livros presentes no site:

![Recursos Paginados Next](recursosPaginadosNext.png)

```python
# ...
# for product in selector.css(".product_pod"):
#     title = product.css("h3 a::attr(title)").get()
#     price = product.css(".price_color::text").get()
#     print(title, price)

# Existe uma classe next, que podemos recuperar a url através do seu elemento âncora
next_page_url = selector.css(".next a::attr(href)").get()
print(next_page_url)
```

> Agora que sabemos como recuperar a próxima página, podemos iniciar na primeira página e continuar buscando livros enquanto uma nova página for encontrada. Cada vez que encontrarmos uma página, extraímos seus dados e continuamos até acabarem as páginas. Então vamos alterar tudo que tínhamos escrito no arquivo exemplo_scrape.py para o código abaixo:

* Código refatorado:

```python
from parsel import Selector
import requests


# Define a primeira página como próxima a ter seu conteúdo recuperado
URL_BASE = "http://books.toscrape.com/catalogue/"
next_page_url = 'page-1.html'
while next_page_url:
    # Busca o conteúdo da próxima página
    response = requests.get(URL_BASE + next_page_url)
    selector = Selector(text=response.text)
    # Imprime os produtos de uma determinada página
    for product in selector.css(".product_pod"):
        title = product.css("h3 a::attr(title)").get()
        price = product.css(".price_color::text").get()
        print(title, price)
    # Descobre qual é a próxima página
    next_page_url = selector.css(".next a::attr(href)").get()
```

## Recursos obtidos à partir de outro recurso

- Exemplo: querer pegar a descrição de cada livro, que se encontra dentro da página de cada livro.

![Recurso através de outro recurso](recursoAtravesDeOutro.png)

> Com esse seletor em mãos, precisamos recuperar o atributo href que contém o link para a página de detalhes do livro.

```python
from parsel import Selector
import requests

URL_BASE = "http://books.toscrape.com/catalogue/"

# Vamos testar com a primeira página
response = requests.get(URL_BASE + "page-1.html")
selector = Selector(text=response.text)

# Recupera o atributo href do primeiro elemento que combine com o seletor
href = selector.css(".product_pod h3 a::attr(href)").get()
print(href)

# Para obter a url completa, basta adicionar a nossa URL_BASE
print(URL_BASE + href)
```

* Depois é necessário inspecionar a página do produto e pegar o elemento que contém a descrição:

![Descrição elemento](descricaoElemento.png)

> A descrição do produto está uma tag p , "irmã" de uma tag com id product_description . Isto pode ser expresso através do seletor a .

> No código, precisamos realizar uma nova requisição à página de detalhes, e depois analisaremos seu conteúdo em busca da descrição do produto.

```python
from parsel import Selector
import requests

URL_BASE = "http://books.toscrape.com/catalogue/"

response = requests.get(URL_BASE + "page-1.html")
selector = Selector(text=response.text)

href = selector.css(".product_pod h3 a::attr(href)").get()
detail_page_url = URL_BASE + href

# baixa o conteúdo da página de detalhes
detail_response = requests.get(detail_page_url)
detail_selector = Selector(text=detail_response.text)

# recupera a descrição do produto
# ~ significa a tag irmã
description = detail_selector.css("#product_description ~ p::text").get()
print(description)
```

```python
# from parsel import Selector
# import requests


# URL_BASE = "http://books.toscrape.com/catalogue/"
# Define a primeira página como próxima a ter seu conteúdo recuperado
# next_page_url = 'page-1.html'
while next_page_url:
    # Busca o conteúdo da próxima página
    # response = requests.get(URL_BASE + next_page_url)
    # selector = Selector(text=response.text)
    # Imprime os produtos de uma determinada página
    for product in selector.css(".product_pod"):
        # Busca e extrai o título e  o preço
        # title = product.css("h3 a::attr(title)").get()
        # price = product.css(".price_color::text").get()
        # print(title, price)

        # Busca o detalhe de um produto
        detail_href = product.css("h3 a::attr(href)").get()
        detail_page_url = URL_BASE + detail_href

        # Baixa o conteúdo da página de detalhes
        detail_response = requests.get(detail_page_url)
        detail_selector = Selector(text=detail_response.text)

        # Extrai a descrição do produto
        description = detail_selector.css("#product_description ~ p::text").get()
        print(description)

    # Descobre qual é a próxima página
    # next_page_url = selector.css(".next a::attr(href)").get()
```

## Limpeza de dados

* Alguns dados podem vir com conteúdo que não serão utilizados, o que aponta a necessidade do tratamento deles.

> No caso do valor, poderíamos utilizar uma expressão regular para remover os outros caracteres. O padrão é conter um símbolo de libra, seguido por números, ponto para separar casas decimais e dois números como casas decimais. Essa expressão regular pode ser feita da seguinte forma: `£\d+\.\d{2}` .

> Agora, para utilizar a expressão regular que fizemos, podemos substituir o método `getall` pelo método `re` , ou o método `get` por `re_first` . Ambos, além de recuperar valores, aplicarão a expressão regular sobre aquele valor.

```python
from parsel import Selector
import requests


response = requests.get("http://books.toscrape.com/")
selector = Selector(text=response.text)
# Extrai todos os preços da primeira página
prices = selector.css(".product_price .price_color::text").re(r"£\d+\.\d{2}")
print(prices)
```

> Já para o caso do sufixo `...more` , poderíamos utilizar fatiamento para removê-lo. Mas, antes, é importante verificarmos se o conteúdo possui o sufixo, evitando assim perda de conteúdo de forma acidental.

```python
from parsel import Selector
import requests


response = requests.get("http://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html")
selector = Selector(text=response.text)

# Extrai a descrição
description = selector.css("#product_description ~ p::text").get()
print(description)

# "Fatiamos" a descrição removendo o sufixo
suffix = "...more"
if description.endswith(suffix):
    description = description[:-len(suffix)]
print(description)
```

* Implementação:

```python
from parsel import Selector
import requests


# URL_BASE = "http://books.toscrape.com/catalogue/"
# Define a primeira página como próxima a ter seu conteúdo recuperado
# next_page_url = 'page-1.html'
# while next_page_url:
    # Busca o conteúdo da próxima página
    # response = requests.get(URL_BASE + next_page_url)
    # selector = Selector(text=response.text)
    # Imprime os produtos de uma determinada página
    # for product in selector.css(".product_pod"):
        # Busca e extrai o título e  o preço
        # title = product.css("h3 a::attr(title)").get()
        price = product.css(".product_price .price_color::text").re(r"£\d+\.\d{2}")
        # print(title, price)

        # Busca o detalhe de um produto
        # detail_href = product.css("h3 a::attr(href)").get()
        # detail_page_url = URL_BASE + detail_href

        # Baixa o conteúdo da página de detalhes
        # detail_response = requests.get(detail_page_url)
        # detail_selector = Selector(text=detail_response.text)

        # Extrai a descrição do produto
        # description = detail_selector.css("#product_description ~ p::text").get()
        suffix = "...more"
        if description.endswith(suffix):
            description = description[:-len(suffix)]
        # print(description)

    # Descobre qual é a próxima página
    # next_page_url = selector.css(".next a::attr(href)").get()
```

### Fatiamento

> Estruturas de dados do tipo sequência como listas, tuplas e strings podem ter seus elementos acessados através de um índice.

```python
# Recupera o primeiro elemento
[1, 2, 3][0]  # Saída: 1
```

> Podemos também definir dois índices que serão o valor inicial e final de uma subsequência da estrutura. Ou três valores, sendo o último o tamanho do passo que daremos ao percorrer a subsequência.

```python
# Quando não incluso o valor inicial, iniciaremos do índice 0
# e do índice 2 em diante, os elementos não são incluídos
(1, 2, 3, 4)[:2]  # Saída: (1, 2)

# Quando omitimos o valor final
# o fatiamento ocorre até o fim da sequência
(1, 2, 3, 4)[1:]  # Saída: (2, 3, 4)

# Vá do índice 3 até o 7.
# O item no índice 7 não é incluído
"palavra"[3:7]  # Saída: "avra"

# Começando do elemento de índice 1, vá até o último,
# saltando de 2 em 2
[1, 2, 3, 4][1::2]  # Saída: [2, 4]
```

> **OBS.:** À partir da versão 3.9 do Python, teremos uma função chamada `removesuffix` , que é equivalente a `palavra[:-len(suffix)]` .

## Banco de Dados



# Links

- [Seletores CSS](https://devhints.io/css)
- [Seletores Xpath](https://devhints.io/xpath)