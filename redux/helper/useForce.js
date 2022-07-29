import React, { useState } from 'react';

const UseForce = () => {
    const [value, setValue] = useState(0);

    return () => setValue((value) => value + 1);
};

export default UseForce;
