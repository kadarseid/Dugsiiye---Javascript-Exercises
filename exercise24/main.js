function calculateArea(width, height = width) {
  const area = width * height;
  return area;
}

console.log(calculateArea(20, 10));
console.log(calculateArea(15));
