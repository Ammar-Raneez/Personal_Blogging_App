import firebase from "firebase";

const firebaseApp = {
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

export { auth }