import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import EditSvg from '../editSvg';
import { MdCancel } from 'react-icons/md';
import exportAsImage from '../../../utils/exportAsImage';
import { useDispatch, useSelector } from 'react-redux';

import OutsideClick from '../OutsideClick';
import StorePopup from '../StorePopup';
import CloseBtnSvg from '../ClosebtnSvg';
import Loader from '../Loader';
import { getDisputCategorySubGen } from '../../../redux/actions/getSubDisputeCategoryAction';
import { lodgeDisputeSubGen } from '../../../redux/actions/lodgeDisputeAction';

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
    isaccountId,
    dateTrans
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
    const [isLoading, setIsLoading] = useState(false);
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

    // useEffect(() => {
    //     if (getDisputCategorySuccess !== null) {
    //         setComplaintCategory(getDisputCategorySuccess);
    //          //console.log(getDisputCategorySuccess);
    //     }
    // }, [getDisputCategorySuccess, getDisputCategoryErrorMessage]);
    useEffect(() => {
        if (getDisputCategorySubSuccess !== null) {
            setSelectedDisputeSubCategory(getDisputCategorySubSuccess);
            //  //console.log(getDisputCategorySubSuccess);
        }
    }, [getDisputCategorySubSuccess, getDisputCategoryErrorSubMessage]);

    const complaintSubVateFunction = (event) => {
        dispatch(getDisputCategorySubGen(event.target.value, 'Complaint'));
        setSelectedDisputeCategory(event.target.value);
    };

    const [errors, setErrors] = useState('');
    const [descriptions, setDescription] = useState('');

    const type = 'Complaint';
    const sub = 'TransferError';
    // useEffect(() => {
    //     if (isDirection?.toLowerCase() === 'debit') {
    //         setSelectedDisputeCategory('Payments');
    //     }
    //     if (transactionTitle?.toLowerCase() === 'ussd') {
    //         setSelectedDisputeCategory('Ussd');
    //     }
    //     if (transactionTitle?.toLowerCase() === 'payment_link') {
    //         setSelectedDisputeCategory('Cards');
    //     }
    //     if (transactionTitle?.toLowerCase() === 'qr_payment') {
    //         setSelectedDisputeCategory('Payments');
    //     }
    // }, [isDirection]);
    const lodgeTheComplaint = () => {
        setLoading(true);
        const data = {
            accountId: isaccountId,
            caseCategory: selectedDisputeCategory,
            caseSubCategory: selectedDisputeType,
            caseType: 'Complaint',
            // caseType: type,
            description: `${type} from USER about ${selectedDisputeCategory} regarding ${selectedDisputeType}. With Transaction Id:  and Transaction Ref: . Amount involved: ${transactionAmount}. Futher Insight From User:${descriptions}`
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

    let newDate = dates?.split('T');
    let newTranDate = dateTrans?.split('T');
    return (
        <>
            <div
                className={
                    showDispute
                        ? styles.edit
                        : reciept
                        ? styles.edit
                        : styles.edits
                }
                onClick={() => setDispute(true)}
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
                    </OutsideClick>
                ) : null}
            </div>
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

                            <p>Transaction Type: {transactionTitle}</p>
                            {/* <p>Sub Category: {sub}</p> */}
                            <p>Transaction Status: {transactionStatus}</p>
                            {newDate == null ? null : (
                                <p>
                                    Date :{newDate[0]}, {newDate[1]}
                                </p>
                            )}
                            {newTranDate == null ? null : (
                                <p>
                                    Date :{newTranDate[0]}, {newTranDate[1]}
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
                                {lodgeDisputeErrorSubMessage?.data?.message}
                            </p>
                        ) : null}
                        {/* <div className={styles.formGroup}>
                            <label>Choose Complaint Category</label>
                            <select name="" id="" onChange={disputesFunction}>
                                <option value="">
                                    Select Complaint Category
                                </option>
                                {?.map((item, index) => {
                                    return (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    );
                                })}
                            </select>
                        </div> */}
                        <div className={styles.formGroup}>
                            <label>Choose Complaint Category</label>
                            <select
                                name=""
                                id=""
                                onChange={complaintSubVateFunction}
                            >
                                <option value="">
                                    Select Complaint Category
                                </option>
                                {disputes?.map((item, index) => {
                                    return (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Choose Sub Category</label>
                            <select
                                name=""
                                id=""
                                onChange={(e) => {
                                    setSelectedDisputeType(e.target.value);
                                }}
                            >
                                <option value="">Select Sub Category</option>
                                {selectedDisputSubCategory?.map(
                                    (item, index) => {
                                        return (
                                            <option key={index} value={item}>
                                                {item}
                                            </option>
                                        );
                                    }
                                )}
                            </select>
                        </div>
                        <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            className={styles.disputTextArea}
                            cols={8}
                            rows={6}
                        ></textarea>
                        {loading ? (
                            <Loader />
                        ) : (
                            <button onClick={lodgeTheComplaint}>Submit</button>
                        )}
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
                                    {transactionStatus.toLowerCase()}
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
        </>
    );
};

export default MoreAction;
