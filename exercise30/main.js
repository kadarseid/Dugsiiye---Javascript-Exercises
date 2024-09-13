function calculate(a, b, operation) {
  return operation(a, b);
}

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

console.log(`Addition: ${calculate(10, 5, add)}`);
console.log(`Subtraction: ${calculate(10, 5, substract)}`);
console.log(`Multiplication: ${calculate(10, 5, multiply)}`);
console.log(`Division: ${calculate(10, 5, divide)}`);
