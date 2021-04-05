document.querySelector('#container').style.alignItems = 'center';
document.querySelector('#header-container').style.background = 'green';
document.querySelector('.emergency-tasks').style.background = 'green';
document.querySelector('.no-emergency-tasks').style.background = 'yellow';
document.querySelector('#footer-container').style.background = 'black';
let noEmergencyRasks = document.querySelectorAll('.no-emergency-tasks h3');
for (let index = 0; index < noEmergencyRasks.length; index += 1) {
  noEmergencyRasks[index].style.background = 'purple';
}
let emergencyRasks = document.querySelectorAll('.emergency-tasks h3');
for (let index = 0; index < emergencyRasks.length; index += 1) {
  emergencyRasks[index].style.background = 'black';
}
