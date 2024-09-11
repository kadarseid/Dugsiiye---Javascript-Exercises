const numbers1 = [1, 2, 3];
const numbers2 = [4, 5, 6];

const allNumbers = [...numbers1, ...numbers2];
console.log(allNumbers);

function multiply(...numbers) {
  return numbers.reduce((multiplication, number) => multiplication * number);
}

console.log(multiply(10, 5, 15));
