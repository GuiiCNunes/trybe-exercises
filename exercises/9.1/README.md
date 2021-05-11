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

## Links

- [JavaScript Palavras reservados](https://www.w3bai.com/pt/js/js_reserved.html)
- [JavaScript Promises - Summer Job](https://github.com/LucasPedroso/Project-Summer-Job-Trybe)
- [Marie Chatfield — What is asynchronous code execution?](http://mariechatfield.com/tutorials/explanations/asynchronous-code.html)
- [Medium - JavaScript: What the heck is a Callback?](https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced)
- [MDN - Callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- [Scotch - Callbacks, Promises, and Async](https://scotch.io/courses/10-need-to-know-javascript-concepts/callbacks-promises-and-async)
- [Medium - Entendendo funções callback em JavaScript](https://medium.com/totvsdevelopers/entendendo-fun%C3%A7%C3%B5es-callback-em-javascript-7b500dc7fa22)