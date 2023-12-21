import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useVerifyTransactionPinMutation } from '../../../redux/api/authApi';
import ButtonComp from '../Button';
import OtpInput from '../Otpinput';
import OutsideClick from '../OutsideClick';
import styles from './styles.module.css';
const Visbility = ({ typeSet, color, input }) => {
    const dispatch = useDispatch();
    const [type, setType] = useState(true);
    const [visible, setVisible] = useState(false);
    const [otpValue, setOtpValue] = useState('');
    const [showTransId, setShowtransId] = useState(false);
    const [
        verifyTransactionPin,
        {
            data: verifyTransactionPinData,
            isLoading: verifyTransactionPinLoad,
            isSuccess: verifyTransactionPinSuccess,
            isError: verifyTransactionPinFalse,
            error: verifyTransactionPinErr,
            reset: verifyTransactionPinReset
        }
    ] = useVerifyTransactionPinMutation();
    const handleOtpChange = (otp) => {
        setOtpValue(otp);
    };
    const showVerifyTransactionPinErrorMessage = () => {
        toast.error(verifyTransactionPinErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    useEffect(() => {
        if (verifyTransactionPinErr) {
            showVerifyTransactionPinErrorMessage();
        }
    }, [verifyTransactionPinErr]);
    const visibilityToggle = () => {
        setVisible(true);
        setType((prev) => !prev);
        typeSet(type);
    };
    const visibilityToggleoff = () => {
        if (input === 'input') {
            setVisible((prev) => !prev);
            setType((prev) => !prev);
            typeSet(type);
        } else {
            setShowtransId(true);
        }
    };
    useEffect(() => {
        if (verifyTransactionPinSuccess) {
            setVisible((prev) => !prev);
            setType((prev) => !prev);
            typeSet(type);
            setShowtransId(false);
        }
    }, [verifyTransactionPinSuccess]);

    const numOfFields = 6;
    const [tansactiopnPinResponse, setTransactionPinResponse] = useState('');
    const [activeBtn, setActiveBtn] = useState(true);
    const [ssnValues, setValue] = useState(['']);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const submitPin = (e) => {
        verifyTransactionPin({
            transactionPin: otpValue
        });
    };

    return (
        <div className={styles.relativity}>
            <ToastContainer />
            {input !== 'input' ? (
                <>
                    <span
                        className="material-symbols-outlined"
                        id={color !== 'green' ? styles.notGreen : styles.green}
                        style={{
                            zIndex: '10',
                            fontWeight: '300',
                            fontSize: '21px',
                            color: '#C6C6C6',
                            cursor: 'pointer'
                        }}
                        onClick={
                            visible ? visibilityToggleoff : visibilityToggle
                        }
                    >
                        {visible ? 'visibility' : 'visibility_off'}
                    </span>
                </>
            ) : (
                <>
                    <span
                        className="material-symbols-outlined"
                        id={color !== 'green' ? styles.notGreen : styles.green}
                        style={{
                            zIndex: '10',
                            fontWeight: '300',
                            fontSize: '21px',
                            color: '#C6C6C6',
                            cursor: 'pointer'
                        }}
                        onClick={
                            visible ? visibilityToggleoff : visibilityToggle
                        }
                    >
                        {visible ? 'visibility' : 'visibility_off'}
                    </span>
                </>
            )}

            {showTransId ? (
                <OutsideClick
                    onClickOutside={() => {
                        setShowtransId(false);
                    }}
                >
                    <form className={styles.transaId}>
                        <div className={styles.otpInps}>
                            <OtpInput
                                onOtpChange={handleOtpChange}
                                otpfields={6}
                            />
                        </div>
                        <div>
                            <ButtonComp
                                onClick={submitPin}
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                text="Confirm"
                                type="button"
                                loads={verifyTransactionPinLoad}
                                // err={isLoading}
                            />
                        </div>
                    </form>
                </OutsideClick>
            ) : null}
        </div>
    );
};
export default Visbility;
