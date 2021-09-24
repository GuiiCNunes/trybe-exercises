const fs = require('fs').promises;

const nomeDoArquivo = 'simpsons.json';

function getNames() {
  return fs.readFile(nomeDoArquivo, 'utf8')
    .then((data) => JSON.parse(data))
    .catch((err) => err);
}

async function view() {
  try {
    let names = await getNames();
    names.forEach(({ id, name }) => {
      console.log(`${id} - ${name}`);
    });
  } catch (error) {
    console.log(error);
  }
}

view();