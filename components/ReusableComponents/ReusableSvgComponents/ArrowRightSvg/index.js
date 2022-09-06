import React from 'react';

const ArrowRightSvg = ({ action }) => {
    return (
        <svg
            width="5"
            height="9"
            viewBox="0 0 5 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={action}
        >
            <path
                d="M1 1.57227L4 4.57227L1 7.57227"
                stroke="#102572"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ArrowRightSvg;
