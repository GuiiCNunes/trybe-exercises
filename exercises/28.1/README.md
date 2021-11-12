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

### Buildpack

> Em alguns casos, precisamos rodar algum script ou realizar alguma configuração para publicar nosso app. Por exemplo, para publicar uma aplicação React precisamos "servi-la" com um server-side app (back-end), como, por exemplo, um server com express .

*Buildpacks* são ferramentas que automatizma esse processo de 'servir', e outros. Podendo ser oficiais ou criados pela comunidade.

Um exemplo de *Buildpack* para utilizar com React: [mars/create-react-app](https://github.com/mars/create-react-app-buildpack#usage). Ele utiliza o [Nginx](https://nginx.org/en/), que promoce uma otimização de performance e segurança.
Tambem é possível conferir um [catálogo de buildpacks](https://elements.heroku.com/buildpacks).

## Links

- [PM2](https://pm2.keymetrics.io/)
- [Heroku](https://www.heroku.com/)
- [mars/create-react-app](https://github.com/mars/create-react-app-buildpack#usage)
- [catálogo de buildpacks](https://elements.heroku.com/buildpacks).
- 
