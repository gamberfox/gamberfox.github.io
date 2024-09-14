"use strict";
let mapListWasSelected = true;
let mapList;
const mapSelect = document.getElementById('mapList');
mapSelect.addEventListener('click', () => {
    mapListWasSelected = true;
});
let map1 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 1, 1, 0, 0, 0, 4, 0, 0, 0, 1], [1, 2, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 3, 3, 0, 4, 0, 0, 0, 4, 0, 1], [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1], [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 6, 1], [1, 5, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1], [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1], [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
let map2 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 1, 1, 0, 0, 0, 4, 0, 0, 0, 1], [1, 2, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 3, 3, 0, 4, 0, 0, 0, 4, 0, 1], [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1], [1, 6, 0, 0, 0, 1, 1, 0, 0, 0, 6, 1], [1, 5, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1], [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1], [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
let map3 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 2, 5, 6, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 4, 0, 1, 0, 4, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
let map4 = [];
let map5 = [];
mapList = { 'map1': map1, 'map2': map2, 'map3': map3, 'map4': map4, 'map5': map5 };
