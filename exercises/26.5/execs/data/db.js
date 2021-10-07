const fs = require('fs');

const db = './teams.json';

const setData = (data) => {
  try {
    const oldData = getData();
    oldData.push(data);
    fs.writeFileSync(db, JSON.stringify(oldData));
  } catch (error) {
    console.log(error);
  }
};

const getData = () => {
  try {
    return JSON.parse(fs.readFileSync(db, 'utf-8'));
  } catch (error) {
    console.log(error);
  }
};

module.exports = { setData, getData };
