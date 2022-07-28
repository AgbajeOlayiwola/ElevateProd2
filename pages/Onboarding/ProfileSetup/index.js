import React, { useState } from 'react';
import { ButtonComp, Progressbar } from '../../../components';
import lineImage from '../../../public/Assets/Svgs/Rectangle 12.svg';
import Image from 'next/image';
// import ProfileCard from '../../../components/ReusableComponents/ProfileCard';
import RegisteredForm from '../../../components/layout/NotRegisteredForms/RegisteredForm';
import StepTwoBVNAuthenticator from '../../../components/layout/NotRegisteredForms/StepTwoBVNAuthenticator';
import StepThreeCompleteProfile1 from '../../../components/layout/NotRegisteredForms/StepThreeCompleteProfile1';
import StepFourCompProfile2BizDetails from '../../../components/layout/NotRegisteredForms/StepFourCompProfile2BizDetails';
import StepFiveSuccessPage from '../../../components/layout/NotRegisteredForms/StepFiveSucceesPage';
import Card from '../../../components/layout/NotRegisteredForms/Card';
import styles from './styles.module.css';
import ProfileSetups from '../../../components/layout/NotRegisteredForms';

const ProfileSetup = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [bgcolor, setBgcolor] = useState(false);
    const [showFirstStep, setShowFirstStep] = useState(true);
    const [showSecondStep, setShowSecondStep] = useState(false);
    const [showThirdStep, setShowThirdStep] = useState(false);
    const [showFourthStep, setShowFourthStep] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // A function to handle business registration status

    // Handle the mulstistep hide and display of a particular step

    // Handle the multistep to display the third step
    const handleShowThirdStep = () => {
        setShowThirdStep(true);
        setShowSecondStep(false);
    };

    // Handle the multistep to display the fourth step
    const handleShowFourthStep = () => {
        setShowThirdStep(false);
        setShowFourthStep(true);
    };

    // Handle the multistep to display the fifth-success step
    const handleShowSuccessStep = () => {
        // alert('working');
        setShowThirdStep(false);
        setShowSuccess(true);
    };
    const handleShowThirdStepOnly = () => {
        // setShowThirdStep(true);
        // showFirstStep(false);
        // setShowSecondStep(false);
        // setShowFourthStep(false);
        alert('working');
    };

    return (
        <div className={styles.Cover}>
            <ProfileSetups />
        </div>
    );
};

export default ProfileSetup;
