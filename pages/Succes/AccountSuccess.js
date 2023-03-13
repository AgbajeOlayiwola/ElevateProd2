import React, { useState } from 'react';
import Card from '../../components/layout/NotRegisteredForms/Card';
import Success from '../../components/ReusableComponents/Success';
import { ButtonComp } from '../../components';
import Link from 'next/link';
import styles from './styles.module.css';

const AccountSuccess = () => {
    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <div className={styles.cover}>
            <Card>
                <div className={styles.Success}>
                    <Success />
                </div>
                <div className={styles.successBody}>
                    <h2 className={styles.h2}>
                        Your profile has been successfully created
                    </h2>
                    <Link href="/Dashboard">
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            // onClick={handleSubmit}
                            type="submit"
                            text="Proceed To Dashboard"
                        />
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default AccountSuccess;
