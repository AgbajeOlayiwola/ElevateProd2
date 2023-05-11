import React, { useState, useEffect } from 'react';
import CloseButton from '../CloseButtonSvg';
import Overlay from '../Overlay';
import LinkSvg from '../ReusableSvgComponents/LinkSvg';
import styles from './styles.module.css';
import MoreSvg from '../MoreSvg';
import EditSvg from '../editSvg';
import { getTransactionElevate } from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import TransactionSvg from '../ReusableSvgComponents/TransactionSvg';
import { RiDivideFill } from 'react-icons/ri';
import { MdDiversity1 } from 'react-icons/md';
const ReceivePaymentThird = ({
    title,
    action,
    buttonText,
    type,
    overlay,
    closeAction,
    link,
    track,
    amount
}) => {
    const [destinationTrue, setDestinationTrue] = useState(true);
    const [addnew, setAddnew] = useState(false);
    const [newAmount, setNewAmount] = useState('');
    const dispatch = useDispatch();
    const { transactionElevate, errorMessageTransactionElevate } = useSelector(
        (state) => state.transactionElevateReducer
    );
    const [dateState, setDateState] = useState(false);
    const [time, setTime] = useState();
    const [tableDetails, setTableDetails] = useState([]);
    const [rangeDate, setRangeDate] = useState();
    const [pageSrchIndex, setPageSrchIndex] = useState(0);
    const [numOfRecords, setNumOfRecords] = useState(10);

    const [transactionType, setTransactionType] = useState();
    useEffect(() => {
        if (title === 'View all Qr Links') {
            setTransactionType('QR_PAYMENT');
            dispatch(
                getTransactionElevate(
                    pageSrchIndex,
                    numOfRecords,
                    transactionType
                )
            );
        } else if (title === 'View all USSD Links') {
            setTransactionType('USSD');

            dispatch(
                getTransactionElevate(
                    pageSrchIndex,
                    numOfRecords,
                    transactionType
                )
            );
        } else if (title === 'View all Payment Links') {
            setTransactionType('PAYMENT_LINK');

            dispatch(
                getTransactionElevate(
                    pageSrchIndex,
                    numOfRecords,
                    transactionType
                )
            );
        }

        getCurrentDate();
    }, [transactionType]);
    useEffect(() => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
            currencyDisplay: 'narrowSymbol'
        });
        const formattedAmount = formatter.format(amount);
        setNewAmount(formattedAmount);
    }, []);
    const getCurrentDate = () => {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        setTime(
            `${year}-${month < 10 ? `0${month}` : `${month}`}-${
                date < 10 ? `0${date}` : `${date}`
            }`
        );
    };
    useEffect(() => {
        if (transactionElevate !== null) {
            setTableDetails(transactionElevate.transactions);
            // console.log(transactionElevate.transactions);
            tableDetails?.filter((item) => {
                const newDate = item.transactionDate.split('T');
                console.log(newDate[0], time);
                if (newDate[0] !== time) {
                    setDateState(true);
                } else {
                    setDateState(false);
                }
            });

            // tableDetails.data?.map((item) => {
            //     //console.log(item.transactionDate);
            // });
        }
        // console.log(transactionElevate);
    }, [transactionElevate]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Overlay overlay={overlay}>
                <div className={styles.secondBody}>
                    <div className={styles.closeCont}>
                        <CloseButton
                            color="#A5A5A5"
                            classes={styles.closeBtn}
                            action={closeAction}
                        />
                    </div>
                    <div className={styles.secondCont}>
                        <h2>{title}</h2>
                        <p className={styles.intro}>Today - 22/04/2022</p>

                        {/* <div className={styles.deadlines}>
                        <p>Valid Till</p>
                        <div className={styles.deadlineValues}>
                            <p>Saturday 22 June, 2022 . 12:53 PM</p>
                        </div>
                    </div> */}
                        <section className={styles.sectionI}></section>
                        <div className={styles.Tpwh}>
                            {dateState === true ? (
                                <div className={styles.transactionBody}>
                                    <div>
                                        <p>No {type} Has Been Generated yet</p>
                                    </div>
                                </div>
                            ) : (
                                tableDetails
                                    ?.filter((item) => {
                                        const newDate = item.transactionDate.split(
                                            'T'
                                        );
                                        return item;
                                    })
                                    ?.map((item, index) => {
                                        const formatter = new Intl.NumberFormat(
                                            'en-US',
                                            {
                                                style: 'currency',
                                                currency: 'NGN',
                                                currencyDisplay: 'narrowSymbol'
                                            }
                                        );
                                        const formattedAmount = formatter.format(
                                            item.transactionAmount
                                        );
                                        return (
                                            <div key={index}>
                                                <div
                                                    className={styles.deadlines}
                                                >
                                                    <div
                                                        className={
                                                            styles.nameDate
                                                        }
                                                    >
                                                        <p>
                                                            {
                                                                item.paymentDirection
                                                            }
                                                        </p>
                                                        <p>
                                                            {
                                                                item.transactionAmount
                                                            }
                                                        </p>
                                                    </div>
                                                    {/* <div
                                                        className={
                                                            styles.acceptedOrCancelled
                                                        }
                                                    > */}

                                                    <div
                                                        className={styles.paid}
                                                    >
                                                        <div
                                                            className={
                                                                styles.mainStatus
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    item.transactionStatus ===
                                                                    'FAILED'
                                                                        ? styles.red
                                                                        : item.transactionStatus ===
                                                                          'PENDING'
                                                                        ? styles.blue
                                                                        : styles.green
                                                                }
                                                            ></div>
                                                            <p
                                                                className={
                                                                    item.transactionStatus ===
                                                                    'FAILED'
                                                                        ? styles.cancel
                                                                        : item.transactionStatus ===
                                                                          'PENDING'
                                                                        ? styles.pending
                                                                        : styles.accepted
                                                                }
                                                            >
                                                                {
                                                                    item.transactionStatus
                                                                }
                                                            </p>
                                                        </div>
                                                        <p>
                                                            {item.transactionStatus ==
                                                                'PENDING' ||
                                                            'UNSUCCESSFUL'
                                                                ? 'Unpaid'
                                                                : 'Paid'}
                                                        </p>
                                                        <EditSvg />
                                                    </div>
                                                </div>
                                                {/* </div> */}
                                            </div>
                                        );
                                    })
                            )}
                        </div>
                        {/* <div className={styles.deadlines}>
                            <div className={styles.nameDate}>
                                <p>Ayomide James</p>
                                <p>ellevate.com/essg/esd4...</p>
                            </div>
                            <div className={styles.acceptedOrCancelled}>
                                <div className={styles.redOrGreen}></div>
                                <div>
                                    <p className={styles.cancel}>Cancel</p>
                                </div>
                                <div>
                                    <EditSvg />
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </Overlay>
        </div>
    );
};

export default ReceivePaymentThird;
