const postForm = document.querySelector(".post-form");
const postTitle = document.querySelector(".post-title-input");
const postImageUrl = document.querySelector(".post-url-input");
const postDescription = document.querySelector(".post-description-textarea");
const posts = document.querySelector(".posts");

document.addEventListener("DOMContentLoaded", loadDom);

function loadDom() {
  const posts = JSON.parse(localStorage.getItem("posts"));

  posts.forEach((post) => {
    addPostToDom(post);
  });
}

postForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = postTitle.value;
  const src = postImageUrl.value;
  const description = postDescription.value;

  if (title !== "" && description !== "") {
    const post = {
      id: Date.now(),
      title,
      src,
      description,
    };

    addPostToDom(post);
    saveToLocaleStorage(post);
  }

  postForm.reset();
});

function addPostToDom(post) {
  const div = document.createElement("div");
  div.classList.add("post");
  posts.appendChild(div);

  const h3 = document.createElement("h3");
  h3.textContent = post.title;
  h3.classList.add("post-title");
  div.appendChild(h3);

  const img = document.createElement("img");
  img.src = post.src;
  img.classList.add("post-img");
  div.appendChild(img);

  const p = document.createElement("p");
  p.textContent = post.description;
  p.classList.add("post-description");
  div.appendChild(p);

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-btn");
  div.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-btn");
  div.appendChild(deleteButton);

  attachEventListener(post.id, div);
}

function attachEventListener(id, div) {
  const editButton = div.querySelector(".edit-btn");
  const deleteButton = div.querySelector(".delete-btn");

  editButton.addEventListener("click", function () {
    handleEdit(id, div);
  });

  deleteButton.addEventListener("click", function () {
    handleDelete(id, div);
  });
}

function handleEdit(id, div) {
  const postTitleText = div.querySelector(".post-title");
  const postImageUrlText = div.querySelector(".post-img");
  const postDescriptionText = div.querySelector(".post-description");

  const newTitle = prompt("Edit your post title:", postTitleText.textContent);
  const newImageUrl = prompt(
    "Edit your post image url:",
    postImageUrlText.textContent
  );
  const newDescription = prompt(
    "Edit your post title:",
    postDescriptionText.textContent
  );

  if (
    newTitle !== null &&
    newTitle.trim() !== "" &&
    newDescription !== null &&
    newDescription.trim() !== ""
  ) {
    updatePost(id, newTitle, newImageUrl, newDescription);
    postTitleText.textContent = newTitle;
    postImageUrlText.src = newImageUrl;
    postDescriptionText.textContent = newDescription;
  }
}

function updatePost(id, newTitle, newImageUrl, newDescription) {
  const posts = getFromLocalStorage();

  const post = posts.find((post) => post.id === id);

  if (post) {
    post.title = newTitle;
    post.src = newImageUrl;
    post.description = newDescription;
    localStorage.setItem("posts", JSON.stringify(posts));
  }
}

function handleDelete(id, div) {
  let posts = getFromLocalStorage();

  posts = posts.filter((post) => post.id != id);

  localStorage.setItem("posts", JSON.stringify(posts));

  div.remove();
}

function saveToLocaleStorage(post) {
  const oldPosts = JSON.parse(localStorage.getItem("posts")) || [];

  oldPosts.push(post);

  localStorage.setItem("posts", JSON.stringify(oldPosts));
}

function getFromLocalStorage() {
  const oldPosts = JSON.parse(localStorage.getItem("posts"));
  return oldPosts;
}
