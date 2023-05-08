import React, { useState } from 'react';
import { TbCreditCard } from 'react-icons/tb';
import ButtonComp from '../../ReusableComponents/Button';
import styles from './styles.module.css';
import Success from '../../ReusableComponents/Success';

const PaylinkSuccess = ({ action }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <div className={styles.allCardDets}>
            <Success />
            <div className={styles.payMent}>
                <h1>Payment Successful</h1>
                <p className={styles.payMentP}>
                    Your payment of N504,000 was sucessfull!
                </p>
                <p>A receipt has been sent to your email.</p>
            </div>
            <div onClick={action} className={styles.button}>
                <ButtonComp
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    text="Close"
                    type="submit"
                />
            </div>
        </div>
    );
};

export default PaylinkSuccess;
