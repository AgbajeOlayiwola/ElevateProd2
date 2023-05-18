import React from 'react';
import styles from './styles.module.css';
import Popup from '../../layout/Popup';
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    TelegramShareButton,
    TelegramIcon,
    WhatsappShareButton,
    WhatsappIcon,
    InstapaperShareButton
} from 'react-share';
import LinkSvg from '../ReusableSvgComponents/LinkSvg';

const Share = ({ overlay, link, action, title }) => {
    return (
        <Popup overlay={overlay} action={action}>
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
            )}
        </Popup>
    );
};

export default Share;
