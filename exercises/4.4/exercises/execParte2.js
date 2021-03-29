function isPalindromo (word) {
  let wordClean = word.toLowerCase();
  for (let index = 0; index < word.length; index += 1) {
    if (word[index] !== word [word.length - index - 1]) {
      return false;
    }
  }
  return true;
}

console.log(isPalindromo('casa')); 

console.log();

function isTheIndexOfBiggets(array) {
  let biggest = array[0];
  for (let index in array) {
    biggest = array[index] > biggest ? array[index] : biggest;
  }
  return array.indexOf(biggest);
}

console.log(isTheIndexOfBiggets([2, 3, 6, 7, 10, 1]));

function isTheIndexOfSmallest(array) {
  let smallest = array[0];
  for (let index in array) {
    smallest = array[index] < smallest ? array[index] : smallest;
  }
  return array.indexOf(smallest);
}

console.log(isTheIndexOfSmallest([2, 4, 6, 7, 10, 0, -3]));

console.log();

function isTheIndexOfBiggets(array) {
  let biggest = array[0];
  for (let index in array) {
    biggest = array[index].length > biggest.length ? array[index] : biggest;
  }
  return biggest;
}

console.log(isTheIndexOfBiggets(['José', 'Lucas', 'Nádia', 'Fernanda', 'Cairo', 'Joana']));