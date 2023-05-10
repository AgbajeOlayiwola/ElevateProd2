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
    return (
        <tbody className={styles.tbody}>
            <tr>
                <td className={styles.name}>
                    <p>{bene}</p>
                </td>
                <td>
                    <p>{type === 'C' ? 'Credit' : 'Debit'}</p>
                </td>
                <td className={styles.num}>
                    <p>{ammount}</p>
                </td>
                {/* <td>
                    <p>dance@gma...</p>
                </td> */}
                <td>
                    <p>{bank == true ? 'Ecobank' : null}</p>
                </td>

                <td>
                    <p>{date[0]}</p>
                </td>
                {/* <td>
                    <p>{type}</p>
                </td>
                <td>
                    <div className={styles.staus}>
                        <p>{transactionStatus}</p>
                    </div>
                </td>
                <td>
                    <MdMoreVert />
                </td> */}
            </tr>
        </tbody>
    );
};

export default ReportsData;
