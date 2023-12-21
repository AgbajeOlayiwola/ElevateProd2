export const getNumberSuffix = (num) => {
    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
        return 'th';
    }

    switch (lastDigit) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
};
export const getMonthlyPayment = (interest, period, amount) => {
    const totalAmount = (+amount * +interest) / 100 + +amount;
    return (+totalAmount / +period).toFixed(2);
};
