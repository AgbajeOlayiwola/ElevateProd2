import React from 'react';
import styles from './styles.module.css';
import { TableContainer, TbodyRow, Thead, TheadRow, TableBody, StatusFlexContainer, CircleBox, CustomText } from './InvoicesStyle';

const InvoiceTable = () => {
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
        <TbodyRow>
          <td>1</td>
          <td>12/12/2021</td>
          <td colSpan={ 2 }>JND-AGS57</td>
          <td colSpan={ 3 }>Isaac Akinyemi, Fortune Ekezie.</td>
          <td>₵300,000</td>
          <td colSpan={ 2 }>4</td>
          <td>
            <StatusFlexContainer>
              <CircleBox CircleBox color="#F5A623"></CircleBox>
              <CustomText color="#F5A623">Pending</CustomText>
            </StatusFlexContainer>
          </td>
        </TbodyRow>
        <TbodyRow>
          <td>2</td>
          <td>12/12/2021</td>
          <td colSpan={ 2 }>JND-AGS57</td>
          <td colSpan={ 3 }>Isaac Akinyemi, Fortune Ekezie.</td>
          <td>₵300,000</td>
          <td colSpan={ 2 }>10</td>
          <td>
            <StatusFlexContainer>
              <CircleBox CircleBox color="#F5A623"></CircleBox>
              <CustomText color="#F5A623">Pending</CustomText>
            </StatusFlexContainer>
          </td>
        </TbodyRow>
        <TbodyRow>
          <td>3</td>
          <td>12/12/2021</td>
          <td colSpan={ 2 }>JND-AGS57</td>
          <td colSpan={ 3 }>Isaac Akinyemi, Fortune Ekezie.</td>
          <td>₵300,000</td>
          <td colSpan={ 2 }>6</td>
          <td>
            <StatusFlexContainer>
              <CircleBox CircleBox color="#F5A623"></CircleBox>
              <CustomText color="#F5A623">Pending</CustomText>
            </StatusFlexContainer>
          </td>
        </TbodyRow>
        <TbodyRow>
          <td>4</td>
          <td>12/12/2021</td>
          <td colSpan={ 2 }>JND-AGS57</td>
          <td colSpan={ 3 }>Isaac Akinyemi, Fortune Ekezie.</td>
          <td>₵300,000</td>
          <td colSpan={ 2 }>6</td>
          <td>
            <StatusFlexContainer>
              <CircleBox CircleBox color="#F5A623"></CircleBox>
              <CustomText color="#F5A623">Pending</CustomText>
            </StatusFlexContainer>
          </td>
        </TbodyRow>
        <TbodyRow>
          <td>5</td>
          <td>12/12/2021</td>
          <td colSpan={ 2 }>JND-AGS57</td>
          <td colSpan={ 3 }>Isaac Akinyemi, Fortune Ekezie.</td>
          <td>₵300,000</td>
          <td colSpan={ 2 }>6</td>
          <td>
            <StatusFlexContainer>
              <CircleBox CircleBox color="#F5A623"></CircleBox>
              <CustomText color="#F5A623">Pending</CustomText>
            </StatusFlexContainer>
          </td>
        </TbodyRow>
      </TableBody>
    </TableContainer>
  );
};

export default InvoiceTable;
