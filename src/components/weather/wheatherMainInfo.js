import styles from './weatherMainInfo.module.css'

export default  function WeatherMainInfo({wheather}) {
    return (
        <div className={styles.mainInfo}>
            <div className={styles.city}>{wheather?.location.name}</div>
            <div className={styles.country}>{wheather?.location.country}</div>
            <div className={styles.row}>
                <div>
                    <img src={`https:${wheather?.current.condition.icon}`} width="128" alt={wheather?.current.condition.text} />
                </div>
                <div className={styles.weatherConditions}>
                    <div className={styles.condition}>{wheather?.current.condition.text}</div>
                    <div className={styles.current}>{wheather?.current.temp_c}°</div>
                </div>
            </div>
            <iframe 
            title="map" 
            src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15904.73181852571!2d${wheather?.location.lon}!3d${wheather?.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sco!4v1761053050535!5m2!1ses-419!2sco`}
            width="100%" 
            height="450" 
            style={{ border:0 }} 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    )
}