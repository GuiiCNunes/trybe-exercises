let size = 8;

for (let index = size; index >= 0; index -= 1) {
  let line = '';
  for (let indexQuantityChar = 0; indexQuantityChar < size; indexQuantityChar += 1) {
    if ( indexQuantityChar >= index) {
      line = line + '*';
    } else {
      line = line + ' ';
    }
  }
  console.log(line);
}