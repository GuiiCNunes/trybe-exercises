let salarioBruto = 3000;
let salarioLiquido;
let INSS;
let IR;

if (salarioBruto <= 1556.94) {
  INSS = salarioBruto * 0.08; 
} else if (salarioBruto > 1556.94 && salarioBruto <= 2594.92) {
  INSS = salarioBruto * 0.09; 
} else if (salarioBruto > 2594.92 && salarioBruto <= 5189.82) {
  INSS = salarioBruto * 0.11; 
} else {
  INSS = 570.88;
}

salarioLiquido = salarioBruto - INSS;

if (salarioLiquido <= 1903.98) {
  IR = salarioBruto * 0;
} else if (salarioLiquido > 1903.98 && salarioLiquido <= 2826.65) {
  IR = salarioLiquido * 0.075 - 142.80;
} else if (salarioLiquido > 2826.65 && salarioLiquido <= 3751.05) {
  IR = salarioLiquido * 0.15 - 354.80;
} else if (salarioLiquido > 3751.05 && salarioLiquido <= 4664.68) {
  IR = salarioLiquido * 0.225 - 636.13;
} else {
  IR = salarioLiquido * 0.275 - 869.36;
}

salarioLiquido -= IR;

console.log(salarioLiquido);