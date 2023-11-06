import React from 'react';
import { MdExpandMore } from 'react-icons/md';
import styles from './styles.module.css';
import { BsChevronDown } from 'react-icons/bs';

const DropDown = ({ defaultVal }) => {
    return (
        <div className={styles.dropDOwn}>
            <select className={styles.select}>
                <option>
                    {defaultVal}
                    <MdExpandMore />
                </option>
            </select>
            <BsChevronDown />
        </div>
    );
};

export default DropDown;
