let size = 7;

for (let index = 0; index <= size; index += 1) {
  let line = '';
  let middle = Math.round(size / 2);

  for (let indexQuantityChar = 1; indexQuantityChar <= size; indexQuantityChar += 1) {
    if (indexQuantityChar === middle + index || indexQuantityChar === middle - index) {
      line += '*';
    } else if (index === size - 4) {
      line += '*';
    } else {
      line += ' ';
    }
  }
  console.log(line);
}