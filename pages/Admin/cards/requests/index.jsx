import React from 'react'
import { FlexContainer } from '../../../../components/Invoices/InvoicesStyle'
import IconArrowBack from '../../../../components/ReusableComponents/IconComponents/IconArrowBack'
import EmptyState from '../../../../components/EmptyState'
import IconEmptyRequest from '../../../../components/ReusableComponents/IconComponents/IconEmptyRequest'
import RequestCardTable from '../../../../components/Cards/RequestCardTable'
import InvoiceHeader from '../../../../components/Invoices/InvoiceHeader'
import { useRouter } from 'next/router'
import styled from 'styled-components';

const RequestPage = () => {
  const router = useRouter()
  return (
    <div>
      <Flex>
        <FlexContainer style={ { margin: 0 } } onClick={ () => router.push( "/Admin/cards/requests/form" ) }>
          <IconArrowBack />
          <p>Card request</p>
        </FlexContainer>
        <button style={ { width: '150px' } }>Request a card</button>
      </Flex>
      <InvoiceHeader showUtilze={ false } title='Card request history' />
      <RequestCardTable />
      <EmptyState btnText='Request a card' icon={ <IconEmptyRequest /> } path='/Admin/cards/requests/form' message='You are yet to make a card request. Your card requests<br>will appear here once you do.' />
    </div>
  )
}

export default RequestPage

const Flex = styled.section`
display: flex;
align-items: center;
justify-content: space-between;
`