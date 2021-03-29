let size = 13;
let mark = '*';
let space = ' ';
let range = 0; 
let middle = Math.round(size / 2);

for (let index = 0; index < size; index += 2) {
  let line = '';
  for (let indexOfLine = 1; indexOfLine <= size; indexOfLine += 1) {
    line += indexOfLine >= middle - range && indexOfLine <= middle + range ? mark : space;
  }
  range += 1;
  console.log(line);
}