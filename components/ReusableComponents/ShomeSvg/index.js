import React from 'react';

const SideBarHomeSvg = ({ fillColor }) => {
    // //// console.logfillColor);
    return (
        <>
            {fillColor ? (
                <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 10.6621H7C7.55 10.6621 8 10.2121 8 9.66211V1.66211C8 1.11211 7.55 0.662109 7 0.662109H1C0.45 0.662109 0 1.11211 0 1.66211V9.66211C0 10.2121 0.45 10.6621 1 10.6621ZM1 18.6621H7C7.55 18.6621 8 18.2121 8 17.6621V13.6621C8 13.1121 7.55 12.6621 7 12.6621H1C0.45 12.6621 0 13.1121 0 13.6621V17.6621C0 18.2121 0.45 18.6621 1 18.6621ZM11 18.6621H17C17.55 18.6621 18 18.2121 18 17.6621V9.66211C18 9.11211 17.55 8.66211 17 8.66211H11C10.45 8.66211 10 9.11211 10 9.66211V17.6621C10 18.2121 10.45 18.6621 11 18.6621ZM10 1.66211V5.66211C10 6.21211 10.45 6.66211 11 6.66211H17C17.55 6.66211 18 6.21211 18 5.66211V1.66211C18 1.11211 17.55 0.662109 17 0.662109H11C10.45 0.662109 10 1.11211 10 1.66211Z"
                        fill="#407A00"
                    />
                </svg>
            ) : (
                <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 10.6621H7C7.55 10.6621 8 10.2121 8 9.66211V1.66211C8 1.11211 7.55 0.662109 7 0.662109H1C0.45 0.662109 0 1.11211 0 1.66211V9.66211C0 10.2121 0.45 10.6621 1 10.6621ZM1 18.6621H7C7.55 18.6621 8 18.2121 8 17.6621V13.6621C8 13.1121 7.55 12.6621 7 12.6621H1C0.45 12.6621 0 13.1121 0 13.6621V17.6621C0 18.2121 0.45 18.6621 1 18.6621ZM11 18.6621H17C17.55 18.6621 18 18.2121 18 17.6621V9.66211C18 9.11211 17.55 8.66211 17 8.66211H11C10.45 8.66211 10 9.11211 10 9.66211V17.6621C10 18.2121 10.45 18.6621 11 18.6621ZM10 1.66211V5.66211C10 6.21211 10.45 6.66211 11 6.66211H17C17.55 6.66211 18 6.21211 18 5.66211V1.66211C18 1.11211 17.55 0.662109 17 0.662109H11C10.45 0.662109 10 1.11211 10 1.66211Z"
                        fill="#CCCCCC"
                    />
                </svg>
            )}
        </>
    );
};

export default SideBarHomeSvg;
