/**
 * TODO: Finish submitNewPost function to submit form data to the API 
 */

const API_URL = "https://mysterious-escarpment-41897.herokuapp.com/api/models/posts/";

const submitNewPost = () => {
    var date = new Date();
    document.getElementById("date").innerText = date.getFullYear();
    
    // HINT: Use FormData to store data to send over
    // HINT: Redirect the user to home page after successful submission
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
        
        fetch(API_URL, {
            method: "POST",
            body: data
        }).then(() => {
                window.location.href = "home.html"
        })
        //we redirect to home page upon addition
    } else {
        alert("Please fill In all the Fields")
    }

}