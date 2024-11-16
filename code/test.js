

let a=new Set();

let t1=[
    [[1,2],[3,4]],
    [[5,6],[7,8]],
    [[9,10],[11,12]]
]

console.log(t1);
console.log(t1[2][0][1]);

const newRandomNumber = Math.floor(Math.random() * 101);
console.log(newRandomNumber);
console.log(Math.random());

let l1=[1,2,3];
let choice=Math.floor(Math.random() * (l1.length+1));

for(let i=l1.length;i>0;i--){
    let choice=Math.floor(Math.random() * (l1.length));
    console.log(l1.splice(choice,1));
}

let grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
        grid[i][j]=i.toString()+j.toString();
    }
}
console.log(grid);