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
const Liveness = ({ action }) => {
    const [activeBtn, setActiveBtn] = useState(true);

    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const [succes, setSuccess] = useState('');
    const [imageSrcI, setImageSrcI] = React.useState(null);
    const [error, setError] = React.useState('');

    const capture = React.useCallback(() => {
        const ImageSrcII = webcamRef.current.getScreenshot();
        setImageSrcI(ImageSrcII);
        const imageSrc = webcamRef.current.getScreenshot();
        let newImage = imageSrc.split(',');
        let base64String = newImage[1];

        var buf = _base64ToArrayBuffer(base64String);

        console.log(buf);
        var mimeType = 'image/jpeg';
        var file = new File([buf], 'userface-1828438.jpg', { type: mimeType });

        var formData = new FormData();

        formData.append('userFace', file);

        const cookie = getCookie('cookieToken');
        axios
            .post(
                `https://ellevate-test.herokuapp.com/authentication/facematch`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${cookie}`
                    }
                }
            )
            .then((response) => {
                console.log(response.data.message);
                setSuccess(response.data.message);
            })
            .catch((error) => {
                console.log(error.response.data.message);
                // setResErros(error.response.data.statusCode);
                setError(error.response.data.message);
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
                                    ? styles.imageOuter
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
                </div>

                <ButtonComp
                    onClick={
                        succes === 'facial verification successful'
                            ? action
                            : capture
                    }
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    type="submit"
                    text={
                        succes === 'facial verification successful'
                            ? 'Success'
                            : 'Snap'
                    }
                    // action={action}
                />

                {/* {imageSrcI && <img src={imageSrcI} />} */}
                {/* <div className={styles.matiButtonSetup}>
                    <mati-button
                        clientId="622f44566ac1c1001cd1daac" // from your Mati dashboard
                        flowId="62fb9b12235dfd001ed92fec" // from your Mati dashboard
                        color="#6ccf00" // any color
                        className={styles.MatiButton}
                        metadata='{"user_id":"1234778"}'
                    />
                </div> */}
            </div>
            {/* {imgSrc && <img src={imgSrc} />} */}
        </div>
    );
};

export default Liveness;
