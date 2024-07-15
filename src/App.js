import './App.css';
import { useState } from 'react';

function App() {
  const [displayText, setDisplayText] = useState('0'); 
  const MAX_DIGITS = 22;

  const handleNumber = (event) => {
    const number = event.target.textContent;
  }

  return (
    <div className="App">
      <div>
        <div className="calculator">
          <div className="formula"></div>
          <div className="output" id="display" style={{ fontSize: calculateFontSize() }}>
            {displayText}
          </div>
          <div className="buttons-container">
            <button className="btn clear" id="clear" onClick={handleNumber}>AC</button>
            <button className="btn divide" id="divide" onClick={handleNumber}>/</button>
            <button className="btn multiply" id="multiply" onClick={handleNumber}>x</button>
            <button className="btn add" id="add" onClick={handleNumber}>+</button>
            <button className="btn one" id="one" onClick={handleNumber}>1</button>
            <button className="btn two" id="two" onClick={handleNumber}>2</button>
            <button className="btn three" id="three" onClick={handleNumber}>3</button>
            <button className="btn subtract" id="subtract" onClick={handleNumber}>-</button>
            <button className="btn four" id="four" onClick={handleNumber}>4</button>
            <button className="btn five" id="five" onClick={handleNumber}>5</button>
            <button className="btn six" id="six" onClick={handleNumber}>6</button>
            <button className="btn seven" id="seven" onClick={handleNumber}>7</button>
            <button className="btn eight" id="eight" onClick={handleNumber}>8</button>
            <button className="btn nine" id="nine" onClick={handleNumber}>9</button>
            <button className="btn decimal" id="decimal" onClick={handleNumber}>.</button>
            <button className="btn zero" id="zero" onClick={handleNumber}>0</button>
            <button className="btn equals" id="equals" onClick={handleNumber}>=</button>
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
