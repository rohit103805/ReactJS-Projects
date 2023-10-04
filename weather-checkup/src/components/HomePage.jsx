import React from 'react'
import {Link} from 'react-router-dom';

export default function HomePage() {
    document.body.style.backgroundColor = '#ADD8E6'
    return (
        <>
            <div className={`container text-dark`} >
                <h1>About Us</h1>
                <img src="https://www.pngitem.com/pimgs/m/106-1061698_sun-and-clouds-clipart-sun-and-clouds-png.png" alt="Girl in a jacket" width="100%"/>
                <h3 className="my-2">
                    Hello, welcome to our weather checker. Here you can get daily weather updates as well as weather news. 
                    Click Next to check the weather for your location !
                </h3>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <Link className="btn btn-primary me-md-2" type="button" to="/your_location">Detect your location !</Link>
                </div>
            </div>
        </>
    )
}
