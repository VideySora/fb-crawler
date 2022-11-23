import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

function ReactPieChart() {
    const options = {
        responsive: true,
        plugins: {
            // legend: {
            //     position: 'top'
            // },
            title: {
                display: true,
                text: 'Reaction Stat',
            },
        },
        maintainAspectRatio: false
    }

    const data = {
        labels: ['Like 👍', 'Haha 😆', 'Love ❤', 'Give heart 🥰', 'Angry 😡', 'Sad 😢'],
        datasets: [
            {
                label: 'Percentage of Votes',
                data: [20, 10, 30, 25, 1, 14],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',    
                    'rgba(153, 102, 255, 0.2)',
                    
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                        
                    'rgba(255, 0, 0, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)',

                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)',

                    'rgba(255, 0, 0, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return (
        <div>
            <Pie options={options} data={data} />
        </div>
    )
}

export default ReactPieChart