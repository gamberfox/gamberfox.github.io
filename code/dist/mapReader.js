"use strict";
const drawMap = () => {
    let cell;
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            cell = map?.querySelector(`[pos-x="${x}"][pos-y="${y}"]`);
            if (board1.state === undefined) {
                console.log(`hello from undefined board1`);
            }
            if (cell === null) {
                console.log('cell is null');
                break;
            }
            switch (board1.state[x][y][0]) {
                case 0:
                    cell.className = 'cell0';
                    cell.textContent = '';
                    break;
                case 1:
                    cell.className = 'cell1';
                    cell.textContent = board1.state[x][y][1].toString();
                    break;
                case 2:
                    cell.className = 'cell2';
                    cell.textContent = 'x' + board1.state[x][y][1].toString();
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
