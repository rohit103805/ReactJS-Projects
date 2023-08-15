import React from 'react'

export default function Alert(props) {
    return (
        props.err &&<div className={`alert alert-${props.color} d-flex align-items-center`} role="alert">
            <div>
                <strong>{props.title}</strong>
            </div>
        </div>
    )
}
