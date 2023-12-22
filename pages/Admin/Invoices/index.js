import React from 'react'
import styles from './styles.module.css';
import ButtonComp from '../../../components/ReusableComponents/Button';
import EmptyState from '../../../components/EmptyState';
import InvoiceHeader from '../../../components/Invoices/InvoiceHeader';
import InvoiceTable from '../../../components/Invoices/InvoiceTable';

const InvoicesPages = () => {
  return (
    <>
      <div className={ styles.flexHeaderContainer }>
        <p>eInvoice and eReceipt</p>
        <div className={ styles.headerBtnContainer }>
          <ButtonComp backgroundColor={ "rgba(16, 37, 114, 0.10)" } text="Create eReceipt" color={ "white" } width={ 154 } />
          <ButtonComp backgroundColor={ "#6CCF00" } text="Create eInvoice" color={ "white" } width={ 154 } />
        </div>
      </div >
      <div className={ styles.cardContainer }>
        <div className={ styles.firstBoxContainer }>
          <div className={ styles.greenBox }>
            <h2>0</h2>
            <p>Total invoice</p>
          </div>
          <div className={ styles.whiteBox }>
            <h2>0</h2>
            <p>Paid invoice</p>
          </div>
          <div className={ styles.whiteBox }>
            <h2>0</h2>
            <p>Pending invoice</p>
          </div>
        </div>
        <div className={ styles.secondBoxContainer }>
          <h2>₵00,000.00</h2>
          <p>Total revenue</p>
        </div>
      </div>
      <label style={ { marginTop: "20px", display: "inline-block" } }>Select a storeFront</label>
      <select id="selectElement">
        <option value="" selected disabled style={ { color: '#A5A5A5', fontWeight: 400, fontSize: "14px" } }>Select a storeFront</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
      </select>
      <EmptyState />
      <div>
        <InvoiceHeader />
        <InvoiceTable />
      </div>

    </>
  )
}

export default InvoicesPages