// Synchronous
console.log("Blocking code:");

function blocking() {
  alert("Fetching user data");
  return { name: "kadar", age: 25 };
}

console.log("Starting fetching user data");
const user = blocking();
console.log("user data: ", user);
console.log("This message is blocked");

// Asynchronous

console.log("Non-blocking code:");

function nonBlocking(callback) {
  setTimeout(() => {
    const user = { name: "kadar", age: 25 };
    callback(user);
  }, 2000);
}

console.log("Starting to fetch user data");

nonBlocking(function (user) {
  console.log("user data: ", user);
});

console.log("This shows up immediately, doesn't wait to fetch user data");
