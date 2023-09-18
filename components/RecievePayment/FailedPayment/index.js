import React, { useState } from 'react';
import Success from '../../ReusableComponents/Success';
import { TbCreditCard } from 'react-icons/tb';
import ButtonComp from '../../ReusableComponents/Button';
import ErrorSvg from '../../ReusableComponents/ErrorSvg';
import styles from './styles.module.css';

const FailedPayment = ({ action }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <div className={styles.cardDtsInputs}>
            <div className={styles.allCardDets}>
                <ErrorSvg />
                <div className={styles.payMent}>
                    <h1>Your Transaction Was Not Completed</h1>
                    <p className={styles.payMentP}>
                        There was an error in completing your transaction
                    </p>
                    <p>Retry with same Card</p>
                </div>
                <div onClick={action} className={styles.button}>
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        text="Try Another Card"
                        type="submit"
                    />
                </div>
            </div>
        </div>
    );
};

export default FailedPayment;
