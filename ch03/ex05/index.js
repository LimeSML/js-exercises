export function convertLFtoCRLF(str) {
  return str.replace(/(?<!\r)\n/g, "\r\n");
}

export function convertCRLFtoLF(str) {
  return str.replace(/\r\n/g, "\n");
}
