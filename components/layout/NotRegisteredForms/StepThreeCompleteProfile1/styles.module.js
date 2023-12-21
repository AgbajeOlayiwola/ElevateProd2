import styled from 'styled-components';

export const CardContainer = styled.div`
    width: 50%;
    height: auto;
    background: #fefefe;
    border: 1px solid rgba(219, 219, 219, 0.6);
    box-shadow: 0px 0px 74px -10px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
`;

export const SmallCardContainer = styled.div``;

export const CardHeadingBVN = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: baseline;
`;
export const ProgressBar = styled.h6`
    margin-right: 40%;
`;
export const SmallInstructionText = styled.h6`
    width: 53%;
    height: 68px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 23px;
    /* or 141% */
    color: #005b82;
    text-align: left;
    margin-left: 19%;
`;

export const LeftHeading = styled.h3`
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    margin: 0px;
    color: #102572;
`;

export const RegisteredCardWrapper = styled.div`
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding-bottom: 5%;
    padding-bottom: 5%;
    background: #fefefe;
    border: 1px solid rgba(219, 219, 219, 0.6);
    box-shadow: 0px 0px 74px -10px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
`;

export const Label = styled.label`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #3e3e3e;
`;
export const FormInput = styled.input`
    margin-top: 0.5rem;
    margin-bottom: 16px;
`;
export const InputWrapper = styled.div`
    margin-top: 1.4rem;
`;

export const ResetOTP = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
`;

// THE SWITCH STYLE
export const RegStatusHeading = styled.h6`
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #3e3e3e;
    margin-left: auto;
    margin-right: auto;
`;
export const ButtonWrapper = styled.div`
    border-radius: 12px;
    display: flex;
    width: 100%;
    margin-top: 32px;

    // @media screen and (max-width: 701px) {
    //     flex-direction:column;
    // }
`;
export const ToggleNo = styled.span`
    width: 50%;
    height: 50px;
    border-radius: 12px;
    cursor: pointer;
    background: rgba(108, 207, 0, 0.3);
    &:hover {
        background: rgba(108, 207, 0, 0.3);
    }
`;
export const ToggleYes = styled.span`
    width: 50%;
    height: 50px;
    border-radius: 12px;
    background: #f8f8f8;
    cursor: pointer;
    &:hover {
        background: rgba(108, 207, 0, 0.3);
    }
`;
export const ToggleNoText = styled.p`
    text-align: center;
    font-style: normal;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    color: #407a00;
    font-weight: 700;
`;
export const ToggleYesText = styled.p`
    text-align: center;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    color: #a5a5a5;
`;

export const GenderWrapper = styled.div`
    width: 100%;
    flex-flow: row wrap;
    margin-top: 2rem;
`;

export const LastFieldAndButton = styled.div`
    width: 100%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1.5rem;
`;
