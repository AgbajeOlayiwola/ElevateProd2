import React, { useState } from 'react';
import styles from './styles.module.css';
import { TbCreditCard } from 'react-icons/tb';
import ButtonComp from '../../ReusableComponents/Button';

const BillingAddress = ({ action }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <div className={styles.recievePaymentBox}>
            <div className={styles.cardDets}>
                {' '}
                <div className={styles.cardDetsCard}>
                    <p>Choose Channel</p>
                    <div className={styles.marvel}>
                        <TbCreditCard />
                        <p>Card</p>
                    </div>
                </div>
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
                        Enter your billing address to complete payment
                    </h1>
                    <div className={styles.allCardDets}>
                        <div className={styles.cardNum}>
                            <label>Street Address</label>
                            <input
                                type="text"
                                placeholder="0000 0000 0000 0000"
                            />
                        </div>
                        <div className={styles.cardNum}>
                            <label>Zip Code</label>
                            <input
                                type="text"
                                placeholder="0000 0000 0000 0000"
                            />
                        </div>
                        <div className={styles.moreCardDets}>
                            <div>
                                <label>State</label>
                                <select>
                                    <option></option>
                                </select>
                            </div>
                            <div>
                                <label>City</label>
                                <select>
                                    <option></option>
                                </select>
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
            </div>
        </div>
    );
};

export default BillingAddress;
