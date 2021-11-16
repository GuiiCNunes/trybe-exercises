# Bloco 28 - Deployment

## Deploy - Gerenciadores de Processos

Os *Process Managers* (PMs) foram criados para facilitar e tornar mais eficaz o gerenciamento de processos. Além disso, os PMs permitem aproveitar melhor os recursos do servidor, nos ajudando a garantir a disponibilidade de nossas aplicações.

**Vantagens:**
* Reload automático
* Abstração da complexidade de gerenciadores nativos
* Gerenciamento de sessões;
* Facilidade de gerenciamento de múltiplos núcleos de processamento;
* Responsabilidade do uso de cores delegados ao PM;
* Gerenciamento de múltiplas aplicações no servidor;
* Escalonamento dos processos;
* Balanceamento de carga;
* Monitoramento;
* Gerenciamento de logs.

**Mais populares**:

* [PM2](https://www.npmjs.com/package/pm2);
* [StrongLoop's PM](https://strong-pm.io/) ;
* [Forever](https://github.com/foreversd/forever) ;
* SystemD do Linux.

## PM2

Popular na comunidade Node.JS. Feito com o intuito de auxiliar o gerenciamento de aplicações em ambiente de produção.

### Instalação

```
$ npm install pm2@latest -g
```

Validando instalação:

```
$ pm2 --version
```

Para atualização:

```
$ pm2 update
```

### Comandos Básicos

**Start**

```
$ pm2 start index.js

// Similar ao node index.js
```

Para nomear o processo em que será rodado (caso não seja, pega o nome do arquivo):

```
$ pm2 start index.js --name <NOME_DO_PROCESSO>
```
> Além do nome, todo processo contém seu id. Ambos podem ser utilizados para referenciá-lo.

**Stop**

Parar um processo:

```
$ pm2 stop <NOME_DO_PROCESSO>
```

Paranfdo todos os processos:

```
$ pm2 stop all
```

**Delete**

Excluir o processo da aplicação:
```
$ pm2 delete <NOME_DO_PROCESSO>
```

**Restart**

Reiniciar o processo:
```
$ pm2 restart <NOME_DO_PROCESSO>
```
> Lembre-se de que, se houve alterações no arquivo, elas serão carregadas. O comando restart mata os processos e depois os reinicia. Isso significa que pode haver um curto "downtime", ou seja, um curto espaço de tempo em que seu serviço não vai responder.

**Reload**

Oposto ao `Restart`, o comando `reload` é *0-second-downtime*:
```
$ pm2 reload <NOME_DO_PROCESSO>
```

### Monitorando Processos

**List**

Lista todos os processos gerenciados pelo PM2:
```
$ pm2 list
// Ou
$ pm2 ls
// Ou
$ pm2 l
```

Lista de processos ordenada:
```
$ pm2 list --sort name:desc
```
> Caso você queira exibir a lista de processos ordenada, basta passar a flag sort . Essa flag permite a ordenação por todas as colunas exibidas: name , id , pid , memory , cpu , status e uptime . Junto a isso, é possível passar um segundo parâmetro informando se a ordenação deverá ser ascendente ou descendente: asc ou desc , respectivamente.

**Show**

Para exibir mais detalhes sobre um processo específico:
```
$ pm2 show <NOME_DO_PROCESSO>
```
> Através dele, é possível ver informações como a localização dos arquivos de logs, o caminho para o arquivo do processo, se aquele processo foi reiniciado etc. Além disso, é possível ver dados de métricas como latência do Event Loop e quantidade de requests ativas.

**Logs**

Exibe o histórico dos apps em tempo real. Podendo especificar o processo ou mostrar todos, tudo depende de passar ou não o nome do processo:
```
$ pm2 logs <NOME_DO_PROCESSO>
```

**Monit**

Visualizar um *dashboard* em tempo real, direto do terminal:
```
$ pm2 monit
```

### Interface Web

> Outra maneira bem legal de monitorar seus apps é utilizando o dashboard do PM2. Ele funciona em um modelo freemium e, com uma conta free, já conseguimos utilizar alguns recursos.
> O Dashboard vai mostrar os processos em execução pelo PM2 em sua máquina. Dito isso, para visualizar as métricas, lembre-se de deixar algum processo rodando.

[Site Oficial](https://id.keymetrics.io/api/oauth/register)

Após criar a conta basta rodar:
```
$ pm2 plus
```

Comando redireciona para o navegador para prosseguir com o Login.

### Modo Cluster

Permite escalar a aplicação entre as CPUs disponíveis na máquina, sem necessidade de modificação do código. Acontecendo o balancemanto de carga (*load balancing*).
Nesse modo é gerado uma aplicação para cada CPU solicitada, não sendo um processo rodando em mais de uma CPU. Tendo uma relação de 1 para um CPU <-> Processo.
Para isso, basta rodar o `start`(ou `reload`/`restart`) com a flag necessária(`instances` ou `i`):
```
$ pm2 start index.js --instances 2 --name <NOME_DO_PROCESSO>
```
> Nesse exemplo, serão iniciados dois processos.

> Outra opção é utilizar, no lugar do número de instâncias, a tag max ou 0 . Desse modo, o PM2 vai criar uma instância para cada CPU disponível na máquina.
```
$ pm2 start index.js -i max --name <NOME_DO_PROCESSO>
```

### Scaling

Outra forma de aumentar o número de processos. Podendo ser utilizado de duas maneiras:

1. Informando o total de processos que você quer:
```
$ pm2 scale <NOME_DO_PROCESSO> 3
```
>     Nesse caso, o número de processos será definido como três. Isso significa que, caso existam menos que três, novos processos serão criados. Se houver mais, serão excluídos processos para totalizar o "três" passado como parâmetro.

2. Informando o número de novos processos que você deseja adicionar. Para isso, basta utilizar a flag + junto ao número:
```
$ pm2 scale <NOME_DO_PROCESSO> +3
```
>     Aqui, serão adicionados três novos processos além dos que já estão em execução.

### Stateless

Aplicação que não possui estado, ou seja, nenhuma informação do usuário é salva em uma sessão, para que ele possa usar em uma próxima. Toda informação é trabalhada no tempo de execução daquele processo. Permite:

* Escalar horizontalmente suas aplicações de maneira simples em múltiplos servidores;
* Cachear de forma mais fácil e, consequentemente, tornar suas aplicações mais rápidas;
* Menos complexidade de storages , já que esse processo é feito de maneira unificada e por uma solução especializada.

### Ecosystem file

> É possível passar um arquivo de configuração para o PM2 executar suas aplicações. Esse arquivo é chamado de ecosystem . Nele você configura comportamentos, opções, variáveis de ambiente e arquivos de logs de cada aplicação.

É, com o *Ecosystem File*, possível definir individualmente a configuração de cada aplicação ou serviço. Para colocar no ar, basta executar o arquivo, e todas as configurações são aplicadas.

Formatos do arquivo de configuração: *Javascript* , *JSON* ou *YAML*.

> Para executá-lo, basta utilizar um dos comandos do PM2, como start , restart , stop , delete ou reload , e passar o arquivo como parâmetro.
```
\$ pm2 [start|restart|stop|delete] ecosystem.config.js
```

**Exemplos:**

```
// JS
module.exports = {
  apps: [
    {
      name: 'app',
      script: './index.js'
    },
    //...
  ]
};
```
> No exemplo acima, especificamos na propriedade apps os processos que teremos. Perceba que a propriedade recebe um array de objetos, o que significa que ela está preparada para receber a configuração de N aplicações.

As propriedades utilizadas (`name` e `script`) servem para atribuir um nome ao processo e indicar qual arquivo utilizar.

```
// YAML
apps:

- name: app
  script: ./index.js
```

**Multiaplicativos:**

```
apps:

- name: app-1
  script: .app-1/index.js
- name: app-2
  script: .app-2/index.js
- name: app-3
  script: .app-3/index.js
```

Inicia três processos ao *startar*. Para executar um processo específico, basta utilziar a *flag* `--only`:


```
$ pm2 start ecosystem.config.yml --only app-1
```

Para executar algumas:

```
$ pm2 start ecosystem.config.yml --only "app-1,app-2"
```

**Instâncias**

É possível configurar o número de instâncias que aquela aplicação deve ter, utilizando a funcionalidade do **modo cluster**.
```
apps:

- name: app
  script: ./index.js
  exec_mode: cluster
  instances: 4
```

> Perceba o campo exec_mode . Através dele, habilitamos o modo cluster para esse app . A propriedade instances indica o número de processos que será utilizado pela aplicação.
> Importante: Ao alterar o arquivo ecosystem , é necessário deletar e iniciar novamente seu projeto do PM2 para que as alterações sejam aplicadas.

**Variáveis de Ambiente**

Basta definir uma propriedade `env_ + nome do ambiente`:
```
apps:

- name: app
  script: ./index.js
  exec_mode: cluster
  instances: 4
  env_prod:
    ENVIRONMENT: PRODUCTION
  env_homolog:
    ENVIRONMENT: HOMOLOG
```

Para selecionar quais cariáveis serão passar ao processo:
```
$ pm2 start ecosystem.config.yml --env homolog
```
> O valor é sempre o nome definido na propriedade do arquivo, sem o prefixo "env_" . Ou seja, imagine que queremos criar um ambiente de teste. Para isso, vamos criar a propriedade env_staging . Em seguida, para podermos utilizar as variáveis do ambiente de teste, vamos executar a aplicação da seguinte forma:
```
$ pm2 start ecosystem.config.yml --env staging
```

### Auto restart

O *PM2* reinicia automaticamente processos que tenham falhado, sendo possível definir outras configurações para essas reinicializações.

**Memória Máxima**

Casos em que, por algum motivo, um processo passa a utilizar muito mais memória que o habitual.

```
$ pm2 start index.js --name <NOME_DO_PROCESSO> --max-memory-restart 20M
```

```
apps:

- name: app
  script: ./index.js
  max_memory_restart: 20M
```

> Note que o valor recebe a unidade de medida, que pode ser **K** ilobyte, **M** egabyte ou **G** igabyte.

**Delay de restart**

Recebe um valor fixo, em milisegundos, para o processo aguardar antes de reinciiar.

```
$ pm2 start index.js --name <NOME_DO_PROCESSO> --restart-delay 100
```

```
apps:

- name: app
  script: ./index.js
  restart_delay: 100
```

**Estratégias de Backoff**

> Com as estratégias de Backoff , é possível configurar sua aplicação para reiniciar de maneira mais inteligente, em vez de somente ficar reiniciando sempre que houver uma exceção.

> Configurando uma estratégia de exponential backoff , é possível ir incrementando um tempo de intervalo entre as tentativas, reduzindo, por exemplo, a carga de conexões em bancos de dados ou outro serviço externo.
```
$ pm2 start index.js --name <NOME_DO_PROCESSO> --exp-backoff-restart-delay 100
```

```
apps:

- name: app
  script: ./index.js
  exp_backoff_restart_delay: 100
```

> Nesse exemplo, ao ocorrer um erro, o processo vai aguardar 100ms. Durante esse período, o app ficará com status de waiting restart . Caso ocorra um novo erro, ele aguardará mais 150ms e, se o erro se repetir, ele aguarda mais 225ms, e assim por diante:

* Vai reiniciar em 100ms;
* Vai reiniciar em 150ms;
* Vai reiniciar em 225ms.

> Dessa maneira, o delay entre os restarts vai crescendo em um movimento exponencial, chegando no máximo 15000ms .

### Assistindo a Alterações

O *PM2* tambem pode observar os arquivos, e, em caso de alterações nos arquivos, reiniciar o processo. Similar ao *Nodemon*.

```
$ pm2 start index.js --name <NOME_DO_PROCESSO> --watch
```

```
apps:

- name: app
  script: ./index.js
  watch: ./
```

## PM2 com outras linguagens

> Assim como o Heroku, o PM2 consegue inferir a linguagem e, consequentemente, saber como executá-la. Ao inferir que uma aplicação é em Node.js, por exemplo, ele sabe que deverá executar o arquivo com o comando node .

> Essa relação é feita a partir de uma lista de "interpretadores". Nessa lista, estão presentes a extensão e o respectivo interpretador da linguagem que está sendo utilizada em um projeto. A lista default é:

```
{
".sh": "bash",
".py": "python",
".rb": "ruby",
".coffee" : "coffee",
".php": "php",
".pl" : "perl",
".js" : "node"
}
```

> Caso seja necessário executar uma aplicação em um formato diferente dos conhecidos pelo PM2, é possível utilizar a flag --interpreter e passar o interpretador desejado:

```
$ pm2 start hello-world.py --interpreter=python
```

## PM2 com Heroku

> O PM2 possui, além do CLI, um módulo para ser utilizado como dependência do seu projeto. Esse módulo é utilizado para usar as vantagens do PM2 dentro de um container.

Primeiro passo é instalar o módulo na raiz do projeto:

```
$ npm install pm2
```

No `package.json` do Heroku, é necessário configurar o *script* de *start*:

```
// ...
"scripts": {
  "start": "pm2-runtime start ecosystem.config.yml"
}
// ...
```
> Perceba que aqui estamos utilizando o módulo pm2-runtime , e não o CLI.

Crie um arquivo `ecosystem.config.yml` na raiz do projeto:
```
apps:

- name: app
  script: ./index.js
```

Dê o *deploy* no Heroku!

### Para aprofundar mais!

**Modo Cluster + Heroku**

> Uma feature bem legal de se explorar é o cluster mode . Como os Dynos são provisionados com multicores, conseguimos melhorar a resiliência e a performance de nossos apps .

```
apps:

- name: app
  script: ./index.js
  exec_mode: cluster
  instances: max
```

**Modo Cluster + Heroku + Dashboard**

> Outra funcionalidade bem bacana é integrar o dashboard do PM2 ao Heroku para, além de ter um bom ambiente, sermos capazes de controlá-lo e monitorá-lo!

> Assim como os passos anteriores, seguindo a proposta do PM2, o dashboard é bem simples de configurar. Basta adicionar as chaves (credenciais) à nossa aplicação que subirá no Heroku .

> As credenciais ficam disponíveis no dashboard do PM2.

Depois é só colocar como variáveis de ambiente do Heroku:

```
$ heroku config:set \
 PM2_PUBLIC_KEY=CHAVE_PUBLICA \
 PM2_SECRET_KEY=CHAVE_PRIVADA \
 PM2_MACHINE_NAME=NOME_DO_SERVER \
 --app NOME_DO_APP_NO_HEROKU
```
**Substituindo os valores pelos certos**.
> Temos três variáveis no comando acima: uma chave pública ( PM2_PUBLIC_KEY ), uma privada ( PM2_SECRET_KEY ) e um nome para identificar a máquina ( PM2_MACHINE_NAME ) que você está utilizando.

## Links

- [Node.js Cluster Module](https://nodejs.org/api/cluster.html#cluster_cluster)

- [Nodemon - O PM para fase de desenvolvimento](https://www.npmjs.com/package/nodemon)
- [Documentação Oficial PM2 - Métricas Customizadas](https://pm2.io/docs/plus/guide/custom-metrics/)
- [Blog Oficial PM2 - Modo Cluster com Node, como funciona.](https://blog.pm2.io/2018-04-20/Node-js-clustering-made-easy-with-PM2/)
- [Documentação Oficial Node.js - Como funciona o modo cluster](https://devcenter.heroku.com/articles/deploying-nodejs)
- [PM por debaixo dos panos - Utilizando o systemd](https://rollout.io/blog/running-node-js-linux-systemd/)
- [Learn yaml in Y minutes](https://learnxinyminutes.com/docs/yaml/)