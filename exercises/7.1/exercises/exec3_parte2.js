let clickCount = 0;

document.getElementById('button-count').addEventListener('click', () => {
  clickCount += 1;
  document.getElementById('p-count').innerText = clickCount;
});