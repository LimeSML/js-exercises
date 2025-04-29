export function jsonParse(jsonString) {
    if (typeof jsonString !== 'string') {
        throw new TypeError('Argument must be a string');
    }

    let json = {};
    try {
        json = JSON.parse(jsonString);
        return {
            success: true,
            data: json,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
}