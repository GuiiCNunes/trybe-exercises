# Orientação

As informações acima são sobre a Escola Jean Grey de Ensino Superior. Para todas as alterações realizadas, você deve sempre atualizar ou adicionar o campo **lastUpdate** , que armazena a data da última alteração com o tipo **timestamp** . Os exercícios devem ser realizados na ordem.

```
db.xmen.updateMany(
  {},
  {
    $currentDate: { lastUpdated: { $type: "timestamp" } },
  },
);
```

# Exercícios

14. Remova o campo class dos documentos que possuem esse campo com o valor unknown .
```
db.xmen.updateMany(
  { class: "unknown" },
  {
    $unset: { class: "" },
    $currentDate: { lastUpdated: { $type: "timestamp" } },
  },
);
```

15. Produza uma query que renomeie os campos de name para hero_name , e de true_name para full_name ; adicione o campo power com valor 100, em todos os documentos.
```
db.xmen.updateMany(
  {},
  {
    $set: { power: 100 },
    $rename: { name: "hero_name", true_name: "full_name" },
    $currentDate: { lastUpdated: { $type: "timestamp" } },
  },
);
```

16. Produza uma query onde os mutantes class omega ou gama passam a ter seu poder de 500 somente se seu poder for menor que 500 .
```
db.xmen.updateMany(
  { class: { $in: ["omega", "gama"] } },
  {
    $max: { power: 500 },
    $currentDate: { lastUpdated: { $type: "timestamp" } },
  },
);
```

17. Produza uma query onde os mutantes class gama passam a ter seu poder de 300 somente se seu poder for maior que 300 .
```
db.xmen.updateMany(
  { class: "gama" },
  {
    $min: { power: 300 },
    $currentDate: { lastUpdated: { $type: "timestamp" } },
  },
);
```

18. Decremente em 100 o poder dos mutantes que não possuem a propriedade class .
```
db.xmen.updateMany(
  { class: { $exists: false } },
  {
    $inc: { power: -100 },
    $currentDate: { lastUpdated: { $type: "timestamp" } },
  },
);
```

19. Em apenas uma query adicione o campo areas com o seguinte array como valor: ["Students Room"] a todos os mutantes que são Senior Staff que tenham poder acima de 100 e para todos os Junior Staff com poder acima de 200.
```
db.xmen.updateMany(
  { $or: [
    { occupation: "Senior Staff", power: { $gt: 100 } },
    { occupation: "Junior Staff", power: { $gt: 200 } }
  ] },
  {
    $set: { areas: ["Students Room"] },
    $currentDate: { lastUpdated: { $type: "timestamp" } },
  },
);
```

20. Em apenas uma query, adicione o campo areas com ["Outside"] a todos os Junior Staff que não tenham o campo areas definido.
```
db.xmen.updateMany(
  { occupation: "Junior Staff", areas: { $exists: false } },
  {
    $set: { areas: ["Outside"] },
    $currentDate: { lastUpdated: { $type: "timestamp" } },
  },
);
```
