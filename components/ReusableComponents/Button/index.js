import React, { useEffect, useState } from 'react';
import Loader from '../Loader';
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
    disabled,
    err,
    loads
}) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(loads);
    }, [loads]);
    useEffect(() => {
        if (err) {
            setLoading(false);
        }
    }, [err]);
    return (
        <>
            {disabled ? (
                <button
                    className={
                        active == 'active' || loads
                            ? styles.abled
                            : styles.disabled
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
                    disabled={loads}
                >
                    {loading ? <Loader /> : text}
                </button>
            ) : (
                <button
                    className={
                        active == 'active' || loads
                            ? styles.abled
                            : styles.disabled
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
