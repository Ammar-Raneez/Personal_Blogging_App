/*OUR SERVER FILE WE ARE USING NODEJS WITH THE EXPRESSJS FRAMEWORK*/
const express = require("express");             //takes express from node modules
const app = express();                          //app is an instance of express
const path = require('path');
const fs = require('fs')
const PATH = path.join(__dirname, "./data.json"); 
const data = JSON.parse(fs.readFileSync(PATH));//we need the json file for update functionality


const multer = require("multer");               //multer is primarily used in handling form data and uploading files
const storage = multer.diskStorage({            //since we'll use a form to get data and upload files on it, we use multer 
    destination: (req, file, cb) => {
        cb(null, "./uploads/")                  //destination as to where to save the file  
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`) 
    }                                           //our file name
})

//mimetype lets us find the extension of our file, whether its png, jpeg or jpg
const getExt = MimeType => {
    switch(MimeType) {                          
        case "image/png":
            return ".png";
        case "image/jpeg":
            return ".jpeg";
        case "image/jpg":
            return ".jpg";
    }
}
var upload = multer({ storage: storage });      //storage in a multer attribute which specifies where the file must be uploaded


const Post = require("./api/models/posts");     //importing our posts.js  module
const postData = new Post();                    //creating an object of the Post class from the imported module

//adding a middleware, that stands between our endpoints and our requests
//in order for our localhost:5500 to fetch data from localhost:3000 we need to allow access
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");  //allow my response to be shared for anyone who requests it
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();                                             //keep going onto the next endpoint
});


app.use(express.json());                        //makes json into an object that we can use later to be usable by node
app.use("/uploads", express.static('uploads')); //here we convert out uploads folder onto a static folder - to be able to view it on the net publicly
//doing this also removes the necessity of accessing each image by get
app.use(express.static('public'));


app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, "indexBlog.html"))
})

//these are routing method endpoints - routing refers to how an application responds to a clients request to a particular end point
app.get("/api/models/posts", (req, res) => {    //by "get" we mean "get" the data from this url 
    res.status(200).send(postData.get())        //app responds with posts, for requests from the api/posts url, upon a status code of 200
});
/*the url it uses is the url to the posts.html page that displays all the posts*/

//the posts/:post_id, is the format for getting parameters
app.get("/api/models/posts/:post_id", (req, res) => {
    const postId = req.params.post_id;          //this statement gets the parameters from request and further the post_id of url parameter
    const foundPost = postData.getIndividualBlog(postId);
    if(foundPost) {                             //we pass that url parameter as function defined in posts.js and respond with the post/error if present
        res.status(200).send(foundPost);
    } else (
        res.status(404).send("Error Image Not Found")
    )
});
/*the url it uses is the url to each post page that is within posts.html (api/models/posts/id, specific post)*/

//post method, we use this in order to add a new post, req.body refers to the content we got from the request and it consists of what we pass in
app.post("/api/models/posts", upload.single("post-image"), (req, res) => {      //able to upload only one picture
    const post = req.body;
    if(!post.title || !post.content)            //here we ensure title and content is filled
        return

    try{                                        //here we wrap the entire thing in a try-catch to ensure an image has been selected
        let fileUrl = req.file.path;
        fileUrl = fileUrl.replace("\\", "/");       //THIS SHIT WAS NECESSARY TO REPLACE THAT ANNOYING "\\" WITH "/"

        const newPost = {
            "id": `${Date.now()}`,                  //req.body is the content of the data we submit on request
            "title": post.title,                //all the content of the request, is passed into an object and added is stored in our json
            "author": post.author,
            "content": post.content,
            "post_image": fileUrl,                  //path of the file
            "added_date": `${Date.now()}`
        }
    
        postData.add(newPost);
        res.status(201).send(newPost);              //status of 201 means some change has been made
    } catch(error) {
        console.log("Image hasn't been selected");
    }
});
/*url used is for the posts.html page, that must be updated upon a post request, aka upon a addition of a blog post */

//delete functionality, same as getting inidividual post, only with delete request
app.delete("/api/models/posts/:post_id", (req, res) => {
    const postId = req.params.post_id
    postData.delete(postId);
    res.status(201).send(postId);
});

//update functionality, my MASTERMIND idea
app.put("/api/models/posts/:post_id", upload.single("post-image"), (req, res) => {
    const postId = req.params.post_id;

    const updated = req.body;       //current input
    let updatedPost;                //object to hold our updated data

    let bool = false;               //for image changing
    let file;

    //we wrap the following in a try-catch block, if the req.file does indeed have a path value, this means that
    //an image has been chosen, if so we set the boolean to true, if not it remains false
    //wrapped in a try catch cuz it crashes otherwise
    try{
        file = req.file.path;
        file = req.file.path.replace("\\", "/");
        if(file) bool = true;
    } catch (error) {
        console.log("You chose to use the same image")
    }

    data.forEach(each => {
        if(each.id == postId) {
            updatedPost = {
                "id": `${Date.now()}`,                  
                "title": updated.title? updated.title : each.title,         //we check whether a title or content has been added
                "author": updated.author? updated.author: each.author,
                "content": updated.content? updated.content : each.content, //if so overwrite original, else keep original
                "post_image": bool? file : each.post_image,//we use the boolean variable here as the ternary operation                
                "added_date": `${Date.now()}`    
            }
        }
    })

    postData.update(postId, updatedPost);
    res.status(201).send(updatedPost);
})

app.use(express.static(path.join(__dirname, '/')));
app.listen(process.env.PORT || 3000); 
//3000 due to the fact that, thats our local host, listen to this particular port upon starting a server