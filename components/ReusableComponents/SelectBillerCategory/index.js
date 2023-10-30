import React, { useState } from 'react';
import { useBillersMutation } from '../../../redux/api/authApi';
import SlectBiller from '../SelectBiller';
import SelectBillerForms from '../SelectBillerForms';

const SelectBillerCategory = ({ item }) => {
    const [loads, setLoads] = useState(true);
    const [billerDatails, setBillerDetails] = useState();
    const [
        billers,
        {
            data: billersData,
            isLoading: billersLoad,
            isSuccess: billersSuccess,
            isError: billersFalse,
            error: billersErr,
            reset: billersReset
        }
    ] = useBillersMutation();
    const arrowAction = (val) => {
        billers({ category: val });
    };
    const loadBillerForm = (val) => {
        console.log(val);
        setBillerDetails(val?.data);
        setLoads(false);
    };
    return (
        <>
            {loads ? (
                <div>
                    <h4 onClick={() => arrowAction(item.categoryCode)}>
                        {item.categoryName}
                    </h4>
                    <SlectBiller
                        loadBillerForm={loadBillerForm}
                        biller={billersData}
                        loads={billersLoad}
                    />
                </div>
            ) : (
                <SelectBillerForms billerDatails={billerDatails} />
            )}
        </>
    );
};

export default SelectBillerCategory;
