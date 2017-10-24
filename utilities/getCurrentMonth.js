import moment from 'moment'


const getCurrentMonth = () => {

    const date = new Date()
    const y = date.getFullYear()
    const m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    return {
        startDate: firstDay,
        endDate: lastDay
    }
}


export default getCurrentMonth
