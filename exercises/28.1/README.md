# Bloco 28 - Deployment

## Infraestrutura - Deploy com Heroku

- Deploy: Publicar a aplicação. Torná-la disponível para o acesso.

- Exemplos de plataformas de serviços para deploy:
  * Heroku;
  * Google GCE;
  * Amazon AWS;
  * Microsoft Azure;
  * IBM Cloud.

### Heroku

> O Heroku é um PaaS (Platform as a Service), o que significa que ele provém de uma plataforma em nuvem para configurarmos e realizarmos nosso deploy de maneira simples e fácil.

```
Node.js , Ruby , Java , Python , Clojure , Scala , Go e PHP
```

### Procfile

O *Procfile* é o arquivo que especifica qual comando deve ser executado para iniciar o projeto. Outras informações que esse arquivo traz, são: características da aplicação, se é um servidor web ou um *job*, se possui multiplos processos ou apenas um, etc...
Esse arquivo deve ser colocado na raiz do projeto, com o nome `Procfile` (**sem extensão**). Quando não encontrado, o Heroku tanta rodar o projeto de modo padrão da linguagem/framework.

Estrutura do Arquivo:

```
<process type>: <command>
```

- `<process type>` Define o tipo daquele processo. Por exemplo, se é um servidor web ou um job .
- `<command>` É o comando para iniciar o projeto.

Exemplo:

```
web: node index.js
```

> **Importante!** O tipo web é especial, pois ele é o único tipo que pode receber tráfego HTTP externo pelas rotas do Heroku . A cada deploy , uma porta é gerada e fica disponível na variável de ambiente PORT . O Heroku fica responsável por redirecionar o tráfego HTTP que sua aplicação recebe para essa porta. Por isso, verifique se sua aplicação está parametrizada para definir qual porta utilizar a partir dessa variável de ambiente.

### Dynos

*Dynos* são os containers que o Heroku utiliza para executar o projeto.

> O conceito de containers não é exclusivo do Heroku. Na verdade, esse conceito é utilizado por diversas soluções e possui várias vantagens. Entre elas, estão a possibilidade maior de uma abstração da infraestrutura e facilidade para escalar seus projetos.

![Scalling Heroku](https://s3.us-east-2.amazonaws.com/assets.app.betrybe.com/back-end/infrastructure/deploy/heroku/images/heroku-scaling-d057ac613631b1a1fee87c902a915526.svg)

A figura mostra como escalar a aplicação no Heroku de forma horizontal. Alocando mais *dynos* e gerando melhor desempenho. Podendo ser realizado via linha de comando ou *dashboard* do Heroku. Com esse processo é possível configurar um *autoscaling*, fazendo com que o próprio Heroku aloque mais recursos conforme alguns parâmetros (ex.: Tempo de resposta da API).

### Heroku CLI

> Com ele, conseguiremos gerenciar e escalar nossas aplicações, prover add-ons , observar logs e rodar nossos projetos localmente, simulando o servidor (se você não entendeu alguma dessas funções, calma, veremos cada uma adiante).

**Instalação**

```
sudo snap install hello-world

// Retorno esperado: hello-world 6.3 from Canonical✓ installed
```

Se o comando `snap`não for reconhecido: `apt-get update && apt-get install snapd`

Linux:

```
sudo snap install heroku --classic
```

macOS:

```
brew tap heroku/brew && brew install heroku
```

**Logando no Heroku**

Após a instalação é possível acessar o Heroku pelo terminal.

```
heroku login
```

#### Utilizando o Heroku

Para rodar um projeto de modo local, simulando o Heroku, basta instalar as dependências:

```
npm install # Instalando as dependências em um exemplo NodeJs utilizando o npm.

heroku local web
```

Além disso, é necessário colocar mais um repositório remoto ao projeto, além do `origin`. Este apontando para o servidor do Heroku.

Para isso, rode o comando dentro da pasta raiz da aplicação:

```
heroku create
```

Com o comando acima é gerado um nome aleatório para o repositório criado no Heroku. Para dar um nome específico, coloque o comando seguido do nome que se quer. Como:

```
heroku create meu-primeiro-deploy-2930
```

Se quiser criar com um nome diferente do que é atribuido ao vinculo, o `heroku` que aparece no `git remote -v`. Basta executar o comando acrescido da *flag* `--remote` e o nome a ser utilizado. Como:

```
heroku create meu-deploy-de-testes-29302 --remote heroku-homolog
```

Caso queira apenas renomear essa ligação:

```
git remote rename heroku heroku-origin
```

Para vincular a um novo repositório remoto:

```
heroku git:remote -a meu-deploy-de-testes-29302 --remote heroku-test
```

##### Buildpack

> Em alguns casos, precisamos rodar algum script ou realizar alguma configuração para publicar nosso app. Por exemplo, para publicar uma aplicação React precisamos "servi-la" com um server-side app (back-end), como, por exemplo, um server com express .

*Buildpacks* são ferramentas que automatizma esse processo de 'servir', e outros. Podendo ser oficiais ou criados pela comunidade.

Um exemplo de *Buildpack* para utilizar com React: [mars/create-react-app](https://github.com/mars/create-react-app-buildpack#usage). Ele utiliza o [Nginx](https://nginx.org/en/), que promoce uma otimização de performance e segurança.
Tambem é possível conferir um [catálogo de buildpacks](https://elements.heroku.com/buildpacks).

#### Fazendo Deploy

Faça o push para o repositório do Heroku.

```
git push heroku-origin master
```

O retorno esperado é similar a:

```
[…]
remote: Released v3
remote: https://nome-do-seu-app-123.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy… done.
[…]
```

Assim é gerado um link com o caminho para acessar a aplicação. Ou seja, **sempre que der `push`, o ultimo *commit* será publicado**. Lembrando que só `push`'s no repositório remote do Heroku são considerados, se o push for em outro, o Heroku não é afetado. Além disso, `push` em `branch`'s diferentes da `master` tambem são ignorados.
Para jogar o conteúdo de outra `branch` na principal do Heroku:

```
git push heroku branch-teste:master
```

> **Além disso**, é importante que saiba que ao setar variáveis de ambiente no front-end, essas variáveis já precisam existir no momento do build , pois a forma como elas funcionam é diferente de como funcionam no back-end.

> No back-end, quando utilizamos process.env.ALGUMA_COISA , ele vai considerar o valor de ALGUMA_COISA que está definido na máquina atual. Já no front-end, quando se executa o comando npm start ou npm run build , ele vai pegar todos os process.env.* e irá trocar pelo valor daquela variável naquele momento.

> Então, caso se tenha um process.env.REACT_APP_API_URL no front-end, e REACT_APP_API_URL tenha o valor "xablau" naquele momento, ele vai apagar process.env.REACT_APP_API_URL e irá substituir por "xablau" . Por esse motivo, na hora de subir o front-end no Heroku , é preciso setar as variáveis de ambiente antes de executar o comando de push , pois é no momento do push que o npm run build é executado e que os process.env.* são convertidos para os valores das variáveis.

#### Gerenciando seus apps

Para listar os serviços em execução:

```
heroku apps
```

Para ver os detalhes de um *app* específico:

```
heroku apps:info nome-do-seu-app-12345
```

**Variáveis de Ambiente**

Para setar:

```
heroku config:set TESTE="texto qualquer" --app nome-do-seu-app-12345
```

Para listar:

```
heroku config --app nome-do-seu-app-12345
```

**Logs**

Para monitorar:

```
heroku logs --app nome-do-seu-app-12345
```

O comando acima mostra as 100 últimas linhas por padrão. Caso queira mudar, utilizar `-n` ou `--num`:

```
heroku logs -n 200 --app nome-do-seu-app-12345
```

O comando `--tail` ou `-t`, abre uma sessão que mostra os últimos logs em tempo real.

```
heroku logs --tail --app nome-do-seu-app-12345
```

**Removendo um app**

```
heroku destroy --app meu-deploy-de-testes-29302 --confirm meu-deploy-de-testes-29302
```

**Abrindo o app direto pelo terminal**

```
heroku open --app nome-do-app
```

## Links

- [PM2](https://pm2.keymetrics.io/)
- [Heroku](https://www.heroku.com/)
- [mars/create-react-app](https://github.com/mars/create-react-app-buildpack#usage)
- [catálogo de buildpacks](https://elements.heroku.com/buildpacks).

- [O que é o DevOps?](https://azure.microsoft.com/pt-br/overview/what-is-devops/)
- [Qual a diferença entre escalonamento vertical e horizontal?](https://pt.stackoverflow.com/questions/160142/qual-a-diferen%C3%A7a-entre-escalonamento-vertical-e-horizontal)
- [Documentação oficial Heroku - Deploy com Nodejs](https://devcenter.heroku.com/articles/deploying-nodejs)
- [Vídeo: Deploy // Dicionário do Programador](https://www.youtube.com/watch?v=gJw7l2JKpuQ)
- [Vídeo: DevOps // Dicionário do Programador](https://www.youtube.com/watch?v=iwf6kcvxeD4&list=PLVc5bWuiFQ8GgKm5m0cZE6E02amJho94o&index=21)
- [Blog oficial Heroku - Deployando React com 0 configuração](https://blog.heroku.com/deploying-react-with-zero-configuration)
- [O que é container e suas vantagens](https://www.redhat.com/pt-br/topics/containers/whats-a-linux-container)
- [O que é computação em nuvem? Exemplo Azure](https://azure.microsoft.com/pt-br/overview/what-is-cloud-computing/#uses)
- [Site oficial Heroku - Buildpacks](https://www.heroku.com/elements/buildpacks)
- [Documentação oficial Heroku - Add-ons](https://devcenter.heroku.com/categories/add-ons)
- [Documentação oficial Heroku - Scaling](https://devcenter.heroku.com/articles/scaling)
- [Documentação oficial Heroku - Tipos de Dyno](https://devcenter.heroku.com/articles/dyno-types)
- [Documentação oficial Heroku - Buildpacks](https://devcenter.heroku.com/articles/buildpacks)
