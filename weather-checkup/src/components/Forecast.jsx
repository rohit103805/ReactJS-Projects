import React from 'react'

export default function Forecast(props) {
    let ans = new Date(props.date).getDay()
    let obj = {"1":"Mon", "2": "Tue", "3":"Wed", "4":"Thu", "5":"Fri", "6":"Sat", "0": "Sun"}
    console.log(obj[ans], ans)
    return (
        <div>
            <h4>{obj[ans]}, {props.date.slice(8)}</h4>
            <img src="https://www.pngmart.com/files/20/Sun-PNG-Clipart.png" alt="hello" className="rounded-circle mx-3" width="50%" height="50%"/>
            <h4>{props.txt}</h4>
            <div className="d-flex justify-content-center">
                <h4>{props.max}° C</h4>
                <h6 className="mx-3 my-2">{props.min}° C</h6>
            </div>
        </div>
    )
}
