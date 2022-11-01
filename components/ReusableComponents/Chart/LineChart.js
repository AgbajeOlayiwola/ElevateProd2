import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionElevate } from '../../../redux/actions/actions';
const LineChart = () => {
    const { transactionElevate, errorMessageTransactionElevate } = useSelector(
        (state) => state.transactionElevateReducer
    );
    const [tableDetails, setTableDetails] = useState([]);
    const [amount, setAmount] = useState([]);
    const [amounts, setAmounts] = useState([]);
    const [datas, setDatas] = useState([]);
    const [nxtdata, setNxtData] = useState([]);
    // set data
    const [lineData, setLineData] = useState({
        labels: ['Sun', 'Mon', 'Tue', 'Thr', 'Fri', 'Sat'],
        datasets: []
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTransactionElevate());
    }, []);

    useEffect(() => {
        if (transactionElevate !== null) {
            setTableDetails(transactionElevate.transactions);
            tableDetails?.filter((item) => {
                setAmount(item.transactionAmount);
                setAmounts((amount) => [...amount, item.transactionAmount]);
            });
        }

        setDatas([
            amounts[1],
            amounts[10],
            amounts[15],
            amounts[20],
            amounts[25],
            amounts[30]
        ]);

        setLineData({
            ...lineData,
            datasets: [
                // {
                //     data: nxtdata,
                //     fill: true,
                //     backgroundColor: 'rgba(75,192,192,0.1)',
                //     borderColor: 'rgba(75,192,192,1)',
                //     tension: 0.6,
                //     label: 'Inflow'
                // },
                {
                    label: 'Outflow',
                    data: datas,
                    // data: [150, 100, 150, 100, 150, 100],
                    fill: false,
                    borderColor: '#742774',
                    tension: 0.6
                }
            ]
        });
        //    setLineData(...lineData,[])
    }, [transactionElevate]);

    console.log(`${amounts[0]}`);
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
