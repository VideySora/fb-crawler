import React from 'react'
import "./likechart.scss"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);




function LikeChart() {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Chart Statistic',
            },
        },
        maintainAspectRatio: false
    };

    const labels = ['Zoom TKL', 'NJ80', 'NJ81', 'Mod007', 'Mod008'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Reaction',
                data: [43, 50, 20, 30, 25],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Comment',
                data: [11, 26, 20, 16, 9],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div className="likeChart-wrap">
            <Bar 
                options={options} 
                data={data}
                // width = {"100%"}
                // height = {"100%"}
            ></Bar>
        </div>
    )
}

export default LikeChart