import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import ButtonComp from '../../../components/ReusableComponents/Button';
import EmptyState from '../../../components/EmptyState';
import InvoiceHeader from '../../../components/Invoices/InvoiceHeader';
import InvoiceTable from '../../../components/Invoices/InvoiceTable';
import { useGetAllInvoiceMutation } from '../../../redux/api/authApi';
import { setAllStars } from '../../../redux/slices/allStoresSlice';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
const useLocalStorage = ( key, initialValue ) => {
// Retrieve the stored value from localStorage
  const storedValue = localStorage.getItem( key );
  const initial = storedValue ? JSON.parse( storedValue ) : initialValue;

  const [value, setValue] = useState( initial );
  const updateValue = ( newValue ) => {
    setValue( newValue );
    localStorage.setItem( key, JSON.stringify( newValue ) );
  };

  return [value, updateValue];
};
const InvoicesPages = () => {
  const [selectedStore, setSelectedStore] = useLocalStorage(
    'storedFrontId',
    ''
  );
  const [searchParam] = useState( ['status'] );
  const { allStores } = useSelector( ( store ) => store );
  const [searchTerms, setSearchTerms] = useState( '' );
  const [
    getAllInvoice,
    {
      data: invoiceData,
      isLoading: isLoadingInvoice,
      isSuccess: isSuccessInvoice,
      isError: isErrorInvoice
    }
  ] = useGetAllInvoiceMutation();
  const [headerData, setHeaderData] = useState( {
    total: '0',
    totalInvoice: '0',
    paidInvoice: '0',
    pendingInvoice: '0'
    } );
  const [invoices, setInvoices] = useState( [] );
  const handleSelectChange = ( e ) => {
    setSelectedStore( e.target.value );
  };
  const router = useRouter();
  useEffect( () => {
    if ( selectedStore?.length ) {
      getAllInvoice( {
        storeFrontId: selectedStore,
        status: '',
        page: 1,
        limit: 500
            } );
        }
    }, [selectedStore] );
  useEffect( () => {
    if ( !isLoadingInvoice && !isErrorInvoice ) {
      setInvoices( invoiceData?.data?.invoices || [] );
    }
    }, [isLoadingInvoice, isErrorInvoice, invoiceData?.data?.invoices] );

  const arrayOfValue = Object?.values?.( invoices );
  function search( items ) {
    return items.filter( ( item ) => {
      return [...searchParam].some( ( value ) => {
        return (
          item[value]
            ?.toString()
            ?.toLowerCase()
                    ?.indexOf( searchTerms.toLowerCase() ) > -1
                );
            } );
        } );
    }
  useEffect( () => {
    if ( invoices?.length === 0 ) {
      setHeaderData( {
        total: '0',
        totalInvoice: '0',
        paidInvoice: '0',
        pendingInvoice: '0'
            } );
        }
      if ( invoices?.length >= 1 ) {
        setHeaderData( {
          total: invoices
                ?.reduce( ( accumulator, invoice ) => {
                  return accumulator + invoice?.grandTotal;
                    }, 0 )
                .toFixed( 2 ),
              totalInvoice: invoices.length,
              paidInvoice: invoices.filter( ( value ) => value.status === 'paid' )
                .length,
              pendingInvoice: invoices.filter(
                  ( value ) => value.status === 'pending'
                ).length
            } );
        }
    }, [invoices] );
  console.log( allStores );
  return (
    <>
        <div className={ styles.flexHeaderContainer }>
          <p>eInvoice and eReceipt</p>
          <div
            style={ {
              display: 'flex',
              alignItems: 'center',
              columnGap: 20
            } }
          >
            <div
              onClick={ () =>
                router.push( '/Admin/Invoices/create-receipt' )
              }
              style={ {
                width: 154,
                height: 48,
                cursor: 'pointer',
                borderRadius: '8px',
                border: '1px solid #102572',
                background: 'rgba( 16, 37, 114, 0.10 )',
                color: '#235B7F',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              } }
            >
              Create eInvoice
            </div>
            <div
              onClick={ () =>
                router.push( '/Admin/Invoices/create-invoice' )
              }
              style={ {
                width: 154,
                height: 48,
                cursor: 'pointer',
                borderRadius: '8px',
                background: '#6ccf00',
                color: 'white',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              } }
            >
              Create eInvoice
            </div>
          </div>
        </div>
        <div className={ styles.cardContainer }>
          <div className={ styles.firstBoxContainer }>
            <div className={ styles.greenBox }>
              <h2>{ headerData.totalInvoice }</h2>
              <p>Total invoice</p>
            </div>
            <div className={ styles.whiteBox }>
              <h2>{ headerData.paidInvoice }</h2>
              <p>Paid invoice</p>
            </div>
            <div className={ styles.whiteBox }>
              <h2>{ headerData.pendingInvoice }</h2>
              <p>Pending invoice</p>
            </div>
          </div>
          <div className={ styles.secondBoxContainer }>
            <h2>₵{ headerData.total }</h2>
            <p>Total revenue</p>
          </div>
        </div>
        <label style={ { marginTop: '20px', display: 'inline-block' } }>
          Select a storeFront
        </label>
        <select
          id="selectElement"
          value={ selectedStore }
          onChange={ handleSelectChange }
        >
          <option
            value=""
            selected
            disabled
            style={ {
              color: '#A5A5A5',
              fontWeight: 400,
              fontSize: '14px'
            } }
          >
            Select a storeFront
          </option>
          { allStores?.map( ( value ) => {
            return (
                      <option value={ value.id }>{ value.storeFrontName }</option>
                    );
                } ) }
        </select>

        { isLoadingInvoice ? (
          <p
            style={ {
              textAlign: 'center',
              fontWeight: 800,
              marginTop: 50
            } }
          >
            Loading...
          </p>
        ) : (
          <>
              { invoices?.length !== 0 ? (
                <>
                  <div>
                    <InvoiceHeader
                      setSearchTerms={ setSearchTerms }
                    />
                    <InvoiceTable data={ search( arrayOfValue ) } />
                  </div>
                </>
              ) : (
                <EmptyState />
              ) }
            </>
        ) }
      </>
    );
};

export default InvoicesPages;
