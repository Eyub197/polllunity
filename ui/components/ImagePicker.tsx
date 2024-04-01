"use client"

import { useRef, useState, useEffect } from "react"
import { ImagePickerProps } from "@/lib/types"
import styles from "@/ui/components/ImagePicker.module.css"
import Image from "next/image"

const ImagePicker = ({label, name, picture}: ImagePickerProps) => {
    const [pickedImage, setPickedImage] = useState<string | null>(null)
    const imageInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(picture !== null && picture !== undefined){
            setPickedImage(picture)
        }
    },[picture])

    const handlePictureClick = () => {  imageInput.current!?.click() }  
    
    const handleImageChange = (event: any) => {
        const file = event.target.files[0]
        
        if(!file) {
            setPickedImage(null)
            return
        }
        
      const fileReader =  new FileReader()
      fileReader.onload = () => {
        setPickedImage(fileReader.result as string)
      }
      fileReader.readAsDataURL(file)
    }

    return (
        <div className={styles.picker}>
            <label htmlFor={name}></label>
            <div className={styles.controls}>
                <div className={styles.preview}>
                    {!pickedImage && <p>няма избрана снимка</p>}
                    {pickedImage && (
                    <Image 
                        src={`https://knefgqtvaywusxthuztg.supabase.co/storage/v1/object/public/images/${picture || pickedImage}`} 
                        alt="избраната снимка"
                        fill
                    />
                    )}
                </div>
                <input
                className={styles.input}
                type="file" 
                id={name}
                name={name} 
                accept=".png, .jpeg, .jpg, .webp"
                ref={imageInput}
                onChange={handleImageChange}
                />
                <button 
                className={styles.button} 
                type="button"
                onClick={handlePictureClick}
                >
             Изберете снимка
             </button>
            </div>
        </div>
    ) 
}

export default ImagePicker