import React, { useState } from 'react';
import Signup from '../../../pages/Auth/SignUp';
import styles from './styles.module.css';
const Visbility = ({ typeSet, color }) => {
    const [type, setType] = useState(true);
    const [visible, setVisible] = useState(false);
    const visibilityToggle = () => {
        setVisible((prev) => !prev);
        setType((prev) => !prev);
        typeSet(type);
    };

    return (
        <>
            <span
                className="material-symbols-outlined"
                id={color !== 'green' ? styles.notGreen : styles.green}
                style={{
                    zIndex: '10',
                    fontWeight: '300',
                    fontSize: '21px',

                    cursor: 'pointer'
                }}
                onClick={visibilityToggle}
            >
                {visible ? 'visibility' : 'visibility_off'}
            </span>
        </>
    );
};
export default Visbility;
