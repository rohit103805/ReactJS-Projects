import React from 'react'

export default function Spinner(props) {
    return (
        props.spinner && <>
            <div className="text-center my-2">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}
