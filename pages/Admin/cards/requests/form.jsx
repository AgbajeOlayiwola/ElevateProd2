import React, { useState } from 'react';
import {
  FlexContainer,
  NotificationContainer,
  SaveAndContinueFlex,
  Seperator
} from '../../../../components/Invoices/InvoicesStyle';
import IconArrowBack from '../../../../components/ReusableComponents/IconComponents/IconArrowBack';
import styled from 'styled-components';
import CustomCheckBox from '../../../../components/ReusableComponents/CustomCheckBox';
import { useRouter } from 'next/router';
import IconFlagNigeria from '../../../../components/ReusableComponents/IconComponents/IconFlagNigeria';
import Dashed from '../../../../components/ReusableComponents/IconComponents/Dashed';
import OtpInput from '../../../../components/ReusableComponents/Otpinput';
import SuccessDialog from '../../../../components/ReusableComponents/SuccessDialog';
import Modal from '../../../../components/ReusableComponents/Modal';

const FormRequest = () => {
  const [proceedToReview, setProceedReview] = useState( false );
  return (
    <>
      { !proceedToReview && (
        <RequestPage setProceedReview={ setProceedReview } />
      ) }
      {
        proceedToReview && (
          <RequestReview />
        )
      }
    </>
  );
};
export default FormRequest;
const RequestPage = ( { setProceedReview } ) => {
  const router = useRouter();

  return (
    <div>
      <FlexContainer onClick={ () => router.push( '/Admin/cards/requests' ) }>
        <IconArrowBack />
        <p>Request a card</p>
      </FlexContainer>
      <BoxContainer>
        <Flex>
          <div style={ { marginTop: '24px', marginBottom: '24px' } }>
            <Label>Card type</Label>
            <select id="selectElement">
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
                Select a type
              </option>
              <option value="Debit">Debit</option>
              <option value="Credit">Credit</option>
            </select>
          </div>
          <div style={ { marginTop: '24px', marginBottom: '24px' } }>
            <Label>Preferred card currency</Label>
            <select id="selectElement">
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
                Select a currency
              </option>
              <option value="Naira">Naira</option>
              <option value="Dollar">Dollar</option>
              <option value="Pounds">Pounds</option>
            </select>
          </div>
        </Flex>
        <div style={ { marginBottom: '24px' } }>
          <Label>Card brand</Label>
          <select id="selectElement">
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
              Select a Card brand
            </option>
            <option value="Mastercard">Mastercard</option>
            <option value="Visa">Visa</option>
          </select>
        </div>
        <div style={ { marginBottom: '24px' } }>
          <Label>Reason for request</Label>
          <select id="selectElement">
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
              Select a reason for request
            </option>
            <option value="new card">New card</option>
            <option value="Renewal">Renewal</option>
          </select>
        </div>
        <div>
          <Label>Delivery mode</Label>
          <select id="selectElement">
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
              Select a delivery mode
            </option>
            <option value="Home address">Home address</option>
            <option value="Ecobank branch">Ecobank branch</option>
          </select>
          <NotificationContainer style={ { marginTop: '14px' } }>
            <CustomCheckBox isChecked={ true } />
            Deliver to registered home address
          </NotificationContainer>
        </div>
        <Flex>
          <div
            style={ {
              marginTop: '24px',
              marginBottom: '24px',
              flex: 0.32
            } }
          >
            <Label>House number</Label>
            <input
              type="text"
              placeholder="270B"
              defaultValue={ '270B' }
            />
          </div>
          <div
            style={ {
              marginTop: '24px',
              marginBottom: '24px',
              flex: 1
            } }
          >
            <Label>Street name</Label>
            <input
              type="text"
              placeholder="Ozumba Nbadiwe Avenue"
              defaultValue={ '' }
            />
          </div>
        </Flex>
        <div>
          <Label>State/Province</Label>
          <select id="selectElement">
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
              Select a State/Province
            </option>
            <option value="Lagos">Lagos</option>
            <option value="Enugu">Enugu</option>
          </select>
        </div>
        <div style={ { marginTop: '24px' } }>
          <Label> Town / City / Local government</Label>
          <select id="selectElement">
            <option
              value=""
              selected
              placeholder="Eti-osa"
              disabled
              style={ {
                color: '#A5A5A5',
                fontWeight: 400,
                fontSize: '14px'
              } }
            >
              Select a Town/City/Local government
            </option>
            <option value="Oshodi Isolo">Oshodi Isolo</option>
            <option value="Ikeja">Ikeja</option>
          </select>
        </div>
        <SaveAndContinueFlex
          style={ { justifyContent: 'flex-end', marginTop: '24px' } }
        >
          <button
            style={ { width: 176, marginTop: 0 } }
            onClick={ () => setProceedReview( true ) }
          >
            Request card
          </button>
        </SaveAndContinueFlex>
      </BoxContainer>

    </div>
  );
};

const RequestReview = () => {
  const [showSuccess, setShowSuccess] = useState( false );
  return (
    <>
      <FlexContainer onClick={ () => router.push( '/Admin/cards/requests' ) }>
        <IconArrowBack />
        <p>Card request summary</p>
      </FlexContainer>
      <BoxContainer>
        <BoxBorder>
          <Flex style={ { justifyContent: 'space-between' } }>
            <TextLeft>Source Account</TextLeft>
            <Flex style={ { columnGap: 2 } }>
              <IconFlagNigeria />
              <TextLeft>Nigeria</TextLeft>
            </Flex>
          </Flex>
          <h3>Business Account (XXXX XXXX 9098)</h3>
          <AvailableBalance>
            Available Balance: <span>NGN 55,768.87</span>
          </AvailableBalance>
          <Seperator
            width={ '100%' }
            style={ { marginTop: 24, marginBottom: 24 } }
          />
          <h3>Request card details</h3>
          <Flex
            style={ {
              justifyContent: 'space-between',
              marginBottom: 12
            } }
          >
            <TextLeft>Holder’s name</TextLeft>
            <TextRight>Nigeria</TextRight>
          </Flex>
          <Flex
            style={ {
              justifyContent: 'space-between',
              marginBottom: 12
            } }
          >
            <TextLeft>Mobile number</TextLeft>
            <TextRight>070829892781</TextRight>
          </Flex>
          <Flex
            style={ {
              justifyContent: 'space-between',
              marginBottom: 12
            } }
          >
            <TextLeft>Email address</TextLeft>
            <TextRight>iakinyemi@ecobank.com</TextRight>
          </Flex>

          <Seperator width={ '100%' } style={ { marginBottom: 12 } } />
          <Flex
            style={ {
              justifyContent: 'space-between',
              marginBottom: 12
            } }
          >
            <TextLeft>Card type</TextLeft>
            <TextRight>Debit Card</TextRight>
          </Flex>
          <Flex
            style={ {
              justifyContent: 'space-between',
              marginBottom: 12
            } }
          >
            <TextLeft>Card brand</TextLeft>
            <TextRight>Master Card</TextRight>
          </Flex>
          <Seperator width={ '100%' } style={ { marginBottom: 12 } } />
          <Flex
            style={ {
              justifyContent: 'space-between',
              marginBottom: 12
            } }
          >
            <TextLeft>Delivery mode</TextLeft>
            <TextRight>Home address</TextRight>
          </Flex>
          <Flex
            style={ {
              justifyContent: 'space-between',
              marginBottom: 12
            } }
          >
            <TextLeft>Delivery address</TextLeft>
            <TextRight>
              270B Ozumba Nbadiwe, Eti- osa, Lagos.
            </TextRight>
          </Flex>
          <Flex
            style={ {
              justifyContent: 'space-between',
              marginBottom: 12
            } }
          >
            <TextLeft>Request date</TextLeft>
            <TextRight>12/12/2021</TextRight>
          </Flex>
          <Seperator width={ '100%' } style={ { marginBottom: 12 } } />
          <Flex
            style={ {
              justifyContent: 'space-between',
              marginBottom: 12
            } }
          >
            <TextLeft>Card request fee</TextLeft>
            <TextRight>NGN 1,234.87</TextRight>
          </Flex>
          <Flex
            style={ {
              justifyContent: 'space-between',
              marginBottom: 12
            } }
          >
            <TextLeft>Card delivery fee</TextLeft>
            <TextRight>NGN 1,674.11</TextRight>
          </Flex>
          <Dashed />
          <Flex
            style={ {
              justifyContent: 'space-between',
              marginTop: 12
            } }
          >
            <TotalAmount>Total amount to pay</TotalAmount>
            <Amount>NGN 3,908.98</Amount>
          </Flex>
        </BoxBorder>
        <h4
          style={ {
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 400
          } }
        >
          Enter your PIN to proceed
        </h4>
        <Flex
          style={ {
            width: '379px',
            justifyContent: 'center',
            margin: '0 auto',
            padding: '40px, 16px',
            boxShadow: '0px 0px 30px 0px rgba(224, 224, 224, 0.71)'
          } }
        >
          <OtpInput onOtpChange={ () => null } otpfields={ 6 } />
        </Flex>
        <Flex style={ { justifyContent: 'center', margin: '0 auto' } }>
          <ForgetPin>Forgot PIN</ForgetPin>
        </Flex>

        <Flex
          style={ {
            width: '250px',
            justifyContent: 'center',
            margin: '0 auto'
          } }
        >
          <button onClick={ () => setShowSuccess( true ) }>Request card</button>
        </Flex>
        { showSuccess && (
          <Modal
            size={ 'product' }
            onClose={ () => setShowSuccess( false ) }
            withCloseButton={ false }
          >
            <SuccessDialog
              title="Card request successfully"
              btnComponent={
                <Flex
                  style={ { justifyContent: 'center' } }
                  onClick={ () => setShowSuccess( false ) }
                >
                  <button style={ { width: 196 } }>Done</button>{ ' ' }
                </Flex>
              }
              message=""
              btnText="Done"
              subTitle="You have successfully requested for a card. We will inform you of the request progress."
            />
          </Modal>
        ) }
      </BoxContainer>
    </>
  );
};
const ForgetPin = styled.a`
    color: var(--primary-deepBlue, #102572);
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-decoration-line: underline;
    margin-top: 12px;
    margin-bottom: 12px;
    display: inline-block;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
`;
const TotalAmount = styled.section`
    color: var(--Neutral-Color-Ecobank-Dark-Gray, #4e4e4e);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
    letter-spacing: 0.2px;
`;
const Amount = styled.section`
    color: #08102d;
    text-align: right;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.2px;
`;
const TextLeft = styled.p`
    margin: 0;
    color: var(--Neutral-Color-Ecobank-Dark-Gray, #4e4e4e);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
    letter-spacing: 0.4px;
`;
const TextRight = styled.p`
    margin: 0;
    color: #08102d;

    text-align: right;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 133.333% */
    letter-spacing: 0.2px;
`;
const AvailableBalance = styled.section`
    color: var(--Neutral-Color-Ecobank-Dark-Gray, #4e4e4e);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.5px;
    span {
        color: var(--Neutral-Color-Ecobank-Dark-Gray, #4e4e4e);
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: 0.5px;
    }
`;
const BoxBorder = styled.section`
    border-radius: 5px;
    border: 0.25px solid #979797;
    padding: 24px 16px;
    h3 {
        color: var(--Neutral-Color-Ecobank-Dark-Gray, #4e4e4e);
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: 0.2px;
    }
`;

const BoxContainer = styled.section`
    padding: 24px 23px 40px 23px;
    background: white;
    width: 55%;
    border-radius: 12px;
    background-color: white;
    select {
        border-radius: 8px;
        border: 1px solid rgba(108, 207, 0, 0.31);
        background: #f4f4f4;
        position: relative;
        ::after {
            content: 'Rasgeed';
            position: absolute;
            top: 0;
            z-index: 100;
        }
    }
`;
const Label = styled.label`
    margin-bottom: 8px;
    color: #7a7978;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display: inline-block;
`;
const Flex = styled.section`
    display: flex;
    align-items: center;
    gap: 20px;
    div {
        flex: 1 0 0;
    }
`;
