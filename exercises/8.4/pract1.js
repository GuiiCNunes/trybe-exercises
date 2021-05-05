const numbers = [50, 85, -30, 3, 15];

// With For
let getBiggest = array => {
  let biggest = array[0];
  for (let index = 0; index < numbers.length; index +=1) {
    biggest = biggest > array[index] ? biggest : array[index];
  }
  return biggest;
}

console.log(getBiggest(numbers));

let biggest = numbers.reduce((result, number) => number > result ? number : result );
console.log(biggest);
biggest = numbers.reduce(((result, number) => number > result ? number : result ), 100);
console.log(biggest);