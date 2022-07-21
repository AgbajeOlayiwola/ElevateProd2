import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
const Langauges = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        try {
            const response = await Axios.get(
                'https://ellevate-app.herokuapp.com/languages'
            );
            setLanguages(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }
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
