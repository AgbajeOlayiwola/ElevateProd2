import React from 'react';

const PhoneSvg = ({ color }) => {
    return (
        <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_10271_35315)">
                <path
                    d="M5 4.57812H9L11 9.57812L8.5 11.0781C9.57096 13.2497 11.3285 15.0072 13.5 16.0781L15 13.5781L20 15.5781V19.5781C20 20.1086 19.7893 20.6173 19.4142 20.9923C19.0391 21.3674 18.5304 21.5781 18 21.5781C14.0993 21.3411 10.4202 19.6846 7.65683 16.9213C4.8935 14.158 3.23705 10.4789 3 6.57812C3 6.04769 3.21071 5.53898 3.58579 5.16391C3.96086 4.78884 4.46957 4.57813 5 4.57812"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M15 7.57812C15.5304 7.57813 16.0391 7.78884 16.4142 8.16391C16.7893 8.53898 17 9.04769 17 9.57812"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M15 3.57812C16.5913 3.57813 18.1174 4.21027 19.2426 5.33548C20.3679 6.4607 21 7.98683 21 9.57812"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_10271_35315">
                    <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0 0.578125)"
                    />
                </clipPath>
            </defs>
        </svg>
    );
};

export default PhoneSvg;
