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

### git reset

Retira o arquivo da *stage area* (depois do *add*).

```
git reset *NOME_ARQUIVO*
```

### Recursos Adicionais

- [Reforço de Git e GitHub](https://course.betrybe.com//fundamentals/git/reforco.pdf)
- [Resolvendo um mistério de assassinato... Somente com comandos de Git!](https://github.com/nivbend/gitstery)
- [Como conectar com o repositório no GitHub via SSH?](https://help.github.com/en/articles/connecting-to-github-with-ssh)
- [Reforço sobre aprendizado do Git em um guia rápido](https://www.freecodecamp.org/news/learn-the-basics-of-git-in-under-10-minutes-da548267cc91/)
- [Curso extenso e completo de Git](https://www.udacity.com/course/version-control-with-git--ud123)
- [Como ignorar arquivos no Git](https://fjorgemota.com/gitignore-ou-como-ignorar-arquivos-no-git/)
- [Tutorial do GitHub sobre o .gitignore](https://help.github.com/pt/github/using-git/ignoring-files)
- [Estilizar o repositório](https://github.com/kautukkundan/Awesome-Profile-README-templates/tree/master/code-styled) *Para liberar o profile -> criar um novo repositório e nomeá-lo com nome do seu usuário.*
