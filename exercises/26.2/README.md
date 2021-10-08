# Bloco 26 - NodeJS: Camada de Serviço e Arquitetura Rest e Restful

## Arquitetura de Software - Camada de Controller e Service

* **Controller** - receber e tratar os dados da requisição.
* **Service** - aplicar as regras de negócio da aplicação antes de qualquer comunicação com o banco.

### Controllers

O principal componente dessa camada são os *middlewares*. Aqui acontece um filtro das informações que chegam com a requisição, antes de serem encaminhadas o *service*.

Para a validação dos dados, podemos utilziar a lib `Joi`:

```
npm i joi
```

### Service

- Deve centralizar acesso a dados e funções externas. Exemplo: chamar um evento que dispara uma mensagem no Slack;
- Deve abstrair lógica de negócio complexa do seu modelo;
- Não deve ter nenhum tipo de informação sobre o acesso a camada de dados. Exemplo: não ter nenhuma query SQL;
- Não deve receber nada relacionado ao HTTP, seja o request ou o response . O controller deve mandar apenas o necessário para o service .

O service **identifica e gera erros**, o gerar é relacionado aos erros que atinjam as regras de negócio.

## Links