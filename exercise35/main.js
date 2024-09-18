const image = document.querySelector(".image");

function changeImage() {
  const newUrl = prompt("Enter the new image url?");
  const borderColor = prompt("Enter the border color?");
  const width = prompt("Enter the width of the image (in pixels)?");
  const height = prompt("Enter the height of the image (in pixels)?");
  const borderRadius = prompt("Enter the border radius (in pixels)?");

  image.setAttribute("src", newUrl);
  image.style.border = `3px solid ${borderColor}`;
  image.style.width = `${width}px`;
  image.style.height = `${height}px`;
  image.style.borderRadius = `${borderRadius}px`;
}
