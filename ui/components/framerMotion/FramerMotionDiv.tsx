"use client"

import { children } from "@/lib/types"
import {motion, AnimatePresence} from "framer-motion"
import React from "react"

/**
 * This component wraps the children in a framer-motion Div and AnimatePresence
 * The layout property on the motion.div is set to true so that it can automatically
 * adjust its height based on the children it contains.
 * The AnimatePresence component is used to animate the mounting and unmounting of
 * the children components.
 */
const FramerMotionDiv = ({children}: children) => {
    return( 
        // the layout property is set to true so that the div can automatically adjust
        // its height based on the children it contains
        <motion.div layout={true}>
            {/* The AnimatePresence component is used to animate the mounting and unmounting of 
            the children components */}
            <AnimatePresence>
                {children}
            </AnimatePresence>
        </motion.div>
    )
}


export default FramerMotionDiv


interface motionDiv{
    children : React.ReactNode,
    id? : string
}

/**
 * This component renders a div element with framer-motion opacity animation.
 * @param children - The child elements to render inside the div
 * @returns The animated div element
 */
export const MotionDiv = ({ children }: motionDiv) => {
    // Return the animated div element
    return (
        <motion.div
            // Set the initial opacity to 0
            initial={{ opacity: 0 }}
            // Animate the opacity to 1 when the component mounts
            animate={{ opacity: 1 }}
            // Animate the opacity to 0 when the component unmounts
            exit={{ opacity: 0 }}
            // Set the layout property to true so that the div can automatically
            // adjust its height based on the children it contains
            layout
            // Set the transition duration to 0.56 seconds
            transition={{ duration: 0.56 }}
        >
            {/* Display the children */}
            {children}
        </motion.div>
    )
}
