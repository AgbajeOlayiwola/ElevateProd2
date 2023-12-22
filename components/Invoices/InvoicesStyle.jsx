import styled from 'styled-components';

export const TableContainer = styled.table`
    border-collapse: collapse;
    border: none;
    width: 100%;
    margin-top: 10px;
    cursor: pointer;
    table-layout: auto !important;
    white-space: nowrap;
`;

export const Thead = styled.thead`
    color: #a6afc2;
    padding-top: 10px;
    display: table;
    width: 100%;
    table-layout: fixed;
    & tr > th {
        color: #455a64;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 16px;
        text-align: left;
        position: relative;
    }
    &::after {
        line-height: 1rem;
        content: '.';
        color: white;
        display: block;
    }
`;
export const TheadRow = styled.tr`
    & th {
        &:first-of-type {
            padding-left: 30px;
            padding-right: 0;
        }
    }
`;

export const TableBody = styled.tbody`
    background: white;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow-x: hidden;
    display: block;
    & tr {
        display: table;
        width: 100%;
    }
    max-height: 300px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 5px;
    }
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb {
        background: #666666;
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #666666;
    }
`;
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
            padding-right: 20px;
        }
        &:nth-child(6) {
            text-align: center;
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

export const StatusFlexContainer = styled.div`
    display: flex;
    align-items: center;
    column-gap: 8px;
`;
export const CircleBox = styled.div`
    background-color: ${ ( props ) =>
        props.color ? `${ props.color }` : '#BF4F74' };
    box-shadow: 0px 0px 37px 0px rgba(157, 147, 147, 0.12);
    width: 8px;
    height: 8px;
    border-radius: 100%;
`;
export const CustomText = styled.p`
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    margin: 0;
    font-weight: 500;
    line-height: normal;
    color: ${ ( props ) => ( props.color ? `${ props.color }` : '#BF4F74' ) };
`;
export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    column-gap: 8px;
    margin-bottom: 34px;
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

export const FormContainer = styled.form`
    & label {
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        color: #7a7978;
        font-family: Inter;
        margin-bottom: 8px;
    }
    .flex-container {
        display: flex;
        column-gap: 20px;
    }
    .first_date-col {
        flex: 0.5;
    }
    .second_date-col {
        flex: 0.5;
    }
    p {
        margin-top: 0px;
        margin-bottom: 12px;
        color: #2b4551;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
    .biller {
        color: #2b4551;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin-top: 24px;
    }
`;
export const InventoryDetailsBox = styled.section`
    margin-bottom: 20px;
    margin-top: 24px;
    p {
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        color: #102572;
        margin: 0;
    }
`;

export const Seperator = styled.div`
    height: 1px;
    background-color: #e4e4e4;
    width: ${ ( props ) => ( props.width ? `${ props.width }%` : '100%' ) };
`;
export const NotificationContainer = styled.section`
    display: flex;
    align-items: center;
    font-weight: 500;
    column-gap: 8px;
    margin-top: 3px;
    font-size: 14px;
    p {
        margin: 0;
        color: #7a7978;
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;
export const CreatNewCustomer = styled.section`
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-decoration-line: underline;
    color: #102572;
    margin-top: 12px;
    cursor: pointer;
`;

export const SelectCustomer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    padding-left: 16px;
    padding-right: 16px;
    cursor: pointer;
    height: 52px;
    border-radius: 8px;
    background: #f4f4f4;
    &:after {
        content: ${ ( props ) =>
        props.hasPlaceholder === false
            ? `url("data:image/svg+xml,%3Csvg width='11' height='6' viewBox='0 0 11 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.6665 1L5.6665 5L9.6665 1' stroke='%230B0C7D' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");`
            : props.hasPlaceholder === undefined &&
            `url("data:image/svg+xml,%3Csvg width='9' height='6' viewBox='0 0 9 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.33334 1.4001L4.53334 4.6001L7.73334 1.4001' stroke='%23A6AFC2' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A")` };
        position: absolute;
        right: 15px;
        top: 15px;
    }
`;
export const SelectCustomerText = styled.div`
    color: #111;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top: 10px;
`;
export const SubText = styled.div`
    color: #111;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;
export const InputWrapper = styled.input`
    margin-top: 20px;
    background: white;
    position: relative;
`;
export const TitleAlphabet = styled.div`
    color: #121212;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    margin-bottom: 12px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.14px;
`;
export const CustomerListContainer = styled.div`
    margin-top: 16px;
`;
export const CustomerListContainerFlex = styled.div`
    border-radius: 8px;
    border: 1.5px solid #ededed;
    display: flex;
    align-items: center;
    column-gap: 12px;
    padding: 16px;
`;
export const TitleName = styled.div`
    color: #121212;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.14px;
`;
export const VStack = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 16px;
`;
export const SubtitleMail = styled.span`
    color: #464646;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.12px;
`;
export const SubTitleContactContainer = styled.span`
    display: flex;
    align-items: center;
    column-gap: 2px;
`;
export const Circle = styled.span`
    width: 4px;
    height: 4px;
    background-color: #d8d7d7;
    border-radius: 100%;
`;
export const SubTitleContact = styled.span`
    color: #464646;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.12px;
`;
export const SaveAndContinueFlex = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
        color: #707070;
        text-align: center;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;
export const SaveAsDraft = styled.span`
    color: #005b82;
    font-family: Inter;
    cursor: pointer;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;
export const BtnSpanFlex = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    padding: 2px 8px;
    column-gap: 4px;
    border-radius: 4px;
    border: 1px solid var(--primary-deepBlue, #102572);
    background: rgba(16, 37, 114, 0.15);
    cursor: pointer;
    margin-top: 12px;
    margin-bottom: 12px;
`;
export const UploadContainer = styled.div`
    position: relative;
    font-family: 'General Sans', sans-serif;
    border-radius: 5px;
    border: 0.5px solid #005b82;
    width: 364px;
    height: 144px;
    background: rgba(0, 91, 130, 0.05);
    img{
        height:144px;
        width: 100%;
        object-fit: cover;
    }
`;
export const IconPencilContainer = styled.div`
position: absolute;
right: -4px;
top: -6px;
background-color: white;
padding:2px ;
border-radius: 50%;
width: 36px;
height: 36px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
`;
export const Flex = styled.section`
display: flex;
align-items: center;
justify-content: center;
`
export const BtnSpan = styled.span`
    color: var(--primary-deepBlue, #102572);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

export const FlexBadgeContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 12px;
`;
