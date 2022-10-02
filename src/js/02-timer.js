'use strict';

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const timerRef = document.querySelector('.timer');
const TIMER_DEADLINE = new Date();

const timer = {
    intervalId: null,
    refs: {},
    notifyOptions: {
                clickToClose: true,
                closeButton: true,
            },
    start(rootselector, deadline) {
        const delta = deadline.getTime() - Date.now();
        if (delta <= 0) {
            Notify.failure("Please choose a date in the future", this.notifyOptions);
            return;
        }
        Notify.success('Start time', this.notifyOptions)
        this.getRefs(rootselector);
        this.intervalId = setInterval(() => {
            const ms = deadline.getTime() - Date.now();
            if (ms <= 1000) { 
                clearInterval(this.intervalId);
                Notify.success('Deadline', this.notifyOptions)
            };
            const data = this.convertMs(ms);
            Object.entries(data).forEach(([name, value]) => {

                this.refs[name].textContent = this.addLeadingZero(value);
            });
            // this.refs.days.textContent =this.addLeadingZero(data.days);
            // this.refs.hours.textContent =this.addLeadingZero(data.hours);
            // this.refs.minutes.textContent =this.addLeadingZero(data.minutes);
            // this.refs.seconds.textContent = this.addLeadingZero(data.seconds);
        }, 1000);
    },
    getRefs(rootselector) {
        this.refs.days = rootselector.querySelector('[data-days]');
        this.refs.hours = rootselector.querySelector('[data-hours]');
        this.refs.minutes = rootselector.querySelector('[data-minutes]');
        this.refs.seconds = rootselector.querySelector('[data-seconds]');
    },
    convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
        return { days, hours, minutes, seconds };
    },
    addLeadingZero(value) {
        return String(value).padStart(2, '0');
    },
}

timer.start(timerRef, TIMER_DEADLINE);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0])
      const numberSelectedDates = selectedDates[0].getTime();
      if (numberSelectedDates < Date.now()) {
          alert('Please choose a date in the future');
          startBtnRef.setAttribute('disabled, false');
      } else {
          startBtnRef.toggleAttribute('disabled');
      }
  },
};
flatpickr('#datetime-picker', options);

const startBtnRef = document.querySelector('[data-start]');
startBtnRef.addEventListener('click', () => {
    timer.start();
});