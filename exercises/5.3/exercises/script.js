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
  for(let element of elements) {
    let colorElement = element.style.backgroundColor;
    element.style.backgroundColor = colorElement == 'blue' ? 'rgb(238,238,238)' : 'blue';
  }
});

// Exec 4
makeButton('Sexta-Feira', 'btn-friday');


