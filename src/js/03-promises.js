import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css'

const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
  e.preventDefault()
 
  handlePromise(form.elements)
})

function handlePromise({ delay, step, amount }) {
  setTimeout(() => {
    for (let i = 1; i <= amount.value; i++) {
      createPromise(i, step.value)
        .then(({ position, delay }) => {
          setTimeout(() => {
            iziToast.show({
              color: 'green',
              position: 'topRight',
              message: `✅ Fulfilled promise ${position} in ${delay}ms`
          });
          },delay) 
        }, ({ position, delay }) => {
          setTimeout(() => {
            iziToast.show({
              color: 'red',
              position: 'topRight',
              message: `❌ Rejected promise ${position} in ${delay}ms`
          });
          }, delay)
        })
    }
  }, delay.value) 
}

 
function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;    
     if (shouldResolve) {
        res({
          position,
          delay: delay * position
        })
      } else {
         rej({
          position,
          delay: delay * position
        })
      }
  })
}


