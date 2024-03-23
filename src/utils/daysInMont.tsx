import { monthName, weekday } from "./nameList";

export const daysInMonth = (month: number, year: number) => {
    month = month - 1;
    const lastMon = getMondays(month, year)?.getDate() as number
    const startDate = new Date(year, month, lastMon + 1);

    const datesArray: string[] = Array.from({ length: 42 }, (_, index) => {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + index);

        return currentDate.toISOString().split('T')[0];
    });

    let newDatesArray = datesArray.map((days: any) => {
        let date = new Date(days)
        let isMonth = month + 1 === date.getMonth()

        let newDate = {
            full_date: days,
            is_month: isMonth,
            date: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            day: weekday[date.getDay()],
            month_name: monthName[date.getMonth()],
        }
        return newDate
    })
    return newDatesArray;
}


const getMondays = (month: number, year: number) => {
    let d = new Date(year, month), mondays = [];
    d.setDate(1);

    if (month === -1) {
        month = 11
    }

    while (d.getDay() !== 1) {
        d.setDate(d.getDate() + 1);
    }

    while (d.getMonth() === month) {
        mondays.push(new Date(d.getTime()));
        d.setDate(d.getDate() + 7);
    }
    return mondays.pop();
}



