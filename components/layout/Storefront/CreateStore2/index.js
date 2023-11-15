import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCreatStorefrontMutation } from '../../../../redux/api/authApi';
import ButtonComp from '../../../ReusableComponents/Button';
import InputFile from '../../../ReusableComponents/InputFile';
import PlusSvg from '../../../ReusableComponents/ReusableSvgComponents/PlusSvg';
import CreateStoreSuccess from '../CreateStoreSuccess';
import styles from './styles.module.css';
const CreateStore2 = ({ nextPage }) => {
    const [succes, setSucces] = useState(false);
    const [logo, setLogo] = useState('');
    const [banner, setBanner] = useState('');
    const { createStoreSliceData } = useSelector((store) => store);
    const [activeBtn, setActiveBtn] = useState(true);
    const [
        creatStorefront,
        {
            data: creatStorefrontData,
            isLoading: creatStorefrontLoad,
            isSuccess: creatStorefrontSuccess,
            isError: creatStorefrontFalse,
            error: creatStorefrontErr,
            reset: creatStorefrontReset
        }
    ] = useCreatStorefrontMutation();
    const saveandcontinue = (e) => {
        e.preventDefault();
        const data = { ...createStoreSliceData, logo: logo, banner: banner };
        creatStorefront(data);
        // nextPage();
    };
    useEffect(() => {
        if (creatStorefrontSuccess) {
            setSucces(true);
        }
    }, [creatStorefrontSuccess]);
    const showToastMessage = () => {
        toast.error(creatStorefrontErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
    };
    useEffect(() => {
        if (creatStorefrontErr) {
            showToastMessage();
        }
    }, [creatStorefrontErr]);

    const onImageUrlChange = (data) => {
        setLogo(data.replace('data:image/png;base64,', ''));
    };
    const onImageUrlChangeBanner = (data) => {
        setBanner(data.replace('data:image/png;base64,', ''));
    };
    return (
        <>
            <ToastContainer />
            {succes ? (
                <CreateStoreSuccess />
            ) : (
                <div className={styles.createStore}>
                    <InputFile
                        icon={<PlusSvg />}
                        name="Upload your store logo"
                        disclaimer="Only images are allowed, max of 1mb."
                        uploadLabel="Click to add a logo"
                        logoBanner="logo"
                        onImageUrlChange={onImageUrlChange}
                    />
                    <br />
                    <br />
                    <hr className={styles.hr} />
                    <br />
                    <br />
                    <InputFile
                        icon={<PlusSvg />}
                        name="Upload your store banner"
                        disclaimer="Use a banner of 364px by 160px for maximum resolution"
                        uploadLabel="Click to add a banner"
                        logoBanner="banner"
                        onImageUrlChange={onImageUrlChangeBanner}
                    />
                    <div className={styles.saveAnd}>
                        <ButtonComp
                            onClick={saveandcontinue}
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            text="Save and continue"
                            type="submit"
                            loads={creatStorefrontLoad}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateStore2;
