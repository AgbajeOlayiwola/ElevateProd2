import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useVerifyTransactionPinMutation } from '../../../../redux/api/authApi';
import { setLoanRequest } from '../../../../redux/slices/loanRequst';
import { formatter } from '../../../../utils/formatter/formatter';
import styles from './styles.module.css';
const RequestCont = ({ type, title, topup, nextPage }) => {
    const { allAccountInfo } = useSelector((store) => store);
    const [sourceAccount, setSourceAccount] = useState();
    const [acctNummber, setAcctNumber] = useState('');
    const router = useRouter();
    const thumbRef = useRef();
    const sliderRef = useRef();
    const [currentPrice, setCurrentPrice] = useState(0);
    const dispatch = useDispatch();
    {
        type
            ? useEffect(() => {
                  thumbRef.current.onmousedown = (event) => {
                      event.preventDefault(); // prevent selection start (browser action)

                      let shiftX =
                          event.clientX -
                          thumbRef.current.getBoundingClientRect().left;
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
                          setCurrentPrice(
                              Math.round((newLeft / 520) * 5000000)
                          );
                      }

                      function onMouseUp() {
                          document.removeEventListener('mouseup', onMouseUp);
                          document.removeEventListener(
                              'mousemove',
                              onMouseMove
                          );
                      }
                  };
              }, [currentPrice])
            : null;
    }

    const continueLoans = () => {
        dispatch(
            setLoanRequest({
                loanAmount: currentPrice,
                loanAccount: acctNummber
            })
        );
        nextPage();
    };
    return (
        <div className={styles.loanRequest}>
            <div className={styles.loanRequestTitle}>
                <h2
                    onClick={() => router.push('/Admin/Loans')}
                    style={{ cursor: 'pointer' }}
                >
                    {title}
                </h2>
                {type ? null : (
                    <p>You can only change the monthly repayment date.</p>
                )}
            </div>
            <div className={styles.loanRequestWrapper}>
                <div className={styles.loanRequestTop}>
                    <div>
                        <h2>LOAN ELIGILIBILITY</h2>
                        <p>
                            You are now eligible for a{' '}
                            <span> {formatter.format(5000000)}</span> loan.
                        </p>
                    </div>
                    <p>1.5% Interest</p>
                </div>
                <div className={styles.narration}>
                    <label>Source Account</label>
                    <select
                        name="ecoSourceAccount"
                        value={acctNummber}
                        onChange={(e) => {
                            const selectedAccount = allAccountInfo.find(
                                (account) =>
                                    account?.accountNo === e.target.value
                            );
                            if (selectedAccount) {
                                setAcctNumber(selectedAccount?.accountNo);
                            }
                        }}
                    >
                        <option value="">Select Account To Use</option>
                        {allAccountInfo
                            .filter((account) => account.accountNo)
                            .map((account) => {
                                return (
                                    <>
                                        <option
                                            className={styles.accntP}
                                            value={account?.accountNo}
                                        >
                                            <p>{account?.accountNo}</p>
                                            {/* <p>
                                                        {account?.availableBal.toLocaleString()}
                                                    </p> */}
                                        </option>
                                    </>
                                );
                            })}
                    </select>
                </div>
                <div className={styles.loanRequestBottom}>
                    <div className={styles.loanRequestAmount}>
                        {topup ? (
                            <div className={styles.loanGroup}>
                                <label>Previous loan amount</label>
                                <input type="text" placeholder="2,300,000" />
                            </div>
                        ) : null}
                        <div className={styles.loanGroup}>
                            <label>Top up loan amount</label>
                            <input
                                type="text"
                                value={currentPrice}
                                onChange={(e) =>
                                    setCurrentPrice(e.target.value)
                                }
                            />
                        </div>
                        {type ? (
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
                        ) : null}
                        {topup ? (
                            <div className={styles.loanGroup}>
                                <label>New loan amount</label>
                                <input type="text" placeholder="2,300,000" />
                            </div>
                        ) : null}
                    </div>
                    {/* {topup ? null : (
                        <>
                            <div className={styles.loanRequestDetails}>
                                <div className={styles.loanRequestGroup}>
                                    <label>Repayment period</label>
                                    <select>
                                        <option value="">Select period</option>
                                    </select>
                                </div>
                                <div className={styles.loanRequestGroup}>
                                    <label>Repayment schedule</label>
                                    <select>
                                        <option value="">Every month</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.loanRequestDetails}>
                                <div className={styles.loanRequestGroup}>
                                    <label>Day of the month</label>
                                    <input type="date" />
                                </div>
                                <div className={styles.loanRequestGroup}>
                                    <label>Amount to pay</label>
                                    <div>
                                        <p>{formatter.format(0)}</p>
                                        <span>monthly</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )} */}
                </div>
                <div className={styles.loanTerms}>
                    <input type="checkbox" />
                    <p>
                        I agree with the loan top-up{' '}
                        <span>Terms and Conditions </span>
                    </p>
                </div>
                <div className={styles.loanRequestButton}>
                    <button onClick={continueLoans}>Continue</button>
                </div>
            </div>
        </div>
    );
};

export default RequestCont;
