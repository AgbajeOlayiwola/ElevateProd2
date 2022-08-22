import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import ButtonComp from '../../../ReusableComponents/Button';
import Webcam from 'react-webcam';

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
    }, [webcamRef, setImgSrc]);

    return (
        <>
            <div className={styles.imageOut}>
                <div>
                    <p className={styles.takeSelf}>Take a Lively Selfie</p>
                    <p className={styles.finish}>
                        Finish up with a clear photo of your face to verify your
                        identity.
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
            {/* <ButtonComp
                onClick={capture}
                disabled={activeBtn}
                active={activeBtn ? 'active' : 'inactive'}
                type="submit"
                text={'Next'}
            /> */}
            {/* {imgSrc && <img src={imgSrc} />} */}
        </>
    );
};

export default Liveness;
