export function getDaysInMonth(year, month) {
    if (year < 0 || month < 1 || month > 12) {
        throw new Error("invalid year or month");
    }

    const nextMonthFirstDay = new Date(year, month, 1);
    const thisMonthLastDay = new Date(nextMonthFirstDay - 1); 
    return thisMonthLastDay.getDate();
}

export function countWeekdays(startDateStr, endDateStr) {
    const pattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!pattern.test(startDateStr) || !pattern.test(endDateStr)) {
        throw new Error("invalid date format");
    }

    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    let count = 0;

    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        const day = d.getDay();
        if (day !== 0 && day !== 6) { // 日曜日0, 土曜日6を除く
            count++;
        }
    }
    return count;
}

export function getWeekdayByLocale(dateStr, locale) {
    const pattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!pattern.test(dateStr)) {
        throw new Error("invalid date format");
    }

    const date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
}

export function getFirstDayOfLastMonth() {
    const now = new Date();
    const msInDay = 24 * 60 * 60 * 1000;

    // 今日の0時0分0秒（ミリ秒）
    const todayStart = now.getTime() -
        (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) * 1000 -
        now.getMilliseconds();

    // 今月1日の0時0分0秒
    const thisMonthFirstDay = todayStart - (now.getDate() - 1) * msInDay;

    // 先月1日の0時0分0秒
    // 今月1日から1日前（先月末日）に戻って、その日付を1日にする
    const lastMonthFirstDay = new Date(thisMonthFirstDay - msInDay * new Date(thisMonthFirstDay - msInDay).getDate());

    return lastMonthFirstDay;
}