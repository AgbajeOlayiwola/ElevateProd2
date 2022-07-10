import React, { useState } from 'react';
import ButtonComp from '../Button';
import styles from './styles.module.css';

const ReceivePaymentFirst = ({ firstTitle, buttonText }) => {
    const [activeBtn, setActiveBtn] = useState(false);
    return (
        <div className={styles.firstDiv}>
            <div className={styles.firstBody}>
                <div>
                    <h2>{firstTitle}</h2>
                    {firstTitle === 'Create Payment Link' ? (
                        <p>(Accepts Card Payment without POS)</p>
                    ) : null}
                    <form>
                        <div className={styles.formGroup}>
                            <label>Account to Credit</label>
                            <input
                                type="text"
                                required
                                placeholder="Marvelous Solutions "
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Enter Amount</label>
                            <input
                                type="text"
                                required
                                placeholder="# 5,000,000,000.00"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Name of Payment</label>
                            <input
                                type="text"
                                required
                                placeholder="Name of Payment"
                                onClick={(e) => {
                                    setActiveBtn(true);
                                }}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Description</label>
                            <textarea
                                name=""
                                id=""
                                placeholder="Enter note to be displayed to customer."
                            ></textarea>
                        </div>
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            text={buttonText}
                            type="submit"
                        />
                    </form>
                </div>
            </div>
            <div>
                <img src="../../Assets/Images/Group 33664.png" alt="" />
            </div>
        </div>
    );
};

export default ReceivePaymentFirst;
