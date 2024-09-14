

let mapListWasSelected:boolean=true;
let mapList:{[key: string]:number[][]};
const mapSelect = document.getElementById('mapList') as HTMLSelectElement;
mapSelect.addEventListener('click',()=>{
    mapListWasSelected=true;
});

let map1:number[][]=[[1,1,1,1,1,1,1,1,1,1,1,1],[1,0,1,1,1,1,1,1,1,1,1,1],[1,0,1,1,0,0,0,4,0,0,0,1],[1,2,1,1,0,1,0,1,0,1,0,1],[1,0,3,3,0,4,0,0,0,4,0,1],[1,0,1,1,0,1,1,1,1,1,0,1],[1,0,0,0,0,1,1,0,0,0,6,1],[1,5,1,1,1,1,1,0,1,1,1,1],[1,0,1,0,0,0,1,0,0,0,1,1],[1,0,1,0,1,0,1,1,1,0,1,1],[1,0,0,0,1,0,0,0,0,0,1,1],[1,1,1,1,1,1,1,1,1,1,1,1]];
let map2:number[][]=[[1,1,1,1,1,1,1,1,1,1,1,1],[1,0,1,1,1,1,1,1,1,1,1,1],[1,0,1,1,0,0,0,4,0,0,0,1],[1,2,1,1,0,1,0,1,0,1,0,1],[1,0,3,3,0,4,0,0,0,4,0,1],[1,0,1,1,0,1,1,1,1,1,0,1],[1,6,0,0,0,1,1,0,0,0,6,1],[1,5,1,1,1,1,1,0,1,1,1,1],[1,0,1,0,0,0,1,0,0,0,1,1],[1,0,1,0,1,0,1,1,1,0,1,1],[1,0,0,0,1,0,0,0,0,0,1,1],[1,1,1,1,1,1,1,1,1,1,1,1]];

let map3:number[][]=[[1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,1,2,5,6,1,1,1,1],
[1,0,1,0,1,0,1,1,0,0,0,1],
[1,0,0,0,1,0,1,1,0,1,0,1],
[1,0,1,0,0,4,0,1,0,4,0,1],
[1,0,0,0,1,0,0,1,0,1,0,1],
[1,0,1,0,0,0,0,1,0,0,0,1],
[1,0,0,0,1,0,0,1,0,1,0,1],
[1,0,1,0,0,0,0,1,0,0,0,1],
[1,0,0,0,1,0,0,1,0,1,0,1],
[1,1,1,0,0,0,0,0,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1]];

let map4:number[][]=[[1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,1,2,5,6,0,1,1,1],[1,0,1,0,1,0,1,1,0,0,0,1],[1,0,0,0,1,0,1,1,0,1,0,1],[1,0,1,0,0,4,0,1,0,4,0,1],[1,0,0,0,1,0,0,1,0,1,0,1],[1,0,1,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,1,0,1,0,1],[1,0,1,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,1,0,1,0,1],[1,1,1,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1]];

//03breadth.txt
let map5:number[][]=[[1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,1,2,1,5,6,1,1,1],[1,0,1,0,1,0,1,1,0,0,0,1],[1,0,0,0,1,0,1,1,0,1,0,1],[1,0,1,4,0,4,1,1,0,4,0,1],[1,0,0,0,1,0,1,1,1,1,0,1],[1,0,1,0,4,0,1,0,0,0,0,1],[1,0,0,0,1,0,1,0,1,1,1,1],[1,0,1,0,4,0,1,0,0,0,1,1],[1,0,0,0,1,0,1,1,1,0,1,1],[1,1,1,0,4,0,0,0,0,0,1,1],[1,1,1,1,1,1,1,1,1,1,1,1]];

//empty map
let map6:number[][]=[[1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,1],[1,2,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,5,6,1],[1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1]];

mapList={'map1':map1,'map2':map2,'map3':map3,'map4':map4,'map5':map5,
    'map6':map6
};