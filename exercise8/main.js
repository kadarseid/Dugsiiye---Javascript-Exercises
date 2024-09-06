let car = {
  make: "Toyota",
  model: "Land Cruiser",
  year: 2007,
};

console.log(car.make); // Output: Toyota
console.log(car.model); // Output: Land Cruiser
console.log(car.year); // Output: 2007

car.color = "black";
console.log(car); // {make: 'Toyota', model: 'Land Cruiser', year: 2007, color: 'black'}

car.year = 2024;
console.log(car); // {make: 'Toyota', model: 'Land Cruiser', year: 2024, color: 'black'}
