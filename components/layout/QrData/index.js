import React, { useEffect, useRef, useState } from 'react';
import Overlay from '../../ReusableComponents/Overlay';
import styles from './styles.module.css';

import { usePhysicalQrMutation } from '../../../redux/api/authApi';
import exportAsImage from '../../../utils/exportAsImage';
import CloseButton from '../../ReusableComponents/CloseButtonSvg';
import Loader from '../../ReusableComponents/Loader';

const QrFirst = ({ overlay, moveToNext, closeAction }) => {
    const exportRef = useRef();
    const [freeze, setFreeze] = useState(false);
    useEffect(() => {
        physicalQr();
    }, []);

    const [
        physicalQr,
        {
            data: physicalQrData,
            isLoading: physicalQrLoad,
            isSuccess: physicalQrSuccess,
            isError: physicalQrFalse,
            error: physicalQrErr,
            reset: physicalQrReset
        }
    ] = usePhysicalQrMutation();
    console.log(physicalQrData);
    return (
        <Overlay overlay={overlay}>
            <div className={styles.overlay}>
                <div className={styles.cver}>
                    <div className={styles.closeCont}>
                        <CloseButton
                            color="#A5A5A5"
                            classes={styles.closeBtn}
                            action={closeAction}
                        />
                    </div>
                    <div className={styles.topMost}>
                        <h1>Ecobank QR Code</h1>
                        <p>Share QR code to receive money.</p>
                    </div>

                    <>
                        {physicalQrLoad ? (
                            <Loader />
                        ) : (
                            <div className={styles.qrMain}>
                                <img
                                    ref={exportRef}
                                    src={`data:image/png;base64,${''}`}
                                    width={156}
                                    height={156}
                                />
                            </div>
                        )}
                        <div>
                            <div className={styles.ids}>
                                <p>Merchant ID</p>
                                <p>{''}</p>
                            </div>
                            <div className={styles.ids}>
                                <p>Terminal ID</p>
                                <p>{''}</p>
                            </div>
                        </div>
                        <div className={styles.qrDecal}>
                            <p>Request QR Decal</p>
                            <label className={styles.beneChecked}>
                                <input type="checkbox" onChange={(e) => {}} />
                                <span>
                                    <i></i>
                                </span>
                            </label>
                        </div>
                        <div>
                            <button
                                onClick={() =>
                                    exportAsImage(
                                        exportRef.current,
                                        'personalQR'
                                    )
                                }
                            >
                                Download Static QR Code
                            </button>
                            <p className={styles.tap}>
                                Tap to create a
                                <span
                                    className={styles.tapSpan}
                                    onClick={moveToNext}
                                >
                                    {' '}
                                    Ecobank QR Code for a transaction.
                                </span>
                            </p>
                        </div>
                    </>
                </div>
            </div>
        </Overlay>
    );
};

export default QrFirst;
