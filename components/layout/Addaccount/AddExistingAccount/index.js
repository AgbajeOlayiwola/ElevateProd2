import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useVerifyAccountMutation } from '../../../../redux/api/authApi';
import ButtonComp from '../../../ReusableComponents/Button';
import LivenessForAccount from './Liveness';
const AddExistinAccount = ({ id, close }) => {
    const [page, setPage] = useState(0);
    const [accountNumber, setAccountNumber] = useState('');

    const [
        verifyAccount,
        {
            data: verifyAccountData,
            isLoading: verifyAccountLoad,
            isSuccess: verifyAccountSuccess,
            isError: verifyAccountFalse,
            error: verifyAccountErr,
            reset: verifyAccountReset
        }
    ] = useVerifyAccountMutation();
    const verify = () => {
        verifyAccount({
            destinationBankCode: 'ECOBANK',
            accountNumber: accountNumber
        });
    };
    const showToastErrorMessage = () => {
        toast.error(verifyAccountErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    useEffect(() => {
        if (verifyAccountErr) {
            showToastErrorMessage();
        }
    }, [verifyAccountErr]);

    useEffect(() => {
        if (verifyAccountSuccess) {
            setPage(1);
        }
    }, [verifyAccountSuccess]);

    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return (
                    <div>
                        <ToastContainer />
                        <lable>Input account number</lable>
                        <input
                            type="text"
                            style={{ marginTop: '20px' }}
                            onChange={(e) => setAccountNumber(e.target.value)}
                        />
                        <br />
                        <br />
                        <ButtonComp
                            text="Verify Account Number"
                            onClick={verify}
                            type="submit"
                            disabled={true}
                            active={'active'}
                            loads={verifyAccountLoad}
                        />
                    </div>
                );
            case 1:
                return (
                    <LivenessForAccount
                        id={id}
                        account={accountNumber}
                        acct={verifyAccountData}
                        close={close}
                    />
                );
            case 2:
                return (
                    <StepThreeCompleteProfile1
                        type={
                            profile?.user?.customerCategory === 'INDIVIDUAL'
                                ? true
                                : false
                        }
                    />
                );
        }
    };
    return (
        <div>
            <h1>Add Existing Account Number</h1>
            {conditionalComponent()}
        </div>
    );
};

export default AddExistinAccount;
