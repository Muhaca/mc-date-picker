import React, { useState } from "react"
import { monthName, weekdayByMonday } from "../utils/nameList"
import { daysInMonth } from "../utils/daysInMont"
import { getHolidays } from "../utils/indonesianHolidays"
import getYears from "../utils/getYaers"
import { ArrayCalender, ArrayHoliday, OpenCalender, OptionValue } from "../utils/type"


export const DatePicker = () => {
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
        let calendarInMonth = daysInMonth(nextMonth, year.value)

        if (nextMonth === 12) nextMonth = 0
        const calendarWithHoliday = calendarInMonth.map((day) => {
            const holiday = holidayList.filter((holi) => (holi.holiday_date === day.full_date))[0]
            return { ...day, ...holiday }
        })
        setCalendar(calendarWithHoliday);
        setMonth({ ...month, label: monthName[nextMonth], value: nextMonth })
    }

    const hanldePrevMonth = async () => {
        let prevMont = month.value - 1
        let calendarInMonth = daysInMonth(prevMont, year.value)

        if (prevMont < 1) prevMont = 11
        const calendarWithHoliday = calendarInMonth.map((day) => {
            const holiday = holidayList.filter((holi) => (holi.holiday_date === day.full_date))[0]
            return { ...day, ...holiday }
        })
        setCalendar(calendarWithHoliday);
        setMonth({ ...month, label: monthName[prevMont], value: prevMont })
    }

    const handleChange = (e: any) => {
        let value = e.target.value
        setDate(value)
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

    return (
        <div className="flex flex-col">
            <label className="capitalize">date picker</label>
            <div className="relative mt-2 rounded-md shadow-sm w-96">
                <input value={date} onChange={handleChange} type="text" name="date" id="date" placeholder="dd/mm/yy" className="uppercase block w-full h-12 rounded-md border-0 py-1.5 pl-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <button onClick={handleOpenCalendar} className="p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                            <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                {
                    isOpen.calendar &&
                    <div className="absolute p-4 font-sans text-sm font-normal break-words whitespace-normal bg-white border rounded-lg shadow-lg w-full h-72 border-blue-gray-50 text-blue-gray-500 shadow-blue-gray-500/10 focus:outline-none">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <label>{month.label}</label>
                                <button onClick={handleShowYears} className="p-2">
                                    {isOpen.years ?
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z" clipRule="evenodd" />
                                        </svg>
                                    }
                                </button>
                            </div>
                            {isOpen.years ? null :
                                <div className="flex gap-10">
                                    <button onClick={hanldePrevMonth} className="p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <button onClick={hanldeNextMonth} className="p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            }
                        </div>
                        <div className="mt-5" >
                            {isOpen.years ?
                                <div className="bg-slate-400 h-80 grid grid-cols-7 grid-flow-row gap-4 mt-5 overflow-y-auto">
                                    {yearsList.length > 0 ?
                                        yearsList.map((list, idx) => {
                                            return (
                                                <label key={idx} className={`w-8 text-center font-semibold`}>{list}</label>
                                            )
                                        })
                                        :
                                        null
                                    }
                                </div>
                                :
                                <div>
                                    <div className="grid grid-cols-7 grid-flow-row gap-y-2 gap-x-4 mt-5">
                                        {weekdayByMonday.map((day: any) => {
                                            return (
                                                <label key={day} className={`w-8 text-center font-semibold ${isWeekEnd(day) && 'text-red-500'}`}>{day.split('')[0]}</label>
                                            )
                                        })}
                                    </div>
                                    <div className="grid grid-cols-7 grid-flow-row gap-y-2 gap-x-4 mt-5">
                                        {calendar.map((list: any, idx: any) => {
                                            return (
                                                <div key={idx} className="group relative w-8 h-5 flex justify-center">
                                                    <label onClick={() => hanldePickDate(list)} className={`w-8 h-5 text-center ${list.is_month && 'hover:bg-gray-500 radius rounded hover:text-white'} ${isWeekEnd(list.day) && 'text-red-500'} ${list.is_national_holiday && 'text-red-500 font-semibold'}`}>{list.is_month ? list.date : ''}</label>
                                                    <span className={`${!list.is_national_holiday && 'hidden'} absolute text-center top-10 scale-0 transition-all rounded bg-gray-950 w-40 p-2 text-xs text-white group-hover:scale-100`}>{list.holiday_name}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
