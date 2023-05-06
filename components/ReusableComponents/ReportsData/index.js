import React from 'react';
import { MdMoreVert, MdOutlineMoreVert } from 'react-icons/md';
import styles from './styles.module.css';
const ReportsData = () => {
    return (
        <tbody className={styles.tbody}>
            <tr>
                <td className={styles.name}>
                    <p>James Ewang</p>
                </td>
                <td>
                    <p>Payment Link</p>
                </td>
                <td className={styles.num}>
                    <p>+ N40,000.00</p>
                </td>
                <td>
                    <p>dance@gma...</p>
                </td>
                <td>
                    <p>Wema Bank</p>
                </td>

                <td>
                    <p>2 Jul 2022</p>
                </td>
                <td>
                    <p>Card: MasterCard</p>
                </td>
                <td>
                    <div className={styles.staus}>
                        <p>Successful</p>
                    </div>
                </td>
                <td>
                    <MdMoreVert />
                </td>
            </tr>
            <tr>
                <td className={styles.name}>
                    <p>James Ewang</p>
                </td>
                <td>
                    <p>Payment Link</p>
                </td>
                <td className={styles.num}>
                    <p>+ N40,000.00</p>
                </td>
                <td>
                    <p>dance@gma...</p>
                </td>
                <td>
                    <p>Wema Bank</p>
                </td>

                <td>
                    <p>2 Jul 2022</p>
                </td>
                <td>
                    <p>Card: MasterCard</p>
                </td>
                <td>
                    <div className={styles.staus}>
                        <p>Successful</p>
                    </div>
                </td>
                <td>
                    <MdMoreVert />
                </td>
            </tr>
            <tr>
                <td className={styles.name}>
                    <p>James Ewang</p>
                </td>
                <td>
                    <p>Payment Link</p>
                </td>
                <td className={styles.num}>
                    <p>+ N40,000.00</p>
                </td>
                <td>
                    <p>dance@gma...</p>
                </td>
                <td>
                    <p>Wema Bank</p>
                </td>

                <td>
                    <p>2 Jul 2022</p>
                </td>
                <td>
                    <p>Card: MasterCard</p>
                </td>
                <td>
                    <div className={styles.staus}>
                        <p>Successful</p>
                    </div>
                </td>
                <td>
                    <MdMoreVert />
                </td>
            </tr>
        </tbody>
    );
};

export default ReportsData;
