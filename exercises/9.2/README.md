# Bloco 9 - JavaScript Assíncrono e Promises

## JavaScript Promises

**Funções Assincronas** que possuem dispositivos para controlar o fluxo, mesmo assíncrono. Fazem uso de ***Construtores***. Realiza um *callback* em uma função com 2 parâmetros (*resolve* e *reject*) e utiliza-se do operador *new*.

```
const promise = new Promise((resolve, reject) => {

});
```
Possui 3 estados:
- *Pending*: Ao ser executada entra automaticamente neste estado. Se tornando assíncrona.
- *Resolved*: Retorno que ocorreu tudo certo.
- *Rejected*: Retorno que ocorreu algum erro.

Possuem um comportamento igual ao ***return***, mas o ***resolve*** e o ***reject*** **não interrompem a função quando chamados**. A diferença entre ambos é que o *reject* lança um erro.

### .then()

Recebe o retorno do *resolve*.Pode ser utilizado em cadeia, ou seja, um seguido do outro. O parâmetro utilizado sempre é o retorno do *then()* anterior. Ex:

```
promise().then(() => 2).then((number) => number + 2);
// Vai retornar 4
```

O *then* aguarda a conclusão do *promise* ou *then* que o antecede para ser executado.

### .catch()

Recebe o retorno do *reject*. Se acontecer um *reject*, o retorno pula todos os *then* e cai no *catch*. Inclusive, se ocorrer algum erro antes do *catch* em algum *then*, este erro tambem será tratado pelo *catch*. Por isso é recomendado que ele esteja após todos os *then*.

### Fetch API

Além de fazer rquisições a APIs, ela tambem possui ferramentas de tratamento de dados recebidos e lidar com erros. O retorno depende da API chamada, podendo variar não só em conteúdo, como tambem em formato.
Pode ser utilizado sem o navegador, com o uso do Node. Mas precisa ter a biblioteca *node-fetch*. Para isntalar rode os comandos:

```
npm init -y
npm i node-fetch
```

### async

Transforma qualquer função em uma *promise*. Para isso basta colocar *async* antes da assinatura da função, como se fosse um tipo. O que ao invés de utilizar *resolve* e *reject*, utiliza-se *return* e *throw*.

### await

**Só pode ser utilizado dentro de uma função *async***. Faz com que a função espere uma resposta para continuar a execução. Basta declarar um *await* antes do que se deseja esperar o retorno, como o *async*.