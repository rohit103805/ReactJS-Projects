import React, {useState} from 'react'
import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import WeatherPage from './components/WeatherPage'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Place from './components/Place'


export default function App() {
    const [search, setsearch] = useState("")
    const change = (event) =>{
        setsearch(event.target.value)
    }

    const [bg, setbg] = useState({
        color: '',
        text: '',
        url: ''
    })
    const [forcast, setforcast] = useState({
        data : []
    })
    const [area, setarea] = useState({
        check: false,
        location: {},
        current: {},
        w_type: ""
    });

    async function showPosition(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let weather = await fetch(`http://api.weatherapi.com/v1/current.json?key=b6c0a22a716b40718e973559233005&q=${lat},${lon}`);
        let wjson = await weather.json();
        let forcast_data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=b6c0a22a716b40718e973559233005&q=${lat},${lon}&days=3`);
        let forcast_json = await forcast_data.json();
        setarea({
            check: true,
            location: wjson.location,
            current: wjson.current,
            w_type: wjson.current.condition.text
        });
        setforcast({
            data : forcast_json.forecast.forecastday
        });
        setbg({
            color: Number.parseInt(new Date(wjson.location.localtime).getHours())>=5 && Number.parseInt(new Date(wjson.location.localtime).getHours())<=18?'#ADD8E6':'black',
            text: Number.parseInt(new Date(wjson.location.localtime).getHours())>=5 && Number.parseInt(new Date(wjson.location.localtime).getHours())<=18?'dark':'light',
            url: Number.parseInt(new Date(wjson.location.localtime).getHours())>=5 && Number.parseInt(new Date(wjson.location.localtime).getHours())<=18?"https://www.pngmart.com/files/20/Sun-PNG-Clipart.png":"https://i.pinimg.com/originals/a1/01/e2/a101e22fc458c1110d418ee309f240c8.png"
        });
    }

    async function showPosition1() {
        let weather = await fetch(`http://api.weatherapi.com/v1/current.json?key=b6c0a22a716b40718e973559233005&q=${search}`);
        let wjson = await weather.json();
        let forcast_data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=b6c0a22a716b40718e973559233005&q=${search}&days=7`);
        let forcast_json = await forcast_data.json();
        setarea({
            check: true,
            location: wjson.location,
            current: wjson.current,
            w_type: wjson.current.condition.text
        });
        setforcast({
            data : forcast_json.forecast.forecastday
        });
        setbg({
            color: Number.parseInt(new Date(wjson.location.localtime).getHours())>=5 && Number.parseInt(new Date(wjson.location.localtime).getHours())<=18?'#ADD8E6':'black',
            text: Number.parseInt(new Date(wjson.location.localtime).getHours())>=5 && Number.parseInt(new Date(wjson.location.localtime).getHours())<=18?'dark':'light',
            url: Number.parseInt(new Date(wjson.location.localtime).getHours())>=5 && Number.parseInt(new Date(wjson.location.localtime).getHours())<=18?"https://www.pngmart.com/files/20/Sun-PNG-Clipart.png":"https://i.pinimg.com/originals/a1/01/e2/a101e22fc458c1110d418ee309f240c8.png"
        });
    }
    return (
        <>
            <Router>
                <Navbar txt={search} func={change} showPosition1={showPosition1}/>
                <Routes>
                    <Route exact path="/" element={<HomePage/>}/>
                    <Route exact path="/your_location" element={<WeatherPage showPosition={showPosition} forcast={forcast} area={area} bg={bg}/>}/>
                    <Route exact path="/places" element={<Place forcast={forcast} area={area} bg={bg}/>}/>
                </Routes>
            </Router>
        </>
    )
}
