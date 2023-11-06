import Script from 'next/script';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import {
    PRODUCTNAME,
    SmileIDPartnerId,
    SmileIdCallbackUrl,
    SmileIdCompName,
    SmileIdEnvironment,
    SmileIdLogoUrl,
    SmileIdPolicyUrl
} from '../../../../utils/constants';
import ButtonComp from '../../../ReusableComponents/Button';
import styles from './styles.module.css';

const Liveness = ({ nextStep }) => {
    const productName = PRODUCTNAME;
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
    return (
        <div className={styles.body}>
            <Script src="https://cdn.smileidentity.com/inline/v1/js/script.min.js"></Script>
            {/* <ToastContainer /> */}

            <div className={styles.cover}>
                <div className={styles.imageOut}>
                    <p className={styles.headerSub}>
                        We will need to check face liveliness to verify identity
                    </p>
                    <p className={styles.headerSub}>Keep Your BVN Close</p>
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
        </div>
    );
};

export default Liveness;
