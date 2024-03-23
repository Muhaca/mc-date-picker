export default function getYears() {
    let currentYear = new Date().getFullYear()
    let years = [];
    let startYear = currentYear - 50;
    let endYear = currentYear + 50
    while (startYear <= endYear) {
        years.push(startYear++);
    }
    return years;
}