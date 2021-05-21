# Bloco 10 - Testes automatizados com Jest

## Jest - Simulando comportamentos

### Mocks

Simula funções, módulos e requisições para testes. Permite maior controle e agilidade na hora de construir e executar os testes.

> Pense no projeto bônus do bloco 5, o Adivinhe a cor , em que era necessário gerar cores aleatórias. Como testar essas cores, se não sabemos quais serão geradas? Pense também em uma requisição de API que constantemente muda seu retorno. Como ter certeza do seu retorno e, principalmente, de que seu teste não está caindo em um **falso-positivo**?

Formas destaques de *mockar*:

- `jest.fn();`
- `jest.mock();`
- `jest.spyOn();`

#### jest.fn()

Transforma uma função em uma simulação, o comportamento definido no *mock* será chamado ao invés da função original. Útil para lidar com valores aleatórios.
Ele assume o controle da função com a sintaxe:

```
functionToTest = jest.fn();
```

Lembrando que o comando acima apenas redefine a função, **não a executa**, sendo necessário o comando `functionToTest();` para executar.
Após ser chamado, podemos utilizar os métodos próprios dele para fazer as validações, basta colocar os comandos a seguir após o `expect()`. Podem ser utilizados os *matchers* padrões do `expect`.

- `.toHaveBeenCalled()`: Verifica se a função foi chamada. Nesse método a função dentro do `expect` não recebe os parênteses, apenas seu identificador.
- `.toHaveBeenCalledTimes(number)`: Testa o *number* de vezes que a função foi chamada.

Comandos que são colocador após o `jest.fn()` para simular retornos.
- `.mockReturnValue(value)`: Coloca o *value* como retorno da função (substituir pelo valor desejado).
- `.mockReturnValueOnce(value)`: Coloca o *value* como retorno da função (substituir pelo valor desejado) apenas uma vez. Esse comando resulta que o valor `.mockReturnValue(value)` só será atribuido após o *Once*. **Pode ser encadeado**.

#### jest.mock()

Simula todo um pacote de módulos ou dependências de uma vez. Ou seja, *mocka* diversas funções com apenas um comando. Ele consegue simular um arquivo de *script* inteiro. Exemplo:

```
jest.mock('./math');
```

- `.mockImplementation(func)`: Faz uma implementação inteira da função para a simulação. Ele é chamado logo após a função do *script mockado* e recebe uma nova função como parâmetro, essa nova será a implementação da chamada, na simulação.
- `.mockImplementationOnce(func)`: Similar ao `.mockReturnValueOnce(value)`, implementação só roda uma vez, depois assume a implementação do `.mockImplementation(func)`.**Pode ser encadeado**.
- `.toHaveBeenCalledWith(...args)`: Valida os parâmetros que foram passados para a função. Similar aos outros *toHaveBeenCalled*, mas recebe como argumento os parâmetros que se quer validar como passados anteriormente.

#### jest.spyOn()

Possibilita usar *matchers* de *mock* presernvando a funcionamento normal(implementação original) da função. Sintaxe:

```
const mockSpyExemple = jest.spyOn(lib, "functionToSpy");
```

Basta atribuir a função `jest.spyOn()` a uma variável, passando como parâmetro o arquivo que contem a função (pode relacionar com o `require`) e depois a identificação da função.

#### Limpar e Restaurar mocks

- `mock.mockClear()`: Útil quando você deseja limpar os dados de uso de uma simulação entre dois *expects*.
- `mock.mockReset()`: Faz o que o *clean* faz, e ainda reseta a função para um estado inicial, removendo qualquer retorno estipulado ou implementação.
- `mock.mockRestore()`: Faz o que o *reset* faz e mais. Útil para quando você quer simular funções em certos casos de teste e restaurar a implementação original em outros.

**Esses métodos só podem ser aplicados em funções que estão com o `jest.spyOn()`.**

### Mock funções assíncronas

Diferenças:

- `mockResolvedValue(value)`
- `mockRejectedValue(value)`
- `mockResolvedValueOnce(value)`
- `mockRejectedValueOnce(value)`