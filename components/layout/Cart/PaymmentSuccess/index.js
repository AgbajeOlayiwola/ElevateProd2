import { useRouter } from 'next/router';
import React from 'react';
import CloseBtnSvg from '../../../ReusableComponents/ClosebtnSvg';
import SuccesLoanSvg from '../Checkout/succesLoanSvg';
import styles from './styles.module.css';
const PaymmentSuccess = ({ close }) => {
    const router = useRouter();
    const returnToSTore = () => {
        router.push('/Store');
    };
    return (
        <div className={styles.overflow}>
            <div className={styles.overLayWhite}>
                <div className={styles.cancel}>
                    <CloseBtnSvg action={() => close()} />
                </div>
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
