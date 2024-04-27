"use client"

import styles from "@/ui/polls/Results/ScreenShotButton.module.css"
import html2canvas  from "html2canvas"
import { createPortal } from "react-dom"
import { FaCamera } from "react-icons/fa";


const ScreenShotButton = () => {
    const takeScreenShot = () => {
        html2canvas(document.body).then((canvas) => {
            const image = canvas.toDataURL("image/png")
            const link = document.createElement('a')
            link.download = 'screenshot.png'
            link.href = image
            link.click()
        }) 
    }

    return (
        <>
        { 
        createPortal(
        <button className={styles.button} onClick={takeScreenShot}> 
            <FaCamera className={styles.iconв}/> 
        </button>,
        document.body 
        )
        }
    </>

    )
}

export default ScreenShotButton
