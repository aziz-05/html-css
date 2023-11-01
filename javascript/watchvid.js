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
