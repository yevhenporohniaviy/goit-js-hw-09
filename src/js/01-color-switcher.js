function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const bodyStyles = document.getElementsByTagName('body')[0].style;

let timer;

stopButton.setAttribute('disabled', true);

startButton.addEventListener('click', () => {
  const handleColor = () => {
    bodyStyles.backgroundColor = getRandomHexColor();
  };

  startButton.setAttribute('disabled', true);
  stopButton.removeAttribute('disabled');

  if (!timer) {
    handleColor();
    timer = setInterval(() => {
      handleColor();
    }, 1000);
  }
});

stopButton.addEventListener('click', () => {
  stopButton.setAttribute('disabled', true);
  startButton.removeAttribute('disabled');

  clearInterval(timer);
  timer = null;
});
