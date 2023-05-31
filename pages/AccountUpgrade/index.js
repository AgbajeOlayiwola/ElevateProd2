import React, { useState } from 'react';
import styles from './styles.module.css';
import DounutComp from '../../components/ReusableComponents/Chart/Dougnut';
import AccountUpgradeSingle from '../../components/ReusableComponents/AccountUpgradeSingle';
import AddressSvg from '../../components/ReusableComponents/ReusableSvgComponents/AddressSvg';
import BillSvg from '../../components/ReusableComponents/ReusableSvgComponents/BillSvg';
import IdCard from '../../components/ReusableComponents/ReusableSvgComponents/IdCardSvg';
import AccountUpgradeComponent from '../../components/ReusableComponents/AccountUpgradeComponent';
import { useRouter } from 'next/router';
// import { location } from '../../components/ReusableComponents/Data';
import DirectorsSvg from '../../components/ReusableComponents/ReusableSvgComponents/DirectorsSvg';
import SignatureRuleSvg from '../../components/ReusableComponents/ReusableSvgComponents/SignatureRuleSvg';
import { useEffect } from 'react';
import Iframe from 'react-iframe';
import Modal from 'react-modal';
import Link from 'next/link';
import Lottie from 'react-lottie';
import socialdata from '../../components/ReusableComponents/Lotties/loading.json';
import { useDispatch, useSelector } from 'react-redux';
import {
    cacData,
    identificationDocData,
    memartData,
    scmulData,
    uploadUtilityData,
    statesData,
    loadsetTransactionPin,
    loadUserProfile,
    uploadRefFormData,
    shareDocumentsData,
    pushDocumentsData,
    postEllevateProfilingDetails,
    loadprofilingQuestions,
    postvnin,
    getAddressStatusDetails,
    getReffereeDetails,
    getTinDetails,
    getUploadReffereeDetails,
    getCacDocumentDetails
} from '../../redux/actions/actions';
import 'react-tooltip/dist/react-tooltip.css';
import { useForm } from 'react-hook-form';
import Loader from '../../components/ReusableComponents/Loader';
import Visbility from '../../components/ReusableComponents/Eyeysvg';
import PaymentSuccess from '../../components/ReusableComponents/PopupStyle';
import { ButtonComp } from '../../components';
import { Tooltip } from 'react-tooltip';
import withAuth from '../../components/HOC/withAuth';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        height: '70vh',
        width: '40vw',
        color: '#3e3e3e',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const AccountUpgrade = () => {
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    // let profilingQuestion;
    // let profilingQuestionsData = null;
    // if (typeof window !== 'undefined') {
    //     profilingQuestion = window.localStorage.getItem('profiling');
    //     profilingQuestionsData = JSON.parse(profilingQuestion);
    // }
    const router = useRouter();
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');
    const [localState, setLocalState] = useState('');
    const [location, setLocation] = useState([]);
    const [profile, setProfile] = useState({});
    const [localGovernment, setLocalGovernment] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [loading, setLoading] = useState('');
    const [title, setTitle] = useState('First');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [director, setDirector] = useState(false);
    const [outcome, setOutcome] = useState(false);
    const [scmulfile, setScmulFile] = useState('');
    const [scmulfileName, setScmulFileName] = useState('');
    const [co2file, setCo2File] = useState('');
    const [co2FileName, setCo2FileName] = useState('');
    const [co7file, setCo7File] = useState('');
    const [co7FileName, setCo7FileName] = useState('');
    const [utilityFile, setUtilityFile] = useState('');
    const [utilityFileName, setUtilityFileName] = useState('');
    const [landMark, setLandMark] = useState('');
    const [selstate, setState] = useState('');
    const [city, setCity] = useState('');
    const [streetName, setStreetName] = useState('');
    const [localGovernmane, setLocalGovernmane] = useState('');
    const [lgaCode, setLgaCode] = useState('');
    const [stateCode, setStateCode] = useState('');
    const [statusbar, setStatusbar] = useState('');
    const [pending, setPending] = useState('pending');
    const [review, setReview] = useState('In Review');
    const [rejected, setRejected] = useState('Rejected');
    const [status, setStatus] = useState('Done');
    const [verifyStatus, setVerifyStatus] = useState('');
    const [transactionPinStatus, setTransactionPinStatus] = useState('');
    const [reffereeEmailI, setReffereeEmailI] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const [vninStatus, setVninStatus] = useState('');
    const [virtualNin, setVirtualNin] = useState('');
    const [elevateStatus, setElevateStatus] = useState('');
    const [utilityStatus, setUtilityStatus] = useState('');
    const [utilitytype, setUtilityType] = useState('');
    const [idCardStatus, setidCardStatus] = useState('');
    const [profillingStatus, setProfillingStatus] = useState('');
    const [vninStatus, setVninStatus] = useState('');
    const [documentStatus, setDocumentStatus] = useState('');
    const [refereeStatus, setRefereeStatus] = useState('');
    const [cacStatus, setCacStatus] = useState('');
    const [tinStatus, setTinStatus] = useState('');
    const [cacNumber, setCacNumber] = useState('');
    const [scumlStatus, setScumlStatus] = useState('');
    const [mematStatus, setMematStatus] = useState('');
    const [meansOfIdentification, setMeansOfIdentifiction] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [elevateData, setElevateData] = useState();
    const [IDType, setIDType] = useState('');
    const [reffereeEmail, setReffereeEmail] = useState('');
    const [refereeName1, setRefereeName1] = useState('');
    const [reffereeName2, setReffereeName2] = useState('');
    const [refereeEmail1, setRefereeEmail1] = useState('');
    const [reffereeEmail2, setReffereeEmail2] = useState('');
    const [link, setLink] = useState('');
    const [reffereeStatus, setReffereeStatus] = useState('');
    const [reffereeFormStatus, setReffereeFormStatus] = useState('');
    const [checkedBtn, setCheckedBtn] = useState(false);
    const [inputCheck, setInputCheck] = useState();
    const [fileI, setFileI] = useState(null);
    const [fileNameI, setFileNameI] = useState();
    const [fileII, setFileII] = useState(null);
    const [fileNameII, setFileNameII] = useState();
    const [identificationDocumentFile, setIdentificationDocument] =
        useState(null);
    const [identificationDocumentFileName, setIdentificationDocumentName] =
        useState('');
    const [identificationBackDocument, setIdentificationBackDocument] =
        useState(null);
    const [
        identificationBackDocumentFileName,
        setIdentificationBackDocumentFileName
    ] = useState('');

    identificationBackDocumentFileName;
    const [refoneno, setRefoneNo] = useState('');
    const [base64urlI, setBase64UrlI] = useState('');
    const [base64urlII, setBase64UrlII] = useState('');
    const [refoneemail, setRefoneEmail] = useState('');
    const [reftwono, setReftTwoNo] = useState('');
    const [reftwoemail, setRefTwoEmail] = useState('');
    const [outType, setOutType] = useState();
    const [outTyped, setOutTyped] = useState();
    const [activeBtn, setActiveBtn] = useState(false);
    const [questions, setQuestions] = useState();
    const [base64Code, setBase64Code] = useState('');
    const [errorActive, setErrorActive] = useState('');
    const [backBase64Code, setBackBase64Code] = useState('');
    const [userProfileData, setUserProfileData] = useState([]);
    const [corporateAccount, setCorporateAccount] = useState();
    const [profileItemm, setProfileItemm] = useState('');
    const [ellevateProfilingDone, setEllevateProfilingzDone] = useState();
    const [cac1FileName, setCac1FileName] = useState();
    const [cac1File, setCac1File] = useState();
    const [cac2FileName, setCac2FileName] = useState();
    const [cac2File, setCac2File] = useState();
    const [memtFileName, setMemtFileName] = useState();
    const [memtFile, setMemtFile] = useState();

    const [tinNumber, setTinNumber] = useState('');
    const { cac, cacErrorMessages } = useSelector(
        (state) => state.cacUploadReducer
    );
    const { addressVerificationSuc, addressVerificationsError } = useSelector(
        (state) => state.addressVerificationReducer
    );
    const { scmul, scmulErrorMessages } = useSelector(
        (state) => state.uploadScmulReducer
    );
    const { memart, memartErrorMessages } = useSelector(
        (state) => state.uploadMemartReducer
    );
    const { UploadreffereeSuccess, UploadreffereeError } = useSelector(
        (state) => state.uploadRefereeFileReducer
    );
    const { profilingQuestions } = useSelector(
        (state) => state.profilingQuestionsReducer
    );
    const { uploadRefForm, uploadRefFormErrorMessages } = useSelector(
        (state) => state.uploadMemartReducer
    );
    const { utilityUpload, utilityUplodaErrorMessages } = useSelector(
        (state) => state.uploadUtilityReducer
    );
    const { setTransactionPin, setTransactionPinError } = useSelector(
        (state) => state.setTransactionPinReducer
    );
    const { pushDocuments, pushDocumentsError } = useSelector(
        (state) => state.pushDocumentsReducer
    );
    const { shareDocuments, shareDocumentsError } = useSelector(
        (state) => state.shareDocumentsReducer
    );
    const { identification, identificationErrorMessages } = useSelector(
        (state) => state.documentIdentificationReducer
    );
    const { ellevateProfilingSeccess, ellevateProfillingError } = useSelector(
        (state) => state.postEllevateReducer
    );
    const { vninMSeccess, vninMError } = useSelector(
        (state) => state.vninReducer
    );
    const { reffereeSuccess, reffereeError } = useSelector(
        (state) => state.refferenceEmailReducer
    );
    const { CacDocumentSuccess, CacDocumentError } = useSelector(
        (state) => state.cacDocUploadReducer
    );
    const { tinSuccess, tinError } = useSelector((state) => state.tinReducer);

    const { userProfile } = useSelector((state) => state.userProfileReducer);

    useEffect(() => {
        if (
            userProfileData.createdFromEcobankCred === true &&
            userProfileData.customerCategory === 'INDIVIDUAL'
        ) {
            if (elevateStatus === 'done') {
                setActive(true);
            }
        }
        if (
            userProfileData.createdFromEcobankCred === true &&
            userProfileData.customerCategory === 'COMMERCIAL'
        ) {
            if (
                userProfile?.hasDoneVNINVerification === true &&
                addressVerificationSuc?.data.data.verificationStatus ===
                    'SUCCESS' &&
                userProfile?.hasSetTransactionPin === true &&
                refereeStatus === 'notDone' &&
                utilityStatus === 'notDone' &&
                idCardStatus === 'notDone' &&
                userProfile?.hasDoneEllevateProfiling === true
            ) {
                setActive(true);
            }
        }
        if (text === 'INDIVIDUAL') {
            if (
                userProfile?.hasDoneVNINVerification === true &&
                addressVerificationSuc?.data.data.verificationStatus ===
                    'SUCCESS' &&
                userProfile?.hasSetTransactionPin === true &&
                utilityStatus === 'done' &&
                idCardStatus === 'done' &&
                userProfile?.hasDoneEllevateProfiling === true
            ) {
                setActive(true);
            }
        }

        if (text === 'COMMERCIAL') {
            if (
                userProfile?.hasDoneVNINVerification === true &&
                refereeStatus === 'notDone' &&
                addressVerificationSuc?.data.data.verificationStatus ===
                    'SUCCESS' &&
                userProfile?.hasSetTransactionPin === true &&
                idCardStatus === 'notDone' &&
                userProfile?.hasDoneEllevateProfiling === true &&
                utilityStatus === 'notDone' &&
                cacStatus === 'notDone' &&
                mematStatus === 'notDone' &&
                tinStatus === 'notDone' &&
                tinStatus === 'notDone' &&
                scumlStatus === 'notDone'
            ) {
                setActive(true);
            }
        }
    }, [
        ellevateProfilingSeccess,
        userProfile,
        addressVerificationSuc,
        scmul,
        tinSuccess,
        CacDocumentSuccess,
        identification,
        utilityUpload,
        UploadreffereeSuccess
    ]);

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const socialOptions = {
        loop: true,
        autoplay: true,
        animationData: socialdata,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        //console.logdata);
        setLoading(true);
        dispatch(loadsetTransactionPin(data));
    };
    useEffect(() => {
        if (userProfile !== null) {
            setUserProfileData(userProfile);
        }

        //console.log('upgrade check', accountUpgrade);
    }, [userProfile]);
    useEffect(() => {
        setMessage('');
        const {
            query: { id }
        } = router;
        setLink({ id }.id);
    }, []);

    useEffect(() => {
        if (link !== undefined) {
            setTitle('Set Transaction Pin');
        } else {
            setTitle('First');
        }
    }, [link]);
    //console.log(link);
    const moveToDash = () => {
        setIsLoading(true);
        router.push('../Admin/Dashboard');
    };

    const tinRegistration = () => {
        setLoading(true);
        const data = {
            tin: tinNumber
        };
        dispatch(getTinDetails(data));
    };
    const transactionPin = () => {
        if (setTransactionPin !== null) {
            setMessage('Transaction Pin Set Successfully');
            setStatusbar('success');
            setOutcome(true);
            setLoading(false);
            setTransactionPinStatus('done');
            // setOutcome('First');
        } else if (setTransactionPinError !== null) {
            setMessage(setTransactionPinError);
            setStatusbar('error');
            setOutcome(true);
            setLoading(false);
        }
    };
    useEffect(() => {
        transactionPin();
    }, [setTransactionPin, setTransactionPinError]);
    useEffect(() => {
        dispatch(getAddressStatusDetails());
        dispatch(loadUserProfile());
        dispatch(shareDocumentsData());
        dispatch(loadprofilingQuestions());
    }, []);

    useEffect(() => {
        if (userProfile !== null) {
            if (userProfile?.idDocumentVerificationStatus === 'verified') {
                setidCardStatus('done');
            }

            setText(userProfile.customerCategory);
            setCorporateAccount(userProfile.hasRegisteredBusiness);
            setStreetName(userProfile.address);
            setCity(userProfile.city);
            setState(userProfile.state);
            setLocalGovernmane(userProfile.lga);

            if (userProfile.hasSetTransactionPin === true) {
                setTransactionPinStatus('done');
            }
            if (userProfile.hasDoneVNINVerification === true) {
                setVninStatus('done');
            }
            if (userProfile?.hasDoneEllevateProfiling === true) {
                setElevateStatus('done');
            }
        }
        //console.log(userProfile);
    }, [userProfile]);
    useEffect(() => {
        if (profilingQuestions !== null) {
            setQuestions(profilingQuestions);
        }
    }, [profilingQuestions]);
    useEffect(() => {
        if (shareDocuments !== null) {
            // console.log(shareDocuments);

            shareDocuments?.map((document) => {
                if (document.documentType === 'UTILITY') {
                    const test = document.absoluteUrl.split('/');
                    setUtilityFileName(test[test.length - 1]);
                    if (document.status === 'REJECTED') {
                        setUtilityStatus('comment');
                    } else if (document.status === 'APPROVED') {
                        setUtilityStatus(document.status);
                    } else if (document.status === 'PENDING') {
                        setUtilityStatus('notDone');
                    } else {
                        setUtilityStatus('done');
                    }
                } else if (document.documentType === 'CAC') {
                    if (document.status === 'REJECTED') {
                        setCacStatus('comment');
                    } else if (document.status === 'APPROVED') {
                        setCacStatus(document.status);
                    } else if (document.status === 'PENDING') {
                        setCacStatus('notDone');
                    } else {
                        setCacStatus('done');
                    }
                } else if (document.documentType === 'MEMART') {
                    if (document.status === 'REJECTED') {
                        setMematStatus('comment');
                    } else if (document.status === 'APPROVED') {
                        setMematStatus(document.status);
                    } else if (document.status === 'PENDING') {
                        setMematStatus('notDone');
                    } else {
                        setMematStatus('done');
                    }
                } else if (document.documentType === 'SCUML') {
                    const test = document.absoluteUrl.split('/');
                    setScmulFileName(test[test.length - 1]);
                    if (document.status === 'REJECTED') {
                        setScumlStatus('comment');
                    } else if (document.status === 'APPROVED') {
                        setScumlStatus(document.status);
                    } else if (document.status === 'PENDING') {
                        setScumlStatus('notDone');
                    } else {
                        setScumlStatus('done');
                    }
                } else if (document.documentType === 'REFERENCE_FORM_1') {
                    if (document.status === 'REJECTED') {
                        setRefereeStatus('comment');
                    } else if (document.status === 'APPROVED') {
                        setRefereeStatus(document.status);
                        setReffereeFormStatus('done');
                    } else if (document.status === 'PENDING') {
                        setRefereeStatus('notDone');
                        setReffereeFormStatus('notDone');
                    } else {
                        setRefereeStatus('done');
                        setReffereeFormStatus('done');
                    }
                } else if (document.documentType === 'IDENTIFICATION') {
                    const test = document.absoluteUrl.split('/');
                    setIdentificationDocumentName(test[test.length - 1]);
                    setIDType(document.metaData.meansOfIdentification);
                    setIdNumber(document.metaData.idNumber);
                    {
                        document.status;
                    }
                    if (document.status === 'REJECTED') {
                        setidCardStatus('comment');
                    } else if (document.status === 'APPROVED') {
                        setidCardStatus('done');
                    } else if (document.status === 'PENDING') {
                        setidCardStatus('notDone');
                    }
                }
            });
        }
    }, [shareDocuments]);
    //console.loguserProfile);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }, []);
    //Cac Registratiom
    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);

        //console.logfile);
    };
    const cacRegistration = () => {
        setLoading(true);
        const cacDatas = {
            cacCert: file,
            cacNumber: cacNumber
        };
        dispatch(cacData(cacDatas));
    };

    useEffect(() => {
        if (cac !== null) {
            setMessage('CAC Document uploaded Successfully');
            setStatusbar('success');
            setOutcome(true);
            setLoading(false);
            setCacStatus('done');
        } else if (cacErrorMessages !== null) {
            // console.log(cacErrorMessages);
            setMessage(cacErrorMessages.data.message);
            setStatusbar('error');
            setOutcome(true);
            setLoading(false);
        }
    }, [cac, cacErrorMessages]);

    useEffect(() => {
        if (tinSuccess !== null) {
            setMessage('TIN uploaded Successfully');
            setStatusbar('success');
            setOutcome(true);
            setLoading(false);
            setTinStatus('done');
        } else if (tinError !== null) {
            console.log(tinError);
            // setMessage(cacErrorMessages.data.message);
            setStatusbar('error');
            setOutcome(true);
            setLoading(false);
        }
    }, [tinSuccess, tinError]);
    useEffect(() => {
        if (pushDocuments !== null) {
            setMessage(' Uploaded Successfully');
            setStatusbar('success');
            setOutcome(true);
            setLoading(false);
        } else if (pushDocumentsError !== null) {
            setMessage(pushDocumentsError);
            setStatusbar('error');
            setOutcome(true);
            setLoading(false);
        }
    }, [pushDocuments, pushDocumentsError]);

    //CAC Registration end

    //Referee Upload Start

    const saveRefFile = (e) => {
        setFileI(e.target.files[0]);
        setFileNameI(e.target.files[0].name);
        // console.log(e.target.files[0]);
    };
    const saveRefFileI = (e) => {
        //console.log(e.target.files[0]);

        setFileII(e.target.files[0]);
        setFileNameII(e.target.files[0].name);
        //console.log(file);
    };

    const refereeFileUpload = () => {
        setLoading(true);
        const uploadrefereeData = {
            nameOfForm1Filler: refereeName1,
            emailOfForm1Filler: refereeEmail1,
            form1: fileI,
            nameOfForm2Filler: reffereeName2,
            emailOfForm2Filler: reffereeEmail2,
            form2: fileII
        };
        dispatch(getUploadReffereeDetails(uploadrefereeData));
    };
    useEffect(() => {
        // console.log(UploadreffereeError);

        if (UploadreffereeSuccess !== null) {
            setMessage('Referee Form Uploaded');
            setStatusbar('success');
            setOutcome(true);
            setLoading(false);
            setScumlStatus('done');
        } else if (UploadreffereeError !== null) {
            //console.log(scmulErrorMessages);
            setMessage(UploadreffereeError.data.message);
            setStatusbar('error');
            setOutcome(true);
            setLoading(false);
        }
    }, [UploadreffereeSuccess, UploadreffereeError]);
    const refereeUpload = () => {
        const refereeData = {
            emailsToShare: [reffereeEmail, reffereeEmailI]
        };
        dispatch(getReffereeDetails(refereeData));
    };
    useEffect(() => {
        console.log(reffereeError, reffereeSuccess);

        if (reffereeSuccess !== null) {
            setMessage('Referee Email is sent');
            setStatusbar('success');
            setOutcome(true);
            setLoading(false);
            setScumlStatus('done');
        } else if (reffereeError !== null) {
            //console.log(scmulErrorMessages);
            setMessage(reffereeError.data.message);
            setStatusbar('error');
            setOutcome(true);
            setLoading(false);
        }
    }, [
        reffereeSuccess,
        reffereeError
        // UploadreffereeSuccess,
        // UploadreffereeError
    ]);
    // if (reffereeSuccess?.data.message === 'success') {
    //     const uploadrefereeData = {
    //         form1: fileI,
    //         form2: fileII
    //     };
    //     dispatch(getUploadReffereeDetails(uploadrefereeData));
    //     console.log();
    //Refferee Upload End

    //SMUL Certyificate
    const saveScmulFile = (e) => {
        setScmulFile(e.target.files[0]);
        setScmulFileName(e.target.files[0].name);
    };
    const uploadScmul = () => {
        setLoading(true);
        const scmulDatas = {
            scumlCert: scmulfile
        };
        dispatch(scmulData(scmulDatas));
    };
    useEffect(() => {
        if (scmul !== null) {
            setMessage('SCUML uploaded Successfully');
            setStatusbar('success');
            setOutcome(true);
            setLoading(false);
            ('IdentificationDocument');
            setScumlStatus('done');
        } else if (scmulErrorMessages !== null) {
            //console.log(scmulErrorMessages);
            setMessage(scmulErrorMessages);
            setStatusbar('error');
            setOutcome(true);
            setLoading(false);
        }
    }, [scmul, scmulErrorMessages]);

    //SCMUL Certificate end

    //Memart Submit
    const saveMemart2lFile = (e) => {
        setCo2File(e.target.files[0]);
        setCo2FileName(e.target.files[0].name);
    };
    const saveMemart7lFile = (e) => {
        setCo7File(e.target.files[0]);
        setCo7FileName(e.target.files[0].name);
    };

    const saveMemartCAC1lFile = (e) => {
        setCac1File(e.target.files[0]);
        setCac1FileName(e.target.files[0].name);
    };

    const saveMemartCAC2lFile = (e) => {
        setCac2File(e.target.files[0]);
        setCac2FileName(e.target.files[0].name);
    };

    const saveMemartMemtlFile = (e) => {
        setMemtFile(e.target.files[0]);
        setMemtFileName(e.target.files[0].name);
    };
    const [active, setActive] = useState(false);
    //console.logco2file);
    const cacDocumentUpload = () => {
        const cacDocData = {
            co2: co2file,
            co7: co7file,
            cac1_1: cac1File,
            cac2_1: cac2File,
            memart: memtFile
        };
        setLoading(true);
        dispatch(getCacDocumentDetails(cacDocData));
    };
    useEffect(() => {
        // console.log(CacDocumentSuccess, CacDocumentError);
        if (CacDocumentSuccess !== null) {
            setMessage('Cac Document Updated Successfully');
            setStatusbar('success');
            setOutcome(true);
            setLoading(false);
            setScumlStatus('done');
        } else if (CacDocumentError !== null) {
            //console.log(scmulErrorMessages);
            setMessage(tinError.data.message);
            setStatusbar('error');
            setOutcome(true);
            setLoading(false);
        }
    }, [CacDocumentSuccess, CacDocumentError]);
    //Memart Submit ENd

    //utility Upload
    const saveUtilityFile = (e) => {
        setUtilityFile(e.target.files[0]);
        setUtilityFileName(e.target.files[0].name);
    };
    const utilityUploads = () => {
        setLoading(true);
        const utilityThingd = {
            utilityType: utilitytype,
            streetName: streetName,
            lga: localGovernmane,
            state: selstate,
            utilityDocument: utilityFile
        };
        dispatch(uploadUtilityData(utilityThingd));
        //console.log'state', localState, localGovernment, utilityFile);
    };
    useEffect(() => {
        if (utilityUpload !== null) {
            setMessage(utilityUpload.data.message);
            setStatusbar('success');
            setOutcome(true);
            setLoading(false);
            setUtilityStatus('done');
            // setVerifyStatus('completed');
        } else if (utilityUplodaErrorMessages !== null) {
            setMessage(utilityUplodaErrorMessages);
            setStatusbar('error');
            setOutcome(true);
            setLoading(false);
        }
        //console.logutilityUpload);
        //console.logutilityUplodaErrorMessages);
    }, [utilityUpload, utilityUplodaErrorMessages]);
    //Utility Upload End
    const virtualNinSend = () => {
        setLoading(true);
        const virtualNinData = {
            vNin: virtualNin,
            dateOfBirth: userProfile.dateOfBirth
        };
        dispatch(postvnin(virtualNinData));
    };
    useEffect(() => {
        if (vninMSeccess) {
            // console.log(vninMSeccess);
            if (vninMSeccess.data.isCredentialsValid == true) {
                setMessage(vninMSeccess?.message);
                setStatusbar('success');
                setOutcome(true);
                setLoading(false);
                setVninStatus('done');
                // setVerifyStatus('completed');
            } else {
                setMessage(vninMSeccess?.data.reason);
                setStatusbar('error');
                setOutcome(true);
                setLoading(false);
            }
        }
        //console.logutilityUpload);
        //console.logutilityUplodaErrorMessages);
    }, [vninMSeccess, vninMError]);

    //Identification Upload
    const saveIdentificationFile = (e) => {
        setIdentificationDocument(e.target.files[0]);
        setIdentificationDocumentName(e.target.files[0].name);
        getbase64(e.target.files[0]);
    };

    // setBackBase64Code
    const saveBackIdentificationFile = (e) => {
        setIdentificationBackDocument(e.target.files[0]);
        setIdentificationBackDocumentFileName(e.target.files[0].name);
        getbase64s(e.target.files[0]);
    };
    const getbase64 = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoad(reader.result);
        };
    };
    const getbase64s = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoads(reader.result);
        };
    };
    const onLoads = (fileStrings) => {
        setBackBase64Code(fileStrings);
        // console.log('Back', backBase64Code);
    };

    const onLoad = (fileString) => {
        setBase64Code(fileString);
        // console.log(base64Code);
    };
    const IdentificationyUpload = () => {
        setLoading(true);
        if (IDType === 'VOTERS_CARD' || IDType === 'DRIVERS_LICENSE') {
            const data = identificationDocumentFileName.split('.');
            const datas = identificationBackDocumentFileName.split('.');
            const identificationThings = {
                meansOfIdentification: IDType,
                idNumber: idNumber,
                identificationDocumentFront: {
                    base64String: base64Code.split(',')[1],
                    fileName: identificationDocumentFileName.split('.')[0],
                    fileExtension: `.${data[data.length - 1]}`
                },

                identificationDocumentBack: {
                    base64String: backBase64Code.split(',')[1],
                    fileName: identificationBackDocumentFileName.split('.')[0],
                    fileExtension: `.${datas[datas.length - 1]}`
                }
            };
            dispatch(identificationDocData(identificationThings));
        } else {
            const data = identificationDocumentFileName.split('.');
            // const datas = identificationBackDocumentFileName.split('.');
            const identificationThings = {
                meansOfIdentification: IDType,
                idNumber: idNumber,
                identificationDocumentFront: {
                    base64String: base64Code.split(',')[1],
                    fileName: identificationDocumentFileName.split('.')[0],
                    fileExtension: `.${data[data.length - 1]}`
                }
            };
            dispatch(identificationDocData(identificationThings));
        }
        // const identificationThings = {
        //     meansOfIdentification: IDType,
        //     idNumber: idNumber,
        //     identificationDocument: identificationDocumentFile
        // };
    };

    useEffect(() => {
        if (ellevateProfilingSeccess !== null) {
            setEllevateProfilingzDone('Done');
            setMessage('Ellevate Profiling Success');
            setStatusbar('success');
            setOutcome(true);
            setLoading(false);
            // window.localStorage.setItem(
            //     'profiling',
            //     JSON.stringify(elevateData)
            // );
        } else if (ellevateProfillingError !== null) {
            setMessage(ellevateProfillingError);
            setStatusbar('error');
            setOutcome(true);
            setLoading(false);
        }
    }, [ellevateProfilingSeccess, ellevateProfillingError]);

    // Verify your Address
    useEffect(() => {
        console.log(addressVerificationSuc?.data.data.verificationStatus);
        if (addressVerificationSuc) {
            if (
                addressVerificationSuc.data.data.verificationStatus ===
                'SUCCESS'
            ) {
                setVerifyStatus('Done');
                setMessage('Address Verification Successful');
                setStatusbar('success');
                // setOutcome(true);
                setVerifyStatus('done');
                setLoading(false);
            } else if (
                addressVerificationsError !== null ||
                addressVerificationSuc.data.data.verificationStatus ===
                    'PENDING'
            ) {
                // setMessage('Error');
                // setStatusbar('error');
                setOutcome(false);
                setLoading(false);
            }
        }
    }, [addressVerificationSuc, addressVerificationsError]);

    useEffect(() => {
        if (identification !== null) {
            setIdentificationBackDocument(null);
            setIdentificationBackDocumentFileName(null);
            setIdentificationDocument(null);
            setIdentificationDocumentName(null);
            setMessage(identification);
            setStatusbar('success');
            setOutcome(true);
            setLoading(false);
            setidCardStatus('done');
        } else if (identificationErrorMessages !== null) {
            setIdentificationBackDocument(null);
            setIdentificationBackDocumentFileName(null);
            setIdentificationDocument(null);
            setIdentificationDocumentName(null);
            setMessage(identificationErrorMessages);
            setStatusbar('error');
            setOutcome(true);
            setLoading(false);
        }
    }, [identification, identificationErrorMessages]);
    //console.logidentificationErrorMessages);

    //Identification Upload End

    //Refference
    const reffernceUpload = () => {
        // const identificationThings = {
        //     meansOfIdentification: meansOfIdentification,
        //     idNumber: idNumber,
        //     identificationDocument: identificationDocumentFile
        // };

        const emailToshareData = {
            emailsToShare: [refoneemail, refoneno]
        };
        //console.logemailToshareData);
        dispatch(uploadRefFormData(emailToshareData));
    };

    //Refference

    const [document, setDocument] = useState(false);
    const AccountUpgradeData = {
        existing: [
            {
                title: 'Ellevate Profiling',
                textII: 'Profilling',
                icon: <IdCard />,
                statusReport: elevateStatus,
                status:
                    elevateStatus === 'done'
                        ? 'Done'
                        : elevateStatus === 'notDone'
                        ? pending
                        : null
            }
        ],
        exitingCorporate: [
            {
                title: 'Virtual NIN',
                textII: 'VirtualNIN',
                icon: <IdCard />,
                statusReport: vninStatus,
                status:
                    userProfile?.hasDoneVNINVerification === true
                        ? status
                        : pending
            },
            {
                title: 'Documents',
                textII: 'Documments',
                icon: <AddressSvg />,
                statusReport: documentStatus,
                status: pending
            },
            {
                title: 'Verify your Address',
                textII: 'VerifyAddress',
                icon: <AddressSvg />,
                statusReport: verifyStatus,
                status:
                    addressVerificationSuc?.data.data.verificationStatus ===
                    'SUCCESS'
                        ? 'Done'
                        : addressVerificationSuc?.data.data.verificationStatus
            },
            {
                title: 'Set Transaction Pin',
                textII: 'TransactionPin',
                icon: <SignatureRuleSvg />,
                statusReport: transactionPinStatus,
                status:
                    userProfile?.hasSetTransactionPin === true
                        ? status
                        : pending
            },
            {
                title: 'Referee',
                textII: 'Referee',
                icon: <AddressSvg />,
                statusReport: refereeStatus,
                status: pending
            },
            {
                title: 'Referee Form',
                textII: 'Referee Form',
                icon: <AddressSvg />,
                statusReport: reffereeFormStatus,
                status:
                    reffereeFormStatus === 'APPROVED'
                        ? 'Done'
                        : reffereeFormStatus === 'notDone'
                        ? pending
                        : reffereeFormStatus === 'comment'
                        ? rejected
                        : 'pending'
            },

            // Referee Form
            {
                title: 'Upload Utility BIll',
                textII: 'UtilityBill',
                icon: <BillSvg />,
                statusReport: utilityStatus,
                name: 'UTILITY',
                status:
                    userProfile?.hasSubmitedDocumentsForReview === true
                        ? utilityStatus === 'done'
                            ? review
                            : utilityStatus === 'notDone'
                            ? pending
                            : utilityStatus === 'comment'
                            ? rejected
                            : utilityStatus === 'APPROVED'
                            ? 'Done'
                            : null
                        : pending
            },
            {
                title: 'Upload ID Card',
                textII: 'UIdCard',
                icon: <IdCard />,
                statusReport: idCardStatus,
                name: 'IDENTIFICATION',
                status:
                    userProfile?.idDocumentVerificationStatus === 'verified'
                        ? idCardStatus === 'done'
                            ? 'Done'
                            : idCardStatus === 'notDone'
                            ? userProfile?.idDocumentVerificationStatus
                            : idCardStatus === 'comment'
                            ? rejected
                            : idCardStatus === 'APPROVED'
                            ? 'Done'
                            : null
                        : userProfile?.idDocumentVerificationStatus
            },
            // {
            //     title: 'Directors',
            //     icon: <DirectorsSvg />
            // },
            // {
            //     title: 'Referee',
            //     textII: 'Referee',
            //     icon: <DirectorsSvg />,
            //     statusReport: refereeStatus,
            //     name: 'REFERENCE_FORMFORM',
            //     status:
            //         userProfile?.hasSubmitedDocumentsForReview === true
            //             ? refereeStatus === 'done'
            //                 ? review
            //                 : refereeStatus === 'notDone'
            //                 ? pending
            //                 : refereeStatus === 'comment'
            //                 ? rejected
            //                 : null
            //             : pending
            // },
            {
                title: 'Ellevate Profiling',
                textII: 'Profilling',
                icon: <IdCard />,
                statusReport: elevateStatus,
                status:
                    userProfile?.hasDoneEllevateProfiling === true
                        ? 'Done'
                        : pending
            }
            // {
            //     title: 'Signature Rule',
            //     icon: <SignatureRuleSvg />
            // }
        ],
        individual: [
            {
                title: 'Virtual NIN',
                textII: 'VirtualNIN',
                icon: <IdCard />,
                statusReport: vninStatus,
                status:
                    userProfile?.hasDoneVNINVerification === true
                        ? status
                        : pending
            },
            {
                title: 'Verify your Address',
                textII: 'VerifyAddress',
                icon: <AddressSvg />,
                statusReport: verifyStatus,
                status:
                    addressVerificationSuc?.data.data.verificationStatus ===
                    'SUCCESS'
                        ? 'Done'
                        : addressVerificationSuc?.data.data.verificationStatus
            },

            {
                title: 'Set Transaction Pin',
                textII: 'SetTransactionPin',
                icon: <SignatureRuleSvg />,
                statusReport: transactionPinStatus,
                status:
                    userProfile?.hasSetTransactionPin === true
                        ? status
                        : pending
            },
            {
                title: 'Upload Utility BIll',
                textII: 'UtilityBill',
                icon: <BillSvg />,
                statusReport: utilityStatus,
                name: 'UTILITY',
                status:
                    userProfile?.hasSubmitedDocumentsForReview === true
                        ? utilityStatus === 'done'
                            ? 'Done'
                            : utilityStatus === 'notDone'
                            ? pending
                            : utilityStatus === 'comment'
                            ? rejected
                            : utilityStatus === 'APPROVED'
                            ? 'Done'
                            : null
                        : pending
            },
            {
                title: 'Upload ID Card',
                textII: 'IdCard',
                icon: <IdCard />,
                statusReport: idCardStatus,
                name: 'IDENTIFICATION',
                status:
                    userProfile?.idDocumentVerificationStatus === 'verified'
                        ? idCardStatus === 'done'
                            ? 'Done'
                            : idCardStatus === 'notDone'
                            ? userProfile?.idDocumentVerificationStatus
                            : idCardStatus === 'comment'
                            ? rejected
                            : idCardStatus === 'APPROVED'
                            ? 'Done'
                            : null
                        : userProfile?.idDocumentVerificationStatus
            },
            {
                title: 'Ellevate Profiling',
                textII: 'EllevateProfilling',
                icon: <IdCard />,
                statusReport: elevateStatus,
                status:
                    userProfile?.hasDoneEllevateProfiling === true
                        ? 'Done'
                        : pending
            }
        ],
        corporate: [
            {
                title: 'Virtual NIN',
                textII: 'VirtualNIN',
                icon: <IdCard />,
                statusReport: vninStatus,
                status:
                    userProfile?.hasDoneVNINVerification === true
                        ? status
                        : pending
            },
            {
                title: 'Documents',
                textII: 'Documments',
                icon: <AddressSvg />,
                statusReport: documentStatus,
                status: pending
            },
            {
                title: 'Referee',
                textII: 'Referee',
                icon: <AddressSvg />,
                statusReport: refereeStatus,
                status: pending
            },
            {
                title: 'Referee Form',
                textII: 'Referee Form',
                icon: <AddressSvg />,
                statusReport: reffereeFormStatus,
                status:
                    reffereeFormStatus === 'APPROVED'
                        ? 'Done'
                        : reffereeFormStatus === 'notDone'
                        ? pending
                        : reffereeFormStatus === 'comment'
                        ? rejected
                        : 'pending'
            },
            {
                title: 'Verify your Address',
                textII: 'VerifyAddress',
                icon: <AddressSvg />,
                statusReport: verifyStatus,
                status:
                    addressVerificationSuc?.data.data.verificationStatus ===
                    'SUCCESS'
                        ? 'Done'
                        : addressVerificationSuc?.data.data.verificationStatus
            },
            {
                title: 'Set Transaction Pin',
                textII: 'TransactionPin',
                icon: <SignatureRuleSvg />,
                statusReport: transactionPinStatus,
                status:
                    userProfile?.hasSetTransactionPin === true
                        ? status
                        : pending
            },
            {
                title: 'Upload Utility BIll',
                textII: 'UtilityBill',
                icon: <BillSvg />,
                statusReport: utilityStatus,
                name: 'UTILITY',
                status:
                    userProfile?.hasSubmitedDocumentsForReview === true
                        ? utilityStatus === 'done'
                            ? review
                            : utilityStatus === 'notDone'
                            ? pending
                            : utilityStatus === 'comment'
                            ? rejected
                            : utilityStatus === 'APPROVED'
                            ? 'Done'
                            : null
                        : pending
            },
            {
                title: 'Upload ID Card',
                textII: 'UIdCard',
                icon: <IdCard />,
                statusReport: idCardStatus,
                name: 'IDENTIFICATION',
                status:
                    userProfile?.idDocumentVerificationStatus === 'verified'
                        ? idCardStatus === 'done'
                            ? 'Done'
                            : idCardStatus === 'notDone'
                            ? userProfile?.idDocumentVerificationStatus
                            : idCardStatus === 'comment'
                            ? rejected
                            : idCardStatus === 'APPROVED'
                            ? 'Done'
                            : null
                        : userProfile?.idDocumentVerificationStatus
            },
            // {
            //     title: 'Directors',
            //     icon: <DirectorsSvg />
            // },
            // {
            //     title: 'Referee',
            //     textII: 'Referee',
            //     icon: <DirectorsSvg />,
            //     statusReport: refereeStatus,
            //     name: 'REFERENCE_FORMFORM',
            //     status:
            //         userProfile?.hasSubmitedDocumentsForReview === true
            //             ? refereeStatus === 'done'
            //                 ? review
            //                 : refereeStatus === 'notDone'
            //                 ? pending
            //                 : refereeStatus === 'comment'
            //                 ? rejected
            //                 : null
            //             : pending
            // },
            {
                title: 'Ellevate Profiling',
                textII: 'Profilling',
                icon: <IdCard />,
                statusReport: elevateStatus,
                status:
                    userProfile?.hasDoneEllevateProfiling === true
                        ? 'Done'
                        : pending
            }
            // {
            //     title: 'Signature Rule',
            //     icon: <SignatureRuleSvg />
            // }
        ],
        document: [
            {
                title: 'CAC Certificate',
                textII: 'CACREG',
                statusReport: cacStatus,
                name: 'CAC',
                status:
                    userProfile?.hasSubmitedDocumentsForReview === true
                        ? cacStatus === 'done'
                            ? review
                            : cacStatus === 'notDone'
                            ? pending
                            : cacStatus === 'comment'
                            ? rejected
                            : cacStatus === 'APPROVED'
                            ? 'Done'
                            : null
                        : pending
            },
            {
                title: 'CAC Documents',
                textII: 'CAC Documents',
                statusReport: mematStatus,
                name: 'MEMART',
                status:
                    userProfile?.hasSubmitedDocumentsForReview === true
                        ? mematStatus === 'done'
                            ? review
                            : mematStatus === 'notDone'
                            ? pending
                            : mematStatus === 'comment'
                            ? rejected
                            : mematStatus === 'APPROVED'
                            ? 'Done'
                            : null
                        : pending
            },
            {
                title: 'TIN',
                textII: 'TINREG',
                statusReport: tinStatus,
                name: 'TIN',
                status:
                    userProfile?.hasSubmitedDocumentsForReview === true
                        ? tinStatus === 'done'
                            ? review
                            : tinStatus === 'notDone'
                            ? pending
                            : tinStatus === 'comment'
                            ? rejected
                            : tinStatus === 'APPROVED'
                            ? 'Done'
                            : null
                        : pending
            },
            {
                title: 'SCUML Certificate',
                textII: 'SCMULREG',
                statusReport: scumlStatus,
                name: 'SCUML',
                status:
                    userProfile?.hasSubmitedDocumentsForReview === true
                        ? scumlStatus === 'done'
                            ? review
                            : scumlStatus === 'notDone'
                            ? pending
                            : scumlStatus === 'comment'
                            ? rejected
                            : scumlStatus === 'APPROVED'
                            ? 'Done'
                            : null
                        : pending
            }
        ]
    };
    // console.log(pending);

    useEffect(() => {}, [shareDocuments]);

    const types = (type) => {
        setOutType(type);
    };
    const typed = (type) => {
        setOutTyped(type);
    };
    const { states } = useSelector((state) => state.statesReducer);
    const newStates = () => {
        if (states !== null) {
            setLocation(states);
        }
    };
    useEffect(() => {
        dispatch(statesData());
    }, []);
    useEffect(() => {
        newStates();
    }, [states]);
    useEffect(() => {
        location?.filter((item) => {
            if (item.code === selstate) {
                setLocalGovernment(item.localGoverment);
            }
        });
    }, [selstate]);

    function openModal() {
        setIsOpen(true);
    }

    // function afterOpenModal() {
    //     // references are now sync'd and can be accessed.
    //     subtitle.style.color = '#f00';
    // }

    function closeModal() {
        setIsOpen(false);
    }
    const multiStep = () => {
        switch (title) {
            case 'First':
                return (
                    <AccountUpgradeComponent
                        title={
                            text === 'INDIVIDUAL'
                                ? 'Individual Account Upgrade'
                                : text === 'COMMERCIAL'
                                ? 'Corporate Account Upgrade'
                                : null
                        }
                        action={() => {
                            router.push('./Admin/Dashboard');
                        }}
                    >
                        <div className={styles.currentLevel}>
                            {/* <div className={styles.currentLevelDonut}>
                                <DounutComp />
                                <p className={styles.perc}>70%</p>
                            </div> */}
                            <div className={styles.currentLeveltext}>
                                <h2>
                                    Upgrade Your Account
                                    {/* Your account is currently 70 percent
                                    upgraded */}
                                </h2>
                                {/* <div>
                                    <p>Account Limit: N1,000,000 </p>
                                    <p>Loan Limit: xxxxxx</p>
                                </div> */}
                            </div>
                        </div>
                        <div className={styles.verifyText}>
                            <p>
                                We need to verity your information, please
                                submit the documents below to process your
                                account upgrade.
                            </p>
                        </div>

                        {userProfileData.createdFromEcobankCred === true &&
                        userProfileData.customerCategory === 'INDIVIDUAL'
                            ? AccountUpgradeData.existing.map((item, index) => {
                                  return (
                                      <>
                                          <AccountUpgradeSingle
                                              statusInfo={item.statusReport}
                                              textII={item.textII}
                                              content={shareDocuments?.map(
                                                  (items) => {
                                                      if (
                                                          items.documentType ===
                                                          item.title
                                                      ) {
                                                          return items.comment;
                                                      } else {
                                                          return '';
                                                      }
                                                  }
                                              )}
                                              icon={item.icon}
                                              text={item.title}
                                              key={index}
                                              status={item.status}
                                              action={() => {
                                                  if (item.status === 'Done')
                                                      setErrorActive(
                                                          item.title
                                                      );
                                                  else {
                                                      setTitle(item.title);
                                                  }
                                              }}
                                          />
                                          {errorActive === item.title ? (
                                              <>
                                                  <p className={styles.error}>
                                                      Already Completed
                                                  </p>
                                                  {setTimeout(() => {
                                                      setErrorActive('');
                                                  }, 1500)}
                                              </>
                                          ) : null}
                                      </>
                                  );
                              })
                            : userProfileData.createdFromEcobankCred === true &&
                              userProfileData.customerCategory === 'COMMERCIAL'
                            ? AccountUpgradeData.exitingCorporate.map(
                                  (item, index) => {
                                      if (item.title === 'Documents') {
                                          return (
                                              <>
                                                  <AccountUpgradeSingle
                                                      statusInfo={
                                                          item.statusReport
                                                      }
                                                      textII={item.textII}
                                                      status={item.status}
                                                      icon={item.icon}
                                                      text={item.title}
                                                      key={index}
                                                      action={() => {
                                                          setDocument(
                                                              !document
                                                          );
                                                      }}
                                                  />
                                                  {document
                                                      ? AccountUpgradeData.document.map(
                                                            (item, index) => {
                                                                return (
                                                                    <>
                                                                        <AccountUpgradeSingle
                                                                            text={
                                                                                item.title
                                                                            }
                                                                            status={
                                                                                item.status
                                                                            }
                                                                            textII={
                                                                                item.textII
                                                                            }
                                                                            key={
                                                                                index
                                                                            }
                                                                            statusInfo={
                                                                                item.statusReport
                                                                            }
                                                                            action={() => {
                                                                                if (
                                                                                    item.status ===
                                                                                    'Done'
                                                                                )
                                                                                    setErrorActive(
                                                                                        item.title
                                                                                    );
                                                                                else {
                                                                                    setTitle(
                                                                                        item.title
                                                                                    );
                                                                                }
                                                                            }}
                                                                        />
                                                                        {errorActive ===
                                                                        item.title ? (
                                                                            <>
                                                                                <p
                                                                                    className={
                                                                                        styles.error
                                                                                    }
                                                                                >
                                                                                    Already
                                                                                    Completed
                                                                                </p>
                                                                                {setTimeout(
                                                                                    () => {
                                                                                        setErrorActive(
                                                                                            ''
                                                                                        );
                                                                                    },
                                                                                    1500
                                                                                )}
                                                                            </>
                                                                        ) : null}
                                                                    </>
                                                                );
                                                            }
                                                        )
                                                      : null}
                                              </>
                                          );
                                      } else {
                                          return (
                                              <>
                                                  <AccountUpgradeSingle
                                                      textII={item.textII}
                                                      content={shareDocuments?.map(
                                                          (items) => {
                                                              if (
                                                                  items.documentType ===
                                                                  item.name
                                                              ) {
                                                                  return items.comment;
                                                              } else {
                                                                  return '';
                                                              }
                                                          }
                                                      )}
                                                      statusInfo={
                                                          item.statusReport
                                                      }
                                                      icon={item.icon}
                                                      text={item.title}
                                                      key={index}
                                                      status={item.status}
                                                      action={() => {
                                                          if (
                                                              item.status ===
                                                              'Done'
                                                          )
                                                              setErrorActive(
                                                                  item.title
                                                              );
                                                          else {
                                                              setTitle(
                                                                  item.title
                                                              );
                                                          }
                                                      }}
                                                  />
                                                  {errorActive ===
                                                  item.title ? (
                                                      <>
                                                          <p
                                                              className={
                                                                  styles.error
                                                              }
                                                          >
                                                              Already Completed
                                                          </p>
                                                          {setTimeout(() => {
                                                              setErrorActive(
                                                                  ''
                                                              );
                                                          }, 1500)}
                                                      </>
                                                  ) : null}
                                              </>
                                          );
                                      }
                                  }
                              )
                            : text === 'INDIVIDUAL'
                            ? AccountUpgradeData.individual.map(
                                  (item, index) => {
                                      return (
                                          <>
                                              <>
                                                  <AccountUpgradeSingle
                                                      statusInfo={
                                                          item.statusReport
                                                      }
                                                      textII={item.textII}
                                                      content={shareDocuments?.map(
                                                          (items) => {
                                                              if (
                                                                  items.documentType ===
                                                                  item.name
                                                              ) {
                                                                  return items.comment;
                                                              } else {
                                                                  return '';
                                                              }
                                                          }
                                                      )}
                                                      icon={item.icon}
                                                      text={item.title}
                                                      key={index}
                                                      status={item.status}
                                                      action={() => {
                                                          if (
                                                              item.status ===
                                                              'Done'
                                                          )
                                                              setErrorActive(
                                                                  item.title
                                                              );
                                                          else {
                                                              setTitle(
                                                                  item.title
                                                              );
                                                          }
                                                      }}
                                                  />
                                                  {errorActive ===
                                                  item.title ? (
                                                      <>
                                                          <p
                                                              className={
                                                                  styles.error
                                                              }
                                                          >
                                                              Already Completed
                                                          </p>
                                                          {setTimeout(() => {
                                                              setErrorActive(
                                                                  ''
                                                              );
                                                          }, 1500)}
                                                      </>
                                                  ) : null}
                                              </>
                                              {document
                                                  ? AccountUpgradeData.document.map(
                                                        (item, index) => {
                                                            return (
                                                                <>
                                                                    <AccountUpgradeSingle
                                                                        text={
                                                                            item.title
                                                                        }
                                                                        status={
                                                                            item.status
                                                                        }
                                                                        textII={
                                                                            item.textII
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                        statusInfo={
                                                                            item.statusReport
                                                                        }
                                                                        action={() => {
                                                                            if (
                                                                                item.status ===
                                                                                'Done'
                                                                            )
                                                                                setErrorActive(
                                                                                    item.title
                                                                                );
                                                                            else {
                                                                                setTitle(
                                                                                    item.title
                                                                                );
                                                                            }
                                                                        }}
                                                                    />
                                                                    {errorActive ===
                                                                    item.title ? (
                                                                        <>
                                                                            <p
                                                                                className={
                                                                                    styles.error
                                                                                }
                                                                            >
                                                                                Already
                                                                                Completed
                                                                            </p>
                                                                            {setTimeout(
                                                                                () => {
                                                                                    setErrorActive(
                                                                                        ''
                                                                                    );
                                                                                },
                                                                                1500
                                                                            )}
                                                                        </>
                                                                    ) : null}
                                                                </>
                                                            );
                                                        }
                                                    )
                                                  : null}
                                          </>
                                      );
                                  }
                              )
                            : text === 'COMMERCIAL'
                            ? AccountUpgradeData.corporate.map(
                                  (item, index) => {
                                      if (item.title === 'Documents') {
                                          return (
                                              <>
                                                  <AccountUpgradeSingle
                                                      statusInfo={
                                                          item.statusReport
                                                      }
                                                      textII={item.textII}
                                                      status={item.status}
                                                      icon={item.icon}
                                                      text={item.title}
                                                      key={index}
                                                      action={() => {
                                                          setDocument(
                                                              !document
                                                          );
                                                      }}
                                                  />
                                                  {document
                                                      ? AccountUpgradeData.document.map(
                                                            (item, index) => {
                                                                return (
                                                                    <>
                                                                        <AccountUpgradeSingle
                                                                            text={
                                                                                item.title
                                                                            }
                                                                            status={
                                                                                item.status
                                                                            }
                                                                            textII={
                                                                                item.textII
                                                                            }
                                                                            key={
                                                                                index
                                                                            }
                                                                            statusInfo={
                                                                                item.statusReport
                                                                            }
                                                                            action={() => {
                                                                                if (
                                                                                    item.status ===
                                                                                    'Done'
                                                                                )
                                                                                    setErrorActive(
                                                                                        item.title
                                                                                    );
                                                                                else {
                                                                                    setTitle(
                                                                                        item.title
                                                                                    );
                                                                                }
                                                                            }}
                                                                        />
                                                                        {errorActive ===
                                                                        item.title ? (
                                                                            <>
                                                                                <p
                                                                                    className={
                                                                                        styles.error
                                                                                    }
                                                                                >
                                                                                    Already
                                                                                    Completed
                                                                                </p>
                                                                                {setTimeout(
                                                                                    () => {
                                                                                        setErrorActive(
                                                                                            ''
                                                                                        );
                                                                                    },
                                                                                    1500
                                                                                )}
                                                                            </>
                                                                        ) : null}
                                                                    </>
                                                                );
                                                            }
                                                        )
                                                      : null}
                                              </>
                                          );
                                      } else {
                                          return (
                                              <>
                                                  <AccountUpgradeSingle
                                                      textII={item.textII}
                                                      content={shareDocuments?.map(
                                                          (items) => {
                                                              if (
                                                                  items.documentType ===
                                                                  item.name
                                                              ) {
                                                                  return items.comment;
                                                              } else {
                                                                  return '';
                                                              }
                                                          }
                                                      )}
                                                      statusInfo={
                                                          item.statusReport
                                                      }
                                                      icon={item.icon}
                                                      text={item.title}
                                                      key={index}
                                                      status={item.status}
                                                      action={() => {
                                                          if (
                                                              item.status ===
                                                              'Done'
                                                          )
                                                              setErrorActive(
                                                                  item.title
                                                              );
                                                          else {
                                                              setTitle(
                                                                  item.title
                                                              );
                                                          }
                                                      }}
                                                  />
                                                  {errorActive ===
                                                  item.title ? (
                                                      <>
                                                          <p
                                                              className={
                                                                  styles.error
                                                              }
                                                          >
                                                              Already Completed
                                                          </p>
                                                          {setTimeout(() => {
                                                              setErrorActive(
                                                                  ''
                                                              );
                                                          }, 1500)}
                                                      </>
                                                  ) : null}
                                              </>
                                          );
                                      }
                                  }
                              )
                            : null}

                        {isLoading ? (
                            <div className={styles.lottie}>
                                <Lottie
                                    options={socialOptions}
                                    height={200}
                                    width={200}
                                />
                            </div>
                        ) : null}
                        {loading ? (
                            <Loader />
                        ) : (
                            // <ButtonComp
                            //     text={'Done'}
                            //     disabled={activeBtn}
                            //     active={activeBtn ? 'active' : 'inactive'}
                            //     type="submit"
                            // />

                            <div className={styles.relativeBtn}>
                                <button
                                    className={styles.buttonDone}
                                    onClick={() => {
                                        dispatch(pushDocumentsData());
                                        moveToDash();
                                    }}
                                >
                                    Save And Continue Later
                                </button>
                                <button
                                    className={
                                        active
                                            ? styles.buttonDone
                                            : styles.inactive
                                    }
                                    disabled={active ? null : true}
                                    onClick={() => {
                                        setLoading(true);
                                        dispatch(pushDocumentsData());
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        )}
                    </AccountUpgradeComponent>
                );
            case 'Verify your Address':
                return (
                    <AccountUpgradeComponent
                        action={() => {
                            setTitle('First');
                        }}
                        title="Verify your Address"
                    >
                        <div className={styles.verifyBody}>
                            <p>
                                Provide the address you previously entered while
                                registering for verification.
                            </p>
                            <div className={styles.addressBody}>
                                <div className={styles.addressGroup}>
                                    <label>Address </label>
                                    <input
                                        value={streetName}
                                        onChange={(e) =>
                                            setStreetName(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Enter Address "
                                    />
                                </div>
                                <div className={styles.addressCont}>
                                    <div className={styles.midCont}>
                                        <div className={styles.addressGroup}>
                                            <label>Landmark</label>
                                            <input
                                                type="text"
                                                placeholder="Enter Landmark"
                                                value={landMark}
                                                onInput={(e) => {
                                                    setLandMark(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {/* {console.log(landMark)} */}
                                    <div className={styles.midCont}>
                                        <div className={styles.addressGroup}>
                                            <label>State</label>
                                            <select
                                                name=""
                                                id=""
                                                onChange={(event) => {
                                                    setState(
                                                        event.target.value
                                                    );
                                                    //console.log(selstate);
                                                }}
                                            >
                                                <option value="">
                                                    Select State
                                                </option>
                                                {/* <option
                                                    value={location.filter(
                                                        (item) => {
                                                            if (
                                                                item.state ===
                                                                selstate
                                                            ) {
                                                                return item.code;
                                                            }
                                                        }
                                                    )}
                                                >
                                                    {selstate}
                                                </option> */}
                                                {location?.map(
                                                    (state, index) => {
                                                        return (
                                                            <option
                                                                value={
                                                                    state.code
                                                                }
                                                                key={index}
                                                            >
                                                                {state.state}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.addressCont}>
                                    <div className={styles.midCont}>
                                        <div className={styles.addressGroup}>
                                            <label>City</label>
                                            <input
                                                value={
                                                    city === null ? '' : city
                                                }
                                                onChange={(e) =>
                                                    setCity(e.target.value)
                                                }
                                                type="text"
                                                placeholder="Enter City"
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.midCont}>
                                        <div className={styles.addressGroup}>
                                            <label>Local Government Area</label>
                                            <select
                                                name=""
                                                id=""
                                                onChange={(event) => {
                                                    setLocalGovernmane(
                                                        event.target.value
                                                    );
                                                }}
                                            >
                                                {/* <option
                                                    value={localGovernment?.filter(
                                                        (item) => {
                                                            if (
                                                                item.lgaName ===
                                                                localGovernmane
                                                            ) {
                                                                return item.lgaCode;
                                                            }
                                                        }
                                                    )}
                                                >
                                                    {localGovernmane}
                                                </option> */}
                                                <option value="">
                                                    Select LGA
                                                </option>
                                                {localGovernment
                                                    ? localGovernment?.map(
                                                          (item, index) => {
                                                              //   {
                                                              //       //console.log(
                                                              //           item
                                                              //       );
                                                              //   }
                                                              return (
                                                                  <option
                                                                      value={
                                                                          item.lgaCode
                                                                      }
                                                                      key={
                                                                          index
                                                                      }
                                                                  >
                                                                      {
                                                                          item.lgaName
                                                                      }
                                                                  </option>
                                                              );
                                                          }
                                                      )
                                                    : null}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <Link
                                href={`https://ecodigitalavr.comono.io/customer-details/?workitemId=${userProfile.profileId}&customerName=${userProfile?.preferredName}&customerEmail=${userProfile?.email}&branchCode=800&segmentId=CDS&address=${streetName}&landmark=${landMark}&state=${selstate}&lga=${localGovernmane}&createdBy=SME_APP_WEB&customerImage&Latitude=${latitude}&Longitude=${longitude}&phoneNumber=${userProfile?.phoneNumber}`}
                            >
                                Links
                            </Link> */}
                            <Modal
                                isOpen={modalIsOpen}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <div className={styles.headerDiv}>
                                    <h2
                                        ref={(_subtitle) =>
                                            (subtitle = _subtitle)
                                        }
                                    >
                                        Address Verification
                                    </h2>
                                    <h1
                                        className={styles.errorX}
                                        onClick={closeModal}
                                    >
                                        X
                                    </h1>
                                </div>
                                {/* //When adding latituted add them the way i did with vartiable */}
                                {/* `https://ecocomonoreact.azurewebsites.net/customer-details/
                                ?workitemId=AO-095734358976187628-CO&
                                customerName=MUSA&customerEmail=musa%40gmail.comm
                                &branchCode=A02
                                &segmentId=ADB&address=ZUBIARU%20HOUSE%20ZANGO&landmark&state=Lagos
                                &lga=Badagry&createdBy=RealMg&customerImage&Latitude&Longitude` */}

                                <Iframe
                                    src={
                                        `https://ecodigitalavr.comono.io/customer-details/?workitemId=${userProfile.profileId}&customerName=${userProfile?.preferredName}&customerEmail=${userProfile?.email}&branchCode=800&segmentId=CDS&address=${streetName}&landmark=${landMark}&state=${selstate}&lga=${localGovernmane}&createdBy=SME_APP_WEB&customerImage&Latitude=${latitude}&Longitude=${longitude}&phoneNumber=+234${userProfile?.phoneNumber}`
                                        // {
                                        // pathname:
                                        // 'https://ecocomonoreact.azurewebsites.net/customer-details/?workitemId=AO-095734358976187628-CO&customerName=Test Customer&customerEmail=boluwatobi@gmail.com&branchCode=A02&segmentId=ADB&address=25 pilot crescent off bode thomas surulere&landmark&state=LA&lga=LA020&createdBy=RealMg&customerImage&Latitude=6.4886218&Longitude=3.3567333'
                                        //  https://ecocomonoreact.azurewebsites.net/customer-details/?workitemId=AO-095734358976187628-CO&customerName=MUSA&customerEmail=musa%40gmail.comm&branchCode=A02&segmentId=ADB&address=ZUBIARU%20HOUSE%20ZANGO&landmark=Yabatech&state=Lagos&lga=Badagry&createdBy=RealMg&customerImage&Latitude&Longitude
                                        // query: {
                                        //     workitemId:
                                        //         'AO-095734358976187628-CO',
                                        //     customerName:
                                        //         userProfile?.preferredName,
                                        //     customerEmail: userProfile?.email,
                                        //     branchCode: 'A02',
                                        //     segmentId: 'ADB',
                                        //     // houseNumber: '25',
                                        //     address: streetName,
                                        //     // streetName: 'Igbobi College Road',
                                        //     // areaName: 'Yaba',
                                        //     landmark: landMark,
                                        //     state: selstate,
                                        //     lga: localGovernmane,
                                        //     createdBy: 'RealMg',
                                        //     customerImage: '',
                                        //     Latitude: latitude,
                                        //     Longitude: longitude
                                        // }
                                        // }
                                    }
                                    width="640px"
                                    height="620px"
                                    id=""
                                    className=""
                                    display="block"
                                    position="relative"
                                />
                            </Modal>
                            <button type="submit" onClick={openModal}>
                                Confirm Address
                            </button>
                            {/* <ButtonComp
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                type="submit"
                                text=" Confirm Address"
                                onClick={openModal}
                            ></ButtonComp> */}
                            {/* </Iframe> */}
                        </div>
                    </AccountUpgradeComponent>
                );
            case 'Upload Utility BIll':
                return (
                    <AccountUpgradeComponent
                        action={() => {
                            setTitle('First');
                        }}
                        title="Utility"
                    >
                        <div className={styles.utilityBody}>
                            {shareDocuments?.map((item, index) => {
                                if (item.documentType === 'UTILITY') {
                                    if (item.comment !== null) {
                                        return (
                                            <p key={index}>{item.comment}</p>
                                        );
                                    } else {
                                        return null;
                                    }
                                }
                            })}
                            <div className={styles.selUtilDiv}>
                                <label className={styles.selUtil}>
                                    Select A utility type
                                </label>
                                <select
                                    name=""
                                    id=""
                                    onChange={(event) => {
                                        setUtilityType(event.target.value);
                                        //console.logselstate);
                                    }}
                                >
                                    <option value="NEPA_BILL">
                                        Select a utility
                                    </option>
                                    <option value="NEPA_BILL">
                                        Electricity BILL
                                    </option>
                                    <option value="LAWMA">LAWMA</option>
                                </select>
                            </div>
                            <div className={styles.signatureGroup}>
                                <p>Upload Photo</p>
                                <div className={styles.signatureFormGroup}>
                                    <p>
                                        {' '}
                                        {utilityFileName
                                            ? utilityFileName
                                            : 'No file chosen...'}
                                    </p>
                                    <label>
                                        <input
                                            type="file"
                                            onChange={saveUtilityFile}
                                        />{' '}
                                        Upload
                                    </label>
                                </div>
                            </div>
                            <div className={styles.addressBody}>
                                <div className={styles.addressGroup}>
                                    <label>Street </label>
                                    <input
                                        value={streetName}
                                        onChange={(e) =>
                                            setStreetName(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Enter Street "
                                    />
                                </div>
                                <div className={styles.addressCont}>
                                    <div className={styles.midCont}>
                                        <div className={styles.addressGroup}>
                                            <label>Landmark</label>
                                            <input
                                                value={landMark}
                                                onChange={(e) =>
                                                    setLandMark(e.target.value)
                                                }
                                                type="text"
                                                placeholder="Enter Landmark"
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.midCont}>
                                        <div className={styles.addressGroup}>
                                            <label>State</label>
                                            <select
                                                name=""
                                                id=""
                                                onChange={(event) => {
                                                    setState(
                                                        event.target.value
                                                    );
                                                    //console.logselstate);
                                                }}
                                            >
                                                <option value={selstate}>
                                                    {selstate}
                                                </option>
                                                {location?.map(
                                                    (state, index) => {
                                                        return (
                                                            <option
                                                                value={
                                                                    state.code
                                                                }
                                                                key={index}
                                                            >
                                                                {state.state}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.addressCont}>
                                    <div className={styles.midCont}>
                                        <div className={styles.addressGroup}>
                                            <label>City</label>
                                            <input
                                                value={city}
                                                onChange={(e) =>
                                                    setCity(e.target.value)
                                                }
                                                type="text"
                                                placeholder="Enter City"
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.midCont}>
                                        <div className={styles.addressGroup}>
                                            <label>Local Government Area</label>
                                            <select
                                                name=""
                                                id=""
                                                onChange={(event) => {
                                                    setLocalGovernmane(
                                                        event.target.value
                                                    );
                                                }}
                                            >
                                                <option value={localGovernmane}>
                                                    {localGovernmane}
                                                </option>
                                                {localGovernment
                                                    ? localGovernment?.map(
                                                          (item, index) => {
                                                              return (
                                                                  <option
                                                                      value={
                                                                          item.lgaName
                                                                      }
                                                                      key={
                                                                          index
                                                                      }
                                                                  >
                                                                      {
                                                                          item.lgaName
                                                                      }
                                                                  </option>
                                                              );
                                                          }
                                                      )
                                                    : null}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {loading ? (
                            <Loader />
                        ) : (
                            <button onClick={utilityUploads}>
                                Update Profile
                            </button>
                        )}
                    </AccountUpgradeComponent>
                );
            case 'Upload ID Card':
                return (
                    <AccountUpgradeComponent
                        action={() => {
                            setTitle('First');
                        }}
                        title="Means of Identification"
                    >
                        <div className={styles.meansIdentification}>
                            {shareDocuments?.map((item, index) => {
                                if (item.documentType === 'IDENTIFICATION') {
                                    if (item.comment !== null) {
                                        return (
                                            <p key={index}>{item.comment}</p>
                                        );
                                    } else {
                                        return null;
                                    }
                                }
                            })}
                            <div className={styles.identificationGroup}>
                                <label>Choose Means of Identification</label>
                                <select
                                    name=""
                                    id=""
                                    // value={IDType}
                                    onChange={(e) => {
                                        setIDType(e.target.value);
                                    }}
                                >
                                    <option value="">
                                        Select regulatory ID
                                    </option>

                                    <option value="VOTERS_CARD">
                                        Voters Card
                                    </option>
                                    <option value="NATIONAL_ID">
                                        National ID card
                                    </option>
                                    <option value="DRIVERS_LICENSE">
                                        Drivers License
                                    </option>
                                    <option value="PASSPORT">
                                        International Passport
                                    </option>
                                </select>
                            </div>
                            <div className={styles.identificationGroup}>
                                <label>ID Number</label>
                                <input
                                    type="text"
                                    value={idNumber}
                                    onChange={(e) =>
                                        setIdNumber(e.target.value)
                                    }
                                    placeholder="Enter ID  Number"
                                />
                            </div>
                        </div>

                        <div className={styles.signature}>
                            <div className={styles.signatureGroup}>
                                <p>Upload Front of ID</p>
                                <div className={styles.signatureFormGroup}>
                                    <p>
                                        {' '}
                                        {identificationDocumentFileName
                                            ? identificationDocumentFileName
                                            : 'No file chosen...'}
                                    </p>
                                    <label>
                                        <input
                                            onChange={saveIdentificationFile}
                                            type="file"
                                            accept="image/png, image/HEIC, image/jpeg, application/pdf"
                                        />{' '}
                                        Upload
                                    </label>
                                </div>
                            </div>
                            {IDType === 'VOTERS_CARD' ||
                            IDType === 'DRIVERS_LICENSE' ? (
                                <div className={styles.signatureGroup}>
                                    <p>Upload Back of ID</p>
                                    <div className={styles.signatureFormGroup}>
                                        <p>
                                            {' '}
                                            {identificationBackDocumentFileName
                                                ? identificationBackDocumentFileName
                                                : 'No file chosen...'}
                                        </p>
                                        <label>
                                            <input
                                                onChange={
                                                    saveBackIdentificationFile
                                                }
                                                type="file"
                                                accept="image/png, image/HEIC, image/jpeg, application/pdf"
                                            />{' '}
                                            Upload
                                        </label>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        {loading ? (
                            <Loader />
                        ) : (
                            <button
                                onClick={IdentificationyUpload}
                                className={styles.updateBtn}
                            >
                                Update Profile
                            </button>
                        )}
                    </AccountUpgradeComponent>
                );
            case 'Referee':
                return (
                    <AccountUpgradeComponent
                        action={() => {
                            setTitle('First');
                        }}
                        title="Input Referee Details"
                    >
                        <div className={styles.meansIdentification}>
                            <div className={styles.identificationGroup}>
                                <label>Referee 1</label>
                                <input
                                    type="text"
                                    value={reffereeEmail}
                                    placeholder="Input Referee Emai"
                                    onChange={(e) =>
                                        setReffereeEmail(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className={styles.meansIdentification}>
                            <div className={styles.identificationGroup}>
                                <label>Referee 2</label>
                                <input
                                    type="text"
                                    value={reffereeEmailI}
                                    placeholder="Input Referee Emai"
                                    onChange={(e) =>
                                        setReffereeEmailI(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {/* <div className={styles.signature}>
                            <label>Refferee</label>
                            <input type="text" value={idNumber} />
                        </div> */}
                        {loading ? (
                            <Loader />
                        ) : (
                            <button
                                onClick={refereeUpload}
                                className={styles.updateBtn}
                            >
                                Submit
                            </button>
                        )}
                    </AccountUpgradeComponent>
                );
            case 'Referee Form':
                return (
                    <AccountUpgradeComponent
                        action={() => {
                            setTitle('First');
                        }}
                        title="Input Referee Details"
                    >
                        <div className={styles.addressGroup}>
                            <label>Name Referee 1</label>
                            <input
                                type="text"
                                value={refereeName1}
                                placeholder="Input Referee one's Name"
                                onChange={(e) =>
                                    setRefereeName1(e.target.value)
                                }
                            />
                        </div>
                        <div className={styles.addressGroup}>
                            <label>Email Referee 1</label>
                            <input
                                type="text"
                                value={refereeEmail1}
                                placeholder="Input Referee one's Email"
                                onChange={(e) =>
                                    setRefereeEmail1(e.target.value)
                                }
                            />
                        </div>

                        <div className={styles.signatureGroup}>
                            <p>Input Referee Document</p>
                            <div className={styles.signatureFormGroup}>
                                <p>
                                    {' '}
                                    {fileNameI
                                        ? fileNameI
                                        : 'No file chosen...'}
                                </p>
                                <label>
                                    <input type="file" onChange={saveRefFile} />{' '}
                                    Upload
                                </label>
                            </div>
                        </div>
                        <div className={styles.addressGroup}>
                            <label>Name Referee 2</label>
                            <input
                                type="text"
                                value={reffereeName2}
                                placeholder="Input Referee two's Name"
                                onChange={(e) =>
                                    setReffereeName2(e.target.value)
                                }
                            />
                        </div>

                        <div className={styles.addressGroup}>
                            <label>Email Referee 2</label>
                            <input
                                type="text"
                                value={reffereeName2}
                                placeholder="Input Referee two's Email"
                                onChange={(e) =>
                                    setReffereeEmail2(e.target.value)
                                }
                            />
                        </div>

                        <div className={styles.signatureGroup}>
                            <p>Input Referee Document</p>
                            <div className={styles.signatureFormGroup}>
                                <p>
                                    {' '}
                                    {fileNameII
                                        ? fileNameII
                                        : 'No file chosen...'}
                                </p>
                                <label>
                                    <input
                                        type="file"
                                        onChange={saveRefFileI}
                                    />{' '}
                                    Upload
                                </label>
                            </div>
                        </div>

                        {/* <div className={styles.signature}>
                                <label>Refferee</label>
                                <input type="text" value={idNumber} />
                            </div> */}
                        {loading ? (
                            <Loader />
                        ) : (
                            <button
                                onClick={refereeFileUpload}
                                className={styles.updateBtn}
                            >
                                Submit
                            </button>
                        )}
                    </AccountUpgradeComponent>
                );
            case 'Ellevate Profiling':
                return (
                    <AccountUpgradeComponent
                        action={() => {
                            setTitle('First');
                        }}
                        title="Ellevate Profiling"
                    >
                        <>
                            <div className={styles.ellevateCopy}>
                                <p>
                                    SMEApp offers a range of solutions to
                                    women-owned businesses to grow their
                                    enterprise. It supports companies making
                                    women focused products and businesses with
                                    high percentage of female employees or board
                                    members. Benefits include:
                                </p>
                                <ul>
                                    <li>Zero maintenance fee</li>
                                    <li>
                                        Interest concession for loans and
                                        deposits
                                    </li>
                                    <li>
                                        Free Capacity building, Exhibitions and
                                        access to E-commence solutions
                                    </li>
                                </ul>
                            </div>
                            <form
                                onSubmit={handleSubmit((data) => {
                                    setElevateData(data.details);

                                    setLoading(true);
                                    const profileSetupItems = {
                                        surveyReport: data.details.map(
                                            (item, index) => {
                                                return {
                                                    index: index,
                                                    isAnswerYes: item.input
                                                };
                                            }
                                        )
                                    };
                                    dispatch(
                                        postEllevateProfilingDetails(
                                            profileSetupItems
                                        )
                                    );
                                })}
                            >
                                {Object.values(questions.questions).map(
                                    (item, index) => {
                                        const fieldName = `details[${index}]`;
                                        return (
                                            <div
                                                className={
                                                    checkedBtn
                                                        ? styles.profilingGrey
                                                        : styles.profilingDiv
                                                }
                                                key={index}
                                            >
                                                <input
                                                    disabled={checkedBtn}
                                                    // checked={inputCheck}
                                                    className={
                                                        styles.profilingInput
                                                    }
                                                    type="checkbox"
                                                    // onChange={
                                                    //     (
                                                    //         Object.values(
                                                    //             questions.questions
                                                    //         ).length - 1
                                                    //     ).checked === true
                                                    //         ? alert('test')
                                                    //         : alert('Testing')
                                                    // }
                                                    // checked={
                                                    //     profilingQuestionsData !==
                                                    //     null
                                                    //         ? profilingQuestionsData[
                                                    //               index
                                                    //           ].input
                                                    //         : null
                                                    // }
                                                    {...register(
                                                        `${fieldName}.input`
                                                    )}
                                                    // onClick={() =>
                                                    //     setProfileItemm(item)
                                                    // }
                                                />
                                                {/* {console.log(profileItemm)} */}
                                                <label>{item}</label>
                                            </div>
                                        );
                                    }
                                )}
                                <div className={styles.profilingDiv}>
                                    <input
                                        className={styles.profilingInput}
                                        type="checkbox"
                                        checked={checkedBtn}
                                        onChange={() => {
                                            // setInputCheck(false);
                                            setCheckedBtn((prev) => !prev);
                                        }}
                                    />
                                    <label>None of the above</label>
                                </div>
                                <div className={styles.disclaimer}>
                                    Kindly select applicable options
                                </div>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <button
                                        // onClick={profillingSetup}
                                        className={styles.updateBtn}
                                        type="submit"
                                    >
                                        Ellevate Profiling
                                    </button>
                                )}
                            </form>
                        </>

                        {/* <div className={styles.profilingDiv}>
                            <input
                                className={styles.profilingInput}
                                type="checkbox"
                                onChange={(e) => setCheckedI(!checkedI)}
                            />
                            <label>
                                Do you have up to 20% of women in senior
                                management in your organization?
                            </label>
                        </div>
                        <div className={styles.profilingDiv}>
                            <input
                                className={styles.profilingInput}
                                type="checkbox"
                                onChange={(e) => setChecked(!checkedII)}
                            />
                            <label>
                                Do female staff make up 30% of your
                                organization?
                            </label>
                        </div>
                        <div className={styles.profilingDiv}>
                            <input
                                className={styles.profilingInput}
                                type="checkbox"
                                onChange={(e) => setChecked(!checkedIII)}
                            />
                            <label>None of the above</label>
                        </div> */}
                    </AccountUpgradeComponent>
                );
            case 'Virtual NIN':
                return (
                    <AccountUpgradeComponent
                        action={() => {
                            setTitle('First');
                        }}
                        title="Virtual NIN"
                    >
                        <p className={styles.disclaimer}>
                            Get Your Virtual nin by dialing *346*3*your
                            NIN*7154614#
                        </p>
                        <input
                            type="text"
                            placeholder="Type your virtual Nin"
                            onChange={(e) => setVirtualNin(e.target.value)}
                        />
                        {loading ? (
                            <Loader />
                        ) : (
                            <button
                                className={styles.updateBtn}
                                type="submit"
                                onClick={virtualNinSend}
                            >
                                Virtual NIN
                            </button>
                        )}
                    </AccountUpgradeComponent>
                );
            case 'Document':
                return (
                    <AccountUpgradeComponent
                        action={() => {
                            setTitle('First');
                        }}
                        title="Documents"
                    >
                        <div className={styles.rcNumber}>
                            <label>
                                RC Number/Business Registration Number
                            </label>
                            <input
                                type="text"
                                name=""
                                id=""
                                placeholder="rc123456789"
                            />
                        </div>
                        <div className={styles.documentSingle}>
                            <div className={styles.signatureGroup}>
                                <p>
                                    Upload SCUML Certificate{' '}
                                    <span>(optional)</span>{' '}
                                </p>
                                <div className={styles.signatureFormGroup}>
                                    <p>No file chosen...</p>
                                    <label>
                                        <input type="file" /> Upload
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={styles.documentSingle}>
                            <div className={styles.signatureGroup}>
                                <p>Upload MEMAT</p>
                                <div className={styles.signatureFormGroup}>
                                    <p>No file chosen...</p>
                                    <div>
                                        <label>
                                            <input type="file" /> Share
                                        </label>
                                        <label>
                                            <input type="file" /> Upload
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.documentSingle}>
                            <div className={styles.signatureGroup}>
                                <p>Share Reference Form</p>
                                <div className={styles.signatureFormGroup}>
                                    <p>No file chosen...</p>
                                    <div>
                                        <label>
                                            <input type="file" /> Share
                                        </label>
                                        <label>
                                            <input type="file" /> Upload
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.documentSingle}>
                            <div className={styles.signatureGroup}>
                                <p>Upload Board Resolution</p>
                                <div className={styles.signatureFormGroup}>
                                    <p>No file chosen...</p>
                                    <label>
                                        <input type="file" /> Upload
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button>Submit</button>
                    </AccountUpgradeComponent>
                );
            case 'Directors':
                return (
                    <AccountUpgradeComponent
                        action={() => {
                            setTitle('First');
                        }}
                        title="Directors"
                    >
                        <div className={styles.directorsBody}>
                            <div className={styles.directorsGroup}>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Enter Full name"
                                />
                            </div>
                            <div className={styles.directorsGroup}>
                                <label>Email</label>
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Enter Email"
                                />
                            </div>
                            <div className={styles.directorsGroup}>
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Enter Phone Number"
                                />
                            </div>
                        </div>
                        <p
                            className={styles.addNew}
                            onClick={() => {
                                setDirector(!director);
                            }}
                        >
                            + Add New
                        </p>
                        {director ? (
                            <div className={styles.directorsBody}>
                                <div className={styles.directorsGroup}>
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name=""
                                        placeholder="Enter Full name"
                                    />
                                </div>
                                <div className={styles.directorsGroup}>
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        name=""
                                        placeholder="Enter Email"
                                    />
                                </div>
                                <div className={styles.directorsGroup}>
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        name=""
                                        placeholder="Enter Phone Number"
                                    />
                                </div>
                            </div>
                        ) : null}
                        <button>Send Invite</button>
                    </AccountUpgradeComponent>
                );
            case 'CAC Certificate':
                return (
                    <AccountUpgradeComponent
                        action={() => {
                            setTitle('First');
                            setDocument(false);
                        }}
                        title="CAC Certificate"
                    >
                        <div className={styles.documentBody}>
                            {shareDocuments?.map((item, index) => {
                                if (item.documentType === 'CAC') {
                                    if (item.comment !== null) {
                                        return (
                                            <p key={index}>{item.comment}</p>
                                        );
                                    } else {
                                        return null;
                                    }
                                }
                            })}
                            <div className={styles.identificationGroup}>
                                <label>CAC Registration Number</label>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setCacNumber(e.target.value)
                                    }
                                    placeholder="Enter CAC Registration Number"
                                />
                            </div>
                            <div className={styles.signature}>
                                <div className={styles.signatureGroup}>
                                    <p>Upload CAC Certificate</p>
                                    <div className={styles.signatureFormGroup}>
                                        <p>
                                            {' '}
                                            {fileName
                                                ? fileName
                                                : 'No file chosen...'}
                                        </p>
                                        <label>
                                            <input
                                                type="file"
                                                onChange={saveFile}
                                            />{' '}
                                            Upload
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {loading ? (
                                <Loader />
                            ) : (
                                <button
                                    className={styles.updateBtn}
                                    onClick={cacRegistration}
                                >
                                    Update Profile
                                </button>
                            )}
                        </div>
                    </AccountUpgradeComponent>
                );
            case 'TIN':
                return (
                    <AccountUpgradeComponent
                        action={() => {
                            setTitle('First');
                            setDocument(false);
                        }}
                        title="TIN Registration"
                    >
                        {/* {shareDocuments?.map((items) => {
                            if (items.documentType === 'IDENTIFICATION') {
                                return (
                                    <Tooltip anchorId="Tin" content="kjhgf" />
                                );
                            } else {
                                return '';
                            }
                        })} */}

                        <div className={styles.identificationGroup}>
                            <label id="Tin">
                                TIN (Tax Identification Number)
                            </label>
                            <input
                                type="text"
                                onChange={(e) => setTinNumber(e.target.value)}
                                placeholder="********-***"
                            />
                        </div>
                        {loading ? (
                            <Loader />
                        ) : (
                            <button
                                className={styles.updateBtn}
                                onClick={tinRegistration}
                            >
                                Update Profile
                            </button>
                        )}
                    </AccountUpgradeComponent>
                );
            case 'SCUML Certificate':
                return (
                    <AccountUpgradeComponent
                        action={() => {
                            setTitle('First');
                            setDocument(false);
                        }}
                        title="SCUML Certificate"
                    >
                        <div className={styles.documentBody}>
                            {shareDocuments?.map((item, index) => {
                                if (item.documentType === 'SCUML') {
                                    if (item.comment !== null) {
                                        return (
                                            <p key={index}>{item.comment}</p>
                                        );
                                    } else {
                                        return null;
                                    }
                                }
                            })}
                            <div className={styles.identificationGroup}>
                                <label>SCUML Certificate Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter SCUML Certificate Number"
                                />
                            </div>
                            <div className={styles.signature}>
                                <div className={styles.signatureGroup}>
                                    <p>Upload SCUML Certificate</p>
                                    <div className={styles.signatureFormGroup}>
                                        <p>
                                            {' '}
                                            {scmulfileName
                                                ? scmulfileName
                                                : 'No file chosen...'}
                                        </p>
                                        <label>
                                            <input
                                                onChange={saveScmulFile}
                                                type="file"
                                            />{' '}
                                            Upload
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {loading ? (
                                <Loader />
                            ) : (
                                <button
                                    className={styles.updateBtn}
                                    onClick={uploadScmul}
                                >
                                    Update Profile
                                </button>
                            )}
                        </div>
                    </AccountUpgradeComponent>
                );
            case 'CAC Documents':
                return (
                    <AccountUpgradeComponent
                        action={() => {
                            setTitle('First');
                            setDocument(false);
                        }}
                        title="CAC Documents"
                    >
                        <div className={styles.documentBody}>
                            <div className={styles.signature}>
                                <div className={styles.signatureGroup}>
                                    {shareDocuments?.map((items) => {
                                        if (items.documentType === 'CO2') {
                                            return (
                                                <Tooltip
                                                    anchorId="co2"
                                                    content={items.comment}
                                                />
                                            );
                                        } else {
                                            return '';
                                        }
                                    })}
                                    <div className={styles.statuses}>
                                        <p>Upload CO2</p>

                                        <p id="co2">
                                            {
                                                shareDocuments
                                                    ?.filter((items) => {
                                                        if (
                                                            items.documentType ===
                                                            'CO2'
                                                        ) {
                                                            return items;
                                                        } else {
                                                            return '';
                                                        }
                                                    })
                                                    .splice(0, 1)[0].status
                                            }
                                        </p>
                                    </div>
                                    <div className={styles.signatureFormGroup}>
                                        <p>
                                            {' '}
                                            {co2FileName
                                                ? co2FileName
                                                : 'No file chosen...'}
                                        </p>
                                        <label>
                                            <input
                                                onChange={saveMemart2lFile}
                                                type="file"
                                            />{' '}
                                            Upload
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.signature}>
                                <div className={styles.signatureGroup}>
                                    {shareDocuments?.map((items) => {
                                        if (items.documentType === 'CO7') {
                                            return (
                                                <Tooltip
                                                    anchorId="co7"
                                                    content={items.comment}
                                                />
                                            );
                                        } else {
                                            return '';
                                        }
                                    })}
                                    <div className={styles.statuses}>
                                        <p>Upload CO7</p>

                                        <p id="co7">
                                            {
                                                shareDocuments
                                                    ?.filter((items) => {
                                                        if (
                                                            items.documentType ===
                                                            'CO7'
                                                        ) {
                                                            return items;
                                                        } else {
                                                            return '';
                                                        }
                                                    })
                                                    .splice(0, 1)[0].status
                                            }
                                        </p>
                                    </div>
                                    <div className={styles.signatureFormGroup}>
                                        <p>
                                            {co7FileName
                                                ? co7FileName
                                                : 'No file chosen...'}
                                        </p>
                                        <label>
                                            <input
                                                onChange={saveMemart7lFile}
                                                type="file"
                                            />{' '}
                                            Upload
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.signature}>
                                <div className={styles.signatureGroup}>
                                    {shareDocuments?.map((items) => {
                                        if (items.documentType === 'CAC1_1') {
                                            return (
                                                <Tooltip
                                                    anchorId="cac11"
                                                    content={items.comment}
                                                />
                                            );
                                        } else {
                                            return '';
                                        }
                                    })}
                                    <div className={styles.statuses}>
                                        <p>Upload CAC 1.1</p>

                                        <p id="cac11">
                                            {
                                                shareDocuments
                                                    ?.filter((items) => {
                                                        if (
                                                            items.documentType ===
                                                            'CAC1_1'
                                                        ) {
                                                            return items;
                                                        } else {
                                                            return '';
                                                        }
                                                    })
                                                    .splice(0, 1)[0].status
                                            }
                                        </p>
                                    </div>
                                    <div className={styles.signatureFormGroup}>
                                        <p>
                                            {cac1FileName
                                                ? cac1FileName
                                                : 'No file chosen...'}
                                        </p>
                                        <label>
                                            <input
                                                onChange={saveMemartCAC1lFile}
                                                type="file"
                                            />{' '}
                                            Upload
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.signature}>
                                <div className={styles.signatureGroup}>
                                    {shareDocuments?.map((items) => {
                                        if (items.documentType === 'CAC2_1') {
                                            return (
                                                <Tooltip
                                                    anchorId="cac21"
                                                    content={items.comment}
                                                />
                                            );
                                        } else {
                                            return '';
                                        }
                                    })}
                                    <div className={styles.statuses}>
                                        <p>Upload CAC 2.1</p>
                                        <p id="cac21">
                                            {
                                                shareDocuments
                                                    ?.filter((items) => {
                                                        if (
                                                            items.documentType ===
                                                            'CAC2_1'
                                                        ) {
                                                            return items;
                                                        } else {
                                                            return '';
                                                        }
                                                    })
                                                    .splice(0, 1)[0].status
                                            }
                                        </p>
                                    </div>
                                    <div className={styles.signatureFormGroup}>
                                        <p>
                                            {cac2FileName
                                                ? cac2FileName
                                                : 'No file chosen...'}
                                        </p>
                                        <label>
                                            <input
                                                onChange={saveMemartCAC2lFile}
                                                type="file"
                                            />{' '}
                                            Upload
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.signature}>
                                <div className={styles.signatureGroup}>
                                    {shareDocuments?.map((items) => {
                                        if (items.documentType === 'MEMART') {
                                            return (
                                                <Tooltip
                                                    anchorId="memat"
                                                    content={items.comment}
                                                />
                                            );
                                        } else {
                                            return '';
                                        }
                                    })}
                                    <p></p>
                                    <div className={styles.statuses}>
                                        <p>
                                            Memorandum and Articles of
                                            Association (MEMART)
                                        </p>
                                        <p id="memat">
                                            {
                                                shareDocuments
                                                    ?.filter((items) => {
                                                        if (
                                                            items.documentType ===
                                                            'MEMART'
                                                        ) {
                                                            return items;
                                                        } else {
                                                            return '';
                                                        }
                                                    })
                                                    .splice(0, 1)[0].status
                                            }
                                        </p>
                                    </div>
                                    <div className={styles.signatureFormGroup}>
                                        <p>
                                            {memtFileName
                                                ? memtFileName
                                                : 'No file chosen...'}
                                        </p>
                                        <label>
                                            <input
                                                onChange={saveMemartMemtlFile}
                                                type="file"
                                            />{' '}
                                            Upload
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {loading ? (
                                <Loader />
                            ) : (
                                <button
                                    onClick={cacDocumentUpload}
                                    className={styles.updateBtn}
                                >
                                    Update
                                </button>
                            )}
                        </div>
                    </AccountUpgradeComponent>
                );
            case 'Referee':
                return (
                    <AccountUpgradeComponent
                        action={() => {
                            setTitle('First');
                        }}
                        title="Referee"
                    >
                        <div>
                            {shareDocuments?.map((item, index) => {
                                if (item.documentType === 'REFERENCE_FORM') {
                                    if (item.comment !== null) {
                                        return (
                                            <p key={index}>{item.comment}</p>
                                        );
                                    } else {
                                        return null;
                                    }
                                }
                            })}
                        </div>
                        <div className={styles.directorsBody}>
                            <h2>Reference 1</h2>
                            <div className={styles.directorsGroup}>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Enter Full Name"
                                />
                            </div>
                            <div className={styles.directorsGroup}>
                                <label>Email</label>
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Enter Email"
                                    value={refoneemail}
                                    onChange={(e) =>
                                        setRefoneEmail(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className={styles.directorsBody}>
                            <h2>Reference 2</h2>
                            <div className={styles.directorsGroup}>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Enter Full Name"
                                />
                            </div>
                            <div className={styles.directorsGroup}>
                                <label>Email</label>
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Enter Email"
                                    value={refoneno}
                                    onChange={(e) =>
                                        setRefoneNo(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <button onClick={reffernceUpload}>Send Invite</button>
                    </AccountUpgradeComponent>
                );
            case 'Set Transaction Pin':
                return (
                    <AccountUpgradeComponent
                        action={() => {
                            setTitle('First');
                        }}
                        title="Set Transaction Pin"
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.documentBody}>
                                {/* {message ? (
                                message ===
                                'Transaction Pin Set Successfully' ? (
                                    <p className={styles.success}>
                                        Transaction Pin Set Successfully
                                    </p>
                                ) : (
                                    <p className={styles.errors}>{message}</p>
                                )
                            ) : null} */}
                                <div className={styles.directorsGroup}>
                                    <label>Transaction Pin</label>
                                    <div className={styles.divs}>
                                        <input
                                            type={outType ? 'text' : 'password'}
                                            name="transactionPin"
                                            {...register('transactionPin', {
                                                required:
                                                    'Transaction Pin is required',
                                                minLength: {
                                                    value: 6,
                                                    message: 'Min length is 6'
                                                },
                                                maxLength: {
                                                    value: 6,
                                                    message: 'Max length is 6'
                                                },
                                                pattern: {
                                                    value: /^[0-9]/i,
                                                    message:
                                                        'Transaction Pin can only be number '
                                                }
                                            })}
                                            placeholder="Enter Transaction Pin"
                                        />
                                        <Visbility
                                            typeSet={types}
                                            input="input"
                                        />
                                    </div>
                                    <p className={styles.error}>
                                        {errors.transactionPin?.message}
                                    </p>
                                </div>
                                <div className={styles.directorsGroup}>
                                    <label>Password</label>
                                    <div className={styles.divs}>
                                        <input
                                            type={
                                                outTyped ? 'text' : 'password'
                                            }
                                            name="password"
                                            {...register('password', {
                                                required: 'Password is required'
                                            })}
                                            placeholder="Enter Password"
                                        />
                                        <Visbility
                                            typeSet={typed}
                                            input="input"
                                        />
                                    </div>
                                    <p className={styles.error}>
                                        {errors.password?.message}
                                    </p>
                                </div>
                            </div>
                            {loading ? (
                                <Loader />
                            ) : (
                                <button type="submit">Submit</button>
                            )}
                        </form>
                    </AccountUpgradeComponent>
                );
            case 'Success':
                return (
                    <PaymentSuccess
                        heading={message}
                        error={message}
                        text="Continue"
                        statusbar={statusbar}
                        overlay="true"
                        action={
                            statusbar === 'error'
                                ? () => {
                                      setTitle('First');
                                  }
                                : statusbar === 'success'
                                ? () => {
                                      setTitle('First');
                                  }
                                : null
                        }
                    />
                );
        }
    };

    return (
        <div className={styles.relativeServie}>
            {outcome ? (
                <PaymentSuccess
                    body={message}
                    error={message}
                    statusbar={statusbar}
                    text="Try again"
                    overlay="true"
                    action={
                        statusbar === 'error'
                            ? () => {
                                  setTitle('First');
                                  setOutcome(false);
                              }
                            : statusbar === 'success'
                            ? () => {
                                  setTitle('First');
                                  setOutcome(false);
                              }
                            : null
                    }
                />
            ) : null}
            {multiStep()}
        </div>
    );
};

export default withAuth(AccountUpgrade);
