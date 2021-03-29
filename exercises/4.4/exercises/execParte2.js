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