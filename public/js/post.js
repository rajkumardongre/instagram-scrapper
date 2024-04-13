import moment from 'https://cdn.jsdelivr.net/npm/moment@2.30.1/+esm'

async function fetchPost(id) {
    try {
        openModal("Loading...")
        const response = await fetch(`/api/posts/${id}`)
        const data = await response.json();
        console.log(data)
        if(!data.success){
            throw new Error(data.error)
        }
        displayPost(data.data);
        
        closeModal();
    } catch (error) {
        openModal(error.message);
        console.error("Error fetching posts:", error)
    }
}

function displayPost(post) {
    var postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = `
    <div class="post">
            <div class="post-image">
                <img id="post-img" src="${post.postImgUrl}" alt="${post.alt}">
            </div>
            <div class="post-details">
                <h2 class="author-name">@${post.author}</h2>
                <p class="date">${moment(post.time).fromNow()}</p>
                <p class="caption">${post.caption}</p>
            </div>
        </div>
    `; 
    // new cDg(`post-img`).view();
}

const splitUrl = window.location.href.split('/');
const n = splitUrl.length
let space = 0;
if(splitUrl[n-1] == ""){
    space = 1
}
const postId = splitUrl[n-1-space];

fetchPost(postId)

