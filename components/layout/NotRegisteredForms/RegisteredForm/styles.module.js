import styled from 'styled-components';

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
    display: block;
    margin-bottom: 0.5rem;
`;
export const FormInput = styled.input`
    ::placeholder {
        font-style: normal;
        font-weight: 400;
        font-size: 0.4;
        line-height: 19px;
        color: #7a7978;
    }
`;
export const InputWrapper = styled.div`
    margin-top: 24px;
`;
