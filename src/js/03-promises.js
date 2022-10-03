'use strict';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

let delay = document.querySelector('[name="delay"]');
let step = document.querySelector('[name="step"]');
let amount = document.querySelector('[name="amount"]');
const submitBtn = document.querySelector('button');

submitBtn.addEventListener('click', dataForPromice);

function dataForPromice(event) {
  event.preventDefault();
  let firstDelay = Number(delay.value);
  let delayStep = Number(step.value);

  if (firstDelay < 0 || delayStep < 0 || amount.value < 0) {
    Notiflix.Report.warning(
      'Negative value(s) detected!',
      'Only positive value can be entered in the field',
      'Ok, I understand'
    );
  } else {
    for (let i = 0; i < amount.value; i++) {
      let nextTime = firstDelay + i * delayStep;
      createPromise(1 + i, nextTime)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
    }
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}