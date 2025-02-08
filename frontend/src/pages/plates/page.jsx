import platesServices from "../../services/plates"
import { useEffect, useState } from "react"
import Loading from "../loading/loading"
import PlateCard from "../../components/plateCard/plateCard"
import styles from './page.module.css'

export default function Plates(){

    const { getAvailablePlates, platesList, platesLoading, refetchPlates } = platesServices()

    useEffect(() => {
        if(refetchPlates) {
            getAvailablePlates()
        }
    }, [refetchPlates])

    
    
    if(platesLoading) {
        return( <Loading /> )
    }

    // page.jsx
console.log("Dados recebidos:", platesList);

        console.log(platesList)

    return (
            <>
                <div>
                    {platesList.map((plate) => (
                        <div key={plate._id} className={styles.cardContainer}>
                            <PlateCard plateData={plate} />
                        </div>
                    ))}
                </div>
    
            </>
    )
}