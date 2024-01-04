import React, { useState } from 'react';
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

const InventoryDetails = ( { nextPage } ) => {
  const [showAddCustomer, setShowAddCustomer] = useState( "" );
  const [imageURL, setImageURL] = useState( '' );
  const handleImageUpload = async ( e ) => {
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
          const res = URL.createObjectURL( e.target.files[0] );
          setImageURL( res );
        }
      } else {
        toast.error( 'Sorry! File is larger than 5MB', {
          position: toast.POSITION.TOP_CENTER
        } );
      }
    }
  };
  return (
    <>
      <InventoryDetailsBox>
        <p>Invoice #ISC - 07971</p>
      </InventoryDetailsBox>
      <FormContainer>
        <p>Invoice information</p>
        <div className="flex-container">
          <div className="first_date-col">
            <label>Date created</label>
            <input type="date" />
          </div>
          <div className="second_date-col">
            <label>Invoice due date</label>
            <input type="date" />
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
            placeholder="Enter invoice title here"
            defaultValue={ 'Invoice for LV Bags' }
          />
        </div>
        <div style={ { marginTop: '24px', marginBottom: '24px' } }>
          <label>Invoice description (optional)</label>
          <input
            type="text"
            placeholder="Enter invoice description here"
          />
        </div>
        <Seperator width={ 70 } />
        <div className="biller">Biller/Vendor information</div>
        <NotificationContainer style={ { marginTop: '14px' } }>
          <CustomCheckBox isChecked={ true } /> Use existing business
          information
        </NotificationContainer>
        <Flex>
          { imageURL === '' ? (
            <UploadPlaceholder handleUpload={ handleImageUpload } />
          ) : (
            <Previewer imageURL={ imageURL } onClick={ () => setImageURL( '' ) } />
          ) }
        </Flex>

        <div style={ { marginTop: '24px', marginBottom: '24px' } }>
          <label>Business’s name</label>
          <input type="text" placeholder="Enter your business name" />
        </div>
        <div style={ { marginTop: '24px', marginBottom: '24px' } }>
          <label>Business’s email address</label>
          <input
            type="email"
            placeholder="Enter your email address"
          />
        </div>
        <div style={ { marginTop: '24px', marginBottom: '24px' } }>
          <label>Business’s phone number</label>
          <input type="text" placeholder="Enter your business name" />
          <NotificationContainer style={ { marginTop: '14px' } }>
            <CustomCheckBox isChecked={ true } /> Show business
            account number on invoice
          </NotificationContainer>
        </div>
        <Seperator width={ 70 } />
        <div style={ { marginTop: '24px', marginBottom: '24px' } }>
          <p>Customer’s details</p>
          <FlexBadgeContainer>
            <BadgeCard title={ 'Isaac Akinyemi' } />
            <BadgeCard title={ ' Fortune Ekezie' } />
            <BadgeCard title={ 'Bolaji Stephen' } />
          </FlexBadgeContainer>
          <BtnSpanFlex>
            <IconPlus />
            <BtnSpan>Add customer</BtnSpan>
          </BtnSpanFlex>
          <label>Select a customer</label>
          <SelectCustomer onClick={ () => setShowAddCustomer( "Select customer" ) }>
            Fortune Ekezie
          </SelectCustomer>
          <NotificationContainer style={ { marginTop: '14px' } }>
            <CustomCheckBox isChecked={ true } /> Notify customer(s)
            via email
          </NotificationContainer>
          <CreatNewCustomer onClick={ () => setShowAddCustomer( 'Add customer' ) }>Create a new customer</CreatNewCustomer>
        </div>
      </FormContainer>
      { showAddCustomer === 'Select customer' && (
        <Modal
          size={ 'medium' }
          onClose={ () => setShowAddCustomer( '' ) }
        >
          <SelectCustomerText>Select a customer</SelectCustomerText>
          <SubText>You can select more than one customer</SubText>
          <InputWrapper
            placeholder="...Search for a customer"
            hasPlaceholder={ false }
          />
          <CustomerListContainer>
            <TitleAlphabet>A</TitleAlphabet>
            <CustomerListContainerFlex>
              <CustomCheckBox isChecked={ true } />
              <div>
                <TitleName>Akinyemi Isaac</TitleName>
                <div
                  style={ {
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '4px',
                    marginTop: '4px'
                  } }
                >
                  <SubtitleMail>
                    iakinyemi@ecobank.com
                  </SubtitleMail>
                  <SubTitleContactContainer>
                    <Circle></Circle>
                    <SubTitleContact>
                      07098917812
                    </SubTitleContact>
                  </SubTitleContactContainer>
                </div>
              </div>
            </CustomerListContainerFlex>
          </CustomerListContainer>
          <CustomerListContainer>
            <TitleAlphabet>B</TitleAlphabet>
            <VStack>
              <CustomerListContainerFlex>
                <CustomCheckBox isChecked={ true } />
                <div>
                  <TitleName>Akinyemi Isaac</TitleName>
                  <div
                    style={ {
                      display: 'flex',
                      alignItems: 'center',
                      columnGap: '4px',
                      marginTop: '4px'
                    } }
                  >
                    <SubtitleMail>
                      iakinyemi@ecobank.com
                    </SubtitleMail>
                    <SubTitleContactContainer>
                      <Circle></Circle>
                      <SubTitleContact>
                        07098917812
                      </SubTitleContact>
                    </SubTitleContactContainer>
                  </div>
                </div>
              </CustomerListContainerFlex>
              <CustomerListContainerFlex>
                <CustomCheckBox isChecked={ true } />
                <div>
                  <TitleName>Akinyemi Isaac</TitleName>
                  <div
                    style={ {
                      display: 'flex',
                      alignItems: 'center',
                      columnGap: '4px',
                      marginTop: '4px'
                    } }
                  >
                    <SubtitleMail>
                      iakinyemi@ecobank.com
                    </SubtitleMail>
                    <SubTitleContactContainer>
                      <Circle></Circle>
                      <SubTitleContact>
                        07098917812
                      </SubTitleContact>
                    </SubTitleContactContainer>
                  </div>
                </div>
              </CustomerListContainerFlex>
            </VStack>
          </CustomerListContainer>

          <button style={ { marginTop: 40 } } >Add customer</button>
        </Modal>
      ) }
      { showAddCustomer === 'Add customer' && (
        <Modal
          size={ 'medium' }
          onClose={ () => setShowAddCustomer( '' ) }
        >
          <SelectCustomerText>Create a new customer</SelectCustomerText>
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
          <button style={ { marginTop: 16 } } >Add customer</button>
        </Modal>
      ) }
      <SaveAndContinueFlex>
        <p>
          Not creating now? <SaveAsDraft>Save as Draft</SaveAsDraft>
        </p>
        <button style={ { width: 176, marginTop: 0 } } onClick={ nextPage }>
          Save and Continue
        </button>
      </SaveAndContinueFlex>
    </>
  );
};

export default InventoryDetails;
