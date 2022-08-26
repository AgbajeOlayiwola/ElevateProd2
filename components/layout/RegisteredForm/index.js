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
    const [pageType, setPageType] = useState('');
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
                        }}
                        action={() => {
                            setPage(page - 1);
                        }}
                    />
                );
            case 2:
                return (
                    <StepThree
                        action={() => {
                            setPage(page - 1);
                        }}
                        handleSubmit={handleSubmit}
                        handleSubmitNew={handleSubmitNew}
                    />
                );
            case 3:
                return (
                    <StepFour
                        title={pageType}
                        action={() => {
                            setPage(page - 1);
                            setPageType('');
                        }}
                    />
                );
            default:
                return <FirstStep />;
        }
    };
    function handleSubmit() {
        setPage(page + 1);
    }
    function handleSubmitNew() {
        setPage(page + 1);
        setPageType('New');
    }
    return (
        <Card>
            <div className={styles.existingBody}>
                {conditionalComponent()}
                {page === 3 ? null : (
                    <div>
                        {page === 2 ? null : page === 0 ? ( // <Link href="/Succes/Success">
                            <ButtonComp
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                onClick={handleSubmit}
                                type="submit"
                                text="Next"
                            />
                        ) : // </Link>
                        // <ButtonComp
                        //     disabled={activeBtn}
                        //     active={activeBtn ? 'active' : 'inactive'}
                        //     onClick={handleSubmit}
                        //     type="submit"
                        //     text={page === 2 ? 'Create Account' : 'Next'}
                        // />
                        null}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default ExistingMultiStep;
