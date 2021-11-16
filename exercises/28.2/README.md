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

## Links

- [Node.js Cluster Module](https://nodejs.org/api/cluster.html#cluster_cluster)