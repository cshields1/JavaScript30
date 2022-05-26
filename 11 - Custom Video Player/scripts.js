const player = document.querySelector('.player');

const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const playToggle = player.querySelector('.toggle');
const sliders = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');
const fullscreenButton = player.querySelector('.fullscreen')

let mouseDown = false;

video.addEventListener('click', togglePlay)
video.addEventListener('play', toggleIcon)
video.addEventListener('pause', toggleIcon)
video.addEventListener('timeupdate', handleProgress)
progress.addEventListener('click', scrub)
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e))
playToggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', skip))
sliders.forEach(slider => {
    slider.addEventListener('change', handleSliderChange)
    slider.addEventListener('mousemove', handleSliderChange)
})
fullscreenButton.addEventListener('click', () => { if (video.requestFullscreen) video.requestFullscreen() })

function togglePlay() { video.paused ? video.play() : video.pause() }
function toggleIcon() { playToggle.textContent = video.paused ? '▶' : '❙ ❙' }
function skip() { video.currentTime += +this.dataset.skip }
function handleSliderChange() { video[this.name] = this.value }
function handleProgress() {
    const percent = video.currentTime / video.duration * 100
    progressBar.style.flexBasis = `${percent}%`
}
function scrub(e) {
    const scrubTime = e.offsetX / progress.offsetWidth * video.duration
    video.currentTime = scrubTime
}