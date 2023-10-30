import { Formik } from 'formik';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Webcam from 'react-webcam';
import {
    useCreateExistingUserProfileMutation,
    useFaceMatchWithoutBvnMutation,
    useFacematchithAccountnumberMutation,
    useGetMoreAccountNumberDetailsMutation
} from '../../../redux/api/authApi';
import { setfaceMatchDetails } from '../../../redux/slices/facematchSlice';
import { setMoreAccountNumberDetails } from '../../../redux/slices/moreAccountNumberDetails';
import ArrowBackSvg from '../../ReusableComponents/ArrowBackSvg';
import ButtonComp from '../../ReusableComponents/Button';
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
const Liveness = ({ formData, type, action, back }) => {
    const webcamRef = React.useRef(null);
    const [succes, setSuccess] = useState('');
    const [image, setImage] = useState(
        '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'
    );
    const { profile } = useSelector((store) => store);
    const affiliatData = localStorage.getItem('affiliateCode');
    const dispatch = useDispatch();
    const { existingUserDetails } = useSelector((store) => store);
    const { faceMatchDetails } = useSelector((store) => store);
    const { moreAccountNumberDetails } = useSelector((store) => store);
    const [
        getMoreAccountNumberDetails,
        {
            data: getMoreAccountNumberDetailsData,
            isLoading: getMoreAccountNumberDetailsLoad,
            isSuccess: getMoreAccountNumberDetailsSuccess,
            isError: getMoreAccountNumberDetailsFalse,
            error: getMoreAccountNumberDetailsErr,
            reset: getMoreAccountNumberDetailsReset
        }
    ] = useGetMoreAccountNumberDetailsMutation();
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
        faceMatchWithoutBvn,
        {
            data: faceMatchWithoutBvnData,
            isLoading: faceMatchWithoutBvnLoad,
            isSuccess: faceMatchWithoutBvnSuccess,
            isError: faceMatchWithoutBvnFalse,
            error: faceMatchWithoutBvnErr,
            reset: faceMatchWithoutBvnReset
        }
    ] = useFaceMatchWithoutBvnMutation();
    const [
        createExistingUserProfile,
        {
            data: createExistingUserProfileData,
            isLoading: createExistingUserProfileLoad,
            isSuccess: createExistingUserProfileSuccess,
            isError: createExistingUserProfileFalse,
            error: createExistingUserProfileErr,
            reset: createExistingUserProfileReset
        }
    ] = useCreateExistingUserProfileMutation();
    const capture = React.useCallback(() => {
        // const ImageSrcII = webcamRef?.current?.getScreenshot();
        // setImage(ImageSrcII);
        // console.log(ImageSrcII);
        // const faceMMatchData = {
        //     userFaceBase64: ImageSrcII?.replace(
        //         'data:image/jpeg;base64,',
        //         ''
        //     ).trim(),
        //     idNumber: affiliatData
        //         ? moreAccountNumberDetails?.accounts?.bvn
        //         : ''
        // };

        const faceMMatchData = {
            // userFaceBase64: ImageSrcII?.replace(
            //     'data:image/jpeg;base64,',
            //     ''
            // ).trim(),
            userFaceBase64: image,
            accountNumber: existingUserDetails?.accounts[0]?.accountNumber
        };
        facematchithAccountnumber(faceMMatchData);
    }, [webcamRef]);
    useEffect(() => {
        getMoreAccountNumberDetails({
            accountNo: existingUserDetails?.accounts[0]?.accountNumber
        });
    }, []);
    useEffect(() => {
        if (getMoreAccountNumberDetailsSuccess) {
            dispatch(
                setMoreAccountNumberDetails(
                    getMoreAccountNumberDetailsData?.data
                )
            );
        }
    }, [getMoreAccountNumberDetailsSuccess]);

    console.log(moreAccountNumberDetails);
    const showToastErrorMessage = () => {
        toast.error(faceMatchWithoutBvnErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    useEffect(() => {
        if (faceMatchWithoutBvnErr) {
            showToastErrorMessage();
        }
    }, [faceMatchWithoutBvnErr]);
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
        if (facematchithAccountnumberSuccess || faceMatchWithoutBvnSuccess) {
            console.log(facematchithAccountnumberData);
            dispatch(setfaceMatchDetails(facematchithAccountnumberData));
            // action();
        }
    }, [facematchithAccountnumberSuccess, faceMatchWithoutBvnSuccess]);

    return (
        <div className={styles.body}>
            <ToastContainer />
            <div className={styles.cover}>
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
                                    <ArrowBackSvg
                                        action={back}
                                        color="#102572"
                                    />
                                    <p className={styles.takeSelf}>
                                        Take a Lively Selfie
                                    </p>
                                    <p className={styles.finish}>
                                        Finish up with a clear photo of your
                                        face to verify your identity.
                                    </p>

                                    <div
                                        className={
                                            faceMatchWithoutBvnLoad ||
                                            facematchithAccountnumberLoad
                                                ? styles.imageOuter
                                                : faceMatchWithoutBvnErr
                                                ? styles.errorInner
                                                : styles.imageInner
                                        }
                                    >
                                        {faceMatchWithoutBvnLoad ||
                                        facematchithAccountnumberLoad ? (
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
                                {faceMatchWithoutBvnLoad ||
                                facematchithAccountnumberLoad ? (
                                    <p>
                                        Hold On Your Face Is Being Verified.....
                                    </p>
                                ) : null}
                                <ButtonComp
                                    active={'active'}
                                    disabled={true}
                                    onClick={capture}
                                    type="button"
                                    loads={
                                        faceMatchWithoutBvnLoad ||
                                        facematchithAccountnumberLoad
                                    }
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

export default Liveness;
