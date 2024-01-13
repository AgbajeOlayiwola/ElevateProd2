import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ReacievePaymntComponent from '../../components/RecievePayment';
import styles from './styles.module.css';

const RecievePaylink = () => {
    const router = useRouter();
    //// console.log(router);
    const [page, setPage] = useState('PaymentItem');
    const recievePaylinkComponenet = () => {
        switch (page) {
            case 'PaymentItem':
                return (
                    <ReacievePaymntComponent
                        data={router.query.data}
                        type={router.query.index}
                        newPage={1}
                        action={() => setPage('BillingAddress')}
                    />
                );
        }
    };
    return (
        <div className={styles.recievePaylink}>
            {recievePaylinkComponenet()}
        </div>
    );
};

export default RecievePaylink;
