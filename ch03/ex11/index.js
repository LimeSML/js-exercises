export function equals(o1, o2) {
    if(o1 === o2) {
        return true;
    }

    if (o1 == null || o2 == null) {
        return false;
    }

    if (typeof o1 !== 'object' || typeof o2 !== 'object') {
        return false;
    }

    if (Object.keys(o1).length !== Object.keys(o2).length) {
        return false;
    }

    for (const key of Object.keys(o1)) {
        if (!Object.hasOwn(o2, key)) {
            return false;
        }
        if (!equals(o1[key], o2[key])) {
          return false;
        }
    }
    return true;
}