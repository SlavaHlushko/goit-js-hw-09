'user strict';

const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
let timerId = null;

startBtn.addEventListener("click", getRandomHexColor);
stopBtn.addEventListener('click', (event) => {
    clearInterval(timerId);
    if (event) {
        stopBtn.disabled = true;
        startBtn.disabled = false;
    }
});

function getRandomHexColor() {
    timerId = setInterval(() => { 
     document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        stopBtn.disabled = false;
        startBtn.disabled = true;
    return;
    }, 1000);
};

