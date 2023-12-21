import React, { useState } from 'react';
import ButtonComp from '../../../ReusableComponents/Button';
import styles from './styles.module.css';
const StepOne = ({ saveandcontinue }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <div className={styles.step0ne}>
            <div>
                <p className={styles.registering}>
                    Are you registering this business for yourself
                </p>
                <div className={styles.yesNo}>
                    <div className={styles.checkBox}>
                        <input type="checkbox" />
                        <label>Yes</label>
                    </div>
                    <div className={styles.checkBox}>
                        <input type="checkbox" />
                        <label>No</label>
                    </div>
                </div>
            </div>
            <div>
                <label>Number of business owners including you</label>
                <select>
                    <option>Select an option</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                <p className={styles.max}>Maximum of 3 owners</p>
            </div>
            <div>
                <label>Proposed business name</label>
                <input type="text" placeholder="Type your business name here" />
            </div>
            <div>
                <label>Nature of business</label>
                <select>
                    <option>Select an option</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
            </div>
            <div className={styles.txtDiv}>
                <label>Description of the business activity</label>
                <textarea
                    cols={8}
                    rows={6}
                    placeholder="Tell us about what the services or product you offer..."
                ></textarea>
                <p className={styles.wordCount}>0/30 words</p>
            </div>
            <hr className={styles.hr} />
            <div className={styles.checkBox}>
                <input type="checkbox" />
                <label>Use previously inputted business address</label>
            </div>
            <div className={styles.inputFlex}>
                <div>
                    <label>Proposed business name</label>
                    <input
                        type="text"
                        placeholder="Type your business name here"
                    />
                </div>
                <div>
                    <label>Proposed business name</label>
                    <input
                        type="text"
                        placeholder="Type your business name here"
                    />
                </div>
            </div>
            <div className={styles.inputFlex}>
                <div>
                    <label>Nature of business</label>
                    <select>
                        <option>Select an option</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </div>
                <div>
                    <label>Nature of business</label>
                    <select>
                        <option>Select an option</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </div>
            </div>
            <div className={styles.button}>
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

export default StepOne;
