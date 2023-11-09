import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { MdOutlinePhone, MdWhatsapp } from 'react-icons/md';
import { RiFacebookCircleLine } from 'react-icons/ri';
import WrappedInput from '../../../ReusableComponents/WrappedInput';
import styles from './styles.module.css';
import TwitterLogo from './x';

const CreateStore1 = ({ nextPage }) => {
    const saveandcontinue = (e) => {
        e.preventDefault();
        nextPage();
    };
    return (
        <div className={styles.dets}>
            <h1>Storefront Details</h1>
            <form className={styles.form}>
                <div>
                    <label>Store name</label>
                    <input type="text" placeholder="Name" />
                </div>
                <div>
                    <label>Storefront Link</label>
                    <input type="text" placeholder="Name" />
                </div>
                <div>
                    <label>Store description (optional)</label>
                    <textarea rows={6} cols={10}></textarea>
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
                            placeholder="Name"
                        />
                    </div>
                    <p className={styles.addAnother}>Add another number</p>
                </div>
                <div>
                    <label>Email Address</label>
                    <div className={styles.inputWithLogodiv}>
                        <AiOutlineMail />
                        <input
                            className={styles.inputWithLogo}
                            type="text"
                            placeholder="Name"
                        />
                    </div>
                </div>
                <hr className={styles.hr} />
                <h1>Social links</h1>
                <WrappedInput
                    label="Whatsapp"
                    link="wa.me/"
                    svg={<MdWhatsapp />}
                />
                <WrappedInput
                    label="Facebook"
                    link="facebook.com/"
                    svg={<RiFacebookCircleLine />}
                />
                <WrappedInput
                    label="Instagram"
                    link="instagram.com/"
                    svg={<AiOutlineMail />}
                />
                <WrappedInput label="X" link="x.com/" svg={<TwitterLogo />} />
                <div className={styles.saveAnd}>
                    <button onClick={saveandcontinue}>Save and continue</button>
                </div>
            </form>
        </div>
    );
};

export default CreateStore1;
