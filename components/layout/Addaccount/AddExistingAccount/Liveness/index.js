import { Formik } from 'formik';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Webcam from 'react-webcam';
import {
    useAddAccountMutation,
    useFacematchithAccountnumberMutation
} from '../../../../../redux/api/authApi';
import ButtonComp from '../../../../ReusableComponents/Button';
import styles from './styles.module.css';
const videoConstraints = {
    width: 390,
    height: 480,
    facingMode: 'user'
};
const _base64ToArrayBuffer = (base64String) => {
    if (window !== undefined) {
        var binary_string = window.atob(base64String);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }
};
const LivenessForAccount = ({
    formData,
    type,
    action,
    back,
    account,
    acct,
    id,
    close
}) => {
    const webcamRef = React.useRef(null);
    const [succes, setSuccess] = useState('');
    const [image, setImage] = useState('');
    const { profile } = useSelector((store) => store);
    const affiliatData = localStorage.getItem('affiliateCode');
    const dispatch = useDispatch();
    const { existingUserDetails } = useSelector((store) => store);
    const { faceMatchDetails } = useSelector((store) => store);
    const { moreAccountNumberDetails } = useSelector((store) => store);
    const [
        facematchithAccountnumber,
        {
            data: facematchithAccountnumberData,
            isLoading: facematchithAccountnumberLoad,
            isSuccess: facematchithAccountnumberSuccess,
            isError: facematchithAccountnumberFalse,
            error: facematchithAccountnumberErr,
            reset: facematchithAccountnumberReset
        }
    ] = useFacematchithAccountnumberMutation();
    const [
        addAccount,
        {
            data: addAccountData,
            isLoading: addAccountLoad,
            isSuccess: addAccountSuccess,
            isError: addAccountFalse,
            error: addAccountErr,
            reset: addAccountReset
        }
    ] = useAddAccountMutation();

    const capture = React.useCallback(() => {
        const ImageSrcII = webcamRef?.current?.getScreenshot();
        setImage(ImageSrcII);

        const faceMMatchData = {
            userFaceBase64: ImageSrcII?.replace(
                'data:image/jpeg;base64,',
                ''
            ).trim(),
            accountNumber: account
        };
        facematchithAccountnumber(faceMMatchData);
    }, [webcamRef]);

    console.log(moreAccountNumberDetails);

    const showToastMessage = () => {
        toast.error(facematchithAccountnumberErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    useEffect(() => {
        if (facematchithAccountnumberErr) {
            showToastMessage();
        }
    }, [facematchithAccountnumberErr]);

    useEffect(() => {
        if (facematchithAccountnumberSuccess) {
            addAccount({
                account_number: account,
                account_name: acct?.data?.accountName,
                currency:
                    countryToCurrency[`${acct?.data?.affiliate?.substring(1)}`],
                customer_type: 'Individual',
                account_class: acct?.data?.accountClass,
                customer_id: id
            });
        }
    }, [facematchithAccountnumberSuccess]);
    useEffect(() => {
        if (addAccountSuccess) {
            close();
        }
    }, [addAccountSuccess]);

    return (
        <div>
            <ToastContainer />
            <div>
                <div className={styles.imageOut}>
                    <Formik
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(false);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            setFieldValue,
                            handleSubmit
                        }) => (
                            <form>
                                <div>
                                    <p className={styles.takeSelf}>
                                        Take a Lively Selfie
                                    </p>
                                    <p className={styles.finish}>
                                        Finish up with a clear photo of your
                                        face to verify your identity.
                                    </p>

                                    <div
                                        className={
                                            facematchithAccountnumberLoad
                                                ? styles.imageOuter
                                                : facematchithAccountnumberSuccess
                                                ? styles.errorInner
                                                : styles.imageInner
                                        }
                                    >
                                        {facematchithAccountnumberLoad ? (
                                            <Image
                                                src={image}
                                                height={600}
                                                width={600}
                                            />
                                        ) : (
                                            <Webcam
                                                audio={false}
                                                screenshotFormat="image/jpeg"
                                                videoConstraints={
                                                    videoConstraints
                                                }
                                                ref={webcamRef}
                                            />
                                        )}
                                    </div>
                                </div>
                                {facematchithAccountnumberLoad ? (
                                    <p>
                                        Hold On Your Face Is Being Verified.....
                                    </p>
                                ) : null}
                                <ButtonComp
                                    active={'active'}
                                    disabled={true}
                                    onClick={capture}
                                    type="button"
                                    loads={facematchithAccountnumberLoad}
                                    text={
                                        succes ===
                                        'facial verification successful'
                                            ? 'Continue'
                                            : 'Snap'
                                    }
                                />
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default LivenessForAccount;
