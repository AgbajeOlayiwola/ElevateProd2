import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import styled from 'styled-components';
const Pagination = ( props ) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination( {
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  } );

  if ( currentPage === 0 || paginationRange.length < 2 ) {
    return null;
  }

  const onNext = () => {
    onPageChange( currentPage + 1 );
  };

  const onPrevious = () => {
    onPageChange( currentPage - 1 );
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <PaginationContainer
      className={ classnames( 'pagination-container', {
        [className]: className
      } ) }
    >
      <li
        className={ classnames( 'pagination-item', {
          disabled: currentPage === 1
        } ) }
        onClick={ onPrevious }
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1"
            y="1"
            width="24"
            height="24"
            rx="12"
            stroke="#545454"
          />
          <path
            d="M14.6667 8.83203L10.5 12.9987L14.6667 17.1654V8.83203Z"
            fill="#666666"
          />
        </svg>
      </li>
      { paginationRange.map( ( pageNumber ) => {
        if ( pageNumber === DOTS ) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={ classnames( 'pagination-item', {
              selected: pageNumber === currentPage
            } ) }
            onClick={ () => onPageChange( pageNumber ) }
          >
            { pageNumber }
          </li>
        );
      } ) }
      <li
        className={ classnames( 'pagination-item', {
          disabled: currentPage === lastPage
        } ) }
        onClick={ onNext }
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="25"
            y="25"
            width="24"
            height="24"
            rx="12"
            transform="rotate(-180 25 25)"
            stroke="#545454"
          />
          <path
            d="M11.3333 17.168L15.5 13.0013L11.3333 8.83463V17.168Z"
            fill="#666666"
          />
        </svg>
      </li>
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.ul`
    display: flex;
    list-style-type: none;
    padding-left: 0;
    cursor: pointer;
    .pagination-item {
        height: 24px;
        text-align: center;
        margin: 0 8px;
        align-items: center;
        justify-content: center;
        color: rgba(0, 0, 0, 0.87);
        display: flex;
        box-sizing: border-box;
        align-items: center;
        letter-spacing: 0.01071em;
        border-radius: 50%;
        font-weight: 400;
        font-size: 14px;
        min-width: 24px;

        &.dots:hover {
            background-color: transparent;
            cursor: default;
        }
        /* &:hover {
            background-color: rgba(0, 0, 0, 0.04);
            cursor: pointer;
        } */
        &.pagination-item:first-of-type {
            &:hover {
                background-color: none;
            }
        }
        &.selected {
            background-color: #102572;
            color: white;
            font-family: Inter;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: 1px;
        }

        .arrow {
            &::before {
                position: relative;
                /* top: 3pt; Uncomment this to lower the icons as requested in comments*/
                content: '';
                /* By using an em scale, the arrows will size with the font */
                display: inline-block;
                width: 0.4em;
                height: 0.4em;
                border-right: 0.12em solid rgba(0, 0, 0, 0.87);
                border-top: 0.12em solid rgba(0, 0, 0, 0.87);
            }

            &.left {
                transform: rotate(-135deg) translate(-50%);
            }

            &.right {
                transform: rotate(45deg);
            }
        }

        &.disabled {
            pointer-events: none;

            .arrow::before {
                border-right: 0.12em solid rgba(0, 0, 0, 0.43);
                border-top: 0.12em solid rgba(0, 0, 0, 0.43);
            }

            &:hover {
                background-color: transparent;
                cursor: default;
            }
        }
    }
`;
