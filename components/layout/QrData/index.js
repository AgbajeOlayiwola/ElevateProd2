import React, { useEffect, useState, useRef } from 'react';
import Overlay from '../../ReusableComponents/Overlay';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    getQrMerchantInfoGen,
    requestPhysicalQrAction
} from '../../../redux/actions/actions';
import exportAsImage from '../../../utils/exportAsImage';
import CloseButton from '../../ReusableComponents/CloseButtonSvg';

const QrFirst = ({ overlay, moveToNext, closeAction }) => {
    const {
        getQrMerchnatInfoSuccess,
        getQrMerchnatInfoErrorMessage
    } = useSelector((state) => state.getQrMerchantInfoReducermport);
    const {
        requestPhysicalQrSuccess,
        requestPhysicalQrErrorMessage
    } = useSelector((state) => state.requestPhysicalQrReducer);

    useEffect(() => {
        console.log(requestPhysicalQrSuccess, requestPhysicalQrErrorMessage);
    }, [requestPhysicalQrSuccess, requestPhysicalQrErrorMessage]);

    const [merchantInf, setMerchantInfo] = useState();
    const [error, setError] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getQrMerchantInfoGen());
        console.log(getQrMerchnatInfoSuccess);
    }, []);
    useEffect(() => {
        if (getQrMerchnatInfoSuccess != null) {
            setMerchantInfo(getQrMerchnatInfoSuccess);
        } else if (getQrMerchnatInfoErrorMessage !== null) {
            setError(getQrMerchnatInfoErrorMessage.response.data.message);
        }
    }, [getQrMerchnatInfoSuccess, getQrMerchnatInfoErrorMessage]);
    const exportRef = useRef();
    const [freeze, setFreeze] = useState(false);
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
                    {error ? (
                        <h2 className={styles.error}>{error}</h2>
                    ) : (
                        <>
                            <div className={styles.qrMain}>
                                <img
                                    ref={exportRef}
                                    src={`data:image/png;base64,${merchantInf?.staticQRCodeBase64}`}
                                    width={156}
                                    height={156}
                                />
                            </div>
                            <div>
                                <div className={styles.ids}>
                                    <p>Merchant ID</p>
                                    <p>{merchantInf?.merchantCode}</p>
                                </div>
                                <div className={styles.ids}>
                                    <p>Terminal ID</p>
                                    <p>{merchantInf?.terminalId}</p>
                                </div>
                            </div>
                            <div className={styles.qrDecal}>
                                <p>Request QR Decal</p>
                                <label
                                    className={
                                        freeze
                                            ? styles.beneChecked
                                            : styles.beneCheck
                                    }
                                >
                                    <input
                                        type="checkbox"
                                        onChange={(e) => {
                                            if (!freeze) {
                                                dispatch(
                                                    requestPhysicalQrAction()
                                                );
                                                if (getQrMerchnatInfoSuccess) {
                                                    setFreeze(true);
                                                }
                                            }
                                        }}
                                    />
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
                    )}
                </div>
            </div>
        </Overlay>
    );
};

export default QrFirst;
