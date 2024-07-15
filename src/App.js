import './App.css';
import { useState } from 'react';
import { evaluate } from 'mathjs';

function App() {
  const [displayText, setDisplayText] = useState('0');
  const [expression, setExpression] = useState('');
  const [formula, setFormula] = useState('');
  const [lastAction, setLastAction] = useState(null);
  const MAX_DIGITS = 22;
  const DECIMAL_PLACES = 10; // Number of decimal places for rounding

  const handleNumber = (event) => {
    const value = event.target.textContent;

    if (displayText.length < MAX_DIGITS) {
      if (displayText === '0' || displayText === 'Error') {
        if (value === '.') {
          setDisplayText('0.');
          setExpression('0.');
        } else {
          setDisplayText(value);
          setExpression(value);
        }
      } else {
        const isDecimal = value === '.';
        const lastNumber = expression.split(/[\+\-\*\/]/).pop();
        if (isDecimal && lastNumber.includes('.')) return;

        setDisplayText(displayText + value);
        setExpression(expression + value);
      }
      setFormula(formula + value);
      setLastAction(null);
    }
  };

  const handleOperator = (event) => {
    const value = event.target.textContent;
    let newExpression = expression;
    // If the last action was '=', start a new expression with the previous result
    if (lastAction === '=') {
      newExpression = displayText; // Start with the last result
    }
    // Prevent multiple consecutive operators
    if (['+', '*', '/', '-'].includes(newExpression.slice(-1))) {
      if (value === '-') {
        // Handle negative sign
        if (displayText === '0' || displayText === '' || /[\+\-\*\/]$/.test(newExpression)) {
          setDisplayText(value);
          newExpression = newExpression + value;
        }
      } else {
        // Replace last operator with new operator
        newExpression = newExpression.slice(0, -1) + value;
        setDisplayText(value);
      }
    } else {
      // Append new operator
      setDisplayText(value);
      newExpression = newExpression + value;
    }

    setExpression(newExpression);
    setFormula(formula + ' ' + value);
    setLastAction(value);
  };

  const handleEquals = () => {
    try {
      const result = evaluate(expression);
      const formattedResult = formatNumber(result);
      setDisplayText(formattedResult);
      setExpression(formattedResult);
      setFormula(`${formula} = ${formattedResult}`);
      setLastAction('=');
    } catch (error) {
      setDisplayText('Error');
      setExpression('');
      setFormula('Error');
    }
  };

  const handleClear = () => {
    setDisplayText('0');
    setExpression('');
    setFormula('');
    setLastAction(null);
  };

  const formatNumber = (number) => {
    if (!isFinite(number) || isNaN(number)) return 'Error';
    return Number(number.toFixed(DECIMAL_PLACES)).toString();
  };

  return (
    <div className="App">
      <div>
        <div className="calculator">
          <div className="formula" id="formula">
            {formula}
          </div>
          <div className="output" id="display">
            {displayText}
          </div>
          <div className="buttons-container">
            <button className="btn clear" id="clear" onClick={handleClear}>AC</button>
            <button className="btn divide" id="divide" onClick={handleOperator}>/</button>
            <button className="btn multiply" id="multiply" onClick={handleOperator}>*</button>
            <button className="btn add" id="add" onClick={handleOperator}>+</button>
            <button className="btn one" id="one" onClick={handleNumber}>1</button>
            <button className="btn two" id="two" onClick={handleNumber}>2</button>
            <button className="btn three" id="three" onClick={handleNumber}>3</button>
            <button className="btn subtract" id="subtract" onClick={handleOperator}>-</button>
            <button className="btn four" id="four" onClick={handleNumber}>4</button>
            <button className="btn five" id="five" onClick={handleNumber}>5</button>
            <button className="btn six" id="six" onClick={handleNumber}>6</button>
            <button className="btn seven" id="seven" onClick={handleNumber}>7</button>
            <button className="btn eight" id="eight" onClick={handleNumber}>8</button>
            <button className="btn nine" id="nine" onClick={handleNumber}>9</button>
            <button className="btn decimal" id="decimal" onClick={handleNumber}>.</button>
            <button className="btn zero" id="zero" onClick={handleNumber}>0</button>
            <button className="btn equals" id="equals" onClick={handleEquals}>=</button>
          </div>
        </div>
        <div className="author">
          <p>Designed and Coded By <br />Felipe Machado</p>
        </div>
      </div>
    </div>
  );
}

export default App;
