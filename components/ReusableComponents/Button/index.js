import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';
import Loader from '../Loader';

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
    disabled,
    err,
    loads
}) => {
    //console.log(disabled);
    const [loading, setLoading] = useState(false);
    //console.log('loading', loads);

    useEffect(() => {
        setLoading(loads);
    }, [loads]);

    useEffect(() => {
        if (err) {
            setLoading((prevState) => !prevState);
        }
    }, [err]);
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
                    {loading ? <Loader /> : text}
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
