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
      fs.writeFile('./simpsons.json', JSON.stringify(data));
    })
    .catch((err) => console.log(err));

}

function getSimpsonsFamily() {
  getNames()
    .then((arr) => {
      return arr.filter((obj) => ['1', '2', '3', '4'].includes(obj.id));
    })
    .then((data) => {
      fs.writeFile('./simpsonFamily.json', JSON.stringify(data));
    })
    .catch((err) => console.log(err));
}

async function addNelson() {
  try {
    const oldContent = await JSON.parse(await fs.readFile('./simpsonFamily.json', 'utf8'));
    const names = await getNames();
    const newContent = [
      ...oldContent,
      (names.find((per) => per.name === 'Nelson Muntz'))
    ];
    fs.writeFile('./simpsonFamily.json', JSON.stringify(newContent));
  } catch (error) {
    console.log(error);
  }
}

async function addMagie() {
  try {
    const content = await JSON.parse(await fs.readFile('./simpsonFamily.json', 'utf8'));
    const names = await getNames();
    const indexOfNelson = content.findIndex((per) => per.name === 'Nelson Muntz');
    content[indexOfNelson] = names.find((per) => per.name === 'Maggie Simpson')
    fs.writeFile('./simpsonFamily.json', JSON.stringify(content));
  } catch (error) {
    console.log(error);
  }
}

function start() {
  addMagie();
}

start();