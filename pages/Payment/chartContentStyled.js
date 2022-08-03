import styled from 'styled-components';
const ChartContent = styled.div`
    width: ${(props) => props.width};
    margin-left: -14px;
    text-align: center;
    p {
        color: ${(props) => props.color};
        font-size: 14px;
        font-weight: 500;
        font-family: 'Inter', sans-serif;
        line-height: 16px;
        margin: 0px;
    }
    h4 {
        font-size: 14px;
        font-weight: 500;
        font-family: 'Inter', sans-serif;
        line-height: 16px;
        color: #3e3e3e;
        margin: 0px;
    }
`;

export default ChartContent;
