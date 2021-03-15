# Git, Github e Internet

## Git & GitHub - Entendendo os comandos

### git clone

Clona uma repositório remoto para o local.

```
git clone *URL_REPOSITÓRIO*
```

### git rm

Remove um arquivo do Git.

```
git rm *NOME_ARQUIVO*
```

### Arquivo Git Ignore

Arquivos que o git irá ignorar no versionamento.
Criar um arquivo *.gitignore*. 
Arquivo pode ser configurado para ignorar arquivos com nome específico, tipos específicos de arquivos (com o uso de *wilcards*. Ex.: *.txt) e/ou diretórios inteiros (nome do diretório seguido de */*). [Gerador de Git Ignore](toptal.com/developers/gitignore).

### git fetch

Verifica se existe alterações no repositório remoto.
**Não afeta a *workstation*, mas atualiza as versões.**

```
git fetch
```

### git pull

Puxa as alterações do remoto para o local. *Fetch + Merge*
**Afeta a *workstation*.**

```
git pull
```

### Code Review

[Repositório com conteúdo](https://github.com/joho/awesome-code-review)

[Repositório do Google sobre](https://github.com/google/eng-practices)

