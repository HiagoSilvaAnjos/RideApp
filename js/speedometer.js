const speedElement = document.querySelector('#speed');
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');

let watchID = null;

startButton.addEventListener('click', () => startButtonClick(startButton, stopButton));
stopButton.addEventListener('click', () => stopButtonClick(startButton, stopButton));

function startButtonClick(elementStart, elementStop) {

    if (watchID) return

    function handleSuccess(position) {
        const speed = position.coords.speed ? (position.coords.speed * 3.6).toFixed(1) : 0;
        speedElement.innerText = speed;
    }

    function handleError(err) {
        console.log(err.msg)
    }

    // Pegar localização
    const options = { enableHighAccuracy: true };
    watchID = navigator.geolocation.watchPosition(handleSuccess, handleError, options);

    elementStart.classList.add('d-none');
    elementStop.classList.remove('d-none');

}

function stopButtonClick(elementStart, elementStop) {
    if (!watchID) return

    navigator.geolocation.clearWatch(watchID);
    watchID = null;

    elementStop.classList.add('d-none');
    elementStart.classList.remove('d-none');

}