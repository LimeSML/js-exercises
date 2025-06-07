export function restrict(target, template) {
    if (typeof target !== 'object' || target === null) {
        throw new TypeError('target must be an object');
    }
    if (typeof template !== 'object' || template === null) {
        throw new TypeError('template must be an object');
    }

    for (const key of Object.keys(target)) {
        if (!template.hasOwnProperty(key)) {
            delete target[key];
        }
    }
    return target;
}
export function substract(target, ...sources) {
    if (typeof target !== 'object' || target === null) {
        throw new TypeError('target must be an object');
    }
    if (sources.length === 0) {
        return target;
    }

    for (const source of sources) {
        if (typeof source !== 'object' || source === null) {
            continue;
        }

        for (const key of Object.keys(source)) {
            if (target.hasOwnProperty(key)) {
                delete target[key];
            }
        }
    }
    return target;
}
