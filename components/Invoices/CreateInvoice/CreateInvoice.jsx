import React, { useState } from 'react'
import styles from "../styles.module.css"
import { FlexContainer, Seperator } from '../InvoicesStyle'
import IconArrowBack from '../../ReusableComponents/IconComponents/IconArrowBack'
import { useRouter } from 'next/router'
import InventoryDetails from './InventoryDetails'
import Product from './Product'
import TaxDiscount from './TaxDiscount'
import Review from './Review'
const CreateInvoice = () => {
  const [page, setPage] = useState( 0 );
  const conditionalComponent = () => {
    switch ( page ) {
      case 0:
        return <InventoryDetails nextPage={ () => setPage( 1 ) } />;
      case 1:
        return <Product nextPage={ () => setPage( 2 ) } />;
      case 2:
        return <TaxDiscount nextPage={ () => setPage( 3 ) } />;
      case 3:
        return <Review />;
    }
  };
  const router = useRouter()
  return (
    <div>
      <FlexContainer onClick={ () => router.push( "/Admin/Invoices" ) }>
        <IconArrowBack />
        <p>Create eInvoice</p>
      </FlexContainer>
      <div className={ styles.creating }>

        <div className={ styles.storeFrontSteps }>
          <div>
            <div
              onClick={ () => setPage( 0 ) }
              className={
                page === 0
                  ? styles.detBrand
                  : styles.detBrandInactive
              }
            >
              1
            </div>
            <p
              className={
                page === 0 ? styles.active : styles.inactive
              }
            >
              Inventory details
            </p>
          </div>
          <hr className={ styles.hr } />
          <div>
            <div
              onClick={ () => setPage( 1 ) }
              className={
                page === 1
                  ? styles.detBrand
                  : styles.detBrandInactive
              }
            >
              2
            </div>
            <p
              className={
                page === 1 ? styles.active : styles.inactive
              }
            >
              Products
            </p>
          </div>
          <hr className={ styles.hr } />
          <div>
            <div
              onClick={ () => setPage( 2 ) }
              className={
                page === 2
                  ? styles.detBrand
                  : styles.detBrandInactive
              }
            >
              3
            </div>
            <p
              className={
                page === 3 ? styles.active : styles.inactive
              }
            >
              Tax and Discount
            </p>
          </div>
        </div>
        <Seperator width={ 100 } />
        { conditionalComponent() }
      </div>

    </div>

  )
}

export default CreateInvoice