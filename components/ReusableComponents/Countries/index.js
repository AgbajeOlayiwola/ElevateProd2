import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadCountryAsync } from '../../../redux/reducers/countries/country.thunks';

const Countriess = () => {
    const [countrys, setCountry] = useState([]);
    const dispatch = useDispatch();
    const { isLoading, countries, errorMessage } = useSelector(
        (state) => state.countryReducer
    );

    useEffect(() => {
        dispatch(loadCountryAsync());
        setCountry(countries);
    }, []);

    console.log(countrys);
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

export default Countriess;
