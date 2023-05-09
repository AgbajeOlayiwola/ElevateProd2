import React, { useState } from 'react';
import styles from './styles.module.css';
import { TbCreditCard } from 'react-icons/tb';
import ButtonComp from '../../ReusableComponents/Button';
import PaylinkSuccess from '../Sucess';
import SuccessCallBack from '../SuccessCallBack';
import FailedPayment from '../FailedPayment';
import ElipseSvg from '../../ReusableComponents/ElipseSvg';
import { AiFillCheckCircle } from 'react-icons/ai';

const BillingAddress = ({ action, newPage }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <div className={styles.cardDtsInputs}>
            <div>
                <div className={styles.logos}>
                    <img
                        src="/Assets/Images/eraImage.png"
                        width={104}
                        height={34}
                    />
                    <div>
                        <p>Marvelous Solutions</p>

                        <p>marvelousc</p>
                    </div>
                </div>
            </div>
            <div className={styles.takeDiv}>
                <p className={styles.takeP}>
                    Its taking longer than expected to confirm your transfer.
                    You dont have to wait here till you confirm it
                </p>
            </div>
            <div className={styles.loadFlex}>
                <div>
                    <AiFillCheckCircle />
                    <p className={styles.recSent}>Sent</p>
                </div>
                <div className={styles.load}></div>
                <div>
                    <ElipseSvg />
                    <p className={styles.recSent}>Recieved</p>
                </div>
            </div>
            <div className={styles.pls}>
                <div className={styles.please}>
                    <p>Please wait for 8:39 Minutes</p>
                </div>
                <p className={styles.showP}>Show Your Account Number</p>
            </div>
            <div className={styles.allCardDets}>
                <div onClick={action} className={styles.button}>
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        text="Change Payment Method"
                        type="submit"
                    />
                    <div className={styles.cancelBtn}>
                        <p>Cancel Payment</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillingAddress;
