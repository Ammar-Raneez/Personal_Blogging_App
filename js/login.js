const firebaseConfig = {
    apiKey: "AIzaSyBqTGpNqCeoPKJWf6BZstI_6cRD29knheU",
    authDomain: "portfolio-blog-32c3d.firebaseapp.com",
    projectId: "portfolio-blog-32c3d",
    storageBucket: "portfolio-blog-32c3d.appspot.com",
    messagingSenderId: "980455012470",
    appId: "1:980455012470:web:ca77d17714302fa78a4757",
    measurementId: "G-67TZPSME1E"
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