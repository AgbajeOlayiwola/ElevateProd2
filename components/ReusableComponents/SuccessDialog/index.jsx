import React from 'react';
import Success from '../Success';
import styled from 'styled-components';
import { useRouter } from 'next/router';
const SuccessDialog = ( {
  btnComponent,
  path = '',
  btnText = 'Go to invoice',
  title = 'Invoice created successfully',
  subTitle = 'You have successfully created an invoice',
  message = 'We have emailed the customers. You can also share invoice <b>#ISC-78095</b> with customers now.'
} ) => {
  const router = useRouter()
  return (
    <div>
      <FlexThreeContainer>
        <Success width="200" height="159" />
      </FlexThreeContainer>
      <section>
        <InvoiceTitle>{ title }</InvoiceTitle>
        <SubTitle>{ subTitle }</SubTitle>
        <Message
          dangerouslySetInnerHTML={ { __html: message } }
        ></Message>
      </section>
      { btnComponent }
      { !btnComponent &&
        <Button onClick={ () => router.push( path ) }>{ btnText }</Button> }
    </div>
  );
};

export default SuccessDialog;

const FlexThreeContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const InvoiceTitle = styled.section`
    color: #2b4551;
    text-align: center;
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;
const Button = styled.section`
    color: #fff;
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    display: flex;
    width: 100%;
    height: 48px;
    padding: 18px 56px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: var(--primary-green, #6ccf00);
    cursor: pointer;
`;
const SubTitle = styled.section`
    color: #3e3e3e;
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    margin-top: 12px;
`;
const Message = styled.section`
    color: #3e3e3e;
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    margin-top: 24px;
    margin-bottom: 24px;
`;
