import styled from 'styled-components';
const ChartDiv = styled.div`
    width: ${(props) => props.width};
    background-color: ${(props) => props.bg};
    border-radius: 8px 8px 8px 8px;
    height: 100%;
    margin-left: -14px;
    z-index: ${(props) => props.zIndex};
`;
export default ChartDiv;
