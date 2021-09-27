const fs = require('fs').promises;

const nomeDoArquivo = 'simpsons.json';

function getNames() {
  return fs.readFile(nomeDoArquivo, 'utf8')
    .then((data) => JSON.parse(data))
    .catch((err) => err);
}

async function viewAll() {
  try {
    let names = await getNames();
    names.forEach(({ id, name }) => {
      console.log(`${id} - ${name}`);
    });
  } catch (error) {
    console.log(error);
  }
}

function getName(id) {
  return new Promise((resolve, reject) => {
    getNames()
      .then((array) => {
        const name = array.find((obj) => obj.id == id);
        if (name === undefined) return reject( new Error("id não encontrado"));
        return resolve(name)
      });
  });
}

function excludePersons() {
  getNames()
    .then((arr) => {
      return arr.filter((obj) => obj.id !== '10' && obj.id !== '6');
    })
    .then((data) => {
      
    })
    .catch((err) => console.log(err));
  
  try {
    await fs.writeFile('./meu-arquivo.txt', 'Meu textão');
    console.log('Arquivo escrito com sucesso!');
  } catch (err) {
    console.error(`Erro ao escrever o arquivo: ${err.message}`);
  }
}

function start() {
  getName(3)
    .then((obj) => console.log(`${obj.id} - ${obj.name}`))
    .catch((err) => console.log(err));
}

start();