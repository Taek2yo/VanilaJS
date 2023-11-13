let memory = "0";
let current = "0";
let operation = 0;

function updateDisplay(value) {
  document.getElementById("displayValue").textContent = value;
}

function clearResult() {
  current = "0";
  operation = 0;
  memory = "0";
  updateDisplay(current);
}

function addValue(num) {
  current =
    parseFloat(current) === 0 && !current.includes(".") ? num : current + num;
  updateDisplay(current);
}

function addDecimal() {
  if (!current.includes(".")) {
    current += ".";
  }
  updateDisplay(current);
}

function plusMinus() {
  current = current.startsWith("-") ? current.slice(1) : "-" + current;
  if (parseFloat(current) === 0 && !current.includes(".")) {
    current = "0";
  }
  updateDisplay(current);
}

function addOperation(op) {
  if (operation !== 0) {
    calculate();
  }

  if (["*", "/", "+", "-"].includes(op)) {
    operation = ["*", "/", "+", "-"].indexOf(op) + 1;
  }

  memory = current;
  current = "";

  updateDisplay(current);
}

function percent() {
  current =
    parseFloat(memory) === 0
      ? parseFloat(current) / 100
      : (parseFloat(current) / 100) * parseFloat(memory);
  updateDisplay(current);
}

function calculate() {
  const operators = ["*", "/", "+", "-"];

  if (operation >= 1 && operation <= 4) {
    current = performOperation(
      operators[operation - 1],
      parseFloat(memory),
      parseFloat(current)
    );
  }

  operation = 0;
  memory = "0";

  updateDisplay(current);
}

function performOperation(operator, num1, num2) {
  switch (operator) {
    case "*":
      return num1 * num2;
    case "/":
      return num2 !== 0 ? num1 / num2 : "Error";
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    default:
      return "Error";
  }
}
