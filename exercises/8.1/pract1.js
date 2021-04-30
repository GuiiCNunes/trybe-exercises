const wakeUp = () => console.log('Acordando!!');
const coffee = () => console.log('Bora tomar café!!');
const goSleep = () => console.log('Partiu dormir!!');

const doingThings = (action) => action();

doingThings(wakeUp);
doingThings(coffee);
doingThings(goSleep);
