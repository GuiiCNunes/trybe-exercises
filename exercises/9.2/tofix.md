1. O que é um código que é executado de modo assíncrono? Qual é a diferença disso para um código que é executado de modo síncrono?

  O síncrono segue a fila de execução estipulada pelo próprio código, de cima para baixo, sendo que cada bloco tem que aguardar a conclusão do anterior. No assíncrono blocos são executados simultaneamente, sem uma ordem rígida.

2. Quando você tem que enfileirar várias callbacks , que problema surge?

  Aguardar o retorno de uma sequÊncia de callback pode quebrar o site, gerando um experiencia desagradável ao usuário.

  Problema de ordem da fila e da sequência de retornos. Fica difícil determinar quando um retorno estará pronto para ser utilizado.

3. Por que as Promises são uma forma de se resolver esse problema?

  As promisses executam o código assincronamente, o que pode otimizar a execução do código, enquanto aguarda uma resposta, executa outros blocos.

4. Quando você vai se comunicar com uma API , tal comunicação deve ser síncrona ou assíncrona? Lembre-se de que o serviço ao qual você está se conectando pode demorar muito ou pouco para dar retorno, pode estar fora do ar etc.

  Assincrona para não prejudicar a experiência do usuário.

5. Dada a resposta anterior, o que é fetch e para que ele serve?

  Fetch envia uma requisição a uma api, utilizando uma URL. Ele roda assincrono enquanto aguarda o retorno.