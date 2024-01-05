import React from 'react';
import styled from 'styled-components';
import IconWhatsApp from '../IconComponents/IconWhatsApp';
import IconLinkedin from '../IconComponents/IconLinkedin';
import IconFacebook from '../IconComponents/IconFacebook';
import IconSpaceX from '../IconComponents/IconSpaceX';
import IconCopy from '../IconComponents/IconCopy';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ShareComponent = () => {
  const showToastMessage = () => {
    toast.success( 'Invoice link copied to clipboard', {
      position: toast.POSITION.TOP_RIGHT,
      className: 'toast-message'
    } );
  };
  return (
    <div>
      <ToastContainer />
      <Title>Share invoice link</Title>
      <section style={ { textAlign: "center", marginBottom: 12, color: '#000000' } }>Share link via:</section>
      <FlexContainer>
        <IconWhatsApp style={ { cursor: 'pointer' } } />
        <IconLinkedin style={ { cursor: 'pointer' } } />
        <IconFacebook style={ { cursor: 'pointer' } } />
        <IconSpaceX style={ { cursor: 'pointer' } } />
      </FlexContainer>
      <FlexShareText>
        <input value={ 'mySMEApp.com/invoice#JND-456...' } />
        <ShareButton
          onClick={ () => {
            {
              navigator.clipboard
                .writeText( `mySMEApp.com/invoice#JND-456...` )
                .then( () => {
                  // setAlert( true );
                  setTimeout( () => {
                    // setAlert( false );
                  }, 1500 );
                } );
            }
            showToastMessage();
          } }
        >
          <IconCopy />
          <a>Share</a>
        </ShareButton>
      </FlexShareText>
    </div>
  );
};

export default ShareComponent;

const Title = styled.section`
    color: var(--Color-Black500, #000b0f);
    text-align: center;
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 32px;
`;
const FlexShareText = styled.section`
    display: flex;
    align-items: center;
    input {
        color: #121212;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;
        border: 1px solid
            var(--Secondary-Color-Midnight-Blue-Highlight, #00567b);
        height: 56px;
        flex: 1;
        border-right: none !important;
        background-color: white;
    }
`;
const ShareButton = styled.section`
    display: flex;
    column-gap: 8px;
    align-items: center;
    height: 56px;
    border-radius: 0px 8px 8px 0px;
    background: rgba(16, 37, 114, 0.1);
    padding-left: 12px;
    padding-right: 12px;
    cursor: pointer;
    border: 0.5px solid #102572;
`;
const FlexContainer = styled.section`
    display: flex;
    align-items: center;
    column-gap: 20px;
    justify-content: center;
    margin-bottom: 32px;
`;
