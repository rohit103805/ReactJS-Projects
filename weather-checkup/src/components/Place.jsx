import React, {useEffect} from 'react'
import Forecast from './Forecast'

export default function Place(props) {
    useEffect(()=>{
        document.body.style.backgroundColor = '#ADD8E6'
        document.body.style.backgroundColor = props.bg.color
    })
    
    return (
        props.area.check===true &&<>
            <div className={`container text-center text-${props.bg.text} my-3`}>
                <h4 className="my-3">{props.area.location.name}, {props.area.location.region}</h4>
                <div className="container d-flex justify-content-center my-3">
                    <img src={props.bg.url} alt="hello" className="rounded-circle mx-3" width="17%" height="17%"/>
                    <div className="d-flex align-items-start flex-column mb-3">
                        <h1 className="p-2">{props.area.current.temp_c}° C</h1>
                        <h3 className="p-2">{props.area.w_type}</h3>
                        <h6 className="p-2">Updated as of {new Date(props.area.location.localtime).getHours()} : {new Date(props.area.location.localtime).getMinutes()} hours</h6>
                    </div>
                </div>
                <div className="container d-flex justify-content-center">
                    <p><strong>Feels like : {props.area.current.feelslike_c}° C</strong></p>
                    <p className="mx-3"><strong>Wind 💨 : {props.area.current.wind_kph} Km/hr</strong></p>
                    <p><strong>Visibility 👀: {props.area.current.vis_km} Km</strong></p>
                </div>
                <div className="container d-flex justify-content-center">
                    <p><strong>Barometer : {props.area.current.pressure_mb} mb</strong></p>
                    <p className="mx-3"><strong>Humidity : {props.area.current.humidity} %</strong></p>
                </div>
                <div className="d-flex justify-content-center">
                    {props.forcast.data.map((element)=>{
                        return <Forecast key={element.date} date={element.date} max={element.day.maxtemp_c} min={element.day.mintemp_c} txt={element.day.condition.text}/>
                    })}
                </div>
            </div>
        </>
    )
}
