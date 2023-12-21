import React from 'react';

const CloseButton = ({ action, classes, color }) => {
    return (
        <>
            <svg
                className={classes}
                onClick={action}
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M13.6302 0C10.9931 0 8.41527 0.781986 6.22261 2.24707C4.02996 3.71216 2.32099 5.79454 1.31182 8.23089C0.302652 10.6672 0.0386077 13.3481 0.553077 15.9345C1.06755 18.521 2.33742 20.8967 4.20212 22.7614C6.06682 24.6261 8.4426 25.896 11.029 26.4105C13.6154 26.9249 16.2963 26.6609 18.7327 25.6517C21.169 24.6426 23.2514 22.9336 24.7165 20.7409C26.1816 18.5483 26.9635 15.9704 26.9635 13.3333C26.9635 11.5824 26.6187 9.84856 25.9486 8.23089C25.2785 6.61321 24.2964 5.14336 23.0583 3.90524C21.8202 2.66713 20.3503 1.685 18.7327 1.01494C17.115 0.344877 15.3812 0 13.6302 0ZM17.2435 15.0533C17.3685 15.1773 17.4677 15.3248 17.5354 15.4872C17.6031 15.6497 17.6379 15.824 17.6379 16C17.6379 16.176 17.6031 16.3503 17.5354 16.5128C17.4677 16.6752 17.3685 16.8227 17.2435 16.9467C17.1196 17.0716 16.9721 17.1708 16.8096 17.2385C16.6472 17.3062 16.4729 17.3411 16.2969 17.3411C16.1209 17.3411 15.9466 17.3062 15.7841 17.2385C15.6216 17.1708 15.4742 17.0716 15.3502 16.9467L13.6302 15.2133L11.9102 16.9467C11.7863 17.0716 11.6388 17.1708 11.4763 17.2385C11.3138 17.3062 11.1396 17.3411 10.9635 17.3411C10.7875 17.3411 10.6133 17.3062 10.4508 17.2385C10.2883 17.1708 10.1408 17.0716 10.0169 16.9467C9.89191 16.8227 9.79272 16.6752 9.72503 16.5128C9.65733 16.3503 9.62248 16.176 9.62248 16C9.62248 15.824 9.65733 15.6497 9.72503 15.4872C9.79272 15.3248 9.89191 15.1773 10.0169 15.0533L11.7502 13.3333L10.0169 11.6133C9.76581 11.3623 9.62476 11.0217 9.62476 10.6667C9.62476 10.3116 9.76581 9.97107 10.0169 9.72C10.268 9.46893 10.6085 9.32788 10.9635 9.32788C11.3186 9.32788 11.6591 9.46893 11.9102 9.72L13.6302 11.4533L15.3502 9.72C15.6013 9.46893 15.9418 9.32788 16.2969 9.32788C16.6519 9.32788 16.9925 9.46893 17.2435 9.72C17.4946 9.97107 17.6357 10.3116 17.6357 10.6667C17.6357 11.0217 17.4946 11.3623 17.2435 11.6133L15.5102 13.3333L17.2435 15.0533Z"
                    fill={color}
                />
            </svg>
        </>
    );
};

export default CloseButton;
