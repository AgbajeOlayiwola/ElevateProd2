import React from 'react';
import {
    TableContainer,
    Thead,
    TheadRow,
    TableBody,
    StatusFlexContainer,
    CircleBox,
    CustomText
} from '../Invoices/InvoicesStyle';
import styled from 'styled-components';
import { useRouter } from 'next/router';

export const TbodyRow = styled.tr`
    padding: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border: 8px solid white;
    & td {
        padding-bottom: 22px;
        padding-top: 22px;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;

        &:first-of-type {
            padding-left: 20px;
            padding-right: 0;
        }
        &:last-child {
            section {
                text-align: left;
            }
        }
        &:nth-child(6) {
            text-align: left;
        }
        &:nth-child(5) {
            font-weight: 600;
        }
        &:nth-child(3) {
            font-weight: 500;
        }
    }
    display: table;
    width: 100%;
    table-layout: fixed;
`;
const RequestCardTable = () => {
    const router = useRouter();
    return (
        <TableContainer>
            <Thead>
                <TheadRow>
                    <th>S/N</th>
                    <th>DATE</th>
                    <th>REQUEST ID</th>
                    <th>CARD TYPE</th>
                    <th>HOLDER NAME</th>
                    <th>DELIVERY MODE</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                </TheadRow>
            </Thead>
            <TableBody>
                <TbodyRow>
                    <td>1</td>
                    <td>12/12/2021</td>
                    <td>CRD-687621</td>
                    <td>Master Card</td>
                    <td>Isaac Aknyemi</td>
                    <td>Home delivery</td>
                    <td>
                        <StatusFlexContainer>
                            <CircleBox CircleBox color="#F5A623"></CircleBox>
                            <CustomText color="#F5A623">Pending</CustomText>
                        </StatusFlexContainer>
                    </td>
                    <td>
                        {' '}
                        <View
                            onClick={() =>
                                router.push(`/Admin/cards/requests/${1}`)
                            }
                        >
                            View
                        </View>
                    </td>
                </TbodyRow>
                <TbodyRow>
                    <td>2</td>
                    <td>12/12/2021</td>
                    <td>CRD-687621</td>
                    <td>Visa</td>
                    <td>Isaac Akinyemi</td>
                    <td>Ecobank branch</td>
                    <td>
                        <StatusFlexContainer>
                            <CircleBox CircleBox color="#6CCF00"></CircleBox>
                            <CustomText color="#6CCF00">Completed</CustomText>
                        </StatusFlexContainer>
                    </td>
                    <td>
                        <View
                            onClick={() =>
                                router.push(`/Admin/cards/requests/${2}`)
                            }
                        >
                            View
                        </View>
                    </td>
                </TbodyRow>
            </TableBody>
        </TableContainer>
    );
};

export default RequestCardTable;

const View = styled.section`
    color: var(--Color-Black500, #000b0f);
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-decoration-line: underline;
    cursor: pointer;
`;
