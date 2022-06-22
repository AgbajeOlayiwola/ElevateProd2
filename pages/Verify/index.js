import React from 'react';
import { ButtonComp, Messagesvg } from '../../components';
import styles from './styles.module.css';
const Verify = () => {
    return (
        <div className={styles.verifyCov}>
            <div className={styles.body}>
                <Messagesvg />
                <div>
                    <h3 className={styles.verifyEmail}>Verify your Email</h3>
                </div>

                <p className={styles.hi}>
                    Hi Lanre! By proceeding, we will verify your email address.
                    Open your email and click on the link to verify.
                </p>
                <ButtonComp link="./Auth/Login" text="Verify" />
            </div>
        </div>
    );
};

export default Verify;
