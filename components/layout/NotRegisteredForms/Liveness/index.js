import { Formik } from 'formik';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Webcam from 'react-webcam';
import {
    useFaceMatchWithoutBvnMutation,
    useFacematchMutation
} from '../../../../redux/api/authApi';
import ButtonComp from '../../../ReusableComponents/Button';
import styles from './styles.module.css';

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
const videoConstraints = {
    width: 390,
    height: 480,
    facingMode: 'user'
};
const mobilevideoConstraints = {
    width: 290,
    height: 290,
    facingMode: 'user'
};
const Liveness = ({ formData, type, nextStep }) => {
    const webcamRef = React.useRef(null);
    const [succes, setSuccess] = useState('');
    const [image, setImage] = useState();
    const { profile } = useSelector((store) => store);
    console.log(profile);
    const capture = React.useCallback(() => {
        const ImageSrcII = webcamRef?.current?.getScreenshot();
        setImage(ImageSrcII);
        // console.log(ImageSrcII);
        const affiliatData = localStorage.getItem('affiliateCode');
        if (affiliatData === 'ENG') {
            if (localStorage.getItem('regprofilesetupdata')) {
                const storedData = localStorage.getItem('regprofilesetupdata');
                const profileSetupData = JSON.parse(storedData);
                const faceMMatchData = {
                    userFaceBase64: ImageSrcII?.replace(
                        'data:image/jpeg;base64,',
                        ''
                    ).trim(),
                    bvn: profileSetupData?.bvn
                        ? profileSetupData?.bvn.trim()
                        : profile?.user?.idNumber
                };
                // Perform a facial match with the data
                faceMatch(faceMMatchData);
            } else {
                const storedData = localStorage.getItem('profilesetupdata');
                const profileSetupData = JSON.parse(storedData);
                const faceMMatchData = {
                    userFaceBase64: ImageSrcII?.replace(
                        'data:image/jpeg;base64,',
                        ''
                    ).trim(),
                    bvn: profileSetupData?.bvn
                        ? profileSetupData?.bvn.trim()
                        : profile?.user?.idNumber
                };
                // Perform a facial match with the data
                faceMatch(faceMMatchData);
            }
        } else {
            if (localStorage.getItem('regprofilesetupdata')) {
                const storedData = localStorage.getItem('regprofilesetupdata');
                const profileSetupData = JSON.parse(storedData);
                const faceMMatchData = {
                    userFaceBase64: ImageSrcII?.replace(
                        'data:image/jpeg;base64,',
                        ''
                    ).trim(),
                    idNumber: profileSetupData?.bvn
                        ? profileSetupData?.bvn.trim()
                        : profile?.user?.idNumber
                };
                // Perform a facial match with the data
                faceMatchWithoutBvn(faceMMatchData);
            } else {
                const storedData = localStorage.getItem('profilesetupdata');
                const profileSetupData = JSON.parse(storedData);
                const faceMMatchData = {
                    userFaceBase64: ImageSrcII?.replace(
                        'data:image/jpeg;base64,',
                        ''
                    ).trim(),
                    idNumber: profileSetupData?.bvn
                        ? profileSetupData?.bvn.trim()
                        : profile?.user?.idNumber
                };
                // Perform a facial match with the data
                faceMatchWithoutBvn(faceMMatchData);
            }
        }
    }, [webcamRef]);

    const [
        faceMatch,
        {
            data: faceMatchData,
            isLoading: faceMatchLoad,
            isSuccess: faceMatchSuccess,
            isError: faceMatchFalse,
            error: faceMatchErr,
            reset: faceMatchReset
        }
    ] = useFacematchMutation();
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

    // console.log(affiliatData);
    const faceMtch = () => {};

    useEffect(() => {
        if (faceMatchSuccess || faceMatchWithoutBvnSuccess) {
            nextStep();
        }
    }, [faceMatchSuccess, faceMatchWithoutBvnSuccess]);

    useEffect(() => {
        if (faceMatchWithoutBvnErr) {
            showToastErrorMessage();
        }
    }, [faceMatchWithoutBvnErr]);
    const showToastFaceErrorMessage = () => {
        toast.error(faceMatchErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const showToastErrorMessage = () => {
        toast.error(faceMatchWithoutBvnErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    useEffect(() => {
        if (faceMatchErr) {
            showToastFaceErrorMessage();
        }
    }, [faceMatchErr]);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        console.log(width);
    };

    useEffect(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        // component is mounted and window is available
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        // unsubscribe from the event on component unmount
        return () => window.removeEventListener('resize', handleWindowResize);
    }, [width]);
    console.log(faceMatchWithoutBvnErr, faceMatchErr);
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
                                    <p className={styles.takeSelf}>
                                        Take a Lively Selfie
                                    </p>
                                    <p className={styles.finish}>
                                        Finish up with a clear photo of your
                                        face to verify your identity.
                                    </p>

                                    {faceMatchErr ? (
                                        <p className={styles.error}>
                                            {faceMatchErr.data.message}
                                        </p>
                                    ) : null}

                                    <div
                                        className={
                                            succes ===
                                            'facial verification successful'
                                                ? // succes === 'success'
                                                  styles.imageOuter
                                                : faceMatchErr ||
                                                  faceMatchWithoutBvnErr
                                                ? styles.errorInner
                                                : styles.imageInner
                                        }
                                    >
                                        {faceMatchLoad ||
                                        faceMatchWithoutBvnLoad ? (
                                            <Image
                                                src={image}
                                                height={width > 900 ? 600 : 280}
                                                width={width > 900 ? 600 : 290}
                                            />
                                        ) : (
                                            <Webcam
                                                audio={false}
                                                screenshotFormat="image/jpeg"
                                                videoConstraints={
                                                    width > 900
                                                        ? videoConstraints
                                                        : mobilevideoConstraints
                                                }
                                                ref={webcamRef}
                                            />
                                        )}
                                    </div>
                                </div>
                                {faceMatchLoad || faceMatchWithoutBvnLoad ? (
                                    <p>
                                        Hold On Your Face Is Being Verified.....
                                    </p>
                                ) : null}

                                <ButtonComp
                                    active={'active'}
                                    disabled={true}
                                    // onClick={
                                    //     succes ===
                                    //     'facial verification successful'
                                    //         ? action
                                    //         : capture
                                    // }
                                    onClick={capture}
                                    type="button"
                                    loads={
                                        faceMatchLoad || faceMatchWithoutBvnLoad
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
