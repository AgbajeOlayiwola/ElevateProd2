import React, { useEffect, useState } from 'react';
import CloseButton from '../CloseButtonSvg';
import Overlay from '../Overlay';
import LinkSvg from '../ReusableSvgComponents/LinkSvg';
import styles from './styles.module.css';

const ReceivePaymentSecond = ({
    title,
    action,
    buttonText,
    type,
    overlay,
    closeAction
}) => {
    const [destinationTrue, setDestinationTrue] = useState(true);
    const [addnew, setAddnew] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
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
                        Payment for Eraclitus purchase on Instagram
                    </p>
                    {title === 'Create Ecobank QR Code' ? (
                        <div className={styles.secondCopyCode}>
                            <div>
                                <img
                                    src="../../Assets/Images/qrcode.png"
                                    alt=""
                                />
                            </div>
                            <button>Copy</button>
                        </div>
                    ) : (
                        <div className={styles.secondCopy}>
                            <LinkSvg />
                            <p>ellevate.com/qyweywbdbsdfsds/ei...</p>
                            <button>Copy</button>
                        </div>
                    )}

                    <div className={styles.deadlines}>
                        <p>Valid Till</p>
                        <div className={styles.deadlineValues}>
                            <p>Saturday 22 June, 2022 . 12:53 PM</p>
                        </div>
                    </div>
                    <div className={styles.deadline}>
                        <p>Amount</p>
                        <div className={styles.deadlineValues}>
                            <p>N54,000.00</p>
                        </div>
                    </div>
                    <div className={styles.deadline}>
                        <p>Add. Info</p>
                        <div className={styles.deadlineValues}>
                            <p>Vel faucibus nunc vel neque blandit.....</p>
                        </div>
                    </div>
                    <div className={styles.deadline}>
                        <p>Tracking ID</p>

                        <p>refdbg47t34jn2j35m6777rt</p>
                        <p className={styles.copy}>
                            <span>
                                <img src="../../Assets/Svgs/copy.svg" alt="" />
                            </span>
                            Copy
                        </p>
                    </div>
                    {title === 'Confirm mPOS Payment Details' ? (
                        <p className={styles.NFC}>
                            Turn on NFC now to activate your phone as mPOS
                            device and scan payment cards
                        </p>
                    ) : (
                        <>
                            <div className={styles.destination}>
                                <h2>Destination e-Mail/Phone number</h2>
                                <div className={styles.destinationDetails}>
                                    {destinationTrue ? (
                                        <div className={styles.destinationType}>
                                            <div
                                                onClick={() => {
                                                    setDestinationTrue(
                                                        !destinationTrue
                                                    );
                                                }}
                                                className={
                                                    styles.destinationTypeTitle
                                                }
                                            >
                                                <p>email</p>
                                                <img
                                                    src="../../Assets/Svgs/arrow-down.svg"
                                                    alt=""
                                                />
                                            </div>
                                            <div
                                                className={
                                                    styles.destinationTypeValue
                                                }
                                            >
                                                <p>
                                                    babatundeade@belindaco.com
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={styles.destinationType}>
                                            <div
                                                onClick={() => {
                                                    setDestinationTrue(
                                                        !destinationTrue
                                                    );
                                                }}
                                                className={
                                                    styles.destinationTypeTitle
                                                }
                                            >
                                                <img
                                                    src="../../Assets/Svgs/arrow-up.svg"
                                                    alt=""
                                                />
                                                <p>Phone No</p>
                                            </div>
                                            <div
                                                className={
                                                    styles.destinationTypeValue
                                                }
                                            >
                                                <p>+234 812 345 6789</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {addnew ? (
                                    <div className={styles.destinationDetails}>
                                        {destinationTrue ? (
                                            <div
                                                className={
                                                    styles.destinationType
                                                }
                                            >
                                                <div
                                                    onClick={() => {
                                                        setDestinationTrue(
                                                            !destinationTrue
                                                        );
                                                    }}
                                                    className={
                                                        styles.destinationTypeTitle
                                                    }
                                                >
                                                    <p>email</p>
                                                    <img
                                                        src="../../Assets/Svgs/arrow-down.svg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        styles.destinationTypeValue
                                                    }
                                                >
                                                    <p>
                                                        babatundeade@belindaco.com
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className={
                                                    styles.destinationType
                                                }
                                            >
                                                <div
                                                    onClick={() => {
                                                        setDestinationTrue(
                                                            !destinationTrue
                                                        );
                                                    }}
                                                    className={
                                                        styles.destinationTypeTitle
                                                    }
                                                >
                                                    <img
                                                        src="../../Assets/Svgs/arrow-up.svg"
                                                        alt=""
                                                    />
                                                    <p>Phone No</p>
                                                </div>
                                                <div
                                                    className={
                                                        styles.destinationTypeValue
                                                    }
                                                >
                                                    <p>+234 812 345 6789</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : null}
                            </div>{' '}
                            <p
                                onClick={() => {
                                    setAddnew(!addnew);
                                }}
                                className={styles.addnew}
                            >
                                + Add New
                            </p>
                        </>
                    )}

                    <button onClick={action}>{buttonText}</button>
                    {title === 'Confirm mPOS Payment Details' ? null : (
                        <p className={styles.allLinks}>
                            Tap to view all your <span>{type}</span>
                        </p>
                    )}
                </div>
            </div>
        </Overlay>
    );
};

export default ReceivePaymentSecond;
