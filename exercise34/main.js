let newItemIndex = 1;

function addItem() {
  newItemIndex++;
  const items = document.querySelector("#items");
  const newItem = document.createElement("li");
  newItem.textContent = `Item ${newItemIndex}`;
  items.appendChild(newItem);
}

function removeItem() {
  const items = document.querySelector("#items");
  newItemIndex--;
  items.removeChild(items.lastChild);
}
