document.addEventListener('DOMContentLoaded', function(){

  const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };

  function updateDisplay() {
    const display = document.getElementsByClassName('calculator-screen')[0];
    display.value = calculator.displayValue;
  }
  updateDisplay();

  const keys = document.querySelector('.calculator-keys')
  keys.addEventListener('click', function(e){
    if (!e.target.matches('button')) {
      return
    }

    if (e.target.classList.contains('operator')) {
      handleOperator(e.target.value)
      updateDisplay()
      return
    }

    if (e.target.classList.contains('decimal')) {
      inputDecimal(e.target.value)
      updateDisplay()
      return //prevent MORE decimals from coming up
    }

    if (e.target.classList.contains('all-clear')) {
      resetCalculator()
      updateDisplay()
      return
    }

    inputDigit(e.target.value)
    updateDisplay()
  })

  function inputDigit(digit) {
    if (calculator.waitingForSecondOperand === true) {
      calculator.displayValue = digit
      calculator.waitingForSecondOperand = false
    } else {
      if (calculator.displayValue === 0) {
        calculator.displayValue = digit
      } else {
        calculator.displayValue += digit
      }
    }
  }

  function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
      return
    }
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
  }

  function handleOperator(nextOperator) {
    const inputValue = parseFloat(calculator.displayValue)

    if (calculator.operator && calculator.waitingForSecondOperand)  {
      calculator.operator = nextOperator
      return
    }

    if (calculator.firstOperand === null) {
      calculator.firstOperand = inputValue
    } else if (calculator.operator) {
      const currentValue = calculator.firstOperand || 0
      const result = performCalculation[calculator.operator](calculator.firstOperand, inputValue)

      calculator.displayValue = String(result)
      calculator.firstOperand = result
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator
  }

  const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

    '%': (firstOperand, secondOperand) => firstOperand % secondOperand,

    '^': (firstOperand, secondOperand) => Math.pow(firstOperand, secondOperand),

    'Pyt': (firstOperand, secondOperand) => Math.pow((Math.pow(firstOperand, 2) + Math.pow(secondOperand, 2)), 0.5),

    '=': (firstOperand, secondOperand) => secondOperand

  }

  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  }

})
