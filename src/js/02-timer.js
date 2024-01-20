import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timePicker = document.querySelector('#datetime-picker');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('[data-start]');
let selectedTime, timer;

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function toggleDisableStartBtn(time = true) {
  !startBtn.hasAttribute('disabled') || time
    ? startBtn.setAttribute('disabled', true)
    : startBtn.removeAttribute('disabled');
}

toggleDisableStartBtn();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0];
    const time = selectedTime <= new Date();

    time && alert('Please choose a date in the future');
    toggleDisableStartBtn(time);
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', () => {
  if (!timer) {
    timePicker.setAttribute('disabled', 'true');
    toggleDisableStartBtn();
    timer = setInterval(() => {
      const ms = selectedTime.getTime() - new Date().getTime();
      if (ms <= 0) {
        timePicker.removeAttribute('disabled', 'true');
        clearInterval(timer);
        timer = null;
        return;
      }
      const { days, hours, minutes, seconds } = convertMs(ms);

      daysField.innerHTML = addLeadingZero(days);
      hoursField.innerHTML = addLeadingZero(hours);
      minutesField.innerHTML = addLeadingZero(minutes);
      secondsField.innerHTML = addLeadingZero(seconds);
    }, 1000);
  }
});
