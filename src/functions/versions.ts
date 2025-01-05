export const canUseApp = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysDate = today.getDate();
    const condition1 =
        year === 2025 && (month < 0 || (month === 0 && daysDate <= 6));
    const condition2 = year < 2025;
    console.log(daysDate, month, condition1);
    return condition1 || condition2;
};
