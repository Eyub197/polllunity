"use client"
import { Id, Option } from "@/lib/types"
import { Bar } from "react-chartjs-2"
import { Suspense } from "react"
import 'chart.js/auto';

const TestChart =  ({charData}:{ charData: Option[] } ) => {
    const data = charData

    const chartData = {
        labels: data?.map(option => option.option_text),
        datasets: [
            {
                label: "Учителка на годиниата",
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
            <h1>Test</h1>
            <Suspense fallback={<p>Loading data...</p>}>
                <Bar data={chartData}/>
            </Suspense>
        </div>
    )

}

export default TestChart