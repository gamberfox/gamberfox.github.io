"use strict";
let visualizationIsRunning = false;
visualizeButton.addEventListener('click', () => {
    if (visualizationIsRunning)
        return;
    else {
        visualizationIsRunning = true;
        visualizeButton.disabled = true;
    }
    if (answer[0] === -1) {
        if (!sadTromboneAudio.paused) {
            sadTromboneAudio.pause();
            sadTromboneAudio.currentTime = 0;
        }
        sadTromboneAudio.play();
        visualizationIsRunning = false;
        visualizeButton.disabled = false;
        return;
    }
    else {
        if (!nutcrackerAudio.paused || !joySongAudio.paused) {
            nutcrackerAudio.pause();
            joySongAudio.pause();
            nutcrackerAudio.currentTime = 2;
        }
        nutcrackerAudio.play();
        console.log(`oioioi\n`);
        drawMap();
        robot.difficulty = parseInt(vehicleSpeedSelect.value);
        robot.followDirections(answer);
    }
});
