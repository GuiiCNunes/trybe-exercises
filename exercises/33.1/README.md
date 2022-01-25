# Bloco 33 - Programação Orientada a Objetos e Padrões de Projeto

## Introdução à programação orientada a objetos

- Criando uma entidade User

```python
class User:
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password
```

- Instanciar

```python
meu_user = User("Valentino Trocatapa", "valentino@tinytoons.com", "Grana")
print(meu_user)
print(meu_user.name)
print(meu_user.email)
print(meu_user.password)
```

- Construtor:

```python
class User:
    def __init__(self, name, email, password):
        """ Método construtor da classe User. Note que
        o primeiro parâmetro deve ser o `self`. Isso é
        uma particularidade de Python, vamos falar mais
        disso adiante!"""
        self.name = name
        self.email = email
        self.password = password

# Para invocar o método construtor, a sintaxe é NomeDaClasse(parametro 1, parametro 2)
# Repare que o parâmetro self foi pulado -- um detalhe do Python.
meu_user = User("Valentino Trocatapa", "valentino@tinytoons.com", "Grana")

# A variável `meu_user` contém o objeto criado pelo construtor da classe User!
```

- Métodos

```python
class User:
    def __init__(self, name, email, password):
        """ Método construtor da classe User. Note que
        o primeiro parâmetro deve ser o `self`. Isso é
        uma particularidade de Python, vamos falar mais
        disso adiante!"""
        self.name = name
        self.email = email
        self.password = password

    def reset_password(self):
        print("Envia email de reset de senha")


meu_user = User("Valentino Trocatapa", "valentino@tinytoons.com", "Grana")
meu_user.reset_password()
```

### Mailer

```python
import smtplib
import ssl


class User:
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

    def reset_password(self):
        meu_mailer = Mailer("password_reset@teste.com", "myverysafepassword", self.email)
        meu_mailer.send_email("Reset your password", "Instruções para resetar a senha, com o link de resetar")


class Mailer:
    def __init__(self, from_email, from_password, to_email):
        self.from_email = from_email
        self.from_password = from_password
        self.to_email = to_email

    def send_email(self, subject, message):
        body = f"Subject:{subject}\n\n{message}".encode('utf-8')
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(
            "smtp.gmail.com", 465, context=context
        ) as server:
            server.login(self.from_email, self.from_password)
            try:
                server.sendmail(self.from_email, self.to_email, body)
            except (smtplib.SMTPRecipientsRefused, smtplib.SMTPSenderRefused):
                raise ValueError


meu_user = User("Valentino Trocatapa", "valentino@tinytoons.com", "Grana")
meu_user.reset_password()
```

## Links

- [Alan Kay On Messaging](http://wiki.c2.com/?AlanKayOnMessaging)
- [Código Fonte TV - Programming Paradigms](https://www.youtube.com/watch?v=EefVmQ2wPlM)
- [Learn Haskell in Y minutes](https://learnxinyminutes.com/docs/haskell/)
- [Learn Prolog in Y minutes](https://learnxinyminutes.com/docs/prolog/)
- [Conceitos - Classes Abstratas](https://www.devmedia.com.br/conceitos-classes-abstratas-programacao-orientada-a-objetos/18812)
- [ABC - Abstract Base Classes](https://docs.python.org/3/library/abc.html)
- [Pisani - Orientação a objetos - os 4 grandes pilares do paradigma](https://www.youtube.com/watch?v=1fXfDKtSip4)
- [Python - Classes with encapsulated state](https://github.com/fluentpython/pyob2019/blob/master/03-classes.ipynb)
- [OOP: You’re Doing It Completely Wrong](https://vimeo.com/91672848?__s=xuey6qecxo2cunfuas8e)
- [O que é UML e Diagramas de Caso de Uso: Introdução Prática à UML](https://www.devmedia.com.br/o-que-e-uml-e-diagramas-de-caso-de-uso-introducao-pratica-a-uml/23408)
- [UML - Examples by Types of Diagrams](https://www.uml-diagrams.org/index-examples.html)