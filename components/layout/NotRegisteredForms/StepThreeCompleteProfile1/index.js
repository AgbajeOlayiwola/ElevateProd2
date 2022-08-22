import React, { useState, useEffect } from 'react';
import ButtonComp from '../../../ReusableComponents/Button';
import { useForm } from 'react-hook-form';
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
    LastFieldAndButton
} from './styles.module';
import styles from './styles.module.css';
import Card from '../../NotRegisteredForms/Card';
import Progressbar from '../../../ReusableComponents/Progressbar';
import StepFourCompProfile2BizDetails from '../StepFourCompProfile2BizDetails';
import { useDispatch, useSelector } from 'react-redux';
import { CompProfile } from '../../../../redux/actions/actions';
const StepThreeCompleteProfile1 = ({ formData, setFormData }) => {
    const [progress, setProgress] = useState('75%');
    const [switchs, setSwitchs] = useState();
    const [bgcolor, setBgcolor] = useState(false);

    const [profileCont, setProfileCont] = useState([]);

    const handleShowFourthStep = () => {
        setSwitchs((prev) => !prev);
        setBgcolor((prevState) => !prevState);
    };
    const dispatch = useDispatch();
    const { isLoading, profile, errorMessage } = useSelector(
        (state) => state.profile
    );
    const { newCorpAccount, newCorpAccountErrorMMessage } = useSelector(
        (state) => state.newuserCorpAccount
    );

    const [checker, setChecker] = useState();
    const [gender, setGender] = useState('');
    useEffect(() => {
        dispatch(CompProfile());
    }, []);
    useEffect(() => {
        if (profile !== null) {
            setProfileCont(profile.data);
        }
        setGender(profileCont.gender);
    }, [profile]);

    if (gender === 'm') console.log(profileCont);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    // const sendOTP = (data) => {
    //     console.log(data);
    // };
    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <div className={styles.cover}>
            <div>
                <div className={styles.prog}>
                    <CardHeadingBVN>
                        <LeftHeading>Complete your Profile</LeftHeading>
                        {/* <Imag 
                    src="/width" 
                    alt="lineImage" /> */}
                    </CardHeadingBVN>
                    <Progressbar
                        bgcolor="#6CCF00"
                        progressCount={progress}
                        height={14}
                        progWidth="27%"
                    />
                </div>
                {/* The small card that wraps the form */}

                <ButtonWrapper>
                    <ToggleNo
                        onClick={handleShowFourthStep}
                        style={
                            bgcolor
                                ? { background: '#f8f8f8' }
                                : { background: 'rgba(108, 207, 0, 0.3)' }
                        }
                    >
                        <ToggleNoText
                            style={
                                bgcolor
                                    ? { color: '#a5a5a5' }
                                    : { color: '#407a00' }
                            }
                        >
                            Personal details
                        </ToggleNoText>
                    </ToggleNo>
                    <ToggleYes
                        onClick={handleShowFourthStep}
                        style={
                            bgcolor
                                ? { background: 'rgba(108, 207, 0, 0.3)' }
                                : { background: '#f8f8f8' }
                        }
                    >
                        <ToggleYesText
                            style={
                                bgcolor
                                    ? { color: '#407a00' }
                                    : { color: '#a5a5a5' }
                            }
                        >
                            Business details
                        </ToggleYesText>
                    </ToggleYes>
                </ButtonWrapper>

                {switchs ? (
                    <>
                        <StepFourCompProfile2BizDetails
                            formData={formData}
                            setFormData={setFormData}
                        />
                    </>
                ) : (
                    <>
                        <>
                            <div
                                className={styles.dets}
                                style={{ marginTop: '2rem' }}
                            >
                                <Label className={styles.label}>
                                    Enter your Full Name
                                </Label>
                                <br />
                                <FormInput
                                    type="text"
                                    placeholder=""
                                    value={profileCont.fullName}
                                    disabled
                                    {...register('bvn')}
                                />

                                <GenderWrapper>
                                    <Label className={styles.label}>
                                        Select your Gender
                                    </Label>
                                    <br />
                                    <div className={styles.genderInps}>
                                        <div className={styles.male}>
                                            <FormInput
                                                style={{
                                                    width: '15px'
                                                }}
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                {...register('bvn')}
                                            />
                                            <label className={styles.fmLabel}>
                                                Male
                                            </label>
                                        </div>
                                        <div className={styles.female}>
                                            <FormInput
                                                style={{
                                                    width: '15px'
                                                }}
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                {...register('bvn')}
                                            />
                                            <label className={styles.fmLabel}>
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                </GenderWrapper>
                            </div>

                            <ButtonComp
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                text="Next"
                                type="button"
                                // onClick={handleShowSuccessStep}
                                onClick={handleShowFourthStep}
                            />
                        </>
                    </>
                )}
            </div>
        </div>
    );
};

export default StepThreeCompleteProfile1;
