"use client"

import 'chart.js/auto'
import styles from "@/ui/chars/Char.module.css"
import styles_2 from "@/ui/polls/Results/Result.module.css"
import Option from '../options/Option'
import { Bar, Doughnut, Pie } from "react-chartjs-2"
import { Suspense, useEffect } from "react"
import { CharProps } from '@/lib/types';
import { useState } from 'react';
import { placements, placementsClasses } from '@/lib/utils/helperArrays'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const Char =  ({charData, pollData, top3Data} : CharProps ) => {
    const supabase = createClient()
    const router = useRouter()
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


    useEffect(() => {
        const channel = supabase.channel("charts_info").on("postgres_changes",{
            event: "*",
            schema: "public",
            table: "options",
        }, () => {router.refresh()}).subscribe()

        return () => { supabase.removeChannel(channel) }
    }, [supabase, router])

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
         <section className={styles_2.top_3}>
                {
                    top3Data.map((option, index) => 
                    <div className={styles_2.placement_container}  key={index}>
                            <h2 className={styles_2.placement} key={index}>{placements[index]}</h2>
                            <Option
                            className='placement_color'
                            classNameContainer={placementsClasses[index]}
                            key={option.id} 
                            option_text={option.option_text}
                            votes_count={option.votes_count}
                            image={option.image}
                            />    
                        </div>
                    )
                }
            </section>
        <form>
            <label htmlFor="char_type">Вид диеграма</label>
            <select className={styles.select} name="char_type" id="char_type" onChange={handleChange}>
                <option value="bar">Колонна диаграма</option>
                <option value="doughnut">Кръгла диеаграма</option>
                <option value="pie">Кръгла диеграма 2</option>
            </select>
        </form>
            <Suspense fallback={<p>Loading data...</p>}>
                <h2 className="title_2 mt-3">Статистика</h2>
                {renderChart()}
            </Suspense>
            <section className={styles_2.all_options}>
                <h2 className={`title_2 ${styles.all_options_title}`} >Всички опции</h2>
                <div className={styles_2.all_options_wrapper}>
                {
                    data!.map(option => 
                        <Option
                        key={option.id} 
                        option_text={option.option_text}
                        votes_count={option.votes_count}
                        image={option.image}
                        />    
                    )  
                }
                </div>
            </section>
        </>
        
    )

}

export default Char 