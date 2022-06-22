import React from 'react';
import Link from 'next/link';

const ButtonComp = ({ link, text, type }) => {
    return <button type={type}>{text}</button>;
};

export default ButtonComp;
