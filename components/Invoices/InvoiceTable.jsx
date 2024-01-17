import React from 'react';
import {
  TableContainer,
  TbodyRow,
  Thead,
  TheadRow,
  TableBody,
  StatusFlexContainer,
  CircleBox,
  CustomText
} from './InvoicesStyle';
import moment from 'moment';
const InvoiceTable = ( { data } ) => {
  return (
    <TableContainer>
      <Thead>
        <TheadRow>
          <th>S/N</th>
          <th>DATE</th>
          <th colSpan={ 2 }>INVOICE NUMBER</th>
          <th colSpan={ 3 }>CUSTOMER(S) </th>
          <th>AMOUNT</th>
          <th colSpan={ 2 }>NO OF PRODUCTS</th>
          <th>STATUS</th>
        </TheadRow>
      </Thead>
      <TableBody>
        { data?.map( ( value, index ) => {
          return (
            <TbodyRow key={ index }>
              <td>{ index + 1 }</td>
              <td>
                { ' ' }
                { moment( value?.invoiceCreatedAt ).format( 'l' ) }
              </td>
              <td colSpan={ 2 }>{ value?.generatedID }</td>
              <td colSpan={ 3 }>
                { value?.customers?.map( ( data, index ) => {
                  return (
                    <React.Fragment key={ index }>
                      { index > 0 && ', ' }
                      { data?.customerName }
                    </React.Fragment>
                  );
                } ) }
              </td>
              <td>₵{ value?.grandTotal }</td>
              <td colSpan={ 2 }>{ value?.items.length }</td>
              <td>
                <StatusFlexContainer>
                  <CircleBox
                    CircleBox
                    color={ getStatus( value.status ).color }
                  ></CircleBox>
                  <CustomText color={ getStatus( value.status ).color }>
                    { value?.status }
                  </CustomText>
                </StatusFlexContainer>
              </td>
            </TbodyRow>
          );
        } ) }
      </TableBody>
    </TableContainer>
  );
};

export default InvoiceTable;
const getStatus = ( status ) => {
  if ( status === "paid" ) {
    return { background: "#6CCF00", color: '#6CCF00' }
  }
  if ( status === "pending" ) {
    return { background: "#F5A623", color: '#F5A623' }
  }
  if ( status === "overdue" ) {
    return { background: "#FF0000", color: '#FF0000' }
  }
}
