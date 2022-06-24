import styled from 'styled-components';

export const BodyWrapper = styled.div`
    padding-top: 5rem;
    padding-bottom: 5rem;
`;
export const CardContainer = styled.div`
    width: 50%;
    height: auto;
    margin: 0 auto;
    padding-bottom: 5%;
    background: #fefefe;
    border: 1px solid rgba(219, 219, 219, 0.6);
    box-shadow: 0px 0px 74px -10px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
`;
// Card heading wrapper styling
export const CardHeading = styled.div`
    display: flex;
    flex-flow: wrap;
    justify-content: space-evenly;
    align-items: baseline;
    margin-top: 76px;
    width: 100%;
`;
export const LeftHeading = styled.h3`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    justify-content: space-evenly;
    /* identical to box height */
    color: #005b82;
`;
export const RegistrationStatus = styled.div`
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10%;
`;
export const RegStatusHeading = styled.h6`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #3e3e3e;
    margin-left: auto;
    margin-right: auto;
`;
export const ButtonWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    margin-top: 1rem;
    background: #f8f8f8;
`;
export const ToggleNo = styled.span`
    width: 50%;
    height: 50px;
    background: #6ccf00;
    border-radius: 12px;
    cursor: pointer;
`;
export const ToggleYes = styled.span`
    width: 40%;
    height: 50px;
    border-radius: 12px;
    background: #f8f8f8;
    cursor: pointer;
`;
export const ToggleNoText = styled.p`
    text-align: center;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #ffffff;
`;
export const ToggleYesText = styled.p`
    text-align: center;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #a5a5a5;
`;
