"use client"

import { useState } from "react"
import { IoCloseCircle } from "react-icons/io5"
import styles from "@/ui/components/DeleteModal.module.css"
import { createPortal } from "react-dom"
import { deleteCategory } from "@/lib/utils/category"

export interface ModalProps {
    toDeleteFromTable: string,
    toDelete:string,
    id: string
}

const DeleteModal = async ({toDeleteFromTable, toDelete, id} : ModalProps    ) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const deleteCategoryById = await deleteCategory.bind(null, id)
    return(
        <>
            <button 
            onClick={() => setIsModalOpen(true)} 
            className={styles.delete_button} 
            >
                <p>Изтрий</p>
                <IoCloseCircle/>
            </button>
            {
                isModalOpen && createPortal(
                <div className={styles.modal}>
                    <h2>Сигурни ли сте че искате да изтриете {toDeleteFromTable}: {toDelete} </h2>
                    <button onClick={() => setIsModalOpen(false)}> не </button>
                    
                      <button onClick={deleteCategoryById}>
                        да
                     </button>
                </div>,
                document.body                 
                ) 
            }
        </>
    )
}

export default DeleteModal