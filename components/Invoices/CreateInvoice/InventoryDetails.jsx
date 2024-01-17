import React, { useEffect, useState } from 'react';
import {
  CreatNewCustomer,
  FormContainer,
  InventoryDetailsBox,
  NotificationContainer,
  SelectCustomer,
  SelectCustomerText,
  Seperator,
  SubText,
  InputWrapper,
  TitleAlphabet,
  CustomerListContainerFlex,
  CustomerListContainer,
  TitleName,
  SubtitleMail,
  SubTitleContactContainer,
  SubTitleContact,
  Circle,
  VStack,
  SaveAndContinueFlex,
  SaveAsDraft,
  BtnSpanFlex,
  FlexBadgeContainer,
  BtnSpan,
  Flex,
  UploadContainer
} from '../InvoicesStyle';
import IconHint from '../../ReusableComponents/IconComponents/IconHint';
import { toast } from 'react-toastify';
import CustomCheckBox from '../../ReusableComponents/CustomCheckBox';
import { UploadPlaceholder } from '../../ReusableComponents/UploadPlaceholder';
import Modal from '../../ReusableComponents/Modal';
import BadgeCard from '../../ReusableComponents/BadgeCard';
import IconPlus from '../../ReusableComponents/IconComponents/IconPlus';
import Previewer from '../../ReusableComponents/UploadPlaceholder/previewer';
import * as yup from 'yup';
import { Formik } from 'formik';
import { toBase64 } from '../../../utils/base64';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../utils/hooks';
import { useGetAllCustomersMutation } from '../../../redux/api/authApi';
import { userInventoryDetails, } from '../../../redux/slices/createInvoiceSlice';
import { ScrollAreas } from './Product';


const initSchema = yup.object().shape( {
  invoiceTitle: yup.string().required( 'Invoice title is required' ),
  invoiceDate: yup.string().required( 'Date created is required' ),
  invoiceDueDate: yup.string().required( 'Invoice due date is required' ),
  invoiceDescription: yup.string().optional(),
  businessLogo: yup.string().required( 'Business logo is required' ),
  businessName: yup.string().required( 'Business name is required' ),
  businessEmailAddress: yup.string().email( 'Enter a valid email' ).required( "Email address is required" ),
  businessPhoneNumber: yup.string().required( 'Phone number is required' )
} );

const InventoryDetails = ( { nextPage } ) => {
  const [showAddCustomer, setShowAddCustomer] = useState( '' );
  const [searchQuery, setSearchQuery] = useState( '' );
  const currentStage = useAppSelector( ( state ) => state.Stage );
  const inventoryInfo = useAppSelector(
    ( state ) => state.createInvoiceSlice.InventoryDetails
  );
  const dispatch = useDispatch();
  const initialValues = {
    invoiceTitle: inventoryInfo.invoiceTitle,
    invoiceDate: inventoryInfo.invoiceDate,
    invoiceDueDate: inventoryInfo.invoiceDueDate,
    invoiceDescription: inventoryInfo.invoiceDescription,
    businessName: inventoryInfo.businessName,
    businessLogo: inventoryInfo.businessLogo,
    businessEmailAddress: inventoryInfo.businessEmailAddress,
    businessPhoneNumber: inventoryInfo.businessPhoneNumber,
    useExistingBusiness: inventoryInfo.useExistingBusiness,
    showBusinessAccount: inventoryInfo.showBusinessAccount
  };
  const [
    getAllCustomer,
    {
      data: allCustomers,
      isLoading: isLoadingInvoice,
      isSuccess: isSuccessInvoice,
      isError: isErrorInvoice
    }
  ] = useGetAllCustomersMutation();
  const storedFrontId = localStorage.getItem( "storedFrontId" )
  useEffect( () => {
    getAllCustomer( {
      storeFrontId: JSON.parse( storedFrontId ) || "",
    } );

  }, [] );
  const spread = allCustomers ? [...allCustomers?.data] : []
  const sortedData = spread.sort( ( a, b ) => a.name.localeCompare( b.name ) );
  const filteredData = sortedData?.filter( ( item ) =>
    item.name.toLowerCase().includes( searchQuery.toLowerCase() )
  );
  const groupedData = {};
  filteredData?.forEach( ( item ) => {
    const firstLetter = item?.name?.trim().charAt( 0 ).toUpperCase();
    groupedData[firstLetter] = groupedData[firstLetter] || [];
    console.log( item )
    groupedData[firstLetter].push( item );
  } );

  return (
    <>
      <InventoryDetailsBox>
        <p>Invoice #ISC - 07971</p>
      </InventoryDetailsBox>

      <Formik
        validationSchema={ initSchema }
        initialValues={ initialValues }
        validateOnChange={ true }
        onSubmit={ ( values, { setSubmitting } ) => {
          const data = {
            invoiceTitle: values.invoiceTitle,
            invoiceDate: values.invoiceDate,
            invoiceDueDate: values.invoiceDueDate,
            invoiceDescription: values.invoiceDescription,
            businessName: values.businessName,
            businessEmailAddress: values.businessEmailAddress,
            businessLogo: values.businessLogo,
            businessPhoneNumber: values.businessPhoneNumber,
            useExistingBusiness: values.useExistingBusiness,
            showBusinessAccount: values.showBusinessAccount
          };
          nextPage()
          console.log( data );
          dispatch( userInventoryDetails( data ) );

          setSubmitting( false );
        } }
      >
        { ( {
          values,
          errors,
          touched,
          handleChange,
          setFieldValue,
          handleSubmit
        } ) => (
          <FormContainer>
            <p>Invoice information</p>
            <div className="flex-container">
              <div className="first_date-col">
                <label>Date created</label>
                <input
                  type="date"
                  name="invoiceDate"
                  value={ values?.invoiceDate }
                  onChange={ ( e ) =>
                    setFieldValue(
                      'invoiceDate',
                      e.target.value
                    )
                  }
                />
                <span style={ { color: 'red', fontWeight: 600, fontSize: 12 } }>{ errors.invoiceDate }</span>
              </div>
              <div className="second_date-col">
                <label>Invoice due date</label>
                <input
                  type="date"
                  name="invoiceDueDate"
                  value={ values?.invoiceDueDate }
                  onChange={ ( e ) =>
                    setFieldValue(
                      'invoiceDueDate',
                      e.target.value
                    )
                  }
                />
                <span style={ { color: 'red', fontWeight: 600, fontSize: 12 } }>{ errors.invoiceDueDate }</span>
              </div>

            </div>
            <NotificationContainer>
              <IconHint />
              <p>You can choose a different date</p>
            </NotificationContainer>
            <div style={ { marginTop: '24px' } }>
              <label>Invoice for LV Bags</label>
              <input
                type="text"
                name="invoiceTitle"
                placeholder="Enter invoice title here"
                defaultValue={ 'Invoice for LV Bags' }
                value={ values?.invoiceTitle }
                onChange={ ( e ) =>
                  setFieldValue(
                    'invoiceTitle',
                    e.target.value
                  )
                }
              />
              <span style={ { color: 'red', fontWeight: 600, fontSize: 12 } }>{ errors.invoiceTitle }</span>
            </div>
            <div
              style={ { marginTop: '24px', marginBottom: '24px' } }
            >
              <label>Invoice description (optional)</label>
              <input
                type="text"
                placeholder="Enter invoice description here"
                name="invoiceDescription"
                value={ values?.invoiceDescription }
                onChange={ ( e ) =>
                  setFieldValue(
                    'invoiceDescription',
                    e.target.value
                  )
                }
              />
            </div>
            <Seperator width={ 70 } />
            <div className="biller">Biller/Vendor information</div>
            <NotificationContainer style={ { marginTop: '14px' } }>
              <CustomCheckBox isChecked={ true } /> Use existing
              business information
            </NotificationContainer>
            <Flex>
              { inventoryInfo?.businessLogo === '' ? (
                <UploadPlaceholder
                  name="businessLogo"
                  handleUpload={ async ( e ) => {
                    const maxSize = 5 * 1024 * 1024; // 5MB
                    const allowedTypes = ['image/png', 'image/jpeg'];
                    const { size = 0 } = e.target.files?.[0] || {};
                    if ( e.target.files && e.target.files.length ) {
                      if ( e.target.files.length > 0 && size <= maxSize ) {
                        if (
                          e.target.files?.[0] &&
                          allowedTypes.includes( e.target.files?.[0].type ) &&
                          size <= maxSize
                        ) {
                          const base64 = await toBase64( e.target.files[0] )
                          setFieldValue(
                            'businessLogo',
                            base64
                          )
                          dispatch( userInventoryDetails( { ...inventoryInfo, businessLogo: base64 } ) )
                        }
                      } else {
                        toast.error( 'Sorry! File is larger than 5MB', {
                          position: toast.POSITION.TOP_CENTER
                        } );
                      }
                    }
                  }
                  }
                />
              ) : (
                <Previewer
                  imageURL={ `${ inventoryInfo?.businessLogo }` }
                  onClick={ () => dispatch( userInventoryDetails( { ...inventoryInfo, businessLogo: "" } ) ) }
                />
              ) }

            </Flex>
            <span style={ { color: 'red', fontWeight: 600, fontSize: 12 } }>{ errors.businessLogo }</span>
            <div
              style={ { marginTop: '24px', marginBottom: '24px' } }
            >
              <label>Business’s name</label>
              <input
                type="text"
                placeholder="Enter your business name"
                name="businessName"
                value={ values?.businessName }
                onChange={ ( e ) =>
                  setFieldValue(
                    'businessName',
                    e.target.value
                  )
                }
              />
              <span style={ { color: 'red', fontWeight: 600, fontSize: 12 } }>{ errors.businessName }</span>
            </div>
            <div
              style={ { marginTop: '24px', marginBottom: '24px' } }
            >
              <label>Business’s email address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                name="businessEmailAddress"
                value={ values?.businessEmailAddress }
                onChange={ ( e ) =>
                  setFieldValue(
                    'businessEmailAddress',
                    e.target.value
                  )
                }
              />
              <span style={ { color: 'red', fontWeight: 600, fontSize: 12 } }>{ errors.businessEmailAddress }</span>
            </div>

            <div
              style={ { marginTop: '24px', marginBottom: '24px' } }
            >
              <label>Business’s phone number</label>
              <input
                type="text"
                placeholder="Enter your Business phone number"
                name="businessPhoneNumber"
                value={ values?.businessPhoneNumber }
                onChange={ ( e ) =>
                  setFieldValue(
                    'businessPhoneNumber',
                    e.target.value
                  )
                }
              />
              <span style={ { color: 'red', fontWeight: 600, fontSize: 12 } }>{ errors.businessPhoneNumber }</span>
            </div>
            <Seperator width={ 70 } />
            <div
              style={ { marginTop: '24px', marginBottom: '24px' } }
            >
              <p>Customer’s details</p>
              <FlexBadgeContainer>
                {/* <BadgeCard title={ 'Isaac Akinyemi' } />
                <BadgeCard title={ ' Fortune Ekezie' } />
                <BadgeCard title={ 'Bolaji Stephen' } /> */}
              </FlexBadgeContainer>
              {/* <BtnSpanFlex>
                <IconPlus />
                <BtnSpan>Add customer</BtnSpan>
              </BtnSpanFlex> */}
              <label>Select a customer</label>
              <SelectCustomer
                onClick={ () =>
                  setShowAddCustomer( 'Select customer' )
                }
              >
                Select a customer
              </SelectCustomer>
              <CreatNewCustomer
                onClick={ () =>
                  setShowAddCustomer( 'Add customer' )
                }
              >
                Create a new customer
              </CreatNewCustomer>
            </div>
            <SaveAndContinueFlex>
              <p>Not creating now?</p>
              <button style={ { width: 176, marginTop: 0 } } onClick={ handleSubmit } type='submit'>
                Save and Continue
              </button>
            </SaveAndContinueFlex>
          </FormContainer>
        ) }

      </Formik>

      { showAddCustomer === 'Select customer' && (
        <Modal size={ 'medium' } onClose={ () => setShowAddCustomer( '' ) }>
          <SelectCustomerText>Select a customer</SelectCustomerText>
          <SubText>You can select more than one customer</SubText>
          <InputWrapper
            placeholder="...Search for a customer"
            hasPlaceholder={ false }
            value={ searchQuery }
            onChange={ ( e ) => setSearchQuery( e.target.value ) }
          />
          <ScrollAreas height={ 300 }>
            { Object.keys( groupedData ).map( ( letter ) => (
              <CustomerListContainer>
                <TitleAlphabet>{ letter }</TitleAlphabet>
                { groupedData[letter].map( ( item, index ) => (
                  <CustomerListContainerFlex key={ index } style={ { margingTop: 10 } }>
                    <CustomCheckBox isChecked={ true } />
                    <div>
                      <TitleName>{ item?.name }</TitleName>
                      <div
                        style={ {
                          display: 'flex',
                          alignItems: 'center',
                          columnGap: '4px',
                          marginTop: '4px'
                        } }
                      >
                        <SubtitleMail>
                          { item?.emailAddress }
                        </SubtitleMail>
                        <SubTitleContactContainer>
                          <Circle></Circle>
                          <SubTitleContact>
                            { item?.phoneNumber }
                          </SubTitleContact>
                        </SubTitleContactContainer>
                      </div>
                    </div>
                  </CustomerListContainerFlex>
                ) ) }

              </CustomerListContainer>
            ) ) }
          </ScrollAreas>
          <button style={ { marginTop: 40 } }>Add customer</button>
        </Modal>
      ) }
      { showAddCustomer === 'Add customer' && (
        <Modal size={ 'medium' } onClose={ () => setShowAddCustomer( '' ) }>
          <SelectCustomerText>
            Create a new customer
          </SelectCustomerText>
          <div style={ { marginTop: '24px', marginBottom: '24px' } }>
            <label>Customer’s name</label>
            <input
              type="text"
              placeholder="Enter customer’s name"
            />
          </div>
          <div style={ { marginTop: '24px', marginBottom: '24px' } }>
            <label>Customer’s email address</label>
            <input
              type="text"
              placeholder="Enter customer’s email address"
            />
          </div>
          <div style={ { marginTop: '24px', marginBottom: '24px' } }>
            <label>Customer’s phone number</label>
            <input
              type="text"
              placeholder="Enter customer’s phone number"
            />
          </div>
          <button style={ { marginTop: 16 } }>Add customer</button>
        </Modal>
      ) }

    </>
  );
};

export default InventoryDetails;
