import React from 'react';
import ButtonComp from '../../../ReusableComponents/Button';
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
                            <FormInput
                                type="text"
                                placeholder="Your Business Registration number"
                                name="rc_number"
                                {...register('rc_number', {
                                    required: 'BVN is required',
                                    minLength: {
                                        value: 10,
                                        message: 'Min length is 10'
                                    }
                                })}
                            />
                            <div className="errors">
                                {errors.rc_number?.message}
                            </div>
                        </div>
                        <InputWrapper>
                            <Label>Enter your TIN</Label>
                            <br />
                            <FormInput
                                name="tin"
                                type="text"
                                placeholder="Your Tax Identification number"
                                {...register('tin')}
                            />
                            <div className="errors">{errors.tin?.message}</div>
                        </InputWrapper>
                        <ButtonComp
                            width="100%"
                            height="52px"
                            text="Next"
                            type="submit"
                            backgroundColor="#6ccf00"
                            color="#ffffff"
                            fontWeight="900"
                            margin="20% 0 0 0"
                            onClick={handleShowSecondStep}
                        />
                    </>
                ) : (
                    ''
                )}

                {!isRegistered ? (
                    <>
                        <InputWrapper>
                            <Label>Enter your BVN</Label>
                            <br />
                            <FormInput
                                type="number"
                                placeholder="Your BVN"
                                name="bvn"
                                {...register('bvn', {
                                    required: 'BVN is required',
                                    minLength: {
                                        value: 10,
                                        message: 'Min length is 10'
                                    }
                                })}
                            />
                            <div className="errors">{errors.bvn?.message}</div>
                        </InputWrapper>
                        <InputWrapper>
                            <label>Phone Number</label>
                            <br />
                            <FormInput
                                type="number"
                                placeholder="+234 812 345 6789"
                                {...register('phone_number', {
                                    required: 'BVN is required',
                                    minLength: {
                                        value: 9,
                                        message: 'Min length is 9'
                                    }
                                })}
                            />
                            <div className="errors">
                                {errors.phone_number?.message}
                            </div>
                        </InputWrapper>
                        <InputWrapper>
                            <label>Date of Birth</label>
                            <br />
                            <FormInput
                                type="date"
                                placeholder="Your BVN"
                                {...register('date_of_birth', {
                                    required: 'Date of birth is required',
                                    minLength: {
                                        value: 9,
                                        message: 'Min length is 9'
                                    }
                                })}
                            />
                            <div className="errors">
                                {errors.date_of_birth?.message}
                            </div>
                        </InputWrapper>
                        <ButtonComp
                            width="100%"
                            height="52px"
                            text="Next"
                            type="submit"
                            backgroundColor="#6ccf00"
                            color="#ffffff"
                            fontWeight="900"
                            margin="20% 0 0 0"
                            onClick={handleShowSecondStep}
                        />
                    </>
                ) : (
                    ''
                )}
            </form>
        </div>
    );
};

export default RegisteredForm;
