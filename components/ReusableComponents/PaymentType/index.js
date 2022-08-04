import React from 'react';
import styles from './styles.module.css';
import styled from 'styled-components';
import PaymentSingle from '../PaymentSingle';

const StyledHeader = styled.h2`
    color: ${(props) => props.color};
    font-size: 14px;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    line-height: 17px;
`;

const PaymentType = ({
    paymentType,
    color,
    link1,
    text1,
    link2,
    text2,
    link3,
    text3,
    link4,
    text4,
    textColor
}) => {
    return (
        <>
            <div className={styles.paymentTypeCont}>
                <StyledHeader color={color}>{paymentType}</StyledHeader>
                <div className={styles.paymentTypeBody}>
                    <PaymentSingle
                        link1={link1}
                        text1={text1}
                        link2={link2}
                        text2={text2}
                        link3={link3}
                        text3={text3}
                        link4={link4}
                        text4={text4}
                        textColor={textColor}
                    />
                </div>
            </div>
        </>
    );
};

export default PaymentType;
