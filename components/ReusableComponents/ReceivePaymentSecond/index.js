import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { EmailShareButton } from 'react-share';
import exportAsImage from '../../../utils/exportAsImage';
import CloseButton from '../CloseButtonSvg';
import ElevateLogo from '../Ellevate';
import Overlay from '../Overlay';
import LinkSvg from '../ReusableSvgComponents/LinkSvg';
import styles from './styles.module.css';

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
    amountPaylink,
    share,
    primary,
    merchantCode,
    terminalId,
    ussdStatusClick
}) => {
    const [destinationTrue, setDestinationTrue] = useState(true);
    const [addnew, setAddnew] = useState(false);
    const [newAmount, setNewAmount] = useState('');
    const [code, setCode] = useState();
    const Ref = useRef(null);
    const { dynamicQrData } = useSelector((store) => store);
    const { ussdData } = useSelector((store) => store);
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
        //  //// console.log(payLinkData);
        window.scrollTo(0, 0);
    }, []);
    const exportRef = useRef();

    const [isCopied, setIsCopied] = useState(false);
    const [payLink, setPayLink] = useState(
        'ellevate.com/qyweywbdbsdfsds/ei...'
    );

    const [ussData, setUssdData] = useState(link);
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
        copyTextToClipboard(
            `https://recievepayment.netlify.app/Payments/ussd?&accountId=${primary}&amount=${formatter.format(
                amount
            )}&data=${link}`
        )
            .then(() => {
                // If successful, update the isCopied state value
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                //// console.log(err);
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
        copyTextToClipboard(
            `https://recievepayment.netlify.app/Payments/card?&accountId=${primary}&data=${
                payLinkData.paymentLink
            }&amount=${formatter.format(amountPaylink)}`
        )
            .then(() => {
                // If successful, update the isCopied state value
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                //// console.log(err);
            });
    };
    const [qrUrlData, setQrUrlData] = useState(
        `https://recievepayment.netlify.app/Payments/qr?data=${encodeURIComponent(
            data?.data.data.dynamicQRBase64
        )}&ref=${
            data?.data.data.ref
        }&accountId=${primary}&merchantCode=${merchantCode}&terminalId=${terminalId}&amount=${
            data?.data.data.transactionAmount
        }`
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
                //// console.log(err);
            });
    };
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
        currencyDisplay: 'narrowSymbol'
    });
    const banks = [
        {
            bankName: 'GTBank',
            bankCode: '*737*',
            bankID: '000'
        },
        {
            bankName: 'First Bank',
            bankCode: '*894*',
            bankID: '000'
        },
        {
            bankName: 'Zenith Bank',
            bankCode: '*966*',
            bankID: '000'
        },
        {
            bankName: 'UBA',
            bankCode: '*919*',
            bankID: '000'
        },
        {
            bankName: 'Stanbic Bank',
            bankCode: '*909*',
            bankID: '000'
        },
        {
            bankName: 'Sterling Bank',
            bankCode: '*822*',
            bankID: '000'
        },
        {
            bankName: 'Unity Bank',
            bankCode: '*7799*',
            bankID: '000'
        },
        {
            bankName: 'Keystone Bank',
            bankCode: '*7111*',
            bankID: '000'
        },
        {
            bankName: 'Fidelity Bank',
            bankCode: '*770*',
            bankID: '000'
        },
        {
            bankName: 'Ecobank',
            bankCode: '*326*',
            bankID: '000'
        },
        {
            bankName: 'Wema Bank',
            bankCode: '*945*',
            bankID: '000'
        },
        {
            bankName: 'Access Bank',
            bankCode: '*901*',
            bankID: '000'
        },
        {
            bankName: 'Access (Diamond )',
            bankCode: '*426*',
            bankID: '000'
        },
        {
            bankName: 'FCMB',
            bankCode: '*329*',
            bankID: '000'
        },
        {
            bankName: 'Heritage Bank',
            bankCode: '*745*',
            bankID: '000'
        },
        {
            bankName: 'Union Bank',
            bankCode: '*826*',
            bankID: '000'
        },
        {
            bankName: 'VFD MFB',
            bankCode: '*5037*',
            bankID: '000'
        },
        {
            bankName: 'Rubies (Highstreet) MFB',
            bankCode: '*7797*',
            bankID: '000'
        },
        {
            bankName: 'Globus bank',
            bankCode: '*989*',
            bankID: '000'
        },
        {
            bankName: 'Kuda Bank',
            bankCode: '*5593*',
            bankID: '000'
        }
    ];
    useEffect(() => {
        const gtbankCode = banks
            .filter((bank) => bank.bankName === 'GTBank')
            .map((gtbank) => gtbank.bankCode.replace('PLC', ''))[0];
        setCode(gtbankCode);
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
                                            src={`data:image/png;base64,${dynamicQrData?.data?.dynamicQRBase64}`}
                                            alt="Qr"
                                        />
                                    </div>
                                </div>
                                <p
                                    className={styles.download}
                                    onClick={() =>
                                        exportAsImage(
                                            exportRef.current,
                                            'Dynamic QR'
                                        )
                                    }
                                >
                                    Download
                                </p>
                            </div>
                            {/* <div className={styles.validTill}>
                                <p>Valid Till</p>
                                <p>{timer}</p>
                            </div> */}
                            {/* <div className={styles.qrData}>
                                <div onClick={copyQr}>
                                    <p> {isCopied ? 'Copied!' : 'Copy'}</p>
                                </div>
                                <div className={styles.createdQr}>
                                    <input type="text" value={''} />
                                </div>
                                <div className={styles.share} onClick={share}>
                                    <p>Share</p>
                                </div>
                            </div> */}
                        </>
                    ) : title === 'Payment Link Generated' ? (
                        <>
                            <div className={styles.secondCopy}>
                                <LinkSvg />
                                <input
                                    className={styles.inputBordr}
                                    type="text"
                                    value={`https://recievepayment.netlify.app/Payments/card?&accountId=${primary}&data=${
                                        payLinkData.paymentLink
                                    }&amount=${formatter.format(
                                        amountPaylink
                                    )}`}
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
                                    value={`${ussdData?.code}${ussdData?.ussdData?.reference}#`}
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
                                    ? formatter.format(
                                          ussdData?.ussdData?.amount
                                      )
                                    : title === 'Payment Link Generated'
                                    ? formatter.format(amountPaylink)
                                    : formatter.format(
                                          dynamicQrData?.data?.transactionAmount
                                      )}
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
                                    : dynamicQrData?.data
                                          ?.transactionDescription}
                            </p>
                        </div>
                    </div>
                    {/* <div className={styles.deadline}>
                        <p>Ref ID</p>

                        <p>
                            {title === 'USSD'
                                ? track
                                : title === 'Payment Link Generated'
                                ? null
                                : dynamicQrData?.data?.ref}
                        </p>
                        <p className={styles.copy}>
                            <span>
                                <img
                                    src={
                                        title === 'USSD'
                                            ? track
                                            : title === 'Payment Link Generated'
                                            ? 'jhfdjs'
                                            : null
                                    }
                                    alt=""
                                />
                            </span>
                            <div onClick={copy}>
                                {isCopied ? 'Copied!' : 'Copy'}
                            </div>
                        </p>
                    </div> */}
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
                    {title === 'Ecobank QR Code' ? (
                        <button
                            onClick={() =>
                                exportAsImage(exportRef.current, 'test')
                            }
                        >
                            Download
                        </button>
                    ) : (
                        <button onClick={action}>{buttonText}</button>
                    )}
                    {/* {title === 'USSD' ? (
                        <button onClick={ussdStatusClick}>
                            View USSD Status
                        </button>
                    ) : null} */}
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
