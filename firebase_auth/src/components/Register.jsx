import React, {useState} from 'react';
import {createUserWithEmailAndPassword} from "firebase/auth";
import auth from '../context/firebase-config';
import Alert from './Alert';
import {useNavigate, Link} from 'react-router-dom';
import Spinner from './Spinner';

export default function Register() {
    const navigate = useNavigate();
    const [registeremail, setregisteremail] = useState("")
    const [registerpassword, setregisterpassword] = useState("")
    const [err, seterr] = useState(false)
    const [spinner, setspinner] = useState(false)
    const getemail = (event)=>{
        setregisteremail(event.target.value)
    }
    const getpassword = (event)=>{
        setregisterpassword(event.target.value)
    }
    const register_func=async()=>{
        try{
            setspinner(true);
            await createUserWithEmailAndPassword(auth, registeremail, registerpassword);
            setregisteremail("");
            setregisterpassword("");
            setspinner(false);
            navigate("/home")
        }catch(e){
            setspinner(false);
            setregisteremail("");
            setregisterpassword("");
            seterr(true);
            setTimeout(()=>{
                seterr(false);
            }, 1500);
        }        
    }
    return (
        <>
            <Alert err={err} title={"⚠️ Try registering again ! Maybe the username is taken or you have entered a invalid email id."} color={'danger'}/>
            <Spinner spinner={spinner}/>
            <div className="container my-5">
                <div className="col">
                    <h1 className='text-center'>Register Form</h1>
                    <div className="row justify-content-center my-4">
                        <img className="img1" alt="..." src="https://cdn-icons-png.flaticon.com/512/295/295128.png" style={{height: '200px', width: '220px'}}/>
                    </div>
                    <div className="row justify-content-center my-5">
                        <div className="mb-3 row justify-content-center">
                            <strong htmlFor="inputEmail" className="col-sm-1 col-form-label">Email</strong>
                            <div className="col-sm-8">
                                <input type="email" className="form-control" id="inputEmail" placeholder="name@example.com" onChange={getemail} value={registeremail}/>
                            </div>
                        </div>
                        <div className="mb-3 row justify-content-center">
                            <strong htmlFor="inputPassword" className="col-sm-1 col-form-label" >Password</strong>
                            <div className="col-sm-8">
                                <input type="password" className="form-control" id="inputPassword" placeholder="password@123" onChange={getpassword} value={registerpassword}/>
                                <div id="passwordHelpBlock" className="form-text">Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.</div>
                            </div>
                        </div>
                        <div className='text-center'>
                            <div className="text-center" role="toolbar" aria-label="Toolbar with button groups">
                                <div className="btn-group me-2 my-1 text-center" role="group" aria-label="First group">
                                    <button disabled={registeremail.length===0 || registerpassword.length<=7?true:false} type="button" className="btn btn-dark" onClick={register_func}>Register</button>
                                </div>
                                <div className="btn-group me-2 my-1 text-center" role="group" aria-label="Second group">
                                    <Link type="button" className="btn btn-info" to="/">Login</Link>
                                </div>
                            </div>
    	                </div>
                    </div>
                </div>
            </div>
        </>
    )
}
