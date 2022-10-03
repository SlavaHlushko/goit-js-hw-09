'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  dateTimePicker: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.warning('"Please choose a date in the future"', {
        position: 'center-top',
      });
      refs.btnStart.disabled = true;
      return;
    }
    refs.btnStart.disabled = false;
  },
};

flatpickr(refs.dateTimePicker, options);

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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
flatpickr(refs.dateTimePicker, options);

const setCountdownTimer = () => {
  const timerId = setInterval(() => {
    const countdown = new Date(refs.dateTimePicker.value) - new Date();
    refs.btnStart.disabled = true;
    if (countdown >= 0) {
      //disable date reselection while timer is running
      refs.dateTimePicker.disabled = true;
      //
      const timeObject = convertMs(countdown);
      refs.days.textContent = addLeadingZero(timeObject.days);
      refs.hours.textContent = addLeadingZero(timeObject.hours);
      refs.minutes.textContent = addLeadingZero(timeObject.minutes);
      refs.seconds.textContent = addLeadingZero(timeObject.seconds);
    } else {
      clearInterval(timerId);
      Notiflix.Notify.success('Finish!', {
        position: 'left-top',
      });
      refs.dateTimePicker.disabled = false;
    }
  }, 1000);
};

refs.btnStart.addEventListener('click', setCountdownTimer);