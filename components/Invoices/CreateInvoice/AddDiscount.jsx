import React from 'react';
import { SelectCustomerText } from '../InvoicesStyle';
import styled from 'styled-components';
const AddDiscount = () => {
  return (
    <section>
      <section>
        <SelectCustomerText>Add discount</SelectCustomerText>
        <div style={ { marginTop: '24px', marginBottom: '24px' } }>
          <label
            style={ { marginBottom: '8px', display: 'inline-block' } }
          >
            Discount type
          </label>
          <FlexContainer>
            <CheckboxWrapper>
              <CheckRadioContainer>
                <input
                  type="radio"
                  name={ `Discount type` }
                  value={ 'true' }
                  checked={ true }
                // onChange={ () =>
                //   handleCheckboxChange(
                //     index,
                //     'hasPharmacy',
                //     true
                //   )
                // }
                />
              </CheckRadioContainer>
              <span>Percentage</span>
            </CheckboxWrapper>

            <CheckboxWrapper>
              <CheckRadioContainer>
                <input
                  type="radio"
                  name={ `Discount type` }
                  value={ 'true' }
                  checked={ true }
                // onChange={ () =>
                //   handleCheckboxChange(
                //     index,
                //     'hasPharmacy',
                //     true
                //   )
                // }
                />
              </CheckRadioContainer>
              <span>Amount</span>
            </CheckboxWrapper>
          </FlexContainer>
        </div>
        <div style={ { marginTop: '24px', marginBottom: '24px' } }>
          <label
            style={ { marginBottom: '8px', display: 'inline-block' } }
          >
            Enter amount off $
          </label>
          <section style={ { position: 'relative' } }>
            <PercentageContainer
              type="text"
              placeholder="Enter customer’s email address"
              value={ '1,200' }
            />
          </section>
        </div>
        <button>Add discount</button>
      </section>
    </section>
  );
};

export default AddDiscount;

const FlexContainer = styled.section`
    display: flex;
    align-items: center;
`;
const PercentageContainer = styled.input`
    position: relative;
    width: 100%;
    box-sizing: border-box;
    &::after {
        content: '%';
        position: absolute;
        top: 50%;
        right: 10px; /* Adjust as needed */
        transform: translateY(-50%);
        color: #000; /* Adjust the color as needed */
        font-weight: bold; /* Adjust as needed */
    }
`;
const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    flex: 1 0 0;
    border-radius: 5px 0px 0px 5px;
    border-top: 1px solid #e4e4e4;
    border-right: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
     border-left: 1px solid #e4e4e4;
    padding: 10px 12px;
    & > span {
        display: inline-block;
        margin-left: 12px;
        color: var(--Neutral-Color-Ecobank-Dark-Gray, #4e4e4e);
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
    }
`;
const CheckRadioContainer = styled.label`
    & input[type='radio'] {
        appearance: none;
        background-color: white;
        margin: 0;
        font: inherit;
        color: #cdd8f3;
        border: 1px solid #cdd8f3;
         width: 24px !important;
        height: 24px !important;
        padding:10px ;
        border-radius: 50%;
        display: grid;
        place-content: center;
        font-family: 'General Sans';
        box-sizing: border-box;
    }
    & input[type='radio']:checked {
        appearance: none;
        margin: 0;
        box-sizing: border-box;
        font: inherit;
        color: #cdd8f3;
        width: 20px;
        height: 20px;
        border: 1px solid #0b0c7d;
        border-radius: 50%;
        display: grid;
        place-content: center;
        font-family: Inter;
    }
    & input[type='radio']::before {
        content: '';
        width: 14px;
        height: 14px;
        border-radius: 50%;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em #0b0c7d;
        font-family: 'General Sans';
    }

    & input[type='radio']:checked::before {
        transform: scale(1);
    }
`;
