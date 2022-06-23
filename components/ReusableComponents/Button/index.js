import React from 'react';
import Link from 'next/link';

const ButtonComp = ({ width, height, type, text, backgroundColor, color }) => {
    return (
        <button style={{ width, height, backgroundColor, color }} type={type}>
            {text}
        </button>
    );
};

export default ButtonComp;
