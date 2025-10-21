import { useState } from "react";
import styles from './wheatherForm.module.css'

export default function WheatherForm({onChangeCity}) {
    const [city, setCity] = useState('')

    function onChange(e) {
        const value = e.target.value

        if (value !== '') {
            setCity(value)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()

        onChangeCity(city)
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <input type="text" className={styles.input} onChange={onChange} />            
        </form>
    )
}