import React, { useState } from 'react';
import ButtonComp from '../../../ReusableComponents/Button';
import styles from './styles.module.css';

const StepTwo = ({ saveandcontinue }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <div className={styles.stepTwo}>
            <div>
                <div className={styles.yesNo}>
                    <div className={styles.checkBox}>
                        <input type="checkbox" />
                        <label>Use previously inputted personal details</label>
                    </div>
                </div>
            </div>
            <div>
                <label>Your surname</label>
                <input type="text" placeholder="Type your business name here" />
            </div>
            <div className={styles.inputFlex}>
                <div>
                    <label>Your first name</label>
                    <input
                        type="text"
                        placeholder="Type your business name here"
                    />
                </div>
                <div>
                    <label>Your middle name</label>
                    <input
                        type="text"
                        placeholder="Type your business name here"
                    />
                </div>
            </div>
            <div>
                <label>Nationality</label>
                <select>
                    <option>Select an option</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
            </div>
            <div className={styles.inputFlex}>
                <div>
                    <label>Gender</label>
                    <select>
                        <option>Select an option</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </div>
                <div>
                    <label>Proposed business name</label>
                    <input
                        type="date"
                        placeholder="Type your business name here"
                    />
                </div>
            </div>
            <div>
                <label>Phone number</label>
                <input
                    type="number"
                    placeholder="Type your business name here"
                />
            </div>
            <div>
                <label>Email Address</label>
                <input type="text" placeholder="Type your business name here" />
            </div>
            <div>
                <label>Your occupation</label>
                <input type="text" placeholder="Type your business name here" />
            </div>
            <div className={styles.inputFlex}>
                <div>
                    <label>Your house number</label>
                    <input
                        type="text"
                        placeholder="Type your business name here"
                    />
                </div>
                <div>
                    <label>House street namee</label>
                    <input
                        type="text"
                        placeholder="Type your business name here"
                    />
                </div>
            </div>
            <div className={styles.inputFlex}>
                <div>
                    <label>State/province</label>
                    <select>
                        <option>Select an option</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </div>
                <div>
                    <label>Town/city/local government</label>
                    <select>
                        <option>Select an option</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.head}>
                <h2>Details of 1st Co-owner</h2>
                <p>
                    Kindly ensure that you use correct details as we will be
                    reaching out to the co-owner.
                </p>
            </div>

            <div>
                <label>Co-owner’s name (Surname first)</label>
                <input type="text" placeholder="Type your business name here" />
            </div>
            <div>
                <label>Co-owner’s mobile number</label>
                <input type="text" placeholder="Type your business name here" />
            </div>
            <div>
                <label>Co-owner’s email address</label>
                <input type="text" placeholder="Type your business name here" />
            </div>
            <p className={styles.addAnothr}>Add another co-owner</p>
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

export default StepTwo;
