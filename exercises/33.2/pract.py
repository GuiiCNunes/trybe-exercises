from SalesReport import SalesReport

# Classe, crie (em outras palavras, instancie!) uma nova entidade 'Relatório de vendas' para eu usar!

meu_relatorio_de_vendas = SalesReport('meu_relatorio')

# Entidade 'meu_relatorio_de_vendas', que eu acabei de criar, imprima-se!

meu_relatorio_de_vendas.serialize()

#Pratica 1
meu_relatorio_de_vendas.serialize_csv()