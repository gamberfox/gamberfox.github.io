"use strict";
function minimax(boardChosen, isMax, level, h) {
    let answer;
    if (level === 0 || boardChosen.player1Won || boardChosen.player2Won || boardChosen.tie) {
        return boardChosen.getHeuristic(h);
    }
    else {
        if (boardChosen.player1Turn)
            answer = -2_000_000;
        else
            answer = 2_000_000;
        let positionToMove;
        for (let move of movements) {
            let auxBoard = boardChosen.clone();
            if (auxBoard.player1Turn)
                positionToMove =
                    [auxBoard.p1Position[0] + move[0], auxBoard.p1Position[1] + move[1]];
            else
                positionToMove =
                    [auxBoard.p2Position[0] + move[0], auxBoard.p2Position[1] + move[1]];
            if (positionToMove[0] < 0 || positionToMove[0] > 7 || positionToMove[1] < 0 || positionToMove[1] > 7) { }
            else if (auxBoard.tryToMove(positionToMove)) {
                let auxH;
                auxH = minimax(auxBoard, true, level - 1, h);
                if (!auxBoard.player1Turn) {
                    if (auxH > answer) {
                        answer = auxH;
                    }
                }
                else {
                    if (auxH < answer) {
                        answer = auxH;
                    }
                }
            }
        }
        return answer;
    }
}
function getNextMove(boardChosen, level, h) {
    let answer = [-1, -1];
    if (level < 0) {
        return answer;
    }
    let heuristic;
    if (boardChosen.player1Turn)
        heuristic = -2_000_000;
    else
        heuristic = 2_000_000;
    let positionToMove;
    let auxH;
    for (let move of movements) {
        let auxBoard = boardChosen.clone();
        if (auxBoard.player1Turn)
            positionToMove =
                [auxBoard.p1Position[0] + move[0], auxBoard.p1Position[1] + move[1]];
        else
            positionToMove =
                [auxBoard.p2Position[0] + move[0], auxBoard.p2Position[1] + move[1]];
        if (positionToMove[0] < 0 || positionToMove[0] > 7 || positionToMove[1] < 0 || positionToMove[1] > 7) { }
        else if (auxBoard.tryToMove(positionToMove)) {
            auxH = minimax(auxBoard, true, level, h);
            if (!auxBoard.player1Turn) {
                if (auxH > heuristic) {
                    heuristic = auxH;
                    answer = [positionToMove[0], positionToMove[1]];
                }
            }
            else {
                if (auxH < heuristic) {
                    heuristic = auxH;
                    answer = [positionToMove[0], positionToMove[1]];
                }
            }
        }
    }
    console.log('chosen move was ' + answer);
    return answer;
}
