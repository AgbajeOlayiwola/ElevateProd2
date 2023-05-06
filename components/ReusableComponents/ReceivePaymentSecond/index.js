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
        copyTextToClipboard(link)
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
                    {title === 'Ecobank QR Code' ? (
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
                    ) : title === 'Payment Link Generated' ? (
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
                    ) : (
                        <div className={styles.secondCopyII}>
                            <LinkSvg />
                            <p>{link}</p>
                            <button className={styles.copyBtn} onClick={copy}>
                                {isCopied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
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
                                    ? 'jhfdjs'
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
                                ? 'jhfdjs'
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
