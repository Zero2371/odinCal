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
        numbers.innerText += type
    })
})

const operate = (operator, type1, type2) => {
    num1 = Number(type1);
    num2 = Number(type2);
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
