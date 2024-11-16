"use strict";
class Tree {
    root;
    leafs = [];
    constructor(root) {
        this.root = root.clone();
        for (let x of movements) {
            let newBoard = this.root.clone();
            if (newBoard.tryToMove([board.p1Position[0] + x[0], board.p1Position[1] + x[1]])) {
                this.leafs.push(newBoard);
            }
            else {
                this.leafs.push(null);
            }
        }
    }
    clone() {
        let newTree = new Tree(this.root);
        for (let i = 0; i < 8; i + 1) {
            newTree.leafs[i] = (this.leafs[i] ? this.leafs[i].clone() : null);
        }
        return newTree;
    }
    getMove(board, h) {
        return [0, 0];
    }
}
function minimax(board, isMax, level, h) {
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
function getNextMove(board, level, h) {
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
                    console.log('---------------');
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
