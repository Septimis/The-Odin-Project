//DOM constants
const gameBoard = document.getElementById('gameBoardWrapper');
const pixelColor = document.getElementById('pixelColor');
const isRandomColor = document.getElementById('isRandomColor');
const gridSize = document.getElementById('gridSize');

//initiate the board
function createBoard() {
    let pixelSize = gameBoard.clientWidth / Number(gridSize.value);
    let numPixels = gameBoard.clientWidth / pixelSize;

    for(let i = 0; i < numPixels; i++) {
        const pixel = document.createElement('div');
        pixel.style.border = 'none';
        pixel.style.background = pixelColor.value;
        pixel.style.width = pixelSize;
        pixel.style.height = pixelSize;
        //pixel.style.cssText = `border: none; background: ${pixelColor.value}; width: ${pixelSize}; height: ${pixelSize};`;
        gameBoard.appendChild(pixel);
    }

    console.log(`Board will have ${numPixels} pixel(s) of size ${pixelSize}`);
}
