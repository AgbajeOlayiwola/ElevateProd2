import React from 'react';
import { SelectCustomerText } from '../InvoicesStyle';
import styled from 'styled-components';
const AddTax = () => {
  return (
    <section>
      <SelectCustomerText>Add tax</SelectCustomerText>
      <div style={ { marginTop: '24px', marginBottom: '24px' } }>
        <label style={ { marginBottom: '8px', display: 'inline-block' } }>Tax code name</label>
        <select id="selectElement">
          <option value="" selected disabled style={ { color: '#A5A5A5', fontWeight: 400, fontSize: "14px" } }>VAT (Value Added Tax)</option>
          <option value="VAT (Value Added Tax)">VAT (Value Added Tax)</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
          <option value="option4">Option 4</option>
        </select>
      </div>
      <div style={ { marginTop: '24px', marginBottom: '24px' } }>
        <label style={ { marginBottom: '8px', display: 'inline-block' } }>Tax code name %</label>
        <StyledInput
          type="text"
          placeholder="Enter customer’s email address"
          value={ '7.5' }
        />
      </div>
      <button>Add tax</button>
    </section>
  );
};

export default AddTax;
const StyledInput = styled.input`
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
