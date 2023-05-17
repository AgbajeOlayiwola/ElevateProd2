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
import OutsideClick from '../OutsideClick';
import Lottie from 'react-lottie';
import socialdata from '../../ReusableComponents/Lotties/loading.json';
import Loader from '../Loader';
import CloseBtnSvg from '../ClosebtnSvg';
const TransactionDets = ({
    paymentDirection,
    transactionAmmount,
    transactionStatus,
    transactionTitle,
    type,
    sender,
    destinationBank,
    narration,
    disputes,
    accountId,
    transactionId,
    transactionRef,
    beneficiary
}) => {
    const [dispute, setDispute] = useState('');
    const [disputeCate, setDisputeCat] = useState('');
    const dispatch = useDispatch();
    const [showReciept, setShowReciept] = useState(false);
    const [showDispute, setShowDispute] = useState(false);
    const [reciept, setReciept] = useState(false);
    const [disputeType, setDisputeType] = useState();
    const [selectedDisputeType, setSelectedDisputeType] = useState();
    const [
        selectedDisputSubCategory,
        setSelectedDisputeSubCategory
    ] = useState();
    const [selectedDisputeCategory, setSelectedDisputeCategory] = useState();
    const [complaintCategory, setComplaintCategory] = useState();
    const exportRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
        setDisputeType(event.target.value);
        if (getDisputCategorySuccess) {
            setIsLoading(false);
            setComplaintCategory(getDisputCategorySuccess);
            console.log(getDisputCategorySuccess);
        }
    };
    const complainCateFunction = (event) => {
        setIsLoading(true);
        dispatch(getDisputCategorySubGen(event.target.value, disputeType));
        setSelectedDisputeCategory(event.target.value);
        if (getDisputCategorySubSuccess) {
            setIsLoading(false);
            console.log(getDisputCategorySubSuccess);
        }
    };
    const complaintSubVateFunction = (event) => {
        setSelectedDisputeSubCategory(event.target.value);
    };
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');
    const [descriptions, setDescription] = useState('');
    const types = 'Complaint';
    const sub = 'Transfers';
    useEffect(() => {
        if (paymentDirection?.toLowerCase() === 'debit') {
            setSelectedDisputeCategory('Payments');
        }
        if (type.toLowerCase() === 'ussd') {
            setSelectedDisputeCategory('Ussd');
        }
        if (type?.toLowerCase() === 'payment_link') {
            setSelectedDisputeCategory('Cards');
        }
        if (type?.toLowerCase() === 'qr_payment') {
            setSelectedDisputeCategory('Payments');
        }
    }, [paymentDirection]);
    const lodgeTheComplaint = () => {
        setLoading(true);
        const data = {
            accountId: accountId,
            caseCategory: selectedDisputeCategory,
            caseSubCategory: sub,
            caseType: types,
            description: `${types} from USER about ${selectedDisputeCategory} regarding ${sub}. With Transaction Id:  and Transaction Ref: . Amount involved: ${transactionAmmount}. Futher Insight From User:${descriptions}`
        };
        dispatch(lodgeDisputeSubGen(data));
    };
    useEffect(() => {
        if (lodgeDisputeErrorSubMessage) {
            setLoading(false);
        }
    }, [lodgeDisputeErrorSubMessage]);

    const socialOptions = {
        loop: true,
        autoplay: true,
        animationData: socialdata,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
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
                            <OutsideClick
                                onClickOutside={() => {
                                    setDispute(false);
                                }}
                            >
                                <div className={styles.disput}>
                                    <div
                                        className={styles.dispute}
                                        onClick={() => {
                                            setShowDispute((prev) => !prev);
                                            // setDispute(false);
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
                            </OutsideClick>
                        ) : null}
                        {showDispute ? (
                            <OutsideClick
                                onClickOutside={() => {
                                    setShowDispute((prev) => !prev);
                                }}
                            >
                                <div className={styles.showDispute}>
                                    <div className={styles.cancelDispute}>
                                        <CloseBtnSvg
                                            action={() => setShowDispute(false)}
                                        />
                                    </div>
                                    <p classNmae={styles.typeSub}>
                                        Transacton Amount:{transactionAmmount}
                                    </p>
                                    <p classNmae={styles.typeSub}>
                                        Type: {type}
                                    </p>
                                    <p classNmae={styles.typeSub}>
                                        Sub Category: {sub}
                                    </p>
                                    <div className={styles.cancel}></div>
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
                                    <button onClick={lodgeTheComplaint}>
                                        Submit
                                    </button>
                                </div>
                            </OutsideClick>
                        ) : null}
                        {reciept ? (
                            <OutsideClick
                                onClickOutside={() => {
                                    setReciept((prev) => !prev);
                                }}
                            >
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
                                                    : transactionStatus ===
                                                      'FAILED'
                                                    ? styles.failedReciept
                                                    : styles.successReciept
                                            }
                                        >
                                            <h1>{transactionAmmount}</h1>
                                            <h2
                                                className={
                                                    transactionStatus ===
                                                    'PENDING'
                                                        ? styles.statusText
                                                        : transactionStatus ===
                                                          'FAILED'
                                                        ? styles.failedText
                                                        : styles.successText
                                                }
                                            >
                                                {transactionStatus}
                                            </h2>
                                        </div>
                                        <div className={styles.recieptPad}>
                                            <div>
                                                <h1>{transactionTitle}</h1>
                                            </div>
                                            {transactionTitle ===
                                            null ? null : (
                                                <>
                                                    {' '}
                                                    <div
                                                        className={
                                                            styles.senderInfo
                                                        }
                                                    >
                                                        <p>
                                                            Beneficiary Account
                                                        </p>
                                                        <p>
                                                            {transactionTitle}
                                                        </p>
                                                    </div>
                                                    <hr />
                                                </>
                                            )}
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
                                                Due to the nature of the
                                                internet, transactions may be
                                                subject to interruption
                                                blackout, delayed transmission
                                                and incorrect data transmission.
                                                The Bank is not liable for
                                                malfunction in communication
                                                facilities not within its
                                                control that may affect the
                                                accuracy and timeliness of
                                                messages and transaction you
                                                send. All transactions are
                                                subject to verification and
                                                normal fraud checks.
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
                            </OutsideClick>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TransactionDets;
