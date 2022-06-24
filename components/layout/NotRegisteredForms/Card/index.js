import React from 'react';
import styles from './styles.module.css';

const Card = ({ children }) => {
    return <div className={styles.cover}>{children}</div>;
};

export default Card;
