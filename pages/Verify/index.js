import React, { useState } from 'react';
import { ButtonComp, Messagesvg } from '../../components';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
const Verify = () => {
    const router = useRouter();
    const [activeBtn, setActiveBtn] = useState(true);

    const handleClick = () => {
        router.push('./Auth/Login');
    };
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
                <div onClick={handleClick}>
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        type="submit"
                        text="Verify"
                    />
                </div>
            </div>
        </div>
    );
};

export default Verify;
