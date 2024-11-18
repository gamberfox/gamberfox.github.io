
import {Board,movements} from "./t1Board.js";
import {getNextMove} from "./t1Minimax.js";
import {s1,p1,s2,p2} from "./t1States.js";
// import Board from "./t1Board.js";
let s11 = [
    [[0, 0], [0, 0], [1, 8], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
    [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
    [[2, 2], [0, 0], [1, 9], [2, 2], [1, 4], [3, 0], [0, 0], [1, 10]],
    [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
    [[0, 0], [4, 0], [1, 5], [1, 6], [0, 0], [0, 0], [0, 0], [0, 0]],
    [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [1, 2], [0, 0]],
    [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [1, 7], [0, 0], [1, 1]],
    [[0, 0], [2, 2], [0, 0], [0, 0], [0, 0], [0, 0], [2, 2], [1, 3]]
];
let t1 = new Board();
// console.log(test1.getBoardState());
// minimax(board, true, 0, 0);
let decision=getNextMove(t1,2,0);
console.log(decision);
for(let row of t1.state){
    let r='[';
    for(let p of row){
        r+=('['+p.toString()+'],');
    }
    r+='],'
    console.log(r);
}


function runTest(p1,p1Difficulty,p2,p2Difficulty){
    let b= new Board();
}

console.log('-------------------------------')
const grid = Array.from({ length: 8 }, () => Array(8).fill(0));
let top=(5>4)?0:3;let bottom=6;let left=0;let right=6;let numberToSum=0;
let num=0;
let counter=0;
while(top<=bottom && left <=right){
    counter++;
    for(let col=left;col<=right;col++){
        grid[top][col]=num++;
    }
    top++;
    // Fill right column
    for (let row = top; row <= bottom; row++) {
        grid[row][right] = num++;
    }
    right--;

    // Fill bottom row
    if (top <= bottom) {
        for (let col = right; col >= left; col--) {
            grid[bottom][col] = num++;
        }
        bottom--;
    }
    
    // Fill left column
    if (left <= right) {
        for (let row = bottom; row >= top; row--) {
            grid[row][left] = num++;
        }
        left++;
    }
    if(counter>1)break;
}

let rr='[';
for(let row of board.state){
    let r='[';
    for(let p of row){
        r+=('['+p.toString()+'],');
    }
    r+='],'
    console.log(r);
    rr+=r;
}
rr+=']';
console.log(rr);
console.log(counter);
console.log(num);