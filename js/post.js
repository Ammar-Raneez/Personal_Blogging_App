/**
 * TODO (Together): Create getPostIdParam to get the id of the post to use in the request later
 * TODO: Complete getPost function to get post data from API
 * TODO: Complete buildPost function to fill in the post data in the post.html file using ids
 */
const API_URL = "https://mysterious-escarpment-41897.herokuapp.com/api/models/posts";
const API_BASE_URL = "https://mysterious-escarpment-41897.herokuapp.com/";

window.onload = () => {
    var date = new Date();
    document.getElementById("date").innerText = date.getFullYear();
    
    getPost();
}
console.log(localStorage)

//if user is saved in our local storage, it means we are logged in, so update and delete rights are provided
if(localStorage.length>=2) {
    document.getElementById("delete").classList.remove("hide");
    document.getElementById("update").classList.remove("hide");
} else {
    document.getElementById("delete").classList.add("hide");
    document.getElementById("update").classList.add("hide");
}

const getPostIdParam = () => {
    const queryString = window.location.search; //gets the url we reach
    const urlParams = new URLSearchParams(queryString); //javascript function that gets our search params, in an URLParams array
    return urlParams.get("id");                //we extract the id from the search params
}

const getPost = () => {
    const postId = getPostIdParam();

    //this url is what we use to direct to the update-post page, upon clicking edit
    const editLink = `update-post.html?id=${postId}`;
    document.getElementById('update').addEventListener('click', () => window.location.href = editLink);

    fetch(`${API_URL}${postId}`, {     //we fetch the url that we used in posts.js to getIndividualBlogPost, so that
        method: 'GET'                  //we can get each object individually rather than again looping thru  
    }) 
    .then(response => response.json())
    .then(data => buildPost(data));
}

const buildPost = (data) => {
    const postDate = new Date(parseInt(data.added_date)).toDateString();
    const postAuthor = data.author;
    const postImage = `${API_BASE_URL}${data.post_image}`;

    document.getElementById("individual-post-title").innerText = data.title;
    document.getElementById("individual-post-content").innerText = data.content;
    document.getElementById("individual-post-date").innerText = `Published on, ${postDate}\nAuthor, ${postAuthor}`;

    document.body.style.backgroundImage = `url(${postImage})`;
}


const getDeletedPost = () => {              //url used is the same, so is the requested parameter
    const postId = getPostIdParam();        //thereby making it the same as getting an individual post, but with the method of delete
    const confirmation = confirm("Are you sure you want to Delete This Post?");
    if(confirmation){
        fetch(`${API_URL}${postId}`, {     
            method: 'DELETE'                  
        }) 
        .then(response => response.json())
        .then(data => deletePost(data));
    }
}

const deletePost = data => window.location.href = "home.html"   //we simply redirect back to home page on deletion

document.getElementById('delete').addEventListener('click', () => getDeletedPost); 
