const removeVowels = (word) => {
  const characters = word.split('');
  const results = [];
  let vowels = 0;
  for (let index = 0; index < characters.length; index += 1) {
    if (
      characters[index] === 'a' ||
      characters[index] === 'o' ||
      characters[index] === 'i' ||
      characters[index] === 'e' ||
      characters[index] === 'u'
    ) {
      vowels += 1;
      results.push(vowels);
    } else {
      results.push(characters[index]);
    }
  }
  return results.join('');
};


const parameter = 'Dayane';
const result = 'D1y2n3';

const assert = require('assert');

assert.strictEqual(typeof removeVowels, 'function');
assert.strictEqual(removeVowels(parameter), result);