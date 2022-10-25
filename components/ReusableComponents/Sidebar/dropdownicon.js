import React, { useState } from 'react';

const Dropdownicon = ({ item }) => {
    const [subNav, setSubNav] = useState(false);
    const showSubnav = () => {
        setSubNav((prev) => !prev);
        //console.log'clicked');
    };
    return (
        <div>
            {' '}
            {item.subNav && subNav ? (
                <div onClick={item.subNav && showSubnav}>{item.iconOpened}</div>
            ) : item.subNav ? (
                <div onClick={item.subNav && showSubnav}>{item.iconClosed}</div>
            ) : null}
        </div>
    );
};

export default Dropdownicon;
