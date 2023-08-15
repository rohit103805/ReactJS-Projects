import React from 'react'
import {Link} from 'react-router-dom';

export default function Navbar(props) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#526D82'}}>
                <div className="container-fluid">
                    <Link type="button" className="navbar-brand" to={props.url}>Your TODO List !</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
                                <div className="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
                                <hr className="d-lg-none my-2 text-white-50"/>
                            </li>
                            <li className="nav-item">
                                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add New ! ✏️</button>
                            </li>
                        </ul>
                        <label className='text-white'>👤 {props.user}</label>
                        <button type="button" className="btn btn-dark btn-sm mx-2" onClick={props.click}>📴</button>
                    </div>
                </div>
            </nav>
        </>
    )
}
