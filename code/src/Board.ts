

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
}