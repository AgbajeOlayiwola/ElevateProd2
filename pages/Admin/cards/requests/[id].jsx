import React from 'react';
import {
  Amount,
  BoxBorder,
  BoxContainer,
  Flex,
  TextLeft,
  TextRight,
  TotalAmount
} from './form';
import {
  FlexContainer,
  Seperator
} from '../../../../components/Invoices/InvoicesStyle';
import { Dashed } from '../../../../components/Invoices/CreateInvoice/TaxDiscount';
import styled from 'styled-components';
import IconArrowBack from '../../../../components/ReusableComponents/IconComponents/IconArrowBack';
import Progressbar from '../../../../components/ReusableComponents/Progressbar';
import VerticalProgressTracker from '../../../../components/ReusableComponents/Progress';
import { useRouter } from 'next/router';
const RequestDetails = () => {
  const router = useRouter()
  return (
    <>
      <FlexContainer onClick={ () => router.push( '/Admin/cards/requests' ) }>
        <IconArrowBack />
        <p>Card details</p>
      </FlexContainer>

      <ParentFlexContainer>
        <BoxContainer>
          <BoxBorder>
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

            <Seperator
              width={ '100%' }
              style={ { marginBottom: 12 } }
            />
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
            <Seperator
              width={ '100%' }
              style={ { marginBottom: 12 } }
            />
            <Flex
              style={ {
                justifyContent: 'space-between',
                marginBottom: 12
              } }
            >
              <TextLeft>Request date</TextLeft>
              <TextRight>12/12/2021</TextRight>
            </Flex>
            <Flex
              style={ {
                justifyContent: 'space-between',
                marginBottom: 12
              } }
            >
              <TextLeft>Request ID</TextLeft>
              <TextRight>CRD891827</TextRight>
            </Flex>
            <Flex
              style={ {
                justifyContent: 'space-between',
                marginBottom: 12
              } }
            >
              <TextLeft>Request status</TextLeft>
              <Status color="#121212" bg="#FFC43D">
                Processing
              </Status>
            </Flex>
            <Seperator
              width={ '100%' }
              style={ { marginBottom: 12 } }
            />

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
                alignItems: 'flex-start',
                marginTop: 12
              } }
            >
              <TotalAmount>Total amount to pay</TotalAmount>
              <Flex
                style={ {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  rowGap: 0
                } }
              >
                <Amount>NGN 3,908.98</Amount>
                <Status color="#FFFFFF" bg="#549E04">
                  Paid
                </Status>
              </Flex>
            </Flex>
          </BoxBorder>
        </BoxContainer>
        <VerticalProgressTracker />
      </ParentFlexContainer>
    </>
  );
};

export default RequestDetails;


const Status = styled.section`
    display: flex;
    height: 16px;
    padding: 4px 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 200px;
    background: ${ ( props ) => ( props.bg ? props.bg : props.bg ) };
    color: ${ ( props ) => ( props.color ? props.color : props.color ) };
    text-align: center;
    font-family: Inter;
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;
const ParentFlexContainer = styled.section`
    display: flex;
    align-items: flex-start;
    column-gap: 28px;
`;
