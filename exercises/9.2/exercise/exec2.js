const randomNumbers = () => {
  const numbers = [];
  for (let index = 1; index < 11; index += 1) {
    numbers.push(Math.round(Math.random() * 50) + 1);
  }
  return numbers;
}

const fetchJoke = () => {
  return new Promise((resolve, reject) => {
    const numbers = randomNumbers().map((element) => element ** 2);
    const result = numbers.reduce((arr, curr) => arr + curr);
    const div = [2, 3, 5, 10];
    const divAll = () => div.map((dividend) => (result / dividend));
    if (result < 8000) return resolve(divAll());
    reject('É mais de oito mil! Essa promise deve estar quebrada!');
  });
};

fetchJoke().then((result) => { console.log(result); return result})
  .then((result) => console.log(result.reduce((arr,curr) => arr + curr)))
  .catch((resultError) => console.log(resultError));