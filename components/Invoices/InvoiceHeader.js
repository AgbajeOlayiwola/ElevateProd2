import React from 'react';
import styles from './styles.module.css';
import IconSearch from '../ReusableComponents/IconComponents/IconSearch';


const filtersList = ["All", "Paid(12)", "Pending(12)", "Draft(12)", "Overdue(12)"]

const InvoiceHeader = () => {
    return (
        <div className={ styles.invoiceHeaderBg }>
            <div className={ styles.invoiceHeaderBoxContaniner }>
                <p>Created invoices</p>
                <div className={ styles.inputWrapper }>
                    <div>
                        <IconSearch />
                    </div>
                    <input placeholder='Search by title, amount or date' />
                </div>
            </div>
            <div className={ styles.filterFlexContainer }>
                {
                    filtersList.map( ( value, index ) => {
                        return <div key={ index }>
                            { value }
                        </div>
                    } )
                }
            </div>
        </div>
    );
};

export default InvoiceHeader;
