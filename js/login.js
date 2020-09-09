const firebaseApp = {
    apiKey: "AIzaSyAFNux9TUYh1jT1FxHFwg-7JInHkDYLOzo",
    authDomain: "portfolio-blog-22f82.firebaseapp.com",
    databaseURL: "https://portfolio-blog-22f82.firebaseio.com",
    projectId: "portfolio-blog-22f82",
    storageBucket: "portfolio-blog-22f82.appspot.com",
    messagingSenderId: "68880747255",
    appId: "1:68880747255:web:1356b23bc206b5e0d7e1f2",
    measurementId: "G-06NLDZQTQW"
};

firebase.initializeApp(firebaseApp);
const auth = firebase.auth()


var modal = document.getElementById("myModal");
var btn = document.getElementById("modalBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "flex";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


let userToExport;

document.getElementById('login').addEventListener('click', () => {
    let emailVal = document.getElementById("email").value;
    let passVal = document.getElementById("password").value;
    const promise = firebase.auth().signInWithEmailAndPassword(emailVal, passVal)
    promise.catch(error => alert(error))    
})

firebase.auth().onAuthStateChanged( user => {
    if(user) {
        document.getElementById("logout").classList.remove('hide');
        document.getElementById("add_post_display").classList.remove('hide');
        document.getElementById("modalBtn").classList.add('hide');
        document.getElementById("password").value = "";
        document.getElementById("email").value = "";
        modal.style.display = "none";
    }
})

document.getElementById("logout").addEventListener("click", () => {
    firebase.auth().signOut()
    document.getElementById("logout").classList.add('hide');
    document.getElementById("modalBtn").classList.remove('hide');
    document.getElementById("add_post_display").classList.add('hide');
    document.getElementById("password").value = "";
    document.getElementById("email").value = "";
})
localStorage.setItem("User", userToExport);