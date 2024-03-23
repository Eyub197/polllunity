import { createContext, useContext, useState } from "react"

const ModalContext = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    
}