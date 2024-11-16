


class Tree{
    root:Board;
    leafs:(Board|null)[]=[];

    constructor(root:Board){
        this.root=root.clone();
        for(let x of movements){
            let newBoard:Board=this.root.clone();
            if(newBoard.tryToMove([board.p1Position[0]+x[0],board.p1Position[1]+x[1]])){
                this.leafs.push(newBoard);
            }
            else{
                this.leafs.push(null);
            }
        }
    }
    clone(): Tree {
        let newTree = new Tree(this.root);
        
        // Assuming Board has a similar clone or deep copy method
        for(let i:number=0;i<8;i+1){
            newTree.leafs[i]=(this.leafs[i] ? this.leafs[i].clone() : null);
        }
        return newTree;
    }
    getMove(board:Board,h:number):number[]{
        return [0,0];
    }
}

function minimax(board:Board,isMax:boolean,level:number,h:number):number{
    let answer:number;
    if(level===0 || board.player1Won || board.player2Won || board.tie){
        if(h===0){
            answer=board.getHeuristic1();
            return answer;
        }
        else{
            answer=board.getHeuristic2();
            return answer;
        }
    }
    // when we only want 1 level
    // "movements" comes from the 'Board.ts' file
    else{
        if(board.player1Turn)answer=-2000;
        else answer=2000;

        let positionToMove:number[];
        for(let move of movements){
            let auxBoard:Board=board.clone();
            if(auxBoard.player1Turn)positionToMove=
            [auxBoard.p1Position[0]+move[0],auxBoard.p1Position[1]+move[1]];
            else positionToMove=
            [auxBoard.p2Position[0]+move[0],auxBoard.p2Position[1]+move[1]];

            // this means the position is illegal
            if(positionToMove[0]<0 || positionToMove[0]>7 ||positionToMove[1]<0 || positionToMove[1]>7){}
            else if(auxBoard.tryToMove(positionToMove)){
                let auxH:number;
                // if(h===0){
                    if(!auxBoard.player1Turn){
                        auxH=minimax(auxBoard,true,level-1,h);
                        if(auxH>answer)answer=auxH;
                    }
                    else{
                        auxH=minimax(auxBoard,true,level-1,h);
                        if(auxH<answer)answer=auxH;
                    }
            }
        }
        return answer;
    }
}

function getNextMove(board:Board,level:number,h:number):number[] {
    let answer:number[]=[-1,-1];
    if(level<=0 || board.player1Won || board.player2Won || board.tie){
       return answer; 
    }
    let heuristic:number;
    if(board.player1Turn)heuristic=-2000;
    else heuristic=2000;
    let positionToMove:number[];
    let auxH:number;
    // console.log('p1 position'+board.p1Position);
    for(let move of movements){
        // console.log('before cloning')
        // console.log(board.p1Position);
        let auxBoard:Board=board.clone();
        // console.log(board.p1Position);
        if(auxBoard.player1Turn)positionToMove=
        [auxBoard.p1Position[0]+move[0],auxBoard.p1Position[1]+move[1]];
        else positionToMove=
        [auxBoard.p2Position[0]+move[0],auxBoard.p2Position[1]+move[1]];
        // console.log('before moving');
        // console.log(board.p1Position);
        // this means the position is illegal
        if(positionToMove[0]<0 || positionToMove[0]>7 ||positionToMove[1]<0 || positionToMove[1]>7){}
        else if(auxBoard.tryToMove(positionToMove)){
            // console.log(board.p1Position);
            // console.log('enter minimax');
            // console.log(heuristic.toString());
            auxH=minimax(auxBoard,true,level,h);
            if(!auxBoard.player1Turn){
                if(auxH>heuristic){
                    heuristic=auxH;
                    answer=[...positionToMove];
                    console.log('---------------');
                }
            }
            else{
                if(auxH<heuristic){
                    heuristic=auxH;
                    answer=[...positionToMove];
                }
            }
        }
    }
    return answer;
}
