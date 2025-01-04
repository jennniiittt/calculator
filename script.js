const display = document.getElementById("display");
const historyDisplay = document.getElementById("history");
let currentInput = ""; // Stores the current input
let previousInput = ""; // Stores the previous input
let operator = ""; // Stores the selected operator
let history = ""; // Stores the operation history

// Function to append numbers or operators
function append(value) {
    if (["+", "-", "*", "/", "%", "x^"].includes(value)) {
        if (currentInput === "" && value !== "-") return; // Prevent invalid operator usage

        if (previousInput === "") {
            operator = value;
            previousInput = currentInput; // Store the first operand
            currentInput = ""; // Clear current input for the next number
            history = `${previousInput} ${operator}`; // Update history
        } else {
            operator = value; // Update the operator
            history = `${previousInput} ${operator} ${currentInput}`; // Update history
        }
    } else if (value === "=") {
        calculate(); // Perform calculation
    } else {
        currentInput += value; // Append numbers
        history = `${previousInput} ${operator} ${currentInput}`; // Update history
    }
    updateDisplay();
}

// Function to calculate result
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return; // Prevent calculation errors

    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            result = current === 0 ? "Error" : prev / current; // Handle division by 0
            break;
        case "%":
            result = prev % current;
            break;
        case "x^":
            result = Math.pow(prev, current);
            break;
        default:
            return;
    }

    history += ` = ${result}`; // Add result to history
    currentInput = result; // Set result as the new current input
    operator = "";
    previousInput = "";
    updateDisplay();
}

// Function to update display and history
function updateDisplay() {
    historyDisplay.textContent = history || ""; // Show operation history
    display.value = `${previousInput} ${operator} ${currentInput}`.trim() || "0"; // Show current input
}

// Clear all inputs
function clearAll() {
    currentInput = "";
    previousInput = "";
    operator = "";
    history = "";
    updateDisplay();
}

// Event listener for all buttons
document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent.trim();

        if (value === "AC") {
            clearAll();
        } else if (["sin", "cos", "tan", "ln", "log", "√", "x!"].includes(value)) {
            advancedOperation(value);
        } else {
            append(value);
        }
    });
});
