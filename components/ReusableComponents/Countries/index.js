import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadCountry } from '../../../redux/actions/actions';

const Countriess = () => {
    const [countrys, setCountry] = useState([]);
    const dispatch = useDispatch();
    const { isLoading, countries, errorMessage } = useSelector(
        (state) => state.countryReducer
    );

    useEffect(() => {
        dispatch(loadCountry());
        if (countries !== null) {
            setCountry(countries);
        }
    }, []);
    useEffect(() => {
        if (countries !== null) {
            setCountry(countries);
        }
    }, [countries]);
    // console.log(countries);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    return (
        <div>
            <label className={styles.label} htmlFor="country">
                Choose The Country Where you Run Busines
            </label>
            <br />
            <select
                className={styles.select}
                {...register('countriess', { required: true })}
                name="countriess"
                required
            >
                <option value="">Choose Country</option>
                {countrys.map((item, index) => {
                    // console.log(item.nme);
                    return (
                        <option key={index} value={item.name}>
                            {item.name}
                        </option>
                    );
                })}
            </select>
            <p className={styles.error}>{errors?.countriess?.message}</p>
        </div>
    );
};

export default Countriess;
