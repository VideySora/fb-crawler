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




function LikeChart({ groupPost }) {
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

    let copyBaiposts = [...groupPost];
    copyBaiposts.sort((a, b) => parseInt(b.shares) - parseInt(a.shares));
    let shareArray = [];
    let idArray = [];
    let i = 0;
    for (i = 0; i < 10; i++) {
        shareArray.push(copyBaiposts[i].shares);
        idArray.push(copyBaiposts[i].post_id);
    }
    const labels = idArray;

    const data = {
        labels,
        datasets: [
            {
                label: 'Share',
                data: shareArray,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Share',
                data: shareArray,
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