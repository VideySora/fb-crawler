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
                text: '10 posts with most likes, comments and shares',
            },
        },
        maintainAspectRatio: false
    };

    let copyBaiposts = [...groupPost];
    copyBaiposts.sort((a, b) => parseInt(b.shares) - parseInt(a.shares));
    let shareArray = [];
    let idArray = [];
    let commentArray = [];
    let likeArray = [];
    let i = 0;
    for (i = 0; i < 10; i++) {
        likeArray.push(copyBaiposts[i].likes);
        shareArray.push(copyBaiposts[i].shares);
        commentArray.push(copyBaiposts[i].comments);
        idArray.push(copyBaiposts[i].post_id);
    }
    const labels = idArray;

    const data = {
        labels,
        datasets: [
            {
                label: 'Like',
                // data: [1614, 1384, 804, 1026, 829, 743, 190, 560, 692, 740],
                data: likeArray,
                backgroundColor: 'rgba(56, 255, 56, 0.5)',
            },
            {
                label: 'Comment',
                data: commentArray,
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