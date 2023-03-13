import React from 'react';
import styles from './styles.module.css';
import styled from 'styled-components';

const StyledP = styled.p`
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    font-family: 'Inter', sans-serif;
    line-height: 14px;
    display: block;
    margin-top: 16px;
    color: ${(props) => props.textColor};
    cursor: pointer;
`;

const PaymentSingle = ({
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
        <div className={styles.PaymentSingle}>
            <div className={styles.paymentSingleBody}>
                <div>
                    <div className={styles.paymentSingleImg}>
                        <img src={link1} alt="logo" />
                    </div>
                    <div className={styles.paymentSingleText}>
                        <StyledP
                            textColor={textColor}
                            onClick={(e) => {
                                //console.loge.target);
                            }}
                        >
                            {text1}
                        </StyledP>
                    </div>
                </div>
            </div>
            <div className={styles.paymentSingleBody}>
                <div>
                    <div className={styles.paymentSingleImg}>
                        <img src={link2} alt="logo" />
                    </div>
                    <div className={styles.paymentSingleText}>
                        <StyledP textColor={textColor}>{text2}</StyledP>
                    </div>
                </div>
            </div>
            <div className={styles.paymentSingleBody}>
                <div>
                    <div className={styles.paymentSingleImg}>
                        <img src={link3} alt="logo" />
                    </div>
                    <div className={styles.paymentSingleText}>
                        <StyledP textColor={textColor}>{text3}</StyledP>
                    </div>
                </div>
            </div>
            <div className={styles.paymentSingleBody}>
                <div>
                    <div className={styles.paymentSingleImg}>
                        <img src={link4} alt="logo" />
                    </div>
                    <div className={styles.paymentSingleText}>
                        <StyledP textColor={textColor}>{text4}</StyledP>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSingle;
