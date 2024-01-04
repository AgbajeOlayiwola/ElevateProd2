import React, { useState } from 'react';
import styled from 'styled-components';
import IconDelete from '../../ReusableComponents/IconComponents/IconDelete';
import { PriceFlexContainer, ScrollAreas, TextArea, Words } from './Product';
import {
  Flex,
  SaveAndContinueFlex,
  SaveAsDraft,
  SelectCustomerText,
  Seperator,
  UploadContainer
} from '../InvoicesStyle';
import Modal from '../../ReusableComponents/Modal';
import IconNaira from '../../ReusableComponents/IconComponents/IconNaira';
import Previewer from '../../ReusableComponents/UploadPlaceholder/previewer';
import { UploadPlaceholder } from '../../ReusableComponents/UploadPlaceholder';
import IconRemove from '../../ReusableComponents/IconComponents/IconRemove';
import IconAdd from '../../ReusableComponents/IconComponents/IconAdd';
import AddTax from './AddTax';
const TaxDiscount = ( { nextPage } ) => {
  const [showAddProduct, setShowAddProduct] = useState( false );
  const [selectedOption, setSelectedOption] = useState( false )
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
    <section>
      <ItemsAdded>Items added</ItemsAdded>
      <ScrollAreas height={ 200 }>
        <Box>
          <FlexContainer>
            <ItemName>
              Gucci Leather Bag...<span>x2</span>
            </ItemName>

            <Amount>N45,000.00</Amount>
            <IconDelete handleDelete={ () => null } />
          </FlexContainer>
        </Box>
        <Box>
          <FlexContainer>
            <ItemName>
              Gucci Leather Bag...<span>x2</span>
            </ItemName>

            <Amount>N45,000.00</Amount>
            <IconDelete handleDelete={ () => null } />
          </FlexContainer>
        </Box>
      </ScrollAreas>
      <Seperator width={ 100 } />
      <TextBtn onClick={ () => setShowAddProduct( true ) }>+ Add New</TextBtn>
      <Dashed></Dashed>
      <FleSubTotal>
        <p>SubTotal</p>
        <AmountSubTotal>N45,000.00</AmountSubTotal>
      </FleSubTotal>
      <DiscountTaxFlexContainer>
        <RemoveBtn onClick={ () => setSelectedOption( "AddTax" ) }>
          <IconRemove />
          Remove tax
        </RemoveBtn>
        <AddBtn>
          <IconAdd /> Add discount
        </AddBtn>
      </DiscountTaxFlexContainer>
      <FleSubTotal>
        <p>
          Tax (VAT): <Span>7.5%</Span>
        </p>
        <section>
          <AmountTax>+N4,5500.00</AmountTax>
          <section className="edit">Edit</section>
        </section>
      </FleSubTotal>
      <FleSubTotal>
        <p>
          Discount: <Span>7.5%</Span>
        </p>
        <section>
          <AmountTax>+N4,5500.00</AmountTax>
          <section className="edit">Edit</section>
        </section>
      </FleSubTotal>
      <Dashed></Dashed>
      <FleSubTotal>
        <p>Grand total</p>
        <TotalAmount>N45,000.00</TotalAmount>
      </FleSubTotal>
      <SaveAndContinueFlex style={ { marginTop: '32px' } }>
        <p>
          Not creating now? <SaveAsDraft>Save as Draft</SaveAsDraft>
        </p>
        <button style={ { width: 176, marginTop: 0 } } onClick={ nextPage }>
          Save and Continue
        </button>
      </SaveAndContinueFlex>
      { selectedOption === "AddTax" && (
        <Modal size="product"
          onClose={ () => setSelectedOption( "" ) }>
          <AddTax />
        </Modal>
      ) }
      { showAddProduct && (
        <Modal
          size={ 'product' }
          onClose={ () => setShowAddProduct( false ) }
        >
          <ScrollAreas height={ 400 }>
            <SelectCustomerText>
              Add a new product
            </SelectCustomerText>
            <div
              style={ { marginTop: '24px', marginBottom: '24px' } }
            >
              <label
                style={ {
                  marginBottom: '8px',
                  display: 'inline-block'
                } }
              >
                Product name
              </label>
              <input
                type="text"
                placeholder="Enter customer’s name"
              />
            </div>
            <div
              style={ { marginTop: '24px', marginBottom: '24px' } }
            >
              <label>Price of product</label>
              <PriceFlexContainer>
                <IconNaira />
                <input
                  type="text"
                  placeholder="Enter customer’s email address"
                  value={ '00,000.00' }
                />
              </PriceFlexContainer>
              <Seperator width={ 100 } />
            </div>
            <div style={ { marginTop: '24px' } }>
              <label style={ { display: 'block' } }>
                Product description (optional)
              </label>
              <TextArea type="text" />
              <Words>0/50 words</Words>
            </div>
            <Flex>
              { imageURL === '' ? (
                <UploadPlaceholder
                  handleUpload={ handleImageUpload }
                  title="Upload product image"
                  type="image"
                />
              ) : (
                <Previewer
                  imageURL={ imageURL }
                  onClick={ () => setImageURL( '' ) }
                />
              ) }
            </Flex>
          </ScrollAreas>
          <button style={ { marginTop: 16 } }>Add product</button>
        </Modal>
      ) }
    </section>
  );
};

export default TaxDiscount;

const TotalAmount = styled.section`
    color: var(--Color-Black400, #001e28);
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
`;
const AmountTax = styled.section`
    color: #455a64;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const Span = styled.span`
    color: #121212;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;
const DiscountTaxFlexContainer = styled.section`
    display: flex;
    align-items: center;
    margin-top: 16px;
    column-gap: 20px;
`;
const RemoveBtn = styled.section`
    display: flex;
    align-items: center;
    column-gap: 6px;
    cursor: pointer;
    display: flex;
    height: 48px;
    padding: 16px 24px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 1px solid #f00;
    background: #fff;
    flex: 1 0 0;
    color: #f00;
    text-align: center;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;
const AddBtn = styled.section`
    display: flex;
    align-items: center;
    column-gap: 6px;
    cursor: pointer;
    display: flex;
    height: 48px;
    padding: 16px 24px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 1px solid var(--primary-deepBlue, #102572);
    background: #fff;
    flex: 1 0 0;
    color: #102572;
    text-align: center;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;
const FleSubTotal = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 16px;
    p {
        margin: 0;
        color: #7a7978;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    .edit {
        color: var(--primary-deepBlue, #102572);
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        text-align: right;
        text-decoration-line: underline;
        cursor: pointer;
    }
`;
const TextBtn = styled.div`
    color: #6c6c6c;
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;
    margin-top: 16px;
    margin-bottom: 24px;
`;
const Dashed = styled.div`
    stroke-width: 0.5px;
    border-bottom: 1.5px dashed #000;
    width: 100%;
    opacity: 0.4;
    height: 20px;
`;
const FlexContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Amount = styled.section`
    color: #455a64;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
`;
const AmountSubTotal = styled.section`
    color: #455a64;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;
const ItemsAdded = styled.section`
    color: var(--primary-deepBlue, #102572);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: 24px;
    margin-bottom: 24px;
`;
const Box = styled.section`
    border-radius: 8px;
    background: #fdfdfd;
    box-shadow: 0px 0px 30px 0px rgba(224, 224, 224, 0.71);
    padding: 18px;
    margin-bottom: 16px;
`;
const ItemName = styled.section`
    color: #102572;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    span {
        color: #455a64;
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;
