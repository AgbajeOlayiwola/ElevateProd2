import React, { useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import Loader from '../../../components/ReusableComponents/Loader';
import { useDisputeHistoryMutation } from '../../../redux/api/authApi';
import styles from './styles.module.css';

const AllDisputes = () => {
    const dispatch = useDispatch();
    const usersPerPage = 10;
    const [allDisputes, setAllDisputes] = useState();
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * usersPerPage;
    const [
        disputeHistory,
        {
            data: disputeHistoryData,
            isLoading: disputeHistoryLoad,
            isSuccess: disputeHistorySuccess,
            isError: disputeHistoryFalse,
            error: disputeHistoryErr,
            reset: disputeHistoryReset
        }
    ] = useDisputeHistoryMutation();
    useEffect(() => {
        const data = {
            customerno: '120042331',
            sourcesystem: 'RAFIKI',
            onlyactivecases: 'true',
            maxcount: '100'
        };

        disputeHistory(data);
    }, []);
    function formatDateAndTime(inputDateTime) {
        const date = new Date(inputDateTime);

        // Extract individual components
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    return (
        <div className={styles.statementCover}>
            <div>
                <div className={styles.TableDetailHeader}>
                    <p className={styles.beneficiary}>Date </p>
                    <p className={styles.type}>Type</p>
                    <p className={styles.amount}>Casenumber</p>
                    {/* <p className={styles.bank}>Bank/Network</p> */}
                    <p className={styles.date}>Description</p>
                    <p className={styles.status}>Status</p>
                </div>
                {disputeHistoryLoad ? (
                    <Loader />
                ) : (
                    disputeHistoryData?.response?.records.map((item, index) => {
                        return (
                            <div
                                className={styles.TableDetailHeaders}
                                key={index}
                            >
                                <p className={styles.beneficiary}>
                                    {formatDateAndTime(item?.Createdon)}
                                </p>
                                <p className={styles.type}>{item?.subarea}</p>
                                <p className={styles.amount}>
                                    {item?.casenumber}
                                </p>
                                {/* <p className={styles.bank}>Bank/Network</p> */}
                                <p className={styles.date}>
                                    {item?.description}
                                </p>
                                <p className={styles.status}>
                                    {item?.casestatus}
                                </p>
                            </div>
                        );
                    })
                )}
            </div>
            <ReactPaginate
                previousLabel={<AiOutlineLeft />}
                nextLabel={<AiOutlineRight />}
                pageCount={Math.ceil(
                    disputeHistoryData?.response?.records.length / usersPerPage
                )}
                onPageChange={({ selected }) => {
                    setPageNumber(selected);
                }}
                containerClassName={styles.paginationBtns}
                previousClassName={styles.previousBtns}
                nextLinkClassName={styles.nextBtns}
                activeClassName={styles.paginationActive}
            />
        </div>
    );
};

export default AllDisputes;
