import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import Axios from 'axios';

const Countries = () => {
    const [countrys, setCountry] = useState([]);

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        try {
            const response = await Axios.get(
                'https://ellevate-app.herokuapp.com/countries'
            );
            setCountry(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }
    // console.log(countrys);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    return (
        <div>
            <label className={styles.label} htmlFor="country">
                Choose Your Country Where you Run Busines
            </label>
            <br />
            <select
                className={styles.select}
                {...register('countries', { required: true })}
            >
                {countrys.map((item, index) => {
                    // console.log(item.nme);
                    return (
                        <option key={item.id} value={item.name}>
                            {item.name}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default Countries;
