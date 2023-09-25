import Image from 'next/image';
import React from 'react';
import DownloadFromPlayStore from '../../../ReusableComponents/DownloadFromPlaystore';
import DownloadFromAppStore from '../../../ReusableComponents/DownloadForAppStore';
import styles from './styles.module.css';
import Cover from '../Cover';
const DownloadSect = () => {
    return (
        <div className={styles.outerCover}>
            <Cover>
                <div className={styles.monitorPhoneImage}>
                    <div className={styles.monitorPhoneImages}>
                        <Image
                            src="/Assets/Images/phone.png"
                            width="135.385px"
                            height="281.184px"
                        />
                        <Image
                            src="/Assets/Images/laptop.png"
                            width="477.678px"
                            height="366.789px"
                        />
                    </div>

                    <div>
                        <h1>Available across all platforms </h1>
                        <div className={styles.downBtns}>
                            <div>
                                <DownloadFromPlayStore />
                                <DownloadFromAppStore />
                            </div>
                        </div>
                    </div>
                </div>
            </Cover>
        </div>
    );
};

export default DownloadSect;
