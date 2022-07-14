import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut } from 'react-chartjs-2';
const DounutComp = ({ data, options }) => {
    // set data
    const [doughData, setDoughData] = useState({
        // labels: [''],
        datasets: [
            {
                label: 'test label',
                data: [70, 30],
                backgroundColor: ['#8FBF00', 'white'],
                borderWidth: 0,
                borderJoinStyle: 'bevel',
                weight: 0.1
            }
        ]
    });
    // set options
    const [doughOptions, setDoughOptions] = useState({
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            },
            title: {
                display: true,
                text: 'Data Orgranized In DounutCHart',
                fontSize: 15
            },
            legend: {
                display: true,
                position: 'top'
            }
        }
    });

    return (
        <div>
            <Doughnut data={doughData} options={doughOptions} />
        </div>
    );
};

export default DounutComp;
