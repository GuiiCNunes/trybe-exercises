let size = 5;
let middle = Math.round(size / 2);

for (let index = 0; index < size; index += 2) {
  let line = '';
  
  for (let indexQuantityChar = 1; indexQuantityChar <= size; indexQuantityChar += 1) {
    if (indexQuantityChar === middle || indexQuantityChar < middle + index && indexQuantityChar > middle - index) {
      line += '*';
    } else {
      line += ' ';
    }
  }
  console.log(line);
}