"use strict";
let spaces = [
    [3, 0], [4, 0],
    [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10],
    [2, 2], [2, 2], [2, 2], [2, 2],
    [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
    [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
    [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
    [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
    [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]
];
let movements = [
    [2, 1], [1, 2], [-1, 2], [-2, 1],
    [-2, -1], [-1, -2], [1, -2], [2, -1]
];
const getSpaces = () => {
    let newSpaces = [];
    for (let x of spaces) {
        newSpaces.push([...x]);
    }
    return newSpaces;
};
class Board {
    player1Turn = true;
    player1Won = false;
    player2Won = false;
    tie = false;
    state = [];
    currentTurn = 0;
    remainingPointSpots = 0;
    remainingMultiplierSpots = 0;
    p1Score = 0;
    p2Score = 0;
    p1Helper = 0;
    p2Helper = 0;
    p1Helper2 = 0;
    p2Helper2 = 0;
    p1Multiplier = 1;
    p2Multiplier = 1;
    p1Position = [0, 0];
    p2Position = [0, 0];
    constructor() {
        this.generateMap();
    }
    getHeuristic(utilityFunction) {
        let h = 0;
        if (this.player1Won) {
            h += 2_000_000;
            h += this.p1Score - this.p2Score;
            h -= this.currentTurn * 100;
            return h;
        }
        else if (this.player2Won) {
            h -= 2_000_000;
            h += this.p1Score - this.p2Score;
            h += this.currentTurn * 100;
            return h;
        }
        else if (this.tie)
            return 0;
        else if (utilityFunction === 0) {
            h += this.auxH2();
        }
        else if (utilityFunction === 1) {
            h += this.auxH3();
        }
        h += this.auxH1();
        h += this.auxH4();
        h += this.auxPlayerCloseness();
        h += (this.p1Score) * 1000;
        h += (this.p1Multiplier) * 100;
        h -= (this.p2Score) * 1000;
        h -= (this.p2Multiplier) * 100;
        return h;
    }
    getHeuristic1() {
        let h = 0;
        if (this.player1Won)
            return 1000;
        else if (this.player2Won)
            return -1000;
        else if (this.tie)
            return 0;
        else
            return this.p1Score - this.p2Score;
    }
    getHeuristic2() {
        let h = 0;
        if (this.player1Won)
            return 1000;
        else if (this.player2Won)
            return -1000;
        else if (this.tie)
            return 0;
        else {
            if (this.p1Multiplier === 2)
                h += 3;
            if (this.p2Multiplier === 2)
                h -= 3;
            h += this.p1Score;
            h -= this.p2Score;
            return h;
        }
    }
    tryToMove(position) {
        if (this.player1Won || this.player2Won || this.tie) {
            return false;
        }
        for (let x of movements) {
            if (this.player1Turn) {
                if ((this.p1Position[0] + x[0]) === position[0] &&
                    (this.p1Position[1] + x[1]) === position[1]) {
                    if (position[0] === this.p2Position[0]
                        && position[1] === this.p2Position[1]) {
                        return false;
                    }
                    else {
                        this.p1Helper += 1;
                        this.state[this.p1Position[0]][this.p1Position[1]] = [0, 0];
                        if (this.state[position[0]][position[1]][0] === 1) {
                            let points = this.state[position[0]][position[1]][1];
                            this.p1Score += points * this.p1Multiplier;
                            this.p1Multiplier = 1;
                            this.remainingPointSpots -= 1;
                            this.updateInfo();
                            this.p1Helper2 += this.p1Helper + points * this.p1Multiplier;
                            this.p1Helper = 0;
                        }
                        else if (this.state[position[0]][position[1]][0] === 2) {
                            this.p1Multiplier = this.state[position[0]][position[1]][1];
                            this.remainingMultiplierSpots -= 1;
                            this.p1Helper2 += this.p1Helper;
                            this.p1Helper = 0;
                        }
                        this.state[this.p1Position[0] + x[0]][this.p1Position[1] + x[1]][0] = 3;
                        this.state[this.p1Position[0] + x[0]][this.p1Position[1] + x[1]][1] = 0;
                        this.p1Position[0] += x[0];
                        this.p1Position[1] += x[1];
                        this.player1Turn = false;
                        this.currentTurn++;
                        return true;
                    }
                }
            }
            else {
                if ((this.p2Position[0] + x[0]) === position[0] &&
                    (this.p2Position[1] + x[1]) === position[1]) {
                    if (position[0] === this.p1Position[0]
                        && position[1] === this.p1Position[1]) {
                        return false;
                    }
                    else {
                        this.p2Helper += 1;
                        this.state[this.p2Position[0]][this.p2Position[1]] = [0, 0];
                        if (this.state[position[0]][position[1]][0] === 1) {
                            let points = this.state[position[0]][position[1]][1];
                            this.p2Score += points * this.p2Multiplier;
                            this.p2Multiplier = 1;
                            this.remainingPointSpots -= 1;
                            this.updateInfo();
                            this.p2Helper2 += this.p2Helper + points * this.p2Multiplier;
                            this.p2Helper = 0;
                        }
                        if (this.state[position[0]][position[1]][0] === 2) {
                            this.p2Multiplier = this.state[position[0]][position[1]][1];
                            this.remainingMultiplierSpots -= 1;
                        }
                        this.state[this.p2Position[0] + x[0]][this.p2Position[1] + x[1]][0] = 4;
                        this.state[this.p2Position[0] + x[0]][this.p2Position[1] + x[1]][1] = 0;
                        this.p2Position[0] += x[0];
                        this.p2Position[1] += x[1];
                        this.player1Turn = true;
                        this.currentTurn++;
                        return true;
                    }
                }
            }
        }
        return false;
    }
    updateInfo() {
        if (this.remainingPointSpots === 0) {
            if (this.p1Score > this.p2Score) {
                this.player1Won = true;
            }
            else if (this.p2Score > this.p1Score) {
                this.player2Won = true;
            }
            else {
                this.tie = true;
            }
        }
    }
    generateMap() {
        let spaces = getSpaces();
        let newMap = [];
        for (let i = 0; i < 8; i++) {
            newMap.push([]);
        }
        this.remainingPointSpots = 0;
        this.remainingMultiplierSpots = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let choice = Math.floor(Math.random() * (spaces.length));
                newMap[i].push([...spaces[choice]]);
                if (spaces[choice][0] === 1) {
                    this.remainingPointSpots += 1;
                }
                else if (spaces[choice][0] === 2) {
                    this.remainingMultiplierSpots += 1;
                }
                else if (spaces[choice][0] === 3) {
                    this.p1Position = [i, j];
                }
                else if (spaces[choice][0] === 4) {
                    this.p2Position = [i, j];
                }
                spaces.splice(choice, 1);
            }
        }
        this.state = newMap;
        return newMap;
    }
    getBoardState() {
        let board = this.clone();
        return board.state;
    }
    clone() {
        let newBoard = new Board();
        for (let i in newBoard.state) {
            for (let j in newBoard.state[i]) {
                newBoard.state[i][j][0] = this.state[i][j][0];
                newBoard.state[i][j][1] = this.state[i][j][1];
            }
        }
        newBoard.currentTurn = this.currentTurn;
        newBoard.player1Turn = this.player1Turn;
        newBoard.player1Won = this.player1Won;
        newBoard.player2Won = this.player2Won;
        newBoard.tie = this.tie;
        newBoard.remainingPointSpots = this.remainingPointSpots;
        newBoard.remainingMultiplierSpots = this.remainingMultiplierSpots;
        newBoard.p1Score = this.p1Score;
        newBoard.p2Score = this.p2Score;
        newBoard.p1Helper = this.p1Helper;
        newBoard.p2Helper = this.p2Helper;
        newBoard.p1Helper2 = this.p1Helper2;
        newBoard.p2Helper2 = this.p2Helper2;
        newBoard.p1Multiplier = this.p1Multiplier;
        newBoard.p2Multiplier = this.p2Multiplier;
        newBoard.p1Position[0] = this.p1Position[0];
        newBoard.p1Position[1] = this.p1Position[1];
        newBoard.p2Position[0] = this.p2Position[0];
        newBoard.p2Position[1] = this.p2Position[1];
        return newBoard;
    }
    aux1Moves = [[0, 2], [-2, 0], [0, -2], [2, 0]];
    aux2Moves = [[-1, 1], [-1, -1], [1, -1], [1, 1]];
    auxH1() {
        let h = 0;
        let pos;
        let numberToSum = 10;
        let multiplier = 4;
        for (let move of this.aux1Moves) {
            pos = [this.p1Position[0] + move[0], this.p1Position[1] + move[1]];
            if (pos[0] >= 0 && pos[0] <= 7 && pos[1] >= 0 && pos[1] <= 7) {
                if (this.state[pos[0]][pos[1]][0] === 1) {
                    h += numberToSum * multiplier * 2;
                    break;
                }
            }
        }
        for (let move of this.aux1Moves) {
            pos = [this.p2Position[0] + move[0], this.p2Position[1] + move[1]];
            if (pos[0] >= 0 && pos[0] <= 7 && pos[1] >= 0 && pos[1] <= 7) {
                if (this.state[pos[0]][pos[1]][0] === 1) {
                    h -= numberToSum * multiplier * 2;
                    break;
                }
            }
        }
        for (let move of this.aux2Moves) {
            pos = [this.p1Position[0] + move[0], this.p1Position[1] + move[1]];
            if (pos[0] >= 0 && pos[0] <= 7 && pos[1] >= 0 && pos[1] <= 7) {
                if (this.state[pos[0]][pos[1]][0] === 1) {
                    h += numberToSum * multiplier;
                    break;
                }
            }
        }
        for (let move of this.aux2Moves) {
            pos = [this.p2Position[0] + move[0], this.p2Position[1] + move[1]];
            if (pos[0] >= 0 && pos[0] <= 7 && pos[1] >= 0 && pos[1] <= 7) {
                if (this.state[pos[0]][pos[1]][0] === 1) {
                    h -= numberToSum * multiplier;
                    break;
                }
            }
        }
        for (let move of movements) {
            pos = [this.p1Position[0] + move[0], this.p1Position[1] + move[1]];
            if (pos[0] >= 0 && pos[0] <= 7 && pos[1] >= 0 && pos[1] <= 7) {
                if (this.state[pos[0]][pos[1]][0] === 1) {
                    h += (numberToSum + this.state[pos[0]][pos[1]][1]) * numberToSum * multiplier;
                    break;
                }
            }
        }
        for (let move of movements) {
            pos = [this.p2Position[0] + move[0], this.p2Position[1] + move[1]];
            if (pos[0] >= 0 && pos[0] <= 7 && pos[1] >= 0 && pos[1] <= 7) {
                if (this.state[pos[0]][pos[1]][0] === 1) {
                    h -= (numberToSum - this.state[pos[0]][pos[1]][1]) * numberToSum * multiplier;
                    break;
                }
            }
        }
        return h;
    }
    auxH2() {
        let h = 0;
        let pos = this.p1Position;
        let top = pos[0] - 7;
        let bottom = pos[0] + 7;
        let left = pos[1] - 7;
        let right = pos[1] + 7;
        let numberToSum = 100;
        let numberToSumToTheSum = 100;
        let pointWasFound = false;
        while (top <= bottom && left <= right) {
            for (let col = left; col <= right; col++) {
                if (col >= 0 && col <= 7 && top >= 0 && top <= 7) {
                    if (this.state[top][col][0] === 1) {
                        pointWasFound = true;
                        h += numberToSum;
                        break;
                    }
                }
            }
            top++;
            if (pointWasFound)
                break;
            for (let row = top; row <= bottom; row++) {
                if (row >= 0 && row <= 7 && top >= 0 && top <= 7) {
                    if (this.state[top][row][0] === 1) {
                        pointWasFound = true;
                        h += numberToSum;
                        break;
                    }
                }
            }
            right--;
            if (pointWasFound)
                break;
            if (top <= bottom) {
                for (let col = right; col >= left; col--) {
                    if (col >= 0 && col <= 7 && bottom >= 0 && bottom <= 7) {
                        if (this.state[bottom][col][0] === 1) {
                            pointWasFound = true;
                            h += numberToSum;
                            break;
                        }
                    }
                }
                bottom--;
            }
            if (pointWasFound)
                break;
            if (left <= right) {
                for (let row = bottom; row >= top; row--) {
                    if (row >= 0 && row <= 7 && left >= 0 && left <= 7) {
                        if (this.state[row][left][0] === 1) {
                            pointWasFound = true;
                            h += numberToSum;
                            break;
                        }
                    }
                }
                left++;
            }
            if (pointWasFound)
                break;
            numberToSum += numberToSumToTheSum;
        }
        pos = this.p2Position;
        top = pos[0] - 7;
        bottom = pos[0] + 7;
        left = pos[1] - 7;
        right = pos[1] + 7;
        numberToSum = -numberToSum;
        numberToSumToTheSum = -numberToSumToTheSum;
        pointWasFound = false;
        while (top <= bottom && left <= right) {
            for (let col = left; col <= right; col++) {
                if (col >= 0 && col <= 7 && top >= 0 && top <= 7) {
                    if (this.state[top][col][0] === 1) {
                        pointWasFound = true;
                        h += numberToSum;
                        break;
                    }
                }
            }
            top++;
            if (pointWasFound)
                break;
            for (let row = top; row <= bottom; row++) {
                if (row >= 0 && row <= 7 && top >= 0 && top <= 7) {
                    if (this.state[top][row][0] === 1) {
                        pointWasFound = true;
                        h += numberToSum;
                        break;
                    }
                }
            }
            right--;
            if (pointWasFound)
                break;
            if (top <= bottom) {
                for (let col = right; col >= left; col--) {
                    if (col >= 0 && col <= 7 && bottom >= 0 && bottom <= 7) {
                        if (this.state[bottom][col][0] === 1) {
                            pointWasFound = true;
                            h += numberToSum;
                            break;
                        }
                    }
                }
                bottom--;
            }
            if (pointWasFound)
                break;
            if (left <= right) {
                for (let row = bottom; row >= top; row--) {
                    if (row >= 0 && row <= 7 && left >= 0 && left <= 7) {
                        if (this.state[row][left][0] === 1) {
                            pointWasFound = true;
                            h += numberToSum;
                            break;
                        }
                    }
                }
                left++;
            }
            if (pointWasFound)
                break;
            numberToSum -= numberToSumToTheSum;
        }
        return h;
    }
    auxH3() {
        let h = 0;
        let turnMultiplier = 200;
        if (this.player1Turn) {
            h -= this.currentTurn * turnMultiplier;
            h -= this.remainingPointSpots * 10;
        }
        else {
            h += this.currentTurn * turnMultiplier;
            h += this.remainingPointSpots * 10;
        }
        return h;
    }
    auxH4() {
        let h = 0;
        h -= this.p1Helper2;
        h += this.p2Helper2;
        return h;
    }
    auxPlayerCloseness() {
        let h = 0;
        h += Math.abs(this.p1Position[0] - this.p2Position[0]);
        h += Math.abs(this.p1Position[1] - this.p2Position[1]);
        if (this.player1Turn) {
            return -h * 10;
        }
        else {
            return h * 10;
        }
    }
}
