const randomNumbers = () => {
  const numbers = [];
  for (let index = 1; index < 11; index += 1) {
    numbers.push(Math.round(Math.random() * 50) + 1);
  }
  return numbers;
}

const fetchJoke = async () => {
  const numbers = await randomNumbers().map((element) => element ** 2);
  const result = await  numbers.reduce((arr, curr) => arr + curr);
  const div = [2, 3, 5, 10];
  const divAll = () => div.map((dividend) => (result / dividend));
  if (result < 8000) return divAll();
  throw new Error('É mais de oito mil! Essa promise deve estar quebrada!');
};
try {
  fetchJoke().then((result) => console.log(result.reduce((arr,curr) => arr + curr)))
  .catch((resultError) => console.log(resultError));  
} catch (error) {
  console.log(error);
}