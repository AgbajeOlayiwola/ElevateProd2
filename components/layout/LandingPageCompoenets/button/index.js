import React from 'react';
import styles from './styles.module.css';
const ButttonComponet = ({ border, text }) => {
    return (
        <div className={border ? styles.noborderbutton : styles.borderbutton}>
            <p>{text}</p>
        </div>
    );
};

export default ButttonComponet;
