import React from 'react';
import ButtonComp from '../../ReusableComponents/Button';
// import { RegisteredCardWrapper } from './styles.module';
import { useForm } from 'react-hook-form';
import { Label, FormInput, InputWrapper } from './styles.module';

const RegisteredForm = ({ handleShowSecondStep, isRegistered }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}

                {isRegistered ? (
                    <>
                        <div>
                            <InputWrapper>
                                <Label>
                                    Enter your RC Number/Business Registration
                                    Number
                                </Label>
                            </InputWrapper>
                            <br />
                            <FormInput
                                name="bvn"
                                type="number"
                                placeholder="Your Business Registration number"
                                {...register('bvn', {
                                    required: 'BVN is required',
                                    minLength: {
                                        value: 10,
                                        message: 'Min length is 10'
                                    }
                                })}
                            />
                            <div className="errors">{errors.bvn?.message}</div>
                        </div>
                        <InputWrapper>
                            <Label>Enter your TIN</Label>
                            <br />
                            <FormInput
                                type="text"
                                placeholder="Your Tax Identification number"
                                {...register('tin')}
                            />
                        </InputWrapper>
                    </>
                ) : (
                    ''
                )}
                <InputWrapper>
                    <Label>Enter your BVN</Label>
                    <br />
                    <FormInput
                        type="number"
                        placeholder="Your BVN"
                        {...register('bvn')}
                    />
                </InputWrapper>
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
                    text="Next"
                    type="submit"
                    onClick={handleShowSecondStep}
                />
            </form>
        </div>
    );
};

export default RegisteredForm;
