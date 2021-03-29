let names = {
  person1: 'João',
  person2: 'Maria',
  person3: 'Jorge' 
};

for (let key in names) {
  console.log("Olá", names[key]);
}

let carro = {
  model: 'A3 Sedan',
  manufacturer: 'Audi',
  year: 2020
}

let stringCarro =''
for (let key in carro) {
  let string = key + " " + carro[key] + ", ";
  stringCarro += string;
}
console.log(stringCarro);