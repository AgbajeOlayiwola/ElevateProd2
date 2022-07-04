import React, { useState } from 'react';

const SideBarHomeSvg = ({ fillColor }) => {
    console.log(fillColor);
    return (
        <>
            {fillColor ? (
                <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3.26409 10.553H1.29297L10.163 1.52539L19.033 10.553H17.0619"
                        stroke="#407A00"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M3.06641 10.5527V17.5742C3.06641 18.1062 3.27408 18.6165 3.64373 18.9927C4.01339 19.369 4.51475 19.5803 5.03753 19.5803H14.8931C15.4159 19.5803 15.9173 19.369 16.2869 18.9927C16.6566 18.6165 16.8642 18.1062 16.8642 17.5742V10.5527"
                        stroke="#407A00"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M12.329 10.5527H8.38672V14.565H12.329V10.5527Z"
                        stroke="#407A00"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
                        d="M3.26409 10.553H1.29297L10.163 1.52539L19.033 10.553H17.0619"
                        stroke="#CCCCCC"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M3.06641 10.5527V17.5742C3.06641 18.1062 3.27408 18.6165 3.64373 18.9927C4.01339 19.369 4.51475 19.5803 5.03753 19.5803H14.8931C15.4159 19.5803 15.9173 19.369 16.2869 18.9927C16.6566 18.6165 16.8642 18.1062 16.8642 17.5742V10.5527"
                        stroke="#CCCCCC"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M12.329 10.5527H8.38672V14.565H12.329V10.5527Z"
                        stroke="#CCCCCC"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            )}
        </>
    );
};

export default SideBarHomeSvg;
