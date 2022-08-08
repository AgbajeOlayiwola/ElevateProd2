import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';

const LoaderStyled = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-item: center;
`;

const Loader = () => {
    return (
        <LoaderStyled>
            <ThreeDots color="#6ccf00" height="100" width="100" />
        </LoaderStyled>
    );
};

export default Loader;
