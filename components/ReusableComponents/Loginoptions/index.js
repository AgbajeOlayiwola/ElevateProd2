import React, { useState } from 'react';
import styles from './styles.module.css';

const LoginOption = ({ children }) => {
    const [active, setActive] = useState(false);
    return (
        <>
            <div
                className={active ? styles.notActive : styles.active}
                onClick={() => setActive((prevState) => !prevState)}
            >
                {children}
                {/* <Image
                    src="/Assets/Images/omni.png"
                    width={30}
                    height={30}
                    alt="omnilite"
                /> */}
            </div>
        </>
    );
};

export default LoginOption;
