# Bloco 9 - JavaScript Assíncrono e Promises

## JavaScript Assíncrono e Callbacks

Consiste em desenvolver etapas separadas da ordem de leitura do código. Exemplo de uso, aguardar resposta de um servidor, assim a página continua seu carregamento enquanto o código que utilizará a resposta fica em um segundo plano aguardando.

### setTimeout()

Utilizado para simular um tempo de resposta. Funcionamento assíncrono.
[Documentação](https://www.w3schools.com/jsref/met_win_settimeout.asp). Recebe uma função ou avalia uma expressão(primeiro parâmetro) após um tempo especificado em milisegundos (segundo parâmetro).
**1000 milisegundos = 1 segundo.**

```
setTimeout(function(){}, 000);
```

### Fetch API

Recursos desenvolvidos para lidar com requisições HTTP no JS. A primária é a função `fetch()`. Esta recebe dois parÂmetros, o URL do serviço alvo da requisição e um objeto contendo informações sobre a requisição. Este objeto contem chaves com informações específicas para aquela API, para saber quais chaves e valores colocar, consulte a documentação da API alvo.