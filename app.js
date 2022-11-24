const videoContainer = document.querySelector('.video-container');

let api_key = "AIzaSyAyRUXdXuAShdGdlobE82faU-uQX9qXkak";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
let search = "https://www.googleapis.com/youtube/v3/search";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'player,contentDetails,snippet',
    chart: 'mostPopular',
    maxResults: 100,
    regionCode: 'IN'
}))
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.items.forEach(item => {
            getChannelIcon(item);
        })
    })
    .catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
        .then(res => res.json())
        .then(data => {
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            makeVideoCard(video_data);
        })
}

const makeVideoCard = (data) => {
    console.log(data)
    videoContainer.innerHTML += `
    <div class="video" onclick="location.href="https://www.youtube.com/watch?v=${data.id}"">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">

        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}

// search bar

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if (searchInput.value.length) {
        location.href = searchLink + searchInput.value;
    }
})

function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
  }
  
  function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
  }
  
