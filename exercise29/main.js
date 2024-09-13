async function fetchData() {
  const response = await fetch("user.json");
  const userData = await response.json();
  console.log("User data: ", userData);
  console.log("User Data fetching is complete");
}

fetchData();

console.log("Doesn't wait wait the data to be fetched");
