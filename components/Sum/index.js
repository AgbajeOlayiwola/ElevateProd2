import { useState } from 'react';

/*
 data = [{
   amount: 100,
 }]
*/

export default function useSum() {
    const [sum, setSum] = useState(0);
    console.log('Tesst');
    return {
        sum,
        gatherSum: (data) => {
            const totalSum = data?.reduce((total, current) => {
                total += current.Amount;
                return total;
            }, 0);
            setSum(() => totalSum);
        }
    };
}
