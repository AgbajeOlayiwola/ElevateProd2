import React from 'react';
import styles from './styles.module.css';

const Progressbar = ({ progressCount, height, bgcolor, progWidth }) => {
    const Parentdiv = {
        height: height,
        width: '100%',
        backgroundColor: 'rgba(108, 207, 0, 0.2)',
        borderRadius: 40
    };

    const Childdiv = {
        height: '100%',
        width: progressCount,
        backgroundColor: bgcolor,
        borderRadius: 40,
        textAlign: 'right'
    };
    const container = {
        width: progWidth,
        height: '8px'
    };
    return (
        <div style={container}>
            <div style={Parentdiv}>
                <div style={Childdiv}></div>
            </div>
        </div>
    );
};

export default Progressbar;
