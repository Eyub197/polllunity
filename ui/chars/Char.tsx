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

/**
 * Char component is responsible for rendering chart of poll results.
 * This component is rendered inside of the poll component.
 * @param charData - data about the poll options and their votes count.
 * @param pollData - data about the poll, used for the chart title.
 * @param top3Data - data about the top 3 options in the poll.
 */
const Char =  ({charData, pollData, top3Data} : CharProps ) => {
    const supabase = createClient()
    const router = useRouter()
    const [charType, setCharType] = useState("bar") // used for handling the chart type change
    
    const data = charData
    const pollArray = pollData || []

    const chartData = { // data used for the chart
        labels: data?.map(option => option.option_text),
        datasets: [
            {
                label: pollArray.title, // chart title
                data : data?.map(option => option.votes_count), // data for the chart bars
                borderWidth: 3,
                borderRadios: "3pt",
            }
        ]
    }


    useEffect(() => {
        /**
         * UseEffect hook is used here for handling the realtime updates of the chart.
         * It subscribes to the "charts_info" channel of the supabase database.
         * This channel is used for the realtime updates of the votes count.
         * When new data is received, the component is reloaded using the useRouter().refresh() function.
         */
        const channel = supabase.channel("charts_info").on("postgres_changes",{
            event: "*",
            schema: "public",
            table: "options",
        }, () => {router.refresh()}).subscribe()

        return () => { supabase.removeChannel(channel) } // remove the subscription when component is unmounted
    }, [supabase, router])

    const handleChange = (event: any) => setCharType(event.target.value) // handle the chart type change

    const renderChart = () => {
        /**
         * RenderChart function is used for rendering the chart based on the charType state.
         * The chart type can be changed using the select element in the form above the chart.
         */
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