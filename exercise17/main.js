const temperature = 25;

if (temperature < 0) {
  console.log("The temperature is Very cold");
} else if (temperature >= 0 && temperature < 15) {
  console.log("The temperature Cold");
} else if (temperature >= 15 && temperature < 25) {
  console.log("The temperature is Warm");
} else if (temperature >= 25) {
  console.log("The temperature is Hot");
}
