"use strict";
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function runTest(timeDelay) {
    gameInfo.style.backgroundColor = 'green';
    gameInfo.textContent = 'a test has started';
    let totalMoves = 0;
    let p1ChosenAgent = 0;
    let p2ChosenAgent = 1;
    if (parseInt(p1Agent.value) === 1) {
        p1ChosenAgent = 1;
        p2ChosenAgent = 0;
    }
    let p1ChosenLevel = parseInt(p1Speed.value);
    let p2ChosenLevel = parseInt(p2Speed.value);
    for (let i = 0; i < 8; i++) {
        operationInProcess = true;
        if (board.player1Won || board.player2Won || board.tie)
            break;
        let nextMove = getNextMove(board, p1ChosenLevel, p1ChosenAgent);
        board.tryToMove(nextMove);
        operationInProcess = false;
        drawMap();
        updateInformation();
        totalMoves += 1;
        await delay(timeDelay);
        operationInProcess = true;
        if (board.player1Won || board.player2Won || board.tie)
            break;
        nextMove = getNextMove(board, p2ChosenLevel, p2ChosenAgent);
        board.tryToMove(nextMove);
        operationInProcess = false;
        drawMap();
        updateInformation();
        await delay(timeDelay);
        console.log('oi');
        totalMoves += 1;
    }
    console.log('finished with the test');
    console.log('total moves: ' + totalMoves);
    gameInfo.textContent = 'the test finished';
}
