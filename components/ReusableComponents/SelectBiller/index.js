import React, { useState } from 'react';
import styles from './styles.module.css';

const SlectBiller = ({ biller, showForms }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const [searchText, setSearchText] = useState(''); // Define searchText state
    const [expanded, setExpanded] = useState(
        new Array(biller?.length)?.fill(false)
    );
    return (
        <div>
            <div onClick={toggleDropdown} className={styles.billerCategory}>
                <h2>{biller?.billerCategory}</h2>
            </div>
            {isOpen &&
                biller?.items?.map((item, j) => (
                    <div
                        onClick={() => showForms(item?.billerCode)}
                        key={j}
                        className="billerItem"
                    >
                        <span className="catText">{item?.billerName}</span>
                    </div>
                ))}
        </div>
    );
};

export default SlectBiller;
