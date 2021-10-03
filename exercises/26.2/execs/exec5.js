const fs = require('fs').promises;

const array = ['Finalmente', 'estou', 'usando', 'Promise.all', '!!!'];

const makePromises = (string, index) => fs.writeFile(`./file${index + 1}.txt`, string );

function start() {
  let phrase = '';
  const promises = array.map((s, i) => {
    phrase += ` ${s}`;
    return makePromises(s, i)
  });
  const makeFileAll = fs.writeFile(`./fileAll.txt`, phrase );
  Promise.all(promises);
}

start();
