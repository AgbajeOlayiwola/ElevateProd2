import React, { useState } from 'react';
import Signup from '../../../pages/Auth/SignUp';
import styles from './styles.module.css';
const Visbility = ({ typeSet }) => {
    const [type, setType] = useState(true);
    const [visible, setVisible] = useState(true);
    const visibilityToggle = () => {
        setVisible((prev) => !prev);
        setType((prev) => !prev);
        typeSet(type);
    };

    return (
        <>
            <span
                className="material-symbols-outlined"
                style={{
                    marginLeft: '-46px',
                    zIndex: '10',
                    marginTop: '22px',
                    fontWeight: '300',
                    fontSize: '21px',
                    color: '#7A7978',
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
