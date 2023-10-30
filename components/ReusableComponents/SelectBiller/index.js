import React, { useEffect } from 'react';
import { useBillerDetailsMutation } from '../../../redux/api/authApi';
import Loader from '../Loader';
import styles from './styles.module.css';

const SlectBiller = ({ biller, loads, loadBillerForm }) => {
    // const [isOpen, setIsOpen] = useState(false);
    console.log(biller);

    // const toggleDropdown = () => {
    //     setIsOpen(!isOpen);
    // };
    // const [searchText, setSearchText] = useState(''); // Define searchText state
    // const [expanded, setExpanded] = useState(
    //     new Array(biller?.length)?.fill(false)
    // );
    const [
        billerDetails,
        {
            data: billerDetailsData,
            isLoading: billerDetailsLoad,
            isSuccess: billerDetailsSuccess,
            isError: billerDetailsFalse,
            error: billerDetailsErr,
            reset: billerDetailsReset
        }
    ] = useBillerDetailsMutation();

    const loadBillerdetails = (val) => {
        billerDetails({ billerCode: val });
    };
    useEffect(() => {
        if (billerDetailsSuccess) {
            loadBillerForm(billerDetailsData);
        }
    }, [billerDetailsSuccess]);

    return (
        <div>
            {loads ? (
                <Loader />
            ) : (
                biller?.data?.billerInfoList.map((item, index) => {
                    return (
                        <div
                            onClick={() => loadBillerdetails(item.billerCode)}
                            className={styles.billerCategory}
                        >
                            <p>{item.billerDescription}</p>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default SlectBiller;
