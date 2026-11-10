const screen = document.getElementById("screen");
const digitButtons = document.querySelectorAll(".digit");
const operationButtons = document.querySelectorAll(".operation");
const themeBtn = document.getElementById("themeBtn");

let firstNumber = 0;
let operation = "";
let newNumber = false;
let error = false;

function showScreen(value) {
    screen.textContent = value;
}

function pressDigit(digit) {
    if (error) {
        resetCalculator();
    }

    if (newNumber || screen.textContent === "0") {
        screen.textContent = digit;
        newNumber = false;
    } 
    
    else if (screen.textContent.length < 12) {
        screen.textContent += digit;
    }
}

function pressDot() {
    if (error) {
        resetCalculator();
    }

    if (newNumber) {
        screen.textContent = "0";
        newNumber = false;
    }

    if (!screen.textContent.includes(".")) {
        screen.textContent += ".";
    }
}

function calculate() {
    let secondNumber = Number(screen.textContent);
    let result;

    switch (operation) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "−":
            result = firstNumber - secondNumber;
            break;

        case "×":
            result = firstNumber * secondNumber;
            break;

        case "÷":
            if (secondNumber === 0) {
                showScreen("Xeta!");
                error = true;
                operation = "";
                return;
            }

            result = firstNumber / secondNumber;
            break;
    }

    result = Number(result.toFixed(8));
    showScreen(result);
    firstNumber = result;
}

function pressOperation(selectedOperation) {
    if (error) return;

    if (operation !== "" && !newNumber) {
        calculate();
    }

    firstNumber = Number(screen.textContent);
    operation = selectedOperation;
    newNumber = true;
}

function pressEqual() {
    if (error || operation === "" || newNumber) {
        return;
    }

    calculate();

    operation = "";
    newNumber = true;
}

function resetCalculator() {
    firstNumber = 0;
    operation = "";
    newNumber = false;
    error = false;

    showScreen("0");
}

function pressBack() {
    if (error) {
        resetCalculator();
        return;
    }

    if (newNumber) return;

    let value = screen.textContent.slice(0, -1);

    if (value === "" || value === "-") {
        value = "0";
    }

    showScreen(value);
}

function pressSign() {
    if (error || newNumber) return;

    if (screen.textContent === "0") return;

    if (screen.textContent.startsWith("-")) {
        screen.textContent = screen.textContent.slice(1);
    } 
    
    else {
        screen.textContent = "-" + screen.textContent;
    }
}

function pressPercent() {
    if (error || newNumber) return;

    let result = Number(screen.textContent) / 100;

    showScreen(result);
    newNumber = true;
}

digitButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        pressDigit(button.textContent);
    });

});

operationButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        pressOperation(button.textContent);
    });

});

document.getElementById("clearBtn").addEventListener("click", resetCalculator);
document.getElementById("backBtn").addEventListener("click", pressBack);
document.getElementById("percentBtn").addEventListener("click", pressPercent);
document.getElementById("signBtn").addEventListener("click", pressSign);
document.getElementById("dotBtn").addEventListener("click", pressDot);
document.getElementById("equalBtn").addEventListener("click", pressEqual);

document.addEventListener("keydown", function(event) {
    let key = event.key;

    if (key >= "0" && key <= "9") {
        pressDigit(key);
    }

    else if (key === "." || key === ",") {
        pressDot();
    }

    else if (key === "+" || key === "-" ||
             key === "*" || key === "/") {

        if (key === "+") pressOperation("+");
        if (key === "-") pressOperation("−");
        if (key === "*") pressOperation("×");

        if (key === "/") {
            event.preventDefault();
            pressOperation("÷");
        }
    }

    else if (key === "Enter" || key === "=") {
        event.preventDefault();
        pressEqual();
    }

    else if (key === "Backspace") {
        pressBack();
    }

    else if (key === "Escape") {
        resetCalculator();
    }

    else if (key === "%") {
        pressPercent();
    }

});




// Tema deyismek
themeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        themeBtn.textContent = "☀";
    } else {
        themeBtn.textContent = "☾";
    }

});