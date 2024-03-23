import React, { useEffect, useRef, useState } from "react"
import { monthName, weekdayByMonday } from "../../utils/nameList"
import { daysInMonth } from "../../utils/daysInMont"
import { getHolidays } from "../../utils/indonesianHolidays"
import getYears from "../../utils/getYaers"
import IconCalendar from "../../assets/icons/ic-calendar.svg"
import IconCaretDown from "../../assets/icons/ic-caret-down.svg"
import IconCaretUp from "../../assets/icons/ic-caret-up.svg"
import IconChevronLeft from "../../assets/icons/ic-chevron-left.svg"
import IconChevronRight from "../../assets/icons/ic-chevron-right.svg"

type OpenCalender = {
    calendar: boolean,
    years: boolean,
    month: boolean
    is_valid: boolean
}

type ArrayCalender = {
    is_month: boolean,
    date: number,
    month: number,
    year: number,
    day: string,
    month_name: string,
}

type OptionValue = {
    label: string,
    value: number
}

type ArrayHoliday = {
    holiday_date: string,
    holiday_name: string,
    is_national_holiday: boolean
}

export default function DatePicker() {
    const [isOpen, setIsOpen] = useState<OpenCalender>({ calendar: false, years: false, month: false, is_valid: false });
    const [calendar, setCalendar] = useState<ArrayCalender[]>([]);
    const [holidayList, setHolidayList] = useState<ArrayHoliday[]>([]);
    const [yearsList, setYearsList] = useState<number[]>([]);
    const [date, setDate] = useState<string>('');
    const [month, setMonth] = useState<OptionValue>({ label: monthName[new Date().getMonth()], value: new Date().getMonth() });
    const [year, setYear] = useState<OptionValue>({ label: new Date().getFullYear().toString(), value: new Date().getFullYear() });

    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        getHolidayList()
    });

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
                        <img src={IconCalendar} alt="Icon Calendar" />
                    </button>
                </div>
                {
                    isOpen.calendar &&
                    <div className="absolute p-4 font-sans text-sm font-normal break-words whitespace-normal bg-white border rounded-lg shadow-lg w-full h-72 border-blue-gray-50 text-blue-gray-500 shadow-blue-gray-500/10 focus:outline-none">
                        <div className="flex justify-between">
                            <div>
                                <label>{month.label}</label>
                                <button onClick={handleShowYears} className="p-2">
                                    <img src={isOpen.years ? IconCaretDown : IconCaretUp} alt="Picture of the author" />
                                </button>
                            </div>
                            {isOpen.years ? null :
                                <div className="flex gap-10">
                                    <button onClick={hanldePrevMonth} className="p-2">
                                        <img src={IconChevronLeft} alt="Picture of the author" />
                                    </button>
                                    <button onClick={hanldeNextMonth} className="p-2">
                                        <img src={IconChevronRight} alt="Picture of the author" />
                                    </button>
                                </div>
                            }
                        </div>
                        <div className="mt-5" >
                            {isOpen.years ?
                                <div className="grid grid-cols-7 grid-flow-row gap-4 mt-5">
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