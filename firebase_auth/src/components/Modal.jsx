import React, {useState} from 'react'

export default function Modal(props) {
    const [modaltxt, setmodaltxt] = useState("")
    const [modalheading, setmodalheading] = useState("")
    const editmodaltxt=(event)=>{
        setmodaltxt(event.target.value)
    }
    const editmodalheading=(event)=>{
        setmodalheading(event.target.value)
    }
    const submitmodal = async ()=>{
        try{
            let data = JSON.stringify({'heading': modalheading, 'task': modaltxt, 'time': new Date().toLocaleString("en-IN"), 'done': false})
            let result = await fetch(`https://fir-react-auth-bcfdf-default-rtdb.firebaseio.com/${props.user.uid}.json`, {method: 'POST', body: data})
            result = await result.text()
            console.log(result)
            setmodalheading("")
            setmodaltxt("")
            props.upload()
        }
        catch(e){
            setmodalheading("")
            setmodaltxt("")
            props.failupload()
        }
    }
    return (
        <>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-info">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Add new task !</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Type the contents here !</label>
                                <textarea placeholder="Task - HEADING" className="form-control" id="exampleFormControlTextarea1" value={modalheading} onChange={editmodalheading} rows="1"></textarea>
                            </div>
                            <div className="mb-3">
                                <textarea placeholder="Enter your task text here." className="form-control" id="exampleFormControlTextarea1" value={modaltxt} onChange={editmodaltxt} rows="3"></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" disabled={modalheading.length===0||modaltxt.length===0?true:false} className="btn btn-dark txt-white" data-bs-dismiss="modal" onClick={submitmodal}>Submit</button>                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
