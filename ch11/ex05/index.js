export function detectFileType(arrayBuffer) {
    if (!(arrayBuffer instanceof ArrayBuffer)) {
        throw new Error('input must be an ArrayBuffer');
    }

    const uint8Arr = new Uint8Array(arrayBuffer);

    if (isPdfFile(uint8Arr)) {
        return 'PDF';
    }

    if (isZipFile(uint8Arr)) {
        return 'ZIP';
    }

    if (isGifFile(uint8Arr)) {
        return 'GIF';
    }

    if (isPngFile(uint8Arr)) {
        return 'PNG';
    }

    return 'UNKNOWN';
}

function isPdfFile(uint8Arr) {
    if (!(uint8Arr instanceof Uint8Array)) {
        throw new Error('input must be a Uint8Array');
    }

    const pdfSignature = [0x25, 0x50, 0x44, 0x46];
    for (let i = 0; i < pdfSignature.length; i++) {
        if (uint8Arr[i] !== pdfSignature[i]) {
            return false;
        }
    }
    return true;
}

function isZipFile(uint8Arr) {
    if (!(uint8Arr instanceof Uint8Array)) {
        throw new Error('input must be a Uint8Array');
    }

    const zipSignature = [0x50, 0x4b];
    for (let i = 0; i < zipSignature.length; i++) {
        if (uint8Arr[i] !== zipSignature[i]) {
            return false;
        }
    }
    return true;
}

function isGifFile(uint8Arr) {
    if (!(uint8Arr instanceof Uint8Array)) {
        throw new Error('input must be a Uint8Array');
    }

    const gifSignatures = [0x47, 0x49, 0x46, 0x38];
    for (let i = 0; i < gifSignatures.length; i++) {
        if (uint8Arr[i] !== gifSignatures[i]) {
            return false;
        }
    }
    return true;
}

function isPngFile(uint8Arr) {
    if (!(uint8Arr instanceof Uint8Array)) {
        throw new Error('input must be a Uint8Array');
    }

    const pngSignature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a];
    for (let i = 0; i < pngSignature.length; i++) {
        if (uint8Arr[i] !== pngSignature[i]) {
            return false;
        }
    }
    return true;
}