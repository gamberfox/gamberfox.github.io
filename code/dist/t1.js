
import {Board,movements} from "./t1Board.js";
import {getNextMove} from "./t1Minimax.js";
// import Board from "./t1Board.js";
let s1 = [
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


function runT1(){
    let b1= new Board();
    //this will set the map to test 1
    b1.state=s1;
    b1.p1Position=[2,5];
    b1.p2Position=[4,1];
}