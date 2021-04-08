function createDaysOfTheWeek() {
  const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  const weekDaysList = document.querySelector('.week-days');

  for (let index = 0; index < weekDays.length; index += 1) {
    const days = weekDays[index];
    const dayListItem = document.createElement('li');
    dayListItem.innerHTML = days;

    weekDaysList.appendChild(dayListItem);
  };
};

createDaysOfTheWeek();

// Escreva seu código abaixo.
function makeMonth(days, fridays, holidays) {
  for(let day of days) {
    let liDay = document.createElement('li');
    liDay.innerText = day;
    liDay.className = 'day';
    if (fridays.includes(day)) liDay.classList.add('friday');
    if (holidays.includes(day)) liDay.classList.add('holiday');
    document.querySelector('#days').appendChild(liDay);
  }
}

const dezDaysList = [29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const fridays = [4, 11, 18, 25];
const holidays = [24,25,31];

makeMonth(dezDaysList, fridays, holidays);

// Exec 2
function makeButton(string, id) {
  let button = document.createElement('button');
  button.innerText = string;
  button.id = id;
  document.querySelector('div.buttons-container').appendChild(button);
}

makeButton('Feriados', 'btn-holiday');

// Exec 3
document.querySelector('button#btn-holiday').addEventListener('click', function() {
  let elements = document.getElementsByClassName('holiday');
  for (let element of elements) {
    let colorElement = element.style.backgroundColor;
    element.style.backgroundColor = colorElement == 'magenta' ? 'rgb(238,238,238)' : 'magenta';
  }
});

// Exec 4
makeButton('Sexta-Feira', 'btn-friday');

// Exec 5
function makeNumberElement(element) {
  return parseInt(element.previousElementSibling.innerText) + 1;
}

document.querySelector('button#btn-friday').addEventListener('click', function() {
  let elements = document.getElementsByClassName('friday');
  for (let element of elements) {
    let text = element.innerText;
    let newText = 'SEXTA-FEIRA!!11!1';
    element.innerText = text !== newText ? newText : makeNumberElement(element);
  }
});

// Exec 6
document.querySelector('ul#days').addEventListener('mouseover', function(event) {
  event.target.style.fontSize = '25px';
});

document.querySelector('ul#days').addEventListener('mouseout', function(event) {
  event.target.style.fontSize = '20px';
});

// Exec 7
function makeTask(string) {
  let spanTask = document.createElement('span');
  spanTask.innerText = string;
  document.querySelector('div.my-tasks').appendChild(spanTask);
}

makeTask('cozinhar');

// Exec 8
function makeSubtitle(color) {
  let divColor = document.createElement('div');
  divColor.style.backgroundColor = color;
  divColor.className = 'task';
  document.querySelector('div.my-tasks').appendChild(divColor);
}

makeSubtitle('green');

// Exec 9

makeTask('pescar');
makeSubtitle('blue');
makeTask('caçar');
makeSubtitle('red');

document.querySelector('div.my-tasks').addEventListener('click', function(event) {
  if (event.target.classList.contains('task')) {
    if (event.target.classList.contains('selected')) event.target.classList.remove('selected');
    else event.target.classList.add('selected');
  }
});

// Exec 10

document.querySelector('ul#days').addEventListener('click', function(event) {
  let colorSelected = document.querySelector('div.selected').style.backgroundColor;
  if (event.target.style.color !== colorSelected) event.target.style.color = colorSelected;
  else event.target.style.color = 'rgb(119,119,119)';
});
