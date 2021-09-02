-- Escreva uma query SQL para alterar na tabela localtions o nome da coluna street_address para address , mantendo o mesmo tipo e tamanho de dados.
SHOW COLUMNS FROM hr.locations;
ALTER TABLE hr.locations CHANGE street_address address VARCHAR(40);

-- Escreva uma query SQL para alterar o nome da coluna region_name para region , mantendo o mesmo tipo e tamanho de dados.
SHOW COLUMNS FROM hr.regions;
ALTER TABLE hr.regions CHANGE region_name region VARCHAR(25) UNIQUE;

-- Escreva uma query SQL para alterar o nome da coluna country_name para country , mantendo o mesmo tipo e tamanho de dados.
SHOW COLUMNS FROM hr.countries;
ALTER TABLE hr.countries CHANGE country_name country VARCHAR(40);