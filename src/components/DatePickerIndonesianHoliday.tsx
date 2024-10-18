import React, { useState } from "react"
import { monthName, weekdayByMonday } from "../utils/nameList"
import { daysInMonth } from "../utils/daysInMont"
import { getHolidays } from "../utils/indonesianHolidays"
import getYears from "../utils/getYaers"
import { ArrayCalender, ArrayHoliday, OpenCalender, OptionValue } from "../utils/type"

export const DatePickerIndonesianHoliday = () => {
    const [isOpen, setIsOpen] = useState<OpenCalender>({ calendar: false, years: false, month: false, is_valid: false });
    const [calendar, setCalendar] = useState<ArrayCalender[]>([]);
    const [holidayList, setHolidayList] = useState<ArrayHoliday[]>([]);
    const [yearsList, setYearsList] = useState<number[]>([]);
    const [date, setDate] = useState<string>('');
    const [month, setMonth] = useState<OptionValue>({ label: monthName[new Date().getMonth()], value: new Date().getMonth() });
    const [year, setYear] = useState<OptionValue>({ label: new Date().getFullYear().toString(), value: new Date().getFullYear() });

    const getHolidayList = async () => {
        let calendarInMonth = daysInMonth(month.value, year.value)
        let holidayInYear = await getHolidays(year.value)


        const calendarWithHoliday = calendarInMonth.map((day) => {
            const holiday = holidayInYear.filter((holi) => (holi.holiday_date === day.full_date))[0]
            return { ...day, ...holiday }
        })
        setHolidayList(holidayInYear)
        setCalendar(calendarWithHoliday);
    }

    const handleOpenCalendar = () => {
        setIsOpen({ ...isOpen, calendar: !isOpen.calendar })
        if (holidayList.length === 0) {
            getHolidayList()
        }
    }

    const handleShowYears = () => {
        let show = isOpen.years
        let yearsList = getYears()
        setIsOpen({ ...isOpen, years: !show })
        setYearsList(yearsList)
    }

    const hanldeNextMonth = async () => {
        let nextMonth = month.value + 1
        let nextYear = year?.value
        let holidayInYear = holidayList
        if (nextMonth === 12) {
            nextMonth = 0
            nextYear = nextYear + 1
            holidayInYear = await getHolidays(nextYear)
            setHolidayList(holidayInYear)
        }
        let calendarInMonth = daysInMonth(nextMonth, nextYear)
        const calendarWithHoliday = calendarInMonth.map((day) => {
            const holiday = holidayInYear.filter((holi) => (holi.holiday_date === day.full_date))[0]
            return { ...day, ...holiday }
        })
        setCalendar(calendarWithHoliday);
        setMonth({ ...month, label: monthName[nextMonth], value: nextMonth })
        setYear({ ...year, value: nextYear, label: nextYear.toString() })
    }

    const hanldePrevMonth = async () => {
        let prevMont = month.value - 1
        let prevYear = year?.value
        let holidayInYear = holidayList
        if (prevMont === -1) {
            prevMont = 11
            prevYear = prevYear - 1
            holidayInYear = await getHolidays(prevYear)
            setHolidayList(holidayInYear)
        }
        let calendarInMonth = daysInMonth(prevMont, prevYear)
        const calendarWithHoliday = calendarInMonth.map((day) => {
            const holiday = holidayInYear.filter((holi) => (holi.holiday_date === day.full_date))[0]
            return { ...day, ...holiday }
        })
        setCalendar(calendarWithHoliday);
        setMonth({ ...month, label: monthName[prevMont], value: prevMont })
        setYear({ ...year, value: prevYear, label: prevYear.toString() })
    }

    const handleChange = (e: any) => {
        let value = e.target.value
        setDate(value)
    }

    const handleChangeYear = async (newYear: any) => {
        let calendarInMonth = daysInMonth(month.value, newYear)
        let holidayInYear = await getHolidays(newYear)
        const calendarWithHoliday = calendarInMonth.map((day) => {
            const holiday = holidayInYear.filter((holi) => (holi.holiday_date === day.full_date))[0]
            return { ...day, ...holiday }
        })
        setCalendar(calendarWithHoliday);
        setMonth({ ...month, label: monthName[month.value], value: month.value })
        setYear({ ...year, value: newYear, label: newYear.toString() })
        setHolidayList(holidayInYear)
        setIsOpen({ ...isOpen, years: false })
    }

    const hanldePickDate = (e: any) => {
        let newDate = e.date + "/" + e.month + "/" + e.year
        setDate(newDate)
        setIsOpen({ ...isOpen, calendar: false })
    }

    const isWeekEnd = (days: string) => {
        let valid = false
        let day = days.split('')[0]
        if (day === 'S') valid = true
        return valid
    }

    const coloringText = (list: any) => {
        let styles = 'font-semibold'
        if (isWeekEnd(list.day)) styles = 'text-red-500 font-semibold'
        if (list.is_national_holiday) styles = 'font-semibold text-white'
        if (!list.is_month) styles = 'text-gray-300 font-semibold'
        return styles
    }



    return (
        <div className="">
            <div className="w-full h-[8rem] bg-blue-100 rounded-xl p-5 shadow-md">
                <p className="text-xl font-bold font-roboto">Select Date</p>
                <div className="relative mt-2 rounded-md shadow-sm w-full">
                    <input value={date} onChange={handleChange} type="text" name="date" id="date" placeholder="dd/mm/yy" className="block bg-white text-black w-full h-10 uppercase text-sm px-3 py-2 rounded-lg border outline-blue-400 focus:border-blue-400" />
                    <div className="absolute inset-y-0 right-0 top-0 flex">
                        <button onClick={handleOpenCalendar} className="p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                                <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div className={`transition-opacity ease-in-out delay-150 duration-500 ${isOpen.calendar ? 'opacity-100' : 'opacity-0'}`}>
                        <div className={`${isOpen?.calendar ? '' : 'hidden'} absolute w-full mt-2 bg-white rounded-xl`}>
                            <div className="flex justify-between items-center py-4 px-3 shadow">
                                <div className="flex gap-2 items-center pl-2">
                                    <button className="font-semibold">{month.label}</button>
                                    <button onClick={handleShowYears} className="font-semibold">{year.label}</button>
                                </div>
                                <div className="flex justify-between">
                                    <button onClick={hanldePrevMonth}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <button onClick={hanldeNextMonth}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            {isOpen?.years ?
                                <div className="h-[16rem] gap-3 grid grid-cols-5 grid-flow-row p-2 place-items-center items-center w-full overflow-y-auto">
                                    {yearsList.length > 0 ?
                                        yearsList.map((list, idx) => {
                                            return (
                                                <button onClick={() => handleChangeYear(list)} key={idx} className={`text-center font-semibold hover:bg-blue-500 hover:rounded-md hover:text-white px-2 py-1`}>{list}</button>
                                            )
                                        })
                                        :
                                        null
                                    }
                                </div>
                                :
                                <div className="w-full h-[16rem]" >
                                    <div className="grid grid-cols-7 grid-flow-row p-2 place-items-center items-center">
                                        {weekdayByMonday.map((day: any) => {
                                            return (
                                                <label key={day} className={`w-8 text-center font-semibold ${isWeekEnd(day) && 'text-red-500'}`}>{day?.substring(0, 3) || ''}</label>
                                            )
                                        })}
                                    </div>
                                    <div className="grid grid-cols-7 grid-flow-row p-2 place-items-center items-center">
                                        {calendar.map((list: any, idx: any) => {
                                            return (
                                                <div key={idx} className={`group rounded-full relative flex w-8 h-8 items-center align-middle justify-center hover:bg-blue-500 hover:rounded-full ${list?.is_national_holiday && list?.is_month ? 'bg-red-500' : ''}`}>
                                                    <label
                                                        onClick={() => hanldePickDate(list)}
                                                        className={`text-center group-hover:text-white ${coloringText(list)}`}>
                                                        {list?.date}
                                                    </label>
                                                    <span
                                                        className={`absolute z-50 text-center top-10 scale-0 transition-all rounded bg-gray-950 w-40 p-2 text-xs text-white group-hover:scale-100 ${!list.is_national_holiday && 'hidden'}`}>
                                                        {list.holiday_name}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}