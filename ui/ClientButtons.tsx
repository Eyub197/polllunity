"use client"

import { Id } from "@/lib/types"

export const ChoosePollButton = (id:Id)  => {
    const handleClick = (id:Id) => console.log(id) 

    return(
        <button onClick={() => handleClick(id)}>Click me </button>
    )
}