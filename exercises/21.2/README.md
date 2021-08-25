# Bloco 21 - Funções SQL, Joins e Subqueries

## Descomplicando JOINs, UNIONs e Subqueries

### INNER JOIN

Possibilita a ultilização de multiplas tabelas na *query*, colocando o que é comum entre as elas.

![INNER JOIN](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk2_CRBec-Y2l-ib4TykSOyZRkdmbdkn1E1I4-IQQnb1AFEue3rUNtlTCncTbPnpRPzQM&usqp=CAU)

```
SELECT t1.coluna, t2.coluna
FROM tabela1 AS t1
INNER JOIN tabela2 AS t2
ON t1.coluna_em_comum = t2.coluna_em_comum;
```

**OBS.:** Para não precisar dos *alias*(`AS`) basta utilizar o nome completo(`banco.tabela.coluna`) das colunas ao chamar.

**OBS.:** Podemos omitir o `AS`, passando diretamente após o nome da tabela o *alias* que desejamos. Exemplo:

```
SELECT a.first_name, a.actor_id, f.actor_id
FROM sakila.actor a
INNER JOIN film_actor f
ON a.actor_id = f.actor_id;
```

**OBS.:** Não precisa sempre especificar de qual tabela está vindo, MySQL é esperto o suficiente para identificar isso. **Só é obrigatório nos campos ambiguos(que aparecem em mais de uma tabela)**. Mas é uma boa prática.

## Links