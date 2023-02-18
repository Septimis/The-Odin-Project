const operands = Array.from(document.getElementById('operandWrapper').children);
const operators = Array.from(document.getElementById('operatorWrapper').children);
const screen = document.getElementById('upperScreen');
const errTxt = document.getElementById('errorText');
const result = document.getElementById('result');

const btns = operands.concat(operators);
for(let i = 0; i < btns.length; i++) 
    btns[i].addEventListener('click', () => { addToScreen(btns[i].innerText); });

function isOperator(symbol) {
    if(symbol === undefined) return false;
    return ((symbol.charCodeAt(0) >= 42 && symbol.charCodeAt(0) <= 45) || symbol.charCodeAt(0) === 47 || symbol.charCodeAt(0) === 37);
}
function isOperand(symbol) {
    if(symbol === undefined) return false;
    return (symbol.charCodeAt(0) >= 48 && symbol.charCodeAt(0) <= 57)
}

function addToScreen(symbol) {
    errTxt.innerText = '';
    let equation = screen.innerText;

    let lastSymbol = equation[equation.length - 1];
    if(isOperator(symbol) && lastSymbol === undefined) {
        errTxt.innerText = 'First symbol cannot be an operator...';
        return;
    }

    if(symbol === '=') {
        solve(equation);
        return;
    }
    
    //decimal logic
    for(let i = equation.length - 1; i >= 0 && symbol === '.'; i--) {
        if(isOperand(equation[i])) continue; //keep scanning if number
        if(isOperator(equation[i])) break; //leave loop if operator
        if(equation[i] === '.') return;
    }

    //operator logic
    if(isOperator(symbol) && lastSymbol === undefined) {
        errTxt.innerText = 'You cannot start with an operator';
        return;
    }
    if(isOperator(symbol) && isOperator(lastSymbol)) {
        errTxt.innerText = 'You cannot have two operators next to each other...';
        return;
    }

    //parenthesis logic
    if(equation.length === 0 && symbol === ')') { 
        errTxt.innerText = 'You have too many closing parenthesis'; 
        return; 
    }
    if(symbol === ')' && lastSymbol === '(') {
        errTxt.innerText = 'Cannot have empty parenthesis...';
        return;
    }
    if(symbol === '(' && isOperand(lastSymbol)) screen.innerText = screen.innerText + '*';
    let unclosedParenthesis = 0; //to offset the closing parenthesis that symbol is
    for(let i = 0; i < equation.length && symbol === ')'; i++) {
        //count parenthesis
        if(equation[i] === '(') unclosedParenthesis++;
        if(equation[i] === ')') unclosedParenthesis--;
    }
    if(unclosedParenthesis - 1 < 0 && symbol === ')') {
        errTxt.innerText = 'You have too many closing parenthesis...';
        return;
    }
    if(symbol === ')' && isOperator(lastSymbol)) {
        errTxt.innerText = 'Expected an operand...';
        return;
    }

    screen.innerText = screen.innerText + symbol;
}

function solve(equation) {
    let infixExpression = [];
    let postfixExpression = [];
    let numUnclosedParenthesis = 0;

    let stack = new Stack();
    let operandStack = new Stack();
    let operatorStack = new Stack();

    //convert from infix to postfix
    for(let element in equation) {
        if(isOperand(element)) postfixExpression.push(element);
        //else if(
    }
}

document.getElementById('clear').addEventListener('click', () => { 
    screen.innerText = '';
    errTxt.innerText = '';
    result.innerText = '';
});