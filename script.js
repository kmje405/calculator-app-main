// Step 1: Select the display element
const display = document.getElementById('display');

// Step 2: Select all number buttons and operation buttons
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.key:not(.number)');
const equalsButton = document.querySelector('.equal');
const deleteButton = document.querySelector('.delete');
const resetButton = document.querySelector('.admin');
const decimalButton = document.querySelector('.decimal')

// Step 3: Declare necesssary variables and set their default values.
let currentOperation = null;
let firstOperand = '';
let secondOperand = '';
let shouldResetScreen = false;

// Step 4: Adding event listeners to number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

decimalButton.addEventListener('click', () => appendDecimal('.')); // Assuming appendDecimal function exists or modifying the existing function

 
// Step 5: Append number to display
function appendNumber(number) {
    if (display.value === '0' || shouldResetScreen) resetScreen();
    display.value += number;
}

function appendDecimal(decimal) {
    if (!display.value.includes(decimal) || shouldResetScreen) {
        if(shouldResetScreen) resetScreen();
        display.value = display.value === '' ? '0' + decimal : display.value + decimal;
    }
}


function resetScreen() {
    display.value = '';
    shouldResetScreen = false;

}

// Step 6: Operation buttons
operationButtons.forEach(button => {
    if (button.classList.contains('equal')) return;
    button.addEventListener('click', () => setOperation(button.textContent));
});

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = display.value;
    currentOperation = operator;
    shouldResetScreen = true;
}

// Step 7: Evaluate the result
equalsButton.addEventListener('click', evaluate);

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return;
    secondOperand = display.value;
    display.value = operate(currentOperation, firstOperand, secondOperand);
    currentOperation = null;
    shouldResetScreen = true;
}

function operate(operator, a, b) {
    a = parseFloat(a); // What is the parseFloat() function?
    b = parseFloat(b);
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Error';
        default: return '';
    }
}

// Step 8: Reset and Delete
resetButton.addEventListener('click', () => {
    display.value = '0';
    currentOperation = null;
    shouldResetScreen = false;
});

deleteButton.addEventListener('click', () => {
    display.value = display.value.toString().slice(0, -1);
});

