const assert = require('assert');

const arrays = [
    ['1', '2', '3'],
    [true],
    [4, 5, 6],
];

function flatten() {
  return arrays.reduce( (arr, current) => {
    current.forEach((element) => arr.push(element));
    return arr;
  });
}

assert.deepStrictEqual(flatten(), ['1', '2', '3', true, 4, 5, 6]);