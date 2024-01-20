import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const { delay, step, amount } = form.elements;

  handlePromise(Number(delay.value), Number(step.value), Number(amount.value));

  form.reset();
});

function handlePromise(delay, step, amount) {
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        iziToast.show({
          color: 'green',
          position: 'topRight',
          message: `✅ Fulfilled promise ${position} in ${delay}ms`,
        });
      })
      .catch(({ position, delay }) => {
        iziToast.show({
          color: 'red',
          position: 'topRight',
          message: `❌ Rejected promise ${position} in ${delay}ms`,
        });
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res({
          position,
          delay,
        });
      } else {
        rej({
          position,
          delay,
        });
      }
    }, delay);
  });
}
