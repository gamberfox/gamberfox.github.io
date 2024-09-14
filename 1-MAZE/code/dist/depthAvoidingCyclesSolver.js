"use strict";
const depthSolver = () => {
    console.log(`starting depth solver avoiding cycles`);
    let foundAnswer = false;
    let currentNode = new MazePosition(vehiclePosition[0], vehiclePosition[1], VEHICLE, 0, false);
    currentNode.visitedNodes.add([vehiclePosition[0], vehiclePosition[1]].join(','));
    let queue = [currentNode];
    while (queue.length > 0) {
        statSheet.expandedNodes += 1;
        if (statSheet.expandedNodes > STOP_POINT) {
            console.log(`${statSheet.expandedNodes} nodes were searched,
                the limit has been reached \n\n\n\n\n\n\n\n`);
            let s1 = new Set();
            return [-1];
            //break;
        }
        currentNode = queue.pop();
        //we'll check if we found the answer
        if (currentNode.foundPassenger &&
            DESTINATION === mapMesh[currentNode.y][currentNode.x]) {
            foundAnswer = true;
            statSheet.nodeDepth = currentNode.nodeDepth;
            statSheet.solutionCost = currentNode.travelCost;
            console.log(`an answer was found`);
            break;
        }
        //we'll check every neighbor
        //TRYING TO GO TO THE RIGHT
        if (WALL !== mapMesh[currentNode.y][currentNode.x + 1] //no going to walls
            && (!currentNode.visitedNodes.has([currentNode.x + 1, currentNode.y].join(','))
                || (!currentNode.visitedNodes2.has([currentNode.x + 1, currentNode.y].join(','))
                    && currentNode.foundPassenger))) {
            //console.log('oi to the right');
            currentNode.rightChild = new MazePosition(currentNode.x + 1, currentNode.y, mapMesh[currentNode.y][currentNode.x + 1], currentNode.nodeDepth + 1, currentNode.foundPassenger);
            queue.push(currentNode.rightChild);
            if (PASSENGER === mapMesh[currentNode.y][currentNode.x + 1]
                && !currentNode.rightChild.foundPassenger) {
                currentNode.rightChild.foundPassenger = true;
                currentNode.rightChild.foundPassengerThisRound = true;
            }
            currentNode.rightChild.father = currentNode;
            currentNode.rightChild.pathToFather = LEFT;
            currentNode.rightChild.travelCost =
                currentNode.travelCost
                    + travelCost[(mapMesh[currentNode.y][currentNode.x + 1]).toString()];
            currentNode.rightChild.visitedNodes
                = new Set([...currentNode.visitedNodes]);
            currentNode.rightChild.visitedNodes2
                = new Set([...currentNode.visitedNodes2]);
            //add node to one of 2 visited sets
            if (currentNode.rightChild.foundPassenger) {
                currentNode.rightChild.visitedNodes2
                    .add([currentNode.x + 1, currentNode.y].join(','));
            }
            currentNode.rightChild.visitedNodes
                .add([currentNode.x + 1, currentNode.y].join(','));
        }
        //trying to go UP
        if (WALL !== mapMesh[currentNode.y - 1][currentNode.x] //no going to walls
            && (!currentNode.visitedNodes.has([currentNode.x, currentNode.y - 1].join(','))
                || (!currentNode.visitedNodes2.has([currentNode.x, currentNode.y - 1].join(','))
                    && currentNode.foundPassenger))) {
            currentNode.upChild = new MazePosition(currentNode.x, currentNode.y - 1, mapMesh[currentNode.y - 1][currentNode.x], currentNode.nodeDepth + 1, currentNode.foundPassenger);
            queue.push(currentNode.upChild);
            if (PASSENGER === mapMesh[currentNode.y - 1][currentNode.x]
                && !currentNode.upChild.foundPassenger) {
                currentNode.upChild.foundPassenger = true;
                currentNode.upChild.foundPassengerThisRound = true;
            }
            currentNode.upChild.father = currentNode;
            currentNode.upChild.pathToFather = DOWN;
            currentNode.upChild.travelCost =
                currentNode.travelCost
                    + travelCost[(mapMesh[currentNode.y - 1][currentNode.x]).toString()];
            currentNode.upChild.visitedNodes
                = new Set([...currentNode.visitedNodes]);
            currentNode.upChild.visitedNodes2
                = new Set([...currentNode.visitedNodes2]);
            //add node to one of 2 visited sets
            if (currentNode.upChild.foundPassenger) {
                currentNode.upChild.visitedNodes2
                    .add([currentNode.x, currentNode.y - 1].join(','));
            }
            currentNode.upChild.visitedNodes
                .add([currentNode.x, currentNode.y - 1].join(','));
        }
        //trying to go LEFT
        if (WALL !== mapMesh[currentNode.y][currentNode.x - 1] //no going to walls
            && (!currentNode.visitedNodes.has([currentNode.x - 1, currentNode.y].join(','))
                || (!currentNode.visitedNodes2.has([currentNode.x - 1, currentNode.y].join(','))
                    && currentNode.foundPassenger))) {
            currentNode.leftChild = new MazePosition(currentNode.x - 1, currentNode.y, mapMesh[currentNode.y][currentNode.x - 1], currentNode.nodeDepth + 1, currentNode.foundPassenger);
            queue.push(currentNode.leftChild);
            if (PASSENGER === mapMesh[currentNode.y][currentNode.x - 1]
                && !currentNode.leftChild.foundPassenger) {
                currentNode.leftChild.foundPassenger = true;
                currentNode.leftChild.foundPassengerThisRound = true;
            }
            currentNode.leftChild.father = currentNode;
            currentNode.leftChild.pathToFather = RIGHT;
            currentNode.leftChild.travelCost =
                currentNode.travelCost
                    + travelCost[(mapMesh[currentNode.y][currentNode.x - 1]).toString()];
            currentNode.leftChild.visitedNodes
                = new Set([...currentNode.visitedNodes]);
            currentNode.leftChild.visitedNodes2
                = new Set([...currentNode.visitedNodes2]);
            //add node to one of 2 visited sets
            if (currentNode.leftChild.foundPassenger) {
                currentNode.leftChild.visitedNodes2
                    .add([currentNode.x - 1, currentNode.y].join(','));
            }
            currentNode.leftChild.visitedNodes
                .add([currentNode.x - 1, currentNode.y].join(','));
        }
        //trying to go DOWN
        if (WALL !== mapMesh[currentNode.y + 1][currentNode.x] //no going to walls
            && (!currentNode.visitedNodes.has([currentNode.x, currentNode.y + 1].join(','))
                || (!currentNode.visitedNodes2.has([currentNode.x, currentNode.y + 1].join(','))
                    && currentNode.foundPassenger))) {
            currentNode.downChild = new MazePosition(currentNode.x, currentNode.y + 1, mapMesh[currentNode.y + 1][currentNode.x], currentNode.nodeDepth + 1, currentNode.foundPassenger);
            queue.push(currentNode.downChild);
            if (PASSENGER === mapMesh[currentNode.y + 1][currentNode.x]
                && !currentNode.downChild.foundPassenger) {
                currentNode.downChild.foundPassenger = true;
                currentNode.downChild.foundPassengerThisRound = true;
            }
            currentNode.downChild.father = currentNode;
            currentNode.downChild.pathToFather = UP;
            currentNode.downChild.travelCost =
                currentNode.travelCost
                    + travelCost[(mapMesh[currentNode.y + 1][currentNode.x]).toString()];
            currentNode.downChild.visitedNodes
                = new Set([...currentNode.visitedNodes]);
            currentNode.downChild.visitedNodes2
                = new Set([...currentNode.visitedNodes2]);
            //add node to one of 2 visited sets
            if (currentNode.downChild.foundPassenger) {
                currentNode.downChild.visitedNodes2
                    .add([currentNode.x, currentNode.y + 1].join(','));
            }
            currentNode.downChild.visitedNodes
                .add([currentNode.x, currentNode.y + 1].join(','));
        }
    }
    //build answer if you found it
    if (foundAnswer) {
        let path = [];
        let node = currentNode;
        console.log('answering');
        while (node !== null && null !== node.pathToFather) {
            path.push(node.pathToFather);
            node = node.father;
        }
        path.reverse();
        return path;
    }
    return [-1];
};