let number = 270;
let count = 0;

for (let index = 2; index < number; index += 1){
  if( number % index === 0) {
    count += 1;
  }
}

if (count) {
  console.log('Não é primo.');
} else {
  console.log('É primo.');
}
