import React from 'react';
import styles from './styles.module.css';
import IconSearch from '../ReusableComponents/IconComponents/IconSearch';

const filtersList = [
    'All',
    'Paid',
    'Pending',
    'Draft',
    'Overdue'
];

const InvoiceHeader = ( { title = 'Created invoices', showUtilze = true, setSearchTerms } ) => {
    return (
        <div className={ styles.invoiceHeaderBg }>
            <div className={ styles.invoiceHeaderBoxContaniner } style={ { marginBottom: title === "Paid invoices" ? "18px" : 0 } }>
                <p>{ title }</p>
                <div className={ styles.inputWrapper }>
                    <div>
                        <IconSearch />
                    </div>
                    <input placeholder="Search by title, amount or date" onChange={ ( e ) => setSearchTerms( e.target.value ) } />
                </div>
            </div>
            { showUtilze && <>
                { title !== 'Paid invoices' && (
                <div className={ styles.filterFlexContainer }>
                    { filtersList.map( ( value, index ) => {
                        return <div key={ index }>{ value }</div>;
                    } ) }
                </div>
                ) }
            </> }
        </div>
    );
};

export default InvoiceHeader;
