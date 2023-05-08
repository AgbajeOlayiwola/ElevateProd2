import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import {
    getTransactionElevate,
    getTransactionHistory
} from '../../../redux/actions/actions';
import { dateData } from '../Data';
import { FaCommentsDollar } from 'react-icons/fa';
const LineChart = () => {
    const { transactionElevate, errorMessageTransactionElevate } = useSelector(
        (state) => state.transactionElevateReducer
    );
    const { transactionHistory, errorMessageTransactionHistory } = useSelector(
        (state) => state.transactionHistoryReducer
    );
    const [tableDetails, setTableDetails] = useState([]);
    const [amount, setAmount] = useState([]);
    const [amounts, setAmounts] = useState([]);
    const [datas, setDatas] = useState([]);
    const [nxtdata, setNxtData] = useState([]);
    const [lineData, setLineData] = useState({
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],
        datasets: [
            {
                data: [],
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.1)',
                borderColor: 'red',
                tension: 0.6,
                label: 'Inflow'
            }
        ]
    });

    const dispatch = useDispatch();
    const [pageSrchIndex, setPageSrchIndex] = useState(0);
    const [numOfRecords, setNumOfRecords] = useState(10);
    const [dateTocalc, setDateToCalc] = useState([]);
    const [price, setPrice] = useState();
    useEffect(() => populateLineData(), []);
    useEffect(() => {
        dispatch(getTransactionHistory(pageSrchIndex, numOfRecords));
    }, []);

    useEffect(() => populateLineData, [transactionHistory]);

    // const populateLineData = () => {
    //     const date = new Date().getDate();
    //     //for 7 days
    //     const calcDate = dateData.map((item) => {
    //         // console.log(item);
    //         // const mainTest = item.date.split;
    //         const container = item.date.split(':');
    //         // setDateToCalc(item.cash);

    //         return container;
    //     });
    //     console.log(calcDate[0]);

    //     const calcData = dateData.map((item) => {
    //         // console.log(item);
    //         // const mainTest = item.date.split;
    //         const container = item.cash;
    //         setDateToCalc(item.cash);

    //         return container;
    //     });
    //     console.log(calcData);
    //     const days = calcDate;
    //     const transactionArray = [
    //         'BILL_PAYMENT',
    //         'AIRTIME_TOPUP',
    //         'SINGLE_TRANSFER'
    //     ];

    //     let dayIndex = new Date().getDay();

    //     // // console.log(dateTocalc);
    //     //for 6 days
    //     // console.log(date);
    //     const labelsData = [];
    //     const datasetsArray = calcData;

    //     if (transactionElevate !== null) {
    //         for (let i = 0; i <= 6; i++) {
    //             const index =
    //                 dayIndex + i > 6 ? (dayIndex + i) % 7 : dayIndex + i;
    //             labelsData[i] = days[index];

    //             transactionElevate.transactions.map((trans) => {
    //                 if ((index = new Date(trans.transactionDate).getDay())) {
    //                     if (transactionArray.indexOf(trans.transactionType)) {
    //                         datasetsArray[index] =
    //                             datasetsArray[index] +
    //                             Number(trans.transactionAmount);
    //                     }
    //                 }
    //             });
    //         }
    //     }
    const populateLineData = () => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const transactionArray = [
            'BILL_PAYMENT',
            'AIRTIME_TOPUP',
            'SINGLE_TRANSFER'
        ];
        let dayIndex = new Date().getDay();
        const labelsData = [];
        const datasetsArray = [0, 0, 0, 0, 0, 0, 0];

        if (transactionHistory !== null) {
            for (let i = 0; i <= 6; i++) {
                const index =
                    dayIndex + i > 6 ? (dayIndex + i) % 7 : dayIndex + i;
                labelsData[i] = days[index];

                transactionHistory.transactions.map((trans) => {
                    if ((index = new Date(trans.transactionDate).getDay())) {
                        if (transactionArray.indexOf(trans.transactionType)) {
                            datasetsArray[index] =
                                datasetsArray[index] +
                                Number(trans.transactionAmount);
                        }
                    }
                });
            }
        }

        setLineData({
            ...lineData,
            labels: labelsData,
            datasets: [
                {
                    ...lineData.datasets[0],
                    data: datasetsArray
                }
            ]
        });
    };

    //  setLineData({
    //         ...lineData,
    //         labels: labelsData,
    //         datasets: [
    //             {
    //                 ...lineData.datasets[0],
    //                 data: datasetsArray
    //             }
    //         ]
    //     });
    // };

    // set options
    const [lineOptions, setLineOptions] = useState({
        scales: {
            x: {
                grid: {
                    display: true
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
