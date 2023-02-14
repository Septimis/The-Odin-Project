//DOM constants
const gameBoard = document.getElementById('gameBoardWrapper');
const pixelColor = document.getElementById('pixelColor');
const isRandomColor = document.getElementById('isRandomColor');
const gridSize = document.getElementById('gridSize');

gridSize.addEventListener('change', () => createBoard());

//initiate the board
function createBoard() {
    clearChildren(gameBoard);

    let pixelSize = gameBoard.clientWidth / Number(gridSize.value);
    let numPixels = gameBoard.clientWidth / pixelSize;

    for(let i = 0; i < numPixels * numPixels; i++) {
        const pixel = document.createElement('div');
        pixel.style.border = 'none';
        pixel.style.background = `${pixelColor.value}`;
        pixel.style.width = `${pixelSize}px`;
        pixel.style.height = `${pixelSize}px`;

        pixel.addEventListener('mouseover', () => {
            pixel.style.background = (isRandomColor.checked) ? `rgb(${Math.random() * 100 + 1},${Math.random() * 100 + 1},${Math.random() * 100 + 1})` : pixelColor.value;
        });

        gameBoard.appendChild(pixel);
    }
}

function clearChildren(parent) {
    let firstChild = parent.firstElementChild;

    while(firstChild) {
        firstChild.remove();
        firstChild = parent.firstElementChild;
    }
}

function reset() {
    pixelColor.value = '#000000';
    gridSize.value = '16';
    createBoard();
}
