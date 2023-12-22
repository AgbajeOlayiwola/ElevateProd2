import React from 'react';
import styles from './styles.module.css';
import InvoiceEmptyStateIcon from '../ReusableComponents/InvoiceSvg/InvoiceEmptyStateIcon';
import ButtonComp from '../ReusableComponents/Button';
import { useRouter } from 'next/router';
const EmptyState = () => {
    const router = useRouter();
    return (
        <div className={styles.emptyStateContainer}>
            <div className={styles.emptyStateInnerContainer}>
                <div className={styles.emptyStateHolder}>
                    <section>
                        <InvoiceEmptyStateIcon />
                    </section>
                    <p>
                        Your eInvoices will appear here when you create one.
                        <br></br> eReceipts are made available for paid
                        invoices.
                    </p>
                    <div className={styles.buttonContainer}>
                        <button
                            onClick={() =>
                                router.push('/Admin/Invoices/create-invoice')
                            }
                            style={{ width: '218px' }}
                        >
                            Create eInvoice
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmptyState;
