import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Webcam from 'react-webcam';
import {
    useFaceMatchWithoutBvnMutation,
    useFacematchMutation
} from '../../../../redux/api/authApi';
import {
    SmileIDPartnerId,
    SmileIdCallbackUrl,
    SmileIdCompName,
    SmileIdEnvironment,
    SmileIdLogoUrl,
    SmileIdPolicyUrl
} from '../../../../utils/constants';
import ButtonComp from '../../../ReusableComponents/Button';
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
const Liveness = ({ nextStep }) => {
    const productName = 'biometric_kyc';
    const myElementRef = useRef(null);
    const { profile } = useSelector((store) => store);
    const [loading, setLoading] = useState(false);
    const getWebToken = async () => {
        try {
            const response = await fetch(
                `https://eidev.ecobank.com:7505/smeapp-service/smileid-token`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${profile?.token}`,
                        'Content-Type': 'application/json' // You can specify other headers as needed
                    },
                    body: JSON.stringify({ productName })
                }
            );
            const data = await response.json();
            console.log('::WebtokenData::' + data);
            return data;
        } catch (error) {
            console.error('Error fetching token:', error);
            return null;
        }
    };
    const affiliatData = localStorage.getItem('affiliateCode');
    const configureSmileIdentityWebIntegration = (token) => {
        SmileIdentity({
            token,
            product: productName,
            callback_url: `${SmileIdCallbackUrl}`,
            environment: `${SmileIdEnvironment}`,
            partner_details: {
                partner_id: `${SmileIDPartnerId}`,
                name: `${SmileIdCompName}`,
                logo_url: `${SmileIdLogoUrl}`,
                policy_url: `${SmileIdPolicyUrl}`,
                theme_color: '#000'
            },
            onSuccess: () => {
                nextStep();
            },
            onClose: () => {},
            onError: () => {}
        });
    };

    const handleClick = async () => {
        const { data: token } = await getWebToken();
        setLoading((prev) => !prev);
        // const token =
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyX3BhcmFtcyI6eyJqb2JfaWQiOiJqb2JfdGVzdF9lY29fZG9jdl8yIiwiam9iX3R5cGUiOjYsInVzZXJfaWQiOiJ1c2VyX3Rlc3RfZWNvX2RvY3ZfMSJ9LCJjYWxsYmFja191cmwiOiJodHRwczovL3dlYmhvb2suc2l0ZS8wNjY1MGRhNi05OTNlLTQzNGQtOGMzNy1iMjlmMGNlOTVhMTAiLCJpYXQiOjE2ODkxNTQ3MjAsImV4cCI6MTY5MDg0Mzg2OH0.GzHJF05iZyRf3II9tA0MXkYQP9LTBJPNoce8pwazUqg";
        console.log('token::', token);
        configureSmileIdentityWebIntegration(token);
    };
    const webcamRef = React.useRef(null);
    const [succes, setSuccess] = useState('');
    const [image, setImage] = useState();
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
    const capture = React.useCallback(() => {
        const ImageSrcII = webcamRef?.current?.getScreenshot();
        setImage(ImageSrcII);
        // console.log(ImageSrcII);

        if (affiliatData === 'ENG') {
            if (localStorage.getItem('regprofilesetupdata')) {
                const storedData = localStorage.getItem('profilesetupdata');
                const profileSetupData = JSON.parse(storedData);
                const faceMMatchData = {
                    userFaceBase64: ImageSrcII?.replace(
                        'data:image/jpeg;base64,',
                        ''
                    ).trim(),
                    bvn: profileSetupData?.bvn
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
                };
                // Perform a facial match with the data
                faceMatch(faceMMatchData);
            }
        } else {
            if (localStorage.getItem('regprofilesetupdata')) {
                const storedData = localStorage.getItem('profilesetupdata');
                const profileSetupData = JSON.parse(storedData);
                const faceMMatchData = {
                    userFaceBase64: ImageSrcII?.replace(
                        'data:image/jpeg;base64,',
                        ''
                    ).trim(),
                    idNumber: profileSetupData?.bvn.trim()
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
                    idNumber: profileSetupData?.bvn.trim()
                };
                // Perform a facial match with the data
                faceMatchWithoutBvn(faceMMatchData);
            }
        }
    }, [webcamRef]);
    return (
        <>
            {/* {affiliatData === 'ENG' ? ( */}
            {/* <div className={styles.body}>
                    <Script src="https://cdn.smileidentity.com/inline/v1/js/script.min.js"></Script>
                    {/* <ToastContainer /> */}
            {/* <div className={styles.cover}>
                        <div className={styles.imageOut}>
                            <p className={styles.headerSub}>
                                We will need to check face liveliness to verify
                                identity
                            </p>
                            <p className={styles.headerSub}>
                                Keep Your BVN Close
                            </p>
                            <ButtonComp
                                ref={myElementRef}
                                active={'active'}
                                disabled={true}
                                loads={loading}
                                type="button"
                                text={'FaceID'}
                                id="verify-with-smile-id"
                                onClick={handleClick}
                            />
                        </div>
                    </div>
                </div>  */}
            <div className={styles.body}>
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
                                            <Webcam
                                                audio={false}
                                                screenshotFormat="image/jpeg"
                                                videoConstraints={
                                                    videoConstraints
                                                }
                                                ref={webcamRef}
                                            />
                                        </div>
                                    </div>
                                    {faceMatchLoad ? (
                                        <p>
                                            Hold On Your Face Is Being
                                            Verified.....
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
                                            faceMatchLoad ||
                                            faceMatchWithoutBvnLoad
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
        </>
    );
};

export default Liveness;
