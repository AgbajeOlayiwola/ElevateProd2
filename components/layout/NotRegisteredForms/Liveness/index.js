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
const Liveness = ({ action }) => {
    const [activeBtn, setActiveBtn] = useState(true);

    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        const cookie = getCookie('cookieToken');

        axios
            .post(
                `https://ellevate-test.herokuapp.com/authentication/facematch`,
                { imageSrc },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${cookie}`
                    }
                }
            )
            .then((response) => {
                console.log(response.data.message);
                // setRes(response.data.message);
            })
            .catch((error) => {
                console.log(error.response.data.statusCode);
                // setResErros(error.response.data.statusCode);
            });
    }, [webcamRef, setImgSrc]);

    return (
        <div className={styles.body}>
            <Script src="https://web-button.mati.io/button.js"></Script>

            <div className={styles.cover}>
                <div className={styles.imageOut}>
                    <div>
                        <p className={styles.takeSelf}>Take a Lively Selfie</p>
                        <p className={styles.finish}>
                            Finish up with a clear photo of your face to verify
                            your identity.
                        </p>
                        <div className={styles.imageInner}>
                            <Webcam
                                audio={false}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}
                                ref={webcamRef}
                            />
                        </div>
                    </div>
                </div>

                {imgSrc && <img src={imgSrc} />}
                <ButtonComp
                    onClick={capture}
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    type="submit"
                    text={'Snap'}
                    // action={action}
                />
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
