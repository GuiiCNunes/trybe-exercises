# Git, Github e Internet

## Internet - Entendendo como ela funciona

### curl

```
curl *OPÇÕES* *URL*
```

Opções:
- -u ou --user : Permite especificar nome de usuário e senha para autenticação no servidor.
- -T ou --upload-file : Permite transferir arquivos locais para uma URL remota.
- -s ou --silent : Coloca o curl em modo silencioso. 
*Este comando fará com que mensagens de erro e status de progressão não gerem nenhum tipo de notificação.*
- --head : Acessa o cabeçalho da página.
- -O : Requisição de download.
- -o *NOME_ARQUIVO* *URL* : Baixar o já renomeando.

```
curl --manual
```