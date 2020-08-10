const API_URL = "http://localhost:3000/api/models/posts";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPosts();
}

const getPosts = () => {
    fetch(API_URL, {
        method: 'GET'
    }).then(response => response.json())
    .then(data => buildPosts(data))
}

const buildPosts = (blogPosts) => {
    let blogPostContent = ``;

    for(blogPost of blogPosts) {
        const postDate = new Date(parseInt(blogPost.added_date)).toDateString();
        const postAuthor = blogPost.author;
        const postImage = `${API_BASE_URL}${blogPost.post_image}`;
        const linkToPost = `post.html?id=${blogPost.id}`    //the pattern of the url

        blogPostContent += `
            <a class='linkToPost' href='${linkToPost}'>
                <div class="post" style="background-image: url(${postImage})">
                    <div class="post-image" style="background-image: url(${postImage})"></div>

                    <div class="post-content">
                        <div class="post-date">${postDate}, ${postAuthor}</div>
                        <div class="post-title">${blogPost.title}</div>
                        <div class="post-text">${blogPost.content}</div>
                    </div>
                </div>
            </a>
        `
    }
    document.getElementById("blog-posts").innerHTML = blogPostContent;
    
    var date = new Date();
    document.getElementById("date").innerText = date.getFullYear();
}