"use client"

import { children } from "@/lib/types"
import {motion, AnimatePresence} from "framer-motion"
import React from "react"

const FramerMotionDiv = ({children}: children) => {
    return( 
        <motion.div layout>
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

export const MotionDiv = ({children}: motionDiv, ) => {
    return (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        layout
        transition={{ duration: 0.4 }}
        >
            {children}
        </motion.div>
    )
} 
