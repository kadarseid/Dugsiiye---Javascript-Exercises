async function FetchUsers() {
  console.log("Fetching Users Data");
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();

    console.log("List of users:", users);
  } catch (error) {
    console.log(error);
  }
}

FetchUsers();
