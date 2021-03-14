# Unix, Bash e Shell Script

## Unix & Bash - Parte 1

Apresentação do sistema Unix, Kernel e Shell.
Comandos úteis do bash.

### ls -a

Listar todos os diretórios, inclusive ocultos.

> ls -a

### cp

Copiar arquivos.

> cp *ARQUIVO* *DIRETÓRIO_DESTINO*

### cat

O *cat* pode visualizar e inserir conteúdo em arquivos.
Para visualizar:

> cat *ARQUIVO*

Inserir(Sobrescrevendo o conteúdo ou acrescentando, respectivamente):

> cat > *ARQUIVO* 

> cat >> *ARQUIVO*

Para sair do editor de texto: **CTRL + D**

### mv

Move o arquivo entre diretórios, podendo ser utilizado para renomear (só colocar o nome novo após o caminho para o próprio diretório).

> mv *ARQUIVO* *DIRETÓRIO*

### rm

Remove o arquivo.

> rm *ARQUIVO*

Pode ser utilizado para excluir diretórios com conteúdo com:

> rm -rf *DIRETÓRIO*

### rmdir

Remover diretório vazio.

> rmdir *DIRETÓRIO*

### less

Mostra um arquivo paginado.

> less *ARQUIVO*

Utilizar **ESPAÇO** para avançar páginas e **Q** para sair. Pode realizar buscar dentro do arquivo utilizando **/*palavraDesejada***, nesse caso utilize **N** para avançar nos resultados.

### head

Mostra as 10 primeiras linhas do arquivo (pode mudar o número ao acrescentar **-*N***, sendo *N* a quantidade que deseja exibir)

> head *ARQUIVO* **ou** head -5 *ARQUIVO*

### tail

Mostra as 10 ultimas linhas do arquivo (pode mudar o número ao acrescentar **-*N***, sendo *N* a quantidade que deseja exibir)

> tail *ARQUIVO* **ou** tail -5 *ARQUIVO*

### grep

Buscar palavras dentro de um arquivo.

> grep *PALAVRA* *ARQUIVO*

Outras expressões:
    **-i** remove o *case-sensitive*
    **-v** todos os valores que não possuem a palavra buscada
    **-n** mostra a linha
    **-c** mostra a quantidade

### wc

Quantidade de linhas, palavras e caracteres de um arquivo.

> wc *ARQUIVO*

Outras expressões:
    **-l** só a quantidade de linhas
    **-w** só a quantidade de palavras
    **-c** só a quantidade de caracteres

### man

Exibe o manual do comando.

> man *COMANDO*

### whatis

Exibe o que o comando faz.

> whatis *COMANDO*

### apropos

Ajuda a encontrar um comando com a funcionalidade desejada.

> apropos *FUNCIONALIDADE_DESEJADA*

### Outros

#### |

Utilizado para pegar o retorno de um comando e atribuir a outro

> *COMANDO1* | *COMANDO2*

#### ?

*Wildcard* utilizado para substituir um caracter.

#### *

*Wildcard* utilizado para substituir um conjunto de caracteres.

**TOMAR CUIDADO COM EXPRESSÕES REGULARES (REGEX) AO UTILIZAR**
