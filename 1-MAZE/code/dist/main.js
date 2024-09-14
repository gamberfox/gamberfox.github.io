"use strict";
const fileInput = document.getElementById('fileInput');
const fileContent = document.getElementById('fileContent');
const fileCategorySelect = document.getElementById('fileCategory');
const actionSelect = document.getElementById('action');
const drawButton = document.getElementById('drawButton');
const solveButton = document.getElementById('solveButton');
const visualizeButton = document.getElementById('visualizeButton');
const mapInfo = document.getElementById('mapInfo');
const map = document.getElementById('grid');
const nutcrackerAudio = document.getElementById('nutcracker');
const joySongAudio = document.getElementById('joySong');
const partyHornAudio = document.getElementById('partyHorn');
const sadTromboneAudio = document.getElementById('sadTrombone');
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell0');
        cell.setAttribute('data-x', j.toString());
        cell.setAttribute('data-y', i.toString());
        map?.appendChild(cell);
    }
}
const testVar = 2;
let robot;
let mapWasCreated = false;
const actionOptions = {
    informedAlgorithm: [
        { value: 'avara', text: 'avara' },
        { value: 'aStar', text: 'A star' }
    ],
    notInformedAlgorithm: [
        { value: 'breadth', text: 'breadth' },
        { value: 'uniformCost', text: 'uniform cost' },
        { value: 'depthAvoidingCycles', text: 'depth avoiding cycles' }
    ]
};
const updateActionOptions = (category) => {
    actionSelect.innerHTML = '';
    const options = actionOptions[category];
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.text;
        actionSelect.appendChild(opt);
    });
};
fileCategorySelect.addEventListener('change', (event) => {
    const selectedCategory = event.target.value;
    updateActionOptions(selectedCategory);
});
fileInput.addEventListener('click', () => {
    mapListWasSelected = false;
});
drawButton.addEventListener('click', () => {
    const selectedAction = actionSelect.value;
    const file = fileInput.files?.[0];
    console.log(`here in the drawButton`);
    if (!joySongAudio.paused) {
        joySongAudio.pause();
        joySongAudio.currentTime = 1;
    }
    if (mapListWasSelected) {
        mapMesh = mapList[mapSelect.value];
        console.log('\n\n\n\n\nselected map is:   ' + mapSelect.value);
        drawMap();
    }
    else if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            parseMap(e.target?.result);
            drawMap();
        };
        reader.readAsText(file);
    }
    else {
        fileContent.textContent = 'No file selected.';
    }
});
