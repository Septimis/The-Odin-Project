const operands = Array.from(document.getElementById('operandWrapper').children);
const operators = Array.from(document.getElementById('operatorWrapper').children);
const screen = document.getElementById('screen');

for(let symbol in operands.concat(operators))
    symbol.onclick = () => { addToScreen(this); }

function addToScreen(symbol) {
    console.log('inAddToScreen');
    screen.innerText = screen.innerText + symbol.innerText;
}