import React from 'react';
import Link from 'next/link';

const ButtonComp = ({ link, text }) => {
    return (
        <Link href={link}>
            <button>{text}</button>
        </Link>
    );
};

export default ButtonComp;
