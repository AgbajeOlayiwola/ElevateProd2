import React from 'react';
import CreateInvoice from '../../../../components/Invoices/CreateInvoice/CreateInvoice';
import IconArrowBack from '../../../../components/ReusableComponents/IconComponents/IconArrowBack';
import styled from 'styled-components';
import EmptyState from '../../../../components/EmptyState';
import InvoiceTable from '../../../../components/Invoices/InvoiceTable';
import InvoiceHeader from '../../../../components/Invoices/InvoiceHeader';
import { useRouter } from 'next/router';

const CreatEReceipt = () => {
  const router = useRouter()
  return (
    <div>
      <FlexContainer onClick={ () => router.push( '/Admin/Invoices' ) }>
        <IconArrowBack />
        <section>
          <p>eReceipt</p>
        </section>
      </FlexContainer>
      <Span style={ { display: 'block' } }>
        You can generate eReceipt for only paid invoices.
      </Span>
      <EmptyState message='You have no paid invoices yet.You can only generate<br>eReceipts for paid invoices.' btnText='Go to eInvoices' path='/Admin/Invoices' />
      <InvoiceHeader title='Paid invoices' />
      <InvoiceTable />
    </div>
  );
};

export default CreatEReceipt;

const FlexContainer = styled.section`
    display: flex;
    align-items: center;
    column-gap: 8px;
    cursor: pointer;
    p {
        color: #005b82;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        margin: 0;
    }
`;
const Span = styled.span`
    color: #252525;
    font-family: Inter;
    margin-top: 4px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
`;
