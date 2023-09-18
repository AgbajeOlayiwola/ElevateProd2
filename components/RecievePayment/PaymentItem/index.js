import React, { useState } from 'react';
import ButtonComp from '../../ReusableComponents/Button';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import styles from './styles.module.css';

const PaymentItem = ({ action }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <div className={styles.recievePaymentBox}>
            <div className={styles.logoLeft}>
                <div className={styles.logoDiv}>
                    <HiOutlineArrowNarrowLeft style={{ cursor: 'pointer' }} />
                </div>
                <img
                    src="/Assets/Images/eraImage.png"
                    width={104}
                    height={34}
                />
            </div>
            <div className={styles.itemDets}>
                <p>Gucci Bag available on delivery </p>
                <p>Payment for Gucci bag available on delivery</p>
            </div>
            <div className={styles.inputs}>
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
            </div>
            <div className={styles.buttonTop} onClick={action}>
                <ButtonComp
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    text="Pay N54,000.00"
                    type="submit"
                />
            </div>
        </div>
    );
};

export default PaymentItem;
