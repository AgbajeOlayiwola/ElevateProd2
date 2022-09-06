import React, { useState, useEffect } from 'react';
import ButtonComp from '../Button';
import styles from './styles.module.css';
import OtpInput from '../Otpinput';
import Overlay from '../Overlay';
import Loader from '../Loader';
import ConfirmLockSvg from '../ReusableSvgComponents/ConfirmLockSvg';
import CloseButton from '../CloseButtonSvg';
const numOfFields = 6;

const useSSNFields = () => {
    const [ssnValues, setValue] = useState({
        ssn1: '',
        ssn2: '',
        ssn3: '',
        ssn4: '',
        ssn5: '',
        ssn6: ''
    });

    return {
        handleChange: (e) => {
            const { maxLength, value, name } = e.target;
            const [fieldName, fieldIndex] = name.split('-');

            // Check if they hit the max character length
            if (value.length >= maxLength) {
                // Check if it's not the last input field
                if (parseInt(fieldIndex, 10) < 6) {
                    // Get the next input field
                    const nextSibling = document.querySelector(
                        `input[name=ssn-${parseInt(fieldIndex, 10) + 1}]`
                    );
                    // If found, focus the next field
                    if (nextSibling !== null) {
                        nextSibling.focus();
                    }
                }
            }

            setValue({
                ...value,
                [`ssn${fieldIndex}`]: value
            });
        }
    };
};
const MakePaymentSecond = ({
    overlay,
    transferAction,
    amount,
    sender,
    recieverName,
    recieverBank,
    title,
    refNuber,
    number,
    isLoading,
    closeAction
}) => {
    const [activeBtn, setActiveBtn] = useState(true);
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
    const { handleChange } = useSSNFields();
    return (
        <Overlay overlay={overlay}>
            {title === 'Bills Payment' ? (
                // <div className={styles.PaymentSecond}>
                //     <div className={styles.PaymentSecondCont}>
                //         <h2>Confirm Transaction</h2>
                //         <p>Enter your transaction pin to continue.</p>
                //         <div className={styles.transactionamount}>
                //             <p>Amount</p>
                //             <h3>N{amount}</h3>
                //         </div>
                //         <div className={styles.transactiondetails}>
                //             <div className={styles.transactionsingles}>
                //                 <p className={styles.transactionTitle}>
                //                     Category
                //                 </p>
                //                 <h3>{recieverName}</h3>
                //             </div>
                //             <div className={styles.transactionsingle}>
                //                 <p className={styles.transactionTitle}>
                //                     Platform
                //                 </p>
                //                 <h3>
                //                     <span></span> {recieverBank}
                //                 </h3>
                //             </div>
                //             {recieverName === 'Utilities' ? (
                //                 <>
                //                     <div className={styles.transactionsingle}>
                //                         <p className={styles.transactionTitle}>
                //                             Meter Type
                //                         </p>
                //                         <h3>{sender}</h3>
                //                     </div>
                //                     <div className={styles.transactionsingle}>
                //                         <p className={styles.transactionTitle}>
                //                             Reference Number
                //                         </p>
                //                         <h3>{refNuber}</h3>
                //                     </div>
                //                 </>
                //             ) : null}

                //             <div className={styles.transactionsingle}>
                //                 <p className={styles.transactionTitle}>
                //                     Charges
                //                 </p>
                //                 <h3>N50.50</h3>
                //             </div>
                //             <div className={styles.transactionsingle}>
                //                 <p className={styles.transactionTitle}>
                //                     Number
                //                 </p>
                //                 <h3>{number}</h3>
                //             </div>
                //         </div>
                //         <h4>Enter Transaction Pin</h4>
                //         <OtpInput />
                //         <div className={styles.resendFlex}>
                //             <p
                //                 style={{
                //                     color: '#005B82',
                //                     cursor: 'pointer'
                //                 }}
                //             >
                //                 Resend OTP
                //             </p>
                //             <button
                //                 style={{ cursor: 'pointer' }}
                //                 className={styles.clr}
                //                 type="reset"
                //             >
                //                 Clear
                //             </button>
                //         </div>
                //         {isLoading ? (
                //             <Loader />
                //         ) : (
                //             <ButtonComp
                //                 disabled={activeBtn}
                //                 active={activeBtn ? 'active' : 'inactive'}
                //                 text="Make Transfer"
                //                 type="submit"
                //                 onClick={transferAction}
                //             />
                //         )}
                //     </div>
                // </div>
                <div>
                    <div className={styles.PaymentSecond}>
                        <div className={styles.closeCont}>
                            <CloseButton
                                color="#A5A5A5"
                                classes={styles.closeBtn}
                                action={closeAction}
                            />
                        </div>
                        <div className={styles.PaymentSecondCont}>
                            <div className={styles.svgLock}>
                                <div>
                                    <ConfirmLockSvg />
                                </div>
                            </div>
                            <h2>Confirm Transaction</h2>
                            <div className={styles.transactionamount}>
                                <p>Amount</p>
                                <h3>{newAmount}</h3>
                            </div>
                            <div className={styles.transactiondetails}>
                                <div className={styles.transactionsingles}>
                                    <p className={styles.transactionTitle}>
                                        To
                                    </p>
                                    <h3>{recieverName}</h3>
                                </div>
                                <div className={styles.transactionsingle}>
                                    <p className={styles.transactionTitle}>
                                        Beneficiary Bank
                                    </p>
                                    <h3>
                                        <span></span> {recieverBank}
                                    </h3>
                                </div>
                                <div className={styles.transactionsingle}>
                                    <p className={styles.transactionTitle}>
                                        Charges
                                    </p>
                                    <h3>N50.50</h3>
                                </div>
                                <div className={styles.transactionsingle}>
                                    <p className={styles.transactionTitle}>
                                        From
                                    </p>
                                    <h3>{sender}</h3>
                                </div>
                            </div>
                            <h4>Enter Transaction Pin</h4>
                            <div className={styles.otpInps}>
                                <input
                                    type="password"
                                    name="ssn-1"
                                    maxLength={1}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="ssn-2"
                                    maxLength={1}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="ssn-3"
                                    maxLength={1}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="ssn-4"
                                    maxLength={1}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="ssn-5"
                                    maxLength={1}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="ssn-6"
                                    maxLength={1}
                                    onChange={handleChange}
                                />
                            </div>
                            {isLoading ? (
                                <Loader />
                            ) : (
                                <ButtonComp
                                    disabled={activeBtn}
                                    active={activeBtn ? 'active' : 'inactive'}
                                    text="Make Transfer"
                                    type="submit"
                                    onClick={transferAction}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className={styles.PaymentSecond}>
                        <div className={styles.closeCont}>
                            <CloseButton
                                color="#A5A5A5"
                                classes={styles.closeBtn}
                                action={closeAction}
                            />
                        </div>
                        <div className={styles.PaymentSecondCont}>
                            <div className={styles.svgLock}>
                                <div>
                                    <ConfirmLockSvg />
                                </div>
                            </div>
                            <h2>Confirm Transaction</h2>
                            <div className={styles.transactionamount}>
                                <p>Amount</p>
                                <h3>{newAmount}</h3>
                            </div>
                            <div className={styles.transactiondetails}>
                                <div className={styles.transactionsingles}>
                                    <p className={styles.transactionTitle}>
                                        To
                                    </p>
                                    <h3>{recieverName}</h3>
                                </div>
                                <div className={styles.transactionsingle}>
                                    <p className={styles.transactionTitle}>
                                        Beneficiary Bank
                                    </p>
                                    <h3>
                                        <span></span> {recieverBank}
                                    </h3>
                                </div>
                                <div className={styles.transactionsingle}>
                                    <p className={styles.transactionTitle}>
                                        Charges
                                    </p>
                                    <h3>N50.50</h3>
                                </div>
                                <div className={styles.transactionsingle}>
                                    <p className={styles.transactionTitle}>
                                        From
                                    </p>
                                    <h3>{sender}</h3>
                                </div>
                            </div>
                            <h4>Enter Transaction Pin</h4>
                            <div className={styles.otpInps}>
                                <input
                                    type="password"
                                    name="ssn-1"
                                    maxLength={1}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="ssn-2"
                                    maxLength={1}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="ssn-3"
                                    maxLength={1}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="ssn-4"
                                    maxLength={1}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="ssn-5"
                                    maxLength={1}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="ssn-6"
                                    maxLength={1}
                                    onChange={handleChange}
                                />
                            </div>
                            {isLoading ? (
                                <Loader />
                            ) : (
                                <ButtonComp
                                    disabled={activeBtn}
                                    active={activeBtn ? 'active' : 'inactive'}
                                    text="Make Transfer"
                                    type="submit"
                                    onClick={transferAction}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Overlay>
    );
};

export default MakePaymentSecond;
