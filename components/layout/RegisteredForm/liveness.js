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
import ButtonComp from '../../ReusableComponents/Button';
import Loader from '../../ReusableComponents/Loader';
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
    const [image, setImage] = useState('');
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
    useEffect(() => {
        getMoreAccountNumberDetails({
            accountNo: existingUserDetails?.accounts[0]?.accountNumber
        });
    }, []);
    const capture = React.useCallback(() => {
        const ImageSrcII = image;
        // webcamRef?.current?.getScreenshot();
        setImage(ImageSrcII);
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
            userFaceBase64: ImageSrcII?.replace(
                'data:image/jpeg;base64,',
                ''
            ).trim(),
            accountNumber: existingUserDetails?.accounts[0]?.accountNumber
        };
        facematchithAccountnumber(faceMMatchData);
    }, [webcamRef]);

    useEffect(() => {
        if (getMoreAccountNumberDetailsSuccess) {
            dispatch(
                setMoreAccountNumberDetails(
                    getMoreAccountNumberDetailsData?.data
                )
            );
        }
    }, [getMoreAccountNumberDetailsSuccess]);

    // console.log(moreAccountNumberDetails);
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
            // console.log(facematchithAccountnumberData);
            dispatch(setfaceMatchDetails(facematchithAccountnumberData));
            action();
        }
    }, [facematchithAccountnumberSuccess, faceMatchWithoutBvnSuccess]);

    return (
        <div className={styles.body}>
            <ToastContainer />
            <div className={styles.cover}>
                <div className={styles.imageOut}>
                    <form>
                        <div>
                            {/* <ArrowBackSvg action={back} color="#102572" /> */}
                            <p className={styles.takeSelf}>
                                Take a Lively Selfie
                            </p>
                            <p className={styles.finish}>
                                Finish up with a clear photo of your face to
                                verify your identity.
                            </p>

                            <div
                                className={
                                    faceMatchWithoutBvnLoad ||
                                    facematchithAccountnumberLoad
                                        ? styles.imageOuter
                                        : faceMatchWithoutBvnErr ||
                                          facematchithAccountnumberErr
                                        ? styles.errorInner
                                        : styles.imageInner
                                }
                            >
                                {faceMatchWithoutBvnLoad ||
                                facematchithAccountnumberLoad ? (
                                    <Image
                                        src={`data:image/jpeg;base64,${image}`}
                                        height={600}
                                        width={600}
                                    />
                                ) : getMoreAccountNumberDetailsLoad ? (
                                    <Loader />
                                ) : (
                                    <Webcam
                                        audio={false}
                                        screenshotFormat="image/jpeg"
                                        videoConstraints={videoConstraints}
                                        ref={webcamRef}
                                    />
                                )}
                            </div>
                        </div>
                        {faceMatchWithoutBvnLoad ||
                        facematchithAccountnumberLoad ? (
                            <p>Hold On Your Face Is Being Verified.....</p>
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
                                succes === 'facial verification successful'
                                    ? 'Continue'
                                    : 'Snap'
                            }
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Liveness;
