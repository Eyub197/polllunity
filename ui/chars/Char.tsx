"use client"

import { Option} from "@/lib/types"
import { Bar } from "react-chartjs-2"
import { Suspense } from "react"
import 'chart.js/auto';

interface CharProps { 
    charData: Option[];
    pollData: any; 
}

const Char =  ({charData, pollData} :CharProps ) => {
    const data = charData
    const pollArray = pollData || []

    const chartData = {
        labels: data?.map(option => option.option_text),
        datasets: [
            {
                label: pollArray.title,
                data : data?.map(option => option.votes_count),
                backgroundColor: "#45DFC9",
                borderWidth: 3,
                borderColor: "#45DFC9",
                borderRadios: "3pt",
                width: "40%"
            }
        ]
    }

    return (
        <div>
            <h1>{pollArray.title}</h1>
            <Suspense fallback={<p>Loading data...</p>}>
                <Bar data={chartData}/>
            </Suspense>
        </div>
    )

}

export default Char 