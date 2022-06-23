import React from 'react';
import ButtonComp from '../../ReusableComponents/Button';
// import { RegisteredCardWrapper } from './styles.module';
import { useForm } from 'react-hook-form';
import { Label, FormInput, InputWrapper } from './styles.module';

const RegisteredForm = ({ handleShowSecondStep }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <div>
                    <Label>Enter your BVN</Label>
                    <br />
                    <FormInput
                        type="number"
                        placeholder="Your BVN"
                        {...register('bvn')}
                    />
                </div>
                <InputWrapper>
                    <label>Phone Number</label>
                    <br />
                    <FormInput
                        type="number"
                        placeholder="+234 812 345 6789"
                        {...register('bvn')}
                    />
                </InputWrapper>
                <InputWrapper>
                    <label>Date of Birth</label>
                    <br />
                    <FormInput
                        type="date"
                        placeholder="Your BVN"
                        {...register('bvn')}
                    />
                </InputWrapper>
                <ButtonComp
                    width="100%"
                    height="52px"
                    text="Next"
                    type="button"
                    backgroundColor="#6ccf00"
                    color="#ffffff"
                    fontWeight="900"
                    margin="20% 0 0 0"
                    onClick={handleShowSecondStep}
                />
            </form>
        </div>
    );
};

export default RegisteredForm;
