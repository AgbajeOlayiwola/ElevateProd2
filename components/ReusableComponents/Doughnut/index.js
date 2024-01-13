import 'chart.js/auto';
import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const DoughNut = ({
    data1,
    data2,
    data3,
    data4,
    label1,
    label2,
    label3,
    label4
}) => {
    const affiliate = localStorage.getItem('affiliateCode');
    const [chartData, setChartData] = useState({
        datasets: [
            {
                // label: ['red', 'amber', 'green'],
                data: [data1, data2, data3, data4],
                backgroundColor: ['#3A5207', '#C4D344', '#6CCF00', '#69940D'],
                weight: '16',
                borderWidth: '1',
                radius: '150'
                // circumference: '100'
            }
        ],
        labels: [
            `${label1.replace('_', '')}: ${data1} ${getSymbolFromCurrency(
                countryToCurrency[affiliate?.substring(1)]
            )}`,
            `${label2.replace('_', '')}: ${data2} ${getSymbolFromCurrency(
                countryToCurrency[affiliate?.substring(1)]
            )}`,
            `${label3.replace('_', '')}: ${data3} ${getSymbolFromCurrency(
                countryToCurrency[affiliate?.substring(1)]
            )}`,
            `${label4.replace('_', '')}: ${data4} ${getSymbolFromCurrency(
                countryToCurrency[affiliate?.substring(1)]
            )}`
        ]
    });
    // const options = {
    //   plugins: {
    //     datalabels: {
    //       color: "#fff",
    //       anchor: "end",
    //       align: "start",
    //       offset: 10,
    //       borderWidth: 2,
    //       borderColor: "#fff",
    //       borderRadius: 4,
    //     },
    //   },
    // };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const updatedData = [...chartData.datasets[0].data];
        const dataIndex = chartData.labels.indexOf(name);
        updatedData[dataIndex] = Number(value);

        setChartData((prevChartData) => ({
            ...prevChartData,
            datasets: [
                {
                    ...prevChartData.datasets[0],
                    data: updatedData
                }
            ]
        }));
    };

    return (
        <div
            class="chart-container"
            style={{ position: 'relative', width: '100%' }}
        >
            <Doughnut
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,

                            color: '#70ad47',
                            font: { size: '0px' }
                        },

                        // legend: {
                        //   display: false,
                        // },
                        outlabels: {
                            text: '%l %p',
                            color: 'white',
                            stretch: 35,
                            font: {
                                resizable: true,
                                minSize: 12,
                                maxSize: 18
                            }
                        }
                    }
                }}
            />
        </div>
    );
};

export default DoughNut;
