import React, { useState } from 'react';
import styles from './styles.module.css';
import { TbCreditCard } from 'react-icons/tb';
import ButtonComp from '../../ReusableComponents/Button';

const CardDetails = ({ action }) => {
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
            <h1 className={styles.enter}>
                Enter your card details to make payment
            </h1>
            <div className={styles.allCardDets}>
                <div className={styles.cardNum}>
                    <label>Card Number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" />
                </div>
                <div className={styles.moreCardDets}>
                    <div>
                        <label>Card Expiry</label>
                        <input type="text" placeholder="MM/YY" />
                    </div>
                    <div>
                        <label>CVV</label>
                        <input type="text" placeholder="123" />
                    </div>
                </div>
                <div onClick={action} className={styles.buttonTop}>
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        text="Pay N54,000"
                        type="submit"
                    />
                </div>
            </div>
        </div>
    );
};

export default CardDetails;
