import React from 'react';
import AccountChecked from '../ReusableSvgComponents/AccountCheckedSvg';
import InfoSvg from '../ReusableSvgComponents/InfoSvg';
import styles from './styles.module.css';
import * as RiIcons from 'react-icons/ri';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const AccountUpgradeSingle = ({
    textII,
    icon,
    text,
    index,
    action,
    statusInfo,
    status,
    content
}) => {
    return (
        <>
            <div
                key={index}
                onClick={action}
                className={styles.accountUpgradeSingle}
            >
                <div className={styles.accountUpgradeSingleIcon}>{icon}</div>
                <div className={styles.accountUpgradeSingleText}>
                    <h2>
                        {text}
                        {text === 'Documents' ? (
                            <span className={styles.downLine}>
                                <RiIcons.RiArrowDownSLine />
                            </span>
                        ) : null}
                    </h2>
                    <div>
                        {text === 'Documents' ? (
                            <p onClick={action} className={styles.moreInfo}>
                                Click For More <RiIcons.RiArrowDownSLine />
                            </p>
                        ) : (
                            <>
                                <Tooltip id="my-tooltip" />

                                <p
                                    key={index}
                                    data-tooltip-id="my-tooltip"
                                    className={styles.moreInfo}
                                    data-tooltip-content="More About this account upgrade option"
                                >
                                    More Info
                                </p>
                                <InfoSvg />
                            </>
                        )}
                    </div>
                </div>

                <Tooltip anchorId={textII} content={content} />
                <div className={styles.accountUpgradeSingleChecked}>
                    <AccountChecked statusInfo={statusInfo} />

                    <p id={textII}>{status}</p>
                </div>
            </div>
        </>
    );
};

export default AccountUpgradeSingle;
