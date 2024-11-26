
function delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function runTest(timeDelay:number) {
    gameInfo.style.backgroundColor='green';
    gameInfo.textContent='a simulation has started';
    if(!mapWasCreated)generateMap();
    let totalMoves:number=0;
    let p1ChosenAgent:number=0;let p2ChosenAgent:number=1;
    if(parseInt(p1Agent.value)===1){
        p1ChosenAgent=1;
        p2ChosenAgent=0;
    }
    let p1ChosenLevel:number=parseInt(p1Speed.value);
    let p2ChosenLevel:number=parseInt(p2Speed.value);
    for(let i=0;i<20;i++){
        if(board1.player1Won || board1.player2Won || board1.tie)break;
        operationInProcess=true;
        let nextMove:number[]= getNextMove(board1,p1ChosenLevel,p1ChosenAgent);
        board1.tryToMove(nextMove);
        operationInProcess=false;
        drawMap();
        updateInformation();
        totalMoves+=1;
        await delay(timeDelay);
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        if(board1.player1Won || board1.player2Won || board1.tie)break;
        operationInProcess=true;
        nextMove= getNextMove(board1,p2ChosenLevel,p2ChosenAgent);
        board1.tryToMove(nextMove);
        operationInProcess=false;
        drawMap();
        updateInformation();
        await delay(timeDelay);
        console.log('oi');
        totalMoves+=1;
    }
    console.log('-------------------------finished with the test-------------------------');
    console.log('total moves: '+totalMoves);
    gameInfo.textContent='the test finished';
}