# Unix, Bash e Shell Script

## Unix & Bash - Parte 2

Comandos úteis do bash.

### sort

Ordena os valores dentro de um arquivo.

> sort *ARQUIVO*

Para atribuir os valores ordenados a outro arquivo:

> sort *ARQUIVO_DESORDENADO* > *ARQUIVO_ORDENADO*

*Pode ser utilizado **>>** para não sobrescrever.*

### who

Mostra o usuário que esta utilizando o sistema.

> who

### chmod

Alterar as permissões de usuários em relação à arquivos e diretórios. O comando possui alternativas de sintaxes. Podendo ser:

> chmod **u+rwx** *ARQUIVO*

Lembre-se:
    **u** referente ao usuário
    **g** referente ao grupo
    **o** referente a outros
    **a** referente a *all* (usuário, Grupo e Outros)
    **+** acrescenta permissão
    **-** retira a permissão
    **=** faz as permissões ficarem exatamente iguais as solicitadas
    **r** referente a leitura
    **w** referente a escrita
    **x** referente a execução

Outra sintaxe:

> chmod 777 *ARQUIVO*

Onde o primeiro valor é igual ao usuário, o segundo igual ao grupo e o terceiro aos outros. Ficando:

    | Número | Permissões |
    |--------|------------|
    | **000** |	--------- |
    | **400** |	r-------- |
    | **444** | r--r--r-- |
    | **600** |	rw------- |
    | **620** |	-rw--w---- |
    | **640** |	-rw-r----- |
    | **644** |	rw-r--r-- |
    | **645** |	-rw-r--r-x |
    | **646** |	-rw-r--rw- |
    | **650** |	-rw-r-x--- |
    | **660** |	-rw-rw---- |
    | **661** |	-rw-rw---x |
    | **662** |	-rw-rw--w- |
    | **663** |	-rw-rw--wx |
    | **664** |	-rw-rw-r-- |
    | **666** |	rw-rw-r-- |
    | **700** |	rwx------ |
    | **750** |	rwxr-x--- |
    | **755** |	rwxr-xr-x |
    | **777** |	rwxrwxrwx |
    | **4711** | -rws--x--x |

### ps

Lista os processos que estão rodando através do terminal.

> ps

### jobs

Lista os *jobs* em execução, estes são conjuntos de processos.

> jobs

### bg

Coloca um processo suspenso no *background*.

> bg *ID_PROCESSO*

*Tambem funciona colocando o id do jobs, só colocar **%** antes*.

### fg

Coloca um processo suspenso em *foreground*.

> fg *ID_PROCESSO*

*Tambem funciona colocando o id do jobs, só colocar **%** antes*.

### kill

Mata o processo.

> kill *ID_PROCESSO*

*Tambem funciona colocando o id do jobs, só colocar **%** antes*.

Pode utilizar o **-g** para forçar a parada.

### find

Pesquisar por arquivos e diretórios.

> find *DIRETÓRIO* -name *PALAVRA_PESQUISADA* -type *TIPO_DESEJADO*

*No caso do **type**, pode ser **d** para diretório e **f** para arquivo.* 

Pode ser colocado **-iname** para deixar de ser *case-sensitive*. Tambem pode ser utilizado junto com *wildcards*.

### history

Mostra o histórico de comandos utilizados no terminal.

> history

Dica: utilizar em conjunto com **less**, **head** ou **tail**, utilizando o **|**.

> history | tail -5

### Outros

#### &

O operador & após o comando, faz sua execução ser em *background*.

> *COMANDO* &

#### CTRL + Z

Suspende o processo em execução.

#### CTRL + C

Mata o processo em execução.

#### whoami

Mostra o usuário.

> whoami

#### --help

Mostra o help do comando.

> *COMANDO* --help

#### !!

Utiliza o comando anterior para completar o atual, podendo ser antes ou depois, depende do objetivo.

> *COMANDO* !!

> !! *COMANDO*

### Sites úteis

[Comandos importantes que você deveria saber](https://www.howtogeek.com/412055/37-important-linux-commands-you-should-know/)

[Referência bem completa sobre shell, terminal e linux](http://linuxcommand.org/index.php)
