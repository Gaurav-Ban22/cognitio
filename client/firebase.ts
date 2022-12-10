import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD9vQxW1CYLXe32BFC7-r4aL2ziWRQRCv4",
    authDomain: "cognitio-c5eae.firebaseapp.com",
    projectId: "cognitio-c5eae",
    storageBucket: "cognitio-c5eae.appspot.com",
    messagingSenderId: "766772019938",
    appId: "1:766772019938:web:3c0f2e8937c75ef7ee94bb",
    measurementId: "G-937V24TZNE"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth }