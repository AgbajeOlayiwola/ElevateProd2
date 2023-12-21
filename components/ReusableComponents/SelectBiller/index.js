import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useBillerDetailsMutation } from '../../../redux/api/authApi';
import Loader from '../Loader';
import styles from './styles.module.css';
const SlectBiller = ({ biller, loads, load, loadBillerForm }) => {
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
        load(billerDetailsLoad);
    };
    useEffect(() => {
        if (billerDetailsSuccess) {
            loadBillerForm(billerDetailsData);
        }
    }, [billerDetailsSuccess]);
    const showErrorToastMessage = () => {
        toast.error('Error Loading Biller Details', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
    };
    useEffect(() => {
        if (billerDetailsErr) {
            showErrorToastMessage();
        }
    }, [billerDetailsErr]);

    return (
        <div>
            <ToastContainer />
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
