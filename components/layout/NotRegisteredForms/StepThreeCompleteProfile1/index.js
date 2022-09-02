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
const StepThreeCompleteProfile1 = ({ formData, setFormData, action }) => {
    // const [progress, setProgress] = useState('75%');
    const [title, setTitle] = useState('Basic');
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
        <div className={styles.bodyWrapper}>
            <div className={styles.prog}>
                <CardHeadingBVN>
                    <LeftHeading>Complete your Profile</LeftHeading>
                    {/* <Imag 
                    src="/width" 
                    alt="lineImage" /> */}
                </CardHeadingBVN>
                {/* <Progressbar
                            bgcolor="#6CCF00"
                            progressCount={progress}
                            height={14}
                            progWidth="27%"
                        /> */}
            </div>
            {/* The small card that wraps the form */}
            <div className={styles.businessCont}>
                <ButtonWrapper>
                    <div
                        className={
                            title === 'Basic' ? styles.first : styles.second
                        }
                    >
                        <h2
                            onClick={() => {
                                setTitle('Basic');
                            }}
                        >
                            1
                        </h2>
                        <p>Basic Details</p>
                    </div>
                    <div
                        className={
                            title === 'Other' ? styles.first : styles.second
                        }
                    >
                        <h2
                            onClick={() => {
                                setTitle('Other');
                            }}
                        >
                            2
                        </h2>
                        <p>Other Details</p>
                    </div>
                    {/* <ToggleNo
                                onClick={handleShowFourthStep}
                                style={
                                    bgcolor
                                        ? { background: '#f8f8f8' }
                                        : {
                                              background:
                                                  'rgba(108, 207, 0, 0.3)'
                                          }
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
                                        ? {
                                              background:
                                                  'rgba(108, 207, 0, 0.3)'
                                          }
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
                            </ToggleYes> */}
                </ButtonWrapper>
                {title === 'Basic' ? (
                    <>
                        <div className={styles.nameDiv}>
                            <div className={styles.formGroups}>
                                <label>Enter Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Babatunde Abiodun"
                                    disabled
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Select your Gender</label>
                                <select name="" id="">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.formCont}>
                            <div className={styles.formGroup}>
                                <div className={styles.singleFormGroup}>
                                    <label>Enter Business Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Business Full Name"
                                    />
                                </div>
                                <div className={styles.singleFormGroup}>
                                    <label>Select your Business Category</label>

                                    <select name="" id="">
                                        <option value="">
                                            Select your Business Category
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <div className={styles.singleFormGroup}>
                                    <label>
                                        Enter your Business Phone Number
                                    </label>
                                    <div className={styles.phone}>
                                        <div className={styles.phoneHeader}>
                                            <span>
                                                <img
                                                    src={formData.flag}
                                                    alt=""
                                                />
                                            </span>
                                            <p>{formData.baseCurrency}</p>
                                        </div>
                                        <div className={styles.phoneDetails}>
                                            <p>{formData.countryCode}</p>
                                            <input
                                                type="number"
                                                placeholder="812 345 6789"
                                                {...register(
                                                    'countryCode_number',
                                                    {
                                                        required:
                                                            'Country Code is required',
                                                        minLength: {
                                                            value: 9,
                                                            message:
                                                                'Min length is 9'
                                                        }
                                                    }
                                                )}
                                                value={formData.phoneNumber}
                                                onChange={(event) => {
                                                    setFormData({
                                                        ...formData,
                                                        phoneNumber:
                                                            event.target.value
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.singleFormGroup}>
                                    <label>Select your Business Type</label>

                                    <select name="" id="">
                                        <option value="">
                                            Select your Business Type
                                        </option>
                                    </select>
                                </div>
                                <button
                                    onClick={() => {
                                        setTitle('Other');
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.nameDiv}>
                            <div className={styles.formGroup}>
                                <div>
                                    <label>Street Name</label>
                                    <div className={styles.addressNumber}>
                                        <input
                                            type="text"
                                            placeholder="101"
                                            className={styles.number}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Enter Street Name"
                                        />
                                    </div>
                                </div>
                                <div className={styles.singleFormGroup}>
                                    <label>Local Government Area (LGA)</label>
                                    <select name="" id="">
                                        <option value="">Select LGA</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <div
                                    className={styles.singleFormGroup}
                                    style={{
                                        marginTop: '0px'
                                    }}
                                >
                                    <label>State</label>
                                    <select name="" id="">
                                        <option value="">Select State</option>
                                    </select>
                                </div>
                                <div className={styles.singleFormGroup}>
                                    <label>City/Town</label>
                                    <input
                                        type="text"
                                        placeholder="Enter City/Town"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.formCont}>
                            <div className={styles.formGroup}>
                                <div className={styles.singleFormGroup}>
                                    <label>
                                        Enter Referral Code{' '}
                                        <span>(Optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Code"
                                    />
                                </div>
                                <button onClick={action}>
                                    Save & Continue
                                </button>
                            </div>
                            <div className={styles.formGroup}>
                                <div className={styles.singleFormGroup}>
                                    <label>Upload Signature</label>
                                    <div className={styles.sign}>
                                        <p>No file chosen...</p>
                                        <label>
                                            <input
                                                type="file"
                                                placeholder="Enter Code"
                                            />
                                            Upload
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {/* {switchs ? (
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
                                                    <label
                                                        className={
                                                            styles.fmLabel
                                                        }
                                                    >
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
                                                    <label
                                                        className={
                                                            styles.fmLabel
                                                        }
                                                    >
                                                        Female
                                                    </label>
                                                </div>
                                            </div>
                                        </GenderWrapper>
                                    </div>

                                    <ButtonComp
                                        disabled={activeBtn}
                                        active={
                                            activeBtn ? 'active' : 'inactive'
                                        }
                                        text="Next"
                                        type="button"
                                        // onClick={handleShowSuccessStep}
                                        onClick={handleShowFourthStep}
                                    />
                                </>
                            </>
                        )} */}
            </div>
        </div>
    );
};

export default StepThreeCompleteProfile1;
