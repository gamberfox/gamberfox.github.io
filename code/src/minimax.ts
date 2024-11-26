function minimax(boardChosen:Board,isMax:boolean,level:number,h:number):number{
    let answer:number;
    if(level===0 || boardChosen.player1Won || boardChosen.player2Won || boardChosen.tie){
        return boardChosen.getHeuristic(h);
    }
    // when we only want 1 level
    // "movements" comes from the 'Board.ts' file
    else{
        if(boardChosen.player1Turn)answer=-2_000_000;
        else answer=2_000_000;

        let positionToMove:number[];
        for(let move of movements){
            let auxBoard:Board=boardChosen.clone();
            if(auxBoard.player1Turn)positionToMove=
            [auxBoard.p1Position[0]+move[0],auxBoard.p1Position[1]+move[1]];
            else positionToMove=
            [auxBoard.p2Position[0]+move[0],auxBoard.p2Position[1]+move[1]];

            // this means the position is illegal
            if(positionToMove[0]<0 || positionToMove[0]>7 ||positionToMove[1]<0 || positionToMove[1]>7){}
            else if(auxBoard.tryToMove(positionToMove)){
                let auxH:number;
                auxH=minimax(auxBoard,true,level-1,h);
                //it's the turn of player 2 since we move, but we still need to
                // find the best option for player 1
                if(!auxBoard.player1Turn){
                    // auxH=minimax(auxBoard,true,level-1,h);
                    if(auxH>answer){
                        answer=auxH;
                    }
                }
                else{
                    // auxH=minimax(auxBoard,true,level-1,h);
                    if(auxH<answer){
                        answer=auxH;
                    }
                }
            }
        }
        return answer;
    }
}

function getNextMove(boardChosen:Board,level:number,h:number):number[] {
    let answer:number[]=[-1,-1];
    // if(level<0 || boardChosen.player1Won || boardChosen.player2Won || boardChosen.tie){
    if(level<0){
       return answer; 
    }
    let heuristic:number;
    if(boardChosen.player1Turn)heuristic=-2_000_000;
    else heuristic=2_000_000;
    let positionToMove:number[];
    let auxH:number;
    for(let move of movements){
        let auxBoard:Board=boardChosen.clone();
        if(auxBoard.player1Turn)positionToMove=
        [auxBoard.p1Position[0]+move[0],auxBoard.p1Position[1]+move[1]];
        else positionToMove=
        [auxBoard.p2Position[0]+move[0],auxBoard.p2Position[1]+move[1]];
        // this means the position is illegal
        if(positionToMove[0]<0 || positionToMove[0]>7 ||positionToMove[1]<0 || positionToMove[1]>7){}
        else if(auxBoard.tryToMove(positionToMove)){
            auxH=minimax(auxBoard,true,level,h);
            // console.log('current answer: '+answer+'  with h=== '+heuristic);
            // console.log('next move: '+positionToMove+'  with h==='+auxH);
            if(!auxBoard.player1Turn){
                // if(auxBoard.player1Won){
                //     return [positionToMove[0],positionToMove[1]];
                // }
                if(auxH>heuristic){
                    heuristic=auxH;
                    answer=[positionToMove[0],positionToMove[1]];
                }
            }
            else{
                if(auxH<heuristic){
                    heuristic=auxH;
                    answer=[positionToMove[0],positionToMove[1]];
                }
            }
        }
    }
    console.log('chosen move was '+answer);
    return answer;
}
