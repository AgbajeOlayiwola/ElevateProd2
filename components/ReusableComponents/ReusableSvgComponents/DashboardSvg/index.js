import React from 'react';

const DashboardSvg = ({ fill, stroke }) => {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5.8 1H2.6C1.71634 1 1 1.71634 1 2.6V15.4C1 16.2837 1.71634 17 2.6 17H5.8C6.68366 17 7.4 16.2837 7.4 15.4V2.6C7.4 1.71634 6.68366 1 5.8 1Z"
                stroke={stroke}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15.4016 1H12.2016C11.3179 1 10.6016 1.71634 10.6016 2.6V5.8C10.6016 6.68366 11.3179 7.4 12.2016 7.4H15.4016C16.2852 7.4 17.0016 6.68366 17.0016 5.8V2.6C17.0016 1.71634 16.2852 1 15.4016 1Z"
                stroke={stroke}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15.4016 10.5996H12.2016C11.3179 10.5996 10.6016 11.316 10.6016 12.1996V15.3996C10.6016 16.2833 11.3179 16.9996 12.2016 16.9996H15.4016C16.2852 16.9996 17.0016 16.2833 17.0016 15.3996V12.1996C17.0016 11.316 16.2852 10.5996 15.4016 10.5996Z"
                stroke={stroke}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default DashboardSvg;
