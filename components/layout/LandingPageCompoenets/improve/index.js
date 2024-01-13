import React from 'react';
import { improveData } from '../../../ReusableComponents/Data';
import Cover from '../Cover';
import styles from './styles.module.css';

const ImporveSection = () => {
    return (
        <Cover>
            <div data-aos="fade-up">
                <div className={styles.topFlex}>
                    <div className={styles.topSide}>
                        <h2>Improve your business efficiency </h2>
                        <p>
                            Streamline your business operations, boost
                            productivity, and thrive with the ultimate SME
                            banking tools for seamless business efficiency and
                            growth. Get started today!
                        </p>
                    </div>
                </div>
                <div className={styles.improvements}>
                    {improveData.map((item, index) => {
                        // console.log(item);
                        return (
                            <div key={index}>
                                {item?.svg}
                                <div>
                                    <h1>{item?.header}</h1>
                                    <p>{item?.content}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Cover>
    );
};

export default ImporveSection;
