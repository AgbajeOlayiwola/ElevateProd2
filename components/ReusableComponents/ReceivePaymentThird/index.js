import React, { useState, useEffect } from 'react';
import CloseButton from '../CloseButtonSvg';
import Overlay from '../Overlay';
import styles from './styles.module.css';
import moment from 'moment';
import { of } from 'rxjs';
import { groupBy, map, mergeMap, reduce, toArray } from 'rxjs/operators';
import {
    getDisputCategOryTypeGen,
    getTransactionElevate
} from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import TransactionDets from './transactionDets';
import Lottie from 'react-lottie';
import socialdata from '../../ReusableComponents/Lotties/loading.json';
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
    const [numOfRecords, setNumOfRecords] = useState(1000);
    const [isLoading, setIsLoading] = useState(true);
    const [transactionType, setTransactionType] = useState();
    const [currentDate, setCurrentDate] = useState();
    const {
        getDisputCategOryTypeSuccess,
        getDisputCategOryTypeErrorMessage
    } = useSelector((state) => state.getDisputeTypeReducer);
    const [trans, setTrans] = useState(null);
    const socialOptions = {
        loop: true,
        autoplay: true,
        animationData: socialdata,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(() => {
        dispatch(getDisputCategOryTypeGen());
        console.log(getDisputCategOryTypeSuccess);

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
    const [dispute, setDispute] = useState();
    useEffect(() => {
        setDispute(getDisputCategOryTypeSuccess);
        console.log(dispute);
    }, [getDisputCategOryTypeSuccess]);

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
    const txs = ''; // Replace with the actual data for `txs`

    useEffect(() => {
        if (transactionElevate !== null) {
            setTableDetails(transactionElevate.transactions);
            setIsLoading(false);

            tableDetails?.filter((item) => {
                const newDate = item.transactionDate.split('T');
                setCurrentDate(newDate[0]);
                if (newDate[0] !== time) {
                    setDateState(true);
                    setCurrentDate(newDate[0]);
                } else {
                    setDateState(false);
                    setCurrentDate(newDate[0]);
                }
            });

            const txs = transactionElevate.transactions;

            of(...txs)
                .pipe(
                    groupBy((p) => p?.transactionDate?.split('T')[0]),
                    mergeMap((group$) =>
                        group$.pipe(
                            reduce((acc, cur) => [...acc, cur], [
                                `${group$.key}`
                            ])
                        )
                    ),
                    map((arr) => ({ date: arr[0], trans: arr.slice(1) })),
                    toArray()
                )
                .subscribe((p) => {
                    setTrans(p);
                    console.log(trans);
                });
        }
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
                        <p className={styles.intro}>
                            {' '}
                            {/* {moment(item?.date)?.format('YYYY-MM-DD')} */}
                        </p>

                        {/* <div className={styles.deadlines}>
                        <p>Valid Till</p>
                        <div className={styles.deadlineValues}>
                            <p>Saturday 22 June, 2022 . 12:53 PM</p>
                        </div>
                    </div> */}
                        <section className={styles.sectionI}></section>
                        <div className={styles.Tpwh}>
                            <div>
                                {/* {console.log(trans)} */}
                                {isLoading ? (
                                    <Lottie
                                        options={socialOptions}
                                        height={200}
                                        width={200}
                                    />
                                ) : tableDetails.length === 0 ? (
                                    <div className={styles.transactionBody}>
                                        <div>
                                            <p>
                                                No {type} Has Been Generated yet
                                            </p>
                                        </div>
                                    </div>
                                ) : trans == null ? null : (
                                    trans?.map((item) => (
                                        <div key={item.date}>
                                            <p className={styles.dates}>
                                                {moment(item?.date)?.format(
                                                    'YYYY-MM-DD'
                                                )}
                                            </p>
                                            <div>
                                                {item?.trans?.map(
                                                    (data, index) => {
                                                        const formatter = new Intl.NumberFormat(
                                                            'en-US',
                                                            {
                                                                style:
                                                                    'currency',
                                                                currency: 'NGN',
                                                                currencyDisplay:
                                                                    'narrowSymbol'
                                                            }
                                                        );
                                                        const formattedAmount = formatter.format(
                                                            data.transactionAmount
                                                        );
                                                        return (
                                                            <div key={data.id}>
                                                                <TransactionDets
                                                                    key={index}
                                                                    beneficiary={
                                                                        data.sourceAccountId
                                                                    }
                                                                    accountId={
                                                                        data.sourceAccountId
                                                                    }
                                                                    disputes={
                                                                        dispute
                                                                    }
                                                                    type={
                                                                        data.transactionType
                                                                    }
                                                                    narration={
                                                                        data.narration
                                                                    }
                                                                    transactionId={
                                                                        data.ransactionId
                                                                    }
                                                                    transactionRef={
                                                                        data.transactionRef
                                                                    }
                                                                    sender={
                                                                        data.sender
                                                                    }
                                                                    destinationBank={
                                                                        data.destinationBank
                                                                    }
                                                                    paymentDirection={
                                                                        data.paymentDirection
                                                                    }
                                                                    transactionAmmount={
                                                                        formattedAmount
                                                                    }
                                                                    transactionStatus={
                                                                        data.transactionStatus
                                                                    }
                                                                    transactionTitle={
                                                                        data.transactionTitle
                                                                    }
                                                                    dateTrans={
                                                                        data.transactionDate
                                                                    }
                                                                />
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Overlay>
        </div>
    );
};

export default ReceivePaymentThird;
