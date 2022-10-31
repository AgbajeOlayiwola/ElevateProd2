import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import {
    BodyWrapper,
    RegistrationStatus,
    SuccessMainHeading
} from './styles.module';
import Link from 'next/link';
import ButtonComp from '../Button';
import Overlay from '../Overlay';
import ErrorSvg from '../ReusableSvgComponents/ErrorSvg';
import SuccessCheckSvg from '../ReusableSvgComponents/SuccessCheckSvg';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { FaDownload, FaShareAlt, FaUser } from 'react-icons/fa';

const PaymentSuccess = ({
    action,
    country,
    title,
    overlay,
    type,
    heading,
    body,
    paymentType,
    amount,
    number,
    beneName,
    isLoading,
    statusbar,
    error,
    successfulTrans,
    failedTrans,
    repeatAction
}) => {
    const myref = useRef();
    const printRef = useRef();
    useEffect(() => {
        myref.current.scrollTo(0, 0);
        window.scrollTo(0, 0);
    }, []);
    const [activeBtn, setActiveBtn] = useState(true);
    const current = Date().toLocaleString();
    return (
        <Overlay overlay={overlay}>
            <div ref={myref} className={styles.successcont}>
                {statusbar === 'success' ? (
                    <div>
                        {type === 'profile' ? (
                            <BodyWrapper>
                                <div className={styles.successCheck}>
                                    <div>
                                        <SuccessCheckSvg />
                                    </div>
                                </div>

                                <RegistrationStatus>
                                    <SuccessMainHeading>
                                        {heading}
                                    </SuccessMainHeading>

                                    <h6 className={styles.elevateSuccess}>
                                        {body}
                                    </h6>

                                    <ButtonComp
                                        disabled={activeBtn}
                                        active={
                                            activeBtn ? 'active' : 'inactive'
                                        }
                                        text="Close"
                                        type="button"
                                        onClick={action}
                                    />
                                </RegistrationStatus>
                            </BodyWrapper>
                        ) : (
                            <BodyWrapper>
                                <div>
                                    <div className={styles.successCheck}>
                                        <div>
                                            <SuccessCheckSvg />
                                        </div>
                                    </div>
                                    <RegistrationStatus>
                                        <SuccessMainHeading>
                                            Transfer Successful
                                        </SuccessMainHeading>
                                        {title === 'Bill payment' ? (
                                            <h6
                                                className={
                                                    styles.elevateSuccess
                                                }
                                            >
                                                Your recharge of
                                                <span>{amount} </span> for
                                                Airtime on {current}
                                            </h6>
                                        ) : title ===
                                          'Foreign Transfer Payments' ? (
                                            <h6
                                                className={
                                                    styles.elevateSuccess
                                                }
                                            >
                                                <span>{amount} </span> has been
                                                successfully transferred to
                                                <span>{beneName}</span> on{' '}
                                                {current}
                                            </h6>
                                        ) : title === 'Bulk Payment' ? (
                                            <>
                                                {successfulTrans.map(
                                                    (tran, index) => {
                                                        return (
                                                            <div
                                                                className={
                                                                    styles.bulkTransfer
                                                                }
                                                                key={index}
                                                            >
                                                                <p
                                                                    className={
                                                                        styles.name
                                                                    }
                                                                >
                                                                    {
                                                                        tran.receiversName
                                                                    }
                                                                </p>
                                                                <p
                                                                    className={
                                                                        styles.amount
                                                                    }
                                                                >
                                                                    {
                                                                        tran.transactionAmount
                                                                    }
                                                                </p>
                                                                <p
                                                                    className={
                                                                        styles.status
                                                                    }
                                                                >
                                                                    {
                                                                        tran.transactionStatus
                                                                    }
                                                                </p>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                                {failedTrans.map(
                                                    (tran, index) => {
                                                        return (
                                                            <div
                                                                className={
                                                                    styles.bulkTransfer
                                                                }
                                                                key={index}
                                                            >
                                                                <p
                                                                    className={
                                                                        styles.name
                                                                    }
                                                                >
                                                                    {
                                                                        tran.receiversName
                                                                    }
                                                                </p>
                                                                <p
                                                                    className={
                                                                        styles.amount
                                                                    }
                                                                >
                                                                    {
                                                                        tran.transactionAmount
                                                                    }
                                                                </p>
                                                                <p
                                                                    className={
                                                                        styles.status
                                                                    }
                                                                >
                                                                    {
                                                                        tran.transactionStatus
                                                                    }
                                                                </p>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </>
                                        ) : title ===
                                          'Single Transfer Payment' ? (
                                            <h6
                                                className={
                                                    styles.elevateSuccess
                                                }
                                            >
                                                <span>₦{amount}</span> has been
                                                successfully transferred to
                                                <span> {beneName}</span> on{' '}
                                                {current}
                                            </h6>
                                        ) : null}

                                        {title ===
                                        'Foreign Transfer Payments' ? (
                                            <h6
                                                className={
                                                    styles.elevateSuccess
                                                }
                                            >
                                                <span>Country: </span> {country}
                                            </h6>
                                        ) : title === 'Bill Payment' ? (
                                            <p>
                                                Recharge details have been
                                                shared to your email and your
                                                provided phone number.
                                            </p>
                                        ) : null}
                                        {/* <p className={styles.repeat}>
                                        Set this transaction as{' '}
                                        <span onClick={repeatAction}>
                                            Repeat
                                        </span>
                                    </p> */}
                                    </RegistrationStatus>
                                </div>
                                {/* <div ref={printRef}>
                                    <div className={styles.receiptHead}>
                                        <h2>Successful</h2>
                                        <p>NGN {amount}</p>
                                    </div>
                                    <div className={styles.receiptBody}>
                                        <p className={styles.name}>
                                            {beneName}
                                        </p>
                                        <p className={styles.date}>{current}</p>
                                        <div className={styles.receiptSingle}>
                                            <div className={styles.receiptIcon}>
                                                <FaUser />
                                            </div>
                                            <div className={styles.receiptText}>
                                                <p
                                                    className={
                                                        styles.receiptTitle
                                                    }
                                                >
                                                    Beneficiary Account
                                                </p>
                                                <p
                                                    className={
                                                        styles.receiptValue
                                                    }
                                                >
                                                    Beneficiary Account
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.receiptSingle}>
                                            <div className={styles.receiptText}>
                                                <p
                                                    className={
                                                        styles.receiptTitle
                                                    }
                                                >
                                                    Beneficiary Account
                                                </p>
                                                <p
                                                    className={
                                                        styles.receiptValue
                                                    }
                                                >
                                                    Beneficiary Account
                                                </p>
                                            </div>
                                        </div>{' '}
                                        <div className={styles.receiptText}>
                                            <p className={styles.receiptTitle}>
                                                Beneficiary Account
                                            </p>
                                            <p className={styles.receiptValue}>
                                                Beneficiary Account
                                            </p>
                                        </div>
                                        <div className={styles.receiptText}>
                                            <p className={styles.receiptTitle}>
                                                Beneficiary Account
                                            </p>
                                            <p className={styles.receiptValue}>
                                                Beneficiary Account
                                            </p>
                                        </div>
                                    </div>
                                </div> */}
                                <div className={styles.icons}>
                                    <FaDownload
                                        color="#005b82"
                                        fontSize="25px"
                                        cursor="pointer"
                                        onClick={async () => {
                                            const element = printRef.current;
                                            const canvas = await html2canvas(
                                                element
                                            );
                                            const data =
                                                canvas.toDataURL('image/png');

                                            const pdf = new jsPDF();
                                            const imgProperties =
                                                pdf.getImageProperties(data);
                                            const pdfWidth =
                                                pdf.internal.pageSize.getWidth();
                                            const pdfHeight =
                                                (imgProperties.height *
                                                    pdfWidth) /
                                                imgProperties.width;

                                            pdf.addImage(
                                                data,
                                                'PNG',
                                                0,
                                                0,
                                                pdfWidth,
                                                pdfHeight
                                            );
                                            pdf.save('Receipt.pdf');
                                        }}
                                    />
                                </div>
                                <button onClick={action}>Close</button>
                            </BodyWrapper>
                        )}
                    </div>
                ) : statusbar === 'error' ? (
                    <div className={styles.errorCont}>
                        <div>
                            <ErrorSvg />
                        </div>
                        <h2>Oops.</h2>
                        {title === 'Bulk Payment' ? (
                            <>
                                {successfulTrans.map((tran, index) => {
                                    return (
                                        <div
                                            className={styles.bulkTransfer}
                                            key={index}
                                        >
                                            <p className={styles.name}>
                                                {tran.receiversName}
                                            </p>
                                            <p className={styles.amount}>
                                                {tran.transactionAmount}
                                            </p>
                                            <p className={styles.status}>
                                                {tran.transactionStatus}
                                            </p>
                                        </div>
                                    );
                                })}
                                {failedTrans.map((tran, index) => {
                                    return (
                                        <div
                                            className={styles.bulkTransfer}
                                            key={index}
                                        >
                                            <p className={styles.name}>
                                                {tran.receiversName}
                                            </p>
                                            <p className={styles.amount}>
                                                {tran.transactionAmount}
                                            </p>
                                            <p className={styles.status}>
                                                {tran.transactionStatus}
                                            </p>
                                        </div>
                                    );
                                })}
                            </>
                        ) : (
                            <p>{error}</p>
                        )}

                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            text="Try again"
                            type="button"
                            onClick={action}
                        />
                    </div>
                ) : null}
            </div>
        </Overlay>
    );
};

export default PaymentSuccess;
