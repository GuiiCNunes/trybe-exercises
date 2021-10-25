# Bloco 27 - Autenticação e Upload de Arquivos

## NodeJS - Upload de arquivos com `multer`

O `multer`é semelhande ao `body-parse`, ele interpreta dados enviados via corpo da requisição. A diferença pe que o `multer` suporta requisições no formato *Form Dat*a (*Content-Type: multipart/form-data*).

### multipart/form-data

FOrmato bem antigo, pensado para suportar todas as operações do `forms`. Ele possui muitos campos, como o *JSON*, e cada campo tem seu tipo (número, boolean, string ou arquivo).

Além do tradicional `req.body()`, para as informações comuns, o `multer` disponibiliza o `req.file` (ou `req.files`) que possui o(s) arquivo(s) enviado(s).

## Links