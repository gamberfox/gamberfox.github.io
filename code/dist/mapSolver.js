"use strict";
let answer = [-1];
const RIGHT = 0;
const UP = 1;
const LEFT = 2;
const DOWN = 3;
const travelCost = { [FREE_CELL.toString()]: 1,
    [(VEHICLE).toString()]: 1,
    [(MEDIUM_TRAFFIC).toString()]: 4,
    [(HEAVY_TRAFFIC).toString()]: 7,
    [(PASSENGER).toString()]: 1,
    [(DESTINATION).toString()]: 1
};
const STOP_POINT = 100_000;
class StatSheet {
    p1Points = 0;
    p1Multiplier = 1;
    p2Points = 0;
    p2Multiplier = 0;
    winner = 'no winner yet';
}
