import React from 'react';
import Link from 'next/link';

const ButtonComp = ({
    width,
    height,
    type,
    onClick,
    text,
    fontWeight,
    backgroundColor,
    color,
    margin
}) => {
    return (
        <button
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
    );
};

export default ButtonComp;
