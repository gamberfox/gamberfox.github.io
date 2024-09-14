"use strict";
let visualizationIsRunning = false;
//const mapUser=document.getElementById('grid') as HTMLElement;
visualizeButton.addEventListener('click', () => {
    //robot =new Robot(0,0,5,5,100);
    //let robot =new Robot(0,0,10,10,100);
    if (visualizationIsRunning)
        return;
    else {
        visualizationIsRunning = true;
    }
    if (answer[0] === -1) {
        if (!sadTromboneAudio.paused) {
            sadTromboneAudio.pause();
            sadTromboneAudio.currentTime = 0;
        }
        sadTromboneAudio.play();
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
        drawMap(); //reset the map in case we're in the middle of and animation
        robot.followDirections(answer);
    }
});
