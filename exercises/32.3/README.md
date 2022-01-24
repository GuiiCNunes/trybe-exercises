# Bloco 32 - Introdução à Python

## Testes

- Biblioteca [pytest](https://docs.pytest.org/en/latest/)
  * `python3 -m pip install pytest`
  * **INSTALAR NO AMBIENTE EXPECÍFICO**
  * Verificar instalação: `python3 -m pytest --version`
  * **LIB SÓ ACEITA ARQUIVOS DE TESTE QUE COMECEM COM `test_`**
    * **INCLUINDO AS FUNÇÕES DENTRO DELE**
  * Para rodar: `python3 -m pytest`

* Testando funções:

```python
def test_is_odd_when_number_is_odd_returns_true():
    'Para um número ímpar a função deve retornar o valor True'
    assert is_odd(3) is True
```

* Testando disparo de exceções:

```python
def test_divide_when_other_number_is_zero_raises_an_exception():
    with pytest.raises(ZeroDivisionError, match="division by zero"):
        divide(2, 0)
```

> Quando escrevemos testes, pensamos em cenários distintos que podem ocorrer ao nosso sistema: "dado um arquivo com as seguintes linhas", "visto que temos um banco de dados com um dado registro" ou "a partir de um cliente web". Às precondições ou estados necessários para a execução de um teste, damos o nome de `test fixture` ou apenas `fixture` .

> Cada teste pode ter seu próprio cenário (contexto) ou compartilhá-lo com outros testes.

```python
# get_most_ordered_dish_per_costumer é uma função que retorna o prato mais pedido por uma
# determinada pessoa cliente, considerando que os pedidos estão em uma lista.

# get_order_frequency_per_costumer é uma função que retorna a frequência que uma determinada
# pessoa cliente pede um determinado prato , considerando que os pedidos estão em uma lista.


# uma fixture utilizando a biblioteca pytest
# é definida utilizando a sintaxe abaixo
@pytest.fixture
def orders():
    """Nosso cenário (contexto) temos os seguintes pedidos"""
    return [
        {"customer": "maria", "order": "pizza", "day": "terça-feira"},
        {"customer": "joao", "order": "hamburger", "day": "terça-feira"},
        {"customer": "maria", "order": "pizza", "day": "quarta-feira"},
        {"customer": "maria", "order": "hamburger", "day": "quinta-feira"},
    ]

# estamos adicionando a fixture orders ao teste
# ou seja temos um contexto onde os pedidos são os definidos anteriormente
def test_get_most_ordered_dish_per_costumer_when_customer_is_maria(orders):
    assert get_most_ordered_dish_per_costumer(orders, "maria") == "pizza"

# novamente adicionamos um cenário (contexto) ao teste onde os pedidos realizados são os
# definidos na fixture
def test_get_order_frequency_per_costumer_when_customer_is_joao_and_order_is_pizza(orders):
    assert get_order_frequency_per_costumer(orders, "joao", "pizza") == 0

def test_get_order_frequency_per_costumer_when_customer_is_maria_and_order_is_hamburger(orders):
    assert get_order_frequency_per_costumer(orders, "maria", "hamburger") == 1
```

### Dublês de Teste

> Podemos substituir componentes para que retornem um determinado valor simulado ou podemos substituir os componentes por objetos falsos que registram as informações sobre sua invocação como o número de vezes em que foram chamados ou os parâmetros com o qual foram chamados.

* **fakes**: objetos que possuem implementações funcionais, porém normalmente simplificadas;
* **mocks**: são pré programados para verificarem as chamadas das funções que receberem;
* **stubs**: proveem respostas predefinidas;
* **spies**: são como stubs, mas também armazenam informações de como foram chamados.

## Links

* [artigo do Martin Fowler](https://martinfowler.com/bliki/TestDouble.html)

* [Guia do mochileiro para Python - tests](https://python-guide-pt-br.readthedocs.io/pt_BR/latest/writing/tests.html)
* [Live de Python - Testes com Python](https://www.youtube.com/watch?v=5hL9T3jintE)
* [Unit testing in Visual Studio](https://docs.microsoft.com/pt-br/visualstudio/python/unit-testing-python-in-visual-studio?view=vs-2019)
* [Dublês de teste](https://cassiobotaro.dev/post/dubles-de-teste/)