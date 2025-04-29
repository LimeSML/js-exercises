export function has31DaysUsingIfElse(month) {
    if (typeof month !== "string") {
        throw new TypeError("month must be a string");
    }

    if (month === "Jan" || 
        month === "Mar" || 
        month === "May" || 
        month === "Jul" || 
        month === "Aug" || 
        month === "Oct" || 
        month === "Dec"
    ) {
        return true;
    } else {
        return false;
    }
}

export function has31DaysUsingSwitch(month) {
    if (typeof month !== "string") {
        throw new TypeError("month must be a string");
    }

    switch (month) {
        case "Jan":
        case "Mar":
        case "May":
        case "Jul":
        case "Aug":
        case "Oct":
        case "Dec":
            return true;
        default:
            return false;
    }
}