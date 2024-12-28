export const canUseApp = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysDate = today.getDate();
    const condition1 =
        year === 2024 && (month < 11 || (month === 11 && daysDate <= 30));
    const condition2 = year < 2024;
    console.log(daysDate, month, condition1);
    return condition1 || condition2;
};
