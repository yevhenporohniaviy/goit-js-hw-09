function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const bodyStyles = document.getElementsByTagName('body')[0].style;

let timer;

startButton.addEventListener('click', () => {
  const handleColor = () => {
    bodyStyles.backgroundColor = getRandomHexColor();
  };

  if (!timer) {
    handleColor();
    timer = setInterval(() => {
      handleColor();
    }, 1000);
  }
});

stopButton.addEventListener('click', () => {
  clearInterval(timer);
  timer = null;
});
