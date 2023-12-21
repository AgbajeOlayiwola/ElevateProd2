import React from 'react';

const MoreSvg = ({ fillColor }) => {
    return (
        <>
            {fillColor ? (
                <svg
                    width="21"
                    height="22"
                    viewBox="0 0 21 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5.94036 12.5046C6.31377 12.5046 6.67189 12.3536 6.93593 12.0849C7.19997 11.8162 7.3483 11.4517 7.3483 11.0717C7.3483 10.6916 7.19997 10.3271 6.93593 10.0584C6.67189 9.78968 6.31377 9.63871 5.94036 9.63871C5.56695 9.63871 5.20884 9.78968 4.9448 10.0584C4.68076 10.3271 4.53242 10.6916 4.53242 11.0717C4.53242 11.4517 4.68076 11.8162 4.9448 12.0849C5.20884 12.3536 5.56695 12.5046 5.94036 12.5046ZM10.1642 12.5046C10.5376 12.5046 10.8957 12.3536 11.1598 12.0849C11.4238 11.8162 11.5721 11.4517 11.5721 11.0717C11.5721 10.6916 11.4238 10.3271 11.1598 10.0584C10.8957 9.78968 10.5376 9.63871 10.1642 9.63871C9.79078 9.63871 9.43266 9.78968 9.16862 10.0584C8.90458 10.3271 8.75625 10.6916 8.75625 11.0717C8.75625 11.4517 8.90458 11.8162 9.16862 12.0849C9.43266 12.3536 9.79078 12.5046 10.1642 12.5046ZM15.796 11.0717C15.796 11.4517 15.6476 11.8162 15.3836 12.0849C15.1195 12.3536 14.7614 12.5046 14.388 12.5046C14.0146 12.5046 13.6565 12.3536 13.3925 12.0849C13.1284 11.8162 12.9801 11.4517 12.9801 11.0717C12.9801 10.6916 13.1284 10.3271 13.3925 10.0584C13.6565 9.78968 14.0146 9.63871 14.388 9.63871C14.7614 9.63871 15.1195 9.78968 15.3836 10.0584C15.6476 10.3271 15.796 10.6916 15.796 11.0717ZM20.0198 11.0717C20.0198 16.6114 15.6073 21.1023 10.1642 21.1023C4.72108 21.1023 0.308594 16.6114 0.308594 11.0717C0.308594 5.53188 4.72108 1.04102 10.1642 1.04102C15.6073 1.04102 20.0198 5.53188 20.0198 11.0717ZM18.6118 11.0717C18.6118 6.32358 14.8294 2.47396 10.1642 2.47396C5.49897 2.47396 1.71654 6.32358 1.71654 11.0717C1.71654 15.8197 5.49897 19.6694 10.1642 19.6694C14.8294 19.6694 18.6118 15.8197 18.6118 11.0717Z"
                        fill="#407A00"
                        stroke="#407A00"
                        strokeWidth="0.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ) : (
                <svg
                    width="21"
                    height="22"
                    viewBox="0 0 21 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5.94036 12.5046C6.31377 12.5046 6.67189 12.3536 6.93593 12.0849C7.19997 11.8162 7.3483 11.4517 7.3483 11.0717C7.3483 10.6916 7.19997 10.3271 6.93593 10.0584C6.67189 9.78968 6.31377 9.63871 5.94036 9.63871C5.56695 9.63871 5.20884 9.78968 4.9448 10.0584C4.68076 10.3271 4.53242 10.6916 4.53242 11.0717C4.53242 11.4517 4.68076 11.8162 4.9448 12.0849C5.20884 12.3536 5.56695 12.5046 5.94036 12.5046ZM10.1642 12.5046C10.5376 12.5046 10.8957 12.3536 11.1598 12.0849C11.4238 11.8162 11.5721 11.4517 11.5721 11.0717C11.5721 10.6916 11.4238 10.3271 11.1598 10.0584C10.8957 9.78968 10.5376 9.63871 10.1642 9.63871C9.79078 9.63871 9.43266 9.78968 9.16862 10.0584C8.90458 10.3271 8.75625 10.6916 8.75625 11.0717C8.75625 11.4517 8.90458 11.8162 9.16862 12.0849C9.43266 12.3536 9.79078 12.5046 10.1642 12.5046ZM15.796 11.0717C15.796 11.4517 15.6476 11.8162 15.3836 12.0849C15.1195 12.3536 14.7614 12.5046 14.388 12.5046C14.0146 12.5046 13.6565 12.3536 13.3925 12.0849C13.1284 11.8162 12.9801 11.4517 12.9801 11.0717C12.9801 10.6916 13.1284 10.3271 13.3925 10.0584C13.6565 9.78968 14.0146 9.63871 14.388 9.63871C14.7614 9.63871 15.1195 9.78968 15.3836 10.0584C15.6476 10.3271 15.796 10.6916 15.796 11.0717ZM20.0198 11.0717C20.0198 16.6114 15.6073 21.1023 10.1642 21.1023C4.72108 21.1023 0.308594 16.6114 0.308594 11.0717C0.308594 5.53188 4.72108 1.04102 10.1642 1.04102C15.6073 1.04102 20.0198 5.53188 20.0198 11.0717ZM18.6118 11.0717C18.6118 6.32358 14.8294 2.47396 10.1642 2.47396C5.49897 2.47396 1.71654 6.32358 1.71654 11.0717C1.71654 15.8197 5.49897 19.6694 10.1642 19.6694C14.8294 19.6694 18.6118 15.8197 18.6118 11.0717Z"
                        fill="#CCCCCC"
                        stroke="#CCCCCC"
                        strokeWidth="0.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </>
    );
};

export default MoreSvg;
