import React, {useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { onAuthStateChanged } from 'firebase/auth';
import auth from './context/firebase-config';

function App() {
    document.body.style.backgroundColor = '#E8F6EF'
    const [loggeduser, setloggeduser] = useState("")
    onAuthStateChanged(auth, (currentuser)=>{
        if(currentuser){
            setloggeduser(currentuser)
        }
        else{
            setloggeduser("")
        }
    })
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Login user={loggeduser}/>}/>
                    <Route exact path="/register" element={<Register/>}/>
                    <Route exact path="/home" element={<Home user={loggeduser}/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
