import React from 'react';
import styled from 'styled-components';
import CloseBtnSvg from '../../ReusableComponents/ClosebtnSvg';
import styles from './styles.module.css';

const PopupStyle = styled.div`
    width: 48%;
    max-width: 600px;
    background-color: white;
    border-radius: 20px;
    margin: 32px auto;
    display: flex;
    position: absolute;
    top: 10%;
    left: 40%;
    z-index: 10;
`;

const Popup = ({ children, overlay, action, title }) => {
    return (
        <div className={overlay ? styles.mainOverlay : styles.noshow}>
            <PopupStyle>
                <div className={styles.header}>
                    <CloseBtnSvg classes={styles.closeBtn} action={action} />
                    <div className={styles.body}>
                        <h2>{title}</h2>
                        {children}
                    </div>
                </div>
            </PopupStyle>
        </div>
    );
};

export default Popup;
