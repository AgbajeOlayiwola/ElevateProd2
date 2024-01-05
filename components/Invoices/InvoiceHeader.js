import React from 'react';
import styles from './styles.module.css';
import IconSearch from '../ReusableComponents/IconComponents/IconSearch';

const filtersList = [
    'All',
    'Paid(12)',
    'Pending(12)',
    'Draft(12)',
    'Overdue(12)'
];

const InvoiceHeader = ( { title = 'Created invoices' } ) => {
    return (
        <div className={ styles.invoiceHeaderBg }>
            <div className={ styles.invoiceHeaderBoxContaniner } style={ { marginBottom: title === "Paid invoices" ? "18px" : 0 } }>
                <p>{ title }</p>
                <div className={ styles.inputWrapper }>
                    <div>
                        <IconSearch />
                    </div>
                    <input placeholder="Search by title, amount or date" />
                </div>
            </div>
            { title !== 'Paid invoices' && (
                <div className={ styles.filterFlexContainer }>
                    { filtersList.map( ( value, index ) => {
                        return <div key={ index }>{ value }</div>;
                    } ) }
                </div>
            ) }
        </div>
    );
};

export default InvoiceHeader;
