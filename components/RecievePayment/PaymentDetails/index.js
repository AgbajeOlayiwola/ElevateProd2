import React, { useState } from 'react';
import ButtonComp from '../../ReusableComponents/Button';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import styles from './styles.module.css';
const PaymentDetails = ({ action, back }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <div className={styles.recievePaymentBox}>
            <div className={styles.logoLeft}>
                <div className={styles.logoDiv}>
                    <HiOutlineArrowNarrowLeft
                        style={{ cursor: 'pointer' }}
                        onClick={back}
                    />
                </div>
                <img
                    src="/Assets/Images/eraImage.png"
                    width={104}
                    height={34}
                />
            </div>
            <div className={styles.payDets}>
                <h1>Payment to MarvelousSolutions</h1>
                <p>Payment for Gucci bag available on delivery</p>
            </div>
            <div className={styles.inputs}>
                <p>Please fill in the information below to make payment.</p>
                <div>
                    <label>First Name</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Email Address</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Amount</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" />
                </div>
            </div>
            <div className={styles.buttonTop} onClick={action}>
                <ButtonComp
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    text="Proceed to Payment"
                    type="submit"
                />
            </div>
        </div>
    );
};

export default PaymentDetails;
