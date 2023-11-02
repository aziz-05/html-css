/*
let productsHTML = '';
let i =0;
while (i<products.length) {
    products.forEach((product,index) => {
        productsHTML += `
        <div class="video-preview">
        <div class="thumbnail-row">
          <img class="thumbnail" src="${product.thumbnails}">
          <div class="video-time">${product.time}</div>
        </div>
        <div class="video-info-grid">
          <div class="chanel-pic">
          <img class="profile-pic" src="${product.pics}">
          </div>
          <div class="video-info">
            <p  class="video-title">
              ${product.title}
            </p>
          <div class="video-author">  <p >
            ${product.author}
          </p></div>
          <div class="checkmark">  <p>
              &#10003;
          </p></div>
          
            <p class="video-stats">
              ${product.stats.vues} <strong>&#183;</strong> ${product.stats.streamed}
            </p>
          </div>
        </div>
    
      
      </div>
   
       `;
   });
   
   
   document.querySelector('.js-products-grid').innerHTML = productsHTML;
    i++;
}



*/








const videoCardContainer = document.querySelector('.js-products-grid');

let api_key = "AIzaSyCWiD1bMgO0zaofUVTWxXkmsCnlql9XxRs";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet,statistics,contentDetails',
    //part: "contentDetails",
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
        console.log(item);
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
        console.log(video_data);
        makeVideoCard(video_data);
    })
}
/*
const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
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
*/




function convert_time(duration) {
  var a = duration.match(/\d+/g);

  if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
      a = [0, a[0], 0];
  }

  if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
      a = [a[0], 0, a[1]];
  }
  if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
      a = [a[0], 0, 0];
  }

  duration = 0;

  if (a.length == 3) {
      duration = duration + parseInt(a[0]) * 3600;
      duration = duration + parseInt(a[1]) * 60;
      duration = duration + parseInt(a[2]);
  }

  if (a.length == 2) {
      duration = duration + parseInt(a[0]) * 60;
      duration = duration + parseInt(a[1]);
  }

  if (a.length == 1) {
      duration = duration + parseInt(a[0]);
  }
  return duration
}







const makeVideoCard = (data) => {
  let azaz = ((data.statistics.viewCount).length >6) ? (data.statistics.viewCount).slice(0, 1)+"M": (data.statistics.viewCount).slice(0, 3)+"k";
  videoCardContainer.innerHTML += `
  <div class="video-preview" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
  <div class="thumbnail-row">
    <img class="thumbnail" src="${data.snippet.thumbnails.high.url}">
    <div class="video-time">${convert_time(data.contentDetails.duration)}</div>
  </div>
  <div class="video-info-grid">
    <div class="chanel-pic">
    <img class="profile-pic" src="${data.channelThumbnail}">
    </div>
    <div class="video-info">
      <p  class="video-title">
        ${data.snippet.title}
      </p>
    <div class="video-author">  <p >
      ${data.snippet.channelTitle}
    </p></div>
    <div class="checkmark">  <p>
        &#10003;
    </p></div>
    
      <p class="video-stats">
        ${azaz} <strong>&#183;</strong> ${(data.snippet.publishedAt).slice(0, 10)}
      </p>
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
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})

