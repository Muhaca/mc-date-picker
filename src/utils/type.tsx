
export type OpenCalender = {
    calendar: boolean,
    years: boolean,
    month: boolean
    is_valid: boolean
}

export type ArrayCalender = {
    is_month: boolean,
    date: number,
    month: number,
    year: number,
    day: string,
    month_name: string,
}

export type OptionValue = {
    label: string,
    value: number
}

export type ArrayHoliday = {
    holiday_date: string,
    holiday_name: string,
    is_national_holiday: boolean
}