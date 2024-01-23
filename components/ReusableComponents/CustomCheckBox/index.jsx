import React from "react";
import styled from "styled-components";

const CustomCheckBox = ( {
  isChecked,
  handleChange,
  id,
  variantbg,
} ) => {
  return (
    <CheckBoxContainerGrand>
      <CheckBoxContainer
        checked={ isChecked }
        onClick={ () => handleChange?.( id ) }
        className={ variantbg ? "isWhite" : "istransperant" }
      >
        <input type="checkbox" name="agreement" checked={ isChecked } onChange={ () => handleChange?.( id ) } />
        <RoundedChecked checked={ isChecked }></RoundedChecked>
      </CheckBoxContainer>
    </CheckBoxContainerGrand>
  );
};

export default CustomCheckBox;
export const CheckBoxContainerGrand = styled.div`
position: relative;
    z-index:200;
  & input[type="checkbox"] {
    position: absolute;
    opacity: 0.1;
    padding: 0;
    min-width: 20px;
    min-height: 20px;
    width: 20px;
    height: 20px;
    z-index:200;
    background: white;
    appearance: none;
  }
`;

export const CheckBoxContainer = styled.div`
  border: ${ ( props ) => ( props.checked ? `1px solid #102572` : `1px solid #828282` ) };
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
  width: 20px;
  height: 20px;
  z-index: 0;
  &.isWhite {
    background-color: white;
  }
`;
export const RoundedChecked = styled.div`
  background: ${ ( props ) => ( props.checked ? `#102572` : "" ) };
  transition: all 0.7s ease-in-out;
  min-width: 12px;
  cursor: pointer;
  min-height: 12px;
  border-radius: 2px;
  position: absolute;
`;
