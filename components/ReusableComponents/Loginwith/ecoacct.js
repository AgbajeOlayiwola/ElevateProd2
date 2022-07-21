import React, { useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import ButtonComp from '../Button';

const Ecoacct = () => {
    const [outType, setOutType] = useState();
    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <form>
            <div className={styles.cover}>
                <div>
                    <label>Enter Your Ecobank Account Number</label>
                    <br />
                    <input
                        placeholder="123*******62"
                        type="text"
                        className={styles.idInput}
                    />
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

export default Ecoacct;
