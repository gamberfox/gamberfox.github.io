import {movements} from "./t1Board.js";
export function minimax(board, isMax, level, h) {
    let answer;
    if (level === 0 || board.player1Won || board.player2Won || board.tie) {
        if (h === 0) {
            answer = board.getHeuristic1();
            return answer;
        }
        else {
            answer = board.getHeuristic2();
            return answer;
        }
    }
    else {
        if (board.player1Turn)
            answer = -2000;
        else
            answer = 2000;
        let positionToMove;
        for (let move of movements) {
            let auxBoard = board.clone();
            if (auxBoard.player1Turn)
                positionToMove =
                    [auxBoard.p1Position[0] + move[0], auxBoard.p1Position[1] + move[1]];
            else
                positionToMove =
                    [auxBoard.p2Position[0] + move[0], auxBoard.p2Position[1] + move[1]];
            if (positionToMove[0] < 0 || positionToMove[0] > 7 || positionToMove[1] < 0 || positionToMove[1] > 7) { }
            else if (auxBoard.tryToMove(positionToMove)) {
                let auxH;
                if (!auxBoard.player1Turn) {
                    auxH = minimax(auxBoard, true, level - 1, h);
                    if (auxH > answer)
                        answer = auxH;
                }
                else {
                    auxH = minimax(auxBoard, true, level - 1, h);
                    if (auxH < answer)
                        answer = auxH;
                }
            }
        }
        return answer;
    }
}
export function getNextMove(board, level, h) {
    let answer = [-1, -1];
    if (level <= 0 || board.player1Won || board.player2Won || board.tie) {
        return answer;
    }
    let heuristic;
    if (board.player1Turn)
        heuristic = -2000;
    else
        heuristic = 2000;
    let positionToMove;
    let auxH;
    for (let move of movements) {
        let auxBoard = board.clone();
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
                    answer = [...positionToMove];
                }
            }
            else {
                if (auxH < heuristic) {
                    heuristic = auxH;
                    answer = [...positionToMove];
                }
            }
        }
    }
    return answer;
}
