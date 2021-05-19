// const cryptography = { a: 1, e: 2, i: 3, o: 4, u: 5 };
const cryptoLetters = ['a', 'e', 'i', 'o', 'u'];
const cryptoNumbers = [1, 2, 3, 4, 5];

// function isProperty(wildcard) {
//   for (let key in cryptography) {
//     if (key === wildcard) return true;
//   }
//   return false;
// }

function isCrypto(wildChar) {
  return cryptoLetters.some((char) => char === wildChar) || cryptoNumbers.same((char) => char === wildChar);
}

// function finderCorresponding(wildChar) {
//   if (isProperty(wildChar)) {
//     return cryptography[wildChar];
//   }
//   for (let key in cryptography) {
//     if (cryptography[key] === wildChar) return key;
//   }
// }

function finderCorresponding(wildChar) {
  if (isCrypto(wildChar)) {
    const letterIndex = cryptoLetters.findIndex( (element) => element === wildChar );
    const numberIndex = cryptoNumbers.findIndex( (element) => element === wildChar );
    const index = letterIndex || numberIndex;
    return cryptoLetters.some( (element) => element === wildChar) ? cryptoNumbers[index] : cryptoLetters[index];
  }
  return wildChar;
}

function encode(string) {
  return string.split('').map( (element) => finderCorresponding(element)).join('');
}
function decode(string) {
  return string.split('').map( (element) => finderCorresponding(element)).join('');
}

module.exports = {
  encode,
  decode,
};