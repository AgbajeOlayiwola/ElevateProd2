import React from 'react';

const Send = ({ color }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="20"
            viewBox="0 0 30 20"
            fill="none"
        >
            <path
                d="M7.925 5.025L14.1833 7.70833L7.91667 6.875L7.925 5.025ZM14.175 12.2917L7.91667 14.975V13.125L14.175 12.2917ZM6.25833 2.5L6.25 8.33333L18.75 10L6.25 11.6667L6.25833 17.5L23.75 10L6.25833 2.5Z"
                fill={color}
            />
        </svg>
    );
};

export default Send;
