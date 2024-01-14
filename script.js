const calcKeys = document.querySelector('.buttons');
const userInput = document.querySelector('#userInput');
const calculator = document.querySelector('.calculator');
const displayResult = document.querySelector('#result');
let isEqualsPressed = false;
let equation = 0;
let checkForDecmial = '';

calcKeys.addEventListener('click', (e) => {
    if (!e.target.closest('button')) 
    return;

    const key = e.target;
    const keyValue = key.textContent;
    let inputDisplay = userInput.textContent;
    const { type } = key.dataset;
    const { previousKeyType } = calculator.dataset;

    if(type === 'number' && !isEqualsPressed) {
        if (inputDisplay === '0') {
            userInput.textContent = (previousKeyType === 'operator') ? inputDisplay + keyValue : keyValue;
            equation = (previousKeyType === 'operator') ? equation + key.value : key.value;
            checkForDecmial = checkForDecmial + keyValue;
        } else {
            if (checkForDecmial.length >= 19) {
                var replaceNumber = checkForDecmial;
                checkForDecmial = Number(checkForDecmial).toExponential(2);
                userInput.textContent = inputDisplay.replace(replaceNumber, checkForDecmial);
            } else {
                userInput.textContent = userInput.textContent.includes('N') ? 'NaN' : userInput.textContent.includes('I') ? 'Infinty' : inputDisplay + keyValue;
                equation = equation + key.value;
                checkForDecmial = checkForDecmial + keyValue;
            }
        }
    }

    if(type === 'operator' && previousKeyType !== 'operator' && !isEqualsPressed && !inputDisplay.includes('Infinty')) {
        checkForDecmial = '';
        userInput.textContent = inputDisplay + '' + keyValue + '';
        equation = equation + ' ' + key.Value + ' ';

    }
        if(type === 'decimal' && (previousKeyType === 'number' || inputDisplay === '0') && !isEqualsPressed && !inputDisplay.includes('Infinity')) {
            if(!checkForDecmial.includes('.')) {
                userInput.textContent = inputDisplay + keyValue;
                equation = equation + key.value;
                checkForDecmial = checkForDecmial + keyValue;
            }
        }
        if((type === 'backspace' || type === 'reset') && inputDisplay !== '0') {
            if(type === 'backspace' && !isEqualsPressed) {
                userInput.textContent = inputDisplay.substring(0, inputDisplay.length -1);
                equation = equation.substring(0, equation.length -1);
                checkForDecmial = checkForDecmial.substring(0, checkForDecmial.length -1);
            } else {
                inputDisplay = '0';
                userInput.textContent = inputDisplay;
                displayResult.innerHTML = '&nbsp;';
                isEqualsPressed = false;
                equation = '';
                checkForDecmial = '';
            }
        }
        if(type === 'equal') {
            isEqualsPressed = true;
            const finalResult = handleEqaution(equation);
            
            if(finalResult || finalResult === 0) {
                displayResult.textContent = (!Number.isInteger(finalResult)) ? finalResult.toFixed(2) :
                 (finalResult.toString().length >= 16) ? finalResult.toExponential(2) : finalResult;
            } else {
                displayResult.textContent = 'Error';
            }
        }

        calculator.dataset.previousKeyType = type;
})

    //function to calculate result
    function calculate(firstNum, operator, secondNum) {
        firstNum = Number(firstNum);
        secondNum = Number(secondNum);

        if(operator === 'plus' || operator === '+') return firstNum + secondNum;
        if(operator === 'subtract' || operator === '-') return firstNum - secondNum;
        if(operator === 'multiply' || operator === '*') return firstNum * secondNum;
        if(operator === 'divide' || operator === '/') return firstNum / secondNum;
       //NOT IN USE 
       // if(operator === 'remainder' || operator === '%') return firstNum % secondNum;
    }
    function handleEquation(eqaution) {
        equation = equation.split(' ');
        const operators = ['/', '*', '-', '+', '%'];
        let firstNum;
        let secondNum;
        let operator;
        let operatorIndex;
        let result;

        for(var i = 0; i < operators.length; i++) {
            while(equation.includes(operators[i])) {
                operatorIndex = equation.findIndex(item => item === operators[i]);
                firstNum = equation[operatorIndex -1];
                operator = equation[operatorIndex];
                secondNum = equation[operatorIndex +1];
                result = calculate(firstNum, operator, secondNum);
                equation.splice(operatorIndex - 1, 3, result);

            }
        }
        return result;
    }
    document.addEventListener('keydown', (e) => {

        let getOperators = {
            '/':'divide',
            '*': 'multiply',
            '+' : 'plus',
            '-' :'subtract',
            '%' : 'remainder'
        }
        if(!isNaN(e.key) && e.key !== ' ') {
            document.getElementbyId(`digit-${e.key}`).click();
        }
        if(['/', '*', '+', '-', '%'].includes(e.key)) {
            document.getElementById(getOperators[e.key]).click();
        }
        if(e.key === 'backspace' || e.key === 'c' || e.key === 'C') {
            document.getElementById('clear').click();
        }
        if(e.key === '=' || e.key === 'Enter') {
            document.getElementById('equals').click();
        }
        if(e.key === '.') {
            document.getElementById('decmial').click();
        }
    });

















//MY CODE
/*
const numbers = document.querySelector('.numbers');
const allBtns = document.querySelectorAll('button');
const deleteNumber = document.querySelector('#deleteNum');

//deleteButton.addEventListener('click', deleteNumber)


//function deleteNumber() {
//  currentOperationScreen.textContent = currentOperationScreen.textContent
//    .toString()
//    .slice(0, -1)
//}


allBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        const type = e.target.dataset.type


        if(type === '=') {
            if (numbers.innerText.includes('/')) {
                const splitItems = numbers.innerText.split('/')
                operate('/', splitItems[0], splitItems[1])
            }
            if (numbers.innerText.includes('-')) {
                const splitItems = numbers.innerText.split('-')
                operate('-', splitItems[0], splitItems[1])
            }
            if (numbers.innerText.includes('+')) {
                const splitItems = numbers.innerText.split('+')
                operate('+', splitItems[0], splitItems[1])
            }
            if (numbers.innerText.includes('*')) {
                const splitItems = numbers.innerText.split('*')
                operate('*', splitItems[0], splitItems[1])
            }
        }
        if (type === 'clear') {
            numbers.innerText = ''
        }
        
        numbers.innerText += type;
    })
})

const operate = (operator, type1, type2) => {
    const num1 = Number(type1);
    const num2 = Number(type2);
if(operator === '/') {
    numbers.innerText = num1/num2
}
if(operator === '-') {
    numbers.innerText = num1-num2
}
if(operator === '*') {
    numbers.innerText = num1*num2
}
if(operator === '+') {
    numbers.innerText = num1+num2

}

}
*/