import React from 'react';
import { Layout } from '../../components';
import DashLayout from '../../components/layout/Dashboard';
import styles from './styles.module.css';
import { BsChevronDown } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import ReportsData from '../../components/ReusableComponents/ReportsData';
import { BiFilter } from 'react-icons/bi';

const Report = () => {
    return (
        <DashLayout>
            <div className={styles.collctionh1}>
                <h1>Collection Report</h1>
            </div>
            <div>
                <p>Inflow per Channel</p>
                <div className={styles.collectionChart}>
                    <div className={styles.collectionCHartDiv}>
                        <div className={styles.collectionChartTop}>
                            <h1 className={styles.chartH1}>23%</h1>
                            <p>increase in successful collections today. </p>
                        </div>
                        <div>
                            <div className={styles.charts}>
                                <div className={styles.greenIdiv}>
                                    <div className={styles.green}></div>
                                    <h1>
                                        <span>QR</span> <br />
                                        N23,566 (10%)
                                    </h1>
                                </div>
                                <div className={styles.greenIIdiv}>
                                    <div className={styles.greenI}></div>
                                    <h1>
                                        <span>Paylink</span>
                                        <br /> N23,355 (35%)
                                    </h1>
                                </div>
                                <div className={styles.greenIIIdiv}>
                                    <div className={styles.greenII}></div>
                                    <h1>
                                        <span>USSD</span>
                                        <br /> N23,456 (25%)
                                    </h1>
                                </div>
                                <div className={styles.greenIVdiv}>
                                    <div className={styles.greenIII}></div>
                                    <h1>
                                        <span>Cards</span>
                                        <br /> N34,876 (30%)
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.collectionsTable}>
                <h2 className={styles.allTrans}>All Transactions</h2>
                <div className={styles.filter}>
                    <div className={styles.filterFlex}>
                        <div className={styles.active}>
                            <p>All</p>
                        </div>
                        <div>
                            <p>Pay Link</p>
                        </div>
                        <div>
                            <p>Cards</p>
                        </div>
                        <div>
                            <p>Cards</p>
                        </div>
                        <div>
                            <p>EcoBank QR</p>
                        </div>
                    </div>
                    <div className={styles.generate}>
                        <div className={styles.down}>
                            <p>Download</p>
                        </div>
                        <div className={styles.gene}>
                            <p>Generate Statement</p>
                        </div>
                    </div>
                </div>
                <div className={styles.searches}>
                    <div className={styles.searchInp}>
                        <AiOutlineSearch className={styles.sarchIcon} />
                        <input
                            type="text"
                            className={styles.srch}
                            placeholder="Search"
                        />
                    </div>
                    <div className={styles.filterDiv}>
                        <p>Filter</p>
                        <BsChevronDown />
                    </div>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.theadTop}>
                                <div>
                                    <p>Beneficairy</p>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <p>Type</p>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <p> Amount</p>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <p>Email</p>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <p>Bank</p>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <p>Date</p>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <p>Check out Type</p>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <p>Status</p>
                                </div>
                            </th>
                            <th className={styles.theadBtm}>
                                <div>
                                    <p></p>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <ReportsData />
                </table>
            </div>
        </DashLayout>
    );
};

export default Report;
