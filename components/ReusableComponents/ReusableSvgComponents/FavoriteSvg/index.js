import React from 'react';

const FavoriteSvg = () => {
    return (
        <svg
            width="85"
            height="84"
            viewBox="0 0 85 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_d_10271_37115)">
                <ellipse
                    cx="42.025"
                    cy="42"
                    rx="14.9864"
                    ry="15"
                    fill="white"
                />
            </g>
            <g clipPath="url(#clip0_10271_37115)">
                <path
                    d="M41.1814 38.9365L42.0252 40.2638L42.8691 38.9365C43.4716 37.9889 44.5388 37.375 45.7718 37.375C47.6915 37.375 49.2678 38.9514 49.2678 40.875C49.2678 41.6994 48.8849 42.6173 48.1732 43.5887C47.4691 44.5497 46.5085 45.4735 45.5129 46.2888C44.5223 47.1001 43.5266 47.78 42.7759 48.2581C42.4822 48.4452 42.2275 48.6004 42.0271 48.7197C41.8264 48.5995 41.5712 48.4429 41.2768 48.2543C40.5258 47.7731 39.5297 47.0895 38.5386 46.2756C37.5426 45.4577 36.5814 44.5323 35.8768 43.5722C35.1641 42.601 34.7827 41.6884 34.7827 40.875C34.7827 38.9514 36.359 37.375 38.2786 37.375C39.5117 37.375 40.5789 37.9889 41.1814 38.9365Z"
                    stroke="#549E04"
                    strokeWidth="2"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_10271_37115"
                    x="0.0385742"
                    y="0"
                    width="83.9727"
                    height="84"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feMorphology
                        radius="4"
                        operator="dilate"
                        in="SourceAlpha"
                        result="effect1_dropShadow_10271_37115"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="11.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.411765 0 0 0 0 0.580392 0 0 0 0 0.0509804 0 0 0 0.1 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_10271_37115"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_10271_37115"
                        result="shape"
                    />
                </filter>
                <clipPath id="clip0_10271_37115">
                    <rect
                        width="17.9837"
                        height="18"
                        fill="white"
                        transform="translate(33.0332 33)"
                    />
                </clipPath>
            </defs>
        </svg>
    );
};

export default FavoriteSvg;
