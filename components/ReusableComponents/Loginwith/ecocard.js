import React, { useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import ButtonComp from '../Button';

const Ecocard = () => {
    const [outType, setOutType] = useState();
    const [activeBtn, setActiveBtn] = useState(true);
    const [bankdets, setBankDets] = useState(false);
    const [number, setNumber] = useState('');

    return (
        <form>
            <div className={styles.cover}>
                <div>
                    <label>Ecobank Card number</label>
                    <br />
                    <input
                        placeholder="Ecobank Card number"
                        className={styles.idInput}
                        type="number"
                    />
                </div>
                <div className={styles.expCvv}>
                    <div className={styles.exp}>
                        <div className={styles.shows}>
                            <label>Expiry Date</label>
                            <br />
                            <input
                                placeholder=""
                                className={styles.passwordInput}
                                type="month"
                            />
                        </div>
                    </div>
                    <div className={styles.cvvCode}>
                        <div className={styles.shows}>
                            <label>CVV</label>
                            <br />
                            <input
                                placeholder="CVV"
                                className={styles.passwordInput}
                                maxLength="3"
                                type="password"
                                value={number}
                                onChange={(event) => {
                                    if (event.target.value.length == 3)
                                        return false; //limits to 10 digit entry
                                    setNumber(event?.target.value); //saving input to state
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.btn}>
                <Link href="/Onboarding/ExistingProfileSetup">
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        text="Login"
                        type="submit"
                    />
                </Link>
            </div>
        </form>
    );
};

export default Ecocard;
