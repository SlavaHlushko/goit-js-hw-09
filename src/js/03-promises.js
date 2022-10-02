'use strict';

import { Notify } from 'notiflix/build/notiflix-notify-aio';


const labelFirstDelay = document.querySelector('[name="delay"]');
const labelStepDelay = document.querySelector('[name="step"]');
const labelAmount = document.querySelector('[name="amount"]');
const btn = document.querySelector('button');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setInterval(() => {
      if (shouldResolve) {
        resolve({position, delay});
      }
      reject({position, delay});
    }, delay); 
  });
}

btn.addEventListener("click", (event) => {
  let positionNumber = 0;
  for (let i = 0; i <= Number(labelAmount.value); i += 1) {
    positionNumber += 1;
    const delayStep = Number(labelStepDelay.value) + Number(labelFirstDelay.value);
  };


  createPromise(2, 1500)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
})