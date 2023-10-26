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
    useGetMoreAccountNumberDetailsMutation
} from '../../../redux/api/authApi';
import { setMoreAccountNumberDetails } from '../../../redux/slices/moreAccountNumberDetails';
import { setProfile } from '../../../redux/slices/profile';
import { setToken } from '../../../redux/slices/tokenSlice';
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
    const [image, setImage] = useState();
    const { profile } = useSelector((store) => store);
    const dispatch = useDispatch();

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
    const { existingUserDetails } = useSelector((store) => store);
    const { faceMatchDetails } = useSelector((store) => store);

    console.log(faceMatchDetails);
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
    const { moreAccountNumberDetails } = useSelector((store) => store);
    console.log(moreAccountNumberDetails);

    // console.log(existingUserDetails);
    // console.log(moreAccountNumberDetails);
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

    const faceMtch = () => {};
    const showToastMessage = () => {
        toast.error(createExistingUserProfileErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    useEffect(() => {}, []);
    const affiliatData = localStorage.getItem('affiliateCode');
    useEffect(() => {
        showToastMessage();
    }, [createExistingUserProfileErr]);
    const capture = React.useCallback(() => {
        const ImageSrcII = webcamRef?.current?.getScreenshot();
        setImage(ImageSrcII);
        console.log(ImageSrcII);
        const faceMMatchData = {
            userFaceBase64: ImageSrcII?.replace(
                'data:image/jpeg;base64,',
                ''
            ).trim(),
            idNumber: affiliatData
                ? moreAccountNumberDetails?.accounts?.bvn
                : ''
        };
        faceMatchWithoutBvn(faceMMatchData);
    }, [webcamRef]);

    useEffect(() => {
        if (faceMatchWithoutBvnSuccess) {
            console.log(faceMatchWithoutBvnData);
            const data = {
                base64_image: faceMatchWithoutBvnData?.data?.base64_image,
                facematch_metamap_id:
                    faceMatchWithoutBvnData?.data?.facematch_metamap_id,
                facematch_source:
                    faceMatchWithoutBvnData?.data?.facematch_metamap_id,
                sharePointId: faceMatchWithoutBvnData?.data?.sharePointId,
                password: faceMatchDetails?.password,
                email: faceMatchDetails?.email,
                customerCategory:
                    moreAccountNumberDetails?.accounts?.customerType == 'I'
                        ? 'INDIVIDUAL'
                        : 'COMMERCIAL',
                firstName:
                    moreAccountNumberDetails?.accounts?.accountName.split(
                        ' '
                    )[0],
                lastName: moreAccountNumberDetails?.accounts?.accountName
                    .split(' ')
                    ?.slice(1)
                    ?.join(' '),
                middleName: '',
                gender:
                    moreAccountNumberDetails?.accounts?.gender === 'M'
                        ? 'Male'
                        : moreAccountNumberDetails?.accounts?.gender === 'F'
                        ? 'Female'
                        : null, //Format as M or F
                dateOfBirth: moreAccountNumberDetails?.accounts?.dob || null,
                nationality: existingUserDetails?.affiliateCountry || null,
                phoneNumber:
                    moreAccountNumberDetails?.accounts?.mobileNos || null,
                accountNumber:
                    moreAccountNumberDetails?.accounts?.accountNumber || null,
                currencyCode:
                    moreAccountNumberDetails?.accounts?.currencyCode || null,
                customerId:
                    moreAccountNumberDetails?.accounts?.customerID || null,
                bvn: profile?.user?.idNumber
                    ? profile?.user?.idNumber
                    : moreAccountNumberDetails?.accounts?.bvn || null,
                accounts: existingUserDetails?.accounts,
                city: '',
                state: '',
                lga: ''
            };
            createExistingUserProfile(data);
        }
    }, [faceMatchWithoutBvnSuccess]);

    useEffect(() => {
        if (createExistingUserProfileSuccess) {
            dispatch(setProfile(createExistingUserProfileData?.data));
            dispatch(setToken(createExistingUserProfileData?.data?.token));
            action();
        }
    }, [createExistingUserProfileSuccess]);

    return (
        <div className={styles.body}>
            <ToastContainer />
            <div className={styles.cover}>
                <div className={styles.imageOut}>
                    <Formik
                        onSubmit={(values, { setSubmitting }) => {
                            // Check if there's a 'regprofilesetupdata' in localStorage

                            // Continue with other form submission logic if needed

                            // You should call setSubmitting(false) to indicate that form submission is complete
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

                                    {faceMatchWithoutBvnErr ? (
                                        <p className={styles.error}>
                                            {
                                                faceMatchWithoutBvnErr?.error
                                                    ?.data?.message
                                            }
                                        </p>
                                    ) : null}
                                    <div
                                        className={
                                            faceMatchWithoutBvnSuccess
                                                ? // succes === 'success'
                                                  styles.imageOuter
                                                : faceMatchWithoutBvnErr
                                                ? styles.errorInner
                                                : styles.imageInner
                                        }
                                    >
                                        {faceMatchWithoutBvnLoad ||
                                        createExistingUserProfileLoad ? (
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
                                {faceMatchWithoutBvnLoad ? (
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
                                        createExistingUserProfileLoad
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
