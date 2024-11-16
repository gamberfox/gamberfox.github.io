
let answer:number[]=[-1];
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

const STOP_POINT=100_000;
// let statSheet:StatSheet;


// Handle button click to perform the selected action
// beginButton.addEventListener('click', () => {
//     const startTime:number = performance.now();
//     // const selectedAction = actionSelect.value; // Get the selected action
//     const file = fileInput.files?.[0]; // Get the selected file
//     nutcrackerAudio.currentTime = 2;
//     if(!nutcrackerAudio.paused){
//         nutcrackerAudio.pause();
//         nutcrackerAudio.currentTime = 2;
//     }
//     if(!joySongAudio.paused){
//         joySongAudio.pause();
//         joySongAudio.currentTime=1;
//     }
//     if (file || mapListWasSelected) {
//         const reader = new FileReader(); // Create a new FileReader
//         statSheet=new StatSheet();
//         // algorithmUsed.textContent=selectedAction;
//         let aa:string='sd';
//         // switch (selectedAction) {
//         switch (aa) {
//             case 'avara':
//                 // Read and display the file content
//                 /* reader.onload = (e) => {
//                     fileContent.textContent = e.target?.result as string; // Display the file content
//                 }; */
//                 // answer=avaraSolver();
//                 console.log(`the avara algorithm was used`);
//                 break;

//             case 'aStar':
//                 // answer=aStarSolver();
//                 console.log(`the a star algorithm was used`);
//                 break;

//             case 'breadth':
//                 // answer=breadthSolver();
//                 console.log(`breadth case`);
//                 break;

//             case 'uniformCost':
//                 //reader.readAsDataURL(file); // Read the file as a data URL (for image preview)
//                 // answer=uniformCostSolver();
//                 console.log(`the uniform cost algoritm was used`);
//                 break;
//             case 'depthAvoidingCycles':
//                 // answer=depthSolver();
//                 console.log(`the depth algoritm was used`);
//                 break;
//             default:
//                 fileContent.textContent = 'Please select a valid action.';
//                 break;
//         }
//         console.log('------solveButton listener: this is the answer path reversed');
//         console.log(`${answer}`);
//         let newAnswer:number[]=[]
//         for(let direction of answer){
//             switch(direction){
//                 case RIGHT:
//                     newAnswer.push(LEFT);
//                     break;
//                 case UP:
//                     newAnswer.push(DOWN);
//                     break;
//                 case LEFT:
//                     newAnswer.push(RIGHT);
//                     break;
//                 case DOWN:
//                     newAnswer.push(UP);
//                     break;
//                 default:
//                     newAnswer.push(-1);
//             }
//         }
//         // answer=newAnswer;
//         // statSheet.computeTime=performance.now()- startTime;
//         // nodeDepth.textContent=statSheet.nodeDepth.toString();
//         // answerNodeDepth.textContent=statSheet.answerNodeDepth.toString();
//         // listLength.textContent=statSheet.listLength.toString();
//         // expandedNodes.textContent=statSheet.expandedNodes.toString();
//         // exploredNodes.textContent=statSheet.exploredNodes.toString();
//         // computeTime.textContent=statSheet.computeTime.toString();
        
//         //console.log(answer);
//         // if(newAnswer[0]===-1) {console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nNO ANSWER WAS FOUND, I LIED");
//         //     solutionCost.textContent='no solution was found';
//         //     if(!sadTromboneAudio.paused){
//         //         sadTromboneAudio.pause();
//         //         sadTromboneAudio.currentTime=0;
//         //     }
//         //     sadTromboneAudio.play();
//         // }
//         // else{
//         //     solutionCost.textContent=statSheet.solutionCost.toString();
//         //     if(!partyHornAudio.paused){
//         //         partyHornAudio.pause();
//         //         partyHornAudio.currentTime=0;
//         //     }
//         //     partyHornAudio.play();
//         // }
        
//         reader.onerror = () => {
//             fileContent.textContent = 'Error reading file!';
//         };
//     } else {
//         fileContent.textContent = 'No file selected.';
//     }
// });


class StatSheet{
    p1Points:number=0;
    p1Multiplier:number=1;
    p2Points:number=0;
    p2Multiplier:number=0;
    winner:string='no winner yet';
}