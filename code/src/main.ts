// Get references to the DOM elements
const fileInput = document.getElementById('fileInput') as HTMLInputElement;
const fileContent = document.getElementById('fileContent') as HTMLElement;
const movementSpeed = document.getElementById('movementSpeed') as HTMLSelectElement;
const p1Agent = document.getElementById('p1Agent') as HTMLSelectElement;
const p1Speed = document.getElementById('p1Speed') as HTMLSelectElement;
const p2Speed = document.getElementById('p2Speed') as HTMLSelectElement;

const aiAgent = document.getElementById('aiAgent') as HTMLSelectElement;
const difficultyLevel = document.getElementById('difficultyLevel') as HTMLSelectElement;
const testButton=document.getElementById('testButton') as HTMLButtonElement;

const generateButton=document.getElementById('generateButton') as HTMLButtonElement;
const restartButton = document.getElementById('restartButton') as HTMLButtonElement;
// const beginButton = document.getElementById('beginButton') as HTMLButtonElement;
//line 155
const aiButton = document.getElementById('aiButton') as HTMLButtonElement;


const mapInfo = document.getElementById('mapInfo') as HTMLPreElement | null;
const turnInfo = document.getElementById('turnInfo') as HTMLPreElement;
const gameInfo = document.getElementById('gameInfo') as HTMLPreElement;

const map=document.getElementById('grid') as HTMLElement;
const wholeBody=document.getElementById('body') as HTMLElement;

const nutcrackerAudio:HTMLAudioElement = document.getElementById('nutcracker') as HTMLAudioElement;
const joySongAudio:HTMLAudioElement = document.getElementById('joySong') as HTMLAudioElement;
const partyHornAudio:HTMLAudioElement = document.getElementById('partyHorn') as HTMLAudioElement;
const sadTromboneAudio:HTMLAudioElement = document.getElementById('sadTrombone') as HTMLAudioElement;

let operationInProcess:boolean=false;
//create map
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        const button = document.createElement('button');
        button.classList.add('cell0');
        button.setAttribute('pos-x', i.toString());
        button.setAttribute('pos-y', j.toString());
        button.addEventListener('click',()=>{
            if(operationInProcess){
                gameInfo.textContent=`it's the AI's turn, please wait`;
            }
            else{
                if(operationInProcess){
                    gameInfo.textContent='please wait for the ai to finish moving';
                }
                if(board1.player1Won || board1.player2Won || board1.tie){
                    gameInfo.textContent='the games has ended, you cannot move pieces';
                }
                else if(board1.tryToMove([i,j])){
                    drawMap();
                    updateInformation();
                    /// WE'LL START USING THE AI MACHINE
                    // if(board1.player1Won || board1.player2Won || board1.tie){
                    //     gameInfo.textContent='the game ended';
                    // }
                    // else{
                    //     wholeBody.style.backgroundColor = "red";
                    //     gameInfo.textContent='the AI is thinking now';
                    //     // let aiDecision=getNextMove(board1,1,0);
                    //     // board1.tryToMove(aiDecision);
                    //     let nextMove:number[]= getNextMove(board1,parseInt(difficultyLevel.value),parseInt(aiAgent.value));
                    //     console.log('difficulty and ai: '+difficultyLevel.value+aiAgent.value);
                    //     board1.tryToMove(nextMove);
                    //     wholeBody.style.backgroundColor = "blue";
                    // }
                    // operationInProcess=false;
                    // drawMap();
                    // updateInformation();
                }
                else{
                    console.log("movement not doable");
                    operationInProcess=false;
                    drawMap();
                    updateInformation();
                    if(board1.player1Turn){
                        console.log('p1 position: '+ board1.p1Position.toString());
                    }
                    else{
                        console.log('p2 position: '+ board1.p2Position.toString());
                    }
                }
            }
        })

        /////////////// only use this when testing functionality
        // button.addEventListener('click',()=>{
        //     if(board1.player1Won || board1.player2Won || board1.tie){
        //         gameInfo.textContent='the games has ended, you cannot move pieces';
        //     }
        //     else if(board1.tryToMove([i,j])){
        //         updateInformation();
        //         drawMap();
        //     }
        //     else{
        //         console.log("movement not doable");
        //         if(board1.player1Turn){
        //             console.log('p1 position: '+ board1.p1Position.toString());
        //         }
        //         else{
        //             console.log('p2 position: '+ board1.p2Position.toString());
        //         }
        //     }
        // })
        map?.appendChild(button);
    }
}

const testVar:number=2;

//this is created in mapReader
let mapWasCreated:boolean=false;
let board1:Board;
let initialBoard:Board;

// fileInput.addEventListener('click',()=>{
//     mapListWasSelected=false;
// });

testButton.addEventListener('click',()=>{
    runTest(parseInt(movementSpeed.value));
})

generateButton.addEventListener('click',()=>{
    // const selectedAction = difficultyLevel.value; // Get the selected action
    // const file = fileInput.files?.[0]; // Get the selected file
    console.log(`here in the generateButton`);
    generateMap();
    ///////////this will set the map to test 1
    // board1.state=state1;
    // board1.p1Position=pos1[0];
    // board1.p2Position=pos1[1];
    // initialBoard=board1.clone();
    // drawMap();
    // updateInformation();

    ///////////this will set the map to test 1
    // board1.state=s6;
    // board1.p1Position=pos6[0];
    // board1.p2Position=pos6[1];
    // initialBoard=board1.clone();
    // drawMap();
    // updateInformation();

    //////////////////////////////////////////////////////////////////
    // board1.state=s10;
    // board1.p1Position=pos10[0];
    // board1.p2Position=pos10[1];
    // board1.remainingMultiplierSpots=3;
    // board1.remainingPointSpots=3;
    // initialBoard=board1.clone();
    // drawMap();
    // updateInformation();
});
function generateMap(){
    gameStarted=false;
    mapWasCreated=true;
    board1=new Board();
    initialBoard=board1.clone();
    winner.textContent='no winner yet';
    // the map is drawn in mapReader.ts
    drawMap();
    updateInformation();
}

restartButton.addEventListener('click',()=>{
    board1=initialBoard.clone();
    winner.textContent='no winner yet';
    gameStarted=false;
    drawMap();
    updateInformation();
})

aiButton.addEventListener('click',()=>{
    if(operationInProcess || !board1.player1Turn){
        gameInfo.textContent='the player should move before we make the AI take a decision';
    }
    else if(board1.player1Won || board1.player2Won || board1.tie){
        gameInfo.textContent='the game ended';
    }
    else{
        operationInProcess=true;
        // wholeBody.style.backgroundColor = "red";
        gameInfo.textContent='the AI is thinking now';
        ////////////////////////////////////////////////////////////////////////////
        let nextMove:number[]= getNextMove(board1,parseInt(difficultyLevel.value),parseInt(aiAgent.value));
        console.log('difficulty and ai: '+difficultyLevel.value+aiAgent.value);
        board1.tryToMove(nextMove);
        // wholeBody.style.backgroundColor = "blue";
        operationInProcess=false;
        gameInfo.textContent='the AI decided';
        turnInfo.textContent='human player to move';
        drawMap();
        updateInformation();
        ////////////////////////////////////////////////////////////////////////////
    }
})

let gameStarted:boolean=false;
// beginButton.addEventListener('click',()=>beginFunction());

// function beginFunction() {
//     if(!gameStarted){
//         operationInProcess=true;
//         gameInfo.textContent='the AI is thinking now';
//         let nextMove:number[]= getNextMove(board1,parseInt(difficultyLevel.value),parseInt(aiAgent.value));
//         board1.tryToMove(nextMove);
//         operationInProcess=false;
//         turnInfo.textContent='player 2 turn';
//         gameInfo.textContent='player 2 to move';
//         drawMap();
//         updateInformation();
//         gameStarted=true;
//     }
//     else{
//         gameInfo.textContent=`the game has started, click the 'perform AI action' button pls`;
//     }
// }

const p1Score = document.getElementById('p1Score') as HTMLElement;
const p1Multiplier = document.getElementById('p1Multiplier') as HTMLElement;
const p2Score = document.getElementById('p2Score') as HTMLElement;
const p2Multiplier = document.getElementById('p2Multiplier') as HTMLElement;
const winner = document.getElementById('winner') as HTMLElement;
const totalMoves = document.getElementById('totalMoves') as HTMLElement;

const updateInformation=()=>{
    p1Score.textContent=board1.p1Score.toString();
    p1Multiplier.textContent=board1.p1Multiplier.toString();
    p2Score.textContent=board1.p2Score.toString();
    p2Multiplier.textContent=board1.p2Multiplier.toString();
    totalMoves.textContent=board1.currentTurn.toString();
    if(board1.player1Turn){
        turnInfo.textContent='player 1 turn';
        turnInfo.style.backgroundColor = "aqua";
        gameInfo.style.backgroundColor = "aqua";
        // wholeBody.style.backgroundColor = "blue";
        map.style.backgroundColor = "aqua";
    }
    else{
        turnInfo.textContent='player 2 turn';
        turnInfo.style.backgroundColor = "red";
        gameInfo.style.backgroundColor = "red";
        // wholeBody.style.backgroundColor = "red";
        map.style.backgroundColor = "red";
    }
    if(board1.player1Won){
        winner.textContent='player 1';
        gameInfo.textContent='THE GAME ENDED';
    }
    else if(board1.player2Won){
        winner.textContent='player 2';
        gameInfo.textContent='THE GAME ENDED';
    }
    else if(board1.tie){
        winner.textContent='the game ended in a tie';
        gameInfo.textContent='THE GAME ENDED';
    }
    else{
        winner.textContent='no winner yet';
    }
}