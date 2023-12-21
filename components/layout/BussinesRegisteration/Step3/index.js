import React, { useState } from 'react';
import ButtonComp from '../../../ReusableComponents/Button';
import InputFile from '../../../ReusableComponents/InputFile';
import PlusSvg from '../../../ReusableComponents/ReusableSvgComponents/PlusSvg';
import styles from './styles.module.css';
const StepThree = ({ saveandcontinue }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    const onImageUrlChangeBanner = () => {};
    return (
        <div className={styles.stepThree}>
            <div>
                <label>Select ID type</label>
                <select>
                    <option>Select an option</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
            </div>
            <div>
                <label>Enter selected ID number</label>
                <input type="text" placeholder="Type your business name here" />
            </div>
            <InputFile
                icon={<PlusSvg />}
                name="Upload your ID"
                disclaimer="Only images are allowed, max of 1mb."
                uploadLabel="Click to add your IDr"
                logoBanner="banner"
                onImageUrlChange={onImageUrlChangeBanner}
            />
            <hr className={styles.hr} />
            <InputFile
                icon={<PlusSvg />}
                name="Upload your recent passport"
                disclaimer="Only images are allowed, max of 1mb."
                uploadLabel="Click here to upload"
                logoBanner="banner"
                onImageUrlChange={onImageUrlChangeBanner}
            />

            <div className={styles.txtDiv}>
                <label>Your signature</label>
                <textarea
                    cols={8}
                    rows={6}
                    placeholder="Tell us about what the services or product you offer..."
                ></textarea>
                <div className={styles.button}>
                    <p className={styles.wordCount}>Upload instead</p>
                    <p className={styles.wordCount}>Clear signature</p>
                </div>
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
                    text="Save and continue"
                    type="submit"
                    // loads={creatStorefrontLoad}
                />
            </div>
        </div>
    );
};

export default StepThree;
