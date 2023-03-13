import React from 'react';

const AccountChecked = ({ statusInfo }) => {
    return (
        <svg
            width="30"
            height="31"
            viewBox="0 0 30 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15 30.6797C23.2843 30.6797 30 23.964 30 15.6797C30 7.39542 23.2843 0.679688 15 0.679688C6.71573 0.679688 0 7.39542 0 15.6797C0 23.964 6.71573 30.6797 15 30.6797Z"
                fill={
                    statusInfo === 'notDone'
                        ? '#DBDBDB'
                        : statusInfo === 'done'
                        ? '#6ccf00'
                        : statusInfo === 'comment'
                        ? 'red'
                        : statusInfo === 'APPROVED'
                        ? '#6ccf00'
                        : '#DBDBDB'
                }
            />
            <path
                d="M23.7993 8.53038C22.8139 7.51681 21.1861 7.51681 20.2007 8.53038L12.0833 16.8797C11.7639 17.2083 11.2361 17.2083 10.9167 16.8797L9.79929 15.7304C8.81387 14.7168 7.18613 14.7168 6.20071 15.7304C5.25379 16.7044 5.25379 18.255 6.20071 19.229L7.91502 20.9923C9.87841 23.0118 13.1216 23.0118 15.085 20.9923L23.7993 12.029C24.7462 11.055 24.7462 9.50437 23.7993 8.53038Z"
                fill="white"
            />
        </svg>
    );
};

export default AccountChecked;
