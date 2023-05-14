import React, { useEffect, useState, useRef } from 'react';
import CloseButton from '../CloseButtonSvg';
import Overlay from '../Overlay';
import LinkSvg from '../ReusableSvgComponents/LinkSvg';
import styles from './styles.module.css';
import { EmailShareButton } from 'react-share';
import exportAsImage from '../../../utils/exportAsImage';
import ElevateLogo from '../Ellevate';

const ReceivePaymentSecond = ({
    title,
    action,
    buttonText,
    type,
    overlay,
    closeAction,
    link,
    track,
    amount,
    allLink,
    data,
    info,
    payLinkData,
    amountPaylink
}) => {
    const [destinationTrue, setDestinationTrue] = useState(true);
    const [addnew, setAddnew] = useState(false);
    const [newAmount, setNewAmount] = useState('');
    const Ref = useRef(null);
    const [timer, setTimer] = useState('00:30:00');

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total,
            hours,
            minutes,
            seconds
        };
    };

    const startTimer = (e) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            // update the timer
            // check if less than 10 then we need to
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : '0' + hours) +
                    ':' +
                    (minutes > 9 ? minutes : '0' + minutes) +
                    ':' +
                    (seconds > 9 ? seconds : '0' + seconds)
            );
        }
    };

    const clearTimer = (e) => {
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next
        setTimer('00:30:00');

        // If you try to remove this line the
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };

    const getDeadTime = () => {
        let deadline = new Date();

        // This is where you need to adjust if
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 1800);
        return deadline;
    };

    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible

    // We put empty array to act as componentDid
    // mount only
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    useEffect(() => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
            currencyDisplay: 'narrowSymbol'
        });
        const formattedAmount = formatter.format(amount);
        setNewAmount(formattedAmount);
    }, []);
    useEffect(() => {
        console.log(payLinkData);
        window.scrollTo(0, 0);
    }, []);
    const exportRef = useRef();

    const [isCopied, setIsCopied] = useState(false);
    const [payLink, setPayLink] = useState(
        'ellevate.com/qyweywbdbsdfsds/ei...'
    );

    const [
        ussData,
        setUssdData
    ] = useState(`https://recievepayment.netlify.app/Payments/ussd?data=
    ${link}`);
    // This is the function we wrote earlier

    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }
    // onClick handler function for the copy button
    const copy = () => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(ussData)
            .then(() => {
                // If successful, update the isCopied state value
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }
    // onClick handler function for the copy button
    const copyPaylink = () => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(payLinkData.paymentLink)
            .then(() => {
                // If successful, update the isCopied state value
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const [qrUrlData, setQrUrlData] = useState(
        `https://recievepayment.netlify.app/Payments/qr?data=${encodeURIComponent(
            data?.data.data.dynamicQRBase64
        )}?ref=${data?.data.data.ref}`
    );

    const copyQr = () => {
        copyTextToClipboard(qrUrlData)
            .then(() => {
                // If successful, update the isCopied state value
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    };
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
                    {/* <p className={styles.intro}>
                        Payment for Eraclitus purchase on Instagram
                    </p> */}
                    {title === 'Ecobank QR Code' ? (
                        <>
                            <div ref={exportRef}>
                                <ElevateLogo />
                                <div className={styles.secondCopyCode}>
                                    <div>
                                        <img
                                            src={`data:image/png;base64,${data.data.data.dynamicQRBase64}`}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <p
                                    className={styles.download}
                                    onClick={() =>
                                        exportAsImage(exportRef.current, 'test')
                                    }
                                >
                                    Download
                                </p>
                            </div>
                            <div className={styles.validTill}>
                                <p>Valid Till</p>
                                <p>{timer}</p>
                            </div>
                            <div className={styles.qrData}>
                                <div onClick={copyQr}>
                                    <p> {isCopied ? 'Copied!' : 'Copy'}</p>
                                </div>
                                <div className={styles.createdQr}>
                                    <input type="text" value={qrUrlData} />
                                </div>
                            </div>
                        </>
                    ) : title === 'Payment Link Generated' ? (
                        <>
                            <div className={styles.secondCopy}>
                                <LinkSvg />
                                <input
                                    className={styles.inputBordr}
                                    type="text"
                                    value={payLinkData.paymentLink}
                                />
                                <button
                                    className={styles.copyBtn}
                                    onClick={copyPaylink}
                                >
                                    {isCopied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                            <div className={styles.paylinkvalidTill}>
                                <p>Valid Till</p>
                                <p>{timer}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.secondCopyII}>
                                <LinkSvg />
                                <input
                                    className={styles.inputBordr}
                                    type="text"
                                    value={ussData}
                                />
                                <button
                                    className={styles.copyBtn}
                                    onClick={copy}
                                >
                                    {isCopied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        </>
                    )}
                    <EmailShareButton />

                    {/* <div className={styles.deadlines}>
                        <p>Valid Till</p>
                        <div className={styles.deadlineValues}>
                            <p>Saturday 22 June, 2022 . 12:53 PM</p>
                        </div>
                    </div> */}
                    {/* <div className={styles.deadlines}>
                        <p>Valid Till</p>
                        <div className={styles.deadlineValues}>
                            <p>Saturday 22 June, 2022 . 12:53 PM</p>
                        </div>
                    </div> */}
                    <div className={styles.deadlines}>
                        <p>Amount</p>
                        <div className={styles.deadlineValues}>
                            <p>
                                {title === 'USSD'
                                    ? amount
                                    : title === 'Payment Link Generated'
                                    ? amountPaylink
                                    : data.data.data.transactionAmount}
                            </p>
                        </div>
                    </div>
                    <div className={styles.deadline}>
                        <p>Add. Info</p>
                        <div className={styles.deadlineValues}>
                            <p>
                                {title === 'USSD'
                                    ? type
                                    : title === 'Payment Link Generated'
                                    ? payLinkData?.status
                                    : data.data.data.transactionDescription}
                            </p>
                        </div>
                    </div>
                    <div className={styles.deadline}>
                        <p>Ref ID</p>

                        <p>
                            {title === 'USSD'
                                ? track
                                : title === 'Payment Link Generated'
                                ? null
                                : data.data.data.ref}
                        </p>
                        <p className={styles.copy}>
                            <span>
                                <img
                                    src={
                                        title === 'USSD'
                                            ? track
                                            : title === 'Payment Link Generated'
                                            ? 'jhfdjs'
                                            : data.data.data.dynamicQRBase64
                                    }
                                    alt=""
                                />
                            </span>
                            <div onClick={copy}>
                                {isCopied ? 'Copied!' : 'Copy'}
                            </div>
                        </p>
                    </div>
                    {title === 'Confirm mPOS Payment Details' ? (
                        <p className={styles.NFC}>
                            Turn on NFC now to activate your phone as mPOS
                            device and scan payment cards
                        </p>
                    ) : // <>
                    //     <div className={styles.destination}>
                    //         <h2>Destination e-Mail/Phone number</h2>
                    //         <div className={styles.destinationDetails}>
                    //             {destinationTrue ? (
                    //                 <div className={styles.destinationType}>
                    //                     <div
                    //                         onClick={() => {
                    //                             setDestinationTrue(
                    //                                 !destinationTrue
                    //                             );
                    //                         }}
                    //                         className={
                    //                             styles.destinationTypeTitle
                    //                         }
                    //                     >
                    //                         <p>email</p>
                    //                         <img
                    //                             src="../../Assets/Svgs/arrow-down.svg"
                    //                             alt=""
                    //                         />
                    //                     </div>
                    //                     <div
                    //                         className={
                    //                             styles.destinationTypeValue
                    //                         }
                    //                     >
                    //                         <p>
                    //                             babatundeade@belindaco.com
                    //                         </p>
                    //                     </div>
                    //                 </div>
                    //             ) : (
                    //                 <div className={styles.destinationType}>
                    //                     <div
                    //                         onClick={() => {
                    //                             setDestinationTrue(
                    //                                 !destinationTrue
                    //                             );
                    //                         }}
                    //                         className={
                    //                             styles.destinationTypeTitle
                    //                         }
                    //                     >
                    //                         <img
                    //                             src="../../Assets/Svgs/arrow-up.svg"
                    //                             alt=""
                    //                         />
                    //                         <p>Phone No</p>
                    //                     </div>
                    //                     <div
                    //                         className={
                    //                             styles.destinationTypeValue
                    //                         }
                    //                     >
                    //                         <p>+234 812 345 6789</p>
                    //                     </div>
                    //                 </div>
                    //             )}
                    //         </div>
                    //         {addnew ? (
                    //             <div className={styles.destinationDetails}>
                    //                 {destinationTrue ? (
                    //                     <div
                    //                         className={
                    //                             styles.destinationType
                    //                         }
                    //                     >
                    //                         <div
                    //                             onClick={() => {
                    //                                 setDestinationTrue(
                    //                                     !destinationTrue
                    //                                 );
                    //                             }}
                    //                             className={
                    //                                 styles.destinationTypeTitle
                    //                             }
                    //                         >
                    //                             <p>email</p>
                    //                             <img
                    //                                 src="../../Assets/Svgs/arrow-down.svg"
                    //                                 alt=""
                    //                             />
                    //                         </div>
                    //                         <div
                    //                             className={
                    //                                 styles.destinationTypeValue
                    //                             }
                    //                         >
                    //                             <p>
                    //                                 babatundeade@belindaco.com
                    //                             </p>
                    //                         </div>
                    //                     </div>
                    //                 ) : (
                    //                     <div
                    //                         className={
                    //                             styles.destinationType
                    //                         }
                    //                     >
                    //                         <div
                    //                             onClick={() => {
                    //                                 setDestinationTrue(
                    //                                     !destinationTrue
                    //                                 );
                    //                             }}
                    //                             className={
                    //                                 styles.destinationTypeTitle
                    //                             }
                    //                         >
                    //                             <img
                    //                                 src="../../Assets/Svgs/arrow-up.svg"
                    //                                 alt=""
                    //                             />
                    //                             <p>Phone No</p>
                    //                         </div>
                    //                         <div
                    //                             className={
                    //                                 styles.destinationTypeValue
                    //                             }
                    //                         >
                    //                             <p>+234 812 345 6789</p>
                    //                         </div>
                    //                     </div>
                    //                 )}
                    //             </div>
                    //         ) : null}
                    //     </div>{' '}
                    //     <p
                    //         onClick={() => {
                    //             setAddnew(!addnew);
                    //         }}
                    //         className={styles.addnew}
                    //     >
                    //         + Add New
                    //     </p>
                    // </>
                    null}

                    <button onClick={action}>{buttonText}</button>
                    {title === 'Confirm mPOS Payment Details' ? null : (
                        <p className={styles.allLinks}>
                            Tap to view all your{' '}
                            <span onClick={allLink}>{type}</span>
                        </p>
                    )}
                </div>
            </div>
        </Overlay>
    );
};

export default ReceivePaymentSecond;
