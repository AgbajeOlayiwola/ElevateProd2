import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { useDispatch } from 'react-redux';
import { getDisputCategoryGen } from '../../../redux/actions/getDisputeInfoAction';
import {
<<<<<<< HEAD
    useTransactionHistoryMutation,
    useVirtualAccountTransLogMutation
} from '../../../redux/api/authApi';
=======
    useGetVaHistoryQuery,
    useTransactionHistoryMutation
} from '../../../redux/api/authApi';
import { createFormatter } from '../../../utils/formatter/formatter';
>>>>>>> 573d3178b7138ee75de948da6f0ee5fefb219f74
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

<<<<<<< HEAD
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
=======
    const {
        data: vaData,
        refetch,
        isFetching,
        isSuccess,
        isError
    } = useGetVaHistoryQuery(null, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });
    const affiliate = localStorage.getItem('affiliateCode');
>>>>>>> 573d3178b7138ee75de948da6f0ee5fefb219f74
    const [destinationTrue, setDestinationTrue] = useState(true);
    const [addnew, setAddnew] = useState(false);
    const [newAmount, setNewAmount] = useState('');
    const dispatch = useDispatch();
    const [transactions, setTransactions] = useState();
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
    const [virtualData, setVirtualData] = useState();

    //     , {
    //       refetchOnFocus: true,
    //       refetchOnMountOrArgChange: true
    //   }

    useEffect(() => {
        dispatch(getDisputCategoryGen('Complaint'));
        //// console.log(getDisputCategOryTypeSuccess);

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
<<<<<<< HEAD
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
=======
            refetch();
>>>>>>> 573d3178b7138ee75de948da6f0ee5fefb219f74
        }

        getCurrentDate();
    }, [transactionType]);
    useEffect(() => {
        if (transactionHistorySuccess || isSuccess) {
            if (title === 'View accounts') {
                const updatedData = vaData?.data?.map((item) => {
                    if (item?.accountTimeoutStatus === 'TRANS_IN_PROGRESS') {
                        return { ...item, accountTimeoutStatus: 'PENDING' };
                    } else if (
                        item.accountTimeoutStatus === 'TRANS_COMPLETED'
                    ) {
                        return { ...item, accountTimeoutStatus: 'SUCCESS' };
                    } else {
                        return { ...item, accountTimeoutStatus: 'FAILED' };
                    }
                });
                const rebase = updatedData?.map((item) => ({
                    ...item
                    // transactionDate: moment(item?.transactionDate).format('MMM DD, YYYY'),
                }));
                setTransactions(rebase);
            } else {
                setTransactions(transactionHistoryData?.data);
            }
        }
    }, [transactionHistorySuccess, isSuccess]);

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
    const formater = createFormatter(affiliate);
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
<<<<<<< HEAD
                                {/* { //console.log(trans)} */}
                                {transactionHistoryLoad ||
                                virtualAccountTransLogLoad ? (
=======
                                {/* { //// console.log(trans)} */}
                                {transactionHistoryLoad || isFetching ? (
>>>>>>> 573d3178b7138ee75de948da6f0ee5fefb219f74
                                    <Lottie
                                        options={socialOptions}
                                        height={200}
                                        width={200}
                                    />
                                ) : transactionHistoryData?.data?.length ===
                                      0 || vaData?.data?.length === 0 ? (
                                    <div className={styles.transactionBody}>
                                        <div>
                                            <p>
                                                No {type} Has Been Generated yet
                                            </p>
                                        </div>
                                    </div>
                                ) : trans == null ? (
                                    transactions?.map((data, index) => {
                                        return (
                                            <>
                                                <div
                                                    key={index}
                                                    className={styles.indxDiv}
                                                >
                                                    <div>
                                                        <p>
                                                            {title ===
                                                            'View accounts'
                                                                ? data?.amount
                                                                : data?.transactionAmount}
                                                        </p>
                                                        <p>
                                                            {title ===
                                                            'View accounts'
                                                                ? data?.serviceProviderName
                                                                : data?.transactionType}
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
                                                                {title ===
                                                                'View accounts'
                                                                    ? data?.accountTimeoutStatus
                                                                    : data?.transactionStatus}
                                                            </p>
                                                            <p>
                                                                {
                                                                    data?.transactionDate
                                                                }
                                                            </p>
                                                        </div>
                                                        <MoreAction
                                                            transactionStatus={
                                                                title ===
                                                                'View accounts'
                                                                    ? data?.accountTimeoutStatus
                                                                    : data?.transactionStatus
                                                            }
                                                            transactionDate={
                                                                title ===
                                                                'View accounts'
                                                                    ? data?.requestDate
                                                                    : data?.transactionDate
                                                            }
                                                            sender={
                                                                data?.sourceAccount
                                                            }
                                                            transactionTitle={
                                                                title ===
                                                                'View accounts'
                                                                    ? 'Virtual Account'
                                                                    : data?.transactionType?.replace(
                                                                          '_',
                                                                          ' '
                                                                      )
                                                            }
                                                            transactionAmount={formater?.format(
                                                                Number(
                                                                    title ===
                                                                        'View accounts'
                                                                        ? data?.amount
                                                                        : data?.transactionAmount
                                                                )
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <hr />
                                                <br />
                                            </>
                                        );
                                    })
                                ) : (
                                    transactions?.map((data, index) => {
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
                                                    type={data?.transactionType}
                                                    narration={data?.narration}
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
                                    })
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
