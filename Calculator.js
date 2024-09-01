const display = document.getElementById('display');
const btn = document.querySelectorAll('.buttons button');

function Calculate(expression) {
    // Remove white spaces
    expression = expression.split('').filter(char => char !== '').join('');

    // Check if every character in the expression is a valid character
    let expressionArray = expression.split("");
    let commonChar = ".1234567890-+*/^()[]{}";
    
    if (!expressionArray.every(char => commonChar.includes(char))) {
        return "Error";
    }
    // Check if expression attempts to divide by zero
    else if (expression.includes("/0")) {
        return "Cannot divide by zero";
    }
    // Evaluate the expression safely
    else {
        try {
            let result = new Function('return ' + expression)();
            return result;
        } catch (error) {
            return "Error";
        }
    }
}

function clickButton(event) {
    let buttonValue;
    if (event.type === 'keydown') {
        // If it's a keyboard event, use event.key
        buttonValue = event.key;
    } else {
        // If it's a click event, use event.target.textContent
        buttonValue = event.target.textContent;
    }
    let currentDisplayValue = display.textContent; 
    // Pressing 'clear' button
    if (buttonValue === "clear") {
        currentDisplayValue = '0';
    }
    // Pressing '=' button
    else if (buttonValue === "=") {
        currentDisplayValue = Calculate(currentDisplayValue).toString();
    } 
    // Pressing 'backspace' button
    else if (buttonValue === "backspace") {
        if (currentDisplayValue.length > 1) {
            currentDisplayValue = currentDisplayValue.slice(0,-1);
        }
        else{
            currentDisplayValue = '0';
        }
    }
    // Pressing other buttons
    else {
        if (currentDisplayValue == "0") {
            currentDisplayValue = buttonValue;
        } else {
            currentDisplayValue += buttonValue;
        }
    }
    
    display.textContent = currentDisplayValue;
}

btn.forEach(button => {
    button.addEventListener("click", clickButton);
});

document.addEventListener("keydown", (event) => {
    const key = event.key;

    // Map keyboard keys to calculator functions
    if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
        clickButton({ key: key, type: 'keydown' }); 
    } else if (key === 'Enter' || key === '=') {
        clickButton({ key: '=', type: 'keydown' });  
    } else if (key.toLowerCase() === 'backspace') {
        clickButton({ key: 'backspace', type: 'keydown' });  
    } else if (key.toLowerCase() === 'clear') {
        clickButton({ key: 'clear', type: 'keydown' }); 
    }
});
