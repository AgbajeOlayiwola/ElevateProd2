import React from 'react';
import styles from './styles.module.css';
import Popup from '../../layout/Popup';
import {
    EmailShareButton,
    TwitterShareButton,
    TwitterIcon,
    EmailIcon,
    FacebookIcon,
    FacebookShareButton,
    TelegramIcon,
    TelegramShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from 'react-share';
import LinkSvg from '../ReusableSvgComponents/LinkSvg';

const Share = ({ overlay, link, action }) => {
    return (
        <Popup overlay={overlay} action={action}>
            <div className={styles.shareContainer}>
                <EmailShareButton>
                    <EmailIcon round={true} size={48} />
                </EmailShareButton>
                <FacebookShareButton>
                    <FacebookIcon round={true} size={48} />
                </FacebookShareButton>
                <TwitterShareButton>
                    <TwitterIcon round={true} size={48} />
                </TwitterShareButton>
                <TelegramShareButton>
                    <TelegramIcon round={true} size={48} />
                </TelegramShareButton>
                <WhatsappShareButton>
                    <WhatsappIcon round={true} size={48} />
                </WhatsappShareButton>
            </div>
            <div className={styles.secondCopy}>
                <LinkSvg />
                <p>{link}</p>
                <button
                    onClick={() => {
                        {
                            navigator.clipboard.writeText(link).then(() => {
                                alert('Copied');
                            });
                        }
                    }}
                >
                    Copy
                </button>
            </div>
        </Popup>
    );
};

export default Share;
