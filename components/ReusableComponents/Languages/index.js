import React from 'react';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
const Langauges = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
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
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Spanish">Spanish</option>
            </select>
            {/* <div>error</div> */}
        </div>
    );
};

export default Langauges;
