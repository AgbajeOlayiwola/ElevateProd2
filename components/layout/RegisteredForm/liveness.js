import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Webcam from 'react-webcam';
import ButtonComp from '../../ReusableComponents/Button';
const Liveness = () => {
    const [activeBtn, setActiveBtn] = useState(true);
    const videoConstraints = {
        width: 390,
        height: 480,
        facingMode: 'user'
    };
    return (
        <>
            <div className={styles.imageOut}>
                <div className={styles.imageInner}>
                    <Webcam
                        audio={false}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                </div>
            </div>
            <ButtonComp
                disabled={activeBtn}
                active={activeBtn ? 'active' : 'inactive'}
                type="submit"
                text={'Next'}
            />
        </>
    );
};

export default Liveness;
