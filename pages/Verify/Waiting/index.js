import React, { useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import Success from '../../../components/ReusableComponents/Success';
import { ButtonComp } from '../../../components';

const Waiting = () => {
    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <div className={styles.cover}>
            <>
                <div className={styles.Success}>
                    <Success />
                </div>
                <div className={styles.successBody}>
                    <h2 className={styles.h2}>Your account is being created</h2>
                    <h3>Once done details would be sent to your mail</h3>
                    <Link href="/Auth/Login">
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            // onClick={handleSubmit}
                            type="submit"
                            text="Proceed To Login"
                        />
                    </Link>
                </div>
            </>
        </div>
    );
};

export default Waiting;
