const numbers = [1, 2, 3, 4, 5];

const multiplyNumbers = numbers.reduce(
  (multiplication, number) => multiplication * number
);

console.log(multiplyNumbers);
