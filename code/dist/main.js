"use strict";
const fileInput = document.getElementById('fileInput');
const fileContent = document.getElementById('fileContent');
const movementSpeed = document.getElementById('movementSpeed');
const p1Agent = document.getElementById('p1Agent');
const p1Speed = document.getElementById('p1Speed');
const p2Speed = document.getElementById('p2Speed');
const aiAgent = document.getElementById('aiAgent');
const difficultyLevel = document.getElementById('difficultyLevel');
const testButton = document.getElementById('testButton');
const generateButton = document.getElementById('generateButton');
const restartButton = document.getElementById('restartButton');
const aiButton = document.getElementById('aiButton');
const mapInfo = document.getElementById('mapInfo');
const turnInfo = document.getElementById('turnInfo');
const gameInfo = document.getElementById('gameInfo');
const map = document.getElementById('grid');
const wholeBody = document.getElementById('body');
const nutcrackerAudio = document.getElementById('nutcracker');
const joySongAudio = document.getElementById('joySong');
const partyHornAudio = document.getElementById('partyHorn');
const sadTromboneAudio = document.getElementById('sadTrombone');
let operationInProcess = false;
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        const button = document.createElement('button');
        button.classList.add('cell0');
        button.setAttribute('pos-x', i.toString());
        button.setAttribute('pos-y', j.toString());
        button.addEventListener('click', () => {
            if (operationInProcess) {
                gameInfo.textContent = `it's the AI's turn, please wait`;
            }
            else {
                if (operationInProcess) {
                    gameInfo.textContent = 'please wait for the ai to finish moving';
                }
                if (board1.player1Won || board1.player2Won || board1.tie) {
                    gameInfo.textContent = 'the games has ended, you cannot move pieces';
                }
                else if (board1.tryToMove([i, j])) {
                    drawMap();
                    updateInformation();
                }
                else {
                    console.log("movement not doable");
                    operationInProcess = false;
                    drawMap();
                    updateInformation();
                    if (board1.player1Turn) {
                        console.log('p1 position: ' + board1.p1Position.toString());
                    }
                    else {
                        console.log('p2 position: ' + board1.p2Position.toString());
                    }
                }
            }
        });
        map?.appendChild(button);
    }
}
const testVar = 2;
let mapWasCreated = false;
let board1;
let initialBoard;
testButton.addEventListener('click', () => {
    runTest(parseInt(movementSpeed.value));
});
generateButton.addEventListener('click', () => {
    console.log(`here in the generateButton`);
    generateMap();
});
function generateMap() {
    gameStarted = false;
    mapWasCreated = true;
    board1 = new Board();
    initialBoard = board1.clone();
    winner.textContent = 'no winner yet';
    drawMap();
    updateInformation();
}
restartButton.addEventListener('click', () => {
    board1 = initialBoard.clone();
    winner.textContent = 'no winner yet';
    gameStarted = false;
    drawMap();
    updateInformation();
});
aiButton.addEventListener('click', () => {
    if (operationInProcess || !board1.player1Turn) {
        gameInfo.textContent = 'the player should move before we make the AI take a decision';
    }
    else if (board1.player1Won || board1.player2Won || board1.tie) {
        gameInfo.textContent = 'the game ended';
    }
    else {
        operationInProcess = true;
        gameInfo.textContent = 'the AI is thinking now';
        let nextMove = getNextMove(board1, parseInt(difficultyLevel.value), parseInt(aiAgent.value));
        console.log('difficulty and ai: ' + difficultyLevel.value + aiAgent.value);
        board1.tryToMove(nextMove);
        operationInProcess = false;
        gameInfo.textContent = 'the AI decided';
        turnInfo.textContent = 'human player to move';
        drawMap();
        updateInformation();
    }
});
let gameStarted = false;
const p1Score = document.getElementById('p1Score');
const p1Multiplier = document.getElementById('p1Multiplier');
const p2Score = document.getElementById('p2Score');
const p2Multiplier = document.getElementById('p2Multiplier');
const winner = document.getElementById('winner');
const totalMoves = document.getElementById('totalMoves');
const updateInformation = () => {
    p1Score.textContent = board1.p1Score.toString();
    p1Multiplier.textContent = board1.p1Multiplier.toString();
    p2Score.textContent = board1.p2Score.toString();
    p2Multiplier.textContent = board1.p2Multiplier.toString();
    totalMoves.textContent = board1.currentTurn.toString();
    if (board1.player1Turn) {
        turnInfo.textContent = 'player 1 turn';
        turnInfo.style.backgroundColor = "aqua";
        gameInfo.style.backgroundColor = "aqua";
        map.style.backgroundColor = "aqua";
    }
    else {
        turnInfo.textContent = 'player 2 turn';
        turnInfo.style.backgroundColor = "red";
        gameInfo.style.backgroundColor = "red";
        map.style.backgroundColor = "red";
    }
    if (board1.player1Won) {
        winner.textContent = 'player 1';
        gameInfo.textContent = 'THE GAME ENDED';
    }
    else if (board1.player2Won) {
        winner.textContent = 'player 2';
        gameInfo.textContent = 'THE GAME ENDED';
    }
    else if (board1.tie) {
        winner.textContent = 'the game ended in a tie';
        gameInfo.textContent = 'THE GAME ENDED';
    }
    else {
        winner.textContent = 'no winner yet';
    }
};
