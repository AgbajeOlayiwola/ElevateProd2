import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const Piechart = () => {
    const [piedata, setPieData] = useState({
        // labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [50, 100],
                backgroundColor: ['rgba(196, 211, 68, 0.89)', ' #83BEE8'],
                hoverOffset: 20
            }
        ]
    });
    return (
        <div>
            <Pie data={piedata} />
        </div>
    );
};

export default Piechart;
