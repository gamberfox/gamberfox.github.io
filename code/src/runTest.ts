

function delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// async function runTest(aiAgent:number,difficulty:number) {
async function runTest(timeDelay:number) {
    gameInfo.style.backgroundColor='green';
    gameInfo.textContent='a test has started';
    let totalMoves:number=0;
    let p1ChosenAgent:number=0;let p2ChosenAgent:number=1;
    if(parseInt(p1Agent.value)===1){
        p1ChosenAgent=1;
        p2ChosenAgent=0;
    }
    let p1ChosenLevel:number=parseInt(p1Speed.value);
    let p2ChosenLevel:number=parseInt(p2Speed.value);
    // for(let i=0;i<20;i++){
    for(let i=0;i<8;i++){
        operationInProcess=true;
        if(board.player1Won || board.player2Won || board.tie)break;
        let nextMove:number[]= getNextMove(board,p1ChosenLevel,p1ChosenAgent);
        board.tryToMove(nextMove);
        operationInProcess=false;
        drawMap();
        updateInformation();
        totalMoves+=1;
        // gameInfo.textContent='runTest button'+i.toString();
        // await delay(parseInt(vehicleSpeed.value));
        await delay(timeDelay);
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        operationInProcess=true;
        if(board.player1Won || board.player2Won || board.tie)break;
        nextMove= getNextMove(board,p2ChosenLevel,p2ChosenAgent);
        board.tryToMove(nextMove);
        operationInProcess=false;
        drawMap();
        updateInformation();
        // gameInfo.textContent='runTest button'+i.toString();
        // await delay(parseInt(vehicleSpeed.value));
        await delay(timeDelay);
        console.log('oi');
        totalMoves+=1;
    }
    console.log('finished with the test');
    console.log('total moves: '+totalMoves);
    gameInfo.textContent='the test finished';
}