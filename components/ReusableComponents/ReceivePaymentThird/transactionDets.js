import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import EditSvg from '../editSvg';
import { MdCancel } from 'react-icons/md';
import exportAsImage from '../../../utils/exportAsImage';
import { useDispatch, useSelector } from 'react-redux';
import {
    getDisputCategoryGen,
    getDisputCategorySubGen,
    lodgeDisputeSubGen
} from '../../../redux/actions/actions';
import CloseBtnSvg from '../ClosebtnSvg';
import Loader from '../Loader';
const TransactionDets = ({
    paymentDirection,
    transactionAmmount,
    transactionStatus,
    transactionTitle,
    dateTrans,
    // dates
    // type,
    sender,
    destinationBank,
    narration,
    disputes,
    accountId,
    transactionId,
    transactionRef
}) => {
    const [dispute, setDispute] = useState('');
    const [disputeCate, setDisputeCat] = useState('');
    const dispatch = useDispatch();
    const [showReciept, setShowReciept] = useState(false);
    const [showDispute, setShowDispute] = useState(false);
    const [reciept, setReciept] = useState(false);
    const [disputeType, setDisputeType] = useState();
    const [loading, setLoading] = useState(false);
    const [selectedDisputeType, setSelectedDisputeType] = useState();
    const [
        selectedDisputSubCategory,
        setSelectedDisputeSubCategory
    ] = useState();
    const [selectedDisputeCategory, setSelectedDisputeCategory] = useState();
    const [complaintCategory, setComplaintCategory] = useState();
    const exportRef = useRef();
    const {
        getDisputCategorySuccess,
        getDisputCategoryErrorMessage
    } = useSelector((state) => state.getDisputeCategoryReducer);
    const {
        getDisputCategorySubSuccess,
        getDisputCategoryErrorSubMessage
    } = useSelector((state) => state.getDisputeSubCategoryReducer);
    const { lodgeDisputeSuccess, lodgeDisputeErrorSubMessage } = useSelector(
        (state) => state.lodgeDisputeReducer
    );
    const disputesFunction = (event) => {
        dispatch(getDisputCategoryGen(event.target.value));
        setDisputeType(event.target.value);
        if (getDisputCategorySuccess) {
            setComplaintCategory(getDisputCategorySuccess);
            console.log(getDisputCategorySuccess);
        }
    };
    const complainCateFunction = (event) => {
        dispatch(getDisputCategorySubGen(event.target.value, disputeType));
        setSelectedDisputeCategory(event.target.value);
        if (getDisputCategorySubSuccess) {
            console.log(getDisputCategorySubSuccess);
        }
    };
    const complaintSubVateFunction = (event) => {
        setSelectedDisputeSubCategory(event.target.value);
    };
    const [errors, setErrors] = useState('');
    // const lodgeTheComplaint = () => {
    //     const data = {
    //         accountId: accountId,
    //         caseCategory: selectedDisputeCategory,
    //         caseSubCategory: selectedDisputSubCategory,
    //         caseType: disputeType,
    //         description: `${disputeType} from USER about ${selectedDisputeCategory} regarding ${selectedDisputSubCategory}. With Transaction Id: ${transactionId} and Transaction Ref: ${transactionRef}. Amount involved: ${transactionAmmount}`
    //     };
    //     dispatch(lodgeDisputeSubGen(data));
    //     if (lodgeDisputeErrorSubMessage) {
    //     }
    // };

    const type = 'Complaint';
    const sub = 'TransferError';
    useEffect(() => {
        if (paymentDirection?.toLowerCase() === 'debit') {
            setSelectedDisputeCategory('Payments');
        }
        if (transactionTitle?.toLowerCase() === 'ussd') {
            setSelectedDisputeCategory('Ussd');
        }
        if (transactionTitle?.toLowerCase() === 'payment_link') {
            setSelectedDisputeCategory('Cards');
        }
        if (transactionTitle?.toLowerCase() === 'qr_payment') {
            setSelectedDisputeCategory('Payments');
        }
    }, [paymentDirection]);
    const lodgeTheComplaint = () => {
        setLoading(true);
        const data = {
            accountId: isaccountId,
            caseCategory: selectedDisputeCategory,
            caseSubCategory: sub,
            caseType: type,
            description: `${type} from USER about ${selectedDisputeCategory} regarding ${sub}. With Transaction Id:  and Transaction Ref: . Amount involved: ${transactionAmount}. Futher Insight From User:${descriptions}`
        };
        dispatch(lodgeDisputeSubGen(data));
        if (lodgeDisputeErrorSubMessage) {
            setLoading(false);
            setLodgeDisputeError(lodgeDisputeErrorSubMessage?.data?.message);
        }
    };
    const [lodgeSuccess, setLodgeSuccess] = useState();
    useEffect(() => {
        if (lodgeDisputeErrorSubMessage) {
            setLoading(false);
        } else if (lodgeDisputeSuccess)
            setLodgeSuccess('Dispute Lodged Successfully');
    }, [lodgeDisputeSuccess, lodgeDisputeErrorSubMessage]);
    let newDate = dateTrans?.split('T');
    let newTranDate = dateTrans?.split('T');

    // console.log(disputeType);
    return (
        <div>
            <div className={styles.deadlines}>
                <div className={styles.nameDate}>
                    <p>{transactionTitle}</p>
                    <p>{transactionAmmount}</p>
                </div>
                {/* <div
                        className={
                            styles.acceptedOrCancelled
                        }
                    > */}

                <div className={styles.paid}>
                    <div className={styles.mainStatus}>
                        <div
                            className={
                                transactionStatus === 'FAILED'
                                    ? styles.red
                                    : transactionStatus === 'PENDING'
                                    ? styles.blue
                                    : styles.green
                            }
                        ></div>
                        <p
                            className={
                                transactionStatus === 'FAILED'
                                    ? styles.cancel
                                    : transactionStatus === 'PENDING'
                                    ? styles.pending
                                    : styles.accepted
                            }
                        >
                            {transactionStatus}
                        </p>
                    </div>
                    <p className={styles.paidUnpaid}>
                        {transactionStatus !== 'SUCCESS' ? 'Unpaid' : 'Paid'}
                    </p>
                    <div
                        className={styles.edit}
                        onClick={() => setDispute((prev) => !prev)}
                    >
                        <EditSvg />
                        {dispute ? (
                            <div className={styles.disput}>
                                <div
                                    className={styles.dispute}
                                    onClick={() => {
                                        setShowDispute((prev) => !prev);
                                        setDispute(false);
                                    }}
                                >
                                    Dispute
                                </div>

                                <hr />
                                <div
                                    className={styles.reciept}
                                    onClick={() => {
                                        setReciept((prev) => !prev);
                                        setDispute(false);
                                    }}
                                >
                                    Get Reciept
                                </div>
                            </div>
                        ) : null}
                        {showDispute ? (
                            <div className={styles.showDispute}>
                                {/* <div className={styles.cancel}>
                                    <MdCancel
                                        onClick={() => setShowDispute(false)}
                                    />
                                </div> */}
                                {lodgeDisputeErrorSubMessage ? (
                                    <p className={styles.errors}>
                                        {
                                            lodgeDisputeErrorSubMessage?.data
                                                ?.message
                                        }
                                    </p>
                                ) : null}
                                <div className={styles.maindispute}>
                                    <div className={styles.showDispute}>
                                        <div className={styles.cancel}>
                                            <CloseBtnSvg
                                                action={() =>
                                                    setShowDispute(false)
                                                }
                                            />
                                        </div>
                                        <div className={styles.amountTrans}>
                                            <p>
                                                Transaction Amount:{' '}
                                                {transactionAmmount}
                                            </p>

                                            <p>
                                                Transaction Type:{' '}
                                                {transactionTitle}
                                            </p>
                                            {/* <p>Sub Category: {sub}</p> */}
                                            <p>
                                                Transaction Status:{' '}
                                                {transactionStatus}
                                            </p>
                                            {/* {newDate == null ? null : (
                                                <p>
                                                    date :{newDate[0]},{' '}
                                                    {newDate[1]}
                                                </p>
                                            )} */}
                                            {newTranDate == null ? null : (
                                                <p>
                                                    date :{newTranDate[0]},{' '}
                                                    {newTranDate[1]}
                                                </p>
                                            )}
                                        </div>
                                        {lodgeSuccess ? (
                                            <p className={styles.lofgeSuccess}>
                                                {lodgeSuccess}
                                            </p>
                                        ) : null}
                                        {lodgeDisputeErrorSubMessage ? (
                                            <p className={styles.errors}>
                                                {
                                                    lodgeDisputeErrorSubMessage
                                                        ?.data?.message
                                                }
                                            </p>
                                        ) : null}
                                        <textarea
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            className={styles.disputTextArea}
                                            cols={8}
                                            rows={6}
                                        ></textarea>
                                        {loading ? (
                                            <Loader />
                                        ) : (
                                            <button onClick={lodgeTheComplaint}>
                                                Submit
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        {reciept ? (
                            <div className={styles.showReciept}>
                                <div className={styles.cancelReciept}>
                                    <MdCancel
                                        onClick={() => setReciept(false)}
                                    />
                                </div>
                                <div
                                    ref={exportRef}
                                    className={styles.recieptDiv}
                                >
                                    <div
                                        className={
                                            transactionStatus === 'PENDING'
                                                ? styles.pendingReciept
                                                : styles.success
                                        }
                                    >
                                        <h1>₦{transactionAmmount}</h1>
                                    </div>
                                    <div className={styles.recieptPad}>
                                        <div>
                                            <h1>{transactionTitle}</h1>
                                        </div>
                                        <div className={styles.senderInfo}>
                                            <p>Beneficiary Account</p>
                                            <p>1234567890</p>
                                        </div>
                                        <hr />
                                        {type === null ? null : (
                                            <>
                                                <div
                                                    className={
                                                        styles.senderInfo
                                                    }
                                                >
                                                    <p>Transaction Type</p>
                                                    <p>{type}</p>
                                                </div>
                                                <hr />
                                            </>
                                        )}

                                        {sender === null ? null : (
                                            <>
                                                <div
                                                    className={
                                                        styles.senderInfo
                                                    }
                                                >
                                                    <p>Sender Name</p>
                                                    <p>{sender}</p>
                                                </div>
                                                <hr />
                                            </>
                                        )}

                                        {destinationBank === null ? null : (
                                            <>
                                                <div
                                                    className={
                                                        styles.senderInfo
                                                    }
                                                >
                                                    <p>Destination Bank</p>
                                                    <p>{destinationBank}</p>
                                                </div>
                                                <hr />
                                            </>
                                        )}
                                        {narration === null ? null : (
                                            <>
                                                <div
                                                    className={
                                                        styles.senderInfo
                                                    }
                                                >
                                                    <p>Narration</p>
                                                    <p>{narration}</p>
                                                </div>
                                                <hr />
                                            </>
                                        )}
                                    </div>
                                    <div className={styles.diclaimer}>
                                        <p>
                                            Due to the nature of the internet,
                                            transactions may be subject to
                                            interruption blackout, delayed
                                            transmission and incorrect data
                                            transmission. The Bank is not liable
                                            for malfunction in communication
                                            facilities not within its control
                                            that may affect the accuracy and
                                            timeliness of messages and
                                            transaction you send. All
                                            transactions are subject to
                                            verification and normal fraud
                                            checks.
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.btnDiv}>
                                    <button
                                        className={styles.dounloadReciept}
                                        onClick={() =>
                                            exportAsImage(
                                                exportRef.current,
                                                'QrReciept'
                                            )
                                        }
                                    >
                                        Download
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TransactionDets;
