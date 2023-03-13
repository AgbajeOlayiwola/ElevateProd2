import React from 'react';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';

const InputTag = ({
    type,
    placeholder,
    name,
    pattern,
    label,
    value,
    action
}) => {
    const { register } = useForm();
    return (
        <div>
            <label>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                className={styles.inputTag}
                // {...register(name, {
                //     required: `${placeholder}  is required`,
                //     pattern: {
                //         value: pattern.value,
                //         message: pattern.message
                //     }
                // })}
                defaultValue={value}
                readOnly
                onChange={action}
            />
        </div>
    );
};

export default InputTag;
