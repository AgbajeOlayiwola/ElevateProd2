import React from 'react';
import styles from './styles.module.css';
import InvoiceEmptyStateIcon from '../ReusableComponents/InvoiceSvg/InvoiceEmptyStateIcon';
import { useRouter } from 'next/router';
const EmptyState = ( { message = "Your eInvoices will appear here when you create one.<br>eReceipts are made available for paid invoices.", icon=<InvoiceEmptyStateIcon />, btnText = "Create eInvoice", path = "/Admin/Invoices/create-invoice" } ) => {
    const router = useRouter();
    return (
        <div className={styles.emptyStateContainer}>
            <div className={styles.emptyStateInnerContainer}>
                <div className={styles.emptyStateHolder}>
                    <section>
                        {icon}
                    </section>
                    <p dangerouslySetInnerHTML={ { __html: message } }>
                    </p>
                    <div className={styles.buttonContainer}>
                        <button
                            onClick={() =>
                                router.push( path )
                            }
                            style={{ width: '218px' }}
                        >
                            { btnText }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmptyState;
