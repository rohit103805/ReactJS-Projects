import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {signInWithEmailAndPassword} from "firebase/auth";
import auth from "../context/firebase-config";
import Alert from './Alert';
import Spinner from './Spinner';

export default function Login(props){
    const navigate = useNavigate();
    const [loginemail, setloginemail] = useState("")
    const [loginpassword, setloginpassword] = useState("")
    const [err, seterr] = useState(false)
    const [spinner, setspinner] = useState(false)

    const getemail = (event)=>{
        setloginemail(event.target.value)
    }
    const getpassword = (event)=>{
        setloginpassword(event.target.value)
    }
    const login_func=async()=>{
        try{
            setspinner(true);
            const user = await signInWithEmailAndPassword(auth, loginemail, loginpassword);
            console.log(user.user.email);
            setloginemail("");
            setloginpassword("");
            setspinner(false);
            navigate("/home")
        }catch(e){
            setspinner(false);
            setloginemail("");
            setloginpassword("");
            seterr(true);
            setTimeout(()=>{
                seterr(false);
            }, 1500);
            console.log(e.message);
        }        
    }
    useEffect(() => {
        if(props.user!==""){
            navigate("/home")
        }
        // eslint-disable-next-line
    }, [props.user]) 

    return (
        <>
            <Alert err={err} title={"⚠️ Try logging in again !"} color={'danger'}/>
            <Spinner spinner={spinner}/>
            <div className="container my-5">
                <div className="col">
                    <h1 className='text-center'>Login Form</h1>
                    <div className="row justify-content-center my-4">
                        <img className="img1" alt="..." src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png" style={{height: '200px', width: '220px'}}/>
                    </div>
                    <div className="row justify-content-center my-5">
                        <div className="mb-3 row justify-content-center">
                            <strong htmlFor="inputEmail" className="col-sm-1 col-form-label">Email</strong>
                            <div className="col-sm-8">
                                <input type="email" className="form-control" id="inputEmail" placeholder="name@example.com" onChange={getemail} value={loginemail}/>
                            </div>
                        </div>
                        <div className="mb-3 row justify-content-center">
                            <strong htmlFor="inputPassword" className="col-sm-1 col-form-label" >Password</strong>
                            <div className="col-sm-8">
                                <input type="password" className="form-control" id="inputPassword" placeholder="password@123" onChange={getpassword} value={loginpassword}/>
                            </div>
                        </div>
                        <div className="text-center" role="toolbar" aria-label="Toolbar with button groups">
                            <div id="passwordHelpBlock" className="form-text text-center">New User? Register now.</div>
                            <div className="btn-group me-2 my-2 text-center" role="group" aria-label="First group">
                                <button disabled={loginemail.length===0 || loginpassword.length===0?true:false} type="button" className="btn btn-primary" onClick={login_func}>Login</button>
                            </div>
                            <div className="btn-group me-2 my-2 text-center" role="group" aria-label="Second group">
                                <Link type="button" className="btn btn-info" to="/register">Register</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
