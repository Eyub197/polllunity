"use client"

import styles from "@/ui/polls/Results/ScreenShotButton.module.css"
import html2canvas  from "html2canvas"
import { createPortal } from "react-dom"
import { FaCamera } from "react-icons/fa";


/**
 * ScreenShotButton
 * Component that renders a button that can be used to download a screenshot of the current webpage.
 * When the button is clicked, the function html2canvas is called to convert the document.body into a canvas element, which is then converted to a png file.
 * The png file is then downloaded to the user's device with the name "screenshot.png".
 */
const ScreenShotButton = () => {
    /**
     * Function that is called when the button is clicked.
     * Converts the document.body into a canvas element, converts the canvas element into a png, and downloads it to the user's device.
     */
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
            {/* Create a button element and render it in the document.body using ReactDOM.createPortal */}
            { createPortal(
                <button className={styles.button} onClick={takeScreenShot}>  {/* Render button element */}
                    <FaCamera className={styles.iconв}/>   {/* Render camera icon */}
                </button>,
                document.body 
            ) }
        </>
    )
}

export default ScreenShotButton
