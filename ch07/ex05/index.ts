export function push<T>(array: T[], element: T): T[] {
    const newArray = [...array, element];
    return newArray;
}

export function pop<T>(array: T[]): T[] | undefined {
    if (array.length === 0) {
        return undefined;
    }

    const newArray = array.slice(0, -1);
    return newArray;
}

export function shift<T>(array: T[]): T[] | undefined {
    if (array.length === 0) {
        return undefined;
    }

    const newArray = array.slice(1);
    return newArray;
}

export function unshift<T>(array: T[], element: T): T[] {
    const newArray = [element, ...array];
    return newArray;
}
