const replaceString = string => `Tryber ${string} aqui!`;

const skills = ['Git', 'JS', 'HTML', 'CSS', 'Bash'];

const concatStrings = string => `${replaceString(string)}
Minhas cinco principais skills são: ${skills.sort().toString()}`;

console.log(concatStrings('Guilherme'));