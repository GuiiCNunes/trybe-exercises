let size = 5;

for (let index = 0; index < size; index += 1) {
  let line = '';
  for (let indexQuantityChar = 0; indexQuantityChar < size; indexQuantityChar += 1) {
    line = line + '*';
  }
  console.log(line);
}