import React, { useState, useEffect, useRef } from 'react';
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
import StorePopup from '../StorePopup';
import CloseBtnSvg from '../ClosebtnSvg';

const MoreAction = ({
    isDirection,
    transactionAmount,
    transactionStatus,
    transactionTitle,
    sender,
    destinationBank,
    narration,
    disputes,
    accountId,
    dates,
    senders,
    sendBank,
    narr,
    bene,
    isaccountId
}) => {
    const [dispute, setDispute] = useState('');
    const [disputeCate, setDisputeCat] = useState('');
    const dispatch = useDispatch();
    const [showReciept, setShowReciept] = useState(false);
    const [loading, setLoading] = useState(false);
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
    const [descriptions, setDescription] = useState('');

    const type = 'Complaint';
    const sub = 'Transfers';
    useEffect(() => {
        if (isDirection?.toLowerCase() === 'debit') {
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
    }, [isDirection]);
    const lodgeTheComplaint = () => {
        const data = {
            accountId: isaccountId,
            caseCategory: selectedDisputeCategory,
            caseSubCategory: sub,
            caseType: type,
            description: `${type} from USER about ${selectedDisputeCategory} regarding ${sub}. With Transaction Id:  and Transaction Ref: . Amount involved: ${transactionAmount}. Futher Insight From User:${descriptions}`
        };
        dispatch(lodgeDisputeSubGen(data));
        if (lodgeDisputeErrorSubMessage) {
        }
    };
    let newDate = dates?.split('T');
    return (
        <div
            className={
                showDispute ? styles.edit : reciept ? styles.edit : styles.edits
            }
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
                            onClick={() => setShowDispute((prev) => !prev)}
                        >
                            Dispute
                        </div>

                        <hr />
                        <div
                            className={styles.reciept}
                            onClick={() => setReciept((prev) => !prev)}
                        >
                            Get Reciept
                        </div>
                    </div>
                </OutsideClick>
            ) : null}
            {showDispute ? (
                // <OutsideClick
                //     onClickOutside={() => {
                //         setShowDispute(false);
                //     }}
                // >
                <StorePopup overlay={true}>
                    <div className={styles.showDispute}>
                        <div className={styles.cancel}>
                            <CloseBtnSvg action={() => setShowDispute(false)} />
                        </div>
                        <div>
                            <p>Transaction Amount: {transactionAmount}</p>
                            <p>Type: {type}</p>
                            <p>Sub Category: {sub}</p>
                            {newDate == null ? null : <p>date :{newDate[0]}</p>}
                        </div>
                        {lodgeDisputeErrorSubMessage ? (
                            <p className={styles.errors}>
                                {lodgeDisputeErrorSubMessage?.data?.message}
                            </p>
                        ) : null}
                        <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            className={styles.disputTextArea}
                            cols={8}
                            rows={6}
                        ></textarea>
                        <button onClick={lodgeTheComplaint}>Submit</button>
                    </div>
                </StorePopup>
            ) : null}
            {reciept ? (
                <StorePopup overlay={true}>
                    <div className={styles.showReciept}>
                        <div className={styles.cancelReciept}>
                            <CloseBtnSvg action={() => setReciept(false)} />
                        </div>
                        <div ref={exportRef} className={styles.recieptDiv}>
                            <div
                                className={
                                    transactionStatus === 'PENDING'
                                        ? styles.pendingReciept
                                        : transactionStatus === 'FAILED'
                                        ? styles.failedReciept
                                        : styles.successReciept
                                }
                            >
                                <h1>{transactionAmount}</h1>
                                <h2
                                    className={
                                        transactionStatus === 'PENDING'
                                            ? styles.statusText
                                            : transactionStatus === 'FAILED'
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
                                {bene === null ? null : (
                                    <>
                                        <div className={styles.senderInfo}>
                                            <p>Beneficiary</p>
                                            <p>{bene}</p>
                                        </div>
                                        <hr />
                                    </>
                                )}
                                {type === null ? null : (
                                    <>
                                        <div className={styles.senderInfo}>
                                            <p>Transaction Type</p>
                                            <p>{isDirection}</p>
                                        </div>
                                        <hr />
                                    </>
                                )}

                                {senders === null ? null : (
                                    <>
                                        <div className={styles.senderInfo}>
                                            <p>Sender Name</p>
                                            <p>{sender}</p>
                                        </div>
                                        <hr />
                                    </>
                                )}

                                {sendBank === null ? null : (
                                    <>
                                        <div className={styles.senderInfo}>
                                            <p>Destination Bank</p>
                                            <p>{destinationBank}</p>
                                        </div>
                                        <hr />
                                    </>
                                )}
                                {narr === null ? null : (
                                    <>
                                        <div className={styles.senderInfo}>
                                            <p>Narration</p>
                                            <p>{narr}</p>
                                        </div>
                                        <hr />
                                    </>
                                )}
                            </div>
                            <div className={styles.diclaimer}>
                                <p>
                                    Due to the nature of the internet,
                                    transactions may be subject to interruption
                                    blackout, delayed transmission and incorrect
                                    data transmission. The Bank is not liable
                                    for malfunction in communication facilities
                                    not within its control that may affect the
                                    accuracy and timeliness of messages and
                                    transaction you send. All transactions are
                                    subject to verification and normal fraud
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
                </StorePopup>
            ) : null}
        </div>
    );
};

export default MoreAction;
