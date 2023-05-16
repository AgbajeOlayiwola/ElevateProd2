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
    transactionAmount,
    transactionStatus,
    transactionTitle,
    sender,
    destinationBank,
    type,
    narration,
    disputes,
    accountId
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

    const lodgeTheComplaint = () => {
        const data = {
            accountId: accountId,
            caseCategory: selectedDisputeCategory,
            caseSubCategory: selectedDisputSubCategory,
            caseType: disputeType,
            description: `${disputeType} from USER about ${selectedDisputeCategory} regarding ${selectedDisputSubCategory}. With Transaction Id:  and Transaction Ref: . Amount involved: ${transactionAmount}`
        };
        dispatch(lodgeDisputeSubGen(data));
        if (lodgeDisputeErrorSubMessage) {
        }
    };
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
                        {lodgeDisputeErrorSubMessage ? (
                            <p className={styles.errors}>
                                {lodgeDisputeErrorSubMessage?.data?.message}
                            </p>
                        ) : null}
                        <div className={styles.maindispute}>
                            <label>Disput type</label>
                            <select onChange={disputesFunction}>
                                <option>Select Dispute Type</option>
                                {disputes?.map((item, index) => {
                                    return (
                                        <option value={item} key={index}>
                                            {item}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className={styles.maindispute}>
                            <label>Dispute category</label>
                            <select onChange={complainCateFunction}>
                                <option>Select Dispute Category</option>
                                {getDisputCategorySuccess?.map(
                                    (item, index) => {
                                        return (
                                            <option value={item} key={index}>
                                                {item}
                                            </option>
                                        );
                                    }
                                )}
                            </select>
                        </div>
                        <div className={styles.maindispute}>
                            <label>Dispute Sub-Category</label>
                            <select onChange={complaintSubVateFunction}>
                                <option>Select Dispute Category</option>
                                {getDisputCategorySubSuccess?.map(
                                    (item, index) => {
                                        return (
                                            <option value={item} key={index}>
                                                {item}
                                            </option>
                                        );
                                    }
                                )}
                            </select>
                        </div>
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
                                <div className={styles.senderInfo}>
                                    <p>Beneficiary Account</p>
                                    <p>1234567890</p>
                                </div>
                                <hr />
                                {type === null ? null : (
                                    <>
                                        <div className={styles.senderInfo}>
                                            <p>Transaction Type</p>
                                            <p>{type}</p>
                                        </div>
                                        <hr />
                                    </>
                                )}

                                {sender === null ? null : (
                                    <>
                                        <div className={styles.senderInfo}>
                                            <p>Sender Name</p>
                                            <p>{sender}</p>
                                        </div>
                                        <hr />
                                    </>
                                )}

                                {destinationBank === null ? null : (
                                    <>
                                        <div className={styles.senderInfo}>
                                            <p>Destination Bank</p>
                                            <p>{destinationBank}</p>
                                        </div>
                                        <hr />
                                    </>
                                )}
                                {narration === null ? null : (
                                    <>
                                        <div className={styles.senderInfo}>
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
