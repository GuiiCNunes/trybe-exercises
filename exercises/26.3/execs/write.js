const fs = require('fs');

const write = (file, text) => {
  fs.writeFileSync(file, text);
  return 'ok';
}

module.exports = write;