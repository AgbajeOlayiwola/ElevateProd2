import { Formik } from 'formik';
import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { MdOutlinePhone, MdWhatsapp } from 'react-icons/md';
import { RiFacebookCircleLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useCreatStorefrontMutation } from '../../../../redux/api/authApi';
import { setCreateStore } from '../../../../redux/slices/creatStoreSlice';
import WrappedInput from '../../../ReusableComponents/WrappedInput';
import styles from './styles.module.css';
import TwitterLogo from './x';
const CreateStore1 = ({ nextPage }) => {
    const dispatch = useDispatch();

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

    const initSchema = yup.object().shape({
        storeName: yup.string().required('Store name is required'),
        storeLink: yup.string().required('Store link is required'),
        storePhoneNumber: yup.string().required('Store phonnumber is required'),
        storeEmail: yup.string().required('Store email is required')
    });

    const initialValues = {
        storeName: '',
        storeLink: '',
        storeDescription: '',
        storePhoneNumber: '',
        storeEmail: '',
        whatsapp: '',
        facebook: '',
        instagram: '',
        xcom: ''
    };
    return (
        <div className={styles.dets}>
            <h1>Storefront Details</h1>
            <Formik
                validationSchema={initSchema}
                initialValues={initialValues}
                validateOnChange={true}
                onSubmit={(values, { setSubmitting }) => {
                    const data = {
                        storeFrontName: values?.storeName,
                        storeFrontLink: `https://www.ecobank.com/storefront/${values?.storeFrontLink}`,
                        storeFrontDescription: values?.storeDescription,
                        phoneNumbers: [values?.storePhoneNumber],
                        email: values?.storeEmail,
                        whatsappLink: `wa.me/${values?.whatsapp}`,
                        facebookLink: `facebook.com${values?.facebook}`,
                        instagramLink: `instagram.com/${values?.instagram}`,
                        websiteLink: `https://www.ecobank.com/storefront/${values?.storeFrontLink}`,
                        isPrimary: false,
                        useBusinessContact: false,
                        color: 'rogbiv'
                    };
                    console.log(data);
                    dispatch(setCreateStore(data));
                    nextPage();
                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    setFieldValue,
                    handleSubmit
                }) => (
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div>
                            <label>Store name</label>
                            <input
                                type="text"
                                namm="storeName"
                                placeholder="Name"
                                value={values?.storeName}
                                onChange={(e) =>
                                    setFieldValue('storeName', e.target.value)
                                }
                            />
                            {errors ? (
                                <p className={styles.error}>
                                    {errors?.storeName}
                                </p>
                            ) : null}
                        </div>
                        <div>
                            <label>Storefront Link</label>
                            <input
                                type="text"
                                placeholder="Name"
                                value={values?.storeLink}
                                name="storeLink"
                                onChange={(e) =>
                                    setFieldValue('storeLink', e.target.value)
                                }
                            />
                            {errors ? (
                                <p className={styles.error}>
                                    {errors?.storeLink}
                                </p>
                            ) : null}
                        </div>
                        <div>
                            <label>Store description (optional)</label>
                            <textarea
                                rows={6}
                                cols={10}
                                value={values?.storeDescription}
                                name="storeDescription"
                                onChange={(e) =>
                                    setFieldValue(
                                        'storeDescription',
                                        e.target.value
                                    )
                                }
                            ></textarea>
                        </div>
                        <hr className={styles.hr} />
                        <div className={styles.contDets}>
                            <h1>Contact details</h1>
                            <div className={styles.useBus}>
                                <input type="checkbox" name="check" />
                                <label htmlFor="check">
                                    Use business contact details
                                </label>
                            </div>
                        </div>
                        <div>
                            <label>Phone Number</label>
                            <div className={styles.inputWithLogodiv}>
                                <MdOutlinePhone />
                                <input
                                    className={styles.inputWithLogo}
                                    type="text"
                                    value={values?.storePhoneNumber}
                                    placeholder="Name"
                                    name="storePhoneNumber"
                                    onChange={(e) =>
                                        setFieldValue(
                                            'storePhoneNumber',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            {errors ? (
                                <p className={styles.error}>
                                    {errors?.storePhoneNumber}
                                </p>
                            ) : null}
                            <p className={styles.addAnother}>
                                Add another number
                            </p>
                        </div>
                        <div>
                            <label>Email Address</label>
                            <div className={styles.inputWithLogodiv}>
                                <AiOutlineMail />
                                <input
                                    className={styles.inputWithLogo}
                                    value={values?.storeEmail}
                                    type="text"
                                    name="storeEmail"
                                    placeholder="Name"
                                    onChange={(e) =>
                                        setFieldValue(
                                            'storeEmail',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            {errors ? (
                                <p className={styles.error}>
                                    {errors?.storeEmail}
                                </p>
                            ) : null}
                        </div>
                        <hr className={styles.hr} />
                        <h1>Social links</h1>
                        <WrappedInput
                            name="Whatsapp"
                            label="Whatsapp"
                            value={values?.whatsapp}
                            onChange={(e) =>
                                setFieldValue('whatsapp', e.target.value)
                            }
                            link="wa.me/"
                            svg={<MdWhatsapp />}
                        />
                        <WrappedInput
                            label="Facebook"
                            value={values?.facebook}
                            name="facebook"
                            link="facebook.com/"
                            onChange={(e) =>
                                setFieldValue('facebook', e.target.value)
                            }
                            svg={<RiFacebookCircleLine />}
                        />
                        <WrappedInput
                            label="Instagram"
                            link="instagram.com/"
                            values={values?.instagram}
                            name="instagram"
                            onChange={(e) =>
                                setFieldValue('instagram', e.target.value)
                            }
                            svg={<AiOutlineMail />}
                        />
                        <WrappedInput
                            label="X"
                            link="x.com/"
                            value={values?.xcom}
                            name="xcom"
                            onChange={(e) =>
                                setFieldValue('xcom', e.target.value)
                            }
                            svg={<TwitterLogo />}
                        />
                        <div className={styles.saveAnd}>
                            <button type="submit">Save and continue</button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default CreateStore1;
