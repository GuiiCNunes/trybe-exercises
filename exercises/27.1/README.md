# Bloco 27 - Autenticação e Upload de Arquivos

## NodeJS - JWT - (JSON Web Token)

Vantagens:

> Não utiliza banco de dados: usar o JWT implica menos consultas ao banco de dados, o que nos dá um tempo de resposta mais rápido. Caso você esteja usando serviços pagos, como o [DynamoDB](https://aws.amazon.com/dynamodb/) , que cobram por consulta, o JWT poderá reduzir os custos de consumo.

> Mais simples de usar (se você for cuidadoso): se seu projeto não tem uma arquitetura boa para administrar as sessões dos seus clientes, e seus princípios básicos de segurança não forem claros, o tempo de desenvolvimento usando JWT será bem mais rápido, considerando que você pode simplesmente usar alguma biblioteca existente.

> Utilizado em vários serviços: você pode ter um servidor de autenticação que lida com o login/cadastro para gerar o token para a pessoa usuária. A partir daí, você pode transitar seu token entre várias aplicações, sendo necessário logar apenas uma vez e logo depois estar logado em todas as outras aplicações do seu sistema. No Google, por exemplo, você loga uma única vez e pode usar serviços como Google Drive, Gmail, Google docs, Google fotos, etc. sem precisar logar novamente.

Fonte [Trybe](https://www.betrybe.com/)

O *JWT* é um *token* gerado apartir de dados pessoais utilizado trafegar na internet ao fazer requisições. Mas toda a informação nele **é pública**. A segurança do *JWT* está em só quem tiver a senha consegue alterar as informações.

Etapas:

1. O navegador solicita que o usuário digite seu login e senha.
2. O navegador então envia esse login e senha ao servidor, para verificar que esses dados estão corretos.
3. Uma vez que valida login e senha, o servidor cria dois objetos: um contendo informações sobre o token que será gerado, que chamamos de header , e outro contendo os dados do usuário e as permissões que aquela pessoa têm, ao qual chamamos de payload .
4. O servidor então converte esses dois objetos em JSON, junta-os em uma mesma string e utiliza um algoritmo chamado HMAC para "criptografar" essa string usando um "segredo" que só ele sabe, gerando o que chamamos de assinatura , que nada mais é do que Header + Payload criptografados.
5. Por fim, o servidor combina o header, o payload originais e a assinatura, criando assim o token .
6. O token é enviado ao cliente, que o armazena para utilizá-lo nas próximas requisições.

A próxima requsiição:

1. O navegador envia ao servidor os dados para, por exemplo, cadastrar um novo produto. Juntamente a esses dados, o navegador envia o token que recebeu ao realizar o login.
2. Quando recebe os dados, a primeira coisa que o servidor faz é obter o Header e o Payload do token e criptografá-los, gerando, mais uma vez, a assinatura.
3. O servidor, então, compara a nova assinatura com a assinatura que foi enviada pelo client. Se ambas forem iguais, quer dizer que o conteúdo do Header e do Payload não foram modificados desde o login.
4. Agora que já sabe que o token é válido, o servidor continua processando a requisição e, por fim, entrega a resposta para o cliente.

Se o cliente adulterar o *token* antes de enviar ao servidor:

1. O cliente envia, para o servidor as informações do produto e o token modificado
2. O servidor extrai o payload e header do token e, utilizando essas duas informações, gera uma assinatura.
3. Ao comparar a assinatura nova com a assinatura enviada pelo client, o servidor percebe que há uma diferença! Isso acontece porque criptografar { "admin": false } sempre vai gerar um resultado (uma assinatura, nesse caso) diferente de criptografar { "admin": true } .
4. Como a assinatura é diferente, o servidor rejeita a requisição, devolvendo um status de erro com uma mensagem informando que o token é inválido.

### O que é HMAC?

O *HMAC* gera um arquivo *MAC*(código de autenticação de mensagem), criptografado através de um algoritmo *hash* (como *md5*, *sha1*, *sha5*), apartir de uma chave secreta(senha) e de uma mensagem qualquer. Exemplo:

```
// Mesagem:
"Olá, tudo bem?"
// Segredo:
minhaSenha
// Algoritmo
sha1

//Resultado
b88651e71c7c757560722b52e5f1ead754a759d8

// Alteração da mensagem para:
"olá, tudo bem?"

//Resultado
ac7016fd2014ca9a79ac2e3ef16b6bd857f91f7a
```

A formula:

```
HMAC(K, m) = hash(K1 + hash(K2 + m))
```

* `K` é a chave secreta;
* `m` é a mensagem;
* `hash` é a função de hash escolhida (md5, sha1 etc);
* `K1` e `K2` são chaves secretas derivadas da chave original K;
* `+` é a operação de concatenação de strings.

### Entendendo o JWT

Consiste em uma assinatura criptográfica de dois blocos JSON, codificados em [base64](https://pt.wikipedia.org/wiki/Base64). Esses blocos codificados são *header*(cabeçalho) e *payload*(carga). A *signature*(assinatura) é a junção de ambos *hashes*.

#### Header

Contém duas propriedades:

```
{
  "alg": "HS256", // Tipo de algoritmo hash
  "typ": "JWT" // Tipo do Token
}
```

#### Payload

Segunda parte do *Token*, contem os dados, geralmente do usuário.
```
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

#### Signature

Para gerar, é preciso usar o *header* e o *payload* codificados com `base64`, usando o algoritmo definido no *header*.
```
import { hmac } from 'bibliotecaDeHmac';

function base64 (string) {
  return Buffer.from(string).toString('base64');
}

const header = JSON.stringify({
  alg: 'HS256',
  type: 'JWT'});

const payload = JSON.stringify({
  sub: '1234567890',
  name: 'John Doe',
  admin: true});

const secret = 'MinhaSenhaMuitoComplexa123';

const assinatura = hmac(`${base64(header)}.${base64(payload)}`, secret);

const token = `${base64(header)}.${base64(payload)}.${base64(assinatura)}`;
```

Resultado:

```
(Header em base64).(Payload em base64).(Signature em base64)

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiZXhwIjoxNTQ3OTc0MDgyfQ.2Ye5_w1z3zpD4dSGdRp3s98ZipCNQqmsHRB9vioOx54
```

Sendo:

* **Header**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
* **Payload**: eyJ1c2VybmFtZSI6InVzZXIxIiwiZXhwIjoxNTQ3OTc0MDgyfQ
* **Signature**: 2Ye5_w1z3zpD4dSGdRp3s98ZipCNQqmsHRB9vioOx54

* Exemplo de envio de um *header* em uma requisição HTTP:

```
 GET /foo/bar HTTP/1.1
 Host: www.exemplo.com
 Authorization: Bearer (Header em base64).(Payload em base64).(Signature em base64)
```

**O JWT pode ser usado com qualquer linguagem que suporte os requisitos mínimos para gerar um token e enviar uma requisição HTTP**. Exemplos: Java, C#, PHP ou Python

![Diagrama JWT](exercises/27.1/DiagramaJWT.png)

### Instalação

```
npm install jsonwebtoken
```

Exemplo de código:

```
// const User = require('../models/user');
const jwt = require('jsonwebtoken');

/* Sua chave secreta. É com ela que os dados do seu usuário serão encriptados.
   Em projetos reais, armazene-a numa variável de ambiente e tenha cuidado com ela, pois só quem tem acesso
   a ela poderá criar ou alterar tokens JWT. */
const secret = 'seusecretdetoken';

// module.exports = async (req, res) => {
//   try {
//     const username = req.body.username;
//     const password = req.body.password;

//     if (!username || !password)
//       return res
//         .status(401)
//         .json({ message: 'É necessário usuário e senha para fazer login' });

//     const user = await User.findUser(username);

//     if (!user || user.password !== password)
//       return res
//         .status(401)
//         .json({ message: 'Usuário não existe ou senha inválida' });

    /* Criamos uma config básica para o nosso JWT, onde:
      expiresIn -> significa o tempo pelo qual esse token será válido;
      algorithm -> algoritmo que você usará para assinar sua mensagem
                  (lembra que falamos do HMAC-SHA256 lá no começo?). */

    /* A propriedade expiresIn aceita o tempo de forma bem descritiva. Por exemplo: '7d' = 7 dias. '8h' = 8 horas. */
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    /*
      Aqui é quando assinamos de fato nossa mensagem com a nossa "chave secreta".
      Mensagem essa que contém dados do seu usuário e/ou demais dados que você
      quiser colocar dentro de "data".
      O resultado dessa função será equivalente a algo como: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVlNTQ1OTBiYTQ5NDQ4ZjdlNWZhNzNjMCIsInVzZXJuYW1lIjoiaXRhbHNzb2RqIiwicGFzc3dvcmQiOiJzZW5oYTEyMyIsIl9fdiI6MH0sImlhdCI6MTU4MjU4NzMyNywiZXhwIjoxNTg0Nzc0NzE0OTA4fQ.UdSZi7K105aaVnoKSW-dnw-Kv7H3oKMtE9xv4jwyfSM
      */
    const token = jwt.sign({ data: user }, secret, jwtConfig);

    /* Por fim, nós devolvemos essa informação ao usuário. */
    res.status(200).json({ token });
//   } catch (e) {
//     return res.status(500).json({ message: 'Erro interno', error: e });
//   }
// };
```

* Exemplo de um *middleware* de validação de *Token*

```
// validateJWT.js
const jwt = require('jsonwebtoken');
const model = require('../../models/user');

/* Mesma chave privada que usamos para criptografar o token.
   Agora, vamos usá-la para descriptografá-lo.
   Numa aplicação real, essa chave jamais ficaria hardcoded no código assim,
   e muitos menos de forma duplicada, mas aqui só estamos interessados em
   ilustrar seu uso ;) */
const segredo = 'seusecretdetoken';

module.exports = async (req, res, next) => {
  /* Aquele token gerado anteriormente virá na requisição através do
     header Authorization em todas as rotas que queremos que
     sejam autenticadas. */
  const token = req.headers['authorization'];

  /* Caso o token não seja informado, simplesmente retornamos
     o código de status 401 - não autorizado. */
  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  try {
    /* Através o método verify, podemos validar e decodificar o nosso JWT. */
    const decoded = jwt.verify(token, segredo);
    /*
      A variável decoded será um objeto equivalente ao seguinte:
      {
        data: {
          _id: '5e54590ba49448f7e5fa73c0',
          username: 'italssodj',
          password: 'senha123'
        },
        iat: 1582587327,
        exp: 1584774714908
      }
    */

    /* Caso o token esteja expirado, a própria biblioteca irá retornar um erro,
       por isso não é necessário fazer validação do tempo.
       Caso esteja tudo certo, nós então buscamos o usuário na base para obter seus dados atualizados */
    const user = await model.findUser(decoded.data.username);

    /* Não existe um usuário na nossa base com o id informado no token. */
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }

    /* O usuário existe! Colocamos ele em um campo no objeto req.
       Dessa forma, o usuário estará disponível para outros middlewares que
       executem em sequência */
    req.user = user;

    /* Por fim, chamamos o próximo middleware que, no nosso caso,
       é a própria callback da rota. */
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
```
Especificando o que vem o `jwt.verify()`

```
{
  data: { // Dados enviados
    _id: '5e54590ba49448f7e5fa73c0',
    username: 'italssodj',
    password: 'senha123'
  },
  iat: 1582587327, // Data de criação do Token
  exp: 1584774714908 // Data que expira
}
```

## Links

- [HMAC](https://tools.ietf.org/html/rfc2104)
- [JWT](https://jwt.io/)
- [Documentação do pacote jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Entendendo JWT](https://medium.com/tableless/entendendo-tokens-jwt-json-web-token-413c6d1397f6)
