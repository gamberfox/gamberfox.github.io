
let answer:number[]=[-33];
const RIGHT:number=0;
const UP:number=1;
const LEFT:number=2;
const DOWN:number=3;
const travelCost:{[key: string]:number}={[FREE_CELL.toString()]:1,
    [(VEHICLE).toString()]:1,
    [(MEDIUM_TRAFFIC).toString()]:4,
    [(HEAVY_TRAFFIC).toString()]:7,
    [(PASSENGER).toString()]:1,
    [(DESTINATION).toString()]:1
};

const STOP_POINT=1_000_000;
let statSheet:StatSheet;
const algorithmUsed = document.getElementById('algorithmUsed') as HTMLElement;
const expandedNodes = document.getElementById('expandedNodes') as HTMLElement;
const nodeDepth = document.getElementById('nodeDepth') as HTMLElement;
const computeTime = document.getElementById('computeTime') as HTMLElement;
const solutionCost = document.getElementById('solutionCost') as HTMLElement;

// Handle button click to perform the selected action
solveButton.addEventListener('click', () => {
    const startTime:number = performance.now();
    const selectedAction = actionSelect.value; // Get the selected action
    const file = fileInput.files?.[0]; // Get the selected file
    console.log(`here`);
    nutcrackerAudio.currentTime = 2;
    if(!nutcrackerAudio.paused){
        nutcrackerAudio.pause();
        nutcrackerAudio.currentTime = 2;
    }
    if(!joySongAudio.paused){
        joySongAudio.pause();
        joySongAudio.currentTime=1;
    }
    if (file || mapListWasSelected) {
        const reader = new FileReader(); // Create a new FileReader
        statSheet=new StatSheet();
        algorithmUsed.textContent=selectedAction;
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
                answer=breadthSolver();
                console.log(`breadth case`);
                break;

            case 'uniformCost':
                //reader.readAsDataURL(file); // Read the file as a data URL (for image preview)
                answer=uniformCostSolver();
                console.log(`the uniform cost algoritm was used`);
                break;
            case 'depthAvoidingCycles':
                answer=depthSolver();
                console.log(`the depth algoritm was used`);
                break;
            default:
                fileContent.textContent = 'Please select a valid action.';
                break;
        }
        console.log('solveButton listener');
        console.log(`${answer}`);
        let newAnswer:number[]=[]
        for(let direction of answer){
            switch(direction){
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
        answer=newAnswer;
        statSheet.computeTime=performance.now()- startTime;
        nodeDepth.textContent=statSheet.nodeDepth.toString();
        expandedNodes.textContent=statSheet.expandedNodes.toString();
        computeTime.textContent=statSheet.computeTime.toString();
        console.log(answer);
        if(newAnswer[0]===-1) {console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nNO ANSWER WAS FOUND, I LIED");
            solutionCost.textContent='no solution was found';
            if(!sadTromboneAudio.paused){
                sadTromboneAudio.pause();
                sadTromboneAudio.currentTime=0;
            }
            sadTromboneAudio.play();
        }
        else{
            solutionCost.textContent=statSheet.solutionCost.toString();
            if(!partyHornAudio.paused){
                partyHornAudio.pause();
                partyHornAudio.currentTime=0;
            }
            partyHornAudio.play();
        }
        
        reader.onerror = () => {
            fileContent.textContent = 'Error reading file!';
        };
    } else {
        fileContent.textContent = 'No file selected.';
    }
});

class MazePosition{
    x:number;
    y:number;
    cellType:number;
    nodeDepth:number;
    //pos0=y,pos1=x,pos2=x+y.
    //radarDistance:number;
    lDistance:number=0;
    travelCost:number=0;
    visited:boolean=false;
    visitedNodes:Set<string>=new Set();
    visitedNodes2:Set<string>=new Set();
    foundPassenger:boolean;
    foundPassengerThisRound:boolean=false;
    
    father:MazePosition|null=null;
    pathToFather:number|null=null;
    pathHome:number[]=[];

    //the taxi can go to a maximum of 4 directions
    rightChild:MazePosition|null=null;
    upChild:MazePosition|null=null;
    leftChild:MazePosition|null=null;
    downChild:MazePosition|null=null;
    constructor(posX:number,posY:number,cellType:number,nodeDepth:number,foundPassenger:boolean){
        this.x=posX;
        this.y=posY;
        this.cellType=cellType;
        this.nodeDepth=nodeDepth;
        this.foundPassenger=foundPassenger;
        //this.radarDistance=[posX,posY,0];
    }
}

class StatSheet{
    expandedNodes:number=0;
    nodeDepth:number=0;
    computeTime:number=0;
    solutionCost:number=0;
}