import React from 'react';
import { useSelector } from 'react-redux';
import {
    FacebookIcon,
    FacebookShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from 'react-share';
import Popup from '../../layout/Popup';
import LinkSvg from '../ReusableSvgComponents/LinkSvg';
import styles from './styles.module.css';

const Share = ({ overlay, link, action, title, backward }) => {
    const { ussdData } = useSelector((store) => store);
    return (
        <Popup overlay={overlay} action={backward}>
            {title == 'ecoQr' ? (
                <>
                    <div className={styles.shareContainer}>
                        <div className={styles.facebook}>
                            <FacebookShareButton
                                url={link}
                                quote={'Dummy text!'}
                                hashtag="#muo"
                            >
                                <FacebookIcon size={52} round />
                            </FacebookShareButton>
                        </div>
                        <div className={styles.twitter}>
                            <TwitterShareButton
                                url={link}
                                quote={'Dummy text!'}
                                hashtag="#muo"
                            >
                                  
                                <TwitterIcon size={52} round />
                            </TwitterShareButton>
                        </div>
                        <div className={styles.telegram}>
                            <TelegramShareButton
                                url={link}
                                quote={'Dummy text!'}
                                hashtag="#muo"
                            >
                                <TelegramIcon size={52} round />
                            </TelegramShareButton>
                        </div>
                        <div className={styles.whatsapp}>
                            <WhatsappShareButton
                                url={link}
                                quote={'Dummy text!'}
                                hashtag="#muo"
                            >
                                <WhatsappIcon size={52} round />
                            </WhatsappShareButton>
                        </div>
                    </div>

                    <div className={styles.secondCopy}>
                        <LinkSvg />
                        <input
                            styles={{ border: 'none' }}
                            type="text"
                            value={link}
                        />
                        <button
                            onClick={() => {
                                {
                                    navigator.clipboard
                                        .writeText(link)
                                        .then(() => {
                                            alert('Copied');
                                        });
                                }
                            }}
                        >
                            Copy
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.shareContainer}>
                        <div className={styles.facebook}>
                            <FacebookShareButton
                                url={link}
                                quote={'Dummy text!'}
                                hashtag="#muo"
                            >
                                <FacebookIcon size={52} round />
                            </FacebookShareButton>
                        </div>
                        <div className={styles.twitter}>
                            <TwitterShareButton
                                url={link}
                                quote={'Dummy text!'}
                                hashtag="#muo"
                            >
                                  
                                <TwitterIcon size={52} round />
                            </TwitterShareButton>
                        </div>
                        <div className={styles.telegram}>
                            <TelegramShareButton
                                url={link}
                                quote={'Dummy text!'}
                                hashtag="#muo"
                            >
                                <TelegramIcon size={52} round />
                            </TelegramShareButton>
                        </div>
                        <div className={styles.whatsapp}>
                            <WhatsappShareButton
                                url={link}
                                quote={'Dummy text!'}
                                hashtag="#muo"
                            >
                                <WhatsappIcon size={52} round />
                            </WhatsappShareButton>
                        </div>
                    </div>

                    <div className={styles.secondCopy}>
                        <LinkSvg />
                        <input
                            styles={{ border: 'none' }}
                            type="text"
                            value={`${ussdData?.code}${ussdData?.ussdData?.reference}#`}
                        />
                        <button
                            onClick={() => {
                                {
                                    navigator.clipboard
                                        .writeText(
                                            `${ussdData?.code}${ussdData?.ussdData?.reference}#`
                                        )
                                        .then(() => {
                                            alert('Copied');
                                        });
                                }
                            }}
                        >
                            Copy
                        </button>
                    </div>
                </>
            )}
        </Popup>
    );
};

export default Share;
