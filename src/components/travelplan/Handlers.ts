export const toUTCDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-');
    return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
};

//figure out what to return here