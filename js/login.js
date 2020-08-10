const firebaseApp = {
    apiKey: "AIzaSyCLTvYkOcSjCjihKsxqAGFkRZ1VjaB7x6M",
    authDomain: "porfolio-ammar-raneez.firebaseapp.com",
    databaseURL: "https://porfolio-ammar-raneez.firebaseio.com",
    projectId: "porfolio-ammar-raneez",
    storageBucket: "porfolio-ammar-raneez.appspot.com",
    messagingSenderId: "612362088045",
    appId: "1:612362088045:web:bafaf50fd6f6121bb69964",
    measurementId: "G-JVFN9NJELD"
}

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