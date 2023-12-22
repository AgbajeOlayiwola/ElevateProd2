import styled from 'styled-components';
export const UploadPlaceholderBox = styled.section`
    margin-top: 24px;
    p {
        color: #3e3e3e;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-bottom: 12px;
        margin-top: 0px;
    }
    .stroke-box {
        border-radius: 5px;
        border: 1px dashed #102572;
        position: relative;
        background: rgba(0, 91, 130, 0.05);
        display: flex;
        width: 364px;
        height: 136px;
        justify-content: center;
        align-items: center;
        & input[type='file'] {
            position: absolute;
            z-index: 200;
            opacity: 0;
            right: 0;
            top: 35px;
            padding: 0;
            width: 100%;
            height: 72px;
        }
    }
    .caution {
        color: #121212;
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin-top: 8px;
    }
    a {
        color: #102572;
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        display: block;
        margin-top: 8px;
    }
`;
