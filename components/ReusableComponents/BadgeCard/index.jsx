import React from 'react';
import styled from 'styled-components';

const BadgeCardFlexContainer = styled.div`
    display: flex;
    border-radius: 200px;
    align-items: center;
    justify-content: space-between;
    column-gap: 8px;
    padding: 4px 12px;
    border: 1px solid var(--primary-deepBlue, #102572);
    background: rgba(16, 37, 114, 0.05);
    width: fit-content;
    span {
        color: var(--primary-deepBlue, #102572);
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
`;

const BadgeCard = ( { title, onClick } ) => {
    return (
        <BadgeCardFlexContainer>
            <span>{ title }</span>
            <svg
                width={ 20 }
                height={ 20 }
                style={ { cursor: 'pointer' } }
                onClick={ onClick }
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15.8334 5.34297L14.6584 4.16797L10 8.8263L5.34169 4.16797L4.16669 5.34297L8.82502 10.0013L4.16669 14.6596L5.34169 15.8346L10 11.1763L14.6584 15.8346L15.8334 14.6596L11.175 10.0013L15.8334 5.34297Z"
                    fill="#102572"
                />
            </svg>
        </BadgeCardFlexContainer>
    );
};

export default BadgeCard;
