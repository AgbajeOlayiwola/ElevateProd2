import Image from 'next/image';
import React from 'react';
import styles from './styles.module.css';

const Reference = () => {
    return (
        <div className={styles.referenceCont}>
            <div className={styles.referenceHead}>
                <h2>REFERENCE FORM</h2>
                <Image
                    src="/./Assets/Images/ecobankLogo.png"
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    );
};

export default Reference;
