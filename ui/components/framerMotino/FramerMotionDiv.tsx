"use client"

import { children } from "@/lib/types"
import {motion, AnimatePresence} from "framer-motion"

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


export const MotionDiv = ({children}: children) => {
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