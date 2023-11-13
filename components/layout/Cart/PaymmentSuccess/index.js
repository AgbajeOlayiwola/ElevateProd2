import { useRouter } from 'next/router';
import React from 'react';
import SuccesLoanSvg from '../Checkout/succesLoanSvg';
import styles from './styles.module.css';
const PaymmentSuccess = () => {
    const router = useRouter();
    const returnToSTore = () => {
        router.push('/Store');
    };
    return (
        <div className={styles.overflow}>
            <div className={styles.overLayWhite}>
                <SuccesLoanSvg />
                <h1>Payment successful</h1>
                <p>
                    We will send you an email of your receipt once we confirm
                    your payment.
                </p>
                <p>
                    We have sent the payment receipt to your email address and
                    notified the vendor of your payment.
                </p>
                <div className={styles.btns}>
                    <button>Download receipt</button>
                    <button onClick={returnToSTore}>
                        Return to storefront
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymmentSuccess;
