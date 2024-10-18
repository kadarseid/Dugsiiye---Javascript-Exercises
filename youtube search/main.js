const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const query = document.getElementById("search-input").value;

  const url = `https://youtube-v3-alternative.p.rapidapi.com/search?query=${query}&type=video`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "fc8e7eb141mshc25be83817b0ac9p1b205bjsn4ac4c5cc5e54",
      "x-rapidapi-host": "youtube-v3-alternative.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    displayVideos(result.data);
  } catch (error) {
    console.log("search result error", error);
  }
});

function displayVideos(videos) {
  const videoList = document.getElementById("video-list");

  videoList.innerHTML = "";

  videos.forEach((video) => {
    const videoItem = document.createElement("div");
    videoItem.className = "video-item";
    videoItem.innerHTML = `
      <div class="video-thumbnail" style="background-image: url(${video.thumbnail[0].url}); width: 300px; height: 200px;")"></div>
      <div class="video-info">
        <div class="video-title">${video.title}</div>
        <div class="video-channel">${video.channelTitle}</div>
      </div>
    `;

    videoItem.addEventListener("click", () => openModel(video.videoId));

    videoList.appendChild(videoItem);
  });
}

function openModel(videoId) {
  const videoModal = document.getElementById("video-modal");

  const videoPlayer = document.getElementById("video-player");

  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  videoPlayer.src = videoUrl;
  videoModal.style.display = "block";

  document
    .getElementById("download-mp3")
    .addEventListener("click", async function () {
      const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`;

      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "fc8e7eb141mshc25be83817b0ac9p1b205bjsn4ac4c5cc5e54",
          "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (result.status === "ok") {
          window.location.href = result.link;
        } else {
          alert("Error downloading MP3");
        }
      } catch (error) {
        console.log("downloading error", error);
      }
    });
}

document.getElementById("close-modal").addEventListener("click", closeModal);

function closeModal() {
  const videoModal = document.getElementById("video-modal");
  videoModal.style.display = "none";
}

window.onclick = function (event) {
  const videoModal = document.getElementById("video-modal");
  if (event.target == videoModal) {
    closeModal();
  }
};
