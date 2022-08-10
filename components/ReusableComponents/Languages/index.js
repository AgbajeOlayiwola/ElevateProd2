import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadLanguageAsync } from '../../../redux/actions/actions';

const Langauges = () => {
    const [languages, setLanguages] = useState([]);
    const [languageValue, setLanguagevalue] = useState('');

    const dispatch = useDispatch();
    const { isLoading, language, errorMessage } = useSelector(
        (state) => state.languages
    );

    useEffect(() => {
        dispatch(loadLanguageAsync());
    }, []);
    useEffect(() => {
        if (language !== null) {
            setLanguages(language);
        }
    }, [language]);
    // console.log(languages);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    // console.log(languages);
    return (
        <div className={styles.select2}>
            <label className={styles.label} htmlFor="languages">
                Language
            </label>
            <br />
            <select
                {...register('first_name', {
                    required: 'Language is required',
                    minLength: {
                        value: 2,
                        message: 'Min length is 2'
                    }
                })}
                id="languages"
                className={styles.selectI}
                name="languages"
                value={languageValue}
                onChange={(e) => {
                    if (e.target.value !== 'English') {
                        setLanguagevalue(languages[0]);
                    }
                }}
            >
                {languages.map((item, index) => {
                    return (
                        <option value={item.name} key={index}>
                            {item.name}
                        </option>
                    );
                })}
            </select>
            {/* <div>error</div> */}
        </div>
    );
};

export default Langauges;
