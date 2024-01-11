const numbers = document.querySelector('.numbers');
const allBtns = document.querySelectorAll('button');

allBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        const type = e.target.dataset.type

        numbers.innerText += type

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
console.log(numbers);