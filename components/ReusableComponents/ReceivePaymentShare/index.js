import React from 'react';
import Overlay from '../Overlay';
import LinkSvg from '../ReusableSvgComponents/LinkSvg';
import styles from './styles.module.css';
import { MdCancel } from 'react-icons/md';
import { BiLinkAlt } from 'react-icons/bi';
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
import {
    BsFacebook,
    BsTelegram,
    BsWhatsapp,
    BsInstagram
} from 'react-icons/bs';
import {
    AiFillTwitterCircle,
    AiFillGooglePlusCircle,
    AiFillYoutube
} from 'react-icons/ai';

const RecievePaymentShare = ({
    title,
    action,
    buttonText,
    type,
    overlay,
    closeAction,
    link,
    track,
    amount,
    allLink
}) => {
    return (
        <Overlay overlay={overlay}>
            <div className={styles.generatedOver}>
                <div className={styles.generated}>
                    <div className={styles.cancel}>
                        <MdCancel
                            onClick={closeAction}
                            className={styles.cancelBtn}
                        />
                    </div>
                    <div>
                        <div>
                            <h1>Share</h1>
                        </div>
                        <div className={styles.socials}>
                            <div className={styles.facebook}>
                                <FacebookShareButton
                                    url={'https://www.facebook.com'}
                                    quote={'Dummy text!'}
                                    hashtag="#muo"
                                >
                                    <FacebookIcon size={52} round />
                                </FacebookShareButton>
                            </div>
                            <div className={styles.twitter}>
                                <TwitterShareButton
                                    url={'https://www.example.com'}
                                    quote={'Dummy text!'}
                                    hashtag="#muo"
                                >
                                      
                                    <TwitterIcon size={52} round />
                                </TwitterShareButton>
                            </div>
                            {/* <div className={styles.googlePlus}>
                                <AiFillGooglePlusCircle />
                            </div> */}
                            <div className={styles.telegram}>
                                <TelegramShareButton
                                    url={'https://www.example.com'}
                                    quote={'Dummy text!'}
                                    hashtag="#muo"
                                >
                                    <TelegramIcon size={52} round />
                                </TelegramShareButton>
                            </div>
                            <div className={styles.whatsapp}>
                                <WhatsappShareButton
                                    url={'https://www.example.com'}
                                    quote={'Dummy text!'}
                                    hashtag="#muo"
                                >
                                    <WhatsappIcon size={52} round />
                                </WhatsappShareButton>
                            </div>
                            {/* <div className={styles.youtube}>
                                <AiFillYoutube />
                            </div> */}
                            {/* <div className={styles.instagram}>
                                <BsInstagram />
                            </div> */}
                        </div>
                    </div>
                    <div className={styles.copy}>
                        <LinkSvg className={styles.copyBs} />
                        <input
                            type="text"
                            value="ellevate.com/qyweywbdbsdfsds/ei..."
                            className={styles.copyInput}
                        />
                        <p
                            className={styles.copyText}
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
                        </p>
                    </div>
                </div>
            </div>
        </Overlay>
    );
};

export default RecievePaymentShare;
