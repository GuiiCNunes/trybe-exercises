const fs = require('fs');
const readline = require('readline-sync');

const file = readline.question('Qual arquivo deseja ler?\n');

try {
  const content = fs.readFileSync(`./${file}`, 'utf8' );
  console.log(content);
} catch (_error) {
  console.log('Arquivo inexistente');
}
