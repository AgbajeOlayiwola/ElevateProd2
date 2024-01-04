import React from 'react';
import styled from 'styled-components';
const Review = () => {
    return (
        <section>
            <Text>
                ***This is how the customer will see your invoice when you send
                it it them.
            </Text>
        </section>
    );
};

export default Review;

const Text = styled.section`
    color: #2b4551;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    margin-top: 16px;
`;
