import React, { useState, useEffect } from 'react';
import Dashboard from '../../components/layout/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import stylles from './styles.module.css';
import { getAllComplaintGet } from '../../redux/actions/actions';
import Lottie from 'react-lottie';
import socialdata from '../../components/ReusableComponents/Lotties/loading.json';
import styles from './styles.module.css';

const AllDisputes = () => {
    const dispatch = useDispatch();
    const [allDisputes, setAllDisputes] = useState();
    const { getAllComplaintSuccess, getAllComplaintErrorMessage } = useSelector(
        (state) => state.getComplaintReducer
    );
    const [isLoading, setIsLoading] = useState(true);
    const socialOptions = {
        loop: true,
        autoplay: true,
        animationData: socialdata,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    useEffect(() => {
        dispatch(getAllComplaintGet());
    }, []);
    useEffect(() => {
        if (getAllComplaintSuccess !== null) {
            console.log(getAllComplaintSuccess);
            setAllDisputes(getAllComplaintSuccess?.data?.disputeRecord);
            setIsLoading(false);
        }
    }, [getAllComplaintSuccess]);

    return (
        <Dashboard>
            <div className={styles.statementCover}>
                <h1 className={styles.nodisputesHeading}>All Disputes</h1>
                <div className={styles.TableDetailHeader}>
                    <div className={styles.beneficiary}>Create At</div>
                    <p className={styles.type}>CaseLog</p>
                    <p className={styles.amount}>Case Type</p>
                    {/* <p className={styles.bank}>Bank/Network</p> */}
                    <p className={styles.date}>Case Category</p>
                    <p className={styles.status}>Case Sub Category</p>
                    <div className={styles.more}>Description</div>
                </div>
                {isLoading ? (
                    <Lottie options={socialOptions} height={200} width={200} />
                ) : allDisputes.length === 0 ? (
                    <>
                        <h1 className={styles.nodisputes}>
                            No Disputes have been lodged
                        </h1>
                    </>
                ) : (
                    allDisputes
                        ?.filter((item) => {
                            const newDate = item.createAt.split('T');
                            return item;
                        })
                        ?.map((item, index) => {
                            console.log(item);
                            return item;
                        })
                )}
            </div>
        </Dashboard>
    );
};

export default AllDisputes;
