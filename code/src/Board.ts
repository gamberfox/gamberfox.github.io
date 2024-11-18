

let spaces=[
    [3,0],[4,0],
    [1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9],[1,10],
    [2,2],[2,2],[2,2],[2,2],
    [0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
    [0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
    [0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
    [0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
    [0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]
];

let movements:number[][]=[
    [2,1],[1,2],[-1,2],[-2,1],
    [-2,-1],[-1,-2],[1,-2],[2,-1]
]

const getSpaces=():number[][]=>{
    let newSpaces:number[][]=[];
    for(let x of spaces){
        newSpaces.push([...x]);
    }
    return newSpaces;
}

// MOD is used for convenience?
class Board {
    player1Turn:boolean=true;
    player1Won:boolean=false;
    player2Won:boolean=false;
    tie:boolean=false;
    // 0===empty space
    // 1===point space
    // 2===multiplier space
    // 3===player 1 space
    // 4===player 2 space
    state:number[][][]=[];
    remainingPointSpots:number=0;
    remainingMultiplierSpots:number=0;
    p1Score:number=0;
    p2Score:number=0;
    p1Multiplier:number=1;
    p2Multiplier:number=1;
    p1Position:number[]=[0,0];
    p2Position:number[]=[0,0];

    constructor(){
        this.generateMap();
    }
    getHeuristic(utilityFunction:number):number{
        let h:number=0;
        // if(this.player1Won)return 1000;
        if(this.player1Won)return 200_000+this.p1Score*100-this.p2Score*100;
        // else if(this.player2Won)return -1000;
        else if(this.player2Won)return -200_000+this.p1Score*100-this.p2Score*100;
        else if(this.tie) return 0;
        else if(utilityFunction===0){
            h+=this.p1Score*100;
            h-=this.p2Score*100;
            h+=this.p1Multiplier*100;
            h-=this.p2Multiplier*100;
            // if(this.player1Turn)h-=1_0000_000;else h+=1_000_000;
            h+=this.auxH1();
            return h;
        }
        else{
            //add 1 when the player is the other side, like a radar
            if(this.p1Multiplier===2)h+=1_000;
            if(this.p2Multiplier===2)h-=1_000;
            h+=this.p1Score*1_000;
            h-=this.p2Score*1_000;

            let pos=this.p1Position;
            ////////////////////////////////////
            /////////// we're doing a spiral on player 1
            let top=pos[0]-7;let bottom=pos[0]+7;
            let left=pos[1]-7;let right=pos[1]+7;
            let numberToSum=1;
            let numberToSumToTheSum=1;
            let pointWasFound=false;
            while(top<=bottom && left <=right){
                for(let col=left;col<=right;col++){
                    if(col>=0 && col<=7 && top>=0 && top<=7){
                        if(this.state[top][col][0]===1){
                            pointWasFound=true;
                            h+=numberToSum;
                            // console.log('number to sum'+numberToSum);
                            break;
                        }
                    }
                }
                top++;
                if(pointWasFound) break;

                for (let row = top; row <= bottom; row++) {
                    if(row>=0 && row<=7 && top>=0 && top<=7){
                        if(this.state[top][row][0]===1){
                            pointWasFound=true;
                            h+=numberToSum;
                            // console.log('number to sum'+numberToSum);
                            break;
                        }
                    }
                }
                right--;
                if(pointWasFound) break;

                // Fill bottom row
                if (top <= bottom) {
                    for (let col = right; col >= left; col--) {
                        if(col>=0 && col<=7 && bottom>=0 && bottom<=7){
                            if(this.state[bottom][col][0]===1){
                                pointWasFound=true;
                                h+=numberToSum;
                                // console.log('number to sum'+numberToSum);
                                break;
                            }
                        }
                    }
                    bottom--;
                }
                if(pointWasFound) break;

                // Fill left column
                if (left <= right) {
                    for (let row = bottom; row >= top; row--) {
                        if(row>=0 && row<=7 && left>=0 && left<=7){
                            if(this.state[row][left][0]===1){
                                pointWasFound=true;
                                h+=numberToSum;
                                // console.log('number to sum'+numberToSum);
                                break;
                            }
                        }
                    }
                    left++;
                }
                if(pointWasFound) break;
                numberToSum+=numberToSumToTheSum;
                // if(numberToSum>14)break;
            }
            //checking if there are point in the adjacent squares

            ///////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            ///////////////PART 2 WHERE OPERATE ON THE OTHER PLAYER////////////
            ///////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            pos=this.p2Position;
            /////////// we're doing a spiral
            top=pos[0]-7;bottom=pos[0]+7;
            left=pos[1]-7;right=pos[1]+7;
            numberToSum=-numberToSum;
            numberToSumToTheSum=-numberToSumToTheSum;
            pointWasFound=false;
            while(top<=bottom && left <=right){
                for(let col=left;col<=right;col++){
                    if(col>=0 && col<=7 && top>=0 && top<=7){
                        if(this.state[top][col][0]===1){
                            pointWasFound=true;
                            h+=numberToSum;
                            break;
                        }
                    }
                }
                top++;
                if(pointWasFound) break;

                for (let row = top; row <= bottom; row++) {
                    if(row>=0 && row<=7 && top>=0 && top<=7){
                        if(this.state[top][row][0]===1){
                            pointWasFound=true;
                            h+=numberToSum;
                            break;
                        }
                    }
                }
                right--;
                if(pointWasFound) break;

                // Fill bottom row
                if (top <= bottom) {
                    for (let col = right; col >= left; col--) {
                        if(col>=0 && col<=7 && bottom>=0 && bottom<=7){
                            if(this.state[bottom][col][0]===1){
                                pointWasFound=true;
                                h+=numberToSum;
                                break;
                            }
                        }
                    }
                    bottom--;
                }
                if(pointWasFound) break;

                // Fill left column
                if (left <= right) {
                    for (let row = bottom; row >= top; row--) {
                        if(row>=0 && row<=7 && left>=0 && left<=7){
                            if(this.state[row][left][0]===1){
                                pointWasFound=true;
                                h+=numberToSum;
                                break;
                            }
                        }
                    }
                    left++;
                }
                if(pointWasFound) break;
                numberToSum-=numberToSumToTheSum;
                // if(numberToSum<-14)break;
            }
            h+=this.auxH1();
            return h;
        }
    }
    getHeuristic1():number{
        let h:number=0;
        if(this.player1Won)return 1000;
        else if(this.player2Won)return -1000;
        else if(this.tie) return 0;
        else return this.p1Score-this.p2Score;
    }
    getHeuristic2():number{
        let h:number=0;
        if(this.player1Won)return 1000;
        else if(this.player2Won)return -1000;
        else if(this.tie) return 0;
        else{
            if(this.p1Multiplier===2)h+=3;
            if(this.p2Multiplier===2)h-=3;
            h+=this.p1Score;
            h-=this.p2Score;
            return h;
        }
    }

    tryToMove(position:number[]):Boolean{
        if(this.player1Won || this.player2Won || this.tie){
            return false;
        }
        for(let x of movements){
            if(this.player1Turn){
                if((this.p1Position[0]+x[0])===position[0] && 
                (this.p1Position[1]+x[1])===position[1]){
                    if(position[0]===this.p2Position[0]
                        && position[1]===this.p2Position[1]
                    ){
                        // console.log('you cannot be on top of player 2');
                        return false;
                    }
                    else{
                        this.state[this.p1Position[0]][this.p1Position[1]]=[0,0];
                        if(this.state[position[0]][position[1]][0]===1){
                            let points:number=this.state[position[0]][position[1]][1];
                            this.p1Score+=points*this.p1Multiplier;
                            this.p1Multiplier=1;
                            this.remainingPointSpots-=1;
                        }
                        else if(this.state[position[0]][position[1]][0]===2){
                            this.p1Multiplier=this.state[position[0]][position[1]][1];
                            this.remainingMultiplierSpots-=1;
                        }
                        this.state[this.p1Position[0]+x[0]][this.p1Position[1]+x[1]][0]=3;
                        this.state[this.p1Position[0]+x[0]][this.p1Position[1]+x[1]][1]=0;
                        this.p1Position[0]+=x[0];
                        this.p1Position[1]+=x[1];
                        this.player1Turn=false;
                        return true;
                    }
                }
            }
            else{
                if((this.p2Position[0]+x[0])===position[0] && 
                (this.p2Position[1]+x[1])===position[1]){
                    if(position[0]===this.p1Position[0]
                        && position[1]===this.p1Position[1]
                    ){
                        // console.log('you cannot be on top of player 1')
                        return false;
                    }
                    else{
                        this.state[this.p2Position[0]][this.p2Position[1]]=[0,0];
                        if(this.state[position[0]][position[1]][0]===1){
                            let points:number=this.state[position[0]][position[1]][1];
                            this.p2Score+=points*this.p2Multiplier;
                            this.p2Multiplier=1;
                            this.remainingPointSpots-=1;
                        }
                        if(this.state[position[0]][position[1]][0]===2){
                            this.p2Multiplier=this.state[position[0]][position[1]][1];
                            this.remainingMultiplierSpots-=1;
                        }
                        this.state[this.p2Position[0]+x[0]][this.p2Position[1]+x[1]][0]=4;
                        this.state[this.p2Position[0]+x[0]][this.p2Position[1]+x[1]][1]=0;
                        this.p2Position[0]+=x[0];
                        this.p2Position[1]+=x[1];
                        this.player1Turn=true;
                        return true;
                    }
                }
            }
        }
        return false;
    }

    generateMap():number[][][]{
        let spaces:number[][]=getSpaces();
        let newMap:number[][][]=[];
        for(let i=0;i<8;i++){
            newMap.push([]);
        }
        this.remainingPointSpots=0;
        this.remainingMultiplierSpots=0;
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                let choice=Math.floor(Math.random() * (spaces.length));
                // console.log(newMap[i]);
                // console.log(i)
                newMap[i].push([...spaces[choice]]);

                if(spaces[choice][0]===1){
                    this.remainingPointSpots+=1;
                }
                else if(spaces[choice][0]===2){
                    this.remainingMultiplierSpots+=1;
                }
                else if(spaces[choice][0]===3){
                    this.p1Position=[i,j];
                    // console.log(spaces[choice]);
                    // console.log(i.toString()+j.toString());
                }
                else if(spaces[choice][0]===4){
                    this.p2Position=[i,j];
                }
                spaces.splice(choice,1);
            }
        }
        this.state=newMap;
        return newMap;
    }
    getBoardState(){
        let board:Board=this.clone();
        return board.state;
    }
    clone(){
        let newBoard:Board=new Board();
        // newBoard.state=this.generateMap();
        for(let i in newBoard.state){
            for(let j in newBoard.state[i]){
                newBoard.state[i][j][0]=this.state[i][j][0];
                newBoard.state[i][j][1]=this.state[i][j][1];
            }
        }
        newBoard.player1Turn=this.player1Turn;
        newBoard.player1Won=this.player1Won;
        newBoard.player2Won=this.player2Won;
        newBoard.tie=this.tie;
        newBoard.remainingPointSpots=this.remainingPointSpots;
        newBoard.remainingMultiplierSpots=this.remainingMultiplierSpots;
        newBoard.p1Score=this.p1Score;
        newBoard.p2Score=this.p2Score;
        newBoard.p1Multiplier=this.p1Multiplier;
        newBoard.p2Multiplier=this.p2Multiplier;
        newBoard.p1Position[0]=this.p1Position[0];
        newBoard.p1Position[1]=this.p1Position[1];
        newBoard.p2Position[0]=this.p2Position[0];
        newBoard.p2Position[1]=this.p2Position[1];
        return newBoard;
    }

    aux1Moves:number[][]=[[0,2],[-2,0],[0,-2],[2,0]];
    auxH1():number{
        let h:number=0;
        let pos:number[];
        let numberToSum:number=10;
        for(let move of this.aux1Moves){
            pos=[this.p1Position[0]+move[0],this.p1Position[1]+move[1]];
            if(pos[0]>=0 && pos[0]<=7 && pos[1]>=0 && pos[1]<=7){
                // console.log(pos);
                if(this.state[pos[0]][pos[1]][0]===1){
                    h+=numberToSum;
                    break;
                }
            }
        }
        for(let move of this.aux1Moves){
            pos=[this.p2Position[0]+move[0],this.p2Position[1]+move[1]];
            if(pos[0]>=0 && pos[0]<=7 &&pos[1]>=0 && pos[1]<=7){
                // console.log(pos);
                if(this.state[pos[0]][pos[1]][0]===1){
                    h-=numberToSum;
                    break;
                }
            }
        }
        for(let move of movements){
            pos=[this.p1Position[0]+move[0],this.p1Position[1]+move[1]];
            if(pos[0]>=0 && pos[0]<=7 && pos[1]>=0 && pos[1]<=7){
                // console.log(pos);
                if(this.state[pos[0]][pos[1]][0]===1){
                    h+=numberToSum*10;
                    break;
                }
            }
        }
        for(let move of movements){
            pos=[this.p2Position[0]+move[0],this.p2Position[1]+move[1]];
            if(pos[0]>=0 && pos[0]<=7 &&pos[1]>=0 && pos[1]<=7){
                // console.log(pos);
                if(this.state[pos[0]][pos[1]][0]===1){
                    h-=numberToSum*10;
                    break;
                }
            }
        }
        return h;
    }
}
