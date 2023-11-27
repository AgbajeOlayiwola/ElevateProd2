import React, { useState } from 'react';
import ConfirmLoan from './Confirm';
import LoanRequest from './Request';

const LoansRequest = () => {
    const [page, setPage] = useState(0);
    const multiStep = () => {
        switch (page) {
            case 0:
                return <LoanRequest nextPage={() => setPage(1)} />;
            case 1:
                return <ConfirmLoan backward={() => setPage(0)} />;
        }
    };
    return <div>{multiStep()}</div>;
};

export default LoansRequest;
