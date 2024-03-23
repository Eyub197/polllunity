import { createPortal } from "react-dom"
import styles from "@/ui/components/DeleteModal.module.css"

export interface ModalProps{
    isModalOpen: boolean,
    children : React.ReactNode,
    tableToDeleteFrom: string,
    elementToDelete: string
}

const Modal = ({isModalOpen, children, tableToDeleteFrom, elementToDelete}: ModalProps) => {
    return(
        <>
         {
            isModalOpen ?? createPortal(
               <div className={styles.modal}>
                   <h2>Сигурни ли сте че искате да изтриете {tableToDeleteFrom}: {elementToDelete} </h2>
                   <button > не </button>
                   {children}
               </div>,
               document.body  )
        
            }  
        </>  
        
    )
}

export default Modal