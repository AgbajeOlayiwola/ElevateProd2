import React from 'react';
import Overlay from '../Overlay';
import LinkSvg from '../ReusableSvgComponents/LinkSvg';
import styles from './styles.module.css';
import { MdCancel } from 'react-icons/md';
import { BiLinkAlt } from 'react-icons/bi';
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
                                <BsFacebook />
                            </div>
                            <div className={styles.twitter}>
                                <AiFillTwitterCircle />
                            </div>
                            <div className={styles.googlePlus}>
                                <AiFillGooglePlusCircle />
                            </div>
                            <div className={styles.telegram}>
                                <BsTelegram />
                            </div>
                            <div className={styles.whatsapp}>
                                <BsWhatsapp />
                            </div>
                            <div className={styles.youtube}>
                                <AiFillYoutube />
                            </div>
                            <div className={styles.instagram}>
                                <BsInstagram />
                            </div>
                        </div>
                    </div>
                    <div className={styles.copy}>
                        <BiLinkAlt className={styles.copyBs} />
                        <input
                            type="text"
                            value="ellevate.com/qyweywbdbsdfsds/ei..."
                            className={styles.copyInput}
                        />
                        <p className={styles.copyText}>Copy</p>
                    </div>
                </div>
            </div>
        </Overlay>
    );
};

export default RecievePaymentShare;
