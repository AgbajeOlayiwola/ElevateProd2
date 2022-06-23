import styled from 'styled-components';

export const BodyWrapper = styled.div`
    padding-top: 5rem;
    padding-bottom: 5rem;
`;
export const CardContainer = styled.div`
    width: 50%;
    height: 1010px;
    margin: 0 auto;
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
`;
export const LeftHeading = styled.h3`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
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
    margin: 0 auto;
`;
