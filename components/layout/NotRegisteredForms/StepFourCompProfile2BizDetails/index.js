import React, { useState } from 'react';
import ButtonComp from '../../../ReusableComponents/Button';
import { useForm } from 'react-hook-form';
import Card from '../../NotRegisteredForms/Card';
import Link from 'next/link';
import {
    CardContainer,
    CardHeadingBVN,
    LeftHeading,
    // SmallInstructionText,
    Label,
    FormInput,
    ResetOTP,
    InputWrapper,
    ProgressBar,
    SmallCardContainer,
    RegStatusHeading,
    ButtonWrapper,
    ToggleYes,
    ToggleNo,
    ToggleYesText,
    ToggleNoText,
    GenderWrapper,
    LastFieldAndButton,
    SelectInput
} from './styles.module';
import styles from './styles.module.css';
import Progressbar from '../../../ReusableComponents/Progressbar';
import { useDispatch, useSelector } from 'react-redux';
import { CompleteBusinessProfile } from '../../../../redux/actions/actions';
import { useRouter } from 'next/router';
const StepFourCompProfile2BizDetails = ({
    handleShowSuccessStep,
    formData,
    setFormData
}) => {
    const [progress, setProgress] = useState('75%');
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    // const sendOTP = (data) => {
    //     console.log(data);
    // };
    const router = useRouter();
    const [activeBtn, setActiveBtn] = useState(true);
    const { isLoading, compBusprofile, errorMessage } = useSelector(
        (state) => state.completeBusProfile
    );

    const handleSubmitIII = () => {
        const commpleteProfileData = {
            businessName: formData.bussinessName,
            businessType: formData.businessType,
            referralCode: formData.refferalCode,
            countryCode: '+234',
            phoneNumber: formData.bussinessName,
            businessAddress: formData.streetName,
            state: formData.state,
            city: formData.city,
            lga: formData.localGoverment
        };
        console.log(errorMessage);
        dispatch(CompleteBusinessProfile(commpleteProfileData));

        if (!errorMessage) {
            router.push('/Verify/Account/loading');
        }
    };
    return (
        <div>
            <div>
                {/* The small card that wraps the form */}
                <div className={styles.dets}>
                    <SmallCardContainer>
                        <div style={{ marginTop: '2rem' }}>
                            <Label>Enter Business Name</Label>
                            <br />
                            <FormInput
                                type="text"
                                placeholder="Business Full Name"
                                {...register('busnessName')}
                                value={formData.businessName}
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        bussinessName: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <div style={{ marginTop: '2rem' }}>
                            <Label>Enter Business Phone number</Label>
                            <br />
                            <FormInput
                                type="number"
                                placeholder="8999 4048 44"
                                {...register('phoneNumber')}
                                value={formData.bussinesPhone}
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        bussinesPhone: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <div style={{ marginTop: '2rem', width: '100%' }}>
                            <Label>Select Business Type</Label>
                            <br />
                            <SelectInput
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        businessType: event.target.value
                                    });
                                }}
                            >
                                <option value=""></option>
                                <option value="Retail business">
                                    Retail business
                                </option>
                                <option value="Perishable business">
                                    Perishable business
                                </option>
                            </SelectInput>
                        </div>

                        <p className={styles.ent}>Enter Business Address</p>
                        <div className={styles.busAdd}>
                            <div className={styles.inps}>
                                <label>Street Name </label>
                                {errors.email?.message}
                                <br />

                                <FormInput
                                    type="text"
                                    placeholder="Street Name"
                                    {...register('streetName')}
                                    value={formData.streetName}
                                    onChange={(event) => {
                                        setFormData({
                                            ...formData,
                                            streetName: event.target.value
                                        });
                                        //     if (event.target.value.length == 15)
                                        //         return false; //limits to 10 digit entry
                                        //     setPhoneNumber(event?.target.value); //saving input to state
                                        // }}
                                    }}
                                />
                            </div>
                            <div className={styles.inps}>
                                <label>Select Your Local Government </label>
                                {errors.email?.message}
                                <br />

                                <FormInput
                                    type="text"
                                    placeholder="Local Governmenr"
                                    {...register('localGoverment')}
                                    value={formData.localGoverment}
                                    onChange={(event) => {
                                        setFormData({
                                            ...formData,
                                            localGoverment: event.target.value
                                        });
                                        //     if (event.target.value.length == 15)
                                        //         return false; //limits to 10 digit entry
                                        //     setPhoneNumber(event?.target.value); //saving input to state
                                        // }}
                                    }}
                                />
                            </div>
                            <div className={styles.inps}>
                                <label>City </label>
                                {errors.email?.message}
                                <br />

                                <FormInput
                                    type="type"
                                    placeholder="City"
                                    {...register('city')}
                                    value={formData.city}
                                    onChange={(event) => {
                                        setFormData({
                                            ...formData,
                                            city: event.target.value
                                        });
                                        //     if (event.target.value.length == 15)
                                        //         return false; //limits to 10 digit entry
                                        //     setPhoneNumber(event?.target.value); //saving input to state
                                        // }}
                                    }}
                                />
                            </div>
                            <div className={styles.inps}>
                                <label>State </label>
                                {errors.email?.message}
                                <br />
                                <FormInput
                                    type="text"
                                    placeholder="State"
                                    {...register('State')}
                                    value={formData.state}
                                    onChange={(event) => {
                                        setFormData({
                                            ...formData,
                                            state: event.target.value
                                        });
                                        //     if (event.target.value.length == 15)
                                        //         return false; //limits to 10 digit entry
                                        //     setPhoneNumber(event?.target.value); //saving input to state
                                        // }}
                                    }}
                                />
                            </div>
                        </div>
                    </SmallCardContainer>
                </div>
                <LastFieldAndButton>
                    <div>
                        <Label>Enter referral code(Optional)</Label>
                        <br />
                        <FormInput
                            type="text"
                            placeholder="Enter code"
                            {...register('bvn')}
                        />
                    </div>

                    <p className={styles.ent}>Your Signature</p>
                    <div className={styles.busAdd}>
                        <div className={styles.inps}>
                            <label className={styles.signa}>
                                Kindly scan your signature or sign
                                electronically
                            </label>
                            {errors.email?.message}
                            <br />
                            <input className={styles.inputFile} type="file" />
                        </div>
                    </div>
                </LastFieldAndButton>
                {/* <Link href="/Succes"> */}
                <ButtonComp
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    text="Next"
                    type="button"
                    onClick={handleSubmitIII}
                    // onClick={handleShowFourthStep}
                />
                {/* </Link> */}
                {/* <RegistrationStatus>
                   
                </RegistrationStatus>{' '} */}
            </div>
        </div>
    );
};

export default StepFourCompProfile2BizDetails;
