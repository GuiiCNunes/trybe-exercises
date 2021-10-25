# Bloco 27 - Autenticação e Upload de Arquivos

## NodeJS - Upload de arquivos com `multer`

O `multer`é semelhande ao `body-parse`, ele interpreta dados enviados via corpo da requisição. A diferença pe que o `multer` suporta requisições no formato *Form Dat*a (*Content-Type: multipart/form-data*).

### multipart/form-data

FOrmato bem antigo, pensado para suportar todas as operações do `forms`. Ele possui muitos campos, como o *JSON*, e cada campo tem seu tipo (número, boolean, string ou arquivo).

Além do tradicional `req.body()`, para as informações comuns, o `multer` disponibiliza o `req.file` (ou `req.files`) que possui o(s) arquivo(s) enviado(s).

### Multer

Instalação

```
npm i multer
```

O `multer` atua como um *middleware*, que cria os campos `body` e `file` para a requisição.
Exemplo:

```
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
const multer = require('multer');

// const PORT = process.env.PORT;

// const controllers = require('./controllers');

// const app = express();

// app.use(
//   cors({
//     origin: `http://localhost:${PORT}`,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Authorization'],
//   })
// );

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// /* Definindo nossa pasta pública */
// /* `app.use` com apenas um parâmetro quer dizer que
//    queremos aplicar esse middleware a todas as rotas, com qualquer método */
// /* __dirname + '/uploads' é o caminho da pasta que queremos expor publicamente */
// /* Isso quer dizer que, sempre que receber uma request, o express vai primeiro
//    verificar se o caminho da request é o nome de um arquivo que existe em `uploads`.
//    Se for, o express envia o conteúdo desse arquivo e encerra a response.
//    Caso contrário, ele chama `next` e permite que os demais endpoints funcionem */
app.use(express.static(__dirname + '/uploads'));

// /* Cria uma instância do`multer`configurada. O`multer`recebe um objeto que,
//       nesse caso, contém o destino do arquivo enviado. */
const upload = multer({ dest: 'uploads' });

app.post('/files/upload', upload.single('file'), (req, res) =>
  res.status(200).json({ body: req.body, file: req.file })
);

// app.get('/ping', controllers.ping);

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`);
// });
```

1. O `multer` é importado.
2. É colocada a pasta `/uploads/` como pública e pode ser utilizada como caminho na url.
3. O `multer` é instânciado para `upload`.
4. É criada a rota para receber os arquivos.

No exemplo, o `multer` está setado para receber apenas um arquivo. Para receber mais, pode utilizar, ao invés de `upload.single('file')`, `upload.array('files')`. Lembrando que o parâmetro (`file`) é o nome que formulário está utilizando para enviar o arquivo, algo assim:

```
<form action="/post" method="post" enctype="multipart/form-data">
  <input type="file" name="file" />
</form>
```

Ao instanciar o `multer`, é passado um objeto `{ dest: 'uploads' }` como parâmetro. Esse objeto aponta qual pasta será o destino dos arquivos.

### Multer Storage

A *storage* permite ter um controle mais detalhado dos *uploads*. Por exemplo, para extrair o nome original do arquivo, podemos usar a propriedade `originalname`. Para criar a *storage* e utilizar a propriedade falada anteriormente:

```
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }});

const upload = multer({ storage });
```

Observe que a storage **é passada como parâmetro, dentro de um objeto, para o `multer`**.
Tambem cabe o destaque para o **uso de *callbacks* dentro da *storage***. Isso possibilita o uso de código assíncrono (podendo fazer uma busca no banco, por exemplo), e tambem possibilita passar um erro como primeiro parâmetro, assim não será armazenado o arquivo.

## Links

* [Axios](https://github.com/axios/axios)
* [XMLHttpRequest](https://developer.mozilla.org/pt-BR/docs/Web/API/XMLHTTPRequest)
* [Documentação Axios](https://github.com/axios/axios)

* [Documentação do multer](https://github.com/expressjs/multer)
* [Documentação do Axios](https://github.com/axios/axios)
* [What is the boundary in multipart/form-data?](https://stackoverflow.com/questions/3508338/what-is-the-boundary-in-multipart-form-data)
