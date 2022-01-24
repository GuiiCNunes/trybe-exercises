import sys

result = 0
numbers = input("Digite os Números para Soma, separador por espaço(' '):").split(" ")

for number in numbers:
  if number.isdigit():
    result += int(number)
  else:
    print(f"Erro ao somar valores, {number} é um valor inválido", file=sys.stderr)

print(result)