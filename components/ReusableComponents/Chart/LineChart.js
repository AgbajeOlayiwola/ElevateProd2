import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
const LineChart = () => {
    // set data
    const [lineData, setLineData] = useState({
        labels: ['Sun', 'Mon', 'Tue', 'Thr', 'Fri', 'Sat'],
        datasets: [
            {
                data: [250, 200, 250, 200, 250, 200],
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.1)',
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.6
            },
            {
                label: false,
                data: [150, 100, 150, 100, 150, 100],
                fill: false,
                borderColor: '#742774',
                tension: 0.6
            }
        ]
    });
    // set options
    const [lineOptions, setLineOptions] = useState({
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        }
    });
    return (
        <div>
            <Line options={lineOptions} data={lineData} />
        </div>
    );
};

export default LineChart;
