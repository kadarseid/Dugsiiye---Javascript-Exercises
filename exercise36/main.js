const colorPicker = document.querySelector("#color-picker");
const colorPreview = document.querySelector(".color-preview");
const colorHistory = document.querySelector(".color-history");
const clearBtn = document.querySelector(".clear-btn");

colorPicker.addEventListener("input", () => {
  const selectedColor = colorPicker.value;
  colorPreview.style.backgroundColor = selectedColor;
  addColorToHistory(selectedColor);
});

function addColorToHistory(color) {
  const li = document.createElement("li");
  li.textContent = color;
  li.style.color = color;
  colorHistory.appendChild(li);
}

clearBtn.addEventListener("click", () => {
  colorHistory.innerHTML = "";
});
