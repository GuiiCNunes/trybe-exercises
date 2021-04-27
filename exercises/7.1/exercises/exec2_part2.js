const longestWord = (string) => {
  let words = string.split(" ");
  let biggest = words[0];
  for (let word of words) {
    biggest = biggest.length > word.length ? biggest : word;
  }
  return biggest;
}

console.log(longestWord("Antônio foi no banheiro e não sabemos o que aconteceu"));