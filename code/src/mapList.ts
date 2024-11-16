

let mapListWasSelected:boolean=true;
let mapList:{[key: string]:number[][]};
const mapSelect = document.getElementById('mapList') as HTMLSelectElement;
mapSelect.addEventListener('click',()=>{
    mapListWasSelected=true;
});

let map1:number[][]=[[1,1,1,1,1,1,1,1,1,1,1,1],[1,0,1,1,1,1,1,1,1,1,1,1],[1,0,1,1,0,0,0,4,0,0,0,1],[1,2,1,1,0,1,0,1,0,1,0,1],[1,0,3,3,0,4,0,0,0,4,0,1],[1,0,1,1,0,1,1,1,1,1,0,1],[1,0,0,0,0,1,1,0,0,0,6,1],[1,5,1,1,1,1,1,0,1,1,1,1],[1,0,1,0,0,0,1,0,0,0,1,1],[1,0,1,0,1,0,1,1,1,0,1,1],[1,0,0,0,1,0,0,0,0,0,1,1],[1,1,1,1,1,1,1,1,1,1,1,1]];
let map2:number[][]=[[1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,1,1,1,1,1,1,1,1,1,1],
[1,0,1,1,0,0,0,4,0,0,0,1],
[1,2,1,1,0,1,0,1,0,1,0,1],
[1,0,3,3,0,4,0,0,0,4,0,1],
[1,0,1,1,0,1,1,1,1,1,0,1],
[1,6,0,0,0,1,1,0,0,0,0,1],[1,5,1,1,1,1,1,0,1,1,1,1],[1,0,1,0,0,0,1,0,0,0,1,1],[1,0,1,0,1,0,1,1,1,0,1,1],[1,0,0,0,1,0,0,0,0,0,1,1],[1,1,1,1,1,1,1,1,1,1,1,1]];

//deep depth
let map3:number[][]=[[1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,1,2,6,5,1,1,1,1],
[1,0,1,0,1,0,1,1,0,0,0,1],
[1,0,0,0,1,0,1,1,0,1,0,1],
[1,0,1,0,0,4,0,1,0,4,0,1],
[1,0,0,0,0,0,0,1,0,1,0,1],
[1,0,1,0,1,0,0,1,0,0,0,1],
[1,0,0,0,0,0,0,1,0,1,0,1],
[1,0,1,0,1,0,0,1,0,0,0,1],
[1,0,0,0,0,0,0,1,0,1,0,1],
[1,1,1,1,1,1,1,1,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1]];

//deeper depth
let map4:number[][]=[[1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,1,2,5,6,1,1,1,1],
[1,0,1,0,1,0,1,1,0,0,0,1],
[1,0,0,0,1,0,1,1,0,1,0,1],
[1,0,1,0,0,4,0,1,0,4,0,1],
[1,0,0,0,0,0,0,1,0,1,0,1],
[1,0,1,0,1,0,0,1,0,0,0,1],
[1,0,0,0,0,0,0,1,0,1,0,1],
[1,0,1,0,1,0,0,1,0,0,0,1],
[1,0,0,0,0,0,0,1,0,1,0,1],
[1,1,1,1,1,1,1,1,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1]];

//weird depth
let map5:number[][]=[[1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,1,2,5,6,0,1,1,1],
[1,0,1,0,1,0,1,1,0,0,0,1],
[1,0,0,0,1,0,1,1,0,1,0,1],
[1,0,1,0,0,4,0,1,0,4,0,1],
[1,0,0,0,1,0,0,1,0,1,0,1],
[1,0,1,0,0,0,0,1,0,0,0,1],
[1,0,0,0,1,0,0,1,0,1,0,1],
[1,0,1,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,1,0,1,0,1],[1,1,1,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1]];

//map 6: 03breadth.txt
let map6:number[][]=[[1,1,1,1,1,1,1,1,1,1,1,1],
[1,4,4,4,1,2,1,5,6,1,1,1],
[1,4,1,4,1,0,1,1,0,0,0,1],
[1,4,4,4,1,0,1,1,0,1,0,1],
[1,4,1,4,4,4,1,1,0,4,0,1],
[1,4,4,4,1,0,1,1,1,1,0,1],
[1,4,1,0,4,0,1,0,0,0,0,1],
[1,0,0,0,1,0,1,0,1,1,1,1],
[1,0,1,4,4,0,1,0,0,0,1,1],
[1,0,0,0,1,0,1,1,1,0,1,1],
[1,1,1,0,4,0,0,0,0,0,1,1],[1,1,1,1,1,1,1,1,1,1,1,1]];

//avara trap
let map7:number[][]=[[1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,0,0,0,6,0,0,0,1,1,1],
[1,1,0,0,0,5,0,0,0,1,1,1],
[1,1,0,1,1,1,1,1,0,1,1,1],
[1,1,0,1,0,0,0,1,0,1,1,1],
[1,1,0,1,0,1,0,1,0,1,1,1],
[1,1,0,0,0,2,0,0,0,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1]];

//avara trap 2
let map8:number[][]=[[1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,6,0,0,0,0,0,1],
[1,1,1,1,1,0,0,1,1,1,0,1],
[1,1,0,0,0,0,1,5,0,0,0,1],
[1,1,0,1,1,0,1,0,0,1,1,1],
[1,1,0,1,1,0,0,1,0,1,1,1],
[1,1,0,1,1,0,0,0,0,1,1,1],
[1,1,0,0,0,2,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1]];

//uniform cost vs A*
let map9:number[][]=[[1,1,1,1,1,1,1,1,1,1,1,1],
[1,2,4,4,4,4,4,4,4,4,4,1],
[1,3,0,3,4,4,4,4,4,4,4,1],
[1,4,4,0,4,4,4,4,4,4,4,1],
[1,4,4,3,0,3,4,4,4,4,4,1],
[1,4,4,4,4,0,0,0,0,5,6,1],
[1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,4,4,4,4,4,4,4,4,4,1],
[1,4,4,4,4,4,0,4,4,4,4,1],
[1,4,4,4,4,4,4,0,4,4,4,1],
[1,4,4,4,4,4,4,4,0,4,4,1],
[1,1,1,1,1,1,1,1,1,1,1,1]];

//empty map
let map10:number[][]=[[1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,1],[1,2,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,5,6,1],
[1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1]];


//empty red map
let map11:number[][]=[[1,1,1,1,1,1,1,1,1,1,1,1],
[1,4,4,4,4,4,4,4,4,4,4,1],
[1,2,4,0,0,0,4,0,0,0,0,1],
[1,0,4,0,4,0,4,0,4,4,0,1],
[1,0,4,0,4,0,0,0,4,4,0,1],
[1,0,0,0,4,0,4,4,3,5,6,1],
[1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,4,4,4,4,0,4,4,4,0,1],
[1,0,4,0,0,4,0,0,4,0,0,1],
[1,0,4,4,4,4,0,0,4,0,0,1],
[1,0,4,0,0,4,0,4,4,4,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1]];

mapList={'map1':map1,'map2':map2,'map3':map3,'map4':map4,
    'map5':map5,'map6':map6,'map7':map7,'map8':map8,
    'map9':map9,'map10':map10,'map11':map11
};