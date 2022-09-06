import React, { useState } from 'react';
import Success from '../../components/ReusableComponents/Success';
import { ButtonComp } from '../../components';
import Link from 'next/link';
import styles from './styles.module.css';

const SuccessN = () => {
    const [activeBtn, setActiveBtn] = useState(true);

    return (
        <div className={styles.succCov}>
            <div className={styles.succCovInn}>
                <div className={styles.Success}>
                    <Success />
                </div>
                <h2 className={styles.h2}>Sign up Successful</h2>
                <Link href="/Dashboard">
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        // onClick={handleSubmit}
                        type="submit"
                        text="Proceed To Dashboard"
                    />
                </Link>
                <p>
                    With your Ellevate Account, you have Deposit/Inflow Limit:
                    N1,000,000
                </p>
            </div>
        </div>
    );
};

export default SuccessN;
