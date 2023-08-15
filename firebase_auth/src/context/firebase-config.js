import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

//copy these details from firebase console
const firebaseConfig = {
    apiKey: "AIzaSyDzTt3LeZ8WQmS621tSUcHz0kvQTkjt9EY",
    authDomain: "fir-react-auth-bcfdf.firebaseapp.com",
    projectId: "fir-react-auth-bcfdf",
    storageBucket: "fir-react-auth-bcfdf.appspot.com",
    messagingSenderId: "449258028782",
    appId: "1:449258028782:web:eda6c894a84dd0ebd4fdff",
    measurementId: "G-G558P2D58D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;