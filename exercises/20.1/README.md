# Bloco 20 - Introdução à SQL

## Banco de dados SQL

### Constraints (restrições), chaves primárias e chaves estrangeiras

*Contrains* são as restrições que cada coluna da tabela possui. Restringindo para que o conteúdo de cada célula esteja dentro de uma regra. Alguns são:

- `NOT NULL` - Garante que aquele campo não pode conter valores nulos , ou seja, se não houver um valor padrão ( `DEFAULT` ) definido, será sempre necessário passar um valor para esse campo durante um `INSERT` , por exemplo.
- `UNIQUE` - Garante que o valor inserido na coluna da tabela é único , isto é, não pode haver outro valor igual para esta coluna registrado nesta tabela.
- `PRIMARY KEY` - A chave primária de uma tabela garante que a coluna em que essa constraint está sendo aplicada é o identificador único da tabela . Ela também é, por definição, não nula (mesmo efeito da constraint `NOT NULL` ) e única (mesmo efeito da constraint `UNIQUE` ).
- `FOREIGN KEY` - A chave estrangeira de uma tabela faz referência a uma chave primária (valor em uma coluna com a constraint `PRIMARY KEY` ) de outra tabela , permitindo um relacionamento entre as duas.
- `DEFAULT` - Garante que, caso nenhum valor seja inserido na coluna (ou caso a pessoa usuária insira um valor nulo), a constraint colocará o valor padrão que for passado para ela.
(Fonte: [Trybe](betrybe.com))

### Instalação

```
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

O ultimo é para instalar a ferramenta de segurança. Para acessar o Mysql:

```
sudo mysql -u root -p
```

Por se tratar do usuário *root*, o comando exige o `sudo`. Com outros usuários não é mais necessário. O `-u` se refere ao usuário *root*, no caso. E o `-p` avisa que será colocada uma senha após o comando.

Para mostrar se o serviço está em execução:

```
# Linux
sudo systemctl status mysql
# macOS
brew services list
```

Para iniciar o serviço:

```
# Linux
systemctl start mysql
# macOS
brew services run mysql
```

Para parar o serviço:

```
# Linux
systemctl stop mysql
# macOS
brew services stop mysql
```

Para remover a inicialização padrão junto com o sistema:

```
# Linux
sudo systemctl disable mysql

# macOS
brew services stop mysql
# Esse comando remove os serviços não utilizados
brew services cleanup
```

Para desfazer:

```
# Linux
sudo systemctl enable mysql

# macOS
brew services start mysql
```

#### Procedimentos internos MySQL

- Mostrar *databases*: `SHOW DATABASES;`
- Criar usuário: `CREATE USER 'nome_do_usuario'@'localhost' IDENTIFIED BY 'senha_do_usuario';`. **OBS.:**O *localhost* representa o local na rede que o usuário poderá utilizar.
- Dar privilégios ao usuário: `GRANT ALL PRIVILEGES ON 'nome_do_banco_ou_*'@* TO 'nome_usuario'@'localhost';`. **OBS.:** Se for de todos os bancos, pode utilizar um * ao invés do nome do banco específico, o mesmo serve para o local que o banco está.
- Reiniciar os privilégios: `FLUSH PRIVILEGES;`
- Alterar a senha:

```
 ALTER USER 'usuario_aqui'@'localhost' IDENTIFIED WITH mysql_native_password BY 'sua_senha_aqui'; flush privileges;
 -- EX: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234'; flush privileges;
```

### Desinstalação

1. Remover pacotes instalados

```
sudo apt-get remove mysql-server mysql-client mysql-common
```

2. Remover arquivos de dependência e pacotes não necessários:

```
sudo apt-get autoremove
sudo apt-get autoclean
```

3. Remover arquivos MySQL que possam ter sobrado:

```
sudo rm -rf /var/lib/mysql
sudo rm -rf /etc/mysql
```

4. Testar, não deve aparecer nada:

```
mysql --version
```

#### MacOS

```
brew uninstall mysql
# ou
brew remove mysql
```

## Links