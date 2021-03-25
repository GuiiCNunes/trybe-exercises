
let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];

// Exec 1
for (let index = 1; index < numbers.length; index += 1) {
  for (let secondIndex = 0; secondIndex < index; secondIndex += 1) {
    if (numbers[index] < numbers[secondIndex]) {
      let position = numbers[index];
      numbers[index] = numbers[secondIndex];
      numbers[secondIndex] = position;
    }
  }
}

console.log(numbers);

// Exec 2
for (let index = 1; index < numbers.length; index += 1) {
  for (let secondIndex = 0; secondIndex < index; secondIndex += 1) {
    if (numbers[index] > numbers[secondIndex]) {
      let position = numbers[index];
      numbers[index] = numbers[secondIndex];
      numbers[secondIndex] = position;
    }
  }
}

console.log(numbers);

// Exec 3

numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];

for (let index = 0; index < numbers.length; index += 1) {
  for (let secondIndex = index + 1; secondIndex <= index + 1; secondIndex += 1) {
    if (secondIndex < numbers.length) {
      numbers[index] *= numbers[secondIndex];
    } else {
      numbers[index] *= 2;
    }
  }
}

console.log(numbers);