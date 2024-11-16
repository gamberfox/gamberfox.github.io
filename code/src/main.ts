// Get references to the DOM elements
const fileInput = document.getElementById('fileInput') as HTMLInputElement;
const fileContent = document.getElementById('fileContent') as HTMLElement;

const aiAgent = document.getElementById('aiAgent') as HTMLSelectElement;
const difficultyLevel = document.getElementById('difficultyLevel') as HTMLSelectElement;

const generateButton=document.getElementById('generateButton') as HTMLButtonElement;
const restartButton = document.getElementById('restartButton') as HTMLButtonElement;
const beginButton = document.getElementById('beginButton') as HTMLButtonElement;


const mapInfo = document.getElementById('mapInfo') as HTMLPreElement | null;
const turnInfo = document.getElementById('turnInfo') as HTMLPreElement;
const gameInfo = document.getElementById('gameInfo') as HTMLPreElement;

//delete????????????
//const answer=document.getElementById('mapInfo') as HTMLPreElement;

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
                operationInProcess=true;
                if(board.player1Won || board.player2Won || board.tie){
                    gameInfo.textContent='the games has ended, you cannot move pieces';
                }
                else if(board.tryToMove([i,j])){
                    drawMap();
                    updateInformation();


                    /// WE'LL START USING THE MACHINE
                    if(board.player1Won || board.player2Won || board.tie){
                        gameInfo.textContent='the game ended';
                    }
                    else{
                        wholeBody.style.backgroundColor = "red";
                        gameInfo.textContent='the AI is thinking now';
                        // let aiDecision=getNextMove(board,1,0);
                        // board.tryToMove(aiDecision);
                        let nextMove:number[]= getNextMove(board,parseInt(difficultyLevel.value),parseInt(aiAgent.value));
                        console.log('difficulty and ai: '+difficultyLevel.value+aiAgent.value);
                        board.tryToMove(nextMove);
                        wholeBody.style.backgroundColor = "blue";
                    }
                    operationInProcess=false;
                    drawMap();
                    updateInformation();
                }
                else{
                    console.log("movement not doable");
                    operationInProcess=false;
                    if(board.player1Turn){
                        console.log('p1 position: '+ board.p1Position.toString());
                    }
                    else{
                        console.log('p2 position: '+ board.p2Position.toString());
                    }
                }
            }
            /////////////////////////////////////////////////////////
            //--------------now it's the AI's turn---------------///
            ///////////////////////////////////////////////////////
        })

        /////////////// only use this when testing functionality
        // button.addEventListener('click',()=>{
        //     if(board.player1Won || board.player2Won || board.tie){
        //         gameInfo.textContent='the games has ended, you cannot move pieces';
        //     }
        //     else if(board.tryToMove([i,j])){
        //         updateInformation();
        //         drawMap();
        //     }
        //     else{
        //         console.log("movement not doable");
        //         if(board.player1Turn){
        //             console.log('p1 position: '+ board.p1Position.toString());
        //         }
        //         else{
        //             console.log('p2 position: '+ board.p2Position.toString());
        //         }
        //     }
        // })
        map?.appendChild(button);
    }
}

const testVar:number=2;

//this is created in mapReader
let robot:Robot;
let mapWasCreated:boolean=false;
let board:Board;
let initialBoard:Board;

// Listen for changes in the file category (first panel)
// aiAgent.addEventListener('change', (event) => {
//     const selectedCategory = (event.target as HTMLSelectElement).value;
//     updateActionOptions(selectedCategory);
// });

fileInput.addEventListener('click',()=>{
    mapListWasSelected=false;
});

let nn1:Board;
let nn2:Board;
generateButton.addEventListener('click',()=>{
    const selectedAction = difficultyLevel.value; // Get the selected action
    const file = fileInput.files?.[0]; // Get the selected file
    console.log(`here in the generateButton`);
    board=new Board();
    initialBoard=board.clone();
    winner.textContent='no winner yet';
    // the map is drawn in mapReader.ts
    drawMap();
    //it's drawn in mapreader.ts


    //this will set the map to test 1
    // board.state=state1;
    // board.p1Position=[2,5];
    // board.p2Position=[4,1];
    // initialBoard=board.clone();
    // drawMap();
});

restartButton.addEventListener('click',()=>{
    board=initialBoard.clone();
    winner.textContent='no winner yet';
    gameStarted=false;
    drawMap();
    updateInformation();
})

let gameStarted:boolean=false;
beginButton.addEventListener('click',()=>beginFunction());

function beginFunction() {
    if(!gameStarted){
        operationInProcess=true;
        gameInfo.textContent='the AI is thinking now';
        let nextMove:number[]= getNextMove(board,parseInt(difficultyLevel.value),parseInt(aiAgent.value));
        board.tryToMove(nextMove);
        operationInProcess=false;
        turnInfo.textContent='player 2 turn';
        gameInfo.textContent='player 2 to move';
        drawMap();
        updateInformation();
    }
    else{
    }
}


const p1Score = document.getElementById('p1Score') as HTMLElement;
const p1Multiplier = document.getElementById('p1Multiplier') as HTMLElement;
const p2Score = document.getElementById('p2Score') as HTMLElement;
const p2Multiplier = document.getElementById('p2Multiplier') as HTMLElement;
const winner = document.getElementById('winner') as HTMLElement;

const updateInformation=()=>{
    p1Score.textContent=board.p1Score.toString();
    p1Multiplier.textContent=board.p1Multiplier.toString();
    p2Score.textContent=board.p2Score.toString();
    p2Multiplier.textContent=board.p2Multiplier.toString();
    if(board.player1Turn){
        turnInfo.textContent='player 1 turn';
    }
    else{
        turnInfo.textContent='player 2 turn';
    }
    if(board.remainingPointSpots===0){
        if(board.p1Score>board.p2Score){
            board.player1Won=true;
        }
        else if(board.p2Score>board.p1Score){
            board.player2Won=true;
        }
        else{
            board.tie=true;
        }
    }
    if(board.player1Won){
        winner.textContent='player 1';
    }
    else if(board.player2Won){
        winner.textContent='player 2';
    }
    else if(board.tie){
        winner.textContent='the game ended in a tie';
    }
    else{
        winner.textContent='no winner yet';
    }
}

