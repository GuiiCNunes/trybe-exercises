const numbers = [18, 19, 23, 53, 4, 5, 76, 23, 54];

let evenSum = numbers.filter((number) => number % 2 === 0).reduce((arr, curt) => arr + curt);
console.log(evenSum);