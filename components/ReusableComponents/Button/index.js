import React from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

const ButtonComp = ({
    width,
    height,
    type,
    onClick,
    text,
    fontWeight,
    backgroundColor,
    color,
    margin,
    active,
    disabled
}) => {
<<<<<<< HEAD
=======
    // console.log(disabled);

>>>>>>> f21270a01ddb88307e4492b5fd706f7a6fa3dfcd
    return (
        <>
            {disabled ? (
                <button
                    className={
                        active == 'active' ? styles.abled : styles.disabled
                    }
                    style={{
                        width,
                        height,
                        backgroundColor,
                        fontWeight,
                        color,
                        margin
                    }}
                    type={type}
                    onClick={onClick}
                >
                    {text}
                </button>
            ) : (
                <button
                    className={
                        active == 'active' ? styles.abled : styles.disabled
                    }
                    style={{
                        width,
                        height,
                        backgroundColor,
                        fontWeight,
                        color,
                        margin
                    }}
                    type={type}
                    disabled
                >
                    {text}
                </button>
            )}
        </>
    );
};

export default ButtonComp;
