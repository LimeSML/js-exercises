export function isEmailAddress(str) {
    if (typeof str !== 'string') {
        return false;
    }

    const parts = str.split("@");
    if (parts.length !== 2) {
        return false;
    }

    const [local, domain] = parts;

    // 長さ制限
    if (!local || !domain) {
        return false;
    }
    if (local.length > 64 || domain.length > 252) {
        return false;
    }

    const dotAtom = /^[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]+(\.[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]+)*$/;

    return dotAtom.test(local) && dotAtom.test(domain);
}