import React from 'react'

export default function TaskItem(props){
    const markasred = async()=>{
        console.log("Marked as Read !");
        let data = JSON.stringify({'time': new Date().toLocaleString("en-IN"), 'done':true})
        let Y = await fetch(`https://fir-react-auth-bcfdf-default-rtdb.firebaseio.com/${props.user.uid}/${props.dbkey}.json`, {method: 'PATCH', body: data})
        Y = await Y.json()
        console.log(Y);
        props.markasdone();
    }
    const deleted = async()=>{
        let Y = await fetch(`https://fir-react-auth-bcfdf-default-rtdb.firebaseio.com/${props.user.uid}/${props.dbkey}.json`, {method: 'DELETE'})
        Y = await Y.json()
        console.log(Y);
        props.ondelete();
    }
    return (
        <>
            <div className="card my-3 mx-3 shadow" style={{width: '20rem'}}>
                <div className="card-header" style={{backgroundColor: props.color}}><strong>Task {props.index+1}{props.done===true?' - Completed':""}</strong></div>
                <div className="card-body">
                    <h5 className="card-title">{props.done===false?props.heading:<s>{props.heading}</s>}</h5>
                    <p className="card-text">{props.done===false?props.task:<s>{props.task}</s>}</p>
                    <h6 style={{color: 'grey'}}>{props.done===false?"Created at":"Completed at"} : {props.time}</h6>
                    <div className="btn-group me-2 my-2 text-center" role="group" aria-label="First group">
                        <button type="button" className="btn btn-danger btn-sm" onClick={deleted}>🗑️</button>
                    </div>
                    <div className="btn-group me-2 my-2 mx-1 text-center" role="group" aria-label="Second group">
                        <button type="button" className="btn btn-warning btn-sm" onClick={markasred}>✔️</button>
                    </div>
                </div>
            </div>
        </>
    )
}
