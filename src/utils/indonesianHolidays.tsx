export const getHolidays = async (year: number) => {
    let data: any[] = []
    let url = 'https://api-harilibur.vercel.app/api'
    let response = await fetch(url)
    if (response.ok) {
        let holiday = await response.json()
        data = holiday.map((day: any) => {
            let split = day.holiday_date.split('-')
            let pop = split.pop()
            if (pop.length === 1) {
                pop = '0' + pop
            }
            let holiday_date = `${split[0]}-${split[1]}-${pop}`
            return { ...data, ...day, holiday_date }
        })
    }
    return data
}