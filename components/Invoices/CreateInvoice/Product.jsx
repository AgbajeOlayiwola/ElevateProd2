import React from 'react';
import styled from 'styled-components';
import IconSearch from '../../ReusableComponents/IconComponents/IconSearch';
import { FlexBadgeContainer } from '../InvoicesStyle';
import CustomDropdown from '../../CustomSelect';
const options = ['Item 1', 'Item 2', 'Item 3'];
const Product = () => {
  return (
    <>
      <InputWrapper>
        <div>
          <IconSearch />
        </div>
        <input placeholder="...Search for an item" />

      </InputWrapper>
      <FlexBadgeContainer style={ { marginTop: '20px' } }>
        <section>
          <CustomDropdown options={ options } />
        </section>
        <section>
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
              Select items
            </option>
            <option value="option1" defaultValue={ 'All items' }>All items</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
          </select>
        </section>
      </FlexBadgeContainer>
    </>

  );
};

export default Product;

const InputWrapper = styled.div`
    position: relative;
    margin-top: 24px;
    div {
        position: absolute;
        top: 18px;
        left: 16px;
        z-index: 10;
    }
    input {
        background-color: white;
        padding-left: 40px;
    }
`;
