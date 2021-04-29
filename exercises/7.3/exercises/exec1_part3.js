const greetPeople = (people) => {
  let greeting = 'Hello ';
  const hellos = [];
  for (const person in people) {
    hellos.push(greeting + people[person]);
  }
  return hellos;
};

const parameter = ['Irina', 'Ashleigh', 'Elsa'];
const result = ['Hello Irina', 'Hello Ashleigh', 'Hello Elsa'];

const assert = require('assert');

assert.strictEqual(typeof greetPeople, 'function');
assert.deepStrictEqual(greetPeople(parameter), result);