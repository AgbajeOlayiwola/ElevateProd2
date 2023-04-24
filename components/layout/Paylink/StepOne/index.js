import Link from 'next/link';
import React, { useState } from 'react';
import styles from './styles.module.css';
import ButtonComp from '../../../ReusableComponents/Button';
import { MdCancel } from 'react-icons/md';
import { BiLinkAlt } from 'react-icons/bi';

const PaylinkStepOne = () => {
    const [activeBtn, setActiveBtn] = useState(true);

    return (
        <div>
            <div className={styles.cancel}>
                <MdCancel className={styles.cancelBtn} />
            </div>
            <div className={styles.generated}>
                <div>
                    <h1>Payment Link Generated</h1>
                    <p>Share payment link to receive payment.</p>
                    <div className={styles.copy}>
                        <BiLinkAlt className={styles.copyBs} />
                        <input
                            type="text"
                            value="ellevate.com/qyweywbdbsdfsds/ei..."
                            className={styles.copyInput}
                        />
                        <p className={styles.copyText}>Copy</p>
                    </div>
                    <div className={styles.btmComp}>
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            type="submit"
                            text={'Share Paylink'}
                            // err={errorM}
                            // loads={loads}
                            // onClick={actionI}
                        />
                    </div>
                    <p className={styles.create}>
                        Tap to create a{' '}
                        <Link href="#"> Payment Link for a transaction.</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaylinkStepOne;
