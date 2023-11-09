import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import LoanLayout from '../../../../components/ReusableComponents/LoanLayout';
import { formatter } from '../../../../utils/formatter/formatter';
import CardsSvg from '../../../../components/ReusableComponents/ReusableSvgComponents/CardsSvg';
import Send from '../../../../components/ReusableComponents/SendSvg';
import Person from '../../../../components/ReusableComponents/PersonSvg';
import { bank } from '../../../../components/ReusableComponents/Data';
import StorePopup from '../../../../components/ReusableComponents/StorePopup';
import Success from '../../../../components/ReusableComponents/Success';
import { useRouter } from 'next/router';

const Liquidation = () => {
    const [alert, setAlert] = useState(false);
    const [type, setType] = useState('Partial Liquidation');
    const [method, setMethod] = useState('');
    const [currentPrice, setCurrentPrice] = useState(0);
    const thumbRef = useRef();
    const sliderRef = useRef();
    const router = useRouter();
    useEffect(() => {
        thumbRef.current.onmousedown = (event) => {
            event.preventDefault(); // prevent selection start (browser action)

            let shiftX =
                event.clientX - thumbRef.current.getBoundingClientRect().left;
            // shiftY not needed, the thumbRef.current moves only horizontally

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            function onMouseMove(event) {
                let newLeft =
                    event.clientX -
                    shiftX -
                    sliderRef.current.getBoundingClientRect().left;

                // the pointer is out of sliderRef.current => lock the thumbRef.current within the bounaries
                if (newLeft < 0) {
                    newLeft = 0;
                }
                let rightEdge =
                    sliderRef.current.offsetWidth -
                    thumbRef.current.offsetWidth;
                if (newLeft > rightEdge) {
                    newLeft = rightEdge;
                }

                thumbRef.current.style.left = newLeft + 'px';
                setCurrentPrice(Math.round((newLeft / 520) * 5000000));
            }

            function onMouseUp() {
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
            }
        };
    }, []);
    return (
        <LoanLayout title="Loan liquidation">
            <div className={styles.loanLiquidation}>
                <div className={styles.loanLiquidationHeader}>
                    <p>Loan amount</p>
                    <h2>{formatter.format(2300000)}</h2>
                </div>
                <div className={styles.loanLiquidationMiddle}>
                    <p>Select Method</p>
                    <div className={styles.loanLiquidationType}>
                        <h2
                            className={
                                type === 'Partial Liquidation'
                                    ? styles.active
                                    : ''
                            }
                            onClick={() => {
                                setType('Partial Liquidation');
                            }}
                        >
                            Partial Liquidation
                        </h2>
                        <h2
                            className={
                                type === 'Full Liquidation' ? styles.active : ''
                            }
                            onClick={() => {
                                setType('Full Liquidation');
                            }}
                        >
                            Full Liquidation
                        </h2>
                    </div>
                </div>
                <div className={styles.loanLiquidationBottom}>
                    <div className={styles.loanLiquidationAmount}>
                        <div className={styles.loanLiquidationPeer}>
                            <div className={styles.loanLiquidationGroup}>
                                <label>Enter amount </label>
                                <input type="text" value={currentPrice} />
                            </div>
                            <div className={styles.loanDrag}>
                                <div
                                    className={styles.loanAmount}
                                    ref={sliderRef}
                                >
                                    <div
                                        className={styles.thumb}
                                        ref={thumbRef}
                                    ></div>
                                </div>
                                <div className={styles.sliderText}>
                                    <p>{formatter.format(0)}</p>
                                    <p>{formatter.format(5000000)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.loanLiquidateMethod}>
                        <p>Select liquidate method</p>
                        <div className={styles.loanLiquidateMethods}>
                            <div
                                onClick={() => {
                                    setMethod('Debit');
                                }}
                                className={
                                    method === 'Debit' ? styles.active : ''
                                }
                            >
                                <CardsSvg
                                    color={
                                        method === 'Debit' ? '#fff' : '#102572'
                                    }
                                />
                                <p>Debit Card</p>
                            </div>
                            <div
                                onClick={() => {
                                    setMethod('Bank');
                                }}
                                className={
                                    method === 'Bank' ? styles.active : ''
                                }
                            >
                                <Send
                                    color={
                                        method === 'Bank' ? '#fff' : '#102572'
                                    }
                                />
                                <p>Bank Transfer</p>
                            </div>
                            <div
                                onClick={() => {
                                    setMethod('Business');
                                }}
                                className={
                                    method === 'Business' ? styles.active : ''
                                }
                            >
                                <Person
                                    color={
                                        method === 'Business'
                                            ? '#fff'
                                            : '#102572'
                                    }
                                />
                                <p>Business Account</p>
                            </div>
                        </div>
                    </div>
                    {method === 'Debit' ? (
                        <>
                            <div className={styles.loanLiquidationGroup}>
                                <label>Debit’s card number (16-digit)</label>
                                <input
                                    type="text"
                                    placeholder="Enter debit card’s number"
                                />
                            </div>
                            <div className={styles.loanLiquidationGroups}>
                                <div className={styles.loanLiquidationGroup}>
                                    <label>Debit’s card expiry date</label>
                                    <input type="text" placeholder="MM/YYY" />
                                </div>
                                <div className={styles.loanLiquidationGroup}>
                                    <label>Debit card’s CVV</label>
                                    <input
                                        type="text"
                                        placeholder="Enter debit card’s CVV"
                                    />
                                </div>
                            </div>
                        </>
                    ) : method === 'Bank' ? (
                        <div className={styles.loansLiquidateBank}>
                            {bank?.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <p>{item.title}</p>
                                        <h2>
                                            {item.title === 'Amount'
                                                ? formatter.format(item.value)
                                                : item.value}
                                            {item.title === 'Account Number' ? (
                                                <span>COPY</span>
                                            ) : null}
                                        </h2>
                                    </div>
                                );
                            })}
                        </div>
                    ) : method === 'Business' ? (
                        <div className={styles.loanLiquidationGroup}>
                            <label>Select account to debit</label>
                            <select name="" id="">
                                <option value="">Ecobank - 4204118198</option>
                            </select>
                        </div>
                    ) : null}
                </div>
                <div className={styles.loanTerms}>
                    <input type="checkbox" />
                    <p>
                        I agree with the loan liquidation{' '}
                        <span>Terms and Conditions </span>
                    </p>
                </div>
                <div className={styles.loanButtons}>
                    <button
                        onClick={() => {
                            method === 'Business'
                                ? router.push('/Admin/Loans/Confirm')
                                : setAlert(true);
                        }}
                    >
                        Continue
                    </button>
                </div>
            </div>
            {alert ? (
                <StorePopup type={true} overlay={alert}>
                    <div className={styles.successCont}>
                        <div className={styles.successSvg}>
                            <Success />
                        </div>
                        <div className={styles.successText}>
                            <h2>Loan liquidation successful</h2>
                            <div>
                                <p>
                                    Your current loan was liquidated with{' '}
                                    <span>{formatter.format(1300000)}</span>
                                </p>
                                <p>
                                    New Balance:{' '}
                                    <span>{formatter.format(1000000)}</span>{' '}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setAlert(false);
                            }}
                        >
                            Return to loan
                        </button>
                    </div>
                </StorePopup>
            ) : null}
        </LoanLayout>
    );
};

export default Liquidation;
