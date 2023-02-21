const operands = Array.from(document.getElementById('operandWrapper').children);
const operators = Array.from(document.getElementById('operatorWrapper').children);
const screen = document.getElementById('upperScreen');
const errTxt = document.getElementById('errorText');
const resultDiv = document.getElementById('result');

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
        resultDiv.innerText = `= ${solve(equation)}`;
        return;
    }
    
    //decimal logic
    for(let i = equation.length - 1; i >= 0 && symbol === '.'; i--) {
        if(isOperand(equation[i])) continue; //keep scanning if number
        if(isOperator(equation[i])) break; //leave loop if operator
        if(equation[i] === '.') return;
    }
    if((lastSymbol === undefined || isOperator(lastSymbol)) && symbol === '.')
        screen.innerText = screen.innerText + '0';

    //operator logic
    if(isOperator(symbol) && lastSymbol === undefined) {
        errTxt.innerText = 'You cannot start with an operator';
        return;
    }
    if(isOperator(symbol) && isOperator(lastSymbol)) {
        errTxt.innerText = 'You cannot have two operators next to each other...';
        return;
    }

    if(lastSymbol === '.' && (isOperator(symbol) || symbol === '(' || symbol === ')')) {
        errTxt.innerText = 'Expected an operand...';
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
    if(lastSymbol === ')' && isOperand(symbol)) screen.innerText = screen.innerText + '*';
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
    let postfixExpression = [];
    let stack = new Stack();

    for(let symbol of equation) {
        if(isOperand(symbol))
            postfixExpression.push(symbol);
        else if(symbol === '(')
            stack.push(symbol);
        else if(symbol === ')') {
            while(stack.peek() != '(') {
                postfixExpression.push(stack.pop());
            }
            stack.pop();
        } else {
            while(stack.getSize() > 0 && getPrescendence(symbol) <= getPrescendence(stack.peek()) && stack.peek() != '(') {
                postfixExpression.push(stack.pop());
            }
            stack.push(symbol);
        }
    }
    while(stack.getSize() > 0) {
        postfixExpression.push(stack.pop());
    }

    let operandStack = new Stack();
    let operatorStack = new Stack();
    for(let symbol of postfixExpression) {
        let operandOne = 0.0;
        let operandTwo = 0.0;
        let operatorStr = "";
        let result = 0.0;

        if(isOperand(symbol))
            operandStack.push(Number(symbol));
        else {
            operatorStack.push(symbol);
            if(operandStack.getSize() > 1) {
                operandTwo = operandStack.pop();
                operandOne = operandStack.pop();
                operatorStr = operatorStack.pop();

                switch(operatorStr) {
                    case '+':
                        result = operandOne + operandTwo;
                        break;
                    case '-':
                        result = operandOne - operandTwo;
                        break;
                    case '*':
                        result = operandOne * operandTwo;
                        break;
                    case '/':
                        result = operandOne / operandTwo;
                        break;
                    case '%':
                        result = operandOne % operandTwo;
                        break;
                    case '^':
                        result = Math.pow(operandOne, operandTwo);
                        break;
                }
                operandStack.push(result);
            }
        }
    }
    
    return operandStack.pop();
}

function getPrescendence(operator) {
    switch(operator) {
        case '+':
        case '0':
            return 1; //heaviest
            break;
        case '/':
        case '*':
        case '%':
            return 2;
            break;
        case '^':
            return 3; //lightest
            break;
        default:
            console.log(`Didn't understand the symbol: ${operator}`);
            break;
    }
    return -1;
}

document.getElementById('clear').addEventListener('click', () => { 
    screen.innerText = '';
    errTxt.innerText = '';
    resultDiv.innerText = '';
});
function del() {
    if(screen.innerText.length > 0) screen.innerText = screen.innerText.substring(0, screen.innerText.length - 1);
}
