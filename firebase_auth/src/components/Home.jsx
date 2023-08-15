import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import auth from '../context/firebase-config'
import {signOut} from "firebase/auth"
import Navbar from './Navbar';
import Alert from './Alert';
import Modal from './Modal';
import TaskItem from './TaskItem';
import EmptyTask from './EmptyTask';

export default function Home(props) {
    const def_key=[1]
    const navigate = useNavigate();
    const [err, seterr] = useState(false)
    const [uploaded, setuploaded] = useState(false)
    const [failupload, setfailupload] = useState(false)
    const [keys, setkeys] = useState([])
    const [obj, setobj] = useState()
    const [success_delete, setsuccess_delete] = useState(false)

    const logout = async()=>{
        await signOut(auth);
        navigate("/")
    }
    const uploaddata=()=>{
        setuploaded(true)
        setTimeout(()=>{
            setuploaded(false)
        }, 2000)
        getdata();
    }
    const failuploaddata=()=>{
        setfailupload(true)
        setTimeout(()=>{
            setfailupload(false)
        }, 2000)
    }
    const ondelete = ()=>{
        setsuccess_delete(true)
        getdata();
        setTimeout(()=>{
            setsuccess_delete(false)
        }, 2000)
    }
    const markasdone = () =>{
        getdata();
    }
    const getdata = async()=>{
        try{
            let X = await fetch(`https://fir-react-auth-bcfdf-default-rtdb.firebaseio.com/${props.user.uid}.json`, {method: 'GET'})
            X = await X.json()
            console.log(X);
            if(X===null){
                setkeys([])
            }
            else{
                setkeys(Object.keys(X).reverse());
                setobj(X)
            }
        }catch(e){
            console.log("Data not found !");
        }
    }
    useEffect(() => {
        if(props.user===""){
            navigate("/")
        }
        else{
            seterr(true)
            getdata();  //to retrieve data
            setTimeout(()=>{
                seterr(false)
            }, 2000)
        }
        // eslint-disable-next-line
    }, [props.user])
       
    return (
        <>
            <Navbar click={logout} url={"/home"} user={props.user.email}/>
            <Alert err={err} title={`✔️ Logged in succesfully ! Continue browsing ${props.user.email} .`} color={'success'}/>
            <Alert err={uploaded} title={`✔️ Data uploaded succesfully ! Changes will be reflected soon.`} color={'success'}/>
            <Alert err={failupload} title={`❌ Data couldn't be updated. Please try again.`} color={'danger'}/>
            <Alert err={success_delete} title={`✔️ Task deleted successfully. Feel free to add new tasks !`} color={'info'}/>
            <Modal upload={uploaddata} failupload={failuploaddata} user={props.user}/>
            <div className="container my-3">
                <div className="row">
                    {keys.length===0?def_key.map((element, index)=>{
                        return <EmptyTask key={element}/>
                    }):keys.map((element, index)=>{
                        return <div className="col md-4" key={element}>
                            <TaskItem index={index} task={obj[element].task} time={obj[element].time} heading={obj[element].heading} user={props.user} dbkey={element} ondelete={ondelete} done={obj[element].done} markasdone={markasdone} color={obj[element].done===false?'#47A992':'#FFE194'}/>
                        </div>
                    })}
                </div> 
            </div>
        </>
    )
}
