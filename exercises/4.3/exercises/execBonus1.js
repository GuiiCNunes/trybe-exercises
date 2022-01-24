let size = 3;
let middle = Math.round(size / 2);

for (let index = 0; index <= size; index += 1) {
  let line = '';  
  for (let indexQuantityChar = 0; indexQuantityChar <= size; indexQuantityChar += 1) {
    if (indexQuantityChar === middle + index || indexQuantityChar === middle - index || index === size) {
      line += '*';
    } else {
      line += ' ';
    }
  }
  console.log(line);
}

