"use client"

import html2canvas  from "html2canvas"

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

    return <button onClick={takeScreenShot}>Запазете резултат</button>
}

export default ScreenShotButton
