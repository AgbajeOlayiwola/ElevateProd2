import React from 'react';

const LoginCircleSvg = ({ action, circleStatus }) => {
    return (
        <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={action}
        >
            <rect
                x="1"
                y="1"
                width="14.6897"
                height="14.8687"
                rx="7.34485"
                fill={circleStatus === true ? '#6CCF00' : '#F8F8F8'}
                stroke="#A5A5A5"
                strokeWidth="2"
            />
        </svg>
    );
};

export default LoginCircleSvg;
