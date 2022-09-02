import React from 'react';

const CircleSvg = ({ circleStatus, action }) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={action}
        >
            <rect
                x="0.5"
                y="0.5"
                width="19"
                height="19"
                rx="9.5"
                fill={circleStatus === true ? '#6CCF00' : '#F8F8F8'}
                stroke="#7A7978"
            />
        </svg>
    );
};

export default CircleSvg;
