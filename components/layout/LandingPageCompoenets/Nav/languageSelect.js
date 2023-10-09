import React from 'react';
import styles from './styles.module.css';
import { language } from '../../../ReusableComponents/Data';
import { setLanguage } from '../../../../redux/slices/language';
import { useDispatch } from 'react-redux';

const LanguageSelect = () => {
    const dispatch = useDispatch();
    return (
        <div className={styles.languageSelect}>
            <select onChange={(e) => dispatch(setLanguage(e.target.value))}>
                {language.map((item, index) => {
                    return (
                        <option key={index} value={item.language}>
                            {item.title}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default LanguageSelect;
