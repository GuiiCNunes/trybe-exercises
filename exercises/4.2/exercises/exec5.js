let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let bigger = -999999999999999;

for (let number of numbers) {
  if ( bigger < number) {
    bigger = number;
  }
}

console.log(bigger);