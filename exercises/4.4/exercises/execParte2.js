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

console.log();

// Fonte: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/find
// NÃO FUNCIONA AINDA
function isMostRepeat(array) {
  let numbers = {};
  for(let number of array) {
    let numberCache = array.find(element => element === number);
    if (numberCache === undefined) {
      array[number] = 1;
    } else {
      array[number] += 1;
    }
  }

  let mostRepeat = 0;
  for (let key in numbers) {
    mostRepeat= numbers[key] > numbers[mostRepeat] ? key : mostRepeat;
  }
  return mostRepeat;
}

console.log(isMostRepeat([2, 3, 2, 5, 8, 2, 3]));