"use client"

import 'chart.js/auto'
import styles from "@/ui/chars/Char.module.css"
import { Bar, Doughnut, Pie } from "react-chartjs-2"
import { Suspense } from "react"
import { CharProps } from '@/lib/types';
import { useState } from 'react';

const Char =  ({charData, pollData} : CharProps ) => {
    const [charType, setCharType] = useState("bar")
    
    const data = charData
    const pollArray = pollData || []

    const chartData = {
        labels: data?.map(option => option.option_text),
        datasets: [
            {
                label: pollArray.title,
                data : data?.map(option => option.votes_count),
                borderWidth: 3,
                borderRadios: "3pt",
            }
        ]
    }

    const handleChange = (event: any) => setCharType(event.target.value)

    const renderChart = () => {
        switch (charType)
        {
            case 'doughnut':
                return (
                    <section className={styles.char_circle}>
                        <Doughnut data={chartData}/>
                    </section>
                )
            case 'pie':
                return (
                <section className={styles.char_circle}>
                    <Pie data={chartData}/>
                </section>
                )
                   
            default:  
                return(
            <section className={styles.char}>
                 <Bar data={chartData}/>  
            </section>
                )
        }
    }

    return (
        <>
        <form>
            <label htmlFor="char_type">Вид диеграма</label>
            <select className={styles.select} name="char_type" id="char_type" onChange={handleChange}>
                <option value="bar" >Колонна диеграма</option>
                <option value="doughnut">Кръгла диеаграма</option>
                <option value="pie">Кръгла диеграма 2</option>
            </select>
        </form>
            <Suspense fallback={<p>Loading data...</p>}>
                {renderChart()}
            </Suspense>
        </>
        
    )

}

export default Char 