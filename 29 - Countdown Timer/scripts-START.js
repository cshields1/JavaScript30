const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

let countdown;

buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const seconds = this.minutes.value * 60;
    timer(seconds)
    this.reset();
})

function startTimer() {
    const seconds = +this.dataset.time;
    timer(seconds)
}

function timer(seconds) {
    clearInterval(countdown)

    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds)
    displayEndTime(then)

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown)
            return;
        }
        displayTimeLeft(secondsLeft)
    }, 1000)

    function displayTimeLeft(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const display = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        document.title = display;
        timerDisplay.textContent = display;
    }

    function displayEndTime(timestamp) {
        const end = new Date(timestamp);
        const hour = end.getHours();
        const minutes = end.getMinutes();
        const europeanTime = hour > 12;
        endTime.textContent = `See you at ${europeanTime ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}${europeanTime ? 'pm' : 'am'}!`;
    }
}