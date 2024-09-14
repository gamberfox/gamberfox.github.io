"use strict";
let answer = [-33];
const RIGHT = 0;
const UP = 1;
const LEFT = 2;
const DOWN = 3;
const travelCost = { [FREE_CELL.toString()]: 1,
    [(VEHICLE).toString()]: 1,
    [(MEDIUM_TRAFFIC).toString()]: 4,
    [(HEAVY_TRAFFIC).toString()]: 7,
    [(PASSENGER).toString()]: 1,
    [(DESTINATION).toString()]: 1
};
const STOP_POINT = 1_000_000;
let statSheet;
const algorithmUsed = document.getElementById('algorithmUsed');
const expandedNodes = document.getElementById('expandedNodes');
const nodeDepth = document.getElementById('nodeDepth');
const computeTime = document.getElementById('computeTime');
const solutionCost = document.getElementById('solutionCost');
// Handle button click to perform the selected action
solveButton.addEventListener('click', () => {
    const startTime = performance.now();
    const selectedAction = actionSelect.value; // Get the selected action
    const file = fileInput.files?.[0]; // Get the selected file
    nutcrackerAudio.currentTime = 2;
    if (!nutcrackerAudio.paused) {
        nutcrackerAudio.pause();
        nutcrackerAudio.currentTime = 2;
    }
    if (!joySongAudio.paused) {
        joySongAudio.pause();
        joySongAudio.currentTime = 1;
    }
    if (file || mapListWasSelected) {
        const reader = new FileReader(); // Create a new FileReader
        statSheet = new StatSheet();
        algorithmUsed.textContent = selectedAction;
        switch (selectedAction) {
            case 'avara':
                // Read and display the file content
                /* reader.onload = (e) => {
                    fileContent.textContent = e.target?.result as string; // Display the file content
                }; */
                //reader.readAsText(file); // changes the bottom text
                break;
            case 'aStar':
                // Display the file size in bytes
                //fileContent.textContent = `File Size: ${file.size} bytes`;
                break;
            case 'breadth':
                answer = breadthSolver();
                console.log(`breadth case`);
                break;
            case 'uniformCost':
                //reader.readAsDataURL(file); // Read the file as a data URL (for image preview)
                answer = uniformCostSolver();
                console.log(`the uniform cost algoritm was used`);
                break;
            case 'depthAvoidingCycles':
                answer = depthSolver();
                console.log(`the depth algoritm was used`);
                break;
            default:
                fileContent.textContent = 'Please select a valid action.';
                break;
        }
        console.log('solveButton listener');
        console.log(`${answer}`);
        let newAnswer = [];
        for (let direction of answer) {
            switch (direction) {
                case RIGHT:
                    newAnswer.push(LEFT);
                    break;
                case UP:
                    newAnswer.push(DOWN);
                    break;
                case LEFT:
                    newAnswer.push(RIGHT);
                    break;
                case DOWN:
                    newAnswer.push(UP);
                    break;
                default:
                    newAnswer.push(-1);
            }
        }
        answer = newAnswer;
        statSheet.computeTime = performance.now() - startTime;
        nodeDepth.textContent = statSheet.nodeDepth.toString();
        expandedNodes.textContent = statSheet.expandedNodes.toString();
        computeTime.textContent = statSheet.computeTime.toString();
        console.log(answer);
        if (newAnswer[0] === -1) {
            console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nNO ANSWER WAS FOUND, I LIED");
            solutionCost.textContent = 'no solution was found';
            if (!sadTromboneAudio.paused) {
                sadTromboneAudio.pause();
                sadTromboneAudio.currentTime = 0;
            }
            sadTromboneAudio.play();
        }
        else {
            solutionCost.textContent = statSheet.solutionCost.toString();
            if (!partyHornAudio.paused) {
                partyHornAudio.pause();
                partyHornAudio.currentTime = 0;
            }
            partyHornAudio.play();
        }
        reader.onerror = () => {
            fileContent.textContent = 'Error reading file!';
        };
    }
    else {
        fileContent.textContent = 'No file selected.';
    }
});
class MazePosition {
    x;
    y;
    cellType;
    nodeDepth;
    //pos0=y,pos1=x,pos2=x+y.
    //radarDistance:number;
    lDistance = 0;
    travelCost = 0;
    visited = false;
    visitedNodes = new Set();
    visitedNodes2 = new Set();
    foundPassenger;
    foundPassengerThisRound = false;
    father = null;
    pathToFather = null;
    pathHome = [];
    //the taxi can go to a maximum of 4 directions
    rightChild = null;
    upChild = null;
    leftChild = null;
    downChild = null;
    constructor(posX, posY, cellType, nodeDepth, foundPassenger) {
        this.x = posX;
        this.y = posY;
        this.cellType = cellType;
        this.nodeDepth = nodeDepth;
        this.foundPassenger = foundPassenger;
        //this.radarDistance=[posX,posY,0];
    }
}
class StatSheet {
    expandedNodes = 0;
    nodeDepth = 0;
    computeTime = 0;
    solutionCost = 0;
}
