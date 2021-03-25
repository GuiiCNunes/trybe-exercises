let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let sumAll = 0;

for ( let number of numbers) {
  sumAll += number;
}

let average = sumAll/numbers.length;

if (average > 20) {
  console.log('valor maior que 20');
} else {
  console.log('valor menor que 20');
}