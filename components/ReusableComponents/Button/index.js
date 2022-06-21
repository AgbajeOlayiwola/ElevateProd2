import React from 'react';
import Link from 'next/link';

const ButtonComp = ({link}) => {
    return (
        <Link href={link}>
            <button>Proceed</button>
        </Link>
    );
};

export default ButtonComp;
