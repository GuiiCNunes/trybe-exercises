let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let smaller = 999999999999999;

for (let number of numbers) {
  if ( smaller > number) {
    smaller = number;
  }
}

console.log(smaller);