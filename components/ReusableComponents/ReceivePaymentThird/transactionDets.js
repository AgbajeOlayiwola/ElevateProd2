import React, { useState, useRef } from 'react';
import styles from './styles.module.css';
import EditSvg from '../editSvg';
import { MdCancel } from 'react-icons/md';
import exportAsImage from '../../../utils/exportAsImage';
const TransactionDets = ({
    paymentDirection,
    transactionAmmount,
    transactionStatus,
    transactionTitle,
    type,
    sender,
    destinationBank,
    narration
}) => {
    const [dispute, setDispute] = useState(false);
    const [showReciept, setShowReciept] = useState(false);
    const [showDispute, setShowDispute] = useState(false);
    const [reciept, setReciept] = useState(false);
    const exportRef = useRef();
    return (
        <div>
            <div className={styles.deadlines}>
                <div className={styles.nameDate}>
                    <p>{transactionTitle}</p>
                    <p>₦{transactionAmmount}</p>
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
                                    onClick={() =>
                                        setShowDispute((prev) => !prev)
                                    }
                                >
                                    dispute
                                </div>
                                <hr />
                                <div
                                    className={styles.reciept}
                                    onClick={() => setReciept((prev) => !prev)}
                                >
                                    Get Reciept
                                </div>
                            </div>
                        ) : null}
                        {showDispute ? (
                            <div className={styles.showDispute}>
                                <div className={styles.cancel}>
                                    <MdCancel
                                        onClick={() => setShowDispute(false)}
                                    />
                                </div>
                                <div className={styles.maindispute}>
                                    <label>Disput type</label>
                                    <select>
                                        <option>Select Dispute Type</option>
                                    </select>
                                </div>
                                <div className={styles.maindispute}>
                                    <label>Dispute category</label>
                                    <select>
                                        <option>Select Dispute Category</option>
                                    </select>
                                </div>
                                <div className={styles.maindispute}>
                                    <label>Dispute Sub-Category</label>
                                    <select>
                                        <option>Select Dispute Category</option>
                                    </select>
                                </div>
                                <button>Submit</button>
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

            {/* </div> */}
        </div>
    );
};
export default TransactionDets;
