let buffer = "0";
let runningTotal = 0;
let previousOperator = null;
const display = document.querySelector('.result');

document.querySelector('.calc').addEventListener('click', function(event) {
    buttonClick(event.target.innerText);
});

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}

function handleSymbol(value) {
    switch (value) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;
        case "=":
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substr(0, buffer.length - 1);
            }
            break;
        default:
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = value;
    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

function rerender() {
    display.innerText = buffer;
}
// let btn = 0;
// let num = [];
// let result = 0;
// let display = document.querySelector('.result');

// let calc = document.querySelector('.calc').addEventListener('click', function(event) {
//     btn = event.target.innerText;
//     if (btn === "1" || btn === "2" || btn === "3" || btn === "4" || btn === "5" || btn === "6" || btn === "7" || btn === "8" || btn === "9" || btn === "0") {
//         // btn = parseInt(btn, 10);
//         // num.push(btn);
//         displayValue(btn);
//     } else {
//         switch (btn) {
//             case "+": 
//             result = add(num);
//             displayValue(result);
//             break;
//             case "-": 
//             result = subtract(num);
//             displayValue(result);
//             break;
//             case "x": 
//             result = multiply(num);
//             displayValue(result);
//             break;
//             case "/": 
//             result = divide(num);
//             displayValue(result);
//             break;
//             case "<": 
//             result = del(num);
//             displayValue(result);
//             break;
//             default:
//             displayValue(result);
//         }
//     }
// });
// function displayValue(item) {
//     display.innerText = item
//     return display
// }
// function multiplValues() {

// }
// function del(index) {
    
// }
// function add(arr) {
//     return arr.reduce((a, b) => a + b, 0);
// }
// function subtract(arr) {
//     let total = arr[0];
//     for (var i = 1; i < arr.length; i++) {
//         total -= arr[i];
//     }
//     return total;
// }