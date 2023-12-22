import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { useDispatch } from 'react-redux';
import { getDisputCategoryGen } from '../../../redux/actions/getDisputeInfoAction';
import {
    useTransactionHistoryMutation,
    useVirtualAccountTransLogMutation
} from '../../../redux/api/authApi';
import socialdata from '../../ReusableComponents/Lotties/loading.json';
import CloseButton from '../CloseButtonSvg';
import MoreAction from '../MoreAction';
import Overlay from '../Overlay';
import styles from './styles.module.css';
import TransactionDets from './transactionDets';

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
    const [
        transactionHistory,
        {
            data: transactionHistoryData,
            isLoading: transactionHistoryLoad,
            isSuccess: transactionHistorySuccess,
            isError: transactionHistoryFalse,
            error: transactionHistoryErr,
            reset: transactionHistoryReset
        }
    ] = useTransactionHistoryMutation();

    const [
        virtualAccountTransLog,
        {
            data: virtualAccountTransLogData,
            isLoading: virtualAccountTransLogLoad,
            isSuccess: virtualAccountTransLogSuccess,
            isError: virtualAccountTransLogFalse,
            error: virtualAccountTransLogErr,
            reset: virtualAccountTransLogReset
        }
    ] = useVirtualAccountTransLogMutation();
    const [destinationTrue, setDestinationTrue] = useState(true);
    const [addnew, setAddnew] = useState(false);
    const [newAmount, setNewAmount] = useState('');
    const dispatch = useDispatch();

    const [dateState, setDateState] = useState(false);
    const [time, setTime] = useState();
    const [tableDetails, setTableDetails] = useState([]);
    const [rangeDate, setRangeDate] = useState();
    const [pageSrchIndex, setPageSrchIndex] = useState(0);
    const [numOfRecords, setNumOfRecords] = useState(1000);
    const [isLoading, setIsLoading] = useState(true);
    const [transactionType, setTransactionType] = useState();
    const [currentDate, setCurrentDate] = useState();

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
        dispatch(getDisputCategoryGen('Complaint'));
        //console.log(getDisputCategOryTypeSuccess);

        if (title === 'View all Qr Links') {
            setTransactionType('QR_PAYMENT');
            transactionHistory({
                limit: 12,
                fromDate: '',
                toDate: '',
                order: 'DESC',
                filter: {
                    type: 'QR',
                    field: '',
                    value: ''
                }
            });
        } else if (title === 'View all USSD Links') {
            setTransactionType('USSD');
            transactionHistory({
                limit: 12,
                fromDate: '',
                toDate: '',
                order: 'DESC',
                filter: {
                    type: 'USSD',
                    field: '',
                    value: ''
                }
            });
        } else if (title === 'View all Payment Links') {
            setTransactionType('PAYMENT_LINK');
            transactionHistory({
                limit: 12,
                fromDate: '',
                toDate: '',
                order: 'DESC',
                filter: {
                    type: 'PUP',
                    field: '',
                    value: ''
                }
            });
        } else if (title === 'View accounts') {
            virtualAccountTransLog();
            transactionHistory({
                limit: 12,
                fromDate: '',
                toDate: '',
                order: 'DESC',
                filter: {
                    type: 'PUP',
                    field: '',
                    value: ''
                }
            });
        }

        getCurrentDate();
    }, [transactionType]);
    const [dispute, setDispute] = useState();

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
                                {/* { //console.log(trans)} */}
                                {transactionHistoryLoad ||
                                virtualAccountTransLogLoad ? (
                                    <Lottie
                                        options={socialOptions}
                                        height={200}
                                        width={200}
                                    />
                                ) : transactionHistoryData?.data?.length ===
                                  0 ? (
                                    <div className={styles.transactionBody}>
                                        <div>
                                            <p>
                                                No {type} Has Been Generated yet
                                            </p>
                                        </div>
                                    </div>
                                ) : trans == null ? (
                                    transactionHistoryData?.data?.map(
                                        (data, index) => {
                                            return (
                                                <>
                                                    <div
                                                        key={index}
                                                        className={
                                                            styles.indxDiv
                                                        }
                                                    >
                                                        <div>
                                                            <p>
                                                                {
                                                                    data?.transactionAmount
                                                                }
                                                            </p>
                                                            <p>
                                                                {
                                                                    data?.transactionType
                                                                }
                                                            </p>
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.statusMoreFlex
                                                            }
                                                        >
                                                            <div>
                                                                <p
                                                                    className={
                                                                        data?.transactionStatus ===
                                                                        'FAILED'
                                                                            ? styles.failed
                                                                            : data?.transactionStatus ===
                                                                              'PENDING'
                                                                            ? styles.pending
                                                                            : styles.success
                                                                    }
                                                                >
                                                                    {
                                                                        data?.transactionStatus
                                                                    }
                                                                </p>
                                                                <p>
                                                                    {
                                                                        data?.transactionDate
                                                                    }
                                                                </p>
                                                            </div>
                                                            <MoreAction
                                                                transactionStatus={
                                                                    data?.transactionStatus
                                                                }
                                                                transactionDate={
                                                                    data?.transactionDate
                                                                }
                                                                sender={
                                                                    data?.sourceAccount
                                                                }
                                                                transactionTitle={data?.transactionType.replace(
                                                                    '_',
                                                                    ' '
                                                                )}
                                                                transactionAmount={parseFloat(
                                                                    data?.transactionAmount
                                                                ).toLocaleString(
                                                                    'en-US'
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <br />
                                                </>
                                            );
                                        }
                                    )
                                ) : (
                                    transactionHistoryData?.data?.map(
                                        (data, index) => {
                                            return (
                                                <div key={index}>
                                                    <TransactionDets
                                                        key={index}
                                                        beneficiary={
                                                            data?.transactionStatus
                                                        }
                                                        accountId={
                                                            data?.sourceAccountId
                                                        }
                                                        disputes={dispute}
                                                        type={
                                                            data?.transactionType
                                                        }
                                                        narration={
                                                            data?.narration
                                                        }
                                                        transactionId={
                                                            data?.transactionId
                                                        }
                                                        sender={data?.sender}
                                                        destinationBank={
                                                            data?.destinationBank
                                                        }
                                                        paymentDirection={
                                                            data?.paymentDirection
                                                        }
                                                        transactionAmmount={
                                                            data?.transactionAmount
                                                        }
                                                        transactionStatus={
                                                            data?.transactionStatus
                                                        }
                                                        transactionTitle={
                                                            data?.transactionTitle
                                                        }
                                                        dateTrans={
                                                            data?.transactionDate
                                                        }
                                                    />
                                                </div>
                                            );
                                        }
                                    )
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
