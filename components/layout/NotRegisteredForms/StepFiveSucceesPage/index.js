import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ButtonComp } from '../../../../components';
import Success from '../../../ReusableComponents/Success';
import styles from './styles.module.css';

const StepFiveSuccessPage = ({ handleShowSuccessStep }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    const [accountDone, setAccountDone] = useState('');
    const { moreAccountNumberDetails } = useSelector((store) => store);
    const { accountNumber } = useSelector((store) => store);

    return (
        <div className={styles.cover}>
            <>
                <div className={styles.Success}>
                    <Success />
                </div>
                <div className={styles.successBody}>
                    <h2 className={styles.h2}>
                        Your Business account is ready!
                    </h2>
                    <h3>
                        Your Account Number is <span>{accountNumber}</span>
                    </h3>
                    <Link href="/Admin/Dashboard">
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            // onClick={handleSubmit}
                            type="submit"
                            text="Proceed To Dashboard"
                        />
                    </Link>
                    {/* <p>
                        With your Account,you have a Deposit/Inflow Limit:
                        #1,000,000
                    </p> */}
                </div>
            </>
        </div>
    );
};

export default StepFiveSuccessPage;
