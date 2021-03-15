# Git, Github e Internet

## Git & GitHub - O que é e para que serve

Comandos:

### git init

Inicia o versionamento do diretório.

```
git init
```

### git add

Adiciona o arquivo ao versionamento. Podendo conter mais de um arquivo ou um **.** para pegar o diretório todo.

```
git add *ARQUIVOS*
```

### git status

Mostra o estado atual do versionamento, se houve modificações não rastreadas ou versionadas, como esta em relação ao remoto, etc...

```
git status
```

### git commit

Confirma uma nova versão do código com as alterações feitas. Dica: **Não** deixar para fazer um commit com muitas alterações.

```
git commit -m '*RESUMO_ALTERAÇÕES*'
```

### git branch

Visualiza as *branch* disponíveis?

```
git branch
```

Cria uma nova *branch*:

```
git branch *NOME_DA_BRANCH*
```

### git checkout

Altera entre as *branch* ou entre commits.

```
git checkout *NOME_BRANCH_DESTINO*
```
```
git checkout *4_PRIMEIROS_N_HASH_COMMIT*
```

Pode ser acrescentado no final o arquivo específico que quer voltar.
Pode ser colocador após o *hash* de identificação (sem espaço entre eles) um *~1* para demonstrar que o commit volta a valer de fato.

### git log

Exibe o histórico de *commits*.

```
git log
```

### git merge

Junta a *branch* atual com a *branch* desejada.

```
git merge *BRANCH_DESEJADA*
```

### git remote

Vincula o repositório local com um remoto, atribuindo um apelido.

```
git remote add *APELIDO_REPOSITÓRIO* *LINK_REPOSITÓRIO_REMOTO*
```

Para observar a qual repositório remoto o local esta vinculado rode:

```
git remote -v
```

### git push

Sobe as alterações do reposótio local para a *branch* desejada no remoto.

```
git push *APELIDO_REPOSITÓRIO* *BRANCH_DESEJADA*
```

### git reset

Retorna a versão do repositório para a versão desejada.

```
git reset --hard *HASH_IDENTIFICAÇÃO_VERSÃO*
```

*O reset pode ser hard, soft ou mix.* 

### Links úteis

- [Livro oficial sobre Git](https://git-scm.com/book/pt-br/v2)
- [Ótimo curso da Udemy sobre Git](https://www.udemy.com/course/git-e-github-para-iniciantes)
- [Curso da Udacity sobre Git](https://www.udacity.com/course/version-control-with-git--ud123)
- [Como conectar com o repositório no GitHub via SSH ?](https://help.github.com/en/articles/connecting-to-github-with-ssh)
- [Reforço sobre aprendizado do Git em um guia rápido](https://www.freecodecamp.org/news/learn-the-basics-of-git-in-under-10-minutes-da548267cc91/)
- [Instalando o Git - Git Setup](https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Instalando-o-Git)
- [Configuração inicial - Git Config](https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Configura%C3%A7%C3%A3o-Inicial-do-Git)
- [Adicionando chave SSH na conta do GitHub](https://medium.com/@rgdev/como-adicionar-uma-chave-ssh-na-sua-conta-do-github-linux-e0f19bbc4265)
- [Do primeiro commit ao primeiro Push](http://www.devfuria.com.br/git/tutorial-iniciando-git/)
- [Guia Git](https://rogerdudler.github.io/git-guide/index.pt_BR.html)
- [Resumo Comandos](https://gist.github.com/leocomelli/2545add34e4fec21ec16)

