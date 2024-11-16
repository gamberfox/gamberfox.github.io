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
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            cell = map?.querySelector(`[pos-x="${x}"][pos-y="${y}"]`);
            if (board.state === undefined) {
                console.log(`hello from undefined board`);
            }
            if (cell === null) {
                console.log('cell is null');
                break;
            }
            switch (board.state[x][y][0]) {
                case 0:
                    cell.className = 'cell0';
                    cell.textContent = '';
                    break;
                case 1:
                    cell.className = 'cell1';
                    cell.textContent = board.state[x][y][1].toString();
                    break;
                case 2:
                    cell.className = 'cell2';
                    cell.textContent = 'x' + board.state[x][y][1].toString();
                    break;
                case 3:
                    cell.className = 'cell3';
                    cell.textContent = '1';
                    break;
                case 4:
                    cell.className = 'cell4';
                    cell.textContent = '2';
                    break;
                case 5:
                    cell.className = 'cell5';
                    break;
                case 6:
                    cell.className = 'cell6';
                    break;
                case 7:
                    cell.className = 'cell7';
                    break;
                default:
                    cell.className = 'cell8';
                    break;
            }
        }
    }
};
