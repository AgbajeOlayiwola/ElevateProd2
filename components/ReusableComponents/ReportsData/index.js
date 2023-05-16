import React from 'react';
import { MdMoreVert, MdOutlineMoreVert } from 'react-icons/md';
import styles from './styles.module.css';
const ReportsData = ({
    transactionStatus,
    ammount,
    type,
    date,
    bank,
    bene
}) => {
    let newBeneficiary;
    if (bene === null) {
        newBeneficiary = 'Self';
    } else if (bene === undefined) {
        newBeneficiary = 'Self';
    } else {
        newBeneficiary = bene?.split(' ');
    }
    return (
        <tbody className={styles.tbody}>
            <tr>
                <td className={styles.name}>
                    <p>
                        {newBeneficiary === ''
                            ? ''
                            : newBeneficiary[1] === undefined
                            ? newBeneficiary[0]
                            : `${newBeneficiary[0]} ${newBeneficiary[1]}`}
                    </p>
                </td>
                <td>
                    <p>{type}</p>
                </td>
                <td className={styles.num}>
                    <p>{ammount}</p>
                </td>
                {/* <td>
                    <p>dance@gma...</p>
                </td> */}
                {/* <td>
                    <p>{bank == true ? 'Ecobank' : null}</p>
                </td> */}

                <td>
                    <p>{date[0]}</p>
                </td>
                <td>
                    <div>
                        <p
                            className={
                                transactionStatus === 'PENDING'
                                    ? styles.pending
                                    : transactionStatus === 'SUCCESS'
                                    ? styles.success
                                    : styles.status
                            }
                        >
                            {transactionStatus}
                        </p>
                    </div>
                </td>
                {/* <td>
                    <MdMoreVert />
                </td> */}
            </tr>
        </tbody>
    );
};

export default ReportsData;
