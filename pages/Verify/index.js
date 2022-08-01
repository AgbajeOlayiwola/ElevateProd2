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
                    <h3 className={styles.verifyEmail}>
                        Your email address has been verfied!
                    </h3>
                </div>

                <div onClick={handleClick}>
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        type="submit"
                        text="Continue To Login"
                    />
                </div>
            </div>
        </div>
    );
};

export default Verify;
