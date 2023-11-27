import React, { useState } from 'react';
import ButtonComp from '../../../ReusableComponents/Button';
import styles from './styles.module.css';

const StepFour = ({ saveandcontinue }) => {
    const [activeBtn, setActiveBtn] = useState(true);

    return (
        <div className={styles.stepFour}>
            <div>
                <p>Are you registering for yourself</p>
                <h3>Yes</h3>
            </div>
            <div>
                <p>Proposed business name</p>
                <h3>Bestprice Ventures</h3>
            </div>
            <div>
                <p>Nature of business</p>
                <h3>Gadgets and Electronics</h3>
            </div>
            <div>
                <p>Description of business activitites</p>
                <h3>
                    We deal in the purchase and selling of gadgets across Africa
                </h3>
            </div>
            <div>
                <p>Business location</p>
                <h3>5, Akanji Street, Eti-Osa, Lagos</h3>
            </div>

            <hr className={styles.hr} />

            <div className={styles.dataFlex}>
                <div>
                    <p>Your name</p>
                    <h3>AKINYEMI, Isaac</h3>
                </div>
                <div>
                    <p>Other name</p>
                    <h3>Damilare</h3>
                </div>
            </div>
            <div className={styles.dataFlex}>
                <div>
                    <p>Nationality</p>
                    <h3>Nigerian</h3>
                </div>
                <div>
                    <p>Gender</p>
                    <h3>MALE</h3>
                </div>
            </div>
            <div className={styles.dataFlex}>
                <div>
                    <p>Date of birth</p>
                    <h3>12/12/1987</h3>
                </div>
                <div>
                    <p>Mobile number</p>
                    <h3>08103792791</h3>
                </div>
            </div>
            <div>
                <p>Email address</p>
                <h3>iakinyemi@ecobank.ocm</h3>
            </div>
            <div>
                <p>Occupation</p>
                <h3>Entrepreneur</h3>
            </div>
            <div>
                <p>Your address</p>
                <h3>6, Ekenja Avenue, Isolo, Lagos</h3>
            </div>

            <hr className={styles.hr} />

            <div>
                <p>1st co-owner’s name</p>
                <h3>EKEZIE, Isaac</h3>
            </div>
            <div>
                <p> 1st co-owner’s mobile number</p>
                <h3>08103792791</h3>
            </div>
            <div>
                <p>1st co-owner’s email address</p>
                <h3>fekezie@ecobank.ocm</h3>
            </div>
            <hr className={styles.hr} />
            <div>
                <p>ID type</p>
                <h3>International passport</h3>
            </div>
            <div>
                <p>ID number</p>
                <h3>A11258101</h3>
            </div>
            <div>
                <p>ID Image</p>
                <h3>A11258101</h3>
            </div>
            <div>
                <p>Recent passport</p>
                <h3>A11258101</h3>
            </div>
            <div>
                <p>Your signature</p>
                <h3>A11258101</h3>
            </div>
            <div className={styles.checkBox}>
                <input type="checkbox" />
                <label>
                    I attest that all the information inputted are mine{' '}
                </label>
            </div>
            <div className={styles.button}>
                <p>
                    Not creating now?
                    <span className={styles.saveAsDrafr}> Save as Draft</span>
                </p>
                <ButtonComp
                    onClick={saveandcontinue}
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    text="Proceed"
                    type="submit"
                    // loads={creatStorefrontLoad}
                />
            </div>
        </div>
    );
};

export default StepFour;
