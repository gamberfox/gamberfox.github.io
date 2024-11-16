"use strict";
const fileInput = document.getElementById('fileInput');
const fileContent = document.getElementById('fileContent');
const aiAgent = document.getElementById('aiAgent');
const difficultyLevel = document.getElementById('difficultyLevel');
const generateButton = document.getElementById('generateButton');
const restartButton = document.getElementById('restartButton');
const beginButton = document.getElementById('beginButton');
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
                operationInProcess = true;
                if (board.player1Won || board.player2Won || board.tie) {
                    gameInfo.textContent = 'the games has ended, you cannot move pieces';
                }
                else if (board.tryToMove([i, j])) {
                    drawMap();
                    updateInformation();
                    if (board.player1Won || board.player2Won || board.tie) {
                        gameInfo.textContent = 'the game ended';
                    }
                    else {
                        wholeBody.style.backgroundColor = "red";
                        gameInfo.textContent = 'the AI is thinking now';
                        let nextMove = getNextMove(board, parseInt(difficultyLevel.value), parseInt(aiAgent.value));
                        console.log('difficulty and ai: ' + difficultyLevel.value + aiAgent.value);
                        board.tryToMove(nextMove);
                        wholeBody.style.backgroundColor = "blue";
                    }
                    operationInProcess = false;
                    drawMap();
                    updateInformation();
                }
                else {
                    console.log("movement not doable");
                    operationInProcess = false;
                    if (board.player1Turn) {
                        console.log('p1 position: ' + board.p1Position.toString());
                    }
                    else {
                        console.log('p2 position: ' + board.p2Position.toString());
                    }
                }
            }
        });
        map?.appendChild(button);
    }
}
const testVar = 2;
let robot;
let mapWasCreated = false;
let board;
let initialBoard;
fileInput.addEventListener('click', () => {
    mapListWasSelected = false;
});
let nn1;
let nn2;
generateButton.addEventListener('click', () => {
    const selectedAction = difficultyLevel.value;
    const file = fileInput.files?.[0];
    console.log(`here in the generateButton`);
    board = new Board();
    initialBoard = board.clone();
    winner.textContent = 'no winner yet';
    drawMap();
});
restartButton.addEventListener('click', () => {
    board = initialBoard.clone();
    winner.textContent = 'no winner yet';
    gameStarted = false;
    drawMap();
    updateInformation();
});
let gameStarted = false;
beginButton.addEventListener('click', () => beginFunction());
function beginFunction() {
    if (!gameStarted) {
        operationInProcess = true;
        gameInfo.textContent = 'the AI is thinking now';
        let nextMove = getNextMove(board, parseInt(difficultyLevel.value), parseInt(aiAgent.value));
        board.tryToMove(nextMove);
        operationInProcess = false;
        turnInfo.textContent = 'player 2 turn';
        gameInfo.textContent = 'player 2 to move';
        drawMap();
        updateInformation();
    }
    else {
    }
}
const p1Score = document.getElementById('p1Score');
const p1Multiplier = document.getElementById('p1Multiplier');
const p2Score = document.getElementById('p2Score');
const p2Multiplier = document.getElementById('p2Multiplier');
const winner = document.getElementById('winner');
const updateInformation = () => {
    p1Score.textContent = board.p1Score.toString();
    p1Multiplier.textContent = board.p1Multiplier.toString();
    p2Score.textContent = board.p2Score.toString();
    p2Multiplier.textContent = board.p2Multiplier.toString();
    if (board.player1Turn) {
        turnInfo.textContent = 'player 1 turn';
    }
    else {
        turnInfo.textContent = 'player 2 turn';
    }
    if (board.remainingPointSpots === 0) {
        if (board.p1Score > board.p2Score) {
            board.player1Won = true;
        }
        else if (board.p2Score > board.p1Score) {
            board.player2Won = true;
        }
        else {
            board.tie = true;
        }
    }
    if (board.player1Won) {
        winner.textContent = 'player 1';
    }
    else if (board.player2Won) {
        winner.textContent = 'player 2';
    }
    else if (board.tie) {
        winner.textContent = 'the game ended in a tie';
    }
    else {
        winner.textContent = 'no winner yet';
    }
};
