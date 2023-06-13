import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import ButtonComp from '../../../ReusableComponents/Button';
import Webcam from 'react-webcam';
import Head from 'next/head';
import Script from 'next/script';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import Loader from '../../../ReusableComponents/Loader';
import { loadUserProfile } from '../../../../redux/actions/actions';
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
const Liveness = ({ action, cookie }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const [succes, setSuccess] = useState('');
    const [imageSrcI, setImageSrcI] = React.useState(null);
    const [error, setError] = React.useState('');
    const [loads, setLoads] = useState(false);
    const [loading, setLoading] = useState(false);
    const capture = React.useCallback(() => {
        setLoads((prev) => !prev);
        setLoading((prev) => !prev);
        const ImageSrcII = webcamRef.current.getScreenshot();
        setImageSrcI(ImageSrcII);
        const imageSrc = webcamRef.current.getScreenshot();
        let newImage = imageSrc.split(',');
        let base64String = newImage[1];
        var buf = _base64ToArrayBuffer(base64String);
        var mimeType = 'image/jpeg';
        var file = new File([buf], 'userface-1828438.jpg', { type: mimeType });

        var formData = new FormData();
        formData.append('userFace', file);
        let cookies;
        if (cookie === '') {
            if (getCookie('cookieToken') == undefined) {
                cookies = getCookie('existingToken');
            } else {
                cookies = getCookie('cookieToken');
            }
        } else {
            cookies = cookie;
        }

        axios
            .post(`https://testvate.live/authentication/facematch`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Client-Type': 'web',
                    Authorization: `Bearer ${cookies}`
                }
            })
            .then((response) => {
                setSuccess(response.data.message);
                setLoading(false);
                setLoads(false);
            })
            .catch((error) => {
                // setSuccess(error.response.data.message);
                setError(error.response.data.message);
                setLoading(false);
                setLoads(false);
            });
    }, [webcamRef, setImgSrc, setImageSrcI]);

    return (
        <div className={styles.body}>
            <div className={styles.cover}>
                <div className={styles.imageOut}>
                    <div>
                        <p className={styles.takeSelf}>Take a Lively Selfie</p>
                        <p className={styles.finish}>
                            Finish up with a clear photo of your face to verify
                            your identity.
                        </p>
                        {error ? <p>{error}</p> : null}
                        <div
                            className={
                                succes === 'facial verification successful'
                                    ? // succes === 'success'
                                      styles.imageOuter
                                    : error
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
                    {loading ? (
                        <p>Hold on your face is been verified!!!!</p>
                    ) : null}
                    <ButtonComp
                        onClick={
                            // succes === 'facial verification successful'
                            //     ?
                            action
                            // : capture
                        }
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        type="button"
                        text={
                            // succes === 'facial verification successful'
                            //     ?

                            'Continue'
                            // : 'Snap'
                        }
                        err={succes}
                        loads={loads}
                    />
                </div>
            </div>
        </div>
    );
};

export default Liveness;
