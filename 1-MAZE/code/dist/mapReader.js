"use strict";
const FREE_CELL = 0;
const WALL = 1;
const VEHICLE = 2;
const MEDIUM_TRAFFIC = 3;
const HEAVY_TRAFFIC = 4;
const PASSENGER = 5;
const DESTINATION = 6;
const EASY = 1000;
const NORMAL = 100;
const HARD = 100;
let vehiclePosition;
let passengerPosition;
let destinationPosition;
let mapMesh;
let treeMesh;
function parseMap(text) {
    if (mapInfo !== null) {
        mapInfo.textContent = "I'll start parsing the map";
    }
    let rows = text.split(/\r?\n|\r/);
    let mapRow;
    mapRow = (Array(rows[0].split(' ').length + 2).fill(WALL));
    mapMesh = [mapRow];
    for (let line of rows) {
        let row = [WALL];
        for (let i of line.split(' ')) {
            row.push(parseInt(i));
        }
        row.push(WALL);
        if (row.length > 3) {
            mapMesh.push(row);
        }
    }
    mapRow = (Array(rows[0].split(' ').length + 2).fill(WALL));
    mapMesh.push(mapRow);
    return mapMesh;
}
const drawMap = () => {
    let cell;
    for (let x = 1; x < 11; x++) {
        for (let y = 1; y < 11; y++) {
            cell = map?.querySelector(`[data-x="${x - 1}"][data-y="${y - 1}"]`);
            if (mapMesh === undefined) {
                console.log(`hello from undefined`);
            }
            switch (mapMesh[y][x]) {
                case 0:
                    cell.className = 'cell0';
                    break;
                case 1:
                    cell.className = 'cell1';
                    break;
                case 2:
                    cell.className = 'cell2';
                    vehiclePosition = [x, y];
                    robot = new Robot(x - 1, y - 1, 10, 10, NORMAL);
                    break;
                case 3:
                    cell.className = 'cell3';
                    break;
                case 4:
                    cell.className = 'cell4';
                    break;
                case 5:
                    cell.className = 'cell5';
                    passengerPosition = [x, y];
                    break;
                case 6:
                    cell.className = 'cell6';
                    destinationPosition = [x, y];
                    break;
                case 7:
                    cell.className = 'cell7';
                    break;
                default:
                    cell.className = 'cell8';
                    console.log(`x: ${x}   y:${y} \n ${mapMesh[y][x]}`);
                    break;
            }
        }
    }
};
