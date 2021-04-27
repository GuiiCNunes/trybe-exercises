const addProperty = (object, newKey, newValue) => object[newKey] = newValue;

let obj = {
  name: 'Guilherme'
};

addProperty(obj, 'lastname', 'Nunes');
console.log(obj);