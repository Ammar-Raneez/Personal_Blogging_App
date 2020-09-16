const API_URL = "https://mysterious-escarpment-41897.herokuapp.com/api/models/posts/";

//must display immediately on page load
window.onload = () => {
    getPost()
}

const getPostIdParam = () => {
    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString); 
    return urlParams.get("id");         
}

//display content of the post to edit
const getPost = () => {
    const postId = getPostIdParam()

    fetch(`${API_URL}${postId}`, {     
        method: 'GET'                  
    }) 
    .then(response => response.json())
    .then(data => buildPost(data));
}

const buildPost = data => {
    document.getElementById("form-post-title").value = data.title;
    document.getElementById("form-post-content").value = data.content;
    document.getElementById("form-post-author").value = data.author;
}


const submitNewPost = () => {
    const postId = getPostIdParam();
    
    // var date = new Date();
    // document.getElementById("date").innerText = date.getFullYear();

    const input = document.querySelector('input[type="file"]');
    const title = document.getElementById("form-post-title").value;
    const author = document.getElementById("form-post-author").value;
    const content = document.getElementById("form-post-content").value;

    if(input && title && author && content) {
        let data = new FormData();
        data.append("post-image", input.files[0]);
        data.append("title", title);
        data.append("author", author);
        data.append("content", content);

        fetch(`${API_URL}${postId}`, {
            method: "PUT",
            body: data
        }).then(() => {
            window.location.href = "home.html"
        })
    } else {
        alert("Please fill In all the Fields")
    }
}