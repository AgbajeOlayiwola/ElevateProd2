import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Webcam from 'react-webcam';
import Head from 'next/head';
import Script from 'next/script';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { Formik } from 'formik';
import ButtonComp from '../../ReusableComponents/Button';
import {
    useCreateExistingUserProfileMutation,
    useFaceMatchWithoutBvnMutation,
    useFacematchMutation,
    useGetMoreAccountNumberDetailsMutation
} from '../../../redux/api/authApi';
import { setExistingUserDetails } from '../../../redux/slices/existingUserData';
import { setMoreAccountNumberDetails } from '../../../redux/slices/moreAccountNumberDetails';
import { setfaceMatchDetails } from '../../../redux/slices/facematchSlice';
import { setProfile } from '../../../redux/slices/profile';
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
const Liveness = ({ formData, type, action }) => {
    const webcamRef = React.useRef(null);
    const [succes, setSuccess] = useState('');
    const [image, setImage] = useState(
        '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'
    );
    const dispatch = useDispatch();
    const capture = React.useCallback(() => {
        const ImageSrcII = webcamRef?.current?.getScreenshot();
        setImage(ImageSrcII);
        console.log(ImageSrcII);
    }, [webcamRef]);
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

    const faceMtch = () => {
        const faceMMatchData = {
            userFaceBase64: image,
            idNumber: moreAccountNumberDetails?.accounts?.bvn
        };
        faceMatchWithoutBvn(faceMMatchData);
    };

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
                firstName: moreAccountNumberDetails?.accounts?.accountName.split(
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
                bvn: moreAccountNumberDetails?.accounts?.bvn || null,
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
            action();
        }
    }, [createExistingUserProfileSuccess]);

    return (
        <div className={styles.body}>
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
                                            succes ===
                                            'facial verification successful'
                                                ? // succes === 'success'
                                                  styles.imageOuter
                                                : faceMatchWithoutBvnErr
                                                ? styles.errorInner
                                                : styles.imageInner
                                        }
                                    >
                                        <Webcam
                                            audio={false}
                                            screenshotFormat="image/jpeg"
                                            videoConstraints={videoConstraints}
                                            ref={webcamRef}
                                        />
                                    </div>
                                </div>

                                <ButtonComp
                                    active={'active'}
                                    disabled={true}
                                    onClick={faceMtch}
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
