function minimax(board:Board,isMax:boolean,level:number,h:number):number{
    let answer:number;
    if(level===0 || board.player1Won || board.player2Won || board.tie){
        answer=board.getHeuristic(h);
        return answer;
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
    for(let move of movements){
        let auxBoard:Board=board.clone();
        if(auxBoard.player1Turn)positionToMove=
        [auxBoard.p1Position[0]+move[0],auxBoard.p1Position[1]+move[1]];
        else positionToMove=
        [auxBoard.p2Position[0]+move[0],auxBoard.p2Position[1]+move[1]];
        // this means the position is illegal
        if(positionToMove[0]<0 || positionToMove[0]>7 ||positionToMove[1]<0 || positionToMove[1]>7){}
        else if(auxBoard.tryToMove(positionToMove)){
            auxH=minimax(auxBoard,true,level,h);
            if(!auxBoard.player1Turn){
                if(auxH>heuristic){
                    heuristic=auxH;
                    answer=[...positionToMove];
                    // console.log('---------------');
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
