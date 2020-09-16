const fs = require('fs');                       //file system module, for writing and reading our files
const path = require('path');                   //path module 
const PATH = path.join(__dirname, "../", "../", "/data.json"); //path to the data json file

const API_URL = "https://mysterious-escarpment-41897.herokuapp.com/api/models/posts/";

class Post {
    //get posts
    get() {
        // console.log(this.readData())
        // return this.readData();
        return this.readData()
    }

    //read data from json
    readData() {
        // fetch(API_URL, {
        //     method: 'GET'
        // })
        // .then(res => res.json())
        // .then(data => console.log(data))
        
        let file = fs.readFileSync(PATH);
        return JSON.parse(file);        	    //we parse it, converting it into actual JSON from raw data
    }

    //get individual post, based on postid
    getIndividualBlog(postId) {
        const posts = this.readData();          //get the posts, pass our parameter (id of post needed) and return foundPost, if present, else null
        const foundPost = posts.find(post => post.id === postId);
        return foundPost;
    }

    //add data into json
    storeData(rawData) {
        fs.writeFile(PATH, JSON.stringify(rawData), err => {
            if(err) throw err;                  //we get the raw data, convert it into a string and write it
        })
        //the above asynchronous way is preferred
        // let file = JSON.stringify(rawData);
        // fs.writeFileSync(PATH, file);   
    }

    //add new post
    add(newPost) {
        const currentPosts = this.readData();   //we get current json file, add current new post onto the beginning and restore it, overwriting our old json with our new one  
        currentPosts.unshift(newPost);          //we use unshift to add it to the top
        this.storeData(currentPosts);
    }

    //delete post
    delete(postId) {
        const posts = this.readData();         //we follow same method as getting an individual post, we then remove that post of our posts variable and overwrite the json 
        const foundPost = posts.find(post => post.id === postId);
        const index = posts.indexOf(foundPost);
        posts.splice(index, 1);
        this.storeData(posts);
        return posts;
    }

    //update post
    update(postId, updatedPost) {
        const posts = this.readData();
        const foundPost = posts.find(post => post.id === postId);
        const index = posts.indexOf(foundPost);
        posts.splice(index, 1, updatedPost);        //splicing here removes 1 element from the found index, in our case what to update, and adds the updatedPost at that index
        
        this.storeData(posts);
    }
}

module.exports = Post;