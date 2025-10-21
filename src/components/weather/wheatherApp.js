import { useEffect, useState } from "react"
import WheatherForm from "./weatherForm"
import WeatherMainInfo from "./wheatherMainInfo"

import styles from './wheatherApp.module.css'
import Loading from "../loading/loading"

export default function WheatherApp() {
    const [wheather, setWheather] = useState(null)

    useEffect(() => {
        loadInfo()
    }, [])

    useEffect(() => {
        document.title = `Weather | ${wheather?.location.name ?? ""}`
    }, [wheather])

    async function loadInfo(city = 'london') {
        try {
            const request = await fetch(`${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`)

            const json = await request.json()

            setTimeout(() => {
                setWheather(json)
            }, 2000)
            
            console.log(json)
        } catch (error) {
            console.log(error)
        }        
    }

    function handleCangeCity(city) {
        setWheather(null)

        loadInfo(city)
    }

    return (
        <div className={styles.weatherContainer}>
            <WheatherForm onChangeCity={handleCangeCity} />
            {wheather ? <WeatherMainInfo wheather={wheather}/> : <Loading />}
        </div>
    )
}