import React, { useState } from 'react';
import ButtonComp from '../../ReusableComponents/Button';
import Card from '../NotRegisteredForms/Card';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import StepThree from './StepThree';
import StepFour from './StepFour';
import Link from 'next/link';
import styles from './styles.module.css';
import StepTwoBVNAuthenticator from '../NotRegisteredForms/StepTwoBVNAuthenticator';

const ExistingMultiStep = () => {
    const [page, setPage] = useState(0);
    const [activeBtn, setActiveBtn] = useState(true);

    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return <FirstStep />;
            case 1:
                return (
                    <SecondStep
                        onSubmit={(e) => {
                            setPage(page + 1);
                            console.log(e);
                        }}
                    />
                );
            case 2:
                return <StepThree />;
            case 3:
                return <StepFour />;
            default:
                return <FirstStep />;
        }
    };
    function handleSubmit(data) {
        setPage(page + 1);
        console.log(data);
    }
    return (
        <Card>
            {conditionalComponent()}
            {page === 3 ? null : (
                <div>
                    {page === 2 ? (
                        <Link href="/Succes/Success">
                            <ButtonComp
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                // onClick={handleSubmit}
                                type="submit"
                                text={'Continue with the personal account'}
                            />
                        </Link>
                    ) : (
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            onClick={handleSubmit}
                            type="submit"
                            text={page === 2 ? 'Create Account' : 'Next'}
                        />
                    )}
                    {page === 2 ? (
                        <p onClick={handleSubmit} className={styles.open}>
                            Tap to open a <span>New Business Account</span>
                        </p>
                    ) : null}
                </div>
            )}
        </Card>
    );
};

export default ExistingMultiStep;
