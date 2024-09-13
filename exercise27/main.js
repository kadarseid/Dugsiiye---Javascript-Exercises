function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = false;
      if (success) {
        resolve("Success");
      } else {
        reject("Failed");
      }
    }, 2000);
  });
}

fetchData()
  .then((response) => console.log(response))
  .catch((reason) => console.log(reason));
