import React, { useState } from 'react';
import Card from './Card/index';
import ButtonComp from '../../ReusableComponents/Button';
import RegisteredForm from './RegisteredForm';
import StepTwoBVNAuthenticator from './StepTwoBVNAuthenticator';
import StepThreeCompleteProfile1 from './StepThreeCompleteProfile1';
import styles from './styles.module.css';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { createProfileSetup } from '../../../redux/actions/actions';
const ProfileSetups = () => {
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        type: 'UNREGISTERED BUSINESS',
        rcnumber: '',
        tinNumber: '',
        bvNumber: '',
        phoneNumber: '',
        dateOfBirth: '',
        bvnOtp: '',
        gender: '',
        bussinessName: '',
        bussinesPhone: '',
        BusinessType: '',
        streetName: '',
        localGoverment: '',
        city: '',
        state: ''
    });
    const [activeBtn, setActiveBtn] = useState(true);

    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return (
                    <RegisteredForm
                        formData={formData}
                        setFormData={setFormData}
                    />
                );
            case 1:
                return (
                    <StepTwoBVNAuthenticator
                        formData={formData}
                        setFormData={setFormData}
                    />
                );
            case 2:
                return (
                    <StepThreeCompleteProfile1
                        formData={formData}
                        setFormData={setFormData}
                    />
                );
            default:
                return (
                    <RegisteredForm
                        formData={formData}
                        setFormData={setFormData}
                    />
                );
        }
    };
    const dispatch = useDispatch();
    function handleSubmit() {
        setPage(page + 1);
        // console.log('firstAPi');
        const profileData = {
            type: formData.type,
            registrationNumber: formData.rcnumber,
            tin: formData.tinNumber,
            bvn: formData.bvNumber,
            phoneNumber: formData.phoneNumber,
            dob: formData.dateOfBirth
        };
        dispatch(createProfileSetup(profileData));
    }

    const handleSubmitII = () => {
        setPage(page + 1);
        console.log('secondAPi');
    };
    return (
        <Card>
            {conditionalComponent()}
            {page === 2 ? null : (
                <ButtonComp
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    onClick={page === 0 ? handleSubmit : handleSubmitII}
                    type="submit"
                    text={page === 2 ? 'Next' : 'Next'}
                />
            )}
        </Card>
    );
};

export default ProfileSetups;
