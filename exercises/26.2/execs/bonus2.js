const fs = require('fs');
const readline = require('readline-sync');

const file = readline.question('Qual arquivo deseja ler?\n');

try {
  const content = fs.readFileSync(`./${file}`, 'utf8' );
  const word = readline.question('Qual palavra deve ser substituida?\n');
  const newWord = readline.question('Por qual?\n');
  const newContent = content.replace(new RegExp(word, 'g'), newWord);
  console.log(newContent);
  const newFile = readline.question('Em qual arquivo deseja salvar?\n');
  fs.writeFileSync(`./${newFile}`, newContent );
} catch (error) {
  console.log(`Arquivo inexistente\n${error}`);
}
