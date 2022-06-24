import styled from 'styled-components';

export const BodyWrapper = styled.div`
    width: 100vh;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 2rem 3rem;
`;
// Card heading wrapper styling
export const CardHeading = styled.div`
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    align-items: baseline;4.7
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
export const RegistrationStatus = styled.div``;
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
    border-radius: 12px;
`;
export const ToggleNo = styled.span`
    width: 50%;
    height: 50px;
    background: #6ccf00;
    border-radius: 12px;
    cursor: pointer;
    &:hover {
        background: #6ccf00;
        transition: all 0.2s ease-in-out;
    }
`;
export const ToggleYes = styled.span`
    width: 50%;
    height: 50px;
    border-radius: 12px;
    background: #f8f8f8;
    cursor: pointer;
    &:hover {
        background: #6ccf00;
        transition: all 0.2s ease-in-out;
    }
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
