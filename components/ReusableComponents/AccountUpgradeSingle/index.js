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
    statusInfo
}) => {
    return (
        <>
            <div key={index} className={styles.accountUpgradeSingle}>
                <div className={styles.accountUpgradeSingleIcon}>{icon}</div>
                <div className={styles.accountUpgradeSingleText}>
                    <h2 onClick={action}>
                        {text}
                        {text === 'Documents' ? (
                            <span>
                                <RiIcons.RiArrowDownSLine />
                            </span>
                        ) : null}
                    </h2>
                    <div>
                        <p>More Info</p>
                        <InfoSvg />
                    </div>
                </div>

                <Tooltip anchorId={textII} content="hello world!" />
                <div className={styles.accountUpgradeSingleChecked}>
                    <AccountChecked statusInfo={statusInfo} />

                    <p id={textII}>pending</p>
                </div>
            </div>
        </>
    );
};

export default AccountUpgradeSingle;
