import React from 'react';
import { useDispatch } from 'react-redux';
import { setLoanRepayment } from '../../../redux/slices/loanRepayment';
import SearchSvg from '../ReusableSvgComponents/SearchSvg';
import styles from './styles.module.css';

const LoansTable = ({ loads, data, repayloan }) => {
    const dispatch = useDispatch();

    return (
        <div className={styles.loansTable}>
            <div className={styles.loansAction}>
                <h2>Loan log history</h2>
                <div>
                    <SearchSvg color="#868FA0" />
                    <input
                        type="text"
                        placeholder="Search by title, amount or date"
                    />
                </div>
            </div>
            <div className={styles.loansHeader}>
                <p>S/N</p>
                <p>DATE</p>
                {/* <p>TITLE</p> */}
                <p>AMOUNT</p>
                <p>LOAN\ INTREST</p>
                <p>TRANSACTION ID</p>
                <p>STATUS</p>
            </div>
            {data.length > 0
                ? data?.map((items, index) => {
                      return (
                          <div className={styles.loansSingle} key={index}>
                              <p>{index + 1}</p>
                              <p>{items.dateCreated}</p>
                              <p>{items.loanAmount}</p>
                              {/* <p
                            className={
                                items.action === 'debit'
                                    ? styles.debit
                                    : styles.credit
                            }
                        >
                            {items.action === 'debit' ? '-' : '+'}
                            {formatter.format(items.amount)}
                        </p> */}
                              <p>
                                  {items.interest === null ? 0 : items.interest}
                                  %
                              </p>

                              <div
                                  className={
                                      items.status === 'Pending'
                                          ? styles.pending
                                          : items.status === 'Failed'
                                          ? styles.failed
                                          : styles.success
                                  }
                              >
                                  <span></span>
                                  <p>{items.status}</p>
                              </div>
                              <p
                                  className={styles.viwMore}
                                  onClick={() => {
                                      dispatch(setLoanRepayment(items)),
                                          repayloan();
                                  }}
                              >
                                  view loan
                              </p>
                          </div>
                      );
                  })
                : null}
        </div>
    );
};

export default LoansTable;
